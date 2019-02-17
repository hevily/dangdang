<template>
	<div class="tou">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>我的</Breadcrumb-item>
			<Breadcrumb-item>安全设置</Breadcrumb-item>
		</Breadcrumb>
		<div class="welcome right_home_warp-nobot">
			<h4>安全设置</h4>
			<div class="usermassage_div">
				<div class="user_pic">
					<div class="uploaddiv">
						<Upload :format="['jpg','jpeg','png']" accept="image/jpg,image/jpeg,image/png" :action="uploadUrl" :headers="uploadHeader" :on-success="handleSuccessBusiness">
							<Button type="ghost" id="imgno" class="uploadbtn"></Button>
						</Upload>
						<div id="imgupload_zhe_div">
							<img :src="logosrc" class="imgshow" />
							<div class="imgupload_zhe">
								<div class="imgupload_zhediv" style="text-align: center;width: 100%;">
									<Icon size="30" color='white' type="eye" @click.native="fangda" />
									<Icon size="30" color='white' type="plus" @click.native="tianjia" />
								</div>

							</div>
						</div>
					</div>
					<p @click="uploadbtn_click">修改头像</p>
				</div>
				<div class="user_message">
					<ul>
						<li>
							<span>登录账号：</span>
							<span>{{pageInfo.phone}}</span>
							<span v-if="status==0" style="color: #ff9900;">（公司未认证）</span>
							<span v-if="status==1" style="color: #ff9900;">（公司已认证）</span>
							<span v-else="status==2" style="color: #ff4141">（公司认证不通过）</span>
							<span v-else="status==5" style="color: #ff9900;">（公司认证中）</span>
						</li>
						<li>
							<span>用户名称：</span>
							<span>{{pageInfo.username}}</span>
						</li>
						<li>
							<span>注册时间：</span>
							<span></span>
						</li>

					</ul>
				</div>
			</div>
			<div class="userpower_div">
				<span>您当前的账号安全程度</span>
				<ul>
					<li>弱</li>
					<li>中等</li>
					<li>高</li>
				</ul>
				<span>安全级别：</span>
				<span class="result_level">高</span>
			</div>
			<div class="changepsw_div">
				<div>
					<span class="div_title">登录密码</span>
					<span>安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。</span>
				</div>
				<div>
					<img src="../../assets/img/changepsw.jpg" alt="" /><span class="setok">已设置</span>
					<router-link to='/sys/user/modifypwd'>
						<span class="link_span changepsw">修改</span>
					</router-link>
					<!--<span class="changepsw">修改</span>-->
				</div>
			</div>
			<div class="changephone_div">
				<div>
					<span class="div_title">手机绑定</span>
					<span>您已绑定了手机<span style="color: #08af6e;">133****0375 </span>[您的手机为安全手机，可以找回密码，可用于登录]</span>
				</div>
				<div>
					<img src="../../assets/img/changepsw.jpg" alt="" /><span class="setok">已设置</span>
					<router-link to='/sys_modify_phone'>
						<span class="link_span changephone">修改</span>
					</router-link>
				</div>
			</div>
		</div>
		<div v-show="showis" class="rightBox_but" @click="isshow">
			<div>
				<img :src="logosrc" />
			</div>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {

		data() {
			return {
				uploadUrl: api.uploadFileUrl,
				showUpList: 'false',
				showis: false,
				logosrc: '',
				file: '',
				src: '',
				status: null,
				pageInfo: {
					gsname: "",
					username: "",
					phone: "",
					job: "",
					bm: "",
					userphoto: ''
				},
				imgup: {
					id: '',
					userPhoto: '',
					mobile: ''
				}

			}
		},
		created() {
			let _this = this;
			_this.get_mymessage();
			const corp = JSON.parse(window.localStorage.getItem('corp')); //将缓存字符串转为json对象
			var registerInfoUrl = api.save_queryAuthentication + corp.id + api.queryAuthentication;
			_this.axios(registerInfoUrl)
				.then(function(res) {
					_this.status = res.data.datas.status;
					/*if(res.data.datas.status == 1) {
						_this.status = "（公司已认证）";
					} else if(res.data.datas.status == 2) {
						_this.status = "（公司认证不通过）"
					} else if(res.data.datas.status == 5) {
						_this.status = "（公司认证中）"
					}*/
				})

			//_this.imgup.id = _this.$store.state.user.corp.id;
		},
		computed: {
			userInfo() {
				let _this = this;
				_this.pageInfo.username = _this.$store.state.user.user.name;
				return _this.$store.state.user.user
			},
			userInfo() {
				let _this = this;
				_this.pageInfo.username = _this.$store.state.user.user.name;
				return _this.$store.state.user.user
			},
			uploadHeader() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}
		},

		methods: {

			uploadbtn_click() {
				let _this = this;
				document.querySelector(".uploadbtn").click();
			},
			get_mymessage() {
				let _this = this;
				_this.axios({ //发送请求
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						//url:'/api/upms/corp/{id}/queryAuthentication.do',
						url: api.getUserName
						//data: api.convertParam({'id':'100'})
					})
					.then(function(res) {
						//console.log(res);
						if(res.data.status == '1') {
							_this.pageInfo.gsname = res.data.datas.corpName;
							_this.pageInfo.username = res.data.datas.name;
							_this.pageInfo.phone = res.data.datas.mobile;
							_this.pageInfo.job = res.data.datas.title;
							_this.pageInfo.bm = res.data.datas.departmentName;
							_this.imgup.mobile = res.data.datas.mobile;
							if(res.data.datas.userPhoto !== null) {
								
								_this.logosrc = res.data.datas.userPhoto;
								//								console.log(_this.logosrc);
								let imgdiv = document.getElementById("imgupload_zhe_div");
								imgdiv.style.display = "block";
								document.getElementById("imgno").style.background="none";
							}
							_this.imgup.id = res.data.datas.id;
						} else {
							//_this.$Message.error(res.data.message);
						}
						//_this.fun_yzm();

					})
					.catch(function(error) { //捕获错误信息
						console.log(error);
					});
			},
			uploadBusHeader() {
				let _this = this;
				alert("jin");
				const tokenId = _this.$store.state.token;
				console.log("!!!!!!!!");
				console.log(tokenId);
				return {
					token_id: tokenId
				}
			},
			handleSuccessBusiness(res, file, fileList) {
				let _this = this;
				_this.logosrc = res.url; //上传成功的图片路径
				alert("ok");
				_this.imgup.userPhoto = res.url; //显示的图片路径
				//this.$refs.upload.fileList = []; //移除已上传的文件信息
				let imgdiv = document.getElementById("imgupload_zhe_div");
				imgdiv.style.display = "block";

			},
			fangda() {
				let _this = this;
				_this.showis = !_this.showis;
			},
			tianjia() {
				document.querySelector(".uploadbtn").click(); //点击浮动图片
			},
			isshow() {
				let _this = this;
				_this.showis = !_this.showis;
			}

		}
	}
</script>

<style scoped>
	h4 {
		font-size: 14px;
		padding-left: 15px;
		color: #415161;
		border-left: 3px solid #88b7e0;
		font-weight: normal;
	}
	
	.uploaddiv {
		position: relative;
		width: 95px;
		height: 95px;
	}
	
	.uploadbtn {
		width: 95px;
		height: 95px;
		background: url(../../assets/img/toux.png) no-repeat;
		border: 1px solid #eeeeee;
		background-size: 100% 100%;
		margin-left: 0;
	}
	
	#imgupload_zhe_div {
		position: absolute;
		top: 0;
		width: 95px;
		height: 95px;
		display: none;
	}
	
	.imgshow {
		width: 95px;
		height: 95px;
		display: block;
	}
	
	#imgupload_zhe_div:hover .imgupload_zhe {
		display: block;
	}
	
	.imgupload_zhe {
		position: absolute;
		top: 0;
		width: 95px;
		height: 95px;
		background-color: rgba(0, 0, 0, 0.4);
		display: none;
	}
	
	.imgupload_zhediv {
		width: 95px;
		height: 95px;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		text-align: center;
		margin: 0!important;
		align-content: space-around;
	}
	
	.imgupload_zhediv i {
		margin-top: 11px;
	}
	
	.rightBox_but {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
	}
	
	.rightBox_but div {
		width: 600px;
		margin-left: -260px;
		position: relative;
		top: 100px;
		left: 45%;
	}
	
	.rightBox_but div img {
		width: 100%;
	}
	
	.usermassage_div {
		border-top: 1px solid #ccd9e6;
		border-bottom: 1px solid #ccd9e6;
		padding: 12px 0;
		margin-top: 20px;
		display: flex;
	}
	
	.usermassage_div .user_pic p {
		margin-left: 25px;
		margin-top: 10px;
		color: #00b4cf;
		position: relative;
		display: inline-block;
	}
	
	.usermassage_div .user_pic p:hover {
		cursor: pointer;
		color: #00b4cf;
	}
	
	.usermassage_div .user_pic p:hover:before {
		content: '';
		position: absolute;
		bottom: 0px;
		width: 100%;
		height: 1px;
		background-color: #00c1de;
	}
	
	.user_message {
		margin-left: 30px;
		padding-top: 10px;
	}
	
	.user_message ul li {
		margin-bottom: 10px;
		font-size: 14px;
	}
	
	.userpower_div,
	.changepsw_div,
	.changephone_div {
		padding: 30px 0;
		display: flex;
		font-size: 14px;
		border-bottom: 1px dashed #ccd9e6;
	}
	
	.changepsw_div,
	.changephone_div {
		justify-content: space-between;
	}
	
	.changepsw_div div,
	.changephone_div div {
		display: flex;
		align-items: center;
	}
	
	.div_title {
		margin-right: 56px;
		font-size: 16px;
		color: #415161;
	}
	
	.setok {
		color: #009900;
		margin: 0 15px;
	}
	
	.changepsw,
	.changephone {
		border-left: 1px solid #aec0ae;
		padding-left: 15px;
		color: #1695b9;
		position: relative;
	}
	
	.changepsw,
	.changephone:hover {
		cursor: pointer;
	}
	
	.changepsw:hover:before,
	.changephone:hover:before {
		content: '';
		position: absolute;
		bottom: 2px;
		width: 70%;
		height: 1px;
		background-color: #1695b9;
	}
	
	.userpower_div ul {
		display: flex;
		margin-left: 60px;
		margin-right: 85px;
	}
	
	.userpower_div ul li {
		color: #fff;
		width: 80px;
		height: 20px;
		text-align: center;
	}
	
	.userpower_div ul li:first-child {
		background-color: #f8d7cf;
	}
	
	.userpower_div ul li:nth-child(2) {
		background-color: #fab8a4;
	}
	
	.userpower_div ul li:nth-child(3) {
		background-color: #fd8763;
	}
	
	.result_level {
		color: #ffa126;
	}
</style>