<template>
	<div class="clientClassify">
		<Breadcrumb>
			<Breadcrumb-item>	
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link></Breadcrumb-item>
			<Breadcrumb-item>客户管理</Breadcrumb-item>
			<Breadcrumb-item>品牌管理</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
            <div class="btn-box-right">
                <button class="btn-new" @click.stop='addRoot'>新增</button>
                <button class="btn-cancel">导入</button>
                <button class="btn-cancel">导出</button>
                <button class="btn-download">模板下载</button>
			</div>
			<div>
				<div class="table">
					<div class="table-header">
						<div class="table-td" style="width:10%;"><span>编号</span></div>
						<div class="table-td" style="width:25%"><span>品牌名称</span> </div>
						<div class="table-td" style="width:25%"><span>品牌编码</span> </div>
						<div class="table-td" style="width:30%"><span>品牌描述</span> </div>
						<div class="table-td" style="width:10%"><span>操作</span></div>
					</div>
					<div class="table-tbody">
						<div class="table_qaz test-1">
							<tree-table v-for='(classify,index) in data' :model='classify' :pagenum='fenYe.page' :index='index' @del='del' @edit='edit' :key="index"></tree-table>
						</div>
					</div>
				</div>
			</div>
			<Modal v-model="clientClassifyModel" width="666">
				<div class="div_tit">
					<span v-if="div_tit">新增品牌信息</span>
					<span v-else>编辑品牌信息</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="85">
					<Form-item label="名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="名称"></Input>
					</Form-item>
					<Form-item label="编码:" prop="code">
						<Input v-model="compileForm.code" placeholder="编码"></Input>
					</Form-item>
					<Form-item label="描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="客户级别描述"></Input>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>
		</div>
		<div class="page-bot">
			<Page :total="totalCount" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	import treeTable from '@/page/base/comm/brandadd.vue'
	export default {
		components: {
			treeTable: treeTable
		},
		mounted() {
			this.axios({
                method: 'post',
                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                url: api.baseBrand + api.queryFen,
                data: api.convertParam(this.fenYe)
            })
            .then((res) => {
                this.totalCount = res.data.datas.total;
                this.data = res.data.datas.list;
            })

			/*_this.axios('/api/base/brand/queryAll.do')
				.then(function(res) {
					_this.data = res.data.datas.list;
				})
				*/
		},
		data() {
			return {
				attrList: [],
				totalCount: 30,
				data: '',
				div_tit: true,
				clientClassifyModel: false,
				// enterType : 1,  //  1 : root  2: child 3 : edit
				compileForm: {
					name: '',
					code: '',
					description: ''
				},
				fenYe: {
					//name: '',
					//code: '',
					rows: '10',
					page: '1'
				},
				ruleValidate: {
					name: [{
							required: true,
							message: '品牌名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '品牌名称不能超过30个字符'
						}
					],
					code: [{
							required: true,
							message: '品牌编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 32,
							message: '品牌编码不能超过32个字符'
						}
					],
					description: [{
						type: 'string',
						max: 500,
						message: '品牌描述不能超过500个字符'
					}]
				},
				isEdit: false,
				prevClass: null,
				editIndex: ''
			}
		},
		methods: {
			toPage(count) {
				const _this = this;
				_this.fenYe.page = count;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.baseBrand + api.queryFen,
						data: api.convertParam(_this.fenYe)
					})
					.then(function(res) {
						_this.totalCount = res.data.datas.total;
						_this.data = res.data.datas.list;
						_this.DOM.content.scrollTop = 0;
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			show(index) {
				this.clientClassifyModel = true;
			},
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
									url: api.baseBrand + api.addAndQueryAll,
									data: api.convertParam(_this.compileForm)
								})
								.then(function(res) {
									if(res.data.status == 1) {
										_this.axios({
												method: 'post',
												header: {
													"Content-Type": 'application/x-www-form-urlencoded'
												},
												url: api.baseBrand + api.queryFen,
												data: api.convertParam(_this.fenYe)
											})
											.then(function(res) {
												_this.totalCount = res.data.datas.total;
												_this.data = res.data.datas.list;
												_this.DOM.content.scrollTop = 0;
												_this.isEdit = false;

											})
											.catch(function(err) {
												console.log(err);
											})
										_this.clientClassifyModel = false;
										_this.compileForm.name = '';
										_this.compileForm.code = '';
										_this.compileForm.description = '';
										_this.isEdit = false;
										_this.do_yn = true;
										_this.re_do = "添加成功";
										setTimeout(() => {
											_this.do_yn = false;

										}, 2000);

										//_this.$Message.success('添加成功');
									} else {
										_this.do_no = true;
										_this.re_do = res.data.message;
										setTimeout(() => {
											_this.do_no = false;

										}, 2000);

										//	_this.$Message.success(res.data.message);
									}

								})
						} else {
							const editInfo = _this.compileForm;
							editInfo.id = this.data[this.editIndex].id;
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: api.baseBrand + api.spModify,
									data: api.convertParam(editInfo)
								})
								.then(function(res) {
									_this.data[_this.editIndex].name = _this.compileForm.name;
									_this.data[_this.editIndex].code = _this.compileForm.code;
									_this.data[_this.editIndex].description = _this.compileForm.description;
									_this.clientClassifyModel = false;
									_this.compileForm.name = '';
									_this.compileForm.code = '';
									_this.compileForm.description = '';
									_this.isEdit = false;
								})
						}
					}
				})

			},
			addRoot() {
				let _this = this;
				this.div_tit = true;
				//				_this.title = '新增品牌信息';
				_this.compileForm = {
					endRow: '',
					name: '',
					code: '',
					description: ''
				};
				_this.clientClassifyModel = true;
			},
			edit(index) {
				let _this = this;
				this.div_tit = false;
				this.editIndex = index;
				//_this.title = '编辑品牌信息';
				_this.axios(api.rootBaseBrand + _this.data[index].id + api.query)
					.then(function(res) {
						_this.clientClassifyModel = true;
						_this.compileForm.name = res.data.datas.name;
						_this.compileForm.code = res.data.datas.code;
						_this.compileForm.description = res.data.datas.description;
						_this.isEdit = true;
					})
			},
			del(index) {
				this.axios(api.rootBaseBrand + this.data[index].id + api.delete)
                .then((res) => {
                    this.data.splice(index, 1);
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
	}
	
	.table-td span {
		padding-left: 7px;
		border-left: 1px solid #cdd9e6;
		font-weight: bold;
	}
	
	.table-td:first-of-type span {
		padding: 0;
		margin-left: 20px;
		border: none;
	}
	
	.bold {
		font-weight: bold;
	}
	
	.table_qaz {
		position: absolute;
		top: 119px;
		left: 20px;
		bottom: 100px;
		right: 10px;
		overflow: hidden;
		overflow-y: scroll;
		/*padding-bottom: 30px;*/
	}
	
	.mag {
		margin-right: 10px;
	}
</style>