<template>
	<div class="purchase">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>物料商城</Breadcrumb-item>
			<Breadcrumb-item>采购计划</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
            <div class="search-box">
                <input class="search-input" placeholder="产品名称/编码">
                <button class="search-btn" type="info"><Icon type="search"></Icon></button>
            </div>
			<Table border stripe :columns="columnsPur" :data="listPur"></Table>
			<div class="page-bot">
				<Page :total="planTotalCount" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		created() {
			const _this = this;
			_this.axios({
                method: 'get',
                header: {"Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'},
                url: api.planList,
                data: api.convertParam({
                    pageStart: _this.pageInfo.pageStart,
                    pageSize: _this.pageInfo.pageSize
                })
			})
            .then(function(res) {
                _this.listPur = res.data.datas.rows;
                var info = '';
                _this.listPur.forEach((item,index,arr) => {
                    let info = '';
                    item.products.forEach((it,idx,ar) => {
                        info += it.productName + '<br>';
                    })
                    item.products = info;
                })
            })
		},
		data() {
			return {
				planTotalCount:0,				
				pageInfo: {
					count: 10,
					pageStart: 1,
					pageSize:10,
				},
				columnsPur: [{
						title: '采购计划编号',
						key: 'purchaseOrderCode',
                        width: 150
					},
					/*{
						title: "物料",
						align: "center",
						key: "catalogary"
					},*/
					{
                        title: "产品",
                        key: "products",
                        width: 140
                    },
					{
						title: "总金额",
						key: "totalMoney",
                        width: 90
					},
					// {
					// 	title: "采购员",
					// 	key: "buyerName",
                    //     width: 90
					// },
					{
						title: "供应商",
						key: "supplierName"
					},
                    {
						title: "申请日期",
						key: "orderTime",
						width:120
					},
                    {
						title: "交货日期",
						key: "deliveryDate",
						width:120
					},
					{
						title: "状态",
                        key: "applyStatusName",
                        width:120
					},
					{
						title: '操作',
						key: 'action',
						width: 130,

						render: (h, params) => {
							if(this.listPur[params.index].applyStatus == 0) {
								return h('div', [
									h('Button', {
										props: {
											type: 'text',
											size: 'small',
										},
                                        style: {
                                            width: '30px',
                                            height: '30px',
                                            marginRight: '10px',
                                            backgroundImage: 'url(' + require('../../../assets/img/button/modify_1.png') + ')',
                                            backgroundSize: '30px',
                                            backgroundRepeat: 'no-repeat'
                                        },
										on: {
											click: () => {
												this.modifyPur(params.index)
											}
										}
									}),
									h('Button', {
										props: {
											type: 'text',
											size: 'small',
										},
                                        style: {
                                            width: '30px',
                                            height: '30px',
                                            backgroundImage: 'url(' + require('../../../assets/img/button/detail_1.png') + ')',
                                            backgroundSize: '30px',
                                            backgroundRepeat: 'no-repeat'
                                        },
										on: {
											click: () => {
												this.viewPur(params.index)
											}
										}
									}),
								]);
							} else {
								return h('div', [
                                    h('Button', {
										props: {
											disabled: true,
                                            tyep: 'text',
											size: 'small',
										},
                                        style: {
                                            width: '30px',
                                            height: '30px',
                                            marginRight: '10px',
                                            backgroundImage: 'url(' + require('../../../assets/img/button/modify_1.png') + ')',
                                            backgroundSize: '30px',
                                            backgroundRepeat: 'no-repeat'
                                        },
										on: {
											click: () => {
                                                return;
												//this.modifyPur(params.index)
											}
										}
									}),
									h('Button', {
										props: {
											type: 'text',
											size: 'small',
										},
                                        style: {
                                            width: '30px',
                                            height: '30px',
                                            backgroundImage: 'url(' + require('../../../assets/img/button/detail_1.png') + ')',
                                            backgroundSize: '30px',
                                            backgroundRepeat: 'no-repeat'
                                        },
										on: {
											click: () => {
												this.viewPur(params.index)
											}
										}
									}),
								]);
							}
						}
					}
				],
				listPur: [{
					id: '123',
					name: '001',
					supplierCorpName: '联想',
					applyUserName: '哈哈哈哈',
					totalMoney: 100,
					applyTime: '2017-5-11',
					status: '已审批'
				}]
			}
		},
		methods: {
			modifyPur(index) {
				this.$router.push({
					path: "/purchaseForm",
					query: {
						id: this.listPur[index].id
					}
				});
			},
			viewPur(index) {
				this.$router.push({
					path: "/purchaseInfo",
					query: {
						id: this.listPur[index].id
					}
				});
			},
			toPage(count) {//翻页
				const _this = this;
				const goods = [];
				// _this.pageCount = count;
				this.$store.commit('goodsListPage', count);
				this.data.pageNum = count;
				this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.product + api.productByRequset,
						data: api.convertParam(_this.data)
					})
					.then(function(res) {
						const data = res.data.datas.rows;
						_this.goodsTotalCount = res.data.datas.total;
						data.forEach(function(item, index) {
							goods.push({
								id: item.id,
								name: {
									img: item.imageUrl,
									name: item.name,
								},
								code: item.code,
								unitId: item.unitName,
								prize: item.price ? item.price : '协商',
								unit: item.unitId,
								status: item.status == 0 ? '下架' : '上架',
								classify: item.catalogId,
								inventoryQty: item.inventoryQty,
								spec: item.spec
							})
						})
						_this.goodsList = goods;
						_this.DOM.content.scrollTop = 0;
					})
			},
		}
	}
</script>
<style type="text/css">
	.purchase th{
		padding-left: 10px;
	}
	.purchase table td{
		padding: 10px;
	}

    .ivu-table-row .ivu-btn {
        border: 1px solid transparent;
    }

    .ivu-table-row .ivu-btn:hover {
        border: 1px solid transparent;
        background-image: 'url(' + require('../../../assets/img/button/modify_2.png') + ')';
        background: #ccc;
    }
</style>
<style scoped>
	.purchase {
		font-size: 14px;
	}
	
	.hisTit {
		margin-bottom: 10px;
		font-size: 14px;
		font-weight: bold;
	}
	
	.reviewedList table {
		width: 100%
	}
	
	.joinplanInfo.ivu-form .ivu-form-item-label {
		padding-right: 0;
	}
	
	.upload.ivu-form-item {
		position: relative;
		margin-bottom: 6px;
	}
	
	.upload .uploadNote {
		position: absolute;
		left: 200px;
		top: 0;
	}
	
	.giveTime {
		width: 100%;
		margin-top: 10px;
	}
	
	.giveTime .ivu-form-item-content {
		float: left;
		width: 300px;
	}
	
	.proimg {
		float: left;
		width: 100px;
		height: 100px;
	}
</style>