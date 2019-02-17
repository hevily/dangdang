<template>
	<div class="goodsInfo">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>物料信息</Breadcrumb-item>
			<Breadcrumb-item>物料商城</Breadcrumb-item>
		</Breadcrumb>
		<div class='right_home_warp-nobot test-1'>
			<Row>
				<Col span="8">
				<div class="proBigimg"><img :src=proInfo.imageUrl @mouseenter="showbigImg" @mousemove="moveimg"></div>
				<div class="proScaleimg" :style="{display:scaleimgInfo.display}"><img :src=proInfo.imageUrl :style="{left:scaleimgInfo.left}"></div>
				<div class="smallImg">
					<span class="goL"></span>
					<span class="goR"></span>
					<div class="imgItem" v-for="(item,index) in smallImg" :key="index">
						<img :src="smallImg[index].url" @mouseenter="imgFun(index)" :class="{active:index==hindex}">
					</div>
				</div>
				</Col>
				<Col span="16" class="imgright">
				<Form class="proForm">
					<div class="proTit">{{proInfo.name}}</div>
                    <p></p>
					<div class="proPrice"><span>价格：</span>￥ {{proInfo.price}}</div>
					<div v-for="(item,index) in proAttr" :key="index">
						<Form-item :label="item.attributeName+'：'" class="radioColor" style="width:100%">
							<RadioGroup  type="button" v-for="(subitem,idx) in proAttr[index].productAttributeValues" v-model="proAttrInit[index]" @on-change="radioFun(proAttrInit[index])" :key="idx">
								<Radio :label="subitem.name" :disabled="show[index][idx] == 'no' ? true : false" :class="{'sel':allAttr[index][idx] == proAttrInit[index]}"></Radio>
							</RadioGroup >
						</Form-item>
					</div>
                    <Form-item label="数量：" class="proinfoNum" style="width:100%">
						<span class="minuse" @click="minuseNum">-</span>
						<Input v-model="num" style="width: 50px" @on-change="changeNum"></Input>
						<span class="add" @click="addNum">+</span>
						<span class="unit">{{proInfo.unitName}}</span>
					</Form-item>

					<div class="descripe">
                        {{description}}
						<Form-item label="加工备注">
							<Input type="textarea" v-model="description" :rows="4" :maxlength="500" placeholder="最多只能输入500个字" style="width:430px"></Input>
						</Form-item>
					</div>
					
					<div class="proTotalnum">
						<!--{{unitName}}-->
						<span class="totalMoney">合计金额:<i>￥{{selMoney}}</i></span>
					</div>
					<div class="proHandle">
						<Button size="large" class="addBuy" @click.native="jionplanFun">加入采购计划</Button>
					</div>
				</Form>
				</Col>
			</Row>
			<Tabs :animated="false" class="proInfo">
				<Tab-pane label="产品详情">
					<Row class="xqrow">
						<Col span="12">
						<span class="colspan_xq">产品名称：{{proInfo.name}}</span>
						</Col>
						<Col span="12">
						<span>产品编码：{{proInfo.code}}</span>
						</Col>
						<Col span="12">
						<span class="colspan_xq">规格型号：{{proInfo.spec}}</span>
						</Col>
						<Col span="12">
						<span>产品分类：{{proInfo.catalogName}}</span>
						</Col>
						<Col span="12">
						<span class="colspan_xq">产品品牌：{{proInfo.brandName}}</span>
						</Col>
						<Col span="12">
						<span>条形码：{{proInfo.barCode}}</span>
						</Col>
						<Col span="12">
						<span class="colspan_xq">计量单位：{{proInfo.unitName}}</span>
						</Col>
					</Row>
					<p class="nrfg">---------------以下为产品描述内容---------------</p>
					<div class="spms" v-html="proOthers.description"></div>
				</Tab-pane>
				<Tab-pane label="产品附件"></Tab-pane>
			</Tabs>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				scaleshow: true,
				hindex: 0,
				num: 1,
				unitName: '',
				proAttrInit: [],
				selTotal: 1,
				selMoney: '',
				description: '', //采购说明
				skuscombo:[],//产品属性组合
				proAttr: [],
				proInfo: {},
				proOthers: {},
				skus: [],
				smallImg: [
					'/static/img/1.png',
					'/static/img/1.png',
					'/static/img/1.png',
					'/static/img/1.png',
					'/static/img/1.png'
				],
				postData: {
					skuId: '',
					productId: '',
					amount: '',
					description: ''
				},
				scaleimgInfo: {
					display: "none",
					left: "10px",
					top: "10px"
				},
				himgInfo: {
					__w: 0,
					__h: 0,
					__left: 0,
					__top: 0,
					_move_x: 0,
					_move_y: 0
                },
                allAttr: [],
                allSku: [],
                show: []
			}
		},
		created() {
			var proid = this.$route.query.id;
			const _this = this;
			var url = "/api/product/main/" + proid + "/queryById.do";
			_this.postData.productId = proid;
			this.axios(url)
				.then(function(res) {
					_this.proAttr = res.data.datas.attributes;
					_this.proInfo.name = res.data.datas.name;
					_this.proInfo.code = res.data.datas.code;
					_this.proInfo.barCode = res.data.datas.barCode;
					_this.proInfo.catalogName = res.data.datas.catalogName;
					_this.proInfo.spec = res.data.datas.spec;
					_this.proInfo.brandName = res.data.datas.brandName;
					_this.proInfo.price = res.data.datas.price;
					_this.proInfo.unitName = res.data.datas.unitName;
					_this.proInfo.imageUrl = res.data.datas.imageUrl;
					_this.unitName = res.data.datas.unitName;
					_this.proOthers.description = res.data.datas.description;
                    _this.smallImg = res.data.datas.images;
                    _this.skus = res.data.datas.skus;
					var len = _this.proAttr.length;

                    _this.skus.forEach((item,index,arr) => {
                        _this.allSku.push(item.attrValueNameCombine.split(','));
                    })

                    // 所有属性
                    _this.proAttr.forEach((item,index,arr) => {
                        let array = [];
                        item.productAttributeValues.forEach((it,idx,ar) => {
                            array.push(it.name)
                        })
                        _this.allAttr.push(array);
                    })

                    // 第一个选择的产品
                    let skuOne = _this.allSku[0];
                    _this.postData.skuId = _this.skus[0].id;
                    let attrInit = [];
                    _this.allAttr.forEach((item,index,arr) => {
                        skuOne.forEach((it,idx,ar) => {
                            item.includes(it) && attrInit.push(skuOne[idx]);
                        })
                    })
                    _this.proAttrInit = attrInit;

					var arry2 = _this.proAttrInit.slice(0);
                    
					
					for(var skuslen = 0;skuslen<_this.skus.length;skuslen++){
						var pshuz = [];
						for(var i = 0;i<_this.skus[skuslen].productSkuAttributes.length;i++){
							pshuz.push(_this.skus[skuslen].productSkuAttributes[i].attributeValueName);
						}
						_this.skuscombo.push(pshuz);
                    }
                    
					_this.skus.forEach(function(item, index) {
                        var arry = [];
                        
						item.productSkuAttributes.forEach(function(sitem, sindex) {
							arry[sindex] = sitem.attributeValueName;
						})
						if(arry.sort().toString() == arry2.sort().toString()) {
							_this.proInfo.price = item.price;
                        }
					})
					_this.selTotal = 1;
                    _this.selMoney = _this.proInfo.price;                    
				})
				.catch(function(err) {
					console.log(err);
				});
        },
        watch: {
            proAttrInit(){
                let trueth = [];
                for(let i = 0; i<this.allAttr.length; i++){
                    let eve = [];
                    let sel = this.proAttrInit.slice();
                    sel.splice(i,1); // 去除一个

                    function inclu(item,arr,idx){
                        if(idx == arr.length){
                            return true;
                        }else{
                            return item.includes(arr[idx]) && inclu(item,arr,idx+1);
                        }
                    }
                    let a = [];  // 取出符合的数组
                    this.allSku.forEach((item,index,arr) => {
                        let temp = inclu(item,sel,0);
                        if(temp) a.push(item);
                    })

                    // 每一行数组
                    let some = [];
                    this.allAttr[i].forEach((item,index,arr) => {
                        a.some((it,idx,ar) => it.includes(item)) ? some.push(index) : some.push('no');
                    })
                    trueth.push(some);
                }
                this.show = trueth;
                console.log('show',this.show);
            }
        },
		methods: {
			showbigImg(e) {},
			moveimg(e) {},
			imgFun(index) {
				this.hindex = index;
				var src = this.smallImg[index].url;
				this.proInfo.imageUrl = src;
			},
			chagenumFun(value) {
				this.selTotal = value;
				this.selMoney = value * this.proInfo.price;
			},
			radioFun(val) {				
				const _this = this;
				var arry2 = _this.proAttrInit.slice(0);
				_this.proInfo.price = 0;
				_this.postData.skuId = '';
				this.skus.forEach(function(item, index) {
					var arry = [];
					item.productSkuAttributes.forEach(function(sitem, sindex) {
						arry[sindex] = sitem.attributeValueName;
					})
					if(arry.sort().toString() == arry2.sort().toString()) {
						_this.proInfo.price = item.price;
						_this.postData.skuId = item.id;
					}
				})
				this.selMoney = _this.selTotal * this.proInfo.price;
				var checkcombo = [];
				var checkcombo2 = [];
				for(var skuslen = 0;skuslen<_this.skuscombo.length;skuslen++){
                    if(_this.skuscombo[skuslen].indexOf(val)!=-1){
                        checkcombo.push(_this.skuscombo[skuslen]);
                    }
                }
				for(var skuslen = 0;skuslen<checkcombo.length;skuslen++){
					for(var checkcombolen = 0;checkcombolen<checkcombo[skuslen].length;checkcombolen++){
						checkcombo2.push(checkcombo[skuslen][checkcombolen]);
					}
				}
			},
			//加入采购计划
			jionplanFun() {
				this.postData.amount = this.selTotal;
				this.postData.description = this.description;
				const _this = this;
				_this.axios({
						method: 'post',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						url: api.jionPlan,
						data: api.jsonData(_this.postData),
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.$router.push({
								path: "/purchaseForm",
								query: {
									id: res.data.datas.id
								}
							});
						} else {
							_this.$Message.warning(res.data.message);
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			//减少产品数量
			minuseNum(index) {
				var v = parseInt(this.num);
				if(v > 1) {
					this.num = v - 1;
					this.selTotal = v - 1;
					this.selMoney = this.proInfo.price * parseInt(this.num);
				}
			},
			//增加产品数量
			addNum(index) {
				var v = parseInt(this.num);
				this.num = v + 1;
				this.selTotal = v + 1;
				this.selMoney = this.proInfo.price * parseInt(this.num);
			},
			//修改数量
			changeNum() {
				if(isNaN(this.num)) {
					this.num = 1;
					this.$Message.warning("请输入数字");
				}
				this.selTotal = this.num;
				this.selMoney = this.proInfo.price * parseInt(this.num);
            },
		}
	}
</script>
<style>
	.descripe {
		width: 100%;
		padding-top: 16px;
		clear: both;
	}
	
	.descripe .ivu-form-item-label {
		float: left;
	}
	
	.descripe .ivu-form-item-content {
		overflow: auto;
	}
	
	.proHandle {
		width: 500px;
		padding-top: 30px;
		text-align: right;
		clear: both;
	}
	
	.proHandle .toBuy {
		width: 120px;
		margin-right: 20px;
		background-color: #f79d3c;
		border: 0;
		border-radius: 4px;
		color: #fff;
	}
	
	.proHandle .toBuy:hover {
		background-color: #f79d3c;
		color: #fff;
	}
	
	.proHandle .addBuy {
		width: 120px;
		background-color: #f79d3c;
		border: 1px solid #f79d3c;
		border-radius: 4px;
		color: #fff;
	}
	
	.proHandle .addBuy:hover {
		background-color: #f79d3c;
		border: 1px solid #f79d3c;
		color: #fff;
	}
	
	.home-warp {
		margin-top: -10px;
		font-family: "微软雅黑"
	}
	/*.home-warp,
	.goodsInfo {
		background-color: #fff;
		min-height: 100%;
	}
	
	.goodsInfo {
		position: relative;
		padding: 0 30px;
	}*/
	
	.radioColor .ivu-form-item {
		margin-bottom: 10px;
	}
	
	.imgright {
		padding-left: 80px;
	}
	
	.proInfo {
		margin-top: 20px;
	}
	
	.proScaleimg {
		display: none;
		width: 350px;
		height: 350px;
		overflow: hidden;
		background-color: #fff;
		position: absolute;
		left: 380px;
		top: 0;
		z-index: 99;
	}
	
	.proScaleimg img {
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.proNum {
		margin-top: 10px;
	}
	
	.proNum .ivu-input-number {
		height: 28px;
	}
	
	.proNum .ivu-input-number-input-wrap {
		height: 28px;
	}
	
	.proNum .ivu-input-number-handler {
		height: 14px;
	}
	
	.proNum .ivu-input-number-input {
		display: block;
		height: auto;
		line-height: initial;
		padding: 5px 7px;
	}
	
	.proTotalnum {
		float: left;
		width: 500px;
		height: 50px;
		margin-top: 10px;
		padding-left: 20px;
		background-color: #eee;
		line-height: 50px;
		font-size: 14px;
		color: #333;
	}
	
	.proTotalnum span {
		margin: 0 10px;
	}
	
	.proTotalnum i {
        font-size: 24px;
		font-style: normal;
		color: #f79d3c;
        margin: 0 5px;
        vertical-align: bottom
	}
	
	.unit {
		margin-left: 4px;
		font-size: 14px;
	}
	
	.proBigimg {
		width: 350px;
		height: 350px;
		overflow: hidden;
	}
	
	.proBigimg img {
		width: 80%;
		margin: 0 auto;
		display: block;
	}
	
	.smallImg {
		width: 350px;
		position: relative;
		margin-top: 10px;
		padding: 0 20px;
	}
	
	.proForm .ivu-form-item {
		margin-bottom: 0px;
	}
	
	.proForm .ivu-radio-group-button .ivu-radio-wrapper {
		margin-right: 10px;
		background: none;
		border: 0;
		font-size: 14px;
		color: #333;
	}
	
	.proForm .ivu-radio-group-button .ivu-radio-wrapper:first-child {
		border-radius: 0;
		border: 1px solid #ccc;
	}
	
	.proForm.ivu-form .ivu-form-item-label {
		padding-top: 14px;
		font-size: 14px;
		color: #333;
	}
	
	.imgItem img {
		float: left;
		width: 48px;
		height: 48px;
		margin: 0 6px;
		border: 2px solid #fff
	}
	
	.imgItem .active {
		border: 2px solid #e53e41
	}
	
	.goL {
		width: 20px;
		height: 48px;
		position: absolute;
		left: 0;
		top: 0;
		background: url(/static/img/disabled-prev.png) center center no-repeat;
	}
	
	.goR {
		width: 20px;
		height: 48px;
		position: absolute;
		right: 0;
		top: 0;
		background: url(/static/img/disabled-next.png) center center no-repeat;
	}
	
	.radioColor .ivu-radio-group-button .ivu-radio-wrapper {
		height: 24px;
		line-height: 22px;
	}
	
	.radioColor .ivu-radio-group-button .ivu-radio-wrapper-checked,
	.radioColor .ivu-radio-group-button .ivu-radio-wrapper-checked:first-child,
	.radioColor .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
		background-color: none;
		border: 1px solid #f79d3c;
		color: #f79d3c;
		box-shadow: none;
		border-radius: 0;
	}
	
	.radioColor .ivu-radio-group-button .ivu-radio-wrapper:first-child:last-child {
		border-radius: 0;
	}
	
	.proTit {
		font-size: 16px;
		font-weight: 700;
		color: #000;
	}
	
	.proPrice {
		font-size: 26px;
		color: #ff0000;
		padding: 10px;
		background-color: #FFF2E8;
		margin: 10px 0;
	}
	
	.proPrice em {
		font-style: normal;
		font-size: 14px;
	}
	
	.proPrice span {
		font-size: 14px;
		color: #000;
	}
	
	.proinfoNum .minuse,
	.proinfoNum .add {
		display: inline-block;
		width: 27px;
		height: 27px;
		line-height: 27px;
		margin: 0 -4px;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		background-color: #ededed;
		border: 1px solid #ccc;
		cursor: pointer;
		vertical-align: -5px;
	}
	
	.proinfoNum .add {
		margin-left: -3px;
	}
	
	.proinfoNum .ivu-input {
		height: 27px;
		line-height: 27px;
		border-left: 0;
		border-right: 0;
		border-radius: 0;
		text-align: center;
		outline: none;
	}
	
	.proinfoNum .ivu-input:focus {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		box-shadow: none;
	}
	
	.proinfoNum .ivu-input:hover {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		box-shadow: none;
	}
	
	.xqrow div {
		margin-bottom: 10px;
	}
	
	.nrfg {
		margin: 20px 0;
		font-size: 20px;
	}
	
	.colspan_xq {
		padding-left: 15px;
	}
	
	.spms {
		padding: 0 15px;
	}

    .sel {
        background: #f79d3c !important;
        color: #fff !important;
    }
</style>