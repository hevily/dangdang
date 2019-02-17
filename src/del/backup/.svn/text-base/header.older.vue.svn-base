<template>
	<div class="header">
		<div class="wrapper">
			<div class="logobox" @click="mainPush">
				<div class="logo"><img src="../../assets/img/logo.png" style="width: 132px;height: auto;" /></div>
				<!-- <Icon type="navicon"></Icon> -->
			</div>
			<div class="setup">
				<ul class="setup-content">
					<li class="setup-list">
						<Poptip placement='bottom-end' trigger="hover">
							<div class="header-pad-20">
								<span class="headermessage">
                                    <span>{{ userInfo.name }}</span>
								<span>@{{ corp.name }}</span>
								<img src="../../assets/img/kehu.png" style="margin-left: 12px;" />
								</span>
							</div>
							<ul class="aboutMe pull-menu" slot='content'>
								<li>
									<Icon type="android-list"></Icon>
									<router-link to="/accountBaseInfo">账号信息</router-link>
								</li>
								<li @click='logout'>
									<Icon type="log-out"></Icon>
									<span>退出</span>
								</li>
							</ul>
						</Poptip>
					</li>

					<li class="header-pad-20 setup-list">
						<img src="../../assets/img/kefu.png" />
					</li>
					<li class="header-pad-20 setup-list">
						<Poptip placement='bottom-end' trigger="hover" class="headerhover" slot="background:red;">

							<img src="../../assets/img/set.png" />

							<ul class="aboutMe pull-menu" slot='content'>

								<!--<Icon type="android-list"></Icon>-->
								<!--<router-link to="/comm_developing">基础信息</router-link>-->
								<Menu accordion>
									<Submenu name="1" class="tempdiv">
										<template slot="title" >
											<div class="menu_sub_basemessage"></div>											
											<span>基础信息</span>
										</template>
										<MenuItem name="1-1" class="head_menuitem">
											<router-link to="/accountBaseInfo">我的信息</router-link>												
										</MenuItem>
										<MenuItem name="1-2" class="head_menuitem">
										    <router-link to="/developing">组织与用户</router-link>
										</MenuItem class="head_menuitem">
										<MenuItem name="1-3">
											<router-link to="/sys/user/modifypwd">修改密码</router-link>											
										</MenuItem>
										<MenuItem name="1-4">
											<router-link to="/sys_modify_phone">修改手机号</router-link>											
										</MenuItem>
									</Submenu>

									<Submenu name="1" class="tempdiv">
										<template slot="title">
											<div class="menu_sub_busmessage"></div>	
											<span>公司信息</span>
										</template>
										<MenuItem name="1-1" ><router-link to="/companyBaseInfo">注册信息</router-link>	</MenuItem>
										<MenuItem name="1-2" ><router-link to="/authentication">资质认证</router-link>	</MenuItem>
										<MenuItem name="1-3"><router-link to="/authenticationBilling">开票信息</router-link></MenuItem>
									</Submenu>

									<Submenu name="1" class="tempdiv">
										<template slot="title">
											<div class="menu_sub_set"></div>	
											<span>系统设置</span>
										</template>
										<MenuItem name="1-1">文章管理</MenuItem>
										<MenuItem name="1-2">评论管理</MenuItem>
										<MenuItem name="1-3">举报管理</MenuItem>
									</Submenu>

									<Submenu name="1" class="tempdiv">
										<template slot="title">
											<div class="menu_sub_caozuo"></div>	
											<span>操作日志</span>
										</template>
										<MenuItem name="1-1">文章管理</MenuItem>
										<MenuItem name="1-2">评论管理</MenuItem>
										<MenuItem name="1-3">举报管理</MenuItem>
									</Submenu>
								</Menu>

							</ul>

						</Poptip>
					</li>
					<li class="header-pad-20 setup-list">
						<img src="../../assets/img/tongzhi.png" />
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		name: 'header',
		data() {
			return {

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
		methods: {
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
							_this.$Message.error(res.data.message);
						}
					})
			},
			mainPush() { //路由跳转到首页
				this.$router.push({
					path: "/main"
				});
			},
		
			
		},
		paddingnone() {

		}
	}
</script>
<style>
	.aboutMe ul{
		padding: 10px 0;
	}
	.tempdiv .ivu-menu-submenu-title{
   	padding: 10px 18px!important;
   	display: flex;
   	align-items: center;
   	height: 37px;
   }
   .tempdiv span{
   	margin-right: 30px;
   	margin-left: 15px;
   }
   .tempdiv .ivu-menu-submenu-title i{
   	top: 0;
   }
   .tempdiv ul{
   	padding-top: 0;
   	padding-bottom: 0;
   }
   .tempdiv ul li{
   display: flex;
   	align-items: center;
   	height: 37px;
    padding-left: 65px!important;
   }
</style>
<style scoped>
	.header {
		height: 72px;
		background: #269edc;
		width: 100%;
		box-shadow: 0 3px 5px rgba(140, 205, 218, 0.78);
	}
	
	button {
		margin-right: 5px;
	}
	
	.ivu-poptip-inner .ivu-poptip-body {
		padding: 10px 0;
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
	
	.logobox {
		display: flex;
		align-items: center;
		font-size: 16px;
		color: #fff;
		padding-left: 20px;
		height: 72px;
		cursor: pointer;
	}
	
	.headerhover {
		height: 26px;
	}
	
	.setup {
		height: 72px;
	}
	
	.setup ul.setup-content {
		display: flex;
		height: 100%;
	}
	
	.setup ul li.setup-list {
		font-size: 16px;
		display: flex;
		align-items: center;
		/*padding: 0 20px;*/
		color: #fff;
	}
	
	.header-pad-20 {
		padding: 0 30px;
		height: 72px;
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	
	.setup ul li.setup-list:hover {
		background: #0083c7;
	}
	/* .setup .pull-menu li{
        color: #576b7e;
    }*/
   
	.aboutMe ul{
		width: 185px!important;
	}
	.aboutMe li {
		/*padding-left: 10px;*/
		font-size: 14px;
		line-height: 32px;
		color: #576b7e;
		cursor: pointer;
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
	.aboutMe li:hover {
		color:#269edc;
	}
	.aboutMe li ul li:hover a{
		color:#269edc;
	}
	.aboutMe ul li .ivu-menu-submenu-title{
		padding-top: 0!important;
		padding-bottom: 0!important;
	}
	.menu_sub_basemessage{
		height: 16px;
		width: 16px;
		margin-right: 10px;		
		background: url(../../assets/img/basemessage.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
	}
	.menu_sub_busmessage{
		height: 16px;
		width: 16px;
		margin-right: 10px;		
		background: url(../../assets/img/busmessage.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
	}
	.menu_sub_set{
		height: 16px;
		width: 16px;
		margin-right: 10px;		
		background: url(../../assets/img/headset.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
	}
	.menu_sub_caozuo{
		height: 16px;
		width: 16px;
		margin-right: 10px;		
		background: url(../../assets/img/caozuo.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
	}
	.aboutMe li:hover  .menu_sub_basemessage{
		background: url(../../assets/img/basemessage_hover.png);
	}
	.aboutMe li:hover  .menu_sub_busmessage{
		background: url(../../assets/img/busmessage_hover.png) no-repeat;
	}
	.aboutMe li:hover  .menu_sub_set{
		background: url(../../assets/img/headset_hover.png) no-repeat;
	}
	.aboutMe li:hover  .menu_sub_caozuo{
		background: url(../../assets/img/caozuo_hover.png) no-repeat;
	}

</style>