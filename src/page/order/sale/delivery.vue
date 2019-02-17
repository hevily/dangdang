<template>
	<div class="invoice">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>发货单</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Form>
				<table cellspacing="0" cellpadding="0" class="invoiceForm">
					<tr>
						<td align="right"><b>发货单状态：</b></td>
						<td colspan="5">
							<Radio-group v-model="postInfo.deliveryStatus" type="button">
								<Radio label="全部"></Radio>
								<Radio label="未发货"></Radio>
								<Radio label="已发货"></Radio>
								<Radio label="已收货"></Radio>
							</Radio-group>
							</Form-item>
						</td>
					</tr>
					<tr>
						<td align="right"><b>发货单编码：</b></td>
						<td>
							<Input placeholder="请输入..." style="width:200px;"></Input>
						</td>
						<td align="right"><b>订单编号：</b></td>
						<td>
							<Input v-model="postInfo.code" placeholder="请输入..." style="width:200px;"></Input>
						</td>
						<td align="right"><b>客户名称：</b></td>
						<td>
							<Input v-model="postInfo.customerCorpName" placeholder="请输入..." style="width:200px;"></Input>
						</td>
					</tr>
					<tr>
						<td align="right"><b>发货日期：</b></td>
						<td colspan="3">
							<Date-picker type="date" placeholder="选择日期" style="width:200px;"></Date-picker>
							<span class="label">至</span>
							<Date-picker type="date" placeholder="选择日期" style="width:200px;"></Date-picker>
							<Button type="primary" class="searchBtn" @click="search">搜索</Button>

						</td>
					</tr>
				</table>
			</Form>
			<div class="invoiceList">
				<Table :columns="columns" :data="invoiceList"></Table>
			</div>

		
			
		</div>
			<div class="btn-bot">
				<div class="pageBar">
				<Page :total="pageInfo.count" :current="pageInfo.pageStart" :page-size="pageInfo.pageNums" show-elevator></Page>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				pageInfo: {
					count: 5,
					pageStart: 1,
					pageNums: 1
				},
				columns: [{
						title: "订单编号",
						key: "code"
					},

					{
						title: "客户",
						key: "customerCorpName"
					},

					{
						title: "交货日期",
						key: "deliveryDate"
					},
					{
						title: "发货状态",
						key: "deliveryStatusLabel"
					},
					{
						title: '操作',
						key: 'action',

						render: (h, params) => {
							if(params.row.deliveryStatus == 0 || row.deliveryStatus == 1) {
								return h('div', [
									h('Button', {
										props: {
											type: 'text',
											size: 'small'
										},
										on: {
											click: () => {
												this.editInvoice(params.index)
											}
										}
									}, '填写发货单'),
								]);
							} else {
								return h('div', [
									h('Button', {
										props: {
											type: 'text',
											size: 'small'
										},
										on: {
											click: () => {
												this.viewInvoice(params.index)
											}
										}
									}, '详情'),
								]);
							}
						}
					}
				],
				invoiceList: [

				],
				postInfo: {
					deliveryStatus: '全部'

				}
			}
		},
		created() {
			const _this = this;

			this.postInfo.pageStart = this.pageInfo.pageStart;
			this.postInfo.pageNums = this.pageInfo.pageNums;
			this.postInfo.customerCorpName = this.pageInfo.customerCorpName;
			this.postInfo.code = this.pageInfo.code;
			this.postInfo.deliveryStatus = this.pageInfo.deliveryStatus;
			_this.axios({
					method: 'post',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: api.queryWaitDeliveryOrders,
					data: api.jsonData(_this.postInfo),

				})
				.then(function(res) {
					if(res.data.status == 1) {
						_this.invoiceList = res.data.datas.rows;
						_this.pageInfo.count = res.data.total;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {

			//填写发货单
			editInvoice(index) {
				var id = this.invoiceList[index].id
				this.$router.push({
					path: "/modifyInvoice",
					query: {
						id: id
					}
				});
			},
			//查看发货单详情
			viewInvoice(index) {
				var id = this.invoiceList[index].id
				this.$router.push({
					path: "/invoiceInfo",
					query: {
						id: id
					}
				});
			},
			//筛选列表
			search() {
				const _this = this;
				this.postInfo.pageStart = this.pageInfo.pageStart;
				this.postInfo.pageNums = this.pageInfo.pageNums;
				//console.log(this.postInfo);
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.queryWaitDeliveryOrders,
						data: api.jsonData(_this.postInfo),

					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.invoiceList = res.data.datas.rows;
							_this.pageInfo.count = res.data.total;
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>

<style scoped>
	.invoice {
		/*position: absolute;
		top: 5px;
		left: 10px;
		right: 20px;
		bottom: 0;*/
		font-size: 14px;
	}
	
	.addInvoliceBtn {
		float: left;
		margin-left: 20px;
	}
	
	.invoiceForm td {
		padding: 10px 5px;
		font-size: 14px;
	}
	
	.invoiceForm .ivu-form-item-content {
		float: left;
	}
	
	.invoiceList {
		margin-top: 20px;
	}
	
	.invoiceForm .ivu-date-picker {
		float: left;
	}
	
	.invoice .searchBtn {
		float: left;
		width: 88px;
		height: 34px;
		font-size: 14px;
			}
	
	.invoice .addInvoliceBtn {
		float: left;
	}
	
	.invoiceForm .label {
		float: left;
		margin: 0 10px;
		line-height: 32px;
	}
	
	.searchBtn {
		float: left;
		margin-left: 20px;
	}

	.magbut{
		margin: 25px;
	}
</style>