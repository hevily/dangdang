<template>
	<div class="adjust">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>销售</Breadcrumb-item>
			<Breadcrumb-item>调价格</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">

			<Row>
				<Form :model="formItem" :label-width="100">
					<Row>
						<Col span="7" class="col_label">
						<label>调价日期:</label>
						<Date-picker type="daterange" v-model="formItem.date" placement="bottom-start" placeholder="选择日期" style="width: 210px"></Date-picker>
						</Col>
						<Col span="7" class="col_label">
						<label>产品名称:</label>
						<Input type="text" v-model="formItem.product" placeholder="请输入产品名称"></Input>
						</Col>
						<Col span="7" class="col_label">
						<label>客户名称:</label>
						<Input type="text" v-model="formItem.customer" placeholder="请输入客户名称"></Input>
						</Col>
						<button type="button" class="ivu-btn search" @click="queryAdjustment"><span>查询</span></button>
					</Row>
				</Form>
			</Row>
			<Row type="flex" justify="end" class="top20">
				<router-link to="plusPrice">
					<Button type="primary" icon="plus">新增调价单</Button>
				</router-link>
			</Row>
			<Row class="priceList">
				<Table border :context="self" :columns="columns4" :data="data1"></Table>
			</Row>
			<Row type="flex" justify="end" class="top20">
				<Page :total="oTotal" :page-size="pageNums" show-elevator @on-change="changePage"></Page>
			</Row>
		</div>
	</div>

</template>
<script>
	import api from '@/api/api';
	export default {
		name: 'customerPrice',
		mounted() {
			this.queryAdjustment();
		},
		data() {
			return {
				self: this, //table中绑定点击事件的时候，一定要从新定义this指向，上下文，不然点击事件是不执行的
				input: '',
				formItem: {
					date: '',
					product: '',
					customer: ''
				},
				columns4: [
					//                  {
					//                      type: 'selection',
					//                      width: 60,
					//                      align: 'center',
					////                      fixed:'left'
					//                  },
					{
						title: '调价单名称',
						key: 'title'
					},
					{
						title: '调价单日期',
						key: 'adjustTime'
					},
					{
						title: '调价人',
						key: 'adjustUserName'
						//                    width:'200'
					},
					{
						title: '操作',
						key: 'action',
						width: 200,
						render(row, column, index) {
							return ` <i-button type="text" size="small"  @click="queryDetail('${row.id}')">详情</i-button>`;
						}
					}
					//                  {
					//                      title: '客户名称',
					//                      key: 'customerName'
					//                  },
					//                  {
					//                      title: '客户ID',
					//                      key: 'customerId'
					//                  },
					//                  {
					//                      title: '产品ID',
					//                      key: 'productId',
					//                      width:'200'
					//                  },
					//                  {
					//                      title: '产品名称',
					//                      key: 'productName'
					//                  },
					//                  {
					//                      title: '属性',
					//                      key: 'skuAttributeValues'
					//                  },
					//                  {
					//                      title: 'skuId',
					//                      key: 'skuId'
					//                  }
					//                  },
					//                  {
					//                      title: '操作',
					//                      key: 'action',
					////                      fixed: 'right',
					//                      width: 200,
					//                      render () {
					//                      return `<i-button type="text" size="small">整单生效</i-button><i-button type="text" size="small">详情</i-button>`;
					//      }
					//      }
				],
				data1: [
					//                  {
					//                    customerName: '王小明',
					//                    customerId: '2017',
					//                    productId: '黄色小鸭经贸有限公司',
					//                    productName:'南孚',
					//                    skuAttributeValues:'生活',
					//                    skuId:'88.00'
					//                  }
				],
				oTotal: 100,
				page: 1,
				pageNums: 10
			}
		},
		methods: {
			queryAdjustment() {
				const _this = this;
				const formData = {
					pageStart: _this.page,
					pageNums: _this.pageNums
				};
				this.axios({
					method: 'post',
					url: api.customer + api.adjustment + api.queryByRequest,
					data: api.convertParam(formData)
				}).then(function(res) {
					_this.data1 = res.data.datas.rows;
					_this.oTotal = res.data.datas.total;
					console.log(res);
				}).catch(function(err) {
					console.log(err);
				})
			},
			changePage(page) {
				this.page = page;
				this.queryAdjustment();
			},
			queryDetail(queryId) {
				this.$router.push({
					name: 'priceDetail',
					query: {
						id: queryId
					}
				})
			},

		}
	}
</script>
<style scoped>
	.adjust {
		/*position: absolute;
		top: 5px;
		left: 10px;
		right: 20px;
		bottom: 0;*/
		font-size: 14px;
	}
	
	.customerPrice .priceList {
		margin-top: 20px;
	}
	
	.search {
		margin-left: 10px;
		margin-top: 15px;
	}
	
	.top20 {
		margin-top: 20px;
	}
	
	.col_label {
		display: flex;
		margin: 15px 10px;
	}
	
	.col_label label {
		width: 80px;
		font-size: 14px;
		line-height: 30px;
	}
</style>