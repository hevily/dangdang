<template>
	<div class="goodsAttr">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>产品信息</Breadcrumb-item>
			<Breadcrumb-item>产品属性</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Row>
				<Col span='14' class="search-box">
                    <span>属性关键字：</span>
                    <Input placeholder="请输入产品名/属性值" style="width: 440px;margin: 0 15px 0 0;"></Input>
                    <button class="btn-search">查询</button>
				</Col>
				<Col span='10'>
                    <div class="btn-box-right">
                        <button class="btn-new" @click="$router.push('/productAttribute/add')">新增</button>
                        <button class="btn-cancel">导入</button>
                        <button class="btn-cancel">导出</button>
                        <button class="btn-download">模板下载</button>
                    </div>
				</Col>
			</Row>
			<Modal v-model="delModel" width="460">
				<p slot="header" class="del_p">
					<span>删除确认</span>
				</p>
				<div class="del_div">
					<p>您确定要删除吗？</p>
				</div>
				<div slot="footer" class="delbut">
					<Button @click="del">删除</Button>
					<Button @click='cancel'>取消</Button>
				</div>
			</Modal>
			<div>
				<Table class="filetables spsxt" :columns="tableHeader" :data="attrList"></Table>
			</div>
			<!--</div>-->
		</div>
		<div class="page-bot">
			<Page :total="totalCount" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>

<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			tis: tis
		},
		name: 'goodsAttr',
		mounted() {
			const _this = this;
			this.DOM = {
				content: document.getElementById('content'),
			};

			_this.axios({
					method: 'post',
					url: api.productAttr + api.productGetAll,
					data: api.convertParam(this.data)
				})
				.then(function(res) {
					_this.totalCount = res.data.datas.total;
					_this.attrList = res.data.datas.rows;
				})
				.catch(function(err) {
					console.log(err);
				})

		},
		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

				DOM: {},
				tableHeader: [{
						title: '属性名称',
						key: 'name',
						width: '40%',
					},
					{
						title: '属性值',
						key: 'valueNames'

					},
					{
						title: '操作',
						key: 'action',
						width: '20%',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small'
									},
									on: {
										click: () => {
											this.modify(params.index, params.row);
										}
									}
								}, ''),

								h('Button', {
									props: {
										size: 'small'
									},

									on: {
										click: () => {
											this.remove(params.index, params.row);
										}
									}
								}, ''),

							])
						}
					}
				],
				attrList: [],
				name: '',
				totalCount: 30,
			}
		},
		computed: {
			data: function() {
				return {
					name: this.name,
					pageStart: this.$store.state.goodsAttrPage,
					pageNums: this.$store.state.pageNums
				};

			}
		},
		methods: {
			toPage(count) {
				const _this = this;
				_this.$store.commit('goodsAttrPage', count);
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.productAttr + api.productGetAll,
						data: api.convertParam(this.data)
					})
					.then(function(res) {
						const data = res.data.datas;
						_this.totalCount = data.total;

						_this.attrList = data.rows;
						_this.DOM.content.scrollTop = 0;
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			query() {
				const _this = this;
				_this.$store.commit('goodsAttrPage', 1);
				_this.axios({
						method: 'post',
						url: api.productAttr + api.productGetAll,
						data: api.convertParam(this.data)
					})
					.then(function(res) {
						_this.totalCount = res.data.datas.total;
						_this.attrList = res.data.datas.rows;
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			modify(index, data) {
				this.$router.push({
					name: "addGoodsAttr",
					params: {
						id: data.id
					}
				});
			},
			remove(index, data) {
				const _this = this;
				_this.axios(api.productAttr + data.id + api.deleted)
					.then(function(res) {
						if(res.data.status == 1) {
							_this.attrList.splice(index, 1);
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//									_this.$Message.error(res.data.message);
						}
					})
					.catch(function(err) {
						console.log(err);
					})

				//				this.$Modal.confirm({
				//					title: '确认框',
				//					content: '<p>确定要删除产品属性吗</p>',
				//					onOk: () => {
				//						_this.axios(api.productAttr + data.id + api.deleted)
				//							.then(function(res) {
				//								console.log(res);
				//								if(res.data.status == 1) {
				//									_this.attrList.splice(index, 1);
				//								} else {
				//									_this.$Message.error(res.data.message);
				//								}
				//							})
				//							.catch(function(err) {
				//								console.log(err);
				//							})
				//					}
				//				});

			}

		}
	}
</script>
<style type="text/css">
	.goodsAttr .ivu-table-cell button:nth-child(1) {
		width: 32px;
		height: 32px;
		background: url(../../assets/img/quyu.jpg) no-repeat;
		background-size: 100%;
	}
	
	.goodsAttr .ivu-table-cell button:nth-child(1):hover {
		width: 32px;
		height: 32px;
		background: url(../../assets/img/quyu_h.jpg) no-repeat;
		background-size: 100%;
	}
	
	.goodsAttr .ivu-table-cell button:nth-child(2) {
		border: none;
		background: url(../../assets/img/dele.jpg) no-repeat;
		background-size: 100%;
		width: 32px;
		height: 32px;
	}
	
	.goodsAttr .ivu-table-cell button:nth-child(2):hover {
		width: 32px;
		height: 32px;
		border: none;
		background: url(../../assets/img/deleclick.jpg) no-repeat;
	}
	
	.goodsAttr .spsxt .ivu-table td {
		height: 55px;
		line-height: 55px;
		border-right: none;
		text-align: left;
	}
	
</style>
<style scoped>
	.goodsAttr .spsxt .ivu-table {
		border: 0 !important;
	}
	
	.goodsAttr .spsxt .ivu-table th {
		text-align: left!important;
	}
	
	.spsxt .ivu-table td {
		height: 60px;
		line-height: 60px;
		border-right: none;
		text-align: left;
	}
	
	.spsxt {
		border: 0 !important;
	}
	
	.goodsAttr .filetables {
		border: none;
	}
	
	.goodsAttr .spsxt th .ivu-table-cell {
		height: 25px;
		line-height: 25px;
	}
	
	.goodsAttr .spsxt .ivu-table-cell span {
		display: block;
		height: 25px;
	}
</style>
<style scoped>
	.table {
		display: table;
		width: 100%;
	}
	
	.table-header {
		display: table-header-group;
		background: #eef1f9;
		border: 1px solid #e1e7f6;
		/*color: #fff;*/
	}
	
	.table-tbody {
		display: table-row-group;
	}
	
	.table-tr {
		display: table-row;
		background: #fff;
	}
	
	.table-tr:hover {
		background: #ebf7ff;
	}
	
	.table-td {
		display: table-cell;
		height: 30px;
		vertical-align: middle;
		text-align: center;
	}
	
	.ivu-btn-warning {
		background-color: #0099cc;
		border-color: #0099cc;
	}
	
	.ivu-btn-warning:hover {
		background-color: #1ab3df;
		border-color: #1ab3df;
	}
</style>