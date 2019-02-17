<template>
	<Form class="joinplanInfo">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>供应商产品</Breadcrumb-item>
			<Breadcrumb-item>加入采购计划</Breadcrumb-item>
		</Breadcrumb>

		<div class="right_home_warp-nobot test-1">
            <div class="information">
                <div class="basicInfo">
                    <h3><strong>基本信息</strong></h3>
                    <Row>
                        <Col span="3" style="text-align:right;"><b>供应商：</b></Col><Col span="5"><span>{{purchaseInfo.supplierName}}</span></Col>
                        <Col span="3" style="text-align:right;"><b>采购计划编号：</b></Col><Col span="13"><span>{{purchaseInfo.purchaseOrderCode}}</span></Col>
                        <Col span="3" style="text-align:right;"><b>采购员：</b></Col><Col span="5"><span>{{purchaseInfo.orderUserName}}</span></Col>
                        <Col span="3" style="text-align:right;"><b>采购日期：</b></Col><Col span="13"><span>{{purchaseInfo.orderTime}}</span></Col>
                        <Col span="3" style="text-align:right;"><b>交货日期：</b></Col><Col span="5"><span>{{purchaseInfo.deliveryDate}}</span></Col>
                    </Row>
                </div>
                <div class="deliveredInfo">
                    <h3><strong>收货信息</strong></h3>
                    <div class="deliveredInfo-row">
                        <Row>
                            <Col span="3" style="text-align:right;"><b>收货人：</b></Col>
                            <Col span="5"><span>{{purchaseInfo.consigneeName}} </span><span> {{purchaseInfo.consigneeTel}}</span></Col>
                            <Col span="3" style="text-align:right;"><b>收货地址：</b></Col>
                            <Col span="13"><span>{{purchaseInfo.consigneeProvinceName}} </span><span> {{purchaseInfo.consigneeCityName}} </span><span> {{purchaseInfo.consigneeCountyName}} </span><span> {{purchaseInfo.consigneeAddress}} </span></Col>
                            <Col span="3" style="text-align:right;"><b>备注：</b></Col>
                            <Col span="5"><span>{{purchaseInfo.description}}</span></Col>
                        </Row>
                    </div>
                </div>
                <div class="invoiceInfo">
                    <h3><strong>发票信息</strong></h3>
                    <Row>
                        <Col span="3" style="text-align:right;"><b>发票类型：</b></Col>
                        <Col span="5"><span>{{invoiceTypeShow(purchaseInfo.invoiceType)}}</span></Col>
                        <div v-show="invoiceShow">
                            <Col span="3" style="text-align:right;"><b>发票抬头：</b></Col><Col span="13">{{purchaseInfo.invoiceTitle}}</span></Col>
                            <Col span="3" style="text-align:right;"><b>发票内容：</b></Col><Col span="5"><span>{{purchaseInfo.invoiceContent}}</span></Col>
                            <Col span="3" style="text-align:right;"><b>纳税人识别号：</b></Col><Col span="13"><span>{{purchaseInfo.invoiceTaxpayerId}}</span></Col>
                            <Col span="3" style="text-align:right;"><b>开户行：</b></Col><Col span="5"><span>{{purchaseInfo.invoiceBankName}}</span></Col>
                            <Col span="3" style="text-align:right;"><b>账号：</b></Col><Col span="13"><span>{{purchaseInfo.invoiceBankAccount}}</span></Col>
                        </div>
                    </Row>
                </div>
            </div>
            <div class="goods-info">
                <h3><strong>产品信息</strong></h3>
            </div>
			<div class="buyList">
                <table cellspacing="0" cellpadding="0" border="1">
					<tr>
						<th>产品信息</th>
						<th>产品属性</th>
						<th>单价(元)</th>
						<th>数量</th>
						<th>金额(元)</th>
						<th>加工备注</th>
					</tr>
					<tr v-for="(item,index) in proList" :key="index">
						<td>
							<router-link :to="{path:'/supplierGoods/info',query:{id:item.productId}}">
								<img :src=item.imageUrl class="proimg">
								<span class="proword">{{item.productName}}</span>
							</router-link>
						</td>
                        <td>{{item.atrributeValue}}</td>
						<td>{{item.price}}</td>
						<td class="proNum">
								{{item.amount}}{{item.unitName}}
						</td>
						<td>{{item.price * item.amount}}</td>
						<td>
							{{item.requiredDesc}}
						</td>
					</tr>
				</table>
			</div>
			<div class="moneyInfo">
                <div><b>产品种类：</b><span>{{proList.length}}</span></div>
				<div><b>货品金额：</b>{{purchaseInfo.totalMoney}}元</div>
				<div><b>运费：</b>0元</div>
				<div><b>合计金额：</b>{{purchaseInfo.totalMoney}}元</div>
			</div>
			<Form-item label="特别要求(供应商可见)：">
				{{purchaseInfo.description}}
			</Form-item>
			<Form-item label="附件：" class="upload">
                <div v-for="(item,index) in purchaseInfo.attachments" :key="index" class="upload-img" v-if="item.isImage == 1 || item.fileType == 'pg'">
                    <img :src="item.url" style="width: 58px; height: 58px;" @click="imgUrl = item.url;imageShow = true" :title="item.fileName + '.' + item.fileType">
				</div>
                <div v-for="(item,index) in purchaseInfo.attachments" :key="index" class="upload-file" v-if="item.isImage == '0'" :title="'文件：点击下载 ' + item.fileName + '.' + item.fileType">
                    <a :href="item.url">
                        <img src="../../../assets/img/welpic.jpg" style="width: 58px; height: 58px;">
                    </a>
				</div>
                <div class="image-show" @click="imageShow = false" v-show="imageShow">
                    <div class="image-wrap">
                        <img :src="imgUrl">
                    </div>
                </div>
			</Form-item>
			<div class="bigTit">审核信息（供应商不可见）</div>
			<Form-item label="采购理由：">
				{{purchaseInfo.applyReason}}
			</Form-item>
            <div class="audit-history">
				<h3><strong>审核历史</strong></h3>
                <table>
                    <thead>
                        <th>审核时间</th>
                        <th>审核人</th>
                        <th>审核意见</th>
                        <th>审核结果</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in auditHistory" :key="index">
                            <td>{{item.auditTime}}</td>
                            <td>{{item.auditorName}}</td>
                            <td>{{item.content}}</td>
                            <td>{{item.statusDesc}}</td>
                        </tr>
                    </tbody>
                </table>
			</div>
		</div>
	</Form>
</template>
<script>
	import api from '@/api/api'
	export default {
		name: 'purchaseForm',
		created() {
			const _this = this;
			//采购清单查询
			var url = '/api/order/plan/' + this.$route.query.id + '/queryById.do';
			this.axios(url)
            .then(function(res) {
                _this.purchaseInfo = res.data.datas;
                _this.proList = _this.purchaseInfo.products;
            })
            .catch(function(err) {
                console.log(err);
            })

			//审核历史查询
			var urlhis = '/api/order/plan/' + this.$route.query.id + '/queryAuditRecords.do';
			this.axios(urlhis)
            .then(function(res) {
                _this.auditHistory = res.data.datas;
            })
            .catch(function(err) {
                console.log(err);
            })
		},
		data() {
			return {
				purchaseInfo: {},
                invoiceShow: false,
				proList: [],
                auditHistory: [],
                imageShow: false,
                imgUrl: ''
			}
		},
		methods: {
            invoiceTypeShow(type){
                if(type == 1 || type == 2){
                    this.invoiceShow = true;
                }
                if(type == 2){
                    return '增值税发票';
                }else if(type == 1){
                    return '普通发票';
                }else if(type == 0 || type == ''){
                    return '不开发票';
                }
            },
			saveModify() {
				const _this = this;
				var postInfo = {};
				postInfo.orderId = this.purchaseInfo.id;
				postInfo.applyDepId = this.purchaseInfo.applyDepId;
				postInfo.deliveryDate = "2015-10-22";
				postInfo.description = this.purchaseInfo.description;
				postInfo.attachments = this.purchaseInfo.attachments;
				postInfo.description = this.purchaseInfo.description;
				postInfo.skuInfo = [];
				this.purchaseInfo.products.forEach(function(item, index) {
					var newsku = {};
					newsku.productId = item.productId;
					newsku.skuId = item.skuId;
					newsku.amount = item.amount;
					newsku.description = item.description;
					postInfo.skuInfo[index] = newsku;
				});

				this.axios({
                    method: 'post',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: api.modifyPlan,
                    data: api.jsonData(postInfo),
                })
                .then(function(res) {
                    console.log(res.data.datas);
                    if(res.data.status == 1) {
                        _this.do_yn = true;
                        _this.re_do = "保存成功";
                        setTimeout(() => {
                            _this.do_yn = false;
                        }, 2000);
                    } else {
                        _this.do_no = true;
                        _this.re_do = '请重新提交';
                        setTimeout(() => {
                            _this.do_no = false;
                        }, 2000);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
			},
		}
	}
</script>
<style scoped>
	.joinplanInfo{
		font-size: 14px;
	}

	.purchaseInfo.ivu-row {
		margin: 0 0 5px 0;
	}

    .bigTit {
		height: 42px;
		line-height: 42px;
		margin: 20px 0;
		border-top: 1px solid #39f;
		border-bottom: 1px solid #39f;
		font-weight: bold;
		font-size: 16px;
		color: #39f;
	}

    .upload {
        float: none;
    }
    .upload-img, .upload-file {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        cursor: pointer;
        position: relative;
        height: 54px;
        overflow: hidden;
    }
    .image-show {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        cursor: pointer;
        background: rgba(204,204,204,.3) ;
        z-index: 9999;
    }
    .image-wrap {
        width: 500px;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center; 
    }
    .image-show img {
        width: 500px;
        flex-grow: 0;
    }
</style>