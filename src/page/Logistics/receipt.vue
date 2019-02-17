<template>
	<div class="area">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>设置</Breadcrumb-item>
			<Breadcrumb-item>收货地址</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Row>
				<Col span='8' class="but_title">
				    <span>收货地址</span>
				</Col>
				<Col span='16'>
                    <div  class="btn-box-right">
                        <button type="warning" @click="addRoot">新增收货地址</button>
                    </div>
				</Col>
			</Row>
            <div class="table">
                <div class="table-header">
                    <div class="table-td align_left ttd" style="width: 5%;"><span>序号</span></div>
                    <div class="table-td align_left ttd" style="width: 15%;"><span>收货人</span></div>
                    <div class="table-td align_left ttd" style="width: 20%;"><span>联系电话</span></div>
                    <div class="table-td align_left3 ttd" style="width: 40%;"><span>收货地址</span></div>
                    <div class="table-td align_left3  ttd" style="width: 20%;"><span>操作</span></div>
                </div>
                <div class="table-tbody">
                    <div class="table-tr" v-for='(classify , index) in data'>
                        <tree-table :model='classify' :parentModel='data' @nrchange='datachange(index)' @addresschange='addresschange' :key='index' :index='index' @moveUp='moveUp'></tree-table>
                    </div>
                </div>
            </div>
			<Modal v-model="clientClassifyModel" width="666">
				<div slot="header" class="del_iti">
					<span>新增收货地址</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="100">
					<Form-item label="收货人:" prop="name">
						<Input v-model="compileForm.name" placeholder="收货人"></Input>
					</Form-item>
					<Form-item label="联系电话:" prop='tel'>
						<Input v-model="compileForm.tel" placeholder="联系电话"></Input>
					</Form-item>
					<Form-item label="收货地址:">
						<Select placeholder="请选择省" v-model="compileForm.provinceId" @on-change="registeredprovinceOK" label-in-value='true' style="width:32%">
							<Option v-for="provinceName in depList1" :value="provinceName.id" :key="provinceName.id">{{ provinceName.name }}</Option>
						</Select>
						<Select placeholder="请选择市" v-model="compileForm.cityId" @on-change="registeredcityOK" label-in-value='true' style="width:32%">
							<Option v-for="cityeName in depList2" :value="cityeName.id" :key="cityeName.id">{{ cityeName.name }}</Option>
						</Select>
						<Select placeholder="请选择区" v-model="compileForm.countyId" label-in-value='true' style="width:32%">
							<Option v-for="countyName in depList3" :value="countyName.id" :key="countyName.id">{{ countyName.name }}</Option>
						</Select>
					</Form-item>
					<Form-item label="" prop='address'>
						<Input v-model="compileForm.address" placeholder="详细收货地址"></Input>
					</Form-item>
					<Form-item label="地址邮编:" prop='postcode'>
						<Input v-model="compileForm.postcode" placeholder="地址邮编"></Input>
					</Form-item>

				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>
		</div>
		<div class="btn-bot">
			<!-- <Page :total="pageInfo.count" :current="pageInfo.page" :page-size="pageInfo.rows" show-elevator @on-change="pageFun"></Page> -->
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>

<script>
	import api from '@/api/api'
	import treeTable from '@/page/logistics/table_receipt.vue'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			treeTable: treeTable
		},
		mounted() {
			const _this = this;

			_this.compileForm.customerId = _this.userInfo.id;
			console.log('custmoner', _this.compileForm.customerId);

			_this.searchaddress();

			_this.axios({
					method: 'get',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: '/api/base/address/queryAllProvinces.do'
				})
				.then(function(res) {
					if(res.data.status == 1) {
						_this.depList1 = res.data.datas;
					}

				})

		},
		computed: {
			userInfo() {
				return this.$store.state.user.user
			}
		},
		data() {
			const validatePass = (rule, value, callback) => {

				var mobile = /^1[3|5|8]\d{9}$/,
					phone = /^0\d{2,3}-?\d{7,8}$/;

				if(mobile.test(value) || phone.test(value)) {
					callback();

				} else {
					callback(new Error('请输入正确的手机号或座机号'));
				}

			};
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

				depList1: '',
				depList2: '',
				depList3: '',

				data: '',
				clientClassifyModel: false,
				compileForm: {
					customerId: '',
					name: '',
					code: '',
					description: '',
					provinceId: '',
					cityId: '',
					countyId: '',
					postcode: '',
					tel: '',
					defaultStatus: 0,
					address: '',
					changeoradd: ''
				},
				pageInfo: {
					name: '', //公司
					count: 10,
					page: 1, //page
					rows: 10 //rows

				},
				ruleValidate: {
					name: [{
							required: true,
							message: '收货人能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 20,
							message: '收货人不能超过20个字符'
						}
					],
					tel: [{
							required: true,
							message: '联系电话不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 20,
							message: '联系电话不能超过20个字符'
						}, {
							type: 'string',
							validator: validatePass,
							trigger: 'blur'
						}
					],
					postcode: [{
						type: 'string',
						max: 6,
						message: '邮编不能超过6个字符'
					}],
					address: [{
						type: 'string',
						max: 150,
						message: '详细收货地址不能超过150个字符'
					}]
				},
				parentName: '无',
				prevClass: null,

			}
		},
		methods: {
			addresschange(index) {
				const _this = this;

				_this.clientClassifyModel = true;
				_this.compileForm.changeoradd = 1;

				_this.compileForm.customerId = index.customerId;
				_this.compileForm.id = index.id;
				_this.compileForm.name = index.name;
				_this.compileForm.code = index.code;
				_this.compileForm.description = index.description;
				_this.compileForm.provinceId = index.provinceId;
				_this.compileForm.cityId = index.cityId;
				_this.compileForm.countyId = index.countyId;
				_this.compileForm.postcode = index.postcode;
				_this.compileForm.tel = index.tel;
				_this.compileForm.defaultStatus = index.defaultStatus;
				_this.compileForm.address = index.address;

			},
			datachange(index) {
				const _this = this;

				_this.searchaddress();
			},
			searchaddress() {
				const _this = this;
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/upms/corp/consignee/' + _this.compileForm.customerId + '/queryListByCorpId.do',
						data: api.convertParam({
							customerId: _this.compileForm.customerId
						})
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.data = res.data.datas;
						}

					})
			},
			show(index) {
				this.clientClassifyModel = true;
			},
			confirm(name) {
                const _this = this;
                console.log("_this.compileForm",_this.compileForm);
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(_this.compileForm.changeoradd == 0) {
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: '/api/upms/corp/consignee/add.do',
									data: api.convertParam(_this.compileForm)
								})
								.then(function(res) {
									console.log(res);
									if(res.data.status == 1) {

										_this.clientClassifyModel = false;

										_this.compileForm.name = '';
										_this.compileForm.code = '';
										_this.compileForm.description = '';
										_this.compileForm.provinceId = '';
										_this.compileForm.cityId = '';
										_this.compileForm.countyId = '';
										_this.compileForm.postcode = '';
										_this.compileForm.tel = '';
										_this.compileForm.defaultStatus = 0;
										_this.compileForm.address = '';

										_this.searchaddress();

										_this.do_yn = true;
										_this.re_do = "添加成功";
										setTimeout(() => {
											_this.do_yn = false;

										}, 2000);
									}
								})
						} else if(_this.compileForm.changeoradd == 1) {
							
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: '/api/customer/consignee/modify.do',
									data: api.convertParam(_this.compileForm)
								})
								.then(function(res) {
									console.log(res);
									if(res.data.status == 1) {

										_this.clientClassifyModel = false;
										_this.compileForm.name = '';
										_this.compileForm.code = '';
										_this.compileForm.description = '';
										_this.compileForm.provinceId = '';
										_this.compileForm.cityId = '';
										_this.compileForm.countyId = '';
										_this.compileForm.postcode = '';
										_this.compileForm.tel = '';
										_this.compileForm.defaultStatus = 0;
										_this.compileForm.address = '';

										_this.searchaddress();

										_this.do_yn = true;
										_this.re_do = "修改成功";
										setTimeout(() => {
											_this.do_yn = false;

										}, 2000);
									}
								})

						}

					}
				})

			},
			addRoot() {
				const _this = this;
				_this.compileForm.changeoradd = 0;
				_this.compileForm.customerId = _this.userInfo.id;
				_this.parentName = '无';
				_this.clientClassifyModel = true;
				console.log(_this.data);
			},
			moveUp(data) {
				// console.log(data);
			},
			cancel() {
				// this.delModel = false;
				this.clientClassifyModel = false;
				this.compileForm.name = '';
				// this.compileForm.EPR = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
			},

			registeredprovinceOK() {

				let _this = this;
				let va = _this.compileForm.provinceId;

				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/' + va + '/queryCities.do'
					})
					.then(function(res) {

						if(res.data.status == 1) {
							_this.depList2 = res.data.datas;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);
						}

					})
			},
			registeredcityOK() {

				let _this = this;
				let va = _this.compileForm.cityId;
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/' + va + '/queryCounties.do'
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.depList3 = res.data.datas;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);
						}

					})
			},

		}
	}
</script>

<style scoped>
	/*.area {
		position: absolute;
		top: 5px;
		left: 0px;
		right: 20px;
		bottom: 0;
	}*/
	
	.area .align_left {
		/*text-align: left;*/
		padding-left: 13px !important;
		/*width: 40% !important;*/
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
		border: none;
		/*color: #fff;*/
	}
	
	.table-tbody {
		display: block;
		font-size: 13px !important;
	}
	
	.table-tr {
		display: flex;
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
	/*.table-td {
        width: 200%;
    }*/
	/*.align_left2 {
		text-align: left;
		padding-left: 30px;
		width: 30%;
	}*/
	
	.align_left3 {
		text-align: left;
		/*padding-left: 30px;*/
		width: 40%;
	}
	
	
	.but_title {
		display: flex;
		align-content: center;
		font-size: 15px;
		padding-left: 15px;
		border-left: 3px solid #ccd9e6;
	}
	
	.ttd {
		height: 50px;
		line-height: 50px;
		text-align: left;
	}
	
	.ttd span {
		border-left: 1px solid #ddd;
		padding-left: 5px;
		font-size: 13px;
		font-weight: 600;
	}
</style>