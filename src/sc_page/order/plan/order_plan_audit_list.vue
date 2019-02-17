<template>
	<div class="purchase">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>采购</Breadcrumb-item>
			<Breadcrumb-item>采购审核</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
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
                        <span class="tab-oper" @click="modifyPur(index)" v-if="item.applyStatus == 0">审核</span>
                        <span class="tab-inoper" v-else>审核</span>
                    </td>
                </tr>
            </table>
			<!-- <Table border stripe :columns="columnsPur" :data="listPur"></Table> -->
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		created() {
			this.axios(api.auditList)
            .then((res) => {
                this.listPur = res.data.datas.rows;
                var info = '';
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
				pageInfo: {
					count: 10,
					pageStart: 1,
					pageNums: 5
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
							if(this.listPur[params.index].applyStatus != 2) {
								return h('div', [
									h('button', {
										props: {type: 'text', size: 'small',},
                                        style: {
                                            width: '40px',
                                            padding: 0,
                                            marginRight: '20px',
                                            height: '30px',
                                            lineHeight: '28px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            backgroundColor: '#f7f7f7',
                                            color: '#495060',
                                        },
										on: {
											click: () => {
												this.modifyPur(params.index)
											}
										}
									},"审核"),
									h('button', {
										props: {type: 'text', size: 'small',},
                                        style: {
                                            width: '40px',
                                            padding: 0,
                                            height: '30px',
                                            lineHeight: '28px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            backgroundColor: '#f7f7f7',
                                            color: '#495060'
                                        },
										on: {
											click: () => {
												this.viewPur(params.index)
											}
										}
									},"明细"),
								]);
							} else {
								return h('div', [
                                    h('button', {
										props: {disabled: true, tyep: 'text', size: 'small'},
                                        style: {
                                            width: '40px',
                                            padding: 0,
                                            height: '30px',
                                            marginRight: '20px',
                                            lineHeight: '28px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            backgroundColor: '#a1a1a1',
                                            color: '#495060',
                                            cursor: 'default',
                                            outline: 'none'
                                        },
										on: {
											click: () => {
                                                return;
											}
										}
									},"审核"),
									h('button', {
										props: {type: 'text', size: 'small'},
                                        style: {
                                            width: '40px',
                                            padding: 0,
                                            height: '30px',
                                            lineHeight: '28px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            backgroundColor: '#f7f7f7',
                                            color: '#495060'
                                        },
										on: {
											click: () => {
												this.viewPur(params.index)
											}
										}
									},"明细"),
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
					status: ''
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
            viewPur(index) {
				this.$router.push({
					path: "/purchaseInfo",
					query: {id: this.listPur[index].id}
				});
			},
			modifyPur(index) {
				this.$router.push({
					path: "/reviewedForm",
					query: {
						id: this.listPur[index].id
					}
				});
			}
		}
	}
</script>
<style scoped>

</style>