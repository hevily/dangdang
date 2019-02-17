<template>
	<div class="invoice">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>收款确认列表</Breadcrumb-item>
		</Breadcrumb>
		<div class="invoice_box">
			<Form v-model="formItem">
				<table cellspacing="0" cellpadding="0" class="invoiceForm">
					<tr>
						<td align="right"><b>付款状态：</b></td>
						<td colspan="5">
							<Radio-group type="button" v-model="formItem.payStatus">
								<Radio label="全部"></Radio>
								<Radio label="付款成功"></Radio>
								<Radio label="付款待审核"></Radio>
								<Radio label="已关闭"></Radio>
							</Radio-group>
							</Form-item>
						</td>
					</tr>
					<tr>
						<td align="right"><b>支付单号：</b></td>
						<td>
							<Input placeholder="请输入..." v-model="formItem.payBillNumber" style="width:200px;"></Input>
						</td>
						<td align="right"><b>客户名称：</b></td>
						<td>
							<Input placeholder="请输入..." v-model="formItem.customerCorpName" style="width:200px;"></Input>
						</td>
					</tr>
					<tr>
						<td align="right"><b>支付时间：</b></td>
						<td colspan="3">
							<Date-picker type="date" v-model="formItem.payTimeFrom" placeholder="选择日期" style="width:200px;"></Date-picker>
							<span class="label">至</span>
							<Date-picker type="date" v-model="formItem.payTimeTo " placeholder="选择日期" style="width:200px;"></Date-picker>
							<Button type="primary" class="searchBtn" @click="searchFun">搜索</Button>
							<Button type="warning" class="addInvoliceBtn" @click="addInvoice">+新增收款单</Button>
						</td>
					</tr>
				</table>
			</Form>
			<div class="invoiceList">
				<Table :columns="columns" :data="confirmList"></Table>
			</div>

			<div class="pageBar">
				<Page :total="pageInfo.count" :current="pageInfo.pageStart" :page-size="pageInfo.pageNums" show-elevator></Page>
				<!--<Page :total="pageInfo.count" :pageSize='pageInfo.pageStart' :page-size="pageInfo.pageNums" show-elevator show-total @on-change='toPage'></Page>-->
			</div>

		</div>

	</div>
</template>
<script scoped>
	import api from '@/api/api'
	export default {
		data() {
			return {
				pageInfo: {
					count: 30,
					pageStart: 1,
					pageNums: 1
				},
				formItem: {
					payStatus: '',
					payBillNumber: '',
					customerCorpName: '',
					supplierCorpName: '',
					payTimeFrom: '',
					payTimeTo: ''
				},
				columns: [{
						title: "支付单号",
						align: "center",
						key: "payBillNumber"
					},
					{
						title: "客户名称",
						align: "center",
						key: "customerCorpName"
					},
					{
						title: "订单编号",
						align: "center",
						key: "orderCode"
					},
					{
						title: "订单总金额",
						align: "center",
						key: "totalMoney"
					},
					{
						title: "已支付金额",
						align: "center",
						key: "payMoney"
					},
					{
						title: "本次支付金额",
						align: "center",
						key: "payMoney"
					},
					{
						title: "支付方式",
						align: "center",
						key: "payMode"
					},
					{
						title: "支付时间",
						align: "center",
						key: "payTime"
					},
					{
						title: '操作',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'text',
										size: 'small'
									},
									on: {
										click: () => {
											this.toConfirm(params.index)
										}
									}
								}, '确认'),

							]);
						}
					}
				],
				confirmList: [{
					payTime: '111'
				}]
			}
		},
		created() {
			const _this = this;
			//支付确认列表
			_this.axios({
					method: 'post',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: api.queryConfirmListByRequest,
					data: api.convertParam(this.formItem),

				})
				.then(function(res) {
					_this.confirmList = res.data.datas.rows;
					_this.pageInfo.count = res.data.datas.total
					console.log(res.data.datas);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			//新增收款单
			addInvoice() {
				this.$router.push({
					path: "/addPay",
					query: {}
				});
			},
			//确认收款
			toConfirm(index) {
				var id = this.confirmList[index].id
				this.$router.push({
					path: "/payConfirm",
					query: {
						id: id
					}
				});
			},
			searchFun() {
				const _this = this;
				//支付确认列表
				this.formItem.pageStart = this.pageInfo.pageStart;
				this.formItem.pageNums = this.pageInfo.pageNums;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.queryConfirmListByRequest,
						data: api.convertParam(this.formItem),

					})
					.then(function(res) {
						_this.confirmList = res.data.datas.rows;
						_this.pageInfo.count = res.data.datas.total
						console.log(_this.formItem);
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		}
	}
</script>
<style>
	.invoice_box{
		background: #fff;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		padding:0 10px 0;
		position: absolute;
		top: 50px;
	  	left: 10px;
	  	right: 10px;
	  	bottom: 10px;
	}
	.addInvoliceBtn {
		float: left;
		margin-left: 20px;
	}
	
	.invoiceForm td {
		padding: 10px 5px;
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
	
	.invoiceForm .label {
		float: left;
		margin: 0 10px;
		line-height: 32px;
	}
	
	.searchBtn {
		float: left;
		margin-left: 20px;
	}
</style>