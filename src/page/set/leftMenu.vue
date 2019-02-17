<template>
	<div class="left-menu">
		<ul class="left-menu-ul">
			<li class="left-menu-first" v-for='(menu, index) in menuList' :class='{ "active" : active == menu.name ,"show-second-menu" : showName == menu.name}' @mouseenter='showName = menu.name' @mouseleave='showName = ""' :key="index">
				<a href="javascript:" class="left-menu-index">
          			<Icon size='18' type="person-stalker" style='margin-right: 10px;'></Icon>
					<span class="left-menu-title">{{ menu.name }}</span>
				</a>
				<div class="second-menu" v-if='menu.menus!==undefined '>
					<div class="second-menu-warp">
						<ul class="second-menu-item" v-for='(secondMenu,index2) in menu.menus' v-if='secondMenu.menus!==undefined ' v-show="isshow" :key="index2">
							<span class="second-menu-title">{{ secondMenu.name }}</span>
							<li v-for='(item,index3) in secondMenu.menus' @click.stop='active = menu.name;showName = "";showLeft()' :key="index3">
								<router-link :to="item.newurl ? item.newurl : 'index'">{{ item.name }}</router-link>
							</li>
						</ul>
						<ul class="second-menu-item second-menu-item-colum" v-else v-show="isshow"> 
							<li @click.stop='active = menu.name;showName = "";showLeft()'>
								<router-link :to="secondMenu.newurl ? secondMenu.newurl : 'index'">{{ secondMenu.name }}</router-link>
							</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
		<div class="logo">
            Power by 智谷科技
		</div>
	</div>

</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'leftMenu',
		mounted() {
			this.axios(api.menus)
            .then((res) => {
                this.menuList = res.data.datas;
            })
            .catch((error) => {
                console.log(error);
            });
		},
		data() {
			return {
				menuList: [],
				openNames: '',
				active: '',
				showName: '',
				isshow:true
			}
		},
		methods: {
            showLeft(){
                this.isshow = !this.isshow 
                setTimeout(() => {this.isshow = true}, 100);
            }
        }
	}
</script>

<style scoped>
	.left-menu {
		height: 100%;
		/* overflow-y: auto; */
		/*background: #fff;*/
		/*padding-bottom: 10px;*/
		width: 150px;
		/*box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);*/
	}
	
	.left-menu .logo {
		position: absolute;
		bottom: 0;
		left: 18px;
		height: 36px;
        color: #fff;
	}
	
	.ivu-menu-light {
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
		width: 197px !important;
		/* padding-right: 16px; */
		box-sizing: content-box;
	}
	
	.left-menu .left-menu-ul {
		padding: 10px 0;
		/*box-shadow: 0px 0px 8px rgba(0, 200, 225, 0.5);*/
		background: #333744;
		height: 100%;
	}
	
	.left-menu-first {
		font-size: 14px;
		position: relative;
	}
	
	.left-menu .left-menu-ul .left-menu-first:hover {
		background: #00c1de;
	}
	
	.left-menu .left-menu-ul .left-menu-first.active {
		background: #00c1de;
	}
	
	.left-menu .left-menu-ul .left-menu-first.active .left-menu-index {
		color: #fff;
	}
	
	.left-menu .left-menu-ul .left-menu-first:hover .left-menu-index {
		color: #fff;
	}
	/*.left-menu .left-menu-ul .left-menu-first.show-second-menu .second-menu {
		display: block;
	}*/
	
	.left-menu .left-menu-ul .left-menu-first:hover .second-menu {
		display: block;
	}
	
	.left-menu .left-menu-index {
		display: block;
		line-height: 40px;
		padding: 0 28px;
		color: #b9c3cb;
	}
	
	.left-menu-first .second-menu {
		position: absolute;
		left: 150px;
		z-index: 1000;
		top: 0;
		background: #fff;
		border-left: 1px solid #ddd;
		box-shadow: 4px 1px 8px #ccc;
		display: none;
	}
	
	.second-menu .second-menu-warp {
		padding: 20px 0;
		display: table;
	}
	
	.second-menu .second-menu-warp .second-menu-item {
		border-right: 1px solid #f0f0f0;
		display: table-cell;
	}
	
	.second-menu .second-menu-warp .second-menu-item.second-menu-item-colum {
		display: block;
	}
	
	.second-menu .second-menu-warp .second-menu-item .second-menu-title {
		color: #96a6b6;
		padding: 0 40px;
		line-height: 30px;
		white-space: nowrap;
	}
	
	.second-menu .second-menu-warp .second-menu-item li a {
		display: block;
		white-space: nowrap;
		padding: 5px 40px;
		font-size: 12px;
	}
	
	.second-menu .second-menu-warp .second-menu-item li a:hover {
		color: #00c1de;
	}
	
	.left-menu-title {
		color: #f2f2f3;
	}
	/*.ivu-menu-vertical .ivu-menu-item:hover,.ivu-menu-vertical .ivu-menu-submenu-title:hover {
		background : #eee;
		color: inherit;
	}
	.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
		width: 180px;
		background : #03b8cc;
		color: #fff;
		border: none;
	}
	.ivu-menu-vertical.ivu-menu-light:after {
		width: 0;
	}
	.senc-menu {
		display: flex;
		padding: 20px 0;
	}
	.senc-menu .menu-group {
		padding: 0 20px;
	}
	.senc-menu .menu-group:nth-child(2) {
		border-left: 1px solid #eee;
	}
	.senc-menu .menu-group header {
		padding: 10px 0;
	}
	.senc-menu .menu-group ul li {
		padding: 5px 0;
	}*/
</style>