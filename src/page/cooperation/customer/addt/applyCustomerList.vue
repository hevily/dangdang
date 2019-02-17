<template>
	<div class="customera">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>客户管理</Breadcrumb-item>
			<Breadcrumb-item>添加新客户</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Row>
				<Col span='14'>
				    <span>客户名称：</span>
                    <Input placeholder="请输入客户名称" style="width: 440px;margin-right:15px;" v-model="name"></Input>
                    <button class="btn-search" @click="query" style="vertical-align: bottom;">查询</button>
				</Col>
				<Col span='10'>
                    <div class="btn-box-right">
                        <button class="btn-new" @click.stop='click_xj'>邀请</button>
                        <button class="btn-cancel" @click="importCustomer">导入</button>
                        <button class="btn-cancel">导出</button>
                        <button class="btn-download">模板下载</button>
                    </div>
				</Col>
			</Row>
			<div style="margin-top: 30px;">
				<Table :columns="columnsInfo" :data="customerList"></Table>
			</div>
		</div>
		<div class="page-bot">
            <Page :total="total" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
        </div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'customer',
		created() {
			this.axios({
                method: 'post',
                url: api.cooperationCustomer + api.queryAllPost,
                data: api.convertParam(this.data)
            })
            .then((res) => {
                this.total = res.data.datas.total;
                this.customerList = res.data.datas.rows;
            })
		},
		data() {
			return {
				name: '',
				columnsInfo: [
                    {title: '客户名称',	width: 110,	key: 'customerCorpName',
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
					{title: '申请人', width: 60,key: 'applyUserName'},
					{title: '申请日期',	width: 60,key: 'applyTime'},
					{title: '审核人', width: 60, key: 'auditUserName' },
					{title: '审核日期', width: 60, key: 'auditTime'},
					{title: '审核状态', width: 60, key: 'applyStatusName'},
					{title: '操作', key: 'action', width: 60, align: 'center',
						render: (h, params) => {
							if(params.row.applyStatus == 0) {
								return h('Button', {
									props: {type: 'text',size: 'small'},
									on: {click: () => {this.modify(params.row);}}
								}, '编辑');
							}
							return h('Button', {
								props: {type: 'text',size: 'small'},
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
			data() {
				return {
					name: this.name,
					applyStatus: '1',
					pageStart: this.$store.state.page.customerPage,
					pageNums: this.$store.state.pageNums,
				};
			}
		},
		methods: {
			click_xj() {
				this.$router.push({path: '/cooperation/customer/new'})
			},
			importCustomer() {
				this.$router.push({path: '/cooperation/customer/importCustomer'})
			},
			toPage(count) {
				this.$store.commit('customerPage', count);
				this.axios({
                    method: 'post',
                    url: api.cooperationCustomer + api.queryAllPost,
                    data: api.convertParam(this.data)
                })
                .then((res) => {
                    this.total = res.data.datas.total;
                    this.customerList = res.data.datas.rows;
                })
			},
			query() {
				this.$store.commit('auditCustomer', 1);
				this.axios({
                    method: 'post',
                    url: api.cooperationCustomer + api.queryAllPost,
                    data: api.convertParam(this.data)
                })
                .then((res) => {
                    this.total = res.data.datas.total;
                    this.customerList = res.data.datas.rows;
                })
			},
			modify(data) {
				this.$router.push({
					path: '/addCustomer',
					query: {id: data.id}
				});
			},
			show(data) {
				this.$router.push('/showCustomer/' + data.id)
			}
		}
	}
</script>
<style scoped>

</style>
