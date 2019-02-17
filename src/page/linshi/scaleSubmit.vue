<template>
	<div>

		<Form class="joinplanInfo">
			<Breadcrumb>
					<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
				<Breadcrumb-item>订单管理</Breadcrumb-item>
				<Breadcrumb-item>销售订单审核</Breadcrumb-item>
			</Breadcrumb>

			<div class="test-1 right_home_warp">

				<Tabs size="small" :animated="false" style="margin-top:20px;">
					<Tab-pane label="销售清单">

						<Row class="purchaseInfo">
							<Col span="24">
							<div class="joinplanInfoTit">订单信息</div>
							</Col>
							<Col span="8">
							<span class="label">订单号：</span>{{purchaseInfo.code}}
							</Col>
							<Col span="8">
							<span class="label">采购单位：</span>超链接这个客户
							</Col>
							<Col span="8">
							<span class="label">采购员：</span>{{purchaseInfo.applyUserName}}
							</Col>

						</Row>
						<Row class="purchaseInfo">
							<Col span="8">
							<span class="label">电话：</span>
							</Col>
							<Col span="8">
							<span class="label">交货日期：</span>
							</Col>
							<Col span="8">
							<span class="label">离交货期还有多长时间：倒计时</span>
							</Col>
						</Row>

						<Row class="purchaseInfo">
							<Col span="24">
							<div class="joinplanInfoTit">收货信息</div>
							</Col>
							<Col span="8">
							<span class="label">收货人：</span>
							</Col>
							<Col span="8">
							<span class="label">收货地址：</span>
							</Col>
							<Col span="8">
							<span class="label">联系方式：</span>
							</Col>
						</Row>

						<Row class="purchaseInfo">
							<Col span="8">
							<span class="label">申请人：</span>{{purchaseInfo.applyUserName}}
							</Col>
							<Col span="8">
							<span class="label">交货日期：</span>{{purchaseInfo.devliveryDate}}
							</Col>
							<Col span="8">
							<span class="label">采购要求：</span>
							</Col>
						</Row>
						<Row class="purchaseInfo">
							<Col span="8">
							<span class="label">订单编号：</span>{{purchaseInfo.code}}
							</Col>
							<Col span="8">
							<span class="label">申请日期：</span>{{purchaseInfo.applyTime}}
							</Col>
							<Col span="8">
							<span class="label">客户名称</span>{{purchaseInfo.corpName}}
							</Col>
						</Row>
						<Row class="purchaseInfo">
							<Col span="8">
							<span class="label">公司联系人：</span>王大峰
							</Col>
							<Col span="8">
							<span class="label">手机号：</span>13621380337
							</Col>
							<Col span="8">
							<span class="label">固定电话：</span>010-87654321
							</Col>
						</Row>
						<div class="joinplanInfoTit" style="margin-bottom:10px;">产品信息</div>
						<div class="buyList">
							<table cellspacing="0" cellpadding="0">
								<tr>
									<th width="30%" style="text-align:left;padding-left:40px;">产品信息</th>
									<th width="5%">单位</th>
									<th width="5%">单价</th>
									<th width="10%">数量</th>
									<th width="10%">金额小计</th>
									<th width="18%">备注</th>

								</tr>
								<tr v-for="(item,index) in purchaseInfo.products">
									<td style="text-align:left;padding:20px 20px">
										<img :src=purchaseInfo.products[index].imageUrl class="proimg">
										<p class="proword">{{purchaseInfo.products[index].productName}}</p>
									</td>
									<td>台</td>
									<td>{{purchaseInfo.products[index].price}}</td>
									<td>{{purchaseInfo.products[index].amount}}</td>
									<td>{{purchaseInfo.products[index].subtotalMoney}}</td>
									<td>{{purchaseInfo.products[index].description}}</td>

								</tr>
							</table>
						</div>
						<Form-item label="接单意见：">
							<Input type="textarea" v-model="content" :rows="2" placeholder="500字以内" style="width:50%"></Input>
						</Form-item>
						<div class="handleBtn">
							<button class="btn-save" @click="submittoAudit">接单</button>
							<button class="btn-del">驳回接单</button>
						</div>
					</Tab-pane>
				</Tabs>

			</div>
		</Form>
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

		name: 'purchaseForm',
		created() {
			const _this = this;
			//采购清单查询
			var url = '/api/order/sale/plan/' + this.$route.query.id + '/queryById.do';
			this.axios(url)
				.then(function(res) {
					_this.purchaseInfo = res.data.datas;
					//console.log(res.data.datas);
				})
				.catch(function(err) {
					console.log(err);
				})
			//审核历史查询
			var urlhis = '/api/order/sale/plan/' + this.$route.query.id + '/queryAuditRecords.do';
			this.axios(urlhis)
				.then(function(res) {
					_this.listHis = res.data.datas;
					console.log(res.data.datas);
				})
				.catch(function(err) {
					console.log(err);
				})
		},
		data() {
			return {
				count: '1',
				re_do: '',
				do_yn: false,
				do_no: false,

				purchaseInfo: {

				},
				content: '', //审核理由
				columnsHis: [{
						title: "编号",
						align: "center",
						width: 60,
						type: "index"
					},

					{
						title: "审核人",
						align: "center",
						key: "auditUserName"
					},
					{
						title: "审核结果",
						align: "center",
						key: "statusDesc"
					},
					{
						title: "审核意见",
						align: "center",
						key: "content"
					},
					{
						title: "审核时间",
						align: "center",
						key: "auditTime"
					}
				],
				listHis: [{
					aduitTime: "2017-5-20",
					aduitUserName: "张三",
					statusDesc: "审核通过",
					content: "我同意你的申请"
				}]
			}
		},
		methods: {

			changeNum(index) {
				this.purchaseInfo.products[index].subtotalMoney = this.purchaseInfo.products[index].amount * this.purchaseInfo.products[index].price;
			},
			changeDate(value) {
				this.purchaseInfo.deliveryDate = value;
				console.log(value);

			},
			//提交审批
			submittoAudit() {
				const _this = this;
				var submitInfo = {};
				submitInfo.orderId = this.purchaseInfo.id;
				submitInfo.content = this.content;
				//console.log(submitInfo);
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.scaleSubmit,
						data: api.jsonData(submitInfo),

					})
					.then(function(res) {
						console.log(res.data.datas);
						if(res.data.status == 1) {
							// _this.data.push(res.data.datas);
							_this.do_yn = true;
							_this.re_do = "修改成功";
							setTimeout(() => {
								_this.do_yn = false;
							}, 2000);

							//  _this.$Message.success('修改成功');
							_this.$router.push({
								path: "/scaleQueryList",
								query: {}
							});
						} else {
							//_this.$Message.success('请重新提交');
							_this.do_no = true;
							_this.re_do = '请重新提交';
							setTimeout(() => {
								_this.do_no = false;
							}, 2000);

						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}

	}
</script>
<style>
	.joinplanInfoTit {
		margin: 10px 0 0 0;
		height: 32px;
		/*line-height:32px;*/
		font-size: 16px;
		color: #39f;
	}
	
	.joinplanInfo .purchaseInfo {
		padding: 0 20px;
	}
	
	.todate.ivu-form-item {
		margin-bottom: 10px;
	}
	
	.todate .ivu-form-item-label {
		float: left;
	}
	
	.todate .ivu-form-item-content {
		float: left;
		width: 200px;
	}
	
	.joinplanInfo.ivu-form .ivu-form-item-label {
		font-weight: bold;
	}
</style>