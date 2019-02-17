<template>
	<div class="index">
		<appHeader></appHeader>
		<div class="warpper">
            <div class="leftMenu">
                <leftMenu></leftMenu>
            </div>
            <div class="content1" id="content">
                <div>
					<router-view></router-view>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	import appHeader from '@/page/set/header'
	import leftMenu from '@/page/set/leftMenu'
 
	export default{
		components:{
			appHeader,
			leftMenu
		}
	}
</script>

<style>
  .index { 	
    height: 100%;
    background: #f0f3fa;
  }
  .warpper {
    display: flex;
    height: calc(100% - 72px);
    width:calc(100vw + 20px);
  }
  .leftMenu {
    height: 100%;
    position: relative;
    padding: 10px 0 10px 10px;
    
  }
  .content1 {
    flex-grow: 1;
    /*padding: 10px 30px 0 10px;*/
    overflow:hidden;
    position: relative;
  }
  .home-warp {
  	padding: 0;
  	background-color: rgba(0,0,0,0);
    margin-top: 0;
    overflow: hidden;
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    right: 60px;
     /*box-sh
      * adow: 0px 0px 5px rgba(140, 205, 218, 0.78);*/
  }
</style>