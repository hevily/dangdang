<template>
	<div class="Web">
		<!--<header>
			<img src="../../assets/img/logo.jpg" />
		</header>-->

		<section>
			<!--<img class="PCImg" src="../../assets/img/login_bg2.jpg" />-->
			<router-view></router-view>
		</section>
	</div>
</template>

<script>
	import api from '@/api/api'
	import login from '@/page/login/login'
	import newregister from '@/page/login/register'
	export default {
		mounted() {
			
		},
		components: {
			login,
			newregister
		},
		data() {
            return{
            	
            }
		},
		methods: {

		}
	}
</script>

<style scoped>
	
	.Web {
		position: relative;
		overflow-x: hidden;
	}
	
	header {
		padding: 13px 0;
	}
	
	header img {
		margin-left: 30px;
		width: 286px;
	}
	
	section {
		position: relative;
		background: url(../../assets/img/login_bg3.jpg) no-repeat;
		background-size: 100% 100%;
		height: 100vh;
	}
	
	section img {
		display: block;
	}
	
	section .bg {
		width: 100vw;
	}
	section .PCImg {
		height: 100%;
	}
	section .login{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100vw;
	}
	#imgscode {
			width: 17.57vw;
			height: 5.263vw;
			position: relative;
		}
		
		.BlackDiv {
			width: 2.5vw;
			height: 2.5vw;
			background-color: black;
			position: absolute;
			top: 1.5vw;
		}
		
		.ImgTuo {
			width: 2.5vw;
			height: 2.5vw;
			position: absolute;
			top: 1.5vw;
		}
		
		.TuoDiv {
			width: 17.57vw;
			height: 1.842vw;
			line-height:1.842vw ;
			border: 1px solid black;
			border-radius: 10px;
			position: relative;
			font-size: 0.631vw;
			text-align: center;
			
		}
		
		.TuoBtn {
			width: 1.842vw;
			height: 1.842vw;
			border: 1px solid black;
			border-radius: 50%;
			background-color: skyblue;
			position: absolute;
			top: 0;
		}
	.newregister{
    	position: absolute;
    	top: 0;
    	right: 50px;
    	line-height: 70px;
    	font-size: 20px;
    	
    }
    .router{
    	color: #CCCCCC!important;
    }
</style>