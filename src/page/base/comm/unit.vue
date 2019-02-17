<template>
	<div class="clientClassify">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>产品计量</Breadcrumb-item>
			<Breadcrumb-item>计量单位</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
			<div class="btn-box-right">
                <button class="btn-new" @click.stop='addRoot'>新增</button>
                <button class="btn-cancel">导入</button>
                <button class="btn-cancel">导出</button>
                <button class="btn-download">模板下载</button>
			</div>
			<div>
				<div class="table">
					<div class="table-header">
						<div class="table-td" style="width:20%;padding-left: 30px;">单位名称</div>
						<div class="table-td" style="width:20%;padding-left: 10px;"><span class="bold"></span>单位编码 </div>
						<div class="table-td" style="width:35%;padding-left: 10px;"><span class="bold"></span>单位描述 </div>
						<div class="table-td"><span class="bold"></span>操作</div>
					</div>
					<div class="table-tbody">
						<div class="table_qaz test-1">
							<tree-table v-for='(classify,index) in data' :model='classify' :parentModel='data' :index='index' @del='del' @edit='edit' :key="index"></tree-table>
						</div>
					</div>
				</div>
			</div>
			<!--			
			<Modal v-model="clientClassifyModel" title="修改计量单位" v-if="isEdit">
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="80">
					<Form-item label="名称" prop="name">
						<Input v-model="compileForm.name" placeholder="名称"></Input>
					</Form-item>
					<Form-item label="编码" prop="code">
						<Input v-model="compileForm.code" placeholder="编码"></Input>
					</Form-item>
					<Form-item label="描述" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="客户级别描述"></Input>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="text" @click='cancel'>取消</Button>
					<Button type="info" @click="confirm('compileForm')">确定</Button>
				</div>
			</Modal>-->

			<Modal v-model="clientClassifyModel" width="666">
				<div class="div_tit">
					<span v-if="div_tit">新增计量单位</span>
					<span v-else>修改计量单位</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="110">
					<Form-item label="单位名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="名称"></Input>
					</Form-item>
					<Form-item label="单位编码 :" prop="code">
						<Input v-model="compileForm.code" placeholder="编码"></Input>
					</Form-item>
					<Form-item label="单位描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="客户级别描述"></Input>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>
<script>
	import api from '@/api/api'
	import treeTable from '@/page/base/comm/unitadd.vue'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			treeTable: treeTable,
			tis: tis
		},
		mounted() {
			this.med();
		},
		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

				data: '',
				div_tit: false,
				clientClassifyModel: false,
				// enterType : 1,  //  1 : root  2: child 3 : edit
				compileForm: {
					name: '',
					code: '',
					description: ''
				},
				ruleValidate: {
					name: [{
							required: true,
							message: '计量单位名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '计量单位名称不能超过30个字符'
						}
					],
					code: [{
							required: true,
							message: '计量单位编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 32,
							message: '计量单位编码不能超过32个字符'
						}
					],
					description: [
						{
							type: 'string',
							max: 500,
							message: '计量单位描述不能超过500个字符'
						}
					]
				},
				isEdit: false,
				prevClass: null,
				editIndex: ''
			}
		},
		methods: {
			show(index) {
				this.clientClassifyModel = true;
			},
			med() {
				this.axios(api.rootBaseUnit + api.queryAll)
                .then((res) => {
                    this.data = res.data.datas;
                })
                .catch((err) => {
                    console.log(err);
                })
			},
			//          新加/编辑
			confirm(name) {
				const _this = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(!this.isEdit) {
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: api.rootBaseUnit + api.addAndQueryAll,
									data: api.convertParam(_this.compileForm)
								})

								.then(function(res) {
									if(res.data.status == 1) {
										_this.data = res.data.datas
										_this.clientClassifyModel = false;
										_this.compileForm.name = '';
										_this.compileForm.code = '';
										_this.compileForm.description = '';
										//_this.$Message.success('添加成功');
										_this.do_yn = true;
										_this.re_do = "添加成功";
										setTimeout(() => {_this.do_yn = false;}, 2000);
										_this.isEdit = false;
									} else {
										_this.do_no = true;
										_this.re_do = res.data.message;
										setTimeout(() => {_this.do_no = false;}, 2000);
										//										_this.$Message.error(res.data.message);
									}
								})
						} else {
							const editInfo = _this.compileForm;
							editInfo.id = this.data[this.editIndex].id;
							_this.axios({
									method: 'post',
									header: {"Content-Type": 'application/x-www-form-urlencoded'},
									url: api.rootBaseUnit + api.modify,
									data: api.convertParam(editInfo)
								})
								.then(function(res) {
									if(res.data.status == 1) {
										_this.clientClassifyModel = false;
										_this.data[_this.editIndex].name = _this.compileForm.name;
										_this.data[_this.editIndex].code = _this.compileForm.code;
										_this.data[_this.editIndex].description = _this.compileForm.description;
										_this.compileForm.name = '';
										_this.compileForm.code = '';
										_this.compileForm.description = '';
										_this.isEdit = false;
									} else {
										_this.do_no = true;
										_this.re_do = res.data.message;
										setTimeout(() => {_this.do_no = false;}, 2000);
										//_this.$Message.error(res.data.message);
									}
								})
						}
					} else {
						_this.do_no = true;
						_this.re_do = res.data.message;
						setTimeout(() => {_this.do_no = false;}, 2000);
						//_this.$Message.error(res.data.message);
					}
				})
			},
			addRoot() {
				this.compileForm = {
					name: '',
					code: '',
					description: ''
				};
				this.div_tit = true;
				this.clientClassifyModel = true;
			},
			edit(index) {
				const _this = this;
				this.div_tit = false;
				this.editIndex = index;
				_this.axios(api.rootBaseUnit + _this.data[index].id + api.query)
					.then(function(res) {
						const info = res.data.datas;
						_this.clientClassifyModel = true;
						_this.compileForm.name = info.name;
						_this.compileForm.code = info.code;
						_this.compileForm.description = info.description;
						_this.isEdit = true;
					})
			},
			del(index) {
				const _this = this;
				_this.axios(api.rootBaseUnit + this.data[index].id + api.delete)
					.then(function(res) {
						_this.data.splice(index, 1);
					})
			},
			cancel() {
				// this.delModel = false;
				this.clientClassifyModel = false;
				this.compileForm.name = '';
				// this.compileForm.EPR = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
			}
		}
	}
</script>

<style scoped>
	.ivu-form-item {
		margin-bottom: 20px;
	}
	
	.table {
		display: table;
		width: 100%;
		margin: 10px;
	}
	
	.child-table {
		display: block;
		width: 100%;
		height: 55px;
		line-height: 55px;
	}
	
	.table-header {
		position: relative;
		left: 0;
		right: 0;
		display: table-header-group;
		background: #eef1f9;
		border: 1px solid #e1e7f6;
		/*color: #fff;*/
	}
	
	.table-tr {
		display: table-row;
		background: #fff;
	}
	
	.table-tr:hover {
		background: #ebf7ff;
	}
	
	.table-td {
		display: table-cell;
		height: 50px;
		/*width: 20%;*/
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
		font-size: 13px !important;
		font-weight: 600;
	}
	
	.align_left {
		text-align: left;
		padding-left: 30px;
	}
	
	.table_qaz {
		/*box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);*/
		position: absolute;
		top: 118px;
		left: 20px;
		bottom: 10px;
		right: 10px;
		overflow: hidden;
		overflow-y: scroll;
		z-index: 99;
		padding-bottom: 50px;
	}
	
	.ivu-form-item-content {
		margin-left: 120px !important;
	}
	
	.bold {
		padding: 0 5px 0 0;
	}
	
	.bold:before {
		content: "";
		position: absolute;
		top: 87px;
		width: 1px;
		height: 15px;
		background: #bbb;
	}
</style>