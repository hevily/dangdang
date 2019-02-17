<template>
	<div class="localimport" @click="maopao">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item class="link_span">设置</Breadcrumb-item>
			<Breadcrumb-item class="link_span ok_link">添加企业</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Form class="compInfoForm">
				<Row class="formItem">
                    <Col span="3">企业名称：</Col>
					<span>企业名称：</span>
					<Input placeholder="请输入企业名称" v-model="companyData.name" style="width:440px"></Input>
				</Row>
				<div class="formItem">
					<span>注册手机号：</span>
					<Input placeholder="请输入注册手机号" v-model="companyData.telephone" style="width:440px"></Input>
				</div>
				<div class="formItem">
					<span>注册人姓名：</span>
					<Input placeholder="请输入注册人姓名" v-model="companyData.contact" style="width:440px"></Input>
				</div>
			</Form>
		</div>
		<div class="btn-bot">
			<button class="btn-save">保存</button>
			<button class="btn-return">返回</button>
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
		data() {
			return {
                companyData: {
                    name: '',
                    telephone: '',
                    contact: '',
                }
			}
		},
		methods: {

		},
	}
</script>
<style type="text/css">

</style>
<style scoped>

</style>