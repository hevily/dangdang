<template>
	<div class="showCustomer">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>
				客户列表
			</Breadcrumb-item>
			<Breadcrumb-item>申请明细</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp">
			<Form :model="audit" label-position="right" :label-width="110">
				<Row>
					<Col span='12'>
                        <Form-item label="客户名称:">
                            <span v-if='customer.customerCorpName'>{{customer.customerCorpName}}</span><span v-else>--</span>
                        </Form-item>
					</Col>
					<Col span='12'>
					<Form-item label="申请状态:">
						<span style="font-size:18px;" v-if='customer.applyStatusDispName'>{{customer.applyStatusDispName}}</span><span v-else>--</span>
					</Form-item>
					</Col>
					<Col span='12'>
					<Form-item label="联系人:">
						<span v-if='customer.contact'>{{customer.contact}}</span><span v-else>--</span>
					</Form-item>
					</Col>
					<Col span='12'>
					<Form-item label="联系电话:">
						<span v-if='customer.telephone'>{{customer.telephone}}</span><span v-else>--</span>
					</Form-item>
					</Col>
					<Col span='24'>
					<Form-item class="diziadd" label="联系地址:">
						<span v-if='customer.address'>{{customer.address}}</span><span v-else>--</span>
					</Form-item>
					</Col>
				</Row>
				<Row>
					<Col span='12'>
					<Form-item label="申请人:">
						<span v-if='customer.applyUserName'>{{customer.applyUserName}}</span><span v-else>--</span>
					</Form-item>
					</Col>
					<Col span='12'>
					<Form-item label="申请日期:">
						<span v-if='customer.applyTime'>{{customer.applyTime}}</span><span v-else>--</span>
					</Form-item>
					</Col>
					<Col span='24'>
					<Form-item class="sqly" label="申请理由:">
						<span v-if='customer.applyReason'>{{customer.applyReason}}</span><span v-else>--</span>
					</Form-item>
					</Col>
				</Row>
				<Row>
					<Col span='24'>
					<Form-item class="fj" label="附件:">
						<div class="sc_box">
							<img src="../../../../assets/img/fj_le.png" @click='showImg' />
							<label></label>

						</div>
						<!--<img v-if='customer.isImg == 1' :src="customer.attachmentUrl" style="width:200px;height : auto;" @click='showImg'>
						<a v-else style="color:#09f;" :href="customer.attachmentUrl" title='点击下载'>{{customer.attachmentName}}</a>-->
					</Form-item>
					</Col>
					<Col span='12'>
					<Form-item label="审批人:">
						<span v-if='customer.auditUserName'>{{customer.auditUserName}}</span><span v-else>--</span>
					</Form-item>
					</Col>
					<Col span='12'>
					<Form-item label="审批日期:">
						<span v-if='customer.auditTime'>{{customer.auditTime}}</span><span v-else>--</span>
					</Form-item>
					</Col>
					<Col span='24'>
					<Form-item class="sply" label="审核理由:">
						<textarea v-model='shnr'></textarea>
					</Form-item>
					</Col>
				</Row>
			</Form>
		</div>
        <div class="btn-box">
            <button class="btn-save" @click.stop='spok'>审批通过</button>
            <button class="btn-del" @click.native='spno'>驳回请求</button>
        </div>
        <Modal title="查看图片" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%">
        </Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'showCustomer',
		mounted() {
			const _this = this;
			this.DOM = {
				content: document.getElementById('content'),
			};
			if(!this.$route.params.id) {
				this.$router.go(-1);
			}

			const id = this.$route.params.id;
			this.axios(api.cooperation + id + api.queryById)
				.then(function(res) {
					const data = res.data.datas;
					_this.customer = data;
				})
				.catch(function(err) {
					console.log(err);
				})
		},
		data() {
			return {
				shnr:'',
				customer: {},
				imgUrl: '',
				visible: false,
				audit: {},
			}
		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			spno(){
				const _this = this;
				_this.axios({
						method: 'post',
						header: {"Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'},
						url: '/api/cooperation/main/audit.do',
						data: api.convertParam({
							id: _this.customer.id,
							auditStatus: 9,
							auditContent : _this.shnr
						})
					})
					.then(function(res) {			
						_this.$router.push('/cooperation/customer/audit');
					})
					.catch(function(err) {
						
					})
			},
			spok(){
				const _this = this;
				_this.axios({
						method: 'post',
						header: {"Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'},
						url: '/api/cooperation/main/audit.do',
						data: api.convertParam({
							id: _this.customer.id,
							auditStatus: 9,
							auditContent : _this.shnr
						})
					})
					.then(function(res) {
						// _this.$router.push('/cooperation/customer/audit');
					})
			},
			showImg() {
				this.imgUrl = this.customer.attachmentUrl;
				this.visible = true;
			}
		}
	}
</script>
<style type="text/css">
	/* .showCustomer .ivu-form-item .ivu-form-item-content {
		width: 440px;
		background-color: #eff1f8;
		box-sizing: content-box;
		border: 1px solid #cdd9e6;
	} */
	
	.showCustomer .ivu-form-item-content {
		border-radius: 5px;
	}
	
	.showCustomer .ivu-form-item-label {
		font-size: 12px!important;
	}
	
	.diziadd .ivu-form-item-content {
		width: 1019px!important;
	}
	.showCustomer .fj{
		height: auto!important;
	}
	.showCustomer .fj .ivu-form-item-content {
		width: 1019px!important;
		
	}
	
	.sqly {
		height: 113px!important;
	}
	
	.sqly .ivu-form-item-content {
		width: 1019px!important;
		height: 113px;
	}
	
	.sply {
		height: 113px!important;
	}
	
	.sply .ivu-form-item-content {
		width: 1019px!important;
		height: 113px!important;
	}
	
	.sply textarea {
		width: 1019px!important;
		height: 113px;
		padding: 0 15px;
		font-size: 12px;
	}
</style>
<style scoped>
	/* .showCustomer {
		position: absolute;
		top: 5px;
		left: 10px;
		right: 20px;
		bottom: 0;
	} */
	
	.ivu-form-item {
		margin: 0;
		margin-top: 10px;
	}
	
	.ivu-form .ivu-form-item-label {
		font-size: 16px;
		color: #666;
	}
	
	.ivu-form-item-content {
		font-size: 18px;
		color: #333;
	}
	
	.ivu-form::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	
	.ivu-form::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		/* -webkit-box-shadow: inset 0 0 5px #b0c0d0;*/
		background: #b0c0d0;
	}
	
	.ivu-form::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		/*-webkit-box-shadow: inset 0 0 5px #b0c0d0;*/
		border-radius: 10px;
		background: #fff;
	}
	/*ie*/
	
	.ivu-form::-ms-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	
	.ivu-form::-ms-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}
	
	.ivu-form::-ms-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: #EDEDED;
	}
	/*火狐*/
	
	.ivu-form::-moz-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	
	.ivu-form::-moz-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}
	
	.ivu-form::-moz-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: #EDEDED;
	}
	
	.ivu-form {
		position: absolute;
		top: 0;
		bottom: 74px;
		left: 0;
		right: 0;
		overflow: hidden;
		overflow-y: scroll;
		padding-bottom: 115px;
	}
	
	.ivu-form-item {
		margin-top: 30px;
		height: 33px;
	}
	
	.ivu-form-label-left {
		font-size: 12px!important;
	}
	
	.ivu-form-item-content span {
		margin-left: 15px;
	}
	
	.sc_box {
		display: flex;
		padding: 10px;
		background: #f8f9fd;
		border-radius: 5px;
	}

</style>