<template>
	<div class="modifyPsw">
		<Breadcrumb style="padding-left: 0;">
			<Breadcrumb-item><span class="link_span">首页</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span  ok_link">密码修改</span></Breadcrumb-item>
			 
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
				<span>修改密码</span>
			</div>

			<Form :label-width="85" class="formModifypsw" style="padding-left: 130px;">
				<Form-item label="旧密码：" class="form_div">
					<Input type="password" placeholder="请输入" v-model="psw.oldPassword"></Input>
				</Form-item>
				<Form-item label="新密码：" class="form_div">
					<Input type="password" placeholder="请输入" v-model="psw.newPassword"></Input>
				</Form-item>
				<Form-item label="确认密码：" class="form_div">
					<Input type="password" placeholder="请输入" v-model="repeatPassword"></Input>
				</Form-item>
				<div class="btndiv">
					<Button type="primary" class="btn" @click="modifyPswFun">确认修改</Button>
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
				psw: {
					userId:'',
					oldPassword: '',
					newPassword: ''
				},
				repeatPassword: ''
			}
		},
		methods: {
			modifyPswFun() {

				const _this = this;
				if(!this.psw.oldPassword || this.psw.oldPassword.replace(/(^\s*)|(\s*$)/g, "") == "") {
					this.$Message.warning("请输入原始密码");
				} else if(!this.psw.newPassword || this.psw.newPassword.replace(/(^\s*)|(\s*$)/g, "") == "") {
					this.$Message.warning("请输入新密码");
				} else if(!this.repeatPassword || this.repeatPassword.replace(/(^\s*)|(\s*$)/g, "") == "") {
					this.$Message.warning("请确认新密码");
				} else if(this.repeatPassword != this.psw.newPassword) {
					this.$Message.warning("两次输入密码不相同,请重新输入");
				} else {
					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.setNewPassword,
							data: api.convertParam(_this.psw),

						})
						.then(function(res) {
							if(res.data.status == 1) {
								_this.$Message.success("修改成功");
								setTimeout(() => {
									_this.$router.push({
										path: '/main'
									})
								}, 2000);
							} else {
								_this.$Message.warning(res.data.message);
							}
						})
						.catch(function(error) {
							console.log(error);
							_this.$Message.warning(error);
						});
				}
			}

		}
	}
</script>
<style scoped>
	.formModifypsw {
		/*width: 800px!important;*/
		/*padding-left: 230px;*/
		margin: 0 auto!important;
		margin-top: 50px!important;
	}
	.formModifypsw input {
		width: 500px;
	}
	
	.ivu-input-wrapper {
		width: 500px;
	}
	
	.modifyPsw .btndiv {
		width: 500px;
	}
	
	.modifyPsw .btndiv .btn {
		display: block;
		width: 100px;
		height: 36px;
		margin-top: 80px;
		margin-left: 80px;
		background-color: white;
		border: 1px solid #faa600;
		color: #faa600;
		font-size: 16px;
	}
	
	.modifyPsw .btndiv .btn:hover {
		background-color: #faa600;
		color: white;
	}
	
	.psw_title {
		height: 40px;
		background-color: #3abcff;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		border-radius: 4px;
		margin-top: 0;
	}
	
	.psw_title span {
		font-size: 16px;
		margin-left: 15px;
		color: white;
	}
	
	.form_div {
		/*display: flex;
		align-items: center;
		justify-content: center;*/
	}
	
	.form_div label {
		font-size: 14px!important;
		width: 100px!important;
	}
	
	.form_div div {
		display: flex;
		align-items: center;
	}
	
	.form_div div div {
		width: 500px;
	}
	
	.form_div div div input {
		font-size: 14px!important;
	}
	
	.getphonecode {
		width: 115px;
		height: 33px;
		background-color: #3abcff;
		color: white;
		border: 1px solid #3abcff;
		border-radius: 4px;
		margin-left: 45px;
	}
	
	.Bread_ri {
		position: absolute;
		top:12px;
		right: 3px;
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