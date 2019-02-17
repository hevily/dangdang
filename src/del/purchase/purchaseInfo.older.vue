<template>
	<Form class="joinplanInfo">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>供应商产品</Breadcrumb-item>
			<Breadcrumb-item>加入采购计划</Breadcrumb-item>
		</Breadcrumb>

		<div class="right_home_warp test-1">
            <div class="information">
                <div class="basicInfo">
                    <h3>基本信息</h3>
                    <Row>
                        <Col span="6" offset="2">供应商名称：<span>{{purchaseInfo.supplierName}}</span></Col>
                        <Col span="6" offset="2">采购计划编号：<span>{{purchaseInfo.purchaseOrderCode}}</span></Col>
                        <Col span="6" offset="2">采购员：<span>{{purchaseInfo.orderUserName}}</span></Col>
                        <Col span="6" offset="2">采购日期：<span>{{purchaseInfo.orderTime}}</span></Col>
                        <Col span="6" offset="2">交货日期：<span>{{purchaseInfo.deliveryDate}}</span></Col>
                    </Row>
                </div>
                <div class="deliveredInfo">
                    <h3>收货信息</h3>
                    <Row>
                        <Col span="6" offset="2">收货人：<span>{{purchaseInfo.consigneeName}}</span></Col>
                        <Col span="6" offset="2">联系电话：<span>{{purchaseInfo.consigneeTel}}</span></Col>
                        <Col span="6" offset="2">收货地址：<span>{{purchaseInfo.consigneeProvinceName + purchaseInfo.consigneeCityName + purchaseInfo.consigneeCountyName + purchaseInfo.consigneeAddress}}</span></Col>
                    </Row>
                </div>
                <div class="invoiceInfo">
                    <h3>发票信息</h3>
                    <Row>
                        <Col span="6" offset="2">发票类型：<span>普通发票</span></Col>
                        <Col span="6" offset="2">发票抬头：<span>大沙发</span></Col>
                        <Col span="6" offset="2">发票内容：<span>产品明细</span></Col>
                        <Col span="6" offset="2">纳税人识别号：<span></span></Input></Col>
                        <Col span="6" offset="2">开户行：<span></span></Col>
                        <Col span="6" offset="2">账号：<span></span></Col>
                    </Row>
                </div>
            </div>
			<!-- <Row class="purchaseInfo">
				<Col span="24">
				<span class="label">供应商：</span>{{purchaseInfo.supplierCorpName}}--历史交易记录
				</Col>
			</Row>
			<Row class="purchaseInfo">
				<Col span="8">
				<span class="label">计划编号：</span>{{purchaseInfo.code}}
				</Col>
				<Col span="8">
				<span class="label">采购员：</span>{{purchaseInfo.applyUserName}}
				</Col>
				<Col span="8">
				<span class="label">申请日期：</span>{{purchaseInfo.applyTime}}
				</Col>
			</Row> -->
			<div class="buyList">
				<!-- <Table :columns="columnsPro" :data="proList"></Table> -->
                <table cellspacing="0" cellpadding="0" border="1">
					<tr>
						<th>产品信息</th>
						<th>产品属性</th>
						<th>单价(元)</th>
						<th>数量</th>
						<th>金额(元)</th>
						<th>加工备注</th>
					</tr>
					<tr v-for="(item,index) in proList">
						<td>
							<router-link :to="{path:'/supplierGoods/info',query:{id:item.productId}}">
								<img :src=item.imageUrl class="proimg">
								<span class="proword">{{item.productName}}</span>
							</router-link>
						</td>
                        <td>{{item.atrributeValue}}</td>
						<td>{{item.price}}</td>
						<td class="proNum">
								{{item.amount}}{{item.unitName}}
						</td>
						<td>{{item.price * item.amount}}</td>
						<td>
							{{item.requiredDesc}}
						</td>
					</tr>
				</table>
			</div>
			<div class="moneyInfo">
				<div><b>货品金额：</b>{{purchaseInfo.totalMoney}}元</div>
				<div><b>运费：</b>0元</div>
				<div><b>合计金额：</b>{{purchaseInfo.totalMoney}}元</div>
			</div>
			<!-- <Form-item label="交货日期：" class="todate">
				{{purchaseInfo.deliveryDate}}
			</Form-item>
			<div class="infoItem">
				<span class="label">交货地址：</span>
				<div class="itemWord">北京市 海淀区 中关村 <span style="color:#39f">更换</span></div>
			</div>
			<div class="infoItem">
				<span class="label">收货人：</span>
			</div>
			<div class="infoItem">
				<span class="label">联系电话：</span>
			</div> -->
			<Form-item label="特别要求(供应商可见)：">
				{{purchaseInfo.description}}
			</Form-item>
			<Form-item label="附件信息：" class="upload">
				<div v-for="(item,index) in purchaseInfo.attachments" :key="index">
					<a :href="item.url">{{item.fileName+"."+item.fileType}}</a>
				</div>
			</Form-item>
			<div class="bigTit">审核信息（供应商不可见）</div>
			<Form-item label="采购理由：">
				{{purchaseInfo.applyReason}}
			</Form-item>
			<div class="hisTit">审核历史</div>
			<div class="hisList">
				<Table :columns="columnsHis" :data="listHis"></Table>
			</div>
		</div>
		<!-- <tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis> -->
	</Form>
</template>
<script>
	import api from '@/api/api'
	// import tis from '@/page/set/tishisub.vue'
	export default {
		name: 'purchaseForm',
		created() {
			const _this = this;
			//采购清单查询
			var url = '/api/order/plan/' + this.$route.query.id + '/queryById.do';
			this.axios(url)
				.then(function(res) {
					_this.purchaseInfo = res.data.datas;
					_this.proList = _this.purchaseInfo.products
					console.log('resss',_this.purchaseInfo);
				})
				.catch(function(err) {
					console.log(err);
				})

			//审核历史查询
			var urlhis = '/api/order/plan/' + this.$route.query.id + '/queryAuditRecords.do';
			this.axios(urlhis)
				.then(function(res) {
					_this.listHis = res.data.datas;
					console.log('审核',res.data.datas);
				})
				.catch(function(err) {
					console.log(err);
				})
		},
		data() {
			return {
				// count: '1',
				// re_do: '',
				// do_yn: false,
				// do_no: false,

				purchaseInfo: {

				},
				content: '', //审核理由
				columnsHis: [
                    // {
					// 	title: "序号",
					// 	align: "center",
					// 	width: 60,
					// 	type: "index"
					// },
                    {
						title: "审核时间",
						align: "center",
						key: "auditTime"
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
					
				],
				listHis: [{
					aduitTime: "2017-5-20",
					aduitUserName: "张三",
					statusDesc: "审核通过",
					content: "我同意你的申请"
				}],
				columnsPro: [{
						title: "产品信息",
						align: "left",
						width: 300,
						render: (h, params) => {
							return h('div', [
								h('img', {
									props: {
										src: params.row.imageUrl
									},
								}, '付款'),
								h('p', params.row.productName),
							]);
						}

					},

					{
						title: "单价",
						width: 100,
						align: "center",
						key: "price"
					},
					{
						title: "产品数量",
						align: "center",

						render: (h, params) => {
							return h('div', [
								h('div', params.row.amount + "" + params.row.unitName),

							]);
						}
					},
					{
						title: "金额",
						align: "center",
						key: "subtotalMoney"
					},
					{
						title: "备注",
						width: 200,
						align: "center",
						key: "description"

					}
				],
				proList: []
			}
		},
		methods: {
			saveModify() {
				const _this = this;
				var postInfo = {

				}
				postInfo.orderId = this.purchaseInfo.id;
				postInfo.applyDepId = this.purchaseInfo.applyDepId;
				postInfo.deliveryDate = "2015-10-22";
				postInfo.description = this.purchaseInfo.description;
				postInfo.attachments = this.purchaseInfo.attachments;
				postInfo.description = this.purchaseInfo.description;
				postInfo.skuInfo = [];
				console.log(postInfo);
				this.purchaseInfo.products.forEach(function(item, index) {
					var newsku = {};
					newsku.productId = item.productId;
					newsku.skuId = item.skuId;
					newsku.amount = item.amount;
					newsku.description = item.description;
					postInfo.skuInfo[index] = newsku;
				});

				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.modifyPlan,
						data: api.jsonData(postInfo),

					})
					.then(function(res) {
						console.log(res.data.datas);
						if(res.data.status == 1) {
							// _this.data.push(res.data.datas);
							_this.do_yn = true;
							_this.re_do = "保存成功";
							setTimeout(() => {
								_this.do_yn = false;
							}, 2000);

							//_this.$Message.success('保存成功');
						} else {
							_this.do_no = true;
							_this.re_do = '请重新提交';
							setTimeout(() => {
								_this.do_no = false;
							}, 2000);

							//_this.$Message.success('请重新提交');
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
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
				console.log(submitInfo);
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.submittoAudit,
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

							//_this.$Message.success('修改成功');
							_this.$router.push({
								path: "/reviewedList",
								query: {}
							});
						} else {
							_this.do_no = true;
							_this.re_do = '请重新提交';
							setTimeout(() => {
								_this.do_no = false;
							}, 2000);

							//_this.$Message.success('请重新提交');
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
	.joinplanInfo{
		font-size: 14px;
	}

    .information {
        padding: 0 20px;
    }
	
    .information>div {
        margin: 30px 0;
    }

    .information>div h3 {
        margin: 20px 0 10px;
    }

    .information .ivu-col {
        height: 40px;
        line-height: 40px;
    }

    .information span {
        font-weight: bold;
    }

	.purchaseInfo.ivu-row {
		margin: 0 0 5px 0;
	}

    .buyList table {
        table-layout: fixed;
        border-collapse: collapse;
        width: 100%;
    }

    .buyList tr {
        height: 96px;
    }

    .buyList tr:first-child {
        height: 40px;
    }

	.buyList td {
		text-align: center;
	}
	
	.buyList tr:hover {
		background-color: #ebf7ff;
	}
	
	.buyList table tr td a {
		display: inline-block;
	}
	
	.buyList table tr td a img {
		width: 50px;
	}

    .moneyInfo {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		/*margin-top: -10px;*/
		margin-bottom: 20px;
		overflow: auto;
		clear: both;
        margin: 20px 0;
	}
	
	.moneyInfo div {
		width: 160px;
		clear: both;
	}

    .bigTit {
		height: 42px;
		line-height: 42px;
		margin: 20px 0;
		border-top: 1px solid #39f;
		border-bottom: 1px solid #39f;
		font-weight: bold;
		font-size: 16px;
		color: #39f;
	}

    .upload {
        float: none;
    }
</style>