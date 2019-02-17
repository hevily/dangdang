<template>
	<div class="applyBox">
		<Breadcrumb style="padding-left: 0;">
			<Breadcrumb-item to='/main'>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">企业开票信息</span></Breadcrumb-item>
		</Breadcrumb>
		<div class="form_box right_home_warp test-1" style="right: 30px;">
			<form action="">
				<h4>企业开票信息</h4>
				<ul class="form_ul">
					<li>
						<label>发票抬头:</label><input type="text" placeholder="请输入发票抬头" v-model="formValidate.openName" />
					</li>
					<li>
						<label>税号:</label><input type="text"   placeholder="请输入税号" v-model="formValidate.dutyPara" />
					</li>
					<li>
						<label>开户银行:</label><input type="text" placeholder="请输入开户银行" v-model="formValidate.openBank" />
					</li>
					<li>
						<label>银行帐号:</label><input type="text"   placeholder="请输入银行帐号" v-model="formValidate.openBankNum" />
					</li>
					<li>
						<label>电话号码:</label><input type="text"   placeholder="请输入电话号码" v-model="formValidate.telephone" />
					</li>
					<li>
						<label>注册地址:</label><input type="text" placeholder="请输入地址" v-model="formValidate.registerDetailAddress" />
					</li>
				</ul>
				<h4>发票快递信息</h4>
				<ul class="form_ul">
					<li>
						<label>联系人:</label><input type="text" placeholder="请输入联系人名" v-model="formValidate.name" />
					</li>
					<li>
						<label>电话号码:</label><input type="text" placeholder="请输入电话号码" v-model="formValidate.mobile" />
					</li>
					<li>
						<label>地址:</label><input type="text" placeholder="请输入收货地址" v-model="formValidate.registerDetailAddress" />
					</li>
				</ul>
				<button class="btn-save" @click="kk(formValidate)">保存</button>
			</form>

		</div>

	</div>
</template>

<script>
	import api from '@/api/api'
	export default {

		data() {

			return {
				id: '',
				formValidate: {
					openName: '', //发票抬头
					dutyPara: '', //税号
					openBank: '', //开户银行
					openBankNum: '', //银行帐号
					telephone: '', //固定电话
					registerDetailAddress: '', //公司地址
					name: '', //联系人
					mobile: '', //联系电话
					actualAddress: '' //联系地址
				},

			}
		},
		methods: {
			applyInfoo() {
				let _this = this;
				let applyInfoo = {};
				applyInfoo.id = _this.id; //id
				applyInfoo.name = _this.formValidate.openName; //发票抬头
				applyInfoo.taxNumber = _this.formValidate.dutyPara; //税号
				applyInfoo.bankName = _this.formValidate.openBank; //企业开户银行
				applyInfoo.bankAccount = _this.formValidate.openBankNum; //企业银行帐号
				applyInfoo.telephone = _this.formValidate.telephone; //电话号码
				applyInfoo.address = _this.formValidate.registerDetailAddress; //公司地址
				applyInfoo.contact = _this.formValidate.name; //ming
				applyInfoo.mobile = _this.formValidate.mobile; //电话号码
				applyInfoo.actualAddress = _this.formValidate.actualAddress; //地址
				return applyInfoo;
			},
			kk(name) {
				let _this = this;
				const corp = JSON.parse(window.localStorage.getItem('corp'));
				let saveApplyInfo = _this.applyInfoo();
				let re = /(1[3-9]\d{9}$)/;
				let regh = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
  				let reg = /^\d+$/;
				if(_this.formValidate.openName == '') {
					_this.$Message.error("请输入抬头")
					return false;
				} 
				else if(_this.formValidate.openName.length > 100) {
					_this.$Message.error("抬头不能超过100个字")
					return false;
				} else if(_this.formValidate.dutyPara == '') {
					_this.$Message.error("请输入税号")
					return false;
				}
				else if(_this.formValidate.dutyPara.length > 100) {
					_this.$Message.error("税号不能超过100个字")
					return false;
				} 
				 else if(!regh.test(_this.formValidate.dutyPara)) {
				 	_this.$Message.error("请输入正确税号")
					return false;
				 }
				else if(_this.formValidate.openBank == '') {
					_this.$Message.error("请输入开户银行")
					return false;
				} 
				else if(_this.formValidate.openBank.length > 100) {
					_this.$Message.error("开户银行不能超过100个字符")
					return false;
				} 
				else if(_this.formValidate.openBankNum == '') {
					_this.$Message.error("请输入银行账号")
					return false;
				} 
				else if(_this.formValidate.openBankNum.length > 100) {
					_this.$Message.error("银行账号不能超过100个字符")
					return false;
				} 
			 else if(!reg.test(_this.formValidate.openBankNum)) {
				 	_this.$Message.error("银行账号只能是数字")
					return false;
				 }
				else if(_this.formValidate.registerDetailAddress == '') {
					_this.$Message.error("请输入公司地址")
					return false;
				}
				else if(_this.formValidate.registerDetailAddress.length > 200) {
					_this.$Message.error("公司地址不能超过200个字符")
					return false;
				} 
				else if(_this.formValidate.name == '') {
					_this.$Message.error("请输入联系人")
					return false;
				} 
				else if(_this.formValidate.name.length > 20) {
					_this.$Message.error("联系人不能超过20个字符")
					return false;
				}
				else if(_this.formValidate.telephone == '') {
					_this.$Message.error("请输入固定电话")
					return false;
				}
				 else if(!reg.test(_this.formValidate.telephone)) {
				 	_this.$Message.error("手机号只能是数字")
					return false;
				 }
				else if(!re.test(_this.formValidate.telephone)) {
					_this.$Message.error("请输入正确的手机号")
					return false;
				}
				else if(_this.formValidate.registerDetailAddress == '') {
					_this.$Message.error("请输入公司地址")
					return false;
				}
				else if(_this.formValidate.registerDetailAddress.length > 200) {
					_this.$Message.error("公司地址不能超过200个字符")
					return false;
				}
				else {
					_this.axios({ //发送请求
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.queryInvoice_e,
							data: api.convertParam(saveApplyInfo)
						})
						.then(function(res) {
							if(res.data.status == 1) {
								_this.$Message.success("修改成功")
									setTimeout(() => {
							                  _this.$router.go(0)
							             }, 2000);								


							} else {
//								_this.instance("error", 0, res.data.message);
								_this.$Message.error(res.data.message)
							}
						})
						.catch(function(error) {
							console.log(error);
						})
				}

			},
			

		},
		created() {
			let _this = this;
			
			//查询公司信息
			const corp = JSON.parse(window.localStorage.getItem('corp')); //将缓存字符串转为json对象
			//						_this.companyId = this.$route.query.companyId;
			//数据绑定
			let conpanyUrl2 = api.queryInvoice_k + corp.id + api.queryInvoice_h;
			this.axios(conpanyUrl2)
				.then(function(res) {
					if(res.data.status == 1) {
						let obj = res.data.datas;
						_this.id = obj.id;
						_this.formValidate.openName = obj.name; //发票抬头
						_this.formValidate.dutyPara = obj.taxNumber; //税号
						_this.formValidate.openBank = obj.bankName; //企业开户银行
						_this.formValidate.openBankNum = obj.bankAccount; //企业银行帐号
						_this.formValidate.telephone = obj.telephone; //电话号码
						_this.formValidate.registerDetailAddress = obj.address; //公司地址
						_this.formValidate.name = obj.contact; //电话号码
						_this.formValidate.mobile = obj.telephone; //电话号码
						_this.formValidate.actualAddress = obj.actualAddress; //地址
					}
				})
				.catch(function(err) {
					console.log(err);
				})
		},
	}
</script>

<style scoped>
	.applyBox {
		position: absolute;
		top: 10px;
		bottom: 0;
		left: 10px;
		right: 30px;
		
	}
	
	.form_box {
		width: 100%;
		background: #fff;
		padding:0 20px 20px 20px;
		/*padding: 20px 35px 114px 35px;*/
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
	}
	
	.form_ul {
		width: 76%;
	}
	
	.form_ul li {
		width: 100%;
		display: flex;
		margin: 20px 0;
		align-items: center;
	}
	
	.form_ul li label {
		display: block;
		width: 215px;
		padding-right: 10px;
		text-align: right;
		font-size: 14px;
	}
	
	.form_ul li input {
		width: 100%;
		border-radius: 5px;
		border: 1px solid #ccd9e6;
		padding: 10px 10px;
		font-size: 14px;
	}
	
	h4 {
		font-size: 16px;
		color: #0083c0;
		padding: 30px 10px 10px;
		margin-bottom: 30px;
		border-bottom: 1px solid #ccd9e6;
		font-weight: normal;
	}
</style>