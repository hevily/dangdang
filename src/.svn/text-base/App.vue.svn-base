<template>
  <div id="app">
    <!--<img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
	import store from './vuex/store'
    export default {
        name: 'app',
        mounted: function(){
            this.$Message.config({
                top: 230,
                duration: 2,
            });
        }
    }
</script>

<style>
#app {
  font-family: "微软雅黑",'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-width: 1240px;
  min-height: 550px;
 
}
body,html {
    height: 100%;
    overflow-x: hidden;
    font-size: 14px;
}
.ivu-message-notice-content{
	padding: 50px 100px !important;
	background: #0099FF !important;
}
.ivu-message-notice-content span{
	font-size: 20px !important;
	color: #fff !important;
}
.ivu-message .ivu-icon{
	font-size: 20px !important;
}
</style>
