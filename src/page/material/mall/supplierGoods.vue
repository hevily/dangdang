<template>
	<div class="clientClassify">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>物料信息</Breadcrumb-item>
			<Breadcrumb-item>物料商城</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
				<div class="div_form">
					<Form :model="supplierForm" :label-width="60" inline class="supplierSearch">
						<!--<Form-item label="供应商">-->
						<span class="spanmar">供应商</span>
						<Select v-model="supplierForm.supplierName" style="width:200px" @on-change="queryList">
							<Option v-for="item in supplierForm.supplier" :value="item.id" :key="item">{{ item.supplierName }}</Option>
						</Select>
						<!--<Select v-model="model1" style="width:200px">-->
						<!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
						<!--</Select>-->
						<!--</Form-item>-->
						<!--<Form-item label="物料">-->
						<span class="spanmar">供应商产品</span>
						<Cascader :data="supplierForm.category" v-model="supplierForm.categorySel" style='width:200px;display: inline-block;' :render-format="format" change-on-select></Cascader>
						<!--<Select v-model="supplierForm.categorySel" style="width:200px">
							<Option v-for="item in supplierForm.category" :value="item.categoryValue" :key="item">{{ item.categoryName }}</Option>
						</Select>-->
						<!--</Form-item>-->
						<!--<Form-item label="关键词" :label-width="80">-->
						<!--<span class="spanmar">关键词</span>
						<Input v-model="supplierForm.keywords" placeholder="请输入" style="width:200px;"></Input>-->
						<!--</Form-item>
					<Form-item>-->
						<!--<Button type="primary" @click="queryList">搜索</Button>-->
						<!--</Form-item>-->
					</Form>
				</div>
				<ul class="supplierList">
					<li v-for="(item,index) in supplierProduct" :title="item.name" :key="index">
						<div class="lbox">
							<div class="product-item" @click="showInfo(item.id)">
								<div class="product-itemimg">
									<img :src='item.imageUrl' v-if='item.showpic'>
									<vue-qr :text="item.qrCode" class="qrImg" v-else></vue-qr>
									<div class="eyeshow" v-if='item.showpic' @click.stop='click_showqr(index)'>
										<Icon type="eye"></Icon>
									</div>
									<div class="eyeshow" v-else @click.stop='click_showqr(index)'>
										<Icon type="eye-disabled"></Icon>
									</div>
								</div>
								<div class='product_message'>
									<p class="price"><em>￥</em>{{item.price}}</p>
									<p>{{item.name}}</p>
									<p><span>库存:{{item.inventoryQty}}个</span></p>
									<p :title="item.supplierName">{{item.supplierName}}</p>
									<p :title="item.supplierName">{{item.corpName}}</p>
								</div>
							</div>
						</div>
					</li>
				</ul>
		</div>
        <div class="page-bot">
            <Page :total="pageInfo.count" :current="pageInfo.pageNum" :page-size="pageInfo.pageSize" show-elevator @on-change="pageFun"></Page>
        </div>
	</div>
</template>
<script>
	import api from '@/api/api'
	import VueQr from 'vue-qr'
	export default {
		components: {
			VueQr
		},
		name: 'supplierGoods',
		data() {
			return {
				cityList: [{
						value: 'New York',
						label: 'New York'
					},
					{
						value: 'London',
						label: 'London'
					},
				],
				model1: '',
				proid: "11111111111111",
				show: false,
				pageInfo: {
					supplierId: '',
					name: '',
					count: 10,
					pageSize: 10,
					pageNum: 1
				},
				supplierForm: {
					supplier: [{
							supplierId: '',
							supplierName: '联想'
						},
						{
							supplierId: '',
							supplierName: '华为'
						},
					],
					category: [{
							categoryValue: 'suliao',
							categoryName: '塑料'
						},
						{
							categoryValue: 'suliao1',
							categoryName: '塑料11'
						},
					],
					supplierName: '',
					categorySel: '',
					keywords: "",
					switch: false
				},
				supplierProduct: [
				]
			}
		},
		created() {
			const _this = this;
			//加载供应商数据
			_this.axios({
					method: 'GET',
					url: '/api/supplier/main/queryAll.do'
					// url: '/api/supplier/main/queryAll.do'
				})
				//	this.axios(api.supplierInfo)
				.then(function(res) {
					_this.supplierForm.supplier = res.data.datas.rows;
				})
				.catch(function(err) {
					alert("0---1");
					alert(err);
				});
			//加载供应商产品
			_this.axios({
					method: 'post',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: api.supplierQuery,
					data: api.convertParam(_this.pageInfo),
				})
				.then(function(res) {
					_this.supplierProduct = res.data.datas.rows;
					if(_this.supplierProduct != null) {
						for(var slp = 0; slp < _this.supplierProduct.length; slp++) {
							_this.supplierProduct[slp].showpic = true;
						}
					}
					_this.pageInfo.count = res.data.datas.total;
				})
		},
		methods: {
			format(labels, selectedData) {
				const _this = this;
				const index = labels.length - 1;
				const datas = selectedData[index] || false;
				_this.pageInfo.pageNum = 1;
				_this.pageInfo.catalogId = datas.id;
				if(datas && datas.code) {

					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.supplierQuery,
							data: api.convertParam(_this.pageInfo)
						})
						.then(function(res) {
							_this.supplierProduct = res.data.datas.rows;
							if(_this.supplierProduct != null) {
								for(var slp = 0; slp < _this.supplierProduct.length; slp++) {
									_this.supplierProduct[slp].showpic = true;
								}
							}
							_this.pageInfo.count = res.data.datas.total;

						})
				}
				return labels[index];
			},
			showInfo(id) {
				this.proid = id;
				this.$router.push({
					path: '/supplierGoods/info',
					query: {
						id: id
					}
				});
			},
			//查询
			queryList() {
				const _this = this;
				_this.pageInfo.pageNum = 1;
				_this.pageInfo.supplierId = _this.supplierForm.supplierName;
				_this.pageInfo.name = _this.supplierForm.keywords;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.supplierQuery,
						data: api.convertParam(_this.pageInfo)
					})
					.then(function(res) {
						_this.supplierProduct = res.data.datas.rows;
						if(_this.supplierProduct != null) {
							for(var slp = 0; slp < _this.supplierProduct.length; slp++) {
								_this.supplierProduct[slp].showpic = true;
							}
						}
						_this.pageInfo.count = res.data.datas.total;

						_this.axios({
								method: 'get',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.rootProductCatalog + _this.pageInfo.supplierId + '/9999/' + api.searchClassification,

							})
							.then(function(res) {
								_this.supplierForm.category = res.data.datas;
							})
					})
			},
			//供应商查询
			supplierFun(value) {
				console.log(value);
			},

			pageFun(x) {
				const _this = this;
				_this.pageInfo.pageNum = x;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.supplierQuery,
						data: api.convertParam(_this.pageInfo),
					})
					.then(function(res) {
						_this.supplierProduct = res.data.datas.rows;
						if(_this.supplierProduct != null) {
							for(var slp = 0; slp < _this.supplierProduct.length; slp++) {
								_this.supplierProduct[slp].showpic = true;
							}
						}
						//_this.pageInfo.count = res.data.datas.total;
					})
			},
			//显示隐藏二维码图片
			showQrimg(event) {
				event.target.getElementsByClassName("qrImg")[1].style.display = "block";
			},
			hideQrimg(event) {
				event.target.getElementsByClassName("qrImg")[1].style.display = "none";
			},
			click_showqr(index) { //点击展示二维码
				const _this = this;
				var nowcs = _this.supplierProduct;
				_this.supplierProduct = [];
				nowcs[index].showpic = !nowcs[index].showpic;
				_this.supplierProduct = nowcs;
			},
		}
	}
</script>
<style type="text/css">
	.clientClassify .qrImg img {
		width: 180px;
		height: 180px;
	}
</style>
<style scoped>
	.div_form {
		border-bottom: 1px solid #eee;
		padding: 0 0 10px 0;
		margin: 0 0 10px 0;
	}
	
	.supplierForm .ivu-row {
		padding-top: 40px;
		clear: both;
	}
	
	.supplierForm .ivu-form-item {
		width: auto;
	}
	
	.product-item {
		margin-bottom: 30px;
		border:1px solid #ddd;
		width: 182px;
		height: ;
	}
	
	.product-item img {
		display: block;
		width: 180px;
		height: 180px;
		margin: 0 auto;
	}
	
	.product-item .qrImg {
		width: 180px;
		height: 180px;
		position: absolute;
		left: 0;
		toP: 0;
	}
	.product-item .product_message{
		background-color:#f4f4f4;
		padding: 5px;
		height: 100px;
	}
	.product-item .product_message p {
		padding: 0 8px;
		
		font-family: "微软雅黑";
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		color: #999;
		font: 14px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
	}
	
	.product-item .price {
		padding: 0 4px;
		font-size: 20px!important;
		color: #ff5000!important;
		
	}
	
	.product-item .price span {
		float: right;
		margin-top: 8px;
		color: #333;
		font-size: 12px;
	}
	
	.product-item .price em {
		font-style: normal;
		font-size: 14px;
	}
	
	.product-itemimg {
		display: block;
		height: 180px;
		width: 180px;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
        border: 1px solid transparent;
	}
	
	.product-itemimg i {
		font-size: 30px;
	}
	
	.product-itemimg:hover {
		border: 1px solid deepskyblue;
	}
	
	.supplierSearch.ivu-form .ivu-switch-inner,
	.supplierSearch.ivu-form .ivu-form-item-label {
		font-size: 14px;
	}
	
	.supplierSearch .ivu-switch-large {
		width: 75px;
	}
	
	.supplierSearch .ivu-switch-large.ivu-switch-checked:after {
		left: 49px;
	}
	
	.supplierList .ivu-col {
		height: 350px;
	}
	
	/* .supplierList {
		position: absolute;
		left: 20px;
		right: 0px;
		top: 64px;
		bottom: 50px;
		overflow-y: scroll;
		padding-top: 10px;
	} */
	.supplierList li {
		height: 312px;
		float: left;
		padding: 0 10px;
	}
	
	.supplierList li .lbox {
		width: 182px;
		/*margin: 0 auto;*/
		padding-bottom: 4px;
		border: 1px solid #fff;
	}
	
	.supplierList li:hover {
		/*border: 1px solid #ff4400;*/
	}
	
	.spanmar {
		margin-left: 20px;
		margin-right: 20px;
	}
	
	.eyeshow {
		position: absolute;
		right: 5px;
		bottom: 5px;
	}
</style>