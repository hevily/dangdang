<template>
	<div class="employee">
		<Breadcrumb>
			<Breadcrumb-item>首页</Breadcrumb-item>
			<Breadcrumb-item>组织</Breadcrumb-item>
			<Breadcrumb-item>人员设置</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp">
			<Form class="employeeForm" inline>
				<Button type="warning" class="addMeb" @click="addMeb">+新增人员</Button>
				<Form-item style="width:200px;">
					<Input icon="ios-search" placeholder="请输入..."></Input>
				</Form-item>
				<Form-item label="所有角色" style="width:300px;" :label-width="60">
					<Select placeholder="请选择">
						<Option value="beijing">北京市</Option>
						<Option value="shanghai">上海市</Option>
						<Option value="shenzhen">深圳市</Option>
					</Select>
				</Form-item>
			</Form>
			<div class="mebList">
				<Table stripe :columns="columnsMeb" :data="mebList"></Table>
			</div>
			<div class="pageBar">
				<Page :total="pageInfo.count" :current="pageInfo.pageStart" :page-size="pageInfo.pageNums" show-elevator></Page>
			</div>
			<Modal v-model="mebModal" title="新增人员" class="mebModal">
				<div class="mebFormItem">
					<div class="label">姓名：</div>
					<Input v-model="mebForm.name"></Input>
				</div>
				<div class="mebFormItem">
					<div class="label">身份证号：</div>
					<Input v-model="mebForm.id"></Input>
				</div>
				<div class="mebFormItem">
					<div class="label">工号：</div>
					<Input v-model="mebForm.jobNum"></Input>
				</div>
				<div class="mebFormItem">
					<div class="label">职位：</div>
					<Input v-model="mebForm.position"></Input>
				</div>
				<div class="mebFormItem">
					<div class="label">部门：</div>
					<Select v-model="mebForm.depart" placeholder="请选择">
						<Option value="beijing">北京市</Option>
						<Option value="shanghai">上海市</Option>
						<Option value="shenzhen">深圳市</Option>
					</Select>
				</div>
				<div class="mebFormItem">
					<div class="label">角色：</div>
					<Select v-model="mebForm.role" placeholder="请选择">
						<Option value="beijing">北京市</Option>
						<Option value="shanghai">上海市</Option>
						<Option value="shenzhen">深圳市</Option>
					</Select>
				</div>
				<div class="mebFormItem">
					<div class="label">手机：</div>
					<Input v-model="mebForm.mobile"></Input>
				</div>
				<div class="mebFormItem">
					<div class="label">邮箱：</div>
					<Input v-model="mebForm.email"></Input>
				</div>
				<div class="mebFormItem">
					<div class="label">QQ：</div>
					<Input v-model="mebForm.qq"></Input>
				</div>
				<div class="mebFormItem">
					<div class="label">微信：</div>
					<Input v-model="mebForm.wx"></Input>
				</div>
				<div class="mebFormItem">
					<div class="label">登陆账号：</div>
					<Input v-model="mebForm.account"></Input>
				</div>
			</Modal>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				mebForm: {
					name: '',
					id: '',
					jobNum: '',
					position: '',
					depart: '',
					role: '',
					mobile: '',
					email: '',
					qq: '',
					wx: '',
					account: ''
				},
				mebModal: false,
				pageInfo: {
					count: 1,
					pageStart: 1,
					pageNums: 10
				},
				columnsMeb: [{
						title: '姓名',
						align: 'center',
						key: 'name'
					},
					{
						title: '工号',
						align: 'center',
						key: 'jobNum'
					},
					{
						title: '手机',
						align: 'center',
						key: 'mobile'
					},
					{
						title: '职位',
						align: 'center',
						key: 'position'
					},
					{
						title: '登陆账号',
						align: 'center',
						key: 'loginAccount'
					},
					{
						title: '操作',
						key: 'action',
						align: 'center',
						width: 260,
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'text',
										size: 'small'
									},
									on: {
										click: () => {
											this.modifyMeb(params.index);
										}
									}
								}, '修改'),
								h('Button', {
									props: {
										type: 'text',
										size: 'small'
									}
								}, '删除'),
								h('Button', {
									props: {
										type: 'text',
										size: 'small'
									}
								}, '停用'),
								h('Button', {
									props: {
										type: 'text',
										size: 'small'
									}
								}, '重置密码'),
							]);
						}

					}
				],
				mebList: [{
					name: '张三',
					jobNum: '1212',
					mobile: '111111111',
					position: '经理',
					loginAccount: 'aa'
				}]
			}
		},
		methods: {
			//新增人员
			addMeb() {
				this.mebModal = true;
				this.mebForm.name = '';
				this.mebForm.id = '';
				this.mebForm.jobNum = '';
				this.mebForm.position = '';
				this.mebForm.depart = '';
				this.mebForm.role = '';
				this.mebForm.mobile = '';
				this.mebForm.email = '';
				this.mebForm.qq = '';
				this.mebForm.wx = '';
				this.mebForm.account = '';
			},
			//修改
			modifyMeb(index) {
				this.mebModal = true;
			}
		}
	}
</script>
<style>
	.mebModal .ivu-modal-body {
		overflow: auto;
	}
	
	.mebModal .ivu-select {
		width: 162px;
	}
	
	.mebFormItem {
		float: left;
		width: 50%;
		margin-bottom: 10px;
	}
	
	.mebFormItem .label {
		float: left;
		width: 60px;
		line-height: 32px;
		text-align: right;
	}
	
	.mebFormItem .ivu-input-wrapper {
		width: auto;
		overflow: auto;
	}
	
	.employeeForm {
		margin-top: 30px;
	}
	
	.employeeForm .addMeb {
		float: right;
	}
</style>