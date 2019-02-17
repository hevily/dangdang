<template>
	<div class="modifyPsw">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>产品</Breadcrumb-item>
			<Breadcrumb-item>产品列表</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Row>
                <Col span="20" class="select_left">
                    <Cascader class="cas_dev" placeholder="全部" size="large" v-model='data.catalog' :data="CatalogList" :render-format="format" change-on-select style="width:150px;display: inline-block;"></Cascader>
                    <Select v-model="data.status" @keyup.native='enter($event)' class="select_dev">
                        <Option v-for="item in statusList" :value="item.value" :key="item" @click.native='query'>{{ item.label }}</Option>
                    </Select>
                    <input class="search-input" type="text" placeholder="请输入产品的名称/编码/关键字" v-model='data.name'/>
                    <button class="search-btn" @click='query2'><Icon type="search"></Icon></button>
                    <i-switch size="large" v-model='sku_change' @on-change="show_skuscode" style="margin-left: 20px;">
                        <span slot="open">sku</span>
                        <span slot="close">产品</span>
                    </i-switch>
                </Col>
				<Col span="4">
					<div class="btn-box-right">
						<button class="btn-new" @click.stop='addRoot'>新增</button>
					</div>
				</Col>
			</Row>
			<div>
				<Table :columns="columnsInfo" border :data="goodsList" ref="table"></Table>
				<div v-show='showpro' class='nopro'>还没有您要的产品哦！</div>
				<!--<Table size="small" class="tbClass" highlight-row border :row-class-name="tableClassName" :columns="columnsInfo" :data="companyArry" @on-select="selectFun" ref="selection"></Table>-->
			</div>
		</div>
        <div class="page-bot">
            <Page :total="goodsTotalCount" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
        </div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
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
	</div>

</template>
<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			tis: tis
		},

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

					_this.CatalogList = res.data.datas;

				})
				.catch(function(err) {
					console.log(err);
				})

			_this.axios({
					method: 'post',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
					},
					url: api.product + api.productByRequset,
					data: api.convertParam({
						pageNum: _this.$store.state.goodsListPage,
						pageSize: _this.$store.state.pageNums
					})
				})
				.then(function(res) {
					const data = res.data.datas.rows;

					_this.goodsTotalCount = res.data.datas.total;
					_this.originalGoodsList = data;
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
				re_do: '',
				do_yn: false,
				do_no: false,

				sku_change: false, //skus编码开关
				skutype: '0',
				showpro:false,

				switch1: false, //switch1开关
				delModel: false,

				delid: '', //需要删除的id

				searchwhat: '',

				Cascaderval: [],
				Cascaderval2: [],
				departmentId: '',
				id: '',
				pageInfo: {
					name: '',
					count: 10,
					page: 1, //page
					rows: 10 //rows
				},

				//				新
				DOM: {},
				CatalogList: [],
				catalog: [],
				catalog2: [],
				aaa: '2018-3-15 14:10"1',
				statusList: [{
						value: '3',
						label: '全部'
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
				originalGoodsList: [],
				goodsList: [],
				goodsTotalCount: 0,
				// pageCount : 1
				data: {
					catalogId: '',
					status: '3',
					name: '',
					pageNum: this.$store.state.goodsListPage,
					pageSize: this.$store.state.pageNums,
					type: '0'
				},
				columnsInfo: [
					{
						title: '编码',
						key: 'code',
						width: 200,
					},
					{
						title: '产品图片',
						key: 'img',
						width: 100,
						render: (h, params) => {
							return h('div', [
								h('img', {
									attrs: {
										class: 'waresimg',
										style: 'width:57px',
										src: params.row.name.img
									},
									on: {
										click: () => {
											this.lookshow2(params.row.id);
										}
									}
								})
							])
						}
					},
					{
						title: '产品名称',
						key: 'name',
						width: 200,
						render(h, params) {
							return h('div', {attrs: {class: 'wares'}}, [
								h('div', {attrs: {class: 'waresInfo'}}, [
                                    h('h3', params.row.name.name)
								])
							])
						}
					},
					{
						title: '规格型号',
						width: 100,
						key: 'spec'
					},
					{
						title: '计量单位',
						width: 100,
                        key: 'unitId',
					},
					{
						title: '当前库存',
						width: 100,
						key: 'inventoryQty'
					},
					{
						title: '状态',
                        width: 60,
                        align: 'center',
						key: 'status'
					},
					{
						title: '操作',
						width: 230,
						key: 'action',
                        align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {size: 'small'},
									on: {
										click: () => {
											this.modify(params.index, params.row);
										}
									}
								}, '修改'),
								h('Button', {
									props: {size: 'small'},
									on: {
										click: () => {
											this.delshow(params.index);
										}
									}
								}, '删除'),
								h('Button', {
									props: {size: 'small'},
									on: {
										click: () => {
											this.lookshow(params.index, params.row);
										}
									}
								}, '详情')

							])
						}
					}
				],
				companyArry: []
			}
		},
		methods: {
			show_skuscode() { //展示skus编码
				const _this = this;
				const goods = [];

				if(_this.sku_change) {
					_this.data.type = 1;
				} else {
					_this.data.type = 0;
				}

				setTimeout(function() {
					_this.axios({
							method: 'post',
							header: {"Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'},
							url: api.product + api.productByRequset,
							data: api.convertParam(_this.data)
						})
						.then(function(res) {
							const data = res.data.datas.rows;

							if(res.data.datas.total == 0) {
								_this.goodsTotalCount = 0;
								_this.originalGoodsList = [];
								_this.goodsList = [];
								_this.showpro = true;
							} else {
								_this.showpro = false;
								_this.goodsTotalCount = res.data.datas.total;
								_this.originalGoodsList = data;
								data.forEach(function(item, index) {
									goods.push({
										id: item.id,
										name: {img: item.imageUrl,name: item.name,},
										code: item.code,
										unitId: item.unitName,
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
				}, 100)

			},
			addRoot() {
				let _this = this;
				_this.$router.push('/goodsList/add');
			},

			//获取选中的对象数据(表格单选框)
			selectFun(selection) {
				this.selArry = selection;
			},

			search_message_name() {
				let _this = this;
				_this.axios({
						method: 'post',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						url: api.subordinate,
						data: api.convertParam(_this.pageInfo),
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.companyArry = res.data.datas.list;
							_this.pageInfo.count = res.data.datas.total;
							_this.pageInfo.rows = res.data.datas.pageSize;
							_this.pageInfo.page = res.data.datas.pageNum;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;
							}, 2000);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			search_message_phone() {
				let _this = this;
				_this.axios({
						method: 'post',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						url: api.subordinate,
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
					.catch(function(error) {
						console.log(error);
					});
			},
			search_message_status(index) {
				let _this = this;
				_this.pageInfo.status = _this.cityList2;
				_this.axios({
						method: 'post',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						url: api.subordinate,
						data: api.convertParam(_this.pageInfo),
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.companyArry = res.data.datas.list;
							_this.pageInfo.count = res.data.datas.total;
							_this.pageInfo.rows = res.data.datas.pageSize;
							_this.pageInfo.page = res.data.datas.pageNum;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			pageFun(x) {
				const _this = this;
				_this.pageInfo.page = x;
				_this.axios({
						method: 'post',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						url: api.companyQuery,
						data: api.convertParam(_this.pageInfo),
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.companyArry = res.data.datas.list;
							_this.pageInfo.count = res.data.datas.total;
							_this.pageInfo.rows = res.data.datas.pageSize;
							_this.pageInfo.page = res.data.datas.pageNum;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			goodsList_add() {
				let _this = this;
				_this.$router.push('/goodsList/add')
			},

			//获取选中的对象数据(表格单选框)
			selectFun(selection) {
				this.selArry = selection;
			},
			goodsList_add() {
				let _this = this;
				_this.$router.push('/goodsList/add')
			},
			format(labels, selectedData) {
				const _this = this;
				const index = labels.length - 1;
				const datas = selectedData[index] || false;

				if(_this.data.status == 3) {
					_this.data.status = '';
				}
				_this.$store.commit('goodsListPage', 1);
				_this.data.pageNum = 1;

				if(datas && datas.code) {

					_this.data.catalogId = datas.id;
					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
							},
							url: api.product + api.productByRequset,
							data: api.convertParam(_this.data)
						})
						.then(function(res) {
							const data = res.data.datas.rows;

							if(res.data.datas.total == 0) {
								_this.goodsTotalCount = 0;
								_this.originalGoodsList = [];
								_this.goodsList = [];
								_this.showpro = true;
							} else {
								_this.showpro = false;
								_this.goodsTotalCount = res.data.datas.total;
								_this.originalGoodsList = data;
								var goods = [];

								if(data != null) {
									data.forEach(function(item, index) {
										goods.push({
											id: item.id,
											name: {img: item.imageUrl,name: item.name,},
											code: item.code,
											unitId: item.unitName,
											prize: item.price ? item.price : '协商',
											unit: item.unitId,
											qrUrl: item.qrUrl,
											status: item.status == 0 ? '下架' : '上架',
											classify: item.catalogId,
											inventoryQty: item.inventoryQty,
											spec: item.spec
										})
									})
								}
								_this.goodsList = goods;
							}
						})
						.catch(function(err) {
							console.log(err);
						})

					return labels[index]; //+ ' - ' + data.code
				}
				return labels[index];
			},

			query() {
				const _this = this;
				let catalogId;
				if(_this.catalog.length > 0) {
					catalogId = _this.catalog[_this.catalog.length - 1];
				} else {
					catalogId = '';
				}
				if(_this.data.status == 3) {
					_this.data.status = '';
				}
				_this.$store.commit('goodsListPage', 1);
				_this.data.pageNum = 1;
				_this.data.catalogId = catalogId;

				_this.axios({
						method: 'post',
						url: api.product + api.productByRequset,
						data: api.convertParam(_this.data)
					})
					.then(function(res) {
						const data = res.data.datas.rows;

						if(res.data.status == 1) {
							if(res.data.datas.total == 0) {
								_this.goodsTotalCount = 0;
								_this.originalGoodsList = [];
								_this.goodsList = [];
								_this.showpro = true;

							} else {
								_this.showpro = false;
								_this.goodsTotalCount = res.data.datas.total;
								_this.originalGoodsList = data;

								if(_this.goodsTotalCount == 0) {
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
										},
										code: item.code,
										unitId: item.unitName,
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
						}
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			query2() {
				const _this = this;
				_this.$store.commit('goodsListPage', 1);
				this.data.pageNum = 1;

				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
						},
						url: api.product + api.productByRequset,
						data: api.convertParam(_this.data)
					})
					.then(function(res) {
						if(res.data.datas.total == 0) {
							_this.goodsTotalCount = 0;
							_this.originalGoodsList = [];
							_this.goodsList = [];
							_this.showpro = true;
						} else {
							_this.showpro = false;
							const data = res.data.datas.rows;
							_this.goodsTotalCount = res.data.datas.total;
							_this.originalGoodsList = data;
							var goods = [];

							if(data != null) {
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
										qrUrl: item.qrUrl,
										status: item.status == 0 ? '下架' : '上架',
										classify: item.catalogId,
										inventoryQty: item.inventoryQty,
										spec: item.spec
									})
								})
							}
							_this.goodsList = goods;
						}
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			enter(event) {
				if(event.keyCode == 13) {
					this.query();
				}
			},
			toPage(count) {
				const _this = this;
				const goods = [];
				_this.$store.commit('goodsListPage', count);

				this.data.pageNum = count;

				_this.axios({
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
			delshow(index) {
				const _this = this;
				this.delModel = true;
				_this.delid = _this.originalGoodsList[index].id;
			},
			del(index) {
				const _this = this;
				_this.axios(api.product + _this.delid + api.productDelete)
					.then(function(res) {
						const goods = [];
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.product + api.productByRequset,
								data: api.convertParam({
									pageNum: _this.$store.state.goodsListPage,
									pageSize: _this.$store.state.pageNums,
									type: _this.data.type
								})
							})
							.then(function(res) {

								if(res.data.datas.total == 0) {
									_this.goodsTotalCount = 0;
									_this.originalGoodsList = [];
									_this.goodsList = [];
									_this.showpro = true;

								} else {
									_this.showpro = false;
									const data = res.data.datas.rows;
									_this.goodsTotalCount = res.data.datas.total;
									_this.originalGoodsList = data;

									if(data == null) {

									} else {
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
												qrUrl: item.qrUrl,
												status: item.status == 0 ? '下架' : '上架',
												classify: item.catalogId,
												inventoryQty: item.inventoryQty,
												spec: item.spec
											})
										})

									}
									_this.goodsList = goods;
								}

								_this.DOM.content.scrollTop = 0;
								_this.delModel = false;
							})
							.catch(function(err) {
								console.log(err);
							})
					})
					.catch(function(err) {
						console.log(err);
					})

			},
			switch1change() {
				let _this = this;
				_this.switch1 = !_this.switch1;
			},
			modify(index, data) {
				this.$router.push({
					name: 'addGoods',
					query: {
						id: this.goodsList[index].id
					}
				})
			},
			lookshow(index, data) {
				this.$router.push({
					name: 'showGoodstow',
					query: {
						id: this.goodsList[index].id
					}
				})
			},
			lookshow2(index) {
				this.$router.push({
					name: 'showGoodstow',
					query: {
						id: index
					}
				})
			},
			cancel() {
				this.delModel = false;
			}

		}
	}
</script>
<style scoped>
	.three_span {
		border-bottom: 1px solid #ccd9e6;
		padding: 0px 0 20px 0;
		margin-bottom: 20px;
	}
	
	.three_span span {
		margin-right: 80px;
		font-size: 16px;
	}
	
	.three_span span:hover {
		color: #0083c0;
		cursor: pointer;
	}
	
	.select_left {
		display: flex;
		display: -webkit-flex;
		align-content: center;
		align-items: center;
	}
	
	.select_left div {
		width: 106px;
		margin-right: 20px;
		text-align: center;
		border-radius: 0;
	}
	
	.ivu-select-placeholder {
		font-size: 14px!important;
		color: #626262!important;
	}
	
	.add {
		border: 1px solid #00a8ff;
		border-radius: 4px;
		width: 91px;
		height: 34px;
		font-size: 14px;
		margin-left: 30px;
		background-color: #00a8ff;
		color: white;
	}
	
	.del {
		border: 1px solid #3bbcff;
		border-radius: 4px;
		color: #0a96df;
		width: 91px;
		height: 34px;
		background-color: white;
		font-size: 14px;
		margin-left: 30px;
	}
	
	.del:hover, .add:hover {
		background-color: #3abcff;
		color: white;
		border-color: #3abcff;
		cursor: pointer;
	}
	
	.table_title {
		background-color: #3bbcff;
		color: white;
	}
	
	.dev_table {
		width: 100%;
	}
	
	.dev_table tr th {
		background-color: #3bbcff;
		color: white;
		width: 12vw;
		height: 40px;
		font-weight: normal!important;
		font-size: 14px;
	}
	
	.dev_table tr td {
		width: 12vw;
		height: 50px;
		text-align: center;
		border-bottom: 1px solid #d8e1ea;
		font-size: 14px;
		position: relative;
		font-weight: normal!important;
	}
	
	.dev_table tr td span {
		color: #0a96df;
	}
	
	.dev_table tr td span:hover {
		cursor: pointer;
	}
	
	.dev_table tr td label {
		position: absolute;
		cursor: pointer;
		left: 0;
	}
	
	.dev_table tr td label input {
		cursor: pointer;
		opacity: 0;
		position: absolute;
	}
	
	.dev_table tr td label input:checked+.show-box {
		background: #15afff;
	}
	
	.dev_table tr td label .show-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 17px;
		height: 17px;
		border-radius: 2px;
		border: 1px solid #d8d8d8;
		background: white;
	}
	
	.dev_table tr td label .show-box:before {
		content: '';
		position: absolute;
		top: 2px;
		left: 4px;
		width: 7px;
		height: 9px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	.Bread_ri {
		position: absolute;
		top: 12px;
		right: 3px;
		display: flex;
		margin-right: 30px;
	}
	
	.Bread_ri div {
		display: flex;
		align-items: center;
		margin-left: 20px;
	}
	
	.Bread_ri div:hover {
		cursor: pointer;
	}
	
	.Bread_ri div img {
		width: 14px;
		height: 14px;
		margin-right: 5px;
	}
	
	.cas_dev div div input {
		height: 32px!important;
	}
	
	.sel_sta {
		width: 106px;
		height: 32px;
		margin-right: 20px;
		font-size: 14px;
		color: #495060;
		border: 1px solid #e1e7f6;
		border-radius: 5px;
		padding: 0 7px;
	}
	
	.sel_sta:hover {
		border-color: #269edc;
	}
	
	.cas_dev div div span .ivu-cascader-menu {
		height: auto!important;
		max-height: 180px!important;
		background-color: #fff;
		box-shadow: 0 0 5px 1px #eeeeee;
	}
	
	::-webkit-input-placeholder {
		/* WebKit, Blink, Edge */
		color: #ccd9e6!important;
	}
	
	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #ccd9e6!important;
	}
	
	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #ccd9e6!important;
	}
	
	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #ccd9e6!important;
	}
	
	.managertable td:nth-child(2) {
		background-color: #2d8cf0!important;
	}
	
	.wrokertable td button {
		display: none!important;
	}
	
	.ivu-checkbox-wrapper {
		margin-right: 0!important;
	}
	
	.waresa:hover {
		color: #f00;
	}
	
	.nopro {
		position: absolute;
		top: 50px;
		background-color: white;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50px;
		z-index: 100;
	}
</style>