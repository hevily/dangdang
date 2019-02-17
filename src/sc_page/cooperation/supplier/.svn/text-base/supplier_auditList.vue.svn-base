<template>
	<div class="customer">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>供应商管理</Breadcrumb-item>
			<Breadcrumb-item>审核供应商</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Row>
				<Col span='14' class="search-box">
                    <span>供应商：</span>
                    <Input placeholder="产品名称/编码" style="width: 440px;margin: 0 15px 0 0;"></Input>
                    <button class="btn-search" type="info">查询</button>
				</Col>
			</Row>
            <table class="zg-table">
                <tr class="zg-th">
                    <th width="20%">供应商</th>
                    <th>申请人</th>
                    <th>申请日期</th>
                    <th>验证人</th>
                    <th>验证日期</th>
                    <th>状态</th>
                    <th width="10%">操作</th>
                </tr>
                <tr v-for="(item,index) in customerList" :key="index" class="zg-tb">
                    <td>{{item.supplierCorpName}}</td>
                    <td>{{item.applyUserName}}</td>
                    <td>{{item.applyTime}}</td>
                    <td>{{item.auditUserName}}</td>
                    <td>{{item.auditTime}}</td>
                    <td>{{item.applyStatusName}}</td>
                    <td>
                        <span v-if="item.applyStatus == 1" @click="audit(item)" class="tab-oper">接受</span>
                        <span @click="show(item)" class="tab-oper">查看</span>
                    </td>
                </tr>
            </table>
				<!-- <Table :columns="tableModle" :data="customerList"></Table> -->
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
			const _this = this;
			this.DOM = {
				content: document.getElementById('content'),
			};
			_this.axios({
					method: 'post',
					//url :api.customer + api.queryAllPost,
					url: api.supplier,
					data: api.convertParam(this.data)
				})
				.then(function(res) {
					_this.total = res.data.datas.total;
					_this.customerList = res.data.datas.rows;
				})
		},
		data() {
			return {
				DOM: {},
				name: '',
				tableModle: [
					{title: '供应商', width: 110, key: 'supplierCorpName'},
					{title: '申请人', width: 60, key: 'applyUserName'},
					{title: '申请日期', width: 60, key: 'applyTime'},
					{title: '验证人', width: 60, key: 'auditUserName'},
					{title: '验证日期', width: 60, key: 'auditTime'},
					{title: '状态', width: 60, key: 'applyStatusName'},
					{title: '操作', key: 'action', width: 60, align: 'center',
						render: (h, params) => {
							if(params.row.applyStatus == 1) {
								return h('Button', {
									props: {type: 'text',size: 'small'},
									on: {click: () => {this.audit(params.row);}}
								}, '接受');
							}
							return h('Button', {
								props: {type: 'text',size: 'small'},
								on: {click: () => {this.show(params.row);}}
							}, '查看')
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
				const _this = this;
				_this.$store.commit('auditCustomer', count);
				_this.axios({
						method: 'post',
						// url :api.customer + api.queryAllPost,
						url: api.supplierToPage,
						data: api.convertParam(this.data)
					})
					.then(function(res) {
						_this.total = res.data.datas.total;
						_this.customerList = res.data.datas.rows;
						_this.DOM.content.scrollTop = 0;
					})
			},
			query() {
				const _this = this;
				_this.$store.commit('auditCustomer', 1);
				if(!this.data.name) {
					this.$Message.warning('请输入查询条件');
					return;
				}
				_this.axios({
						method: 'post',
						//url :api.customer + api.queryAllPost,
						url: api.supplierToPage,
						data: api.convertParam(this.data)
					})
					.then(function(res) {
						_this.total = res.data.datas.total;
						_this.customerList = res.data.datas.rows;
						_this.DOM.content.scrollTop = 0;
					})
			},
			audit(data) {
				this.$router.push({path: '/audit/' + data.id})
			},
			show(data) {
				this.$router.push('/cooperation/supplier/detail/' + data.id);
			}
		}
	}
</script>
<style scoped>

</style>