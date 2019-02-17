<template>
	<div class="area">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
                        <span class="link_span">首页</span>
                    </router-link>
				</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">组织</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">部门设置</span></Breadcrumb-item>
		</Breadcrumb>
		<div class="Bread_ri">
				<div>
					<img src="../../../assets/img/wwj_t.png" alt="" />
					<span>配置</span>
				</div>
				<div>
					<img src="../../../assets/img/wjj_m.png" alt="" />
					<span>帮助</span>
				</div>
			</div>
		<div class="right_home_warp-nobot test-1">
			<div class="three_span">
				<span @click="deve_in">员工账号</span>
				<span style="color: #00c1de;">部门设置</span>
				<span @click="deve">员工权限设置</span>
			</div>
            <div>
                <button class="btn-new" @click.stop='addRoot' style="margin-bottom: 20px;">新增部门</button>
            </div>
			<div>
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

			<Modal v-model="clientClassifyModel" width="666">
				<div slot="header" class="del_iti">
					<span>新增部门</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="80">
					<!--<div class="prevClassName">
						<div class="title">上级部门:</div>
						<div class="prevName">{{ parentName }}</div>
					</div>-->
					<FormItem class="fontitem" label="上级部门:" prop="parentName">
						<Input v-model="parentName" disabled class="inputDisabled"></Input>
					</FormItem>

					<Form-item label="部门名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="部门名称"></Input>
					</Form-item>
					<Form-item label="部门编码:" prop="code">
						<Input v-model="compileForm.code" placeholder="部门编码"></Input>
					</Form-item>
					<Form-item label="ERP编码:" prop="EPR">
						<Input v-model="compileForm.EPR" placeholder="EPR编码"></Input>
					</Form-item>
					<Form-item label="部门描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="部门描述"></Input>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>返回</Button>
				</div>
			</Modal>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>

<script>
	import api from '@/api/api'
	import treeTable from '@/page/set/treeTable_department'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			treeTable: treeTable,
			tis: tis
		},
		mounted() {
			this.axios({
                method: 'get',
                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                url: api.sysDepartment + api.sysDepartmentFetchAsTree,
                // url : '/prize',
            })
            .then((res) => {
                if(res.data.status == 1) {
                    this.data = res.data.datas;
                } else {
                    this.do_no = true;
                    this.re_do = res.data.message;
                    setTimeout(() => {this.do_no = false;}, 2000);
                    //this.$Message.error(res.data.message);
                }
            })

            /*this.axios(api.sysDepartment + api.sysDepartmentFetchAsTree)
            .then((res) => {
                console.log("-----------");
                console.log(res);
                this.data = res.data.datas;
            })
            .catch((err) => {
                console.log(err);
            })*/
		},
		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

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
				this.$router.push({path: '/sys/user/main'});
			},
			deve() {
				this.$router.push({path: '/sys/role/main'});
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
								header: {"Content-Type": 'application/x-www-form-urlencoded'},
								url: api.sysDepartment + api.sysDepartmentAdd,
								// url : '/prize',
								data: api.convertParam(_this.compileForm)
							})
							.then(function(res) {
								if(res.data.status == 1) {
									//_this.data.push(res.data.datas);
									_this.clientClassifyModel = false;
									_this.compileForm.name = '';
									_this.compileForm.parentId = '';
									_this.compileForm.code = '';
									_this.compileForm.description = '';
									//_this.$Message.success("添加成功");
									_this.do_yn = true;
									_this.re_do = "添加成功";
									setTimeout(() => {_this.do_yn = false;}, 2000);
									setTimeout(() => {_this.$router.go(0)}, 2000);
								} else {
									_this.do_no = true;
									_this.re_do = res.data.message;
									setTimeout(() => {_this.do_no = false;}, 2000);
									//	_this.$Message.error(res.data.message);
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
		color: #00c1de;
		cursor: pointer;
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
		background: #eef1f9;
		border: 1px solid #e1e7f6;
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
		background: #ebf7ff;
	}
	
	.table-td {
		display: table-cell;
		height: 30px;
		width: 50%;
		vertical-align: middle;
		text-align: right;
		border-bottom: 1px solid #e1e7f6;
	}
	/*.table-td {
        width: 200%;
    }*/
	
	.align_left {
		text-align: left;
		padding-left: 30px;
	}
	
	.table-tbody {
		font-size: 13px!important;
	}
	
	.Bread_ri {
		position: absolute;
		top: 12px;
		right: 15px;
		display: flex;
		margin-right: 30px;
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
	
	.ivu-modal-header p,
	.ivu-modal-header-inner {
		color: #0191d4 !important;
	}
</style>