<template>
	<div class="login" @mouseup="divmouseup" @mousemove="divmousemove">

		<!--<img class="LoginTitle" src="../../assets/img/logintitle.png" />-->
		<div class="LoginDiv">
			<div class="changeLogin">
				<span class="changeLogin_span">扫码登录</span>
				<img src="../../assets/img/changeloginpc.png" @click="psw_go" />
			</div>
			<div class="errotip">
				{{errotip}}
			</div>
			<div class="codekuang">
				<img class="logincode" src="../../assets/img/logincode.jpg" />
				<div>
					<span>打开</span><span class="appclick">智谷云APP</span><span>扫一扫登录</span>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import api from '@/api/api'
	export default {
		mounted: function() {

		},
		computed: {

		},
		data() {
			return {

			}
		},
		methods: {
			psw_go() {
				this.$router.push({
					path: '/'
				})
			}
		}
	}
</script>

<style scoped>
	.ivu-form-item {
		margin-bottom: 0;
	}
	
	input,
	button,
	select,
	textarea {
		outline: none
	}
	
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px white inset;
	}
	
	textarea {
		resize: none
	}
	
	input:focus {
		outline: none;
		background-color: white;
		border: 1px solid red;
	}
	
	input:hover {
		outline: none;
		background-color: white;
	}
	
	.login {
		box-shadow: 0 0 5px #888888;
		overflow: hidden;
	}
	
	.login .LoginTitle {
		position: absolute;
		top: 5.157vw;
		right: 12.578vw;
		width: 20.894vw;
	}
	
	.login .LoginDiv {
		padding: 40px 43px;
		position: absolute;
		top: 50%;
		margin-top: -242px;
		right: 11.578vw;
		background-color: #112e44;
		border: none;
		border-radius: 4px;
	}
	
	.login .LoginDiv .changeLogin {
		display: flex;
		justify-content: space-between;
	}
	
	.login .LoginDiv .changeLogin span {
		font-size: 19px;
		color: #f2feff;
	}
	
	.login .LoginDiv .changeLogin img {
		height: 41px;
	}
	
	.login .LoginDiv .changeLogin img:hover {
		cursor: pointer;
	}
	
	.errotip {
		display: flex;
		height: 15px;
		align-items: center;
		margin-top: 10px;
		margin-bottom: 5px;
		color: #e92552;
		font-size: 16px;
	}
	
	.codekuang {
		padding: 45px 56px 55px 56px;
	}
	
	.codekuang div {
		text-align: center;
	}
	
	.logincode {
		width: 188px;
		height: 188px;
		margin-bottom: 20px;
	}
	
	.codekuang span {
		font-size: 14px;
		color: #f2feff;
	}
	
	.codekuang .appclick {
		color: #00c1de;
		margin: 0 5px;
	}
	
	.codekuang .appclick:hover {
		cursor: pointer;
	}
</style>