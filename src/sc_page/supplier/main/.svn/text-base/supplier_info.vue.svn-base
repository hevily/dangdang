<template>
	<div class="localimport">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>客户</Breadcrumb-item>
			<Breadcrumb-item>详情</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp">
			<Form class="compInfoForm">
				<Tabs value="name1">
					<TabPane label="基本信息" name="name1" class='test-1'>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>供应商名称：</div>
                            <span class="localimport-info">{{corpInfo.supplierName}}</span>
						</div>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>供应商简称：</div>
                            <span class="localimport-info">{{corpInfo.supplierShortName}}</span>
						</div>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>供应商编码：</div>
                            <span class="localimport-info">{{corpInfo.supplierCode}}</span>
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
					</TabPane>

					<TabPane label=" 交易信息 " name="name2" class='test-1'>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>供应商名称：</div>
                            <span>{{corpInfo.supplierName}}</span>
						</div>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>供应商编码：</div>
                            <span>{{corpInfo.supplierCode}}</span>
						</div>
                        <div class="formItem">
                            <div class="label">物流费用：</div>
                            <span class="localimport-info">
                                <span v-if="supplierInfo.logisticsPaySide == 0">收货方承担</span>
                                <span v-else-if="supplierInfo.logisticsPaySide == 1">发货方承担</span>
                            </span>
                        </div>
                        <div class="formItem">
                            <div class="label">收货方式：</div>
                            <span class="localimport-info">
                                <span v-if="supplierInfo.deliveryMode == 0">送货上门</span>
                                <span v-else-if="supplierInfo.deliveryMode == 1">物流点自提货物</span>
                            </span>
                        </div>
                        <div class="formItem">
                            <div class="label">结算方式：</div>
                            <span class="localimport-info">
                                <span v-if="supplierInfo.settlementMode == 0">款到发货</span>
                                <span v-else-if="supplierInfo.settlementMode == 1">货到付款</span>
                                <span v-else-if="supplierInfo.settlementMode == 2">账期结
                                    <span>{{supplierInfo.accountPeriod}} 月结</span>
                                    <span>{{supplierInfo.accountDay}} 日</span>
                                    <span style="margin-left: 20px;">几个月结账一次，每月多少号结账</span>
                                </span>
                            </span>
                        </div>
                        
					</TabPane>
				</Tabs>
			</Form>
		</div>
        <div class="btn-bot">
            <button class="btn-return" @click="back">返回</button>
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
                
                supplierId: '',
                corpInfo: {
                    supplierCode: '',
                    supplierShortName: '',
                    supplierCode: '',
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

				pageInfo: {
					count: 1,
					pageStart: 1,
					pageNums: 10
                },

                supplierInfo: {
                    id: '',
                    logisticsPaySide: '',
                    deliveryMode: '',
                    settlementMode: '',
                    accountPeriod: '',
                    accountDay: '',
                    levelName: '',
                    levelId: '',
                },
			}
        },
		methods: {
			back(){
				this.$router.push({path: '/supplier/main/list'})
			},
		},
		created() {
            if(JSON.stringify(this.$route.query) == '{}'){
                this.status = 1;  // 新增
            }else {
                this.status = 0;  // 修改
            }

            if(this.status == 0){
                this.supplierId = this.$route.query.id;
                this.axios({
                    method: 'get',
                    url: '/api/supplier/corpinfo/' + this.supplierId + '/queryBySupplierId.do'
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
                    url: '/api/supplier/main/' + this.supplierId + '/queryById.do'
                })
                .then((res) => {
                    if(res.data.status == 1){
                        for (const key in this.supplierInfo) {
                            this.supplierInfo[key] = res.data.datas[key];
                        }
                    }
                })
            }
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
	
	.compInfoForm .title {
		margin-left: -30px;
		margin-bottom: 20px;
		clear: both;
		font-size: 16px;
		color: #39f;
	}
	
	.compInfoForm .formItem {
		width: 100%;
		margin-bottom: 18px;
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
		font-size: 14px;
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
	
	.compInfoForm .formItem .logoActive {
		visibility: visible
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