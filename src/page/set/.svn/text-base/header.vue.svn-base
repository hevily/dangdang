<template>
	<div class="header">
		<div class="wrapper">
			<div class="logobox" @click="mainPush">
				<ul>
					<li class="logo"><span>智谷超级工厂工作台</span></li>
					<!--个人资料 最右边头像-->
					<li class="setup-list">
						<Poptip placement='bottom-end' trigger="hover">
							<div class="header-pad-20">
								<span class="headermessage">
                                   <!-- <span>{{ userInfo.name }}</span>
								<span>@{{ corp.name }}</span>-->
								<img src="../../assets/img/userimg.png" style="margin-left: 12px;" />
								</span>
								<p style="margin-left: 10px;">
									{{pageInfo.username}}@{{pageInfo.gsname}}
								</p>
							</div>
							<div class="aboutMe pull-menu aboutGe" slot='content'>
								<!--<div class="aboutGe_w">
									<div class="">
										<img src="../../assets/img/userimg.png" />
									</div>
									<p>
										{{pageInfo.username}}
									</p>
								</div>-->
								<div class="aboutGe_b">
									<div class="" @click.stop="ge()">
										<div class="">
											<img src="../../assets/img/top_zj.png" />
										</div>
										<p>
											个人资料
										</p>
									</div>
									<div @click.stop="sz()">
										<div class="">
											<img src="../../assets/img/top_sz.png" />
										</div>
										<p>
											组织员工
										</p>
									</div>
									<div @click.stop="tou()">
										<div class="">
											<img src="../../assets/img/top_tou.png" />
										</div>
										<p>
											安全设置
										</p>
									</div>
								</div>
								<div @click='logout' class="logout">
									<Icon type="log-out"></Icon>
									<span>退出当前账号</span>
								</div>
							</div>
						</Poptip>
					</li>
				</ul>
				<!--<div class="logo"></div>	-->
			</div>
			<div class="setup">

				<ul class="setup-content">

					<li class="header-pad-20 setup-list">
						<div class="header-pad-20">
							<span class="headermessage">
								</span>
							<img class="tongzhi" src="../../assets/img/tongzhi.png" />
						</div>

					</li>

					<li class="header-pad-20 setup-list">
						<div class="header-pad-20">
							<span class="headermessage">
								</span>
							<img class="kefuimg" src="../../assets/img/kefu.png" />
						</div>

					</li>
					<li class="header-pad-20 setup-list">

						<Poptip placement='bottom-end' trigger="hover" class="headerhover" slot="background:red;">
							<div class="header-pad-20">
								<span class="headermessage">
								</span>
								<img class="setimg" src="../../assets/img/set.png" />
							</div>

							<ul class="aboutMe pull-menu" slot='content' style="width:200px;overflow: hidden; border: none;">
								<!--<Icon type="android-list"></Icon>-->
								<!--<router-link to="/comm_developing">基础信息</router-link>-->
								<Menu accordion>
									<!--<Submenu name="1" class="tempdiv">
										<template slot="title">
											<div class="menu_sub_basemessage"></div>
											<span>基础信息</span>
										</template>
										<MenuItem name="1-1" class="head_menuitem">
										<router-link to="/sys/user/account">我的信息</router-link>
										</MenuItem>
										<MenuItem name="1-2" class="head_menuitem">
										<router-link to="/sys/user/main">组织与用户</router-link>
										</MenuItem class="head_menuitem">
										<MenuItem name="1-3">
										<router-link to="/sys/user/modifypwd">修改密码</router-link>
										</MenuItem>
										<MenuItem name="1-4">
										<router-link to="/sys_modify_phone">修改手机号</router-link>
										</MenuItem>
									</Submenu>-->

									<Submenu name="1" class="tempdiv">
										<template slot="title">
											<div class="menu_sub_busmessage"></div>
											<span>公司信息</span>
										</template>
										<MenuItem name="1-1">
										<router-link to="/sys/corp/modifyme">基本信息</router-link>
										</MenuItem>
										<MenuItem name="1-2">
										<router-link to="/sys/corp/authentication_info">资质认证</router-link>
										</MenuItem>
										<MenuItem name="1-3">
										<router-link to="/sys/corp/invoice/modify">开票信息</router-link>
										</MenuItem>
										<MenuItem name="1-4">
										<router-link to="/sys/corp/consignees_list">收货地址</router-link>
										</MenuItem>
									</Submenu>

									<Submenu name="1" class="tempdiv">
										<template slot="title">
											<div class="menu_sub_set"></div>
											<span>系统设置</span>
										</template>
										<!--<MenuItem name="1-1">文章管理</MenuItem>
										<MenuItem name="1-2">评论管理</MenuItem>
										<MenuItem name="1-3">举报管理</MenuItem>-->
									</Submenu>

									<Submenu name="1" class="tempdiv">
										<template slot="title">
											<div class="menu_sub_caozuo"></div>
											<span>操作日志</span>
										</template>
										<!--<MenuItem name="1-1">文章管理</MenuItem>
										<MenuItem name="1-2">评论管理</MenuItem>
										<MenuItem name="1-3">举报管理</MenuItem>-->
									</Submenu>
								</Menu>

							</ul>

						</Poptip>
					</li>
					

				</ul>
			</div>
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

		name: 'header',
		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

				pageInfo: {
					gsname: "",
					username: "",
					phone: "",
					job: "",
					bm: "",
					userphoto: ''
				},
			}
		},
		mounted: function() {
			var a = document.querySelectorAll(".ivu-poptip-body");
			for(var i = 1; i < a.length; i++) {
				a[i].style.padding = "0";
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.user.user;
			},
			corp() {
				return this.$store.state.user.corp;
			},
		},
		created() {
			this.get_mymessage();
		},
		methods: {

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
						//						console.log('111111',res);
						if(res.data.status == '1') {
							_this.pageInfo.gsname = res.data.datas.corpName;
							_this.pageInfo.username = res.data.datas.name;
							_this.pageInfo.phone = res.data.datas.mobile;
							_this.pageInfo.job = res.data.datas.title;
							_this.pageInfo.bm = res.data.datas.departmentName;
							//_this.imgup.mobile = res.data.datas.mobile;
							if(res.data.datas.userPhoto !== null) {
								_this.logosrc = res.data.datas.userPhoto;
								//								console.log(_this.logosrc);
								// let imgdiv = document.getElementById("imgupload_zhe_div");
								// imgdiv.style.display = "block";
							}
							//_this.imgup.id = res.data.datas.id;
						} else {

							//							_this.$Message.error(res.data.message);
						}
						//_this.fun_yzm();

					})
					.catch(function(error) { //捕获错误信息
						console.log(error);
					});
			},
			ge() {
				let _this = this;
				_this.$router.push({
					path: '/sys/user/account'
				})
			},
			tou() {
				let _this = this;
				_this.$router.push({
					path: '/set/tou'
				})
			},
			sz() {
				let _this = this;
				_this.$router.push({
					path: '/sys/user/main'
				})
			},
			logout() {
				const _this = this;
				const corp = JSON.parse(window.localStorage.getItem('corp'));
				this.axios({
						method: 'get',
						url: api.logout
					})
					.then(function(res) {
						console.log(res);
						if(res.data.status == 1) {
							_this.$store.commit('logout');
							/*var url = '/' + corp.keyId + '/loginTel';
							_this.$router.push('/' + corp.keyId + '/loginTel');*/
							var url = '/';
							_this.$router.push('/');
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//							_this.$Message.error(res.data.message);
						}
					})
			},
			mainPush() { //路由跳转到首页
				this.$router.push({
					path: "/main"
				});
			},

		},

	}
</script>
<style>
	.logo span {
		font-size: 18px;
		color: #fff;
		letter-spacing: 1px;
	}
	
	.tempdiv .ivu-menu-submenu-title {
		width: 200px !important;
		padding: 10px 18px!important;
		display: flex;
		align-items: center;
		height: 37px;
	}
	
	.tempdiv span {
		margin-right: 30px;
		margin-left: 15px;
	}
	
	.tempdiv .ivu-menu-submenu-title i {
		top: 0;
	}
	
	.tempdiv ul {
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.tempdiv ul li {
		display: flex;
		align-items: center;
		height: 37px;
		padding-left: 65px!important;
	}
	
	.header .ivu-poptip-inner .ivu-poptip-body {
		padding: 10px 0;
	}
</style>
<style scoped>
	.aboutMe {
		box-shadow: 0 0 20px #373d41;
		border: 1px solid #eff1f8;
	}
	
	.header {
		height: 60px;
		background: #373d41;
		width: 100%;
	}
	
	button {
		margin-right: 5px;
	}
	
	.header .wrapper {
		display: flex;
		justify-content: space-between;
	}
	
	.headermessage {
		display: flex;
		display: -webkit-flex;
		align-items: center;
	}
	
	.header img {
		height: 26px;
	}
	
	.headermessage img {
		width: 39px;
		height: 39px;
	}
	
	.kefuimg {
		width: 30px;
		height: 30px!important;
	}
	
	.tongzhi {
		width: 24px;
		height: 26px;
	}
	
	.logobox {
		display: flex;
		align-items: center;
		font-size: 16px;
		color: #fff;
		padding-left: 20px;
		height: 60px;
		cursor: pointer;
	}
	.logobox ul{
		display: flex;
		align-items: center;
	}
	.headerhover {
		/*height: 26px;*/
	}
	
	.setimg {
		width: 30px;
		height: 26px;
	}
	
	.setup {
		height: 60px;
	}
	
	.setup ul.setup-content {
		display: flex;
		height: 100%;
	}
	
	.setup ul li.setup-list {
		font-size: 16px;
		display: flex;
		align-items: center;
		padding: 0 0px;
		color: #fff;
		border-left: 1px solid #2a2f32;
	}
	
	.header-pad-20 {
		padding: 0 30px;
		height: 60px;
		display: flex;
		align-items: center;
		font-size: 14px;
		cursor: pointer;
	}
	
	.setup ul li.setup-list:hover {
		background: #2a2f32;
	}
	/* .setup .pull-menu li{
        color: #576b7e;
    }*/
	
	.aboutGe {
		width: 290px;
		/*height: 260px;*/
		background: #eff1f8;
	}
	
	.aboutGe_w {
		height: 110px;
		border-bottom: 1px solid #eff1f8;
		padding: 15px;
		background: #fff;
	}
	
	.aboutGe_w div {
		text-align: center;
		height: 60px;
		/*line-height: 70px;*/
	}
	
	.aboutGe_w div img {
		width: 40px;
		height: 40px;
	}
	
	.aboutGe_w p {
		color: #465a65;
		text-align: center;
		font-size: 13px;
	}
	
	.aboutGe_b {
		background: #fff;
		height: 110px;
		display: flex;
		justify-content: space-between;
		padding: 15px;
	}
	
	.aboutGe_b>div {
		width: 80px;
		height: 80px;
		border-radius: 3px;
		cursor: pointer;
	}
	
	.aboutGe_b>div:hover {
		border-radius: 3px;
		background: #eff1f8;
	}
	
	.aboutGe_b>div div {
		text-align: center;
		padding-top: 15px;
	}
	
	.aboutGe_b div p {
		font-size: 13px;
		color: #465a65;
		text-align: center;
		padding-top: 5px;
	}
	
	.aboutMe ul li i {
		font-size: 18px;
		vertical-align: middle;
		margin-top: 10px;
	}
	
	.aboutMe li span {
		display: inline-block;
		padding-left: 5px;
	}
	/*.aboutMe li span: {
		display: inline-block;
		padding-left: 5px;
	}*/
	
	.aboutMe li:hover {
		color: #00c1de;
	}
	
	.aboutMe li ul li:hover a {
		color: #00c1de;
	}
	
	.aboutMe ul li .ivu-menu-submenu-title {
		padding-top: 0!important;
		padding-bottom: 0!important;
	}
	
	.menu_sub_basemessage {
		height: 16px;
		width: 16px;
		margin-right: 10px;
		background: url(../../assets/img/basemessage.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
	}
	
	.menu_sub_busmessage {
		height: 16px;
		width: 16px;
		margin-right: 10px;
		background: url(../../assets/img/busmessage.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
	}
	
	.menu_sub_busmessage:hover {
		color: #00c1de;
	}
	
	.menu_sub_set {
		height: 16px;
		width: 16px;
		margin-right: 10px;
		background: url(../../assets/img/headset.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
	}
	
	.menu_sub_caozuo {
		height: 16px;
		width: 16px;
		margin-right: 10px;
		background: url(../../assets/img/caozuo.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
	}
	
	.aboutMe li:hover .menu_sub_basemessage {
		background: url(../../assets/img/basemessage_hover.png);
	}
	
	.aboutMe li:hover .menu_sub_busmessage {
		background: url(../../assets/img/busmessage_hover.png) no-repeat;
	}
	
	.aboutMe li:hover .menu_sub_set {
		background: url(../../assets/img/headset_hover.png) no-repeat;
	}
	
	.aboutMe li:hover .menu_sub_caozuo {
		background: url(../../assets/img/caozuo_hover.png) no-repeat;
	}
	
	.logout {
		text-align: center;
		margin: 10px 0;
		color: #000;
		cursor: pointer;
	}
	
	.logout:hover {
		color: #00c1de;
	}
</style>