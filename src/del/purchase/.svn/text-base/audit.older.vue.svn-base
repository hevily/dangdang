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
		<div class="right_home_warp">
			<div class="search-box">
                <input class="search-input" placeholder="产品名称/编码">
                <button class="search-btn"><Icon type="search"></Icon></button>
            </div>
			<Table :columns="columnsPur" :data="listPur"></Table>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'

	export default {
		created() {
			const _this = this;
			this.axios(api.auditList)
				.then(function(res) {
					_this.listPur = res.data.datas.rows;
				})
		},
		data() {
			return {
				pageInfo: {
					count: 10,
					pageStart: 1,
					pageNums: 5
				},
				columnsPur: [{
						title: '采购计划编号',
						key: 'purchaseOrderCode',
					},
					/*{
						title: "物料",
						align: "center",
						key: "catalogary"
					},*/

					{
						title: "下单日期",
						
						key: "orderTime",
						width: 155
					},
					{
						title: "总金额",
						
						key: "totalMoney"
					},
					{
						title: "采购员",
						
						key: "buyerName"
					},
					{
						title: "供应商",
						
						key: "supplierName"
					},
					{
						title: "状态",
						
						key: "applyStatusName"
					},
					{
						title: '操作',
						key: 'action',
						width: 180,
						align: 'center',
						render: (h, params) => {
                            if(this.listPur[params.index].applyStatus == 0){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            disabled: true,
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.modifyPur(params.index)
                                            }
                                        }
                                    }, '审批'),
                                ]);
                            }else {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.modifyPur(params.index)
                                            }
                                        }
                                    }, '审批'),
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