<template>
	<div class="localimport customer-info">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>客户</Breadcrumb-item>
			<Breadcrumb-item>详情</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot">
			<Form class="compInfoForm" :rules="validate">
				<Tabs value="name1">
					<TabPane label="基本信息" name="name1" class='test-1'>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>客户名称：</div>
                            <span class="localimport-info">{{corpInfo.customerName}}</span>
						</div>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>客户编码：</div>
                            <span class="localimport-info">{{corpInfo.customerCode}}</span>
						</div>
                        <div class="formItem">
							<div class="label">统一社会信用代码：</div>
                            <span class="localimport-info">{{corpInfo.uscc}}</span>
						</div>
                        <div class="formItem">
							<div class="label">法人代表：</div>
                            <span class="localimport-info">{{corpInfo.legalPerson}}</span>
						</div>
                        <div class="formItem">
							<div class="label">公司网址：</div>
                            <span class="localimport-info">{{corpInfo.website}}</span>
						</div>
                        <div class="formItem">
							<div class="label">公司电话：</div>
                            <span class="localimport-info">{{corpInfo.telephone}}</span>
						</div>
                        <div class="formItem">
							<div class="label">公司传真：</div>
                            <span class="localimport-info">{{corpInfo.fax}}</span>
						</div>
						<div class="formItem">
							<div class="label">注册地址：</div>
							<span class="localimport-info">
                                <span>{{corpInfo.registeredProvinceName}}</span>
                                <span>{{corpInfo.registeredCityName}}</span>
                                <span>{{corpInfo.registeredCountyName}}</span>
                                <span>{{corpInfo.registeredAddress}}</span>
                            </span>
						</div>
						<div class="formItem">
							<div class="label">经营地址：</div>
							<span class="localimport-info">
                                <span>{{corpInfo.provinceName}}</span>
                                <span>{{corpInfo.cityName}}</span>
                                <span>{{corpInfo.countyName}}</span>
                                <span>{{corpInfo.address}}</span>
                            </span>
						</div>
                        <div class="formItem">
							<div class="label">其他说明：</div>
                            <span class="localimport-info">{{corpInfo.description}}</span>
						</div>
                        <div>
                            <button class="btn-return" @click="back">返回</button>
                        </div>
					</TabPane>

					<TabPane label=" 交易信息 " name="name2" class='test-1'>
                        <div class="formItem">
                            <div class="label">物流费用：</div>
                            <span class="localimport-info">
                                <span v-if="customerInfo.logisticsPaySide == 0">收货方承担</span>
                                <span v-else-if="customerInfo.logisticsPaySide == 1">发货方承担</span>
                            </span>
                        </div>
                        <div class="formItem">
                            <div class="label">收货方式：</div>
                            <span class="localimport-info">
                                <span v-if="customerInfo.deliveryMode == 0">送货上门</span>
                                <span v-else-if="customerInfo.deliveryMode == 1">物流点自提货物</span>
                            </span>
                        </div>
                        <div class="formItem">
                            <div class="label">结算方式：</div>
                            <span class="localimport-info">
                                <span v-if="customerInfo.settlementMode == 0">款到发货</span>
                                <span v-else-if="customerInfo.settlementMode == 1">货到付款</span>
                                <span v-else-if="customerInfo.settlementMode == 2">账期结
                                    <span>{{customerInfo.accountPeriod}} 月结</span>
                                    <span>{{customerInfo.accountDay}} 日</span>
                                    <span style="margin-left: 20px;">几个月结账一次，每月多少号结账</span>
                                </span>
                            </span>
                        </div>
						<div class="formItem">
							<div class="label">客户级别：</div>
                            <span class="localimport-info">{{customerInfo.levelName}}</span>
						</div>
						<div class="formItem">
							<div class="label">业务联系人：</div>
							<span class="localimport-info">{{customerInfo.salesmanName}}</span>
						</div>
						<div class="formItem">
							<div class="label">客户联系人：</div>
                            <span class="localimport-info">{{customerInfo.contractName}}</span>
						</div>
						<div class="formItem">
							<div class="label">客户联系人电话：</div>
                            <span class="localimport-info">{{customerInfo.contractTel}}</span>
						</div>
                        <div>
                            <button class="btn-return" @click="back">返回</button>
                        </div>
					</TabPane>

					<TabPane label="收货地址" name="name3" class='test-1'>
                        <div class="consignee-lists">
                            <Table :columns="tableModel" :data="deliveryList" ></Table>
                            <!-- <table class="consignee-table">
                                <thead class="ct-header">
                                    <th class="cth" style="width: 10%;"><span>收货人</span></th>
                                    <th class="cth" style="width: 10%;"><span>手机/电话</span></th>
                                    <th class="cth" style="width: 20%;"><span>所在地区</span></th>
                                    <th class="cth" style="width: 20%;"><span>详细地址</span></th>
                                    <th class="cth" style="width: 20%;"><span>备注</span></th>
                                </thead>
                                <tbody>
                                    <tr class="ctr" v-for="(item,index) in deliveryList" :key="index" style="height: 30px;">
                                        <td class="ctd" style="width: 10%;">{{item.name}}</td>
                                        <td class="ctd" style="width: 10%;">{{item.tel}}</td>
                                        <td class="ctd" style="width: 20%;" :title="item.provinceName + item.cityName + item.countyName">
                                            {{item.provinceName}} {{item.cityName}} {{item.countyName}}
                                        </td>
                                        <td class="ctd" style="width: 20%;" :title="item.address">{{item.address}}</td>
                                        <td class="ctd" style="width: 20%;" :title="item.description">{{item.description}}</td>
                                    </tr>
                                </tbody>
                            </table> -->
                        </div>
                        <div>
                            <button class="btn-return" @click="back">返回</button>
                        </div>
					</TabPane>

					<TabPane label="发票信息" name="name4" class='test-1'>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>发票抬头：</div>
                            <span class="localimport-info">{{invoiceInfo.invoiceTitle}}</span>
						</div>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>纳税人识别号：</div>
                            <span class="localimport-info">{{invoiceInfo.taxNumber}}</span>
						</div>
                        <div class="formItem">
							<div class="label">开户银行：</div>
                            <span class="localimport-info">{{invoiceInfo.bankName}}</span>
						</div>
                        <div class="formItem">
							<div class="label">银行帐号：</div>
                            <span class="localimport-info">{{invoiceInfo.bankAccount}}</span>
						</div>
                        <div class="formItem">
							<div class="label">税务注册电话：</div>
                            <span class="localimport-info">{{invoiceInfo.taxRegistrationTelephone}}</span>
						</div>
                        <div class="formItem">
							<div class="label">收票联系人：</div>
                            <span class="localimport-info">{{invoiceInfo.contactName}}</span>
						</div>
                        <div class="formItem">
							<div class="label">联系电话：</div>
                            <span class="localimport-info">{{invoiceInfo.contactTel}}</span>
						</div>
                        <div class="formItem">
							<div class="label">收票地址：</div>
							<span class="localimport-info">
                                <span>{{invoiceInfo.provinceName}}</span>
                                <span>{{invoiceInfo.cityName}}</span>
                                <span>{{invoiceInfo.countyName}}</span>
                                <span>{{invoiceInfo.address}}</span>
                            </span>
						</div>
                        <div class="formItem">
							<div class="label">备注：</div>
                            <span class="localimport-info">{{invoiceInfo.description}}</span>
						</div>
                        <div>
                            <button class="btn-return" @click="back">返回</button>
                        </div>
					</TabPane>
				</Tabs>
			</Form>
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
		data() {
			return {
                status: 1,
				re_do: '',
				do_yn: false,
                do_no: false,
                
                customerId: '',
                corpInfo: {
                    customerName: '',
                    customerCode: '',
                    uscc: '',
                    legalPerson: '',
                    website: '',
                    telephone: '',
                    fax: '',
                    registeredProvinceId: '',
                    registeredProvinceName: '',
                    registeredCityId: '',
                    registeredCityName: '',
                    registeredCountyId: '',
                    registeredCountyName: '',
                    registeredAddress: '',
                    provinceId: '',
                    provinceName: '',
                    cityId: '',
                    cityName: '',
                    countyId: '',
                    countyName: '',
                    address: '',
                    description: ''
                },

                invoiceInfo: {},

				pageInfo: {
					count: 1,
					pageStart: 1,
					pageNums: 10
                },

                customerInfo: {
                    id: '',
                    logisticsPaySide: '',
                    deliveryMode: '',
                    settlementMode: '',
                    accountPeriod: '',
                    accountDay: '',
                    contractName: '',
                    contractTel: '',
                    levelName: '',
                    levelId: '',
                },
                levelList: [],
                levelIndex: '',

                clientClassifyModel: false,
                deliveryList: [],
                deliveryInfo: {},
                tableModel: [
                    {title: '收货人', key: 'name', width: 110, align: 'center'},
                    {title: '手机/电话', key: 'tel', width: 130},
                    {title: '所在地区', width: 220, render: (h,params) => {
                        return h('span', {
                            attrs: {title: params.row.provinceName + ' ' + params.row.cityName + ' ' + params.row.countyName},
                            domProps: {innerHTML: params.row.provinceName + ' ' + params.row.cityName + ' ' + params.row.countyName}
                        })
                    }},
                    {title: '详细地址',	key: 'address', width: 220, render: (h,params) => {
                        return h('span', {
                            attrs: {title: params.row.address},
                            domProps: {innerHTML: params.row.address}
                        })
                    }},
                    {title: '备注',	key: 'description', width: 220, render: (h,params) => {
                        return h('span', {
                            attrs: {title: params.row.description},
                            domProps: {innerHTML: params.row.description}
                        })
                    }},
                ],

                editOrAdd: '',
                curDeliveryIndex: '',
                delModel: false,
                validate: {
                    name: [{
							required: true,
							message: '收货人不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 20,
							message: '收货人不能超过20个字符'
						}
					],
					tel: [{
							required: true,
							message: '联系电话不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 20,
							message: '联系电话不能超过20个字符'
						}
					],
                },
			}
        },
        watch: {
            customerId(newVal){
                this.axios({
                    method: 'get',
                    url: '/api/customer/invoice/' + newVal + '/queryByCustomerId.do'
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.invoiceInfo = res.data.datas;
                    }else {
                        this.re_do = res.data.message;
                        this.do_no = true;
                        setTimeout(() => { this.do_no = false;}, 2000);
                    }
                })
            }
        },
		methods: {
            searchaddress(){
                if(this.customerId != ''){
                    this.axios({
                        method: 'get',
                        url: '/api/customer/consignee/' + this.customerId + '/queryListByCustomerId.do'
                    })
                    .then((res) => {
                        if(res.data.status == 1){
                            this.deliveryList = res.data.datas;
                        }
                    })
                }
            },
			back(){
				this.$router.push({path: '/customer'})
			},
		},
		created() {
            this.customerId = this.$route.query.id;

            this.axios.get(api.customer + api.level + api.queryAll)
            .then((res) => {
                if(res.data.status == 1){
                    this.levelList = res.data.datas;
                }
            })

            this.searchaddress();

            this.axios({
                method: 'get',
                url: '/api/customer/corpinfo/' + this.customerId + '/queryByCustomerId.do'
            })
            .then((res) => {
                if(res.data.status == 1){
                    this.corpInfo = res.data.datas;
                }else {
                    this.re_do = res.data.message;
                    this.do_no = true;
                    setTimeout(this.do_no = false, 2000);
                }
            })

            this.axios({
                method: 'get',
                url: '/api/customer/main/' + this.customerId + '/queryById.do'
            })
            .then((res) => {
                if(res.data.status == 1){
                    for (const key in this.customerInfo) {
                        this.customerInfo[key] = res.data.datas[key];
                    }
                    this.levelList.forEach((item,index) => {
                        if(item.id == this.customerInfo.levelId){
                            this.levelIndex = index;
                        }
                    })
                }
            })

            this.axios({
                method: 'get',
                url: '/api/customer/consignee/' + this.customerId + '/queryListByCustomerId.do'
            })
            .then((res) => {
                if(res.data.status == 1){
                    this.deliveryList = res.data.datas;
                }
            })

            this.axios({
                method: 'get',
                url: '/api/customer/invoice/' + this.customerId + '/queryByCustomerId.do'
            })
            .then((res) => {
                if(res.data.status == 1){
                    this.invoiceInfo = res.data.datas;
                }
            })            
		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}
		},
	}
</script>

<style scoped>
    .localimport-info {
        display: inline-block;
        height: 26px;
        line-height: 26px;
        font-size: 15px;
    }
	
	.compInfoForm ul {
		overflow: auto;
		/*padding: 20px 0 20px 11px;*/
	}
	
	.compInfoForm ul li {
		min-height: 32px;
		display: flex;
		align-items: center;
	}
	
	.compInfoForm ul a {
		display: inline-block;
		color: #4D4D4D;
		padding: 0 10px;
		outline: 0;
		text-decoration: none;
		white-space: nowrap;
		margin-right: 2px;
		line-height: 2;
	}
	
	.compInfoForm ul .active {
		background-color: #f60;
		color: #fff;
		border-radius: 2px
	}
	
	.compInfoForm {
		margin-top: 10px;
		overflow: auto;
		position: relative;
	}
	
	.compInfoFormBox {
		position: absolute;
		left: 500px;
		top: 2px;
	}
	
	.compInfoForm .title {
		margin-left: -30px;
		margin-bottom: 20px;
		clear: both;
		font-size: 16px;
		color: #39f;
	}
	
	.compInfoForm .formItem {
		width: 100%;
		margin-bottom: 14px;
		float: left;
		clear: both;
		font-size: 13px;
	}
	
	.compInfoForm .ivu-input-wrapper {
		width: 370px;
	}
	
	.compInfoForm .label {
		float: left;
		width: 193px;
		padding-right: 12px;
		line-height: 26px;
		text-align: right;
		font-size: 15px;
        color: #000;
        font-weight: bold;
	}
	
	.compInfoForm .star {
		color: #ff0000;
	}
	
	.compInfoForm .upFile {
		float: left;
		width: 80px;
		height: 80px;
		line-height: 80px;
		position: absolute;
		left: 82px;
		top: 0;
		border: 1px dashed #ddd;
		text-align: center;
		font-size: 20px;
	}
	
	.compInfoForm .ivu-upload-list {
		display: none;
	}
	
	textarea.ivu-input {
		height: 178px!important;
	}
	
	h4 {
		margin-left: 5px;
		font-size: 15px;
		padding-left: 15px;
		color: #415161;
		border-left: 3px solid #ccd9e6;
		font-weight: normal;
	}
</style>