<template>
	<div class="shuxingjia">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>产品</Breadcrumb-item>
			<Breadcrumb-item>
				<router-link to='/goodsList'>
					产品列表
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>
				<span class="link_span ok_link" v-if="isModify">产品详情</span><span class="link_span ok_link" v-else>产品新增</span>
			</Breadcrumb-item>
		</Breadcrumb>
		<div class="showGoods">
			<div class="test-1 fileHandle_box">
				<div class="top">
					<vue-qr :text="qrCode" class="qrcode"></vue-qr>
					<div class="top_left">
						<div class="top_left_top">
							<img :src="imgurl_top" />
						</div>
						<div class="top_left_bottom">
							<button @click="goleft"><Icon type="arrow-left-b"></Icon></button>
							<div class="top_left_bottom_lun">
								<div class="pl" v-bind:style="{left: movex +'px',width:plwidth + 'px'}">
									<div v-for="(arr,index) in imgurl_arr">
										<img :src="arr" @click="imgshow(arr)" />
									</div>
								</div>

							</div>
							<button @click="goright"><Icon type="arrow-right-b"></Icon></button>
						</div>
					</div>
					<div class="top_center">
						<ul>
							<li>产品名称： {{name}}</li>
							<li>产品编码： {{code}}</li>
							<li>
								<span>规格型号： {{spec}}</span>
								<span>产品分类： {{catalog}}</span>
							</li>
							<li>
								<span>产品品牌： {{brandName}}</span>
								<span>条形码： {{barCode}}</span>
							</li>
							<li>
								<span>计量单位： {{unitName}}</span>
								<span>库存当前数量： {{inventoryQty}}</span>
							</li>
							<li>
								<span>排序号： {{orderNum}}</span>
								<span>起订量： {{minimumOrderQuantity}}</span>
							</li>
							<li>
								<span>销售价格： {{price}}</span>
								<span>成本价格： {{costPrice}}</span>
							</li>
							<li>
								<span>{{statusCaption}} </span>
								<span>{{canCustomMade}}</span>
							</li>
						</ul>
					</div>
					<div class="top_right"></div>
				</div>

				<div class="bottom">
					<Tabs value="name1">
						<TabPane label="产品详情" name="name1" class='test-1'>
							
							<div id="productDetails">

							</div>
						</TabPane>
						<TabPane label="sku信息" name="name2" class='test-1'>
							<div class="center_table">
								<div class='dzsxdiv'>
									<span class="dzok">支持定制的属性：</span>
									<div>
										<ul>
											<li v-for="(arr,index) in attrList" v-if="attrList[index].canCustomMade==1">
												<button style='padding:3px 8px;border: none;border-radius: 5px 0 0 5px;'>{{arr.attributeName}}</button>
												<!--<span>{{arr.attributeName}}</span>-->
												<!--<span>提示信息：</span>-->
												<span style="display: inline-block;"><Input v-model="arr.customMadeTip" disabled style="border-radius: 0 5px 5px 0;"></Input></span>
											</li>
										</ul>
									</div>
								</div>
								<table border="0" cellspacing="0" cellpadding="0" width="100%">
									<tr>
										<th>主图</th>
										<th v-for='(attr,index) in attrList'>{{attr.attributeName}}</th>
										<th>销售价格</th>
										<th>成本价格</th>
										<th>起订量</th>
										<th>库存初始数据</th>
									</tr>
									<tr v-for='(sku , index) in skus'>
										<td><img :src="sku.imageUrl" /></td>
										<td v-for='attr in sku.productSkuAttributes'>{{attr.attributeValueName}}</td>
										<td>{{sku.price}}</td>
										<td>{{sku.costPrice}}</td>
										<td>{{sku.minimumOrderQuantity}}</td>
										<td>{{sku.inventoryQty}}</td>
									</tr>

								</table>
							</div>
						</TabPane>
						<TabPane label="产品附件" name="name3" class='test-1'>
							<div id="productAnnex">
								<button v-if="attachments.length>0" v-for='(anr,index) in attachments' class="download_btn"><a  href="#" @click="download(anr.url)" download>{{anr.fileName}}</a></button>
							</div>
						</TabPane>
					</Tabs>

				</div>
			</div>
		</div>
		<div class="btn-bot">
			<button class="btn-return" @click="add_back">返回</button>
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
		data() {
			return {
				imgurl_top: '', //顶部图片
				imgurl_arr: [], //图片数组
				movex: 0, //图片轮播位移距离
				plwidth: '', //轮播图外层宽度
				imgnum_now: 1, //轮播图片当前数

				name: '', //衣服名称
				code: '', //衣服编码
				qrCode: '', //产品二维码
				spec: '', //规格型号
				catalog: '', //产品分类
				brandName: '', //衣服品牌
				barCode: '', //条形码
				unitName: '', //计量单位
				inventoryQty: '', //库存当前数量
				orderNum: '', //排序号
				minimumOrderQuantity: '', //起订量
				price: '', //销售价格
				costPrice: '', //成本价格
				statusCaption: '', //上下架状态
				canCustomMade: '', //是否支持定制
				ccm: [], //
				skus: [], //产品属性
				attrList: [],
				description: '', //产品详情
				attachments: [], //附件

			}
		},
		mounted() {
			const _this = this;
			const id = this.$route.query.id;
			//获取产品详情
			_this.axios(api.product + id + api.productQueryById)
				.then(function(res) {
					console.log("start!");
					console.log(res);
					const resdata = res.data.datas;
					var imglength = 0;
					//插入图片数组
					if(resdata.imageUrl != undefined) {
						_this.imgurl_arr.push(resdata.imageUrl);
					}
					if(resdata.images != undefined) {
						for(var images_arr = 0; images_arr < resdata.images.length; images_arr++) {
							_this.imgurl_arr.push(resdata.images[images_arr].url);
							imglength = imglength + 1;
						}

					}
					if(resdata.skus != undefined) {
						for(var images_arr = 0; images_arr < resdata.skus.length; images_arr++) {
							_this.imgurl_arr.push(resdata.skus[images_arr].imageUrl);
							imglength = imglength + 1;
						}
					}
					_this.plwidth = imglength * 130;
					_this.imgurl_top = resdata.imageUrl;

					_this.name = resdata.name; //衣服名称
					_this.code = resdata.code; //衣服编码
					_this.qrCode = resdata.qrCode; //衣服二维码
					_this.spec = resdata.spec; //规格型号
					_this.catalog = resdata.catalogName; //产品分类
					_this.brandName = resdata.brandName; //衣服品牌
					_this.barCode = resdata.barCode; //条形码
					_this.unitName = resdata.unitName; //计量单位
					_this.inventoryQty = resdata.inventoryQty; //库存当前数量
					_this.orderNum = resdata.orderNum; //排序号
					_this.minimumOrderQuantity = resdata.minimumOrderQuantity; //起订量
					_this.price = resdata.price; //销售价格
					_this.costPrice = resdata.costPrice; //成本价格
					_this.statusCaption = resdata.statusCaption; //上下架状态
					_this.skus = resdata.skus, //产品属性
						_this.attrList = resdata.attributes;
					document.getElementById("productDetails").innerHTML = resdata.description; //产品详情
					_this.attachments = resdata.attachments; //附件

					//判断是否支持定制
					if(resdata.canCustomMade == 1) {
						_this.canCustomMade = "支持定制";
					} else {
						_this.canCustomMade = "不支持定制";
					}

				})
				.catch(function(err) {
					console.log(err);
				})

		},
		methods: {
			add_back() { //返回按钮
				const _this = this;
				_this.$router.push('/goodsList');
			},
			imgshow(arr) { //点击图片改变上方图片
				const _this = this;
				_this.imgurl_top = arr;
			},
			goright() { //图片右移
				const _this = this;
				if(_this.imgnum_now == _this.imgurl_arr.length - 2) {

				} else {
					_this.movex = _this.movex - 80;
					_this.imgnum_now = _this.imgnum_now + 1;
				}

			},
			goleft() { //图片左移
				const _this = this;
				if(_this.imgnum_now == 1) {

				} else {
					_this.movex = _this.movex + 80;
					_this.imgnum_now = _this.imgnum_now - 1;
				}
			},
			download(index) {
				const _this = this;
				window.open(index);
			}
		}
	}
</script>
<style type="text/css">
	.shuxingjia .qrcode {
		width: 60px;
		height: 61px;
		display: inline-block;
		position: absolute;
		right: 41px;
		top: 15px;
	}
	
	.shuxingjia .qrcode:hover {
		cursor: pointer;
	}
	
	.shuxingjia .qrcode img {
		width: 61px;
		height: 61px;
	}
	
	.center_table ul li input {
		border-radius: 0 5px 5px 0;
	}
</style>
<style scoped>
	.fileHandle_box {
		position: absolute;
		top: 42px;
		left: 2px;
		right: 2px;
		bottom: 80px;
		background-color: #fff;
		z-index: 999;
		padding: 20px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		overflow: hidden;
		overflow-y: scroll;
		min-width: 1100px;
	}
	
	.top {
		display: flex;
		border-bottom: 1px solid #ddd;
		margin-bottom: 30px;
		padding-bottom: 10px;
	}
	
	.top_left {
		width: 400px;
		margin-right: 30px;
	}
	
	.top_left .top_left_top,
	.top_left_bottom {
		width: 400px;
		overflow: hidden;
	}
	
	.top_left_top {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
		overflow: hidden;
	}
	
	.top_left_top img {
		height: 210px;
	}
	
	.top_left_bottom {
		height: 100px;
		display: flex;
		align-items: center;
	}
	
	.top_left_bottom button {
		width: 40px;
		border: none;
		height: 100px;
		border-radius: 50%;
		height: 40px;
		font-size: 20px;
		outline: none;
		margin: 0 5px;
	}
	
	.top_left_bottom_lun {
		display: flex;
		width: 360px;
		height: 100px;
		overflow: hidden;
		position: relative;
	}
	
	.pl {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		height: 100px;
		display: flex;
	}
	
	.top_left_bottom_lun .pl div {
		width: 70px;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}
	
	.top_left_bottom_lun .pl div:hover img {
		border: 1px solid red;
	}
	
	.top_left_bottom_lun img {
		width: 70px;
		height: 70px;
	}
	
	.top_center {
		padding: 10px 0;
		position: absolute;
		left: 450px;
		right: 100px;
		top: 10px;
	}
	
	.top_center ul {
		display: flex;
		flex-direction: column;
	}
	
	.top_center ul li {
		font-size: 14px;
		margin-bottom: 15px;
		color: #3a3a3a;
		padding: 0 10px;
	}
	
	.top_center ul li:first-child {
		font-size: 21px;
		color: black;
		border-bottom: 1px solid #ddd;
		padding: 10px;
		background: #f5f5f5;
	}
	
	.top_center ul li span:first-child {
		width: 300px;
		display: inline-block;
	}
	
	.top_center ul li:last-child span:last-child {
		color: #ca141d;
	}
	
	.top_center ul li:last-child span:first-child {
		width: 50px;
		color: #2d8cf0;
	}
	
	.dzsxdiv {
		display: flex;
		margin-bottom: 10px;
	}
	
	.center_table .dzok {
		padding-left: 10px;
		font-size: 16px;
	}
	
	.center_table ul li {
		padding-left: 10px;
		margin-bottom: 10px;
		font-size: 16px;
		display: flex;
	}
	
	.center_table ul li span:first-child {
		margin-right: 20px;
	}
	
	table {
		overflow: hidden;
		overflow-y: scroll;
		margin-bottom: 20px;
		border-color: #eeeeee;
	}
	
	table tr th {
		text-align: center;
		height: 50px;
		background: #eef1f9;
	}
	
	table tr td {
		text-align: center;
		height: 30px;
		border-bottom: 1px solid #e9eaec;
	}
	
	table tr td:first-child {
		width: 80px;
		height: 50px;
	}
	
	table tr td:first-child img {
		width: 50px;
		height: 50px;
		margin-top: 5px;
	}
	
	.download_btn {
		padding: 5px;
		margin-right: 20px;
	}
</style>