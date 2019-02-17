<template>
	<div class="left-menu">
		<ul class="left-menu-ul">
			<li class="left-menu-first" v-for='(menu,index) in menuList' :class='{ "active" : active == menu.name ,"show-second-menu" : showName == menu.name}' @mouseenter='showName = menu.name' @mouseleave='showName = ""' :key="index">
				<a href="javascript:" class="left-menu-index">
					<Icon size='18' type="person-stalker" style='margin-right: 10px;'></Icon>
					<span class="left-menu-title">{{ menu.name }}</span>
				</a>
				<div class="second-menu" v-if='menu.menus.length > 0'>
					<div class="second-menu-warp">
						<ul class="second-menu-item" v-for='(secondMenu,index) in menu.menus' v-if='secondMenu.menus.length > 0' v-show="isshow" :key="index">
							<span class="second-menu-title">{{ secondMenu.name }}</span>
							<li v-for='(item,idx) in secondMenu.menus' @click.stop='active = menu.name;showName = "";isshow()' :key="idx">
								<router-link :to="item.newurl ? item.newurl : 'index'">{{ item.name }}</router-link>
							</li>
						</ul>
						<ul class="second-menu-item second-menu-item-colum" v-else v-show="isshow"> 
							<li @click.stop='active = menu.name;showName = "";isshow()'>
								<router-link :to="secondMenu.newurl ? secondMenu.newurl : 'index'">{{ secondMenu.name }}</router-link>

							</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
		<div class="logo">

		</div>
	</div>

</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'leftMenu',
		mounted() {
			var _this = this;
			this.axios(api.menus)
				.then(function(res) {
					_this.menuList = res.data.datas;
					// console.log(_this.menuList);
					// _this.openNames = res.data.datas[0].id;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		data() {
			return {
				menuList: '',
				openNames: '',
				active: '',
				showName: '',
				isshow:true
			}
		},
		methods: {
		isshow(){
			let _this = this;
			_this.isshow = !_this.isshow 
			setTimeout(() => {
				   _this.isshow = true
			}, 100);
			
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
		bottom: 10px;
		left: 25px;
		height: 36px;
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
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		background: #fff;
		height: 100%;
	}
	
	.left-menu-first {
		font-size: 14px;
		position: relative;
	}
	
	.left-menu .left-menu-ul .left-menu-first:hover {
		background: #269edc;
	}
	
	.left-menu .left-menu-ul .left-menu-first.active {
		background: #269edc;
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
		color: #333;
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
		color: #13c19f;
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