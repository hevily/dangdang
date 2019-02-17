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
                <button class="search-btn"><Icon type="search"></Icon></button>
            </div>
            <table class="zg-table">
                <tr class="zg-th">
                    <th width="12%">采购计划编号</th>
                    <th width="15%">产品</th>
                    <th width="8%">总金额</th>
                    <th width="20%">供应商</th>
                    <th width="10%">申请日期</th>
                    <th width="10%">交货日期</th>
                    <th width="8%">状态</th>
                    <th width="10%">操作</th>
                </tr>
                <tr class="zg-tb" v-for="(item,index) in listPur" :key="index">
                    <td>{{item.purchaseOrderCode}}</td>
                    <td :title="convertProduct(item.products).title" v-html="convertProduct(item.products).text"></td>
                    <td>{{item.totalMoney}}</td>
                    <td>{{item.supplierName}}</td>
                    <td>{{item.orderTime}}</td>
                    <td>{{item.deliveryDate ? item.deliveryDate : '--'}}</td>
                    <td>{{item.applyStatusName}}</td>
                    <td>
                        <span class="tab-oper" @click="viewPur(index)">查看</span>
                        <span class="tab-oper" @click="modifyPur(index)" v-if="item.applyStatus == 0">编辑</span>
                        <span class="tab-inoper" v-else>编辑</span>
                    </td>
                </tr>
            </table>
			<!-- <div class="purchaseList">
				<Table border stripe :columns="columnsPur" :data="listPur"></Table>
			</div> -->
		</div>
        <div class="page-bot">
            <Page :total="planTotalCount" :page-size="pageInfo.pageSize" show-elevator show-total @on-change='toPage'></Page>
        </div>
	</div>
</template>
<script>
	import api from '@/api/api'

	export default {
		created() {
			this.axios({
                method: 'get',
                header: {"Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'},
                url: api.planList + '?pageStart=' + this.pageInfo.pageStart + '&&pageSize=' + this.pageInfo.pageSize,
			})
            .then((res) => {
                this.listPur = res.data.datas.rows;
                this.planTotalCount = res.data.datas.total;
                this.listPur.forEach((item,index,arr) => {
                    item.orderTime = item.orderTime.replace(/(\d{4}-\d{2}-\d{2}).*/g,'$1');
                })
            })
            .catch((err) => {
                console.log(err);
            })
		},
		data() {
			return {
				planTotalCount:0,
				pageInfo: {
					pageStart: 1,
					pageSize: 10,
				},
				columnsPur: [
                    {title: '采购计划编号',	key: 'purchaseOrderCode', width: 150},
					{
                        title: "产品",
                        key: "products",
                        width: 140,
                        render: function(h, params) {
                            let text = '';
                            let title = '';
                            let len = '';
                            if(params.row.products){
                                params.row.products.forEach((item,index,arr) => {
                                    text += '<p>' + item.productName + ' ' + item.atrributeValue + '</p>';
                                    if(index == arr.length-1){
                                        title += item.productName + ' ' + item.atrributeValue
                                    }else {
                                        title += item.productName + ' ' + item.atrributeValue + '、 ';
                                    }
                                })
                            }
                            
                            if((!params.row.products) || params.row.products.length == 1){
                                len = '40px';
                            }else {
                                len = '20px';
                            }
							return h('div', {
                                    style: {
                                        height: len,
                                        lineHeight: len
                                    },
									attrs: {
										title: title
									},
									domProps: {
										innerHTML: text
									}
								}
							);
						}
                    },
					{title: "总金额", key: "totalMoney", width: 90},
					{title: "供应商", key: "supplierName"},
                    {title: "申请日期",	key: "orderTime", width:120},
                    {title: "交货日期",	key: "deliveryDate", width:120},
					{title: "状态", key: "applyStatusName", width:120},
					{
						title: '操作',
						key: 'action',
						width: 130,
						render: (h, params) => {
							if(this.listPur[params.index].applyStatus == 0) {
								return h('div', [
									h('Button', {
										props: {type: 'text', size: 'small',},
                                        style: {
                                            width: '30px',
                                            height: '30px',
                                            marginRight: '10px',
                                            backgroundImage: 'url(' + require('../../../assets/img/button/modify_1.png') + ')',
                                            backgroundSize: '30px',
                                            backgroundRepeat: 'no-repeat'
                                        },
										on: {click: () => {this.modifyPur(params.index)}}
									}),
									h('Button', {
										props: {type: 'text', size: 'small',},
                                        style: {
                                            width: '30px',
                                            height: '30px',
                                            backgroundImage: 'url(' + require('../../../assets/img/button/detail_1.png') + ')',
                                            backgroundSize: '30px',
                                            backgroundRepeat: 'no-repeat'
                                        },
										on: {click: () => {this.viewPur(params.index)}}
									}),
								]);
							} else {
								return h('div', [
                                    h('Button', {
										props: {disabled: true, tyep: 'text', size: 'small'},
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
											}
										}
									}),
									h('Button', {
										props: {type: 'text', size: 'small'},
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
					id: '',
					name: '',
					supplierCorpName: '',
					applyUserName: '',
					totalMoney: '',
					applyTime: '',
                    status: '',
                    action: '',
				}]
			}
		},

		methods: {
            convertProduct(array){
                let text = '';
                let title = '';
                let len = '';
                if(array){
                    array.forEach((item,index,arr) => {
                        text += '<p>' + item.productName + ' ' + item.atrributeValue + '</p>';
                        if(index == arr.length-1){
                            title += item.productName + ' ' + item.atrributeValue
                        }else {
                            title += item.productName + ' ' + item.atrributeValue + '、 ';
                        }
                    })
                }
                return {text: text, title: title};
            },
			modifyPur(index) {
				this.$router.push({
					path: "/purchaseForm",
					query: {id: this.listPur[index].id}
				});
			},
			viewPur(index) {
				this.$router.push({
					path: "/purchaseInfo",
					query: {id: this.listPur[index].id}
				});
			},
			toPage(count) {//翻页
                this.pageInfo.pageStart = count;
                this.axios({
                    method: 'get',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: api.planList + '?pageStart=' + this.pageInfo.pageStart + '&&pageSize=' + this.pageInfo.pageSize,
                })
                .then((res) => {
                    this.listPur = res.data.datas.rows;
                    this.planTotalCount = res.data.datas.total;

                    this.listPur.forEach((item,index,arr) => {
                        item.orderTime = item.orderTime.replace(/(\d{4}-\d{2}-\d{2}).*/g,'$1');
                    })
                })
                .catch((err) => {
                    console.log(err);
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
		padding: 8px 0 8px 8px;
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
	.hisTit {
		margin-bottom: 10px;
		font-size: 14px;
		font-weight: bold;
	}
	
	.purchaseList {
		margin-top: 30px;
	}
	
	.purchaseList .ivu-table-cell {
		overflow: initial;
		text-overflow: initial;
		word-break: initial;
	}
	
	.purchaseInfo.ivu-row {
		margin-bottom: 15px;
	}
	
	.purchaseInfo .ivu-form-item {
		margin-bottom: 0;
	}

	.purchaseInfo .label {
		float: left;
		font-weight: bold;
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
</style>