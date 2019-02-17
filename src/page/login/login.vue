<template>
	<div class="login" @mouseup="divmouseup" @mousemove="divmousemove">
		<div class="LoginDiv">
			<div class="changeLogin">
				<span class="changeLogin_span">密码登录</span>
				<img src="../../assets/img/changelogin.png" @click="code_go" />
			</div>
			<div class="errotip">
				{{errotip}}
			</div>
			<Form ref="loginInfo" :model="loginInfo" :rules="relInfo">
				<div class="UserDiv">
					<Form-item prop="mobile" style="display: none;"></Form-item>
					<img src="../../assets/img/loginuser.png" />
					<input class="login_phone" type="text" v-model="loginInfo.mobile" placeholder="请输入手机号" />
				</div>
				<div class="PSWDiv">
					<Form-item prop="password" style="display: none;"></Form-item>
					<img src="../../assets/img/titlepsw.png" />
					<input class="login_ren" type="password" v-model="loginInfo.password" placeholder="请输入密码" />
				</div>
				<div id="imgscode" ref="imgscode">
					<img class="imgscode_img" :src="imgtuodong" />
					<div class="BlackDiv" v-bind:style="{left: randomnum+'px'}"></div>
					<div class="ImgTuo" v-bind:style="{left: movex+'px'}">
						<img :src="imgtuodong" v-bind:style="{left: -randomnum+'px'}"/>
					</div>
				</div>
				<div class="TuoDiv" ref="Tuodiv">
					<div v-if="movex>0" class="bgchange" v-bind:style="{width: movex+20 +'px'}"></div>
					>> 请拖动滑块完成拼图 >>
					<div class="TuoBtn" 
                        @touchstart="divtouchdown" 
                        @touchend="divtouchup" 
                        @touchmove="divtouchmove" 
                        @mousedown="divmousedown" 
                        :style="{left: movex+'px'}" 
                        ref="tuobtn">
                    </div>
					<img v-show="tuopan" class="tuopan" src="../../assets/img/tuopicno.png" />
					<img v-show="tuopan2" class="tuopan" src="../../assets/img/tuopicok.png" />
				</div>
				<div class="zw2">
					<div class="zw3">
						<!--<label style="position: relative;display: flex;">-->
						<div class="radiokuang" @click.stop="tick_a">
							<div class="show-box" v-show="tick"></div>
						</div>

						<!--</label>-->
						<span style="font-size: 16px;">记住用户名 </span>
					</div>

					<span class="forget_psw hoverchange" href="#" @click="toggle">忘记密码&nbsp;?</span>
				</div>
				<button class="toLogin" @click.stop="handleSubmit('loginInfo')">{{loginok}}</button>
				<div class="ZW">
					<!--<a href="/newregister">注册</a>-->

					<router-link to="/newregister"><img src="../../assets/img/registerbtn.png" /><span>注册</span></router-link>

				</div>
			</Form>
		</div>

		<div class="forget_box" v-show="isshow">
			<div class="forget">
				<div class="RegDiv">
					<div class="Title">
						<div>
							<img src="../../assets/img/forgettitle.jpg" />
							<span>忘记密码</span>
							<button class="forget_x" v-if="!reok" @click="toggle">返回登录</button>
						</div>

					</div>
					<div v-if="pcheckno">
						<div class="liucp">
							<div class="rznum nowbu">
								<div class="rznd nowbu">
									<span class="nowbu">验证手机号码</span>
									<div class="nowbu">1</div>
								</div>
							</div>
							<div class="czpsw">
								<div class="cznd">
									<span>重置密码</span>
									<div>2</div>
								</div>
							</div>
						</div>
						<ul>
							<li>
								<div class="li_div">
									<!--<span class="li_div_span">手机号码</span>-->
									<input type="text" placeholder="输入手机号码" v-model="codemobile.mobile" />
									<div v-show="phoneerro" class="lierro">
										<img src="../../assets/img/regerro.png">
										<span>{{phoneerro_m}}</span>
									</div>
								</div>

							</li>
							<li>
								<div class="li_div">
									<!--<span class="li_div_span">验证码</span>-->
									<input type="text" placeholder="输入验证码" v-model="codemobile.captcha" />
									<button @click="fun_count_down">{{count_downok}}{{count_down}}{{count_down2}}</button>
									<div v-show="codeerro" class="lierro">
										<img src="../../assets/img/regerro.png">
										<span>{{codeerro_m}}</span>
									</div>
								</div>
							</li>
						</ul>
						<div class="forget_but_box">
							<button class="forget_but" @click="codesure()">提交</button>
						</div>
					</div>
					<div v-else>
						<div class="liucp">
							<div class="rznum nowbu">
								<div class="rznd nowbu">
									<span class="nowbu">验证手机号码</span>
									<div class="nowbu">1</div>
								</div>
							</div>
							<div class="czpsw nowbu">
								<div class="cznd nowbu">
									<span class="nowbu">重置密码</span>
									<div class="nowbu">2</div>
								</div>
							</div>
						</div>
						<ul>
							<li>
								<div class="li_div">
									<!--<span class="li_div_span">新密码</span>-->
									<input type="password" placeholder="输入新密码" v-model="password2" />
									<div v-show="pswerro" class="lierro">
										<img src="../../assets/img/regerro.png">
										<span>{{pswerro_m}}</span>
									</div>
								</div>

							</li>
							<li>
								<div class="li_div">
									<!--<span class="li_div_span">确认密码</span>-->
									<input type="password" placeholder="确认新密码" style="width: 400px;" v-model="password3" />
									<div v-show="c_pswerro" class="lierro">
										<img src="../../assets/img/regerro.png">
										<!--<span>{{c_pswerro_m}}</span>-->
									</div>
								</div>

							</li>
						</ul>
						<div class="forget_but_box">
							<button class="forget_but" @click="sure()">提交</button>
						</div>
					</div>
					<div class="reok" v-show="reok">
						<div>
							<img src="../../assets/img/greenok.png" />
							<span>恭喜，您已成功重置密码！</span>
						</div>
						<button @click="backlogin">立即登录</button>
					</div>
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

			var isSupportTouch = "ontouchend" in document ? true : false;

			if(!isSupportTouch) {

			} else {
				this.pcormobild = 'mobile';
			}

			var randomnum=Math.floor(Math.random()*5+1);
			if(randomnum==1){
				this.imgtuodong = [require('../../assets/img/pintu.jpg')];
				
			}else if(randomnum==2){
				this.imgtuodong = [require('../../assets/logintuo2.jpg')];				
				
			}else if(randomnum==3){
				this.imgtuodong = [require('../../assets/logintuo3.jpg')];		
				
			}else if(randomnum==4){
				this.imgtuodong = [require('../../assets/logintuo4.jpg')];	
				
			}else if(randomnum==5){
				this.imgtuodong = [require('../../assets/logintuo5.jpg')];				
			}
			
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
				pcheckno: true,
				phoneerro: false,
				phoneerro_m: '',
				codeerro: false,
				codeerro_m: '',
				pswerro: false,
				pswerro_m: '',
				c_pswerro: false,
				c_pswerro_m: '',
				errotip: '',
				tick: false, //checkbox
				pcormobild: 'pc',
				isshow: false,
				loginok: '登录',
				reok: false,
				vcode: '', //输入验证码
				password2: '', //新密码
				password3: '', //新密码
				count_down: '获取验证码', //获取验证码按钮
				count_downok: '',
				time: 120, //倒计时
				count_down2: '', //获取验证码按钮
				dx_type: true, //阻止获取验证码按钮多次点
				imgtuodong: '', //验证图
				tuodimg:'',
				BtnWidth: 0, //包住拖动div按钮的宽
				btnWidth: 0, //拖动div按扭的宽
				mousex: 0, //第一次点击拖动按钮时鼠标的坐标
				movex: "", //拖动按钮的移动长度
				randomnum: "", //拼图抠出来的随机坐标
				bgpianyi: 0, //拖动图片的背景偏移值
				mousemoveclock: false, //认证成功时锁定拖动按钮，不允许再次拖动
				renzhengok: false, //判断拖动认证是否成功
				tuopan: false, //拖动认证错误结果显示
				tuopan2: false, //拖动认证正确结果显示
				codemobile: { //手机号码，验证码验证
					mobile: '', //手机号码
					captcha: '123434' //验证码
				},

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
				_this.isshow = !_this.isshow;
				_this.phoneerro = false;
				_this.phoneerro_m = "";
				_this.codeerro = false;
				_this.codeerro_m = "";
				_this.pswerro = false;
				_this.pswerro_m = "";
				_this.codemobile.mobile = '';
				_this.codemobile.captcha = '';
			},
			fun_count_down() {

				let _this = this
				let mobile = _this.codemobile.mobile;
				let re = /(1[3-9]\d{9}$)/;
				// 验证手机号

				if(mobile == "") {
					_this.phoneerro = true;
					_this.phoneerro_m = "手机号不能为空";
					/*_this.$Message.error("手机号不能为空");*/
					return false;
				} else if(!re.test(mobile)) {
					_this.phoneerro = true;
					_this.phoneerro_m = "请输入正确的手机号";
					/*_this.$Message.error("请输入正确的手机号");*/
					return false;
				} else {
					_this.phoneerro = false;
					_this.phoneerro_m = "";
				}

				_this.axios({
						method: 'GET',
						url: api.enrollVerification_forget + mobile + api.enrollVerificationRepair_forget
					})
					.then(function(res) {
						//							
						if(res.data.status == '1') {
							//_this.$Message.success("验证码已发送");
							_this.fun_yzm();
						} else {
							_this.codeerro = true;
							_this.codeerro_m = res.data.message;
						}

					})

			},
			tick_a() {
				let _this = this;
				_this.tick = !_this.tick
			},
			//	倒计时
			fun_yzm() {
				let _this = this
				//_this.count_downok = "获取验证码成功";
				_this.count_down = _this.time;
				_this.count_down2 = '秒';
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
			codesure() {
				let _this = this;
				_this.pcheckno = false;
				let mobile = _this.codemobile.mobile;
				let re = /(1[3-9]\d{9}$)/;
				// 验证手机号
				if(mobile == "") {
					_this.phoneerro = true;
					_this.phoneerro_m = "手机号不能为空";
					/*_this.$Message.error("手机号不能为空");*/
					return false;
				} else if(!re.test(mobile)) {
					_this.phoneerro = true;
					_this.phoneerro_m = "请输入正确的手机号";
					/*_this.$Message.error("请输入正确的手机号");*/
					return false;
				} else {
					let newUser = {};
					_this.phoneerro = false;
					_this.phoneerro_m = "";
					_this.codeerro = false;
					_this.codeerro_m = "";
					newUser.mobile = mobile; //手机号
					newUser.captcha = _this.codemobile.captcha; //验证码
					//验证手机号码是否有注册
					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.textResetPwd,
							data: api.convertParam(_this.codemobile)
						})
						.then(function(res) {
							console.log(res);
							if(res.data.status == '1') {
								if(_this.dx_type) {
									_this.dx_type = false;
									_this.pcheckno = false;

								}
							} else {
								if(res.data.errCode == "noCellPhoneNumber") {
									_this.phoneerro = true;
									_this.phoneerro_m = "手机号码未注册！";
									return false;
								} else if(res.data.errCode == "captchaNotValid") {
									_this.codeerro = true;
									_this.codeerro_m = "验证码无效!";
									return false;
								}
							}
						})
				}
			},
			//忘记密码的校验
			sure() {
				let _this = this
				// 验证密码
				if(_this.password2 == '') {
					_this.pswerro = true;
					_this.pswerro_m = "请输入密码";
					/*_this.$Message.error("请输入密码");*/
					return false;
				} else if(_this.password2.length < 6) {
					_this.pswerro = true;
					_this.pswerro_m = "密码不能小与6位";
					/*_this.$Message.error("密码不能小与6位");*/
					return false;
				} else if(_this.password2 != _this.password3) {
					_this.pswerro = true;
					_this.pswerro_m = "密码不一致";
					/*_this.$Message.error("密码不一致，");*/
					return false;
				} else {

					_this.pswerro = false;
					_this.pswerro_m = "";
					let newUser = {};
					newUser.mobile = _this.codemobile.mobile; //手机号
					newUser.captcha = _this.codemobile.captcha; //验证码
					newUser.newPwd = _this.password2; //新登录密码

					_this.axios({ //发送请求
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.ResetPassword,
							data: api.convertParam(newUser),
						})
						.then(function(res) {
							console.log(res.data);
							if(res.data.status == 1) {
								/*_this.$Message.success('修改成功');*/
								_this.phoneerro = false;
								_this.phoneerro_m = "";
								_this.codeerro = false;
								_this.codeerro_m = "";
								_this.pswerro = false;
								_this.pswerro_m = "";
								_this.codemobile.mobile = '';
								_this.codemobile.captcha = '';
								_this.reok = true;

							} else {
								//_this.$Message.error(res.data.message);
							}
						}).catch(function(error) { //抓捕错误信息
							console.log(error + 'aaaaaa');

						});
					//					 setTimeout(_this.$router.go(0), 6000);

				}

			},
			backlogin() { //重置密码完成，返回登录
				location.reload();
			},
			//			滑动验证图
			divmouseup() {
				let _this = this;
				if(_this.renzhengok) {

				} else if(_this.mousemoveclock) {
					_this.mousemoveclock = false;
					if(_this.movex < _this.randomnum + 5 && _this.movex > _this.randomnum - 5) {
						_this.errotip = "";
						/*_this.$Message.success("验证成功");*/
						_this.renzhengok = true;
						_this.tuopan = false;
						_this.tuopan2 = true;
						//this.movexpx = 0;
						//_this.movex = 0;
					} else {
						_this.errotip = "验证错误，请重试！";
						_this.tuopan2 = false;
						_this.tuopan = true;
						/*_this.$Message.error("验证失败");*/
						_this.movex = 0;

					}
				}
			},
			divtouchup() {
				let _this = this;
				if(_this.renzhengok) {

				} else if(_this.mousemoveclock) {
					_this.mousemoveclock = false;
//					event.x ? event.x : event.pageX; 
					if(_this.movex < _this.randomnum + 5 && _this.movex > _this.randomnum - 5) {
						_this.errotip = "";
						/*_this.$Message.success("验证成功");*/
						_this.renzhengok = true;
						_this.tuopan = false;
						_this.tuopan2 = true;
						//this.movexpx = 0;
						//_this.movex = 0;
					} else {
						_this.errotip = "验证错误，请重试！";
						_this.tuopan2 = false;
						_this.tuopan = true;
						/*_this.$Message.error("验证失败");*/
						_this.movex = 0;

					}
				}
			},
			divmousemove(e) {
				let _this = this;
				event.preventDefault();
				if(_this.mousemoveclock && !_this.renzhengok) {
					e = e || window.event;
					var movecha = e.screenX - _this.mousex;
					if(movecha > _this.BtnWidth || movecha < 0) {

					} else {
						_this.movex = movecha;
					}

				}
			},
			divtouchmove(e) {
				let _this = this;
				event.preventDefault();
				if(_this.mousemoveclock && !_this.renzhengok) {
					e = e || window.event;
//					event.x ? event.x : event.pageX; 
					var movecha = e.touches[0].pageX - _this.mousex;
					if(movecha > _this.BtnWidth || movecha < 0) {

					} else {
						_this.movex = movecha;
					}

				}
			},
			divmousedown(e) {
				let _this = this;
				_this.mousemoveclock = true;
				e = e || window.event;
				_this.mousex = e.screenX;
//				event.x ? event.x : event.pageX; 
			},
			divtouchdown(e) {
				let _this = this;
				_this.mousemoveclock = true;
				e = e || window.event;
				_this.mousex = e.touches[0].pageX;
//				event.x ? event.x : event.pageX; 
			},
			//			登录
			handleSubmit(name) {
				let _this = this;
				let re = /(1[3-9]\d{9}$)/;
				if(_this.loginInfo.mobile == "") {
					_this.errotip = "验证失败！";
					/*_this.$Message.error('手机号是空!');*/
					return false;
				} else if(!re.test(_this.loginInfo.mobile)) {
					_this.errotip = "请输入正确手机号！";
					/*_this.$Message.error('请输入正确手机号!');*/
					return false;
				} else if(_this.loginInfo.password == '') {
					_this.errotip = "请输入密码！";
					/*_this.$Message.error("请输入密码")*/
					return false;
				} else if(_this.loginInfo.password.length < 6) {
					_this.errotip = "密码有误！";
					/*_this.$Message.error("密码有误")*/
					return false;
				} else if(_this.loginInfo.password != _this.loginInfo.password) {
					_this.errotip = "密码有误！";
					/*_this.$Message.error("密码有误")*/
					return false;
				} else {
					_this.$refs[name].validate((valid) => {
						if(_this.renzhengok) {
							if(valid) {
								_this.axios(api.loginTel, {
										params: _this.loginInfo
									})
									.then(function(res) {
										var data = res.data;
										if(data.status == 1) {
											_this.loginok = "登录中...";
											_this.$store.commit('login', data.datas.tokenId);
											_this.$store.commit('saveUser', data.datas.user);
											_this.$store.commit('saveCorp', data.datas.corp);
											var user = JSON.stringify(data.datas.user);
											var corp = JSON.stringify(data.datas.corp);
											window.localStorage.setItem('user', user);
											window.localStorage.setItem('corp', corp);

											const corps = JSON.parse(window.localStorage.getItem('corp')); //将缓存字符串转为json对象
											var registerInfoUrl = api.save_queryAuthentication + corps.id + api.queryAuthentication;
											_this.axios(registerInfoUrl)
												.then(function(ress) {
													console.log(ress);
													if(ress.data.datas.status == 0) {

														_this.$router.push('/sys/corp/authentication_info');
													} else {
														_this.$router.push('/main');
													}
												})

										} else if(data.status == 0) {
											_this.errotip = data.message;
											/*_this.$Message.error(data.message);*/
										}
									})
									.catch(function(error) {
										console.log(error + 'aaaaaa');
									});

							} else {
								let re = /(1[3-9]\d{9}$)/;
								if(_this.loginInfo.mobile == "") {
									_this.errotip = "手机号是空!";
									/*_this.$Message.error('手机号是空!');*/
									return false;
								} else if(!re.test(_this.loginInfo.mobile)) {
									_this.errotip = "请输入正确手机号!";
									/*_this.$Message.error('请输入正确手机号!');*/
									return false;
								} else if(_this.loginInfo.password == '') {
									_this.errotip = "请输入密码";
									/*_this.$Message.error("请输入密码")*/
									return false;
								}
								//							else  if(_this.loginInfo.password != _this.loginInfo.password ){
								//								_this.$Message.error("密码有误")	
								//								return false;
								//							}
								else {
									_this.errotip = "登录失败!";
									/*_this.$Message.error('登录失败!');*/
								}
							}
						} else {
							_this.errotip = "请完成拖动验证操作!";
						}
					})
				}

			},
			code_go() {
				let _this = this;
				_this.$router.push({
					path: '/scanCode'
				})
			},

			IMGTUO: function(e) {
				if(mousemoveclock && !renzhengok) {
					e = e || window.event;
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
	input:-webkit-autofill,
	textarea:-webkit-autofill,
	select:-webkit-autofill {
		background-color: rgb(250, 255, 189);
		/* #FAFFBD; */
		background-image: none;
		color: rgb(0, 0, 0);
	}
	
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
		margin-top: -268px;
		right: 14vw;
		background-color: #112e44;
		border: none;
		border-radius: 4px;
		height: 537.72px;
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
		height: 42px;
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
	
	.login .LoginDiv .UserDiv,
	.PSWDiv {
		width: 300px;
		height: 40px;
		margin: 0 auto;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #e8e8e8;
		border-radius: 2px;
		background-color: #fff;
	}
	/*.login .LoginDiv .UserDiv:hover,
	.PSWDiv:hover {
		background-color: #faffbd;
	}
	
	.PSWDiv input:hover {
		background-color: #faffbd!important;
	}
	
	.login .LoginDiv .UserDiv input {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.login .LoginDiv .UserDiv input:hover {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.login .LoginDiv .UserDiv input:focus {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.login .LoginDiv .PSWDiv input {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.login .LoginDiv .PSWDiv input:hover {
		background-color: rgba(0, 0, 0, 0)!important;
	}
	
	.login .LoginDiv .PSWDiv input:focus {
		background-color: rgba(0, 0, 0, 0)!important;
	}*/
	
	.login .LoginDiv .UserDiv,
	.PSWDiv .LoginDiv .PSWDiv {
		margin-top: 5px;
		margin-bottom: 20px;
	}
	
	.login .LoginDiv .UserDiv:hover,
	.PSWDiv:hover {
		border-color: #269edc;
	}
	
	.login .LoginDiv .UserDiv img,
	.PSWDiv img {
		height: 23px;
		margin-left: 0.736vw;
	}
	
	.login .LoginDiv .UserDiv input,
	.PSWDiv input {
		width: 82%;
		height: 30px;
		border: none;
		background-color: white;
		font-size: 18px;
	}
	
	.login .LoginDiv .toLogin {
		width: 300px;
		height: 40px;
		color: white;
		background-color: #03b8cc;
		border: none;
		border-radius: 2px;
		font-size: 17px;
		letter-spacing: 8px;
		cursor: pointer;
	}
	
	.login .LoginDiv .ZW {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 15px;
	}
	
	.login .LoginDiv .ZW span {
		position: relative;
	}
	
	.login .LoginDiv .ZW:hover span:before {
		content: '';
		position: absolute;
		bottom: 2px;
		width: 100%;
		height: 1px;
		background-color: #eeeeee;
	}
	
	.login .LoginDiv .ZW a img {
		margin-right: 6px;
	}
	
	.login .LoginDiv .ZW span {
		display: block;
		font-size: 16px;
		color: #eeeeee;
	}
	
	.login .LoginDiv .ZW a {
		display: flex;
		align-items: center;
		font-size: 16px;
		color: #eeeeee;
		float: right;
	}
	
	#imgscode {
		width: 300px;
		height: 89px;
		position: relative;
		margin-top: 20px;
		border-radius: 8px;
		overflow: hidden;
	}
	
	.BlackDiv {
		width: 34px;
		height: 34px;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 20px;
	}
	
	.ImgTuo {
		width: 34px;
		height: 34px;
		position: absolute;
		top: 20px;
		/*background-color: skyblue;*/
		/*background-image: url(../../assets/img//pintu.jpg);*/
		/*background-size: 300px auto;*/
		background-repeat: no-repeat;
		z-index: 999;
		overflow: hidden;
	}
	.ImgTuo img{
		width: 300px;
		height: auto;
		position: absolute;
		top: -20px;
	}
	.TuoDiv {
		width: 300px;
		height: 29px;
		line-height: 29px;
		box-sizing: content-box;
		border: 1px solid #e4e4e4;
		border-radius: 20px;
		position: relative;
		font-size: 14px;
		text-align: center;
		margin-top: 0.526vw;
		background-color: #f9f9f9;
		color: #a8a8a8;
		position: relative;
	}
	
	.tuopan {
		width: 18px;
		height: 18px;
		position: absolute;
		top: 4px;
		right: -23px;
	}
	
	.TuoBtn {
		width: 64px;
		height: 29px;
		/*background-color: skyblue;*/
		position: absolute;
		top: 0;
		background-image: url(../../assets/img/imgtuobtn.png);
		background-repeat: no-repeat;
		background-size: 64px 29px;
		cursor: pointer;
		z-index: 999;
	}
	
	.imgscode_img {
		width: 100%;
		display: block;
	}
	
	.forget_psw {
		cursor: pointer;
		font-size: 16px;
	}
	/*忘记密码*/
	
	.forget_box {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background-color: #f7f8fa;
		z-index: 999;
	}
	
	.forget {
		width: 100%;
		height: 100%;
		border-radius: 5px;
		overflow: hidden;
	}
	
	.RegDiv .Title {
		background-color: #fff;
		padding: 40px 0 145px 0;
		text-align: center;
	}
	
	.RegDiv .Title div {
		display: inline-block;
		text-align: center;
		position: relative;
	}
	
	.RegDiv .Title div span {
		position: absolute;
		bottom: 5px;
		right: -110px;
		font-size: 18px;
		color: #888888;
	}
	
	.RegDiv .Title div img {
		width: 404px;
		height: 46px;
	}
	
	.RegDiv .Title div button {
		position: absolute;
		bottom: 5px;
		right: -390px;
		font-size: 14px;
	}
	
	.RegDiv ul {
		margin-top: 85px;
	}
	
	.RegDiv ul li {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		margin: 25px auto;
		justify-content: center;
	}
	
	.RegDiv ul li .li_div {
		position: relative;
		display: flex;
	}
	
	.RegDiv ul li .li_div .li_div_span {
		width: 70px;
		font-size: 14px;
		text-align: right;
	}
	
	.RegDiv ul li .li_div input {
		height: 55px;
		width: 400px;
		border: 1px solid #e8e8e8;
		padding: 0 15px;
	}
	
	.RegDiv ul li .li_div input:hover {
		border-color: #03b8cc;
	}
	
	.RegDiv ul li .li_div input:active {
		border-color: #03b8cc;
	}
	
	.RegDiv ul li .li_div input:focus {
		border-color: #03b8cc;
	}
	
	.RegDiv ul li:nth-of-type(2) .li_div input {
		width: 285px;
	}
	
	.RegDiv ul li .li_div button {
		width: 110px;
		height: 55px;
		font-size: 14px;
		background-color: #fff;
		border: 1px solid #e8e8e8;
		cursor: pointer;
		border-left: none;
	}
	
	.RegDiv ul li:nth-of-type(2) .li_div button {
		width: 115px;
		color: #03b8cc;
	}
	
	.RegDiv ul li .li_div .lierro {
		display: flex;
		align-items: center;
		position: absolute;
		left: 440px;
		top: 12.5px;
		width: 300px;
	}
	
	.RegDiv ul li .li_div .lierro img {
		width: 20px;
		height: 20px;
	}
	
	.RegDiv ul li .li_div .lierro span {
		margin-left: 10px;
		color: #e92552;
		font-size: 14px;
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
	
	.radiokuang {
		width: 15px;
		height: 15px;
		border: 1px solid #eee;
		margin-right: 5px;
		position: relative;
	}
	
	.radiokuang:hover {
		cursor: pointer;
	}
	
	.show-box {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #03b8cc;
		background: url(../../assets/img/radselectok.jpg) no-repeat;
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
		margin: 40px auto;
		text-align: center;
	}
	
	.forget_but {
		width: 400px;
		height: 55px;
		margin: 0 auto;
		color: white;
		background-color: #03b8cc;
		border: none;
		border-radius: 2px;
		font-size: 16px;
		letter-spacing: 5px;
	}
	
	.forget_but:hover {
		background-color: #00c4da;
		cursor: pointer;
	}
	
	.forget_x {
		width: 100px;
		height: 40px;
		background: #e6e6e6;
		border: none;
		color: #555555;
		cursor: pointer;
		margin-left: 180px;
	}
	
	.forget_x:hover {
		background-color: #999999;
		color: #fefefe;
	}
	
	.demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}
	
	.zw2 label {
		margin-right: 6px;
		border: 1px solid #d8d8d8;
		background-color: #112e44;
	}
	/*.zw2 label input:checked+.show-box {
		background: #269edc;
	}*/
	
	.zw2 label .show-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 14px;
		height: 14px;
		border-radius: 2px;
		background: #03b8cc;
	}
	/*.zw2 label .show-box:before {
		content: '';
		position: absolute;
		top: 2px;
		left: 3px;
		width: 50%;
		height: 0.5vw;
		border: solid #112e44;
		border-width: 2px 2px 0px 0;
		transform: rotate(120deg);
	}*/
	
	.zw2 {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		margin: 20px 0;
		color: #eee;
		font-size: 12px;
	}
	
	.zw3 {
		display: flex;
		align-items: center;
	}
	
	.hoverchange {
		position: relative;
	}
	
	.hoverchange:hover:before {
		content: '';
		position: absolute;
		bottom: 2px;
		width: 100%;
		height: 1px;
		background-color: #eeeeee;
	}
	
	.RegDiv .liucp {
		width: 100%;
		display: flex;
	}
	
	.rznum,
	.czpsw {
		width: 50%;
		height: 0;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.rznum .rznd {
		position: relative;
	}
	
	.rznum .rznd div {
		width: 50px;
		height: 50px;
		line-height: 50px;
		border-radius: 50%;
		border: 1px solid #cccccc;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: -24.5px;
		right: 106px;
		background-color: #fff;
		color: #cccccc;
		font-size: 30px;
	}
	
	.rznum .rznd span {
		position: absolute;
		top: -57.5px;
		right: 92px;
		font-size: 13px;
		color: #cccccc;
	}
	
	.czpsw .cznd {
		position: relative;
	}
	
	.czpsw .cznd div {
		width: 50px;
		height: 50px;
		line-height: 50px;
		border-radius: 50%;
		border: 1px solid #cccccc;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: -24.5px;
		left: 106px;
		background-color: #fff;
		color: #cccccc;
		font-size: 30px;
	}
	
	.czpsw .cznd span {
		position: absolute;
		top: -57.5px;
		left: 104px;
		font-size: 13px;
		color: #cccccc;
	}
	
	.nowbu {
		border-color: #03b8cc!important;
		color: #03b8cc!important;
	}
	
	.reok {
		position: absolute;
		top: 85px;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	.reok div {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 80px;
	}
	
	.reok div img {
		width: 53px;
		height: 53px;
		margin-right: 20px;
	}
	
	.reok div span {
		color: #3e9f00;
		font-size: 20px;
	}
	
	.reok button {
		width: 400px;
		height: 55px;
		background-color: #03b8cc;
		border: none;
		border-radius: 3px;
		font-size: 14px;
		color: #fff;
	}
	
	.reok button:hover {
		background-color: #00c4da;
	}
	
	.bgchange {
		height: 29px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		background: #13c19f;
		border-radius: 30px;
		z-index: 200;
	}
</style>