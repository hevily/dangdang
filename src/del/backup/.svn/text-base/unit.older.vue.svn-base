<template>
	<div class="goodsList">
		<Breadcrumb>
			<Breadcrumb-item>首页</Breadcrumb-item>
			<Breadcrumb-item>产品</Breadcrumb-item>
			<Breadcrumb-item>产品列表</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">

			<div class="selectdiv">
				<div class="select_left">
					<Cascader class="cas_dev"   placeholder="全部分类" size="large" v-model='catalog' :data="CatalogList" :render-format.native="query" change-on-select style="display: inline-block;"></Cascader>

					<Select v-model="data.status" @keyup.native='enter($event)' class="select_dev">
						<Option v-for="item in statusList" :value="item.value" :key="item"  @click.native='query'>{{ item.label }}</Option>
					</Select>
					<span>搜索</span>
					<input class="search-input" type="text" placeholder="请输入产品的名称/编码/关键字"/>
					<button class="search-btn" long @click.native='query'><Icon type="search"></Icon></button>
				</div>

				<div class="select_right">
					<button class="del">导入</button>
					<button class="del">导出</button>
					<button class="add" @click="goodsList_add()">新增</button>
					<button class="delsc" @click="del_new">删除</button>
				</div>
			</div>

			<div>
				<Table :columns="columns5" :data="goodsList" @on-select="selectFun" ref="selection"></Table>
			</div>
			<Row class="mag" type="flex" justify="end">
				<Page :total="goodsTotalCount" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
			</Row>
			<div></div>

		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		mounted() {
			const _this = this;
			const goods = [];

			this.DOM = {
				content: document.getElementById('content'),
			};

			// 获取产品分类
			_this.axios({
					method: 'get',
					//              url :api.qroductCatalog + api.queryAll
					url: '/api/product/catalog/9999/queryTreeById.do'
				})
				.then(function(res) {
					console.log('11111111111', res.data);
					_this.CatalogList = res.data.datas;

				})
				.catch(function(err) {
					console.log(err);
				})

			_this.axios({
					method: 'post',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: api.product + api.productByRequset,
					data: api.convertParam({
						pageStart: _this.$store.state.goodsListPage,
						pageNums: _this.$store.state.pageNums
					})
				})
				.then(function(res) {
					const data = res.data.datas.rows;
					console.log(res);
					_this.goodsTotalCount = res.data.datas.total;
					_this.originalGoodsList = data;
					data.forEach(function(item, index) {
						goods.push({
							id: item.id,
							name: {
								img: item.imageUrl,
								name: item.name,
								code: item.barCode
							},
							prize: item.price ? item.price : '协商',
							unit: item.unitId,
							qrUrl: item.qrUrl,
							status: item.status == 0 ? '下架' : '上架',
							classify: item.catalogId,
							inventoryQty: item.inventoryQty,
							spec: item.spec
						})
					})
					_this.goodsList = goods;

				})
				.catch(function(err) {
					console.log(err);
				})

		},
		data() {
			return {
				DOM: {},
				CatalogList: [],
				catalog: [],
				aaa: '2018-3-15 14:10"1',
				statusList: [{
						value: '3',
						label: '无'
					},
					{
						value: '1',
						label: '上架'
					},
					{
						value: '0',
						label: '下架'
					}
				],
				columns5: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						title: '产品图片',
						key: 'img',
						sortable: true,
						width: 110,
						render(h, params) {
							return h('img', {
								attrs: {
									class: 'waresimg',
									style: 'width:100%',
									src: params.row.name.img
								}
							})
						}
					},
					{
						title: '产品编码',
						key: 'spec',
						width: 130,
					},
					{
						title: '产品名称',
						key: 'name',
						width: 240,
						render(h, params) {
							return h('div', {
								attrs: {
									class: 'wares'
								}
							}, [

								h('div', {
									attrs: {
										class: 'waresInfo'
									}
								}, [
									h('h3', params.row.name.name)
								])

							])
						}
					},
					{
						title: '规格型号',
						width: 165,
						key: 'spec'
					},
					{
						title: '单位',
						width: 110,
						key: 'spec'
					},
					{
						title: '市场价',
						key: 'prize',
						width: 130,
						sortable: true,
						render(h, params) {
							// return `<span class='prize'>${row.prize}</span>`;
							return h('span', params.row.prize);
						}
					},
					{
						title: '参考成本',
						width: 130,
						key: 'prize',
					},

					{
						title: '库存数量',
						width: 130,
						key: 'inventoryQty',
					},

					{
						title: '状态',
						width: 110,
						key: 'status'
					},
					{
						title: '新增时间',
						width: 240,
						key: 'status'
					},
					{
						title: '操作',
						width: 130,
						key: 'action',
						align: 'center',
						render: (h, params) => {
							/*return `<i-button type="text" size="small" @click="modify(${index},row)">修改</i-button> <i-button type="text" size="small" @click="remove(${index})">删除</i-button>`;*/
							return h('div', [
								h('a', {
									props: {
										size: 'small'
									},
									attrs: {
										class: 'waresa'
									},
									on: {
										click: () => {
											this.modify(params.index, params.row);
										}
									}
								}, '修改'),

							])
						}
					}
				],
				originalGoodsList: [],
				goodsList: [],
				goodsTotalCount: 0,
				// pageCount : 1
				data: {
					catalogId: '',
					status: '',
					name: '',
					pageStart: this.$store.state.goodsListPage,
					pageNums: this.$store.state.pageNums
				}
			}
		},
		methods: {
			//获取选中的对象数据(表格单选框)
			selectFun(selection) {
				console.log(selection);
				this.selArry = selection;
			},
			goodsList_add() {
				let _this = this;
				_this.$router.push('/goodsListtow/add')
			},
			format(labels, selectedData) {
				const _this = this;
				const index = labels.length - 1;
				const datas = selectedData[index] || false;
				if(datas && datas.code) {
					_this.catalogId = datas.id;
					return labels[index]; //+ ' - ' + data.code
				}
				return labels[index];
			},

			query() {

				const _this = this;
				let catalogId;
				if(this.catalog.length > 0) {
					catalogId = this.catalog[this.catalog.length - 1];
				} else {
					catalogId = '';
				}
				if(this.data.status == 3) {
					this.data.status = '';
				}

				_this.$store.commit('goodsListPage', 1);
				this.data.pageStart = 1;
				this.data.catalogId = catalogId;
				this.axios({
						method: 'post',
						url: api.product + api.productByRequset,
						data: api.convertParam(this.data)
					})
					.then(function(res) {
						const data = res.data.datas.rows;
						if(res.data.status == 1) {
							_this.goodsTotalCount = res.data.datas.total;
							_this.originalGoodsList = data;
							if(data.length == 0) {
								_this.goodsList = [];
								return;
							}
							let goods = [];
							data.forEach(function(item, index) {
								goods.push({
									id: item.id,
									name: {
										img: item.imageUrl,
										name: item.name,
										code: item.barCode
									},
									prize: item.price ? item.price : '协商',
									unit: item.unitId,
									qrUrl: item.qrUrl,
									status: item.status == 0 ? '下架' : '上架',
									classify: item.catalogId,
									inventoryQty: item.inventoryQty,
									spec: item.spec
								})
							})
							_this.goodsList = goods;
						}
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			enter(event) {
				console.log(event.keyCode);
				if(event.keyCode == 13) {
					this.query();
				}
			},
			toPage(count) {

				const _this = this;
				const goods = [];
				// _this.pageCount = count;
				_this.$store.commit('goodsListPage', count);

				this.data.pageStart = count;

				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.product + api.productByRequset,
						data: api.convertParam(this.data)
					})
					.then(function(res) {
						console.log(res);
						const data = res.data.datas.rows;
						_this.goodsTotalCount = res.data.datas.total;
						data.forEach(function(item, index) {
							goods.push({
								id: item.id,
								name: {
									img: item.imageUrl,
									name: item.name,
									code: item.barCode
								},
								prize: item.price ? item.price : '协商',
								unit: item.unitId,
								qrUrl: item.qrUrl,
								status: item.status == 0 ? '下架' : '上架',
								classify: item.catalogId,
								inventoryQty: item.inventoryQty,
								spec: item.spec
							})
						})
						_this.goodsList = goods;
						_this.DOM.content.scrollTop = 0;
					})
					.catch(function(err) {
						console.log(err);
					})

			},
				//删除
			del_new() {
				let _this = this;
//				var manager;
//				let froze = [];
				for(let i = 0; i < this.selArry.length; i++) {
					froze.push(this.selArry[i].id);
					manager = this.selArry[i].title;
				}
//				if(manager == '管理员') {
//					_this.$Message.error("不能删除管理员！");
//				} else 
//{
//					this.id = froze.toString();
					console.log(this.id);
					for(var i = 0; i < this.selArry.length; i++) {
						for(var j = 0; j < this.companyArry.length; j++) {
							//判断对象是否相等
							if(JSON.stringify(this.selArry[i]) == JSON.stringify(this.companyArry[j])) {
								//数据绑定//
								let deletes = api.product + this.id + api.productByRequset;
								this.axios(deletes)
									.then(function(res) {

										if(res.data.status == 1) {
											_this.$Message.success('删除成功');
											//											setTimeout(() => {
											//												_this.$router.go(0)
											//											}, 2000);
										} else {
											_this.$Message.error(res.data.message);
										}
									})
									.catch(function(err) {
										console.log(err);
									})

								this.companyArry.splice(j, 1); //删除对象
							}
						}
					}
//				}

			},
			
			
		format(labels, selectedData) {
				const _this = this;
				const index = labels.length - 1;
				const data = selectedData[index] || false;
				if(data && data.code) {
					if(data.name == "全部部门") {
						_this.pageInfo.name = '';
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								 url: api.product + api.productByRequset,
								data: api.convertParam(_this.pageInfo),

							})
							.then(function(res) {
								if(res.data.status == 1) {
									_this.companyArry = res.data.datas.list;
									_this.pageInfo.count = res.data.datas.total;
									_this.pageInfo.rows = res.data.datas.pageSize;
									_this.pageInfo.page = res.data.datas.pageNum;
								}
							})

					} else {
						_this.userInfo.departmentId = data.id;
						_this.userInfo.departmentName = labels[index];
						_this.pageInfo2.department = data.id;
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.subordinate,
								data: api.convertParam(_this.pageInfo2),

							})
							.then(function(res) {
								if(res.data.status == 1) {
									_this.companyArry = res.data.datas.list;
									_this.pageInfo.count = res.data.datas.total;
									_this.pageInfo.rows = res.data.datas.pageSize;
									_this.pageInfo.page = res.data.datas.pageNum;
								}
							})
							.catch(function(error) {
								console.log(error);
							});
						return labels[index]; //+ ' - ' + data.code
					}

				}
				return labels[index];

			},
			remove(index) {
				this.$Modal.confirm({
					content: '确定要删除吗？',
					onOk: () => {
						console.log(index);
						console.log(this.originalGoodsList[index]);
						
						const _this = this;
						const id = this.originalGoodsList[index].id;
						_this.axios(api.product + id + api.productDelete)
							.then(function(res) {
								console.log(res);
								const goods = [];
								_this.axios({
										method: 'post',
										header: {
											"Content-Type": 'application/x-www-form-urlencoded'
										},
										url: api.product + api.productByRequset,
										data: api.convertParam({
											pageStart: _this.pageCount,
											pageNums: _this.$store.state.pageNums
										})
									})
									.then(function(res) {
										console.log(res);
										const data = res.data.datas.rows;
										_this.goodsTotalCount = res.data.datas.total;
										data.forEach(function(item, index) {
											goods.push({
												id: item.id,
												name: {
													img: item.imageUrl,
													name: item.name,
													code: item.barCode
												},
												prize: item.price ? item.price : '协商',
												unit: item.unitId,
												qrUrl: item.qrUrl,
												status: item.status == 0 ? '下架' : '上架',
												classify: item.catalogId,
												inventoryQty: item.inventoryQty,
												spec: item.spec
											})
										})
										_this.goodsList = goods;
										_this.DOM.content.scrollTop = 0;
									})
									.catch(function(err) {
										console.log(err);
									})
							})
							.catch(function(err) {
								console.log(err);
							})
					}
				});

			},
			modify(index, data) {
				this.$router.push({
					name: 'addGoodstow',
					query: {
						id: this.goodsList[index].id
					}
				})
			},

		}
	}
</script>

<style scoped>
	.goodsList .qrUrl {
		width: 80px;
		height: auto;
	}
	
	.ivu-select .ivu-select-dropdown {
		overflow: inherit;
	}
	
	.control {
		margin-top: 20px;
	}
	
	.buttonM {
		margin-right: 10px;
	}
	
	.ivu-table-cell .ivu-table-sort i:first-child {
		top: -1px;
	}
	
	.prize {
		color: red;
	}
	/*.prize:before {
    content : '￥';
}*/
	
	.wares {
		display: flex;
		text-align: center;
	}
	
	.waresa {
		color: #0099cc;
		text-decoration: underline;
	}
	
	.waresa:hover {
		color: #f00;
	}
	
	img.waresimg {
		width: 100% !important;
	}
	
	.wares .waresInfo {
		display: flex;
		width: 240px;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
	
	.wares .waresInfo h3 {
		font-weight: 500;
		margin: 10px 0;
		text-align: center;
	}
	
	.catalogCascader {
		width: 200px;
		display: inline-block;
	}
	
	.spanCol {
		display: inline-block;
		margin: 0 0 0 20px;
	}
	
	.ButCol {
		width: 100px !important;
		margin: 0 0 0 50px !important;
	}
	
	.ivu-select-dropdown {
		overflow: auto;
	}
	
	.qaz {
		width: 980px;
		background: #fff;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		position: absolute;
		top: 50px;
		left: 0;
		bottom: 10px;
		right: 0;
		overflow: hidden;
		overflow-y: scroll;
	}
	
	.mag {
		margin: 20px 0;
	}
	
	.selectdiv {
		margin-bottom: 20px;
		display: flex;
		display: -webkit-flex;
		align-content: center;
		justify-content: space-between;
	}
	
	.selectdiv .select_left,
	.select_right {
		display: flex;
		display: -webkit-flex;
		align-content: center;
		width: auto;
	}
	
	.selectdiv .select_left div {
		width: 106px;
		margin-right: 20px;
		text-align: center;
		border-radius: 0;
	}

	
	.ivu-select-placeholder {
		font-size: 14px!important;
		color: #626262!important;
	}
	
	.selectdiv .select_right .add {
		border: 1px solid #13c19f;
		border-radius: 4px;
		width: 91px;
		height: 34px;
		font-size: 14px;
		margin-left: 30px;
		background-color: #13c19f;
		color: white;
	}
	
	.selectdiv .select_right .add:hover {
		border: 1px solid #00d8ae;
		border-radius: 4px;
		width: 91px;
		height: 34px;
		font-size: 14px;
		margin-left: 30px;
		background-color: #00d8ae;
		color: white;
	}
	
	.selectdiv .select_right .del {
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		color: #333;
		width: 91px;
		height: 34px;
		background-color: white;
		font-size: 14px;
		margin-left: 30px;
	}
	
	.selectdiv .select_right .del:hover,
	.add:hover {
		background-color: #ffff;
		color: #00d8ae;
		border-color: #13c19f;
		cursor: pointer;
	}
	
	.delsc {
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		color: #333;
		width: 91px;
		height: 34px;
		background-color: #FFF;
		font-size: 14px;
		margin-left: 30px;
	}
	
	.delsc:hover {
		border: 1px solid #373d41;
		border-radius: 4px;
		color: #FFF;
		width: 91px;
		height: 34px;
		background-color: #373d41;
		font-size: 14px;
		margin-left: 30px;
	}
	
	.ivu-table td {
		border-right: 1px solid #eee;
	}
	
	.ivu-checkbox-wrapper {
		margin: 0 0 !important;
	}
</style>