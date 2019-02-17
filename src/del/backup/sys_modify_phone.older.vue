<template>
	<div class="modifyPhone">
		<Breadcrumb  style="padding-left: 0;">
			<Breadcrumb-item><span class="link_span">首页</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
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
			<div class="psw_title">
				<span>更换号码</span>
			</div>

			<Form :label-width="80" class="formmodifyPhone">
				<Form-item label="原手机号码：" class="phone_form form_div">
					<Input type="text" placeholder="请输入" v-model="psw.phone"></Input>
					<button class="getphonecode" @click="fun_count_down">{{count_down}}{{count_down2}}</button>
				</Form-item>
				<Form-item label="验证码：" class="form_div">
					<Input type="password" placeholder="请输入" v-model="psw.oldPassword"></Input>
				</Form-item>
				<Form-item label="新手机号码：" class="form_div">
					<Input type="password" placeholder="请输入" v-model="psw.newPassword"></Input>
				</Form-item>
				<div class="btndiv">
					<Button type="primary" class="btn" @click="modifyPhoneFun">保存</Button>
				</div>
				
			</Form>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				count_down: '获取验证码', //获取验证码按钮
				time: 120,//倒计时
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
					_this.$Message.error("手机号不能为空");
					return false;
				}
				if(!re.test(mobile)) {
					_this.$Message.error("请输入正确的手机号");
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
								_this.$Message.success("验证码已发送");
								return false;
							} else {
								_this.$Message.error(res.data.message);
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
					this.$Message.warning("请输入原始密码");
				} else if(!this.psw.newPassword || this.psw.newPassword.replace(/(^\s*)|(\s*$)/g, "") == "") {
					this.$Message.warning("请输入新密码");
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
								_this.$Message.success("修改成功");
							} else {
								_this.$Message.warning(res.data.message);
							}
						})
						.catch(function(error) {
							_this.$Message.warning(error);
						});
				}
			}

		}
	}
</script>
<style>
	.formmodifyPhone {
		width: 800px;
		margin: 0 auto;
		margin-top: 70px;
	}
	.formmodifyPhone input{
		width: 500px!important;
	}
	.psw_title span{
		font-size: 16px;
	}
	.ivu-input-wrapper{
		width: 500px;
	}
	.modifyPhone .btndiv{
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
	.modifyPhone .btndiv .btn:hover{
		background-color: #faa600;		
		color: white;
	}
	.psw_title{
		height: 40px;
		background-color: #3abcff;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		border-radius: 4px;
		margin-top: 0;
	}
	.psw_title span{
		font-size: 16px;
		margin-left:15px ;
		color: white;
	}
	.form_div {
		/*display: flex;
		align-items: center;
		justify-content: center;*/
	}
	.form_div div{
		display: flex;
		align-items: center;
	}
	.form_div div div{
		width: 500px;
	}
	.getphonecode{
		width: 115px;
		height: 33px;
		background-color: #3abcff;
		color: white;
		border: 1px solid #3abcff;
		border-radius: 4px;
		margin-left: 45px;
		
	}
	.Bread_ri{
    	position: absolute;
    	top: 15px;
    	right: 3px;
    	display: flex;
        margin-right: 30px;
    }
      .Bread_ri div{
      	display: flex;
      	align-items: center;
      	margin-left: 20px;
      }
      .Bread_ri div:hover{
      	cursor: pointer;
      }
       .Bread_ri div img{
      	width: 14px;
      	height: 14px;
      	margin-right: 5px;
      }
      .ivu-form-item-label{
      	width: 120px !important;
      }
</style>