<template>
	<div>
		<div class="error">
			<div  class="error_img">
				<img src="../assets/img/error_1.png"/>
			</div>
			<div class="error_span">
				<p class="span">
					您无权操作本功能!
				</p>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.error{
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		position: absolute;
		top: 0;
		left: 0;
		bottom: 10px;
		right: 10px;
		background: #fff;
	}
	.error_img{
		margin:100px auto 10px;
		width: 250px;
		
	}
	.error_img img{
		width: 250px;
		height: 250px;
	}
	.error_span{
		width: 350px;
	margin:20px auto 0;		
	}
	.span{
		font-size: 38px;
	}
</style>