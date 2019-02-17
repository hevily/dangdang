<template>
	<div class="customer">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>客户管理</Breadcrumb-item>
			<Breadcrumb-item>新客户</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Row>
				<Col span='18' class="search-box">
                    <span>客户名称：</span>
                    <Input placeholder="请输入客户名称" style="width: 510px;margin: 0 15px 0 0;" v-model='name'></Input>
                    <button class="btn-search" @click='query'>查询</button>
				</Col>
			</Row>
			<Table :columns="tableModle" :data="customerList"></Table>
		</div>
		<div class="page-bot">
			<Page :total="total" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'customerAuditList',
		mounted() {
			this.DOM = {
				content: document.getElementById('content'),
			};
			this.axios({
                method: 'post',
                url: api.cooperationCustomer + api.customerNew,
                data: api.convertParam(this.data)
            })
            .then((res) => {
                this.total = res.data.datas.total;
                this.customerList = res.data.datas.rows;
            })
		},
		data() {
			return {
				DOM: {},
				name: '',
				tableModle: [
                    {title: '客户名称',width: 110,key: 'customerCorpName', ellipsis: true,
                        render: (h,params) => {
                            return h('a',{
                                style: {fontSize: '14px'},
                                attrs: {
                                    title: params.row.customerCorpName,
                                    href: '/#/cooperation/detail?id=' + params.row.customerCorpId,
                                },
                                domProps: {
                                    innerHTML: params.row.customerCorpName
                                }
                            })
                        }
                    },
					{title: '申请人',width: 60,key: 'applyUserName'},
					{title: '申请日期',width: 60,key: 'applyTime'},
					{title: '审核人',width: 60,key: 'auditUserName'},
					{title: '审核日期',width: 60,key: 'auditTime'},
					{title: '审核状态',width: 60,key: 'applyStatusName'},
					{title: '操作',key: 'action',width: 60,align: 'center',
						render: (h, params) => {
							if(params.row.applyStatus == 1) {
								return h('Button', {
									props: {size: 'small'},
									on: {click: () => {this.modify(params.row);}}
								}, '审核');
							}
							return h('Button', {
								props: {size: 'small'},
								on: {click: () => {this.show(params.row);}}
							}, '查看');
						}
					}
				],
				customerList: [],
				name: '',
				total: 30,
			}
		},
		computed: {
			data: function() {
				return {
					name: this.name,
					pageStart: this.$store.state.page.auditCustomer,
					pageNums: this.$store.state.pageNums,
				};

			}
		},
		methods: {
			toPage(count) {
				this.$store.commit('auditCustomer', count);

				this.axios({
                    method: 'post',
                    url: api.cooperationCustomer + api.queryAllPost,
                    data: api.convertParam(this.data)
                })
                .then((res) => {
                    this.total = res.data.datas.total;
                    this.customerList = res.data.datas.rows;
                    this.DOM.content.scrollTop = 0;
                })
			},
			query() {
				this.$store.commit('auditCustomer', 1);

				this.axios({
                    method: 'post',
                    url: api.cooperationCustomer + api.customerNew,
                    data: api.convertParam(this.data)
                })
                .then((res) => {
                    this.total = res.data.datas.total;
                    this.customerList = res.data.datas.rows;
                    this.DOM.content.scrollTop = 0;
                })
			},
			audit(data) {
				this.$router.push({path: '/audit/' + data.id})
			},
			show(data) {
				this.$router.push('/showCustomer/' + data.id);
			},
			modify(data){
				this.$router.push('/applicationCustomer/' + data.id);
			}
		}
	}
</script>
<style type="text/css">
	
	.customer.ivu-page-item-active {
		background-color: #7b8aa1!important;
		border-color: #7b8aa1!important;
	}
	.customer .ivu-page-prev,.ivu-page-next{
		background-color: #f2f5fb!important;
	}
	.customer .ivu-page-prev a i{
		    color: #7782ab!important;
	}
	.customer .ivu-page-next a i{
		    color: #7782ab!important;
	}

	.customer table th:first-child .ivu-table-cell span{
		border-left: none;
		width: 16px;
		padding-left: 0;
	
	}

	.customer table th .ivu-table-cell{
		height: 25px;
		line-height: 25px;
	}

	.customer .ivu-table-row{
		height: 55px;
		line-height: 55px;
	}
	.customer .ivu-table-row:hover{
		background: #e1e7f6 !important;
	}
	
	.customer .ivu-table-body{
		position: absolute;
		top:50px;
		overflow: auto;
  			
	}
	.customer .ivu-table{
		top: 10px;
	}
</style>
<style scoped>

</style>