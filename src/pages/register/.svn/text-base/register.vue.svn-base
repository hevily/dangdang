<template>
	<div class="register">
		<div class="logBoxHead">
            <div class="loginBox">
                <h1 class="logBoxlLogo"><a href="javascript:" class="logo" @click.prevent="indexPush">智谷科技</a></h1>
                <div class="logoNav">企业云平台</div>
            </div>
        </div>
        <!-- <router-link to="#">1</router-link>
        		<router-link to="#">2</router-link> -->
		
		
        <div class="baseInfoPanel">
        	<keep-alive>
    			<router-view></router-view>
    		</keep-alive>
        </div>
		
	</div>
</template>

<script>
	export default{
		methods:{
			indexPush(){  //路由跳转到首页
                this.$router.push({path:"/"});
            }
		}
	}
</script>

<style>
	.register{
		height:100%;
	}
	.logBoxHead {
        border-bottom: 1px solid #ddd;
    }
    .loginBox {
        width: 980px;
        height: 72px;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }
    .logBoxHead .logBoxlLogo {
        font-size: 25px;
    }
    .logBoxHead .logo {
        color: #0099ff;
    }
    .logBoxHead .logoNav {
        margin: 20px 30px;
        padding: 0 20px;
        border-left: 1px solid #ddd;
        font-size: 16px;
        line-height: 25px;
    }
    .baseInfoPanel{
    	border:1px solid #e6e6e6;
    	margin:20px auto 0;
    	width:60%;
    }

    .stepHead{
    	width:100%;
    	background-color:#f9f9f9;
    	padding:15px 30px 26px;
    	text-align: left;
    }
    .stepHead h3{
    	font-size:20px;
    }
    .stepBox{
		/*position: relative;*/
		width:50%;
		margin:0 auto;
	}
	.stepBox:after{
		content:"";
		display: block;
		clear:both;
	}
	.stepBox li{
		width:95%;
		float:left;
	}
	.stepBox li .line{
		width:80%;
		display: inline-block;
		height:3px;
		background-color: #c2c3c4;
		margin-bottom: -26px;
	}
	.stepBox li:last-child{
		width:5%;
		margin-top:18px;
	}
	
	.stepBox li .numBox{
		width:105px;
		margin-left:-54px;
	}
	.stepBox li .numBox .num{
		width:40px;
		height:40px;
		line-height: 40px;
		display: block;
		margin:0 auto;
		border-radius: 20px;
		-moz-border-radius: 20px;
		-webkit-border-radius: 20px;
		background-color: #c3c3c3;
		font-style: normal;
		font-size: 18px;
		color:#fff;
	}
	.stepBox li.current .numBox .num{
		background-color:#0099ff;
	}
	.stepBox li .numBox h4{
		font-weight: 400;
		font-style:normal;
		padding-top:5px;
		font-size:14px;
		color:#9e9f9f;
	}
    
</style>