<template>
	<div class="trade">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>客户管理</Breadcrumb-item>
			<Breadcrumb-item>行业设置</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
			<div class="btn-box-right">
                <button class="btn-new" @click.prevent='addRoot'>新增</button>
                <button class="btn-cancel">导入</button>
                <button class="btn-cancel">导出</button>
                <button class="btn-download">模板下载</button>
            </div>
            <div class="table">
                <div class="table-header">
                    <div class="table-td bold"><span>行业名称</span></div>
                    <div class="table-td bold"><span>操作</span></div>
                </div>
                <div class="table-tbody">
                    <div class="table-tr" v-for='(classify , index) in data'>
                        <tree-table :model='classify' :index='index' @del='del' @edit='edit'></tree-table>
                    </div>
                </div>
            </div>
			<Modal v-model="clientClassifyModel">
				<h3 class="h3" v-if="!this.isEdit">新增行业分类</h3>
				<h3 class="h3" v-else-if="this.isEdit">编辑</h3>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="50">
					<Form-item label="名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="名称"></Input>
					</Form-item>
					<Form-item label="编码:" prop="code">
						<Input v-model="compileForm.code" placeholder="编码"></Input>
					</Form-item>
					<Form-item label="描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="行业描述"></Input>
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
	import treeTable from '@/page/cooperation/customer/treeTable_rank.vue'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			treeTable: treeTable,
			tis: tis
		},
		created() {
			this.axios(api.indeustry + api.indeustryqueryAll)
            .then((res) => {
                this.data = res.data.datas;
            })
		},
		data() {
			return {
				data: '',
				re_do: '',
				do_yn: false,
				do_no: false,

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
							message: '行业名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 100,
							message: '行业名称不能超过100个字符'
						}
					],
					code: [{
							required: true,
							message: '行业编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '行业编码不能超过30个字符'
						}
					],
					description: [{
							required: true,
							message: '行业描述不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 500,
							message: '行业描述不能超过500个字符'
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
			confirm(name) {
				const _this = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(!this.isEdit) {
							var compileF = {
								name: _this.compileForm.name,
								code: _this.compileForm.code,
								description: _this.compileForm.description
							};
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: api.indeustry + api.indeustryAdd,
									data: api.convertParam(compileF)
								})
								.then(function(res) {
									if(res.data.status == 1) {
										_this.data.push(res.data.datas);
										_this.clientClassifyModel = false;
										_this.compileForm.name = '';
										_this.compileForm.code = '';
										_this.compileForm.description = '';
										//_this.$Message.success('添加成功');
										_this.do_yn = true;
										_this.re_do = "添加成功";
										setTimeout(() => {
											_this.do_yn = false;

										}, 2000);

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
									url: api.indeustry + api.indeustryModify,
									data: api.convertParam(editInfo)
								})
								.then(function(res) {
									_this.data[_this.editIndex] = res.data.datas;
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
				setTimeout(() => {this.clientClassifyModel = true;}, 100);
			},
			edit(index) {
				this.editIndex = index;
				this.axios(api.indeustry + this.data[index].id + api.indeustryGetById)
                .then((res) => {
                    const info = res.data.datas;
                    this.clientClassifyModel = true;
                    this.compileForm.name = info.name;
                    this.compileForm.code = info.code;
                    this.compileForm.description = info.description;
                    this.isEdit = true;
                })
			},
			del(index) {
				this.axios(api.indeustry + this.data[index].id + api.indeustryDel)
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
	
	.h3 {
		height: 40px;
	}
	
	.h3:before {
		content: "";
		border-left: 1px #ddd solid;
		padding: 0 3px;
	}
	
	.table {
		display: block;
		width: 100%;
		margin: 10px;
	}
	
	.child-table {
		display: block;
		width: 200%;
	}
	
	.table-header {
		display: flex;
		background: #eef1f9;
		border: none;
		border-bottom: 1px solid #e1e7f6;
		/*color: #fff;*/
	}
	
	.table-tbody {
		display: block;
	}
	
	.table-tr {
		display: block;
		background: #fff;
	}
	
	.table-tr:hover {
		background: #ebf7ff;
	}
	
	.table-td {
		display: block;
		height: 30px;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
	}
	
	.bold span {
		padding-left: 5px;
		border-left: 1px solid #ddd;
	}
	
	.bold:first-of-type {
		font-weight: bold;
		height: 50px;
		padding-left: 30px;
		width: 60%;
		display: inline-block;
		line-height: 50px;
		border: none;
	}
	
	.bold:nth-of-type(2) {
		width: 40%;
		display: inline-block;
		height: 50px;
		line-height: 50px;
		border: none;
	}
	
	.table-td {
		text-align: left;
	}
</style>