<template>
	<div class="area">
		<Breadcrumb style="padding-left: 2px;">
			<Breadcrumb-item><span class="link_span">首页</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">部门设置</span></Breadcrumb-item>
			<div class="Bread_ri">
				<div>
					<img src="../../assets/img/wwj_t.png" alt="" />
					<span>配置</span>
				</div>
				<div>
					<img src="../../assets/img/wjj_m.png" alt="" />
					<span>帮助</span>
				</div>
			</div>
		</Breadcrumb>
		<div class="depa_box test-1">
			<div class="three_span">
				<span @click="deve_in">员工账号</span>
				<span style="color: #0083c0;">部门设置</span>
				<span @click="deve">员工权限设置</span>
			</div>
			<div class="btn-box-right">
				<button class="btn-new" @click='addRoot'>新增部门</button>
			</div>
			<div class="bor">
				<div class="table">
					<!--<div class="table-header">
                    <div class="table-td align_left">部门名称</div>
                    <div class="table-td">操作</div>
                </div>-->
					<div class="table-tbody">
						<div class="table-tr" v-for='(classify , index) in data'>
							<tree-table :model='classify' :parentModel='data' :index='index' @moveUp='moveUp'></tree-table>
						</div>
					</div>
				</div>
			</div>
			<Modal v-model="clientClassifyModel" title="新增部门">
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="120">
					<div class="prevClassName">
						<div class="title">上级部门:</div>
						<div class="prevName">{{ parentName }}</div>
					</div>
					<Form-item label="部门名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="部门名称"></Input>
					</Form-item>
					<Form-item label="部门编码" prop="code">
						<Input v-model="compileForm.code" placeholder="部门编码"></Input>
					</Form-item>
					<Form-item label="ERP编码" prop="EPR">
						<Input v-model="compileForm.EPR" placeholder="EPR编码"></Input>
					</Form-item>
					<Form-item label="部门描述" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="部门描述"></Input>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>

					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>返回</Button>
				</div>
			</Modal>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import treeTable from '@/components/z_sys/treeTable_department'
	export default {
		components: {
			treeTable: treeTable
		},
		mounted() {
			const _this = this;
			_this.axios({
					method: 'get',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: api.sysDepartment + api.sysDepartmentFetchAsTree,
					// url : '/prize',
				})
				.then(function(res) {
					if(res.data.status == 1) {
						_this.data = res.data.datas;
					}else{
						this.$Message.error(res.data.message);
					}
				})
			/*this.axios(api.sysDepartment + api.sysDepartmentFetchAsTree)
			    .then(function(res) {
			    	console.log("-----------");
			    	console.log(res);
			        _this.data = res.data.datas;
			    })
			    .catch(function(err) {
			        console.log(err);
			    })*/
		},

		data() {
			return {
				data: '',
				clientClassifyModel: false,
				compileForm: {
					parentId: '',
					name: '',
					code: '',
//					level:'',
					description: ''
				},
				ruleValidate: {
					name: [{
							required: true,
							message: '部门名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 100,
							message: '部门名称不能超过100个字符'
						}
					],
					code: [{
							required: true,
							message: '部门编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '部门编码不能超过30个字符'
						}
					],
					description: [{
							required: true,
							message: '部门描述不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 500,
							message: '部门描述不能超过500个字符'
						}
					]
				},
				parentName: '无',
				prevClass: null,

			}
		},
		methods: {
			deve_in() {
				let _this = this;
				_this.$router.push({
					path: '/developing'
				});
			},
			deve() {
				let _this = this;
				_this.$router.push({
					path: '/developing_detailed'
				});
			},
			show(index) {
				this.clientClassifyModel = true;
			},
			confirm(name) {
				const _this = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.sysDepartment + api.sysDepartmentAdd,
								// url : '/prize',
								data: api.convertParam(_this.compileForm)
							})
							.then(function(res) {
								if(res.data.status == 1) {
									console.log(_this.compileForm);
									_this.data.push(res.data.datas);
									_this.clientClassifyModel = false;
									_this.compileForm.name = '';
									_this.compileForm.parentId = '';
									_this.compileForm.code = '';
									_this.compileForm.description = '';
									_this.$Message.success("添加成功");
				 			    	setTimeout(() => {
					                   _this.$router.go(0)
					                }, 2000);
								}
								else{
									_this.$Message.error(res.data.message);
								}
							})
					}
				})

			},
			addRoot() {
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
<style>
	.table {
		margin: 0!important;
	}
	
	.ivu-btn {
		padding-left: 15px!important;
		padding-right: 15px!important;
	}
</style>
<style scoped>
	.bor {
		/*margin-top: 16px;*/
		border-top: 1px solid #ddd;
	}

	.depa_box {
		background: #fff;
		overflow: auto;
		padding: 20px 20px;
		position: absolute;
		top: 45px;
		bottom: 10px;
		left: 2px;
		right: 30px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
	}
	
	.three_span {
		border-bottom: 1px solid #ccd9e6;
		padding: 0px 0 20px 0;
		margin-bottom: 20px;
	}
	
	.three_span span {
		margin-right: 80px;
		font-size: 16px;
	}
	
	.three_span span:hover {
		color: #0083c0;
		cursor: pointer;
	}
	
	.buttonM:nth-last-child(1) {
		position: relative !important;
		margin: 0;
	}
	
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
		width: 100%;
	}
	
	.table-header {
		display: table-header-group;
		background: #f5f7f9;
		border: 1px solid #ddd;
		/*color: #fff;*/
	}
	
	.table-tbody {
		display: table-row-group;
	}
	
	.table-tr {
		display: table-row;
		background: #fff;
	}
	
	.table-tr:hover {
		background: #f9f9f9;
	}
	
	.table-td {
		display: table-cell;
		height: 30px;
		width: 50%;
		vertical-align: middle;
		text-align: right;
		border-bottom: 1px solid #ddd;
	}
	
	.align_left {
		text-align: left;
		padding-left: 30px;
	}
	
	.but {
		width: 90px;
		height: 35px;
		background-color: #00a8ff;
		border-color: #00a8ff;
	}
	
	.but:hover {
		background-color: #3abcff;
		border-color: #3abcff;
	}
	
	.Bread_ri {
		position: absolute;
		top: 15px;
		right: 3px;
		display: flex;
	}
	
	.Bread_ri div {
		display: flex;
		align-items: center;
		margin-left: 20px;
	}
	
	.Bread_ri div img {
		width: 14px;
		height: 14px;
	}
	
	.modelFooter Button {
		width: 100px;
		height: 35px;
		border: 1px solid #faa600;
		border-radius: 5px;
	}
	
	.modelFooter Button:nth-of-type(1) {
		background: #faa600;
	}
	
	.modelFooter Button:nth-of-type(2) {
		color: #faa600;
	}
	
	.ivu-modal-header p,
	.ivu-modal-header-inner {
		color: #0191d4 !important;
	}
</style>