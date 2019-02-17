<template>
	<div class="clientClassify">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>客户管理</Breadcrumb-item>
			<Breadcrumb-item>客户级别</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
			<Row>
				<Col span='14' class="search-box">
                    <span>客户级别：</span>
                    <Input placeholder="请输入客户级别" style="width: 440px;margin: 0 15px 0 0;"></Input>
                    <button class="btn-search" type="info">查询</button>
				</Col>
				<Col span='10'>
                    <div class="btn-box-right">
                        <button class="btn-new" @click.stop='addRoot'>新增</button>
                        <button class="btn-cancel">导入</button>
                        <button class="btn-cancel">导出</button>
                        <button class="btn-download">模板下载</button>
                    </div>
				</Col>
			</Row>
            <div class="table">
                <div class="table-header">
                    <div class="table-td bold"><span>客户级别</span></div>
                    <div class="table-td bold"><span>操作</span></div>
                </div>
                <div class="table-tbody">
                    <div class="table-tr" v-for='(classify , index) in data'>
                        <tree-table :model='classify' :index='index' @del='del' @edit='edit'></tree-table>
                    </div>
                </div>
            </div>
			<!--<Modal v-model="clientClassifyModel">
				<h3 v-if="!this.isEdit">新增客户级别</h3>
				<h3 v-else-if="this.isEdit">编辑</h3>
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
			</Modal>-->
			<Modal v-model="clientClassifyModel" width="666">
				<div slot="header" class="del_iti">
					<span v-if="div_tit">新增客户级别</span>
					<span v-else>编辑</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="95">
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
			tis : tis
		},
		created() {
			this.axios(api.clientLevel + api.clientLevelqueryAll)
            .then((res) => {
                this.data = res.data.datas;
            })
		},
		data() {
			return {
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
							message: '客户级别名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 100,
							message: '客户级别名称不能超过100个字符'
						}
					],
					code: [{
							required: true,
							message: '客户级别编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '客户级别编码不能超过30个字符'
						}
					],
					description: [{
							required: true,
							message: '客户级别描述不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 500,
							message: '客户级别描述不能超过500个字符'
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
							_this.axios({
									method: 'post',
									header: {"Content-Type": 'application/x-www-form-urlencoded'},
									url: api.clientLevel + api.clientLevelAdd,
									data: api.jsonData(_this.compileForm)
								})
								.then(function(res) {
									if(res.data.status == 1) {
										_this.data.push(res.data.datas);
										_this.clientClassifyModel = false;
										_this.compileForm.name = '';
										_this.compileForm.code = '';
										_this.compileForm.description = '';
										//	_this.$Message.success('添加成功');
										_this.do_yn = true;
										_this.re_do = "添加成功";
										setTimeout(() => {_this.do_yn = false;}, 2000);
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
									url: api.clientLevel + api.clientLevelModify,
									data: api.jsonData(editInfo)
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
				this.div_tit = true;
				this.compileForm = {
					name: '',
					code: '',
					description: ''
				};
				this.clientClassifyModel = true;
			},
			edit(index) {
				this.editIndex = index;
				this.div_tit = false;
				this.axios(api.clientLevel + this.data[index].id + api.clientLevelQueryById)
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
				this.axios(api.clientLevel + this.data[index].id + api.clientLevelDel)
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
		display: table;
		width: 200%;
	}
	
	.table-header {
		display: flex;
		background: #eef1f9;
		border: 1px solid#e1e7f6;
		border-left: none;
		border-right: none;
		/*color: #fff;*/
	}
	
	.table-header .table-tbody {
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
		display: table-cell;
		height: 30px;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
	}
	
	.bold {
		border: none;
		height: 50px;
		line-height: 50px;
		text-align: left;
	}
	
	.bold span {
		padding-left: 5px;
		border-left: 1px solid #ddd;
		font-weight: 600;
	}
	
	.bold:first-of-type {
		width: 60%;
		padding-left: 30px;
	}
	
	.bold:nth-of-type(2) {
		width: 40%;
	}

    .ivu-row{
    margin-bottom: 25px!important;
    }
</style>