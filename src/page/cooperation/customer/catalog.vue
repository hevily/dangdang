<template>
	<div class="clientClassify">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>客户管理</Breadcrumb-item>
			<Breadcrumb-item>客户分类</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
			<Row>
				<Col span='16' class="search-box">
                    <span>客户名称：</span>
                    <Input placeholder="请输入客户名称" style="width: 410px;margin: 0 15px 0 0;" v-model='name'></Input>
                    <button class="btn-search" type="info" @click='query'>查询</button>
				</Col>
				<Col span='8'>
                    <div class="btn-box-right">
                        <button class="btn-new" type="warning" @click.stop='addRoot' style="width: 100px;">新增客户分类</button>
                        <button class="btn-cancel" type="info">导入</button>
                        <button class="btn-cancel" type="info">导出</button>
                        <button class="btn-download" type="info">模板下载</button>
                    </div>
				</Col>
			</Row>
            <div class="table">
                <div class="table-header">
                    <div class="table-td align_left khfl" style="width: 60%;border-bottom: none;"><span>客户分类</span></div>
                    <div class="table-td cz" style="width: 40%;border-bottom: none;"><span>操作</span></div>
                </div>
                <div class="table-tbody">
                    <div class="table-tr" v-for='(classify , index) in data' style="display: block;">
                        <tree-table :model='classify' :parentModel='data' :index='index' @moveUp='moveUp'></tree-table>
                    </div>
                </div>
            </div>
			<!--
			<Modal v-model="clientClassifyModel" title="新增分类" @on-ok="confirm" @on-cancel="cancel">
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="85">
					<div class="prevClassName">
						<div class="title">上级分类:</div>
						<div class="prevName">{{ parentName }}</div>
					</div>
					<Form-item label="分类名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="分类名称"></Input>
					</Form-item>
					<Form-item label="分类编码:" prop="code">
						<Input v-model="compileForm.code" placeholder="分类编码"></Input>
					</Form-item>
			
					<Form-item label="描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="分类描述"></Input>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>-->

			<Modal v-model="clientClassifyModel" width="666">
				<div slot="header" class="del_iti">
					<span>新增客户分类</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="95">
					<FormItem class="fontitem" label="上级分类:" prop="parentName">
						<Input v-model="parentName" disabled class="inputDisabled"></Input>
					</FormItem>
					<Form-item label="分类名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="分类名称"></Input>
					</Form-item>
					<Form-item label="分类编码:" prop="code">
						<Input v-model="compileForm.code" placeholder="分类编码"></Input>
					</Form-item>
					<!-- <Form-item label="EPR编码" prop="EPR">
                        <Input v-model="compileForm.EPR" placeholder="EPR编码"></Input>
                    </Form-item> -->
					<Form-item label="描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="分类描述"></Input>
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
	import treeTable from '@/page/cooperation/customer/treeTable_classify'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			treeTable: treeTable,
			tis: tis
		},
		created() {
			this.axios(api.category + api.categoryGetRoots)
            .then((res) => {
                this.data = res.data.datas;
            })
            .catch((err) => {
                console.log(err);
            })
		},
		data() {
			return {
				data: '',
				re_do: '',
				do_yn: false,
				do_no: false,

				clientClassifyModel: false,
				compileForm: {
					parentId: '',
					name: '',
					code: '',
					description: ''
				},
				ruleValidate: {
					name: [{
							required: true,
							message: '分类名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 100,
							message: '分类名称不能超过100个字符'
						}
					],
					code: [{
							required: true,
							message: '分类编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '分类编码不能超过30个字符'
						}
					],
					description: [{
							required: true,
							message: '分类描述不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 500,
							message: '分类描述不能超过500个字符'
						}
					]
				},
				parentName: '无',
				prevClass: null,

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
						_this.axios({
								method: 'post',
								header: {"Content-Type": 'application/x-www-form-urlencoded'},
								url: api.category + api.categoryPostAddRoot,
								// url : '/prize',
								data: api.jsonData(_this.compileForm)
							})
							.then(function(res) {
								if(res.data.status == 1) {
									_this.data.push(res.data.datas);
									_this.clientClassifyModel = false;
									_this.compileForm.name = '';
									_this.compileForm.parentId = '';
									_this.compileForm.EPR = '';
									_this.compileForm.code = '';
									_this.compileForm.description = '';
									//	_this.$Message.success('添加成功');
									_this.do_yn = true;
									_this.re_do = "添加成功";
									setTimeout(() => {_this.do_yn = false;}, 2000);
								}
							})
					}
				})
			},
			addRoot() {
				// this.enterType = 1;
				this.parentName = '无';
				this.clientClassifyModel = true;
			},
			moveUp(data) {
				// console.log(data);
			},
			cancel() {
				// this.delModel = false;
				this.clientClassifyModel = false;
				this.compileForm.name = '';
				this.compileForm.parentId = '';
				// this.compileForm.EPR = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
			}
		}
	}
</script>
<style type="text/css">
	.clientClassify .table-td {
		text-align: left!important;
	}
	
	.clientClassify .ivu-table{
		top: 10px;
	}
</style>
<style scoped>
	.clientClassify {
		font-size: 14px;
	}
	
	.khfl span {
		font-weight: 600 !important;
		font-size: 13px !important;
	}
	
	.ivu-form-item {
		margin-bottom: 20px;
	}

	.table {
		display: block;
		width: 100%;
		margin: 10px;
	}
	
	.child-table {
		display: block;
		width: 100%;
	}
	
	.table-header {
		display: flex;
		background: #eef1f9;
		border: 1px solid #e1e7f6;
		border-left: none;
		border-right: none;
		height: 50px;
		align-items: center;
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
		height: 25px;
		line-height: 25px;
		width: 50%;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
	}
	
	.align_left {
		text-align: left;
		padding-left: 30px;
	}
	
	.khfl span,
	.cz span {
		border-left: 1px solid #ddd;
		padding-left: 5px;
	}
	
	.table-tr:hover {
		background: #e1e7f6;
	}
</style>