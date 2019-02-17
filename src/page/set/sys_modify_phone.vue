<template>
	<div class="modifyPhone">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">我的</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">安全设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span  ok_link">更换号码</span></Breadcrumb-item>
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
		<div class="right_home_warp">
			<Form :label-width="100" class="formmodifyPhone">
				<Form-item label="原手机号码：" class="phone_form form_div">

					<Input type="text" placeholder="请输入" v-model="psw.phone"></Input>
					<!--<button class="getphonecode" @click="fun_count_down">{{count_down}}{{count_down2}}</button>-->
				</Form-item>
				<Form-item label="验证码：" class="form_div">
					<div>
						<Input type="password" placeholder="请输入" v-model="psw.oldPassword"></Input>
						<button class="getphonecode" @click="fun_count_down">{{count_down}}{{count_down2}}</button>
					</div>

				</Form-item>
				<Form-item label="新手机号码：" class="form_div">
					<Input type="password" placeholder="请输入" v-model="psw.newPassword"></Input>
				</Form-item>
				<!--<div class="btndiv">
					<Button type="primary" class="btn" @click="modifyPhoneFun">保存</Button>
				</div>-->

			</Form>
		</div>
		<div class="btn-bot">
			<button class="btn-save" @click='modifyPhoneFun'>确认修改</button>
			<button class="btn-cancel" @click='back'>取消</button>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>
<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			tis: tis
		},

		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

				count_down: '获取验证码', //获取验证码按钮
				time: 120, //倒计时
				count_down2: '', //获取验证码按钮
				dx_type: true, //阻止获取验证码按钮多次点
				psw: {
					oldPassword: '',
					newPassword: ''
				}
			}
		},
		methods: {
			fun_count_down() {
				let _this = this
				let mobile = _this.mobile2;
				let re = /(1[3-9]\d{9}$)/;
				// 验证手机号

				if(mobile == "") {
					_this.do_no = true;
					_this.re_do = '手机号不能为空';
					setTimeout(() => {
						_this.do_no = false;

					}, 2000);

					//_this.$Message.error("手机号不能为空");
					return false;
				}
				if(!re.test(mobile)) {
					_this.do_no = true;
					_this.re_do = '请输入正确的手机号';
					setTimeout(() => {
						_this.do_no = false;

					}, 2000);

					//_this.$Message.error("请输入正确的手机号");
					return false;
				}
				if(_this.dx_type) {
					_this.dx_type = false;
					_this.axios({
							method: 'GET',
							url: api.enrollVerification_forget + mobile + api.enrollVerificationRepair_forget
						})
						.then(function(res) {
							//							
							if(res.data.status == '1') {
								_this.do_yn = true;
								_this.re_do = "验证码已发送";
								setTimeout(() => {
									_this.do_yn = false;

								}, 2000);

								//								_this.$Message.success("验证码已发送");
								return false;
							} else {
								_this.do_no = true;
								_this.re_do = res.data.message;
								setTimeout(() => {
									_this.do_no = false;

								}, 2000);

								//								_this.$Message.error(res.data.message);
							}
							_this.fun_yzm();
						})
				}
			},
			//	倒计时
			fun_yzm() {
				let _this = this
				_this.count_down = _this.time
				_this.count_down2 = '秒'
				if(_this.time === 0) {
					_this.count_down = '获取验证码'
					_this.count_down2 = ''
					_this.time = 120
					_this.dx_type = true
				} else {
					_this.count_down = _this.time--
						setTimeout(_this.fun_yzm, 1000);
				}
			},
			modifyPhoneFun() {

				const _this = this;
				if(!this.psw.oldPassword || this.psw.oldPassword.replace(/(^\s*)|(\s*$)/g, "") == "") {
					_this.do_no = true;
					_this.re_do = '请输入原始密码';
					setTimeout(() => {
						_this.do_no = false;

					}, 2000);

					//					this.$Message.warning("请输入原始密码");
				} else if(!this.psw.newPassword || this.psw.newPassword.replace(/(^\s*)|(\s*$)/g, "") == "") {
					_this.do_no = true;
					_this.re_do = '请输入新密码';
					setTimeout(() => {
						_this.do_no = false;

					}, 2000);
					//					this.$Message.warning("请输入新密码");
				} else {
					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.setNewPassword,
							data: api.jsonData(_this.psw),

						})
						.then(function(res) {
							if(res.data.status == 1) {

								_this.do_yn = true;
								_this.re_do = "修改成功";
								setTimeout(() => {
									_this.do_yn = false;

								}, 2000);

								//_this.$Message.success("修改成功");
							} else {
								_this.do_no = true;
								_this.re_do = res.data.message;
								setTimeout(() => {
									_this.do_no = false;

								}, 2000);

								//								_this.$Message.warning(res.data.message);
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				}
			},
			back() {
				let _this=this;
				_this.$router.push({
					path: '/set/tou'
				})
			}

		}
	}
</script>
<style scoped>
	.formmodifyPhone {
		width: 800px;
		margin: 0 0 0 130px;
		margin-top: 70px;
	}
	
	.formmodifyPhone input {
		width: 500px!important;
	}
	
	.phone_form div {
		display: flex;
		/*align-content: center;*/
		align-items: center;
	}
	
	.ivu-input-wrapper {
		width: 500px;
	}
	
	.modifyPhone .btndiv {
		width: 500px;
	}
	
	.modifyPhone .btndiv .btn {
		display: block;
		width: 100px;
		height: 36px;
		margin-top: 80px;
		margin-left: 80px;
		background-color: white;
		border: 1px solid #faa600;
		color: #faa600;
	}
	
	.modifyPhone .btndiv .btn:hover {
		background-color: #faa600;
		color: white;
	}
	
	.form_div div {
		display: flex;
		align-items: center;
	}
	
	.form_div div div {
		width: 500px;
	}
	
	.getphonecode {
		width: 105px;
		height: 33px;
		background-color: #01bad6;
		color: white;
		border: 0px solid #01bad6;
		border-radius: 3px;
		margin-left: 10px;
		font-size: 14px;
	}
	
	.getphonecode:hover {
		background-color: #00d8f8;
		border: 1px solid #00d8f8;
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
	
	.Bread_ri div:hover {
		cursor: pointer;
	}
	
	.Bread_ri div img {
		width: 14px;
		height: 14px;
		margin-right: 5px;
	}

</style>