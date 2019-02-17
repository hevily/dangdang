<template>
	<div class="login" @mouseup="divmouseup" @mousemove="divmousemove">
		<img class="PCImg" src="../../assets/img/loginpc.png" />
		<img class="LoginTitle" src="../../assets/img/logintitle.png" />
		<div class="LoginDiv">
			<Form ref="loginInfo" :model="loginInfo" :rules="relInfo">
				<div class="UserDiv">
					<Form-item prop="mobile" style="display: none;"></Form-item>
					<img src="../../assets/img/loginuser.jpg" />
					<input class="login_phone" type="text" v-model="loginInfo.mobile" placeholder="请输入手机号" />
				</div>
				<div class="PSWDiv">
					<Form-item prop="password" style="display: none;"></Form-item>
					<img src="../../assets/img/titlepsw.jpg" />
					<input class="login_ren" type="password" v-model="loginInfo.password" placeholder="请输入密码" />
				</div>
				<div id="imgscode" ref="imgscode">
					<img class="imgscode_img" :src="imgtuodong" />
					<div class="BlackDiv" v-bind:style="{left: randomnum+'px'}"></div>
					<div class="ImgTuo" v-bind:style="{left: movex+'px',backgroundPosition: bgpianyi}"></div>
				</div>
				<div class="TuoDiv" ref="Tuodiv">
					>> 请拖动滑块完成拼图 >>
					<div class="TuoBtn" @mousedown="divmousedown" v-bind:style="{left: movex+'px'}" ref="tuobtn"></div>
				</div>
				<button class="toLogin" @click.stop="handleSubmit('loginInfo')">登录</button>
				<div class="ZW">
					<!--<a href="/newregister">注册</a>-->
					<router-link to="/newregister">注册</router-link>
					<span class="forget_psw" href="#" @click="toggle">忘记密码&nbsp;?</span>
				</div>
			</Form>
		</div>
		<div class="forget_box" v-show="isshow">
			<div class="forget">
				<div class="RegDiv">
					<div class="Title">
						<h2>忘记密码</h2>
						<span class="forget_x" @click="toggle">X</span>
					</div>
					<ul>
						<li>
							<span>手机号码</span>
							<input type="text" placeholder="输入手机号码" v-model="mobile2" />
							<button @click="fun_count_down">{{count_down}}{{count_down2}}</button>
						</li>
						<li>
							<span>验证码</span>
							<input type="text" placeholder="输入验证码" v-model="vcode" />
						</li>
						<li>
							<span>新密码</span>
							<input type="password" placeholder="输入新密码" v-model="password2" />
						</li>
						<li>
							<span>确认密码</span>
							<input type="password" placeholder="确认新密码" v-model="password3" />
						</li>
					</ul>
				</div>
				<div class="forget_but_box">
					<button class="forget_but" @click="sure()">确定</button>
				</div>
			</div>

		</div>
	</div>

</template>
<script>
	import api from '@/api/api'
	export default {
		mounted: function() {
			document.onselectstart = function() {
				event.returnValue = false;
			}
			this.windowready;
		},
		computed: {

			windowready() {
				this.BtnWidth = this.$refs.Tuodiv.offsetWidth - this.$refs.tuobtn.offsetWidth;
				this.btnWidth = this.BtnWidth - this.$refs.tuobtn.offsetWidth;

				this.randomnum = Math.random().toFixed(2) * (this.BtnWidth - this.BtnWidth * 1.5) + this.BtnWidth * 0.7;
				this.bgpianyi = -this.randomnum + "px -1.5vw";
			}
		},
		data() {
			return {
				isshow: false,
				mobile2: '', //手机号码
				vcode: '', //输入验证码
				password2: '', //新密码
				password3: '', //新密码
				count_down: '获取验证码', //获取验证码按钮
				time: 120,//倒计时
				count_down2: '', //获取验证码按钮
				dx_type: true, //阻止获取验证码按钮多次点
				imgtuodong: [require('../../assets/img/pintu.jpg')], //验证图
				BtnWidth: 0, //包住拖动div按钮的宽
				btnWidth: 0, //拖动div按扭的宽
				mousex: 0, //第一次点击拖动按钮时鼠标的坐标
				movex: "", //拖动按钮的移动长度
				randomnum: "", //拼图抠出来的随机坐标
				bgpianyi: 0, //拖动图片的背景偏移值
				mousemoveclock: false, //认证成功时锁定拖动按钮，不允许再次拖动
				renzhengok: false, //判断拖动认证是否成功
				
				loginInfo: {
					mobile: '',
					password: '',
					verify_code: this.$route.params.id,
					// token_id : 'aaavvbb'
				},
				relInfo: {
					mobile: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '密码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: '密码长度不能小于6位',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			/*imgpush(){
				this.$refs.imgscode.
			},*/
			//	忘记密码    
		
			toggle() {
				let _this = this;
				_this.isshow = !_this.isshow
			},
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
			//忘记密码的校验
			sure() {
				let _this = this
				let mobile = _this.mobile2;
				let re = /(1[3-9]\d{9}$)/;
				// 验证手机号
				if(mobile == "") {
					_this.$Message.error("手机号不能为空");
					return false;
				} else if(!re.test(mobile)) {
					_this.$Message.error("请输入正确的手机号");
					return false;
				} else if(_this.password2 == '') {
					_this.$Message.error("请输入密码");
					return false;
				} else if(_this.password2.length < 6) {
					_this.$Message.error("密码不能小与6位");
					return false;
				} else if(_this.password2 != _this.password3) {
					_this.$Message.error("密码不一致，");
					return false;
				} else {
					let newUser={};
						newUser.mobile = mobile;//手机号
						newUser.newPwd  = _this.password2;//新登录密码
						newUser.captcha = _this.vcode;//验证码
//						console.log(newUser);
						_this.axios({  //发送请求
                    		method: 'post',
                    		header: {
	    		                "Content-Type" : 'application/x-www-form-urlencoded'
	    		            },
	    		            url:api.ResetPassword,
	    		            data:api.convertParam(newUser),
                    	})
                    	.then(function(res){
                    		console.log(res.data);
                    		if(res.data.status == 1) {
                    			_this.$Message.success('修改成功');
								setTimeout(() => {
				                   _this.$router.go(0)
				                }, 2000);
								
//								 setTimeout(_this.$router.push({path:'/'}), 3000);
	    		            }
	    		            else{
	    		            	_this.$Message.error(res.data.message);
	    		            }
                    	}).catch(function(error){  //抓捕错误信息
                    		console.log(error + 'aaaaaa');

                    	});
//					 setTimeout(_this.$router.go(0), 6000);
					
				}

			},
			//			滑动验证图
			divmouseup() {
				let _this = this;
				if(_this.renzhengok) {

				} else if(_this.mousemoveclock) {
					_this.mousemoveclock = false;
					if(_this.movex < _this.randomnum + 5 && _this.movex > _this.randomnum - 5) {
						_this.$Message.success("验证成功");
						_this.renzhengok = true;
						//this.movexpx = 0;
						//_this.movex = 0;
					} else {
						_this.$Message.error("验证失败");
						_this.movex = 0;

					}
				}
			},
			divmousemove(e) {
				let _this = this;
				if(_this.mousemoveclock && !_this.renzhengok) {
					e=e||window.event; 
					var movecha = e.screenX - _this.mousex;
					if(movecha > _this.BtnWidth || movecha < 0) {

					} else {
						_this.movex = movecha;
					}

				}
			},
			divmousedown(e) {
				let _this = this;
				_this.mousemoveclock = true;
				e=e||window.event; 
				_this.mousex = e.screenX;
			},
			//			登录
			handleSubmit(name) {
				let _this = this;
				let re = /(1[3-9]\d{9}$)/;
				if(_this.loginInfo.mobile == "") {
					_this.$Message.error('手机号是空!');
					return false;
				} else if(!re.test(_this.loginInfo.mobile)) {
					_this.$Message.error('请输入正确手机号!');
					return false;
				} else if(_this.loginInfo.password == '') {
					_this.$Message.error("请输入密码")
					return false;
				}else if(_this.loginInfo.password.length < 6) {
					_this.$Message.error("密码有误")
					return false;
				}
				else  if(_this.loginInfo.password != _this.loginInfo.password ){
							_this.$Message.error("密码有误")	
							return false;
						}
				else{	
					_this.$refs[name].validate((valid) => {
					if(_this.renzhengok) {
						if(valid) {
							_this.axios(api.loginTel, {
									params: _this.loginInfo
								})
								.then(function(res) {
									var data = res.data;
									console.log(data);
									if(data.status == 1) {
										_this.$store.commit('login', data.datas.tokenId);
										_this.$store.commit('saveUser', data.datas.user);
										_this.$store.commit('saveCorp', data.datas.corp);
										var user = JSON.stringify(data.datas.user);
										var corp = JSON.stringify(data.datas.corp);
										window.localStorage.setItem('user', user);
										window.localStorage.setItem('corp', corp);
										
							                   _this.$router.push('/main')
							          
										
									} else if(data.status == 0) {
										_this.$Message.error(data.message);
									}
								})
								.catch(function(error) {
									console.log(error + 'aaaaaa');
								});

						} else {
							let re = /(1[3-9]\d{9}$)/;
							if(_this.loginInfo.mobile == "") {
								_this.$Message.error('手机号是空!');
								return false;
							} else if(!re.test(_this.loginInfo.mobile)) {
								_this.$Message.error('请输入正确手机号!');
								return false;
							} else if(_this.loginInfo.password == '') {
								_this.$Message.error("请输入密码")
								return false;
							}
//							else  if(_this.loginInfo.password != _this.loginInfo.password ){
//								_this.$Message.error("密码有误")	
//								return false;
//							}
							else {
								_this.$Message.error('登录失败!');
							}
						}
					}
				})}
			
			},
				
			IMGTUO: function(e) {
				if(mousemoveclock && !renzhengok) {
					e=e||window.event; 
					movex = e.screenX - mousex;
					if(movex > BtnWidth || movex < 0) {

					} else {
						$(".TuoBtn").css("left", movex);
						$(".ImgTuo").css("left", movex);
					}
					console.log(movex);
				}

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
	}
	
	.login .PCImg {
		width: 25vw;
		position: absolute;
		top: 22.5vw;
		left: 31.578vw;
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
		top: 11.736vw;
		right: 11.578vw;
		background-color: white;
		box-shadow: 0 0 5px #888888;
		border-radius: 4px;
	}
	
	.login .LoginDiv .UserDiv,
	.PSWDiv {
		width: 17.57vw;
		height: 2.473vw;
		margin: 0 auto;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #e8e8e8;
		border-radius: 5px;
	}
	
	.login .LoginDiv .UserDiv,
	.PSWDiv .LoginDiv .PSWDiv {
		margin-top: 1.21vw;
		margin-bottom: 1.21vw;
	}
	.login .LoginDiv .UserDiv:hover,
	.PSWDiv:hover{
		border-color:#269edc;
	} 
	.login .LoginDiv .UserDiv img,
	.PSWDiv img {
		height: 1.157vw;
		margin-left: 0.736vw;
	}
	
	.login .LoginDiv .UserDiv input,
	.PSWDiv input {
		width: 82%;
		border: none;
		background-color: white;
		font-size: 14px;
	}
	
	.login .LoginDiv .toLogin {
		width: 17.57vw;
		height: 2.315vw;
		margin-top: 1.052vw;
		margin-bottom: 14px;
		color: white;
		background-color: #faa600;
		border: none;
		border-radius: 1.5vw;
		font-size: 17px;
		letter-spacing:8px;
		cursor: pointer;
	}
	
	.login .LoginDiv .ZW {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
	}
	
	.login .LoginDiv .ZW span {
		display: block;
		font-size: 16px;
		color: #36a5ff;
	}
	
	.login .LoginDiv .ZW a {
		display: block;
		font-size: 16px;
		color: #36a5ff;
	}
	
	#imgscode {
		width: 17.57vw;
		height: 5.263vw;
		position: relative;
		margin-top: 1.052vw;
	}
	
	.BlackDiv {
		width: 2.5vw;
		height: 2.5vw;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 1.5vw;
	}
	
	.ImgTuo {
		width: 2.5vw;
		height: 2.5vw;
		position: absolute;
		top: 1.5vw;
		background-color: skyblue;
		background-image: url(../../assets/img//pintu.jpg);
		background-size: 17.57vw 5.263vw;
		background-repeat: no-repeat;
		z-index: 999;
		
	}
	
	.TuoDiv {
		width: 17.57vw;
		height: 1.8vw;
		line-height: 1.8vw;
		border: 1px solid #e4e4e4;
		border-radius: 20px;
		position: relative;
		font-size: 0.631vw;
		text-align: center;
		margin-top: 0.526vw;
		background-color: #f9f9f9;
		color: #a8a8a8;
	}
	
	.TuoBtn {
		width: 3.684vw;
		height: 1.8vw;
		/*background-color: skyblue;*/
		position: absolute;
		top: 0vw;
		background-image: url(../../assets/img/imgtuobtn.png);
		background-repeat: no-repeat;
		background-size: 3.684vw 1.8vw;
		cursor: pointer;
		z-index: 999;
		
	}
	
	.imgscode_img {
		width: 100%;
		height: 5.263vw;
	}
	
	.forget_psw {
		text-decoration: underline;
		cursor: pointer;
	}
	/*忘记密码*/
	
	.forget_box {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background: rgba(0, 0, 0, 0.2);
	}
	
	.forget {
		width: 500px;
		height: 470px;
		border-radius: 5px;
		position: relative;
		top: 50%;
		left: 50%;
		margin: -215px 0 0 -250px;
		background: #fff;
		overflow: hidden;
	}
	
	.RegDiv .Title {
		background-color: #f9f9f9;
		padding: 1.578vw 0;
		text-align: center;
	}
	
	.RegDiv ul li {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		margin: 25px auto;
		padding-left: 15px;
	}
	
	.RegDiv ul li span {
		width: 70px;
		font-size: 14px;
		text-align: right;
	}
	
	.RegDiv ul li input {
		height: 35px;
		width: 220px;
		border: 1px solid #e8e8e8;
		border-radius: 5px;
		padding: 0 5px;
		margin-left: 20px;
	}
	
	.RegDiv ul li button {
		width: 110px;
		height: 35px;
		margin-left: 15px;
		font-size: 14px;
		background-color: #f3f3f3;
		border: 1px solid #e8e8e8;
		border-radius: 5px;
		cursor: pointer;
	}
	
	.XieYi {
		display: flex;
	}
	
	.RegDiv .XieYi label {
		position: relative;
		cursor: pointer;
		margin-left: 8.263vw;
	}
	
	.RegDiv .XieYi label input {
		cursor: pointer;
		opacity: 0;
	}
	
	.RegDiv .XieYi label input:checked+.show-box {
		background: #269edc;
	}
	
	.RegDiv .XieYi label .show-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 1.052vw;
		height: 1.052vw;
		border-radius: 2px;
		border: 1px solid #d8d8d8;
		background: white;
	}
	
	.RegDiv .XieYi label .show-box:before {
		content: '';
		position: absolute;
		top: 2px;
		left: 0.25vw;
		width: 0.4vw;
		height: 0.5vw;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}
	
	.RegDiv .XieYi span {
		font-size: 0.631vw;
		padding: 0 0 0 8px;
	}
	
	.RegDiv .RegButton {
		width: 18.157vw;
		height: 2.368vw;
		background-color: #faa600;
		border: none;
		border-radius: 20px;
		color: white;
		margin-left: 8.263vw;
		margin-top: 2vw;
		font-size: 0.736vw;
		cursor: pointer;
	}
	
	.RegDiv .RegButton2 {
		width: 18.157vw;
		height: 2.368vw;
		background-color: #f3f3f3;
		border: none;
		border-radius: 20px;
		color: #333;
		margin-left: 8.263vw;
		margin-top: 2vw;
		font-size: 0.736vw;
	}
	
	.agreement {
		color: red;
		cursor: pointer;
		/*border-bottom: 1px solid #0000FF;*/
	}
	
	.agreement:before {
		content: "";
		width: 12vw;
		height: 1px;
		background: #f00;
		display: block;
		/*1.首先使伪类显示方式为块级元素*/
		position: relative;
		bottom: -20px;
	}
	
	.forget_but_box {
		width: 100%;
		margin: 25px auto;
		text-align: center;
	}
	
	.forget_but {
		width: 200px;
		height: 35px;
		margin: 25px auto;
		color: white;
		background-color: #faa600;
		border: none;
		border-radius: 50px;
	}
	
	.forget_x {
		width: 25px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		background: rgba(0, 0, 0, 0.3);
		color: #fff;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
	   .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>