<template>
	<div>
		<div class="stepHead">
			<ol class="stepBox">
				<li >
					<div class="line">
					</div>
					<div class="numBox current">
						<Icon class="icon" type="checkmark-circled"></Icon>
						<h4>填写基本信息</h4>
					</div>
				</li>
				<li class="current">
					<!-- <div class="line"> 
					</div>-->
					<div class="numBox">
						<i class="num">2</i>
						<h4>邮箱激活</h4>
					</div>
				</li>
				<!-- <li>
					<div class="numBox">
						<i class="num">3</i>
						<h4>完善资料</h4>
					</div>
				</li> -->
			</ol>

		</div>
		<div class="emailActiveBox">
			<div class="iconEmaiBox">
				<Icon class="iconEmai" type="email"></Icon>
			</div>
			<div class="eamilRightBox">
				<h4>感谢注册，确认邮件已发送至你的注册邮箱 : {{activeEmail}}</h4>
				<h6>请进入邮箱查看邮件，并激活微信开放平台帐号。</h6>
				<Button type="success" v-on:click="open()" class="btnGoToEmail">登录邮箱</Button>
				<h4>没有收到邮件？</h4>
				<p>1. 请检查邮箱地址是否正确，你可以返回 <a href="javascript:window.history.back(-1)">重新填写</a></p>
				<p>2. 检查你的邮件垃圾箱</p>
				<p>3. 若仍未收到确认，请尝试 <a>重新发送</a></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				activeEmail:this.$route.query.email,
				emailUrl:''
			}
		},
		methods:{
			gotoEmail(){
				let url = this.activeEmail.split("@")[1].toLowerCase();  //截取邮箱地址@后面的字符串
				switch (url) {
					case "163.com":
						return 'mail.163.com';
						break;
					case "vip.163.com":
						return 'vip.163.com';
						break;
					case "126.com":
						return "mail.126.com";
						break;
					case "qq.com":
						return "mail.qq.com";
						break;
					case "vip.qq.com":
						return "mail.qq.com";
						break;
					case "foxmail.com":
						return "mail.qq.com";
						break;
					case "gmail.com":
						return "mail.google.com";
						break;
					case "sohu.com":
						return "mail.sohu.com";
						break;
					case "tom.com":
						return "mail.tom.com";
						break;
					case "vip.sina.com":
						return "vip.sina.com";
						break;
					case "sina.com.cn":
						return "mail.sina.com.cn";
						break;
					case "sina.com":
						return "mail.sina.com.cn";
						break;
					case "yeah.net":
						return "www.yeah.net";
						break;
					case "yahoo.com.cn":
						return "mail.cn.yahoo.com";
						break;
					case "yahoo.cn":
						return "mail.cn.yahoo.com";
						break;
					case "21cn.com":
						return "mail.21cn.com";
						break;
					case "hotmail.com":
						return "www.hotmail.com";
						break;
					case "sogou.com":
						return "mail.sogou.com";
						break;
					case "188.com":
						return "www.188.com";
						break;
					case "139.com":
						return "mail.10086.cn";
						break;
					case "189.cn":
						return "webmail15.189.cn/webmail";
						break;
					case "wo.com.cn":
						return "mail.wo.com.cn/smsmail";
						break;
					default:
						// statements_def\
						return '';
						break;
				}
			},
			open(){
				window.open(this.emailUrl);
			}
		},
		mounted(){
			let goToUrl = this.gotoEmail();
			console.log(goToUrl);
			this.emailUrl = "http://" + goToUrl;
		},
		
	}
</script>

<style scoped>
	.icon{
		font-size:40px;
		color:#0099ff;
	}

	.emailActiveBox{
		margin-top:10px;
		font-size:14px;
	}
	.emailActiveBox:after{
		content:"";
		display: block;
		clear:both;
	}
	.iconEmaiBox{
		width:30%;
		text-align: right;
		float: left;
	}
	.iconEmai{
		font-size:80px;
		color:#19be6b;
	}
	.eamilRightBox{
		float:left;
		width:70%;
		margin:20px auto 50px;
		font-size:16px;
		padding-left:8px;
	}
	.eamilRightBox h4{
		font-weight: normal;
	}
	.eamilRightBox h6{
		font-size:14px;
		font-weight: normal;
		color:#9e9f9f;
	}
	.btnGoToEmail{
		margin:30px 0 30px;
	}
	.eamilRightBox a{
		font-size:12px;
		color:#3292ff;
	}
	.eamilRightBox a:hover{
		text-decoration: underline;
	}
</style>