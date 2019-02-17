<template>
	<div class="tishi">
		<div class="tia">
			<transition name="slide-fade">
				<div v-show="do_yn" class="do_ok">
					<img src="../../assets/img/tanokimg.png" />
					<span>{{re_do}}</span>
				</div>
			</transition>
			<transition name="slide-fade">
				<div v-show="do_no" class="do_no">
					<img src="../../assets/img/tannoimg.png" />
					<span>{{re_do}}</span>
				</div>
			</transition>

		</div>
	</div>

</template>

<script>
	import api from '@/api/api'

	export default {
		props: ['re_do', 'do_yn', 'do_no'],
		data() {
			return {

			}

		},
		methods: {

		}
	}
</script>

<style scoped>
	/*过度动画*/
	
	.slide-fade-enter-active {
		/*.3s是时间,可以调节*/
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		/*.8s是时间,可以调节*/
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */
	
	{
		transform: translateX(180px);
		opacity: 0;
	}
	/*主要布局
	 定位等可以调节
	 * */
	.tia {
		width: 100%;
		height: 100%;
		display: block;
		margin: 0 auto;
	}
	
	.do_ok {
		min-width: 260px;
		height: 78px;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50px;
		/*left: 0;*/
		right: 90px;
		/*margin:-36px 0 0 -180px ;*/
		padding: 20px;
		/*box-shadow: 0px 0px 30px #00c1de;*/
		border: 1px solid #00c1de;
		z-index: 99999;
	}
	
	.do_ok img {
		width: 40px;
		height: 40px;
		margin-right: 30px;
	}
	
	.do_ok span {
		font-size: 18px;
		color: #415161;
	}
	
	.do_no {
		min-width: 260px;
		height: 78px;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50px;
		/*left: 0;*/
		right: 90px;
		/*margin:-36px 0 0 -180px;*/
		padding: 20px;
		/*box-shadow: 0px 0px 30px #00c1de;*/
		border: 1px solid #00c1de;
		z-index: 99999;
	}
	
	.do_no img {
		width: 40px;
		height: 40px;
		margin-right: 30px;
	}
	
	.do_no span {
		font-size: 18px;
		color: #415161;
	}
</style>