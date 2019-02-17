<template>
	<div class="localimport">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>客户</Breadcrumb-item>
			<Breadcrumb-item>编辑</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot">
			<Form class="compInfoForm">
				<Tabs value="name1">
					<TabPane label="基本信息" name="name1" class='test-1'>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>供应商名称：</div>
                            <Input placeholder="请输入供应商名称" v-model="corpInfo.supplierName" style="width:440px" :maxlength=40></Input>
						</div>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>供应商简称：</div>
                            <Input placeholder="请输入供应商简称" v-model="corpInfo.supplierShortName" style="width:440px" :maxlength=40></Input>
						</div>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>供应商编码：</div>
							<Input placeholder="请输入供应商编码" v-model="corpInfo.supplierCode" style="width:440px" :maxlength=50></Input>
						</div>
                        <div class="formItem">
							<div class="label">统一社会信用代码：</div>
							<Input placeholder="请输入统一社会信用代码" v-model="corpInfo.uscc" style="width:440px" :maxlength=50></Input>
						</div>
                        <div class="formItem">
							<div class="label">法人代表：</div>
							<Input placeholder="请输入法人代表名称" v-model="corpInfo.legalPerson" style="width:440px" :maxlength=10></Input>
						</div>
                        <div class="formItem">
							<div class="label">公司网址：</div>
							<Input placeholder="请输入公司网址" v-model="corpInfo.website" style="width:440px" :maxlength=60></Input>
						</div>
                        <div class="formItem">
							<div class="label">公司电话：</div>
							<Input placeholder="请输入公司电话" v-model="corpInfo.telephone" style="width:440px" :maxlength=20></Input>
						</div>
                        <div class="formItem">
							<div class="label">公司传真：</div>
							<Input placeholder="请输入公司传真号码" v-model="corpInfo.fax" style="width:440px" :maxlength=20></Input>
						</div>
						<div class="formItem">
							<div class="label">注册地址：</div>
							<div style="display: inline-block; width: 440px;">
                                <Select placeholder="请选择省" v-model="corpInfo.registeredProvinceId" style="width:33%" @on-change="provinceIdChange('register')" autocomplete='address-level1'>
                                    <Option v-for="province in registerProvinceList" :value="province.id" :key="province.id">{{ province.name }}</Option>
                                </Select>
                                <Select placeholder="请选择市" v-model="corpInfo.registeredCityId" style="width:33%" @on-change="cityIdChange('register')" autocomplete='address-level2'>
                                    <Option v-for="city in registerCityList" :value="city.id" :key="city.id">{{ city.name }}</Option>
                                </Select>
                                <Select placeholder="请选择区、县" v-model="corpInfo.registeredCountyId" style="width:32%">
                                    <Option v-for="county in registerCountyList" :value="county.id" :key="county.id">{{ county.name }}</Option>
                                </Select>
                                <div>
                                    <Input v-model="corpInfo.registeredAddress" placeholder="街道/路/工业区/门牌号" style="width: 440px; margin-top: 10px;"></Input>
                                </div>
                            </div>
						</div>
						<div class="formItem">
							<div class="label">经营地址：</div>
							<div style="display: inline-block; width: 440px;">
                                <Select placeholder="请选择省" v-model="corpInfo.provinceId" style="width:33%" @on-change="provinceIdChange('manage')" autocomplete='address-level1'>
                                    <Option v-for="province in manageProvinceList" :value="province.id" :key="province.id">{{ province.name }}</Option>
                                </Select>
                                <Select placeholder="请选择市" v-model="corpInfo.cityId" style="width:33%" @on-change="cityIdChange('manage')" autocomplete='address-level2'>
                                    <Option v-for="city in manageCityList" :value="city.id" :key="city.id">{{ city.name }}</Option>
                                </Select>
                                <Select placeholder="请选择区、县" v-model="corpInfo.countyId" style="width:32%">
                                    <Option v-for="county in manageCountyList" :value="county.id" :key="county.id">{{ county.name }}</Option>
                                </Select>
                                <div>
                                    <Input v-model="corpInfo.address" placeholder="街道/路/工业区/门牌号" style="width: 440px; margin-top: 10px;"></Input>
                                </div>
                            </div>
						</div>

                        <div class="formItem">
							<div class="label">其他说明：</div>
							<Input type="textarea" placeholder="请输入..." v-model="corpInfo.description" style="width:440px"></Input>
						</div>
                        <div class="formItem">
                            <button class="btn-save" @click="companyInfoSave">保存</button>
                            <button class="btn-return" @click="back">返回</button>
                        </div>
					</TabPane>

					<TabPane label=" 交易信息 " name="name2" class='test-1' :disabled="status == 1">
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>供应商名称：</div>
                            <span>{{corpInfo.supplierName}}</span>
                            <!-- <Input placeholder="请输入供应商名称" v-model="corpInfo.customerName" style="width:440px" :maxlength=40></Input> -->
						</div>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>供应商编码：</div>
                            <span>{{corpInfo.supplierCode}}</span>
							<!-- <Input placeholder="请输入供应商编码" v-model="corpInfo.customerCode" style="width:440px" :maxlength=50></Input> -->
						</div>
                        <div class="formItem">
                            <div class="label">物流费用：</div>
                            <div>
                                <RadioGroup v-model="supplierInfo.logisticsPaySide">
                                    <Radio label="1">发货方承担</Radio>
                                    <Radio label="0">收货方承担</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div class="formItem">
                            <div class="label">收货方式：</div>
                            <div>
                                <RadioGroup v-model="supplierInfo.deliveryMode">
                                    <Radio label="0">送货上门</Radio>
                                    <Radio label="1">物流点自提货物</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div class="formItem">
                            <div class="label">结算方式：</div>
                            <div>
                                <RadioGroup v-model="supplierInfo.settlementMode" vertical>
                                    <Radio label="0">款到发货</Radio>
                                    <Radio label="1">货到付款</Radio>
                                    <Radio label="2">账期结</Radio>
                                </RadioGroup>
                                <select style="width: 50px" v-model="supplierInfo.accountPeriod" :disabled="supplierInfo.settlementMode == 2 ? false : 'disabled'">
                                    <option :value="n" v-for="n in 6" :key="n">{{n}}</option>
                                </select>
                                月结
                                <select style="width: 50px; margin-left: 20px;" v-model="supplierInfo.accountDay" :disabled="supplierInfo.settlementMode == 2 ? false : 'disabled'">
                                    <option :value="n" v-for="n in 31" :key="n">{{n}}</option>
                                </select>
                                日
                                <span style="margin-left: 20px;">几个月结账一次，每月多少号结账</span>
                            </div>
                        </div>
                        <div class="formItem">
                            <button class="btn-save" @click="tradeInfoSave">保存</button>
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

                registerProvinceList: [],
                registerCityList: [],
                registerCountyList: [],
                manageProvinceList: [],
                manageCityList: [],
                manageCountyList: [],

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
                },
			}
        },
		methods: {
            tradeInfoSave(){
                this.supplierInfo.id = this.supplierId;
                if(this.supplierInfo.settlementMode != 2){
                    this.supplierInfo.accountPeriod = '';
                    this.supplierInfo.accountDay = '';
                }
                this.axios({
                    method: 'post',
                    url: 'api/supplier/main/modify.do',
                    data: this.supplierInfo,
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.re_do = '保存成功';
                        this.do_yn = true;
                        setTimeout(() => { this.do_yn = false;}, 2000);
                    }else {
                        this.re_do = res.data.message;
                        this.do_no = true;
                        setTimeout(() => { this.do_no = false;}, 2000);
                    }
                })
                .catch((err) => {console.log(err);});
            },
            companyInfoSave(){
                if((!this.corpInfo.supplierName) || (!this.corpInfo.supplierCode || (!this.corpInfo.supplierShortName))){
                    this.re_do = '请完整填写信息';
                    this.do_no = true;
                    setTimeout(() => { this.do_no = false;}, 2000);
                    return false;
                }
                this.registerProvinceList.forEach((item,index) => {
                    if(this.corpInfo.registeredProvinceId == item.id) this.corpInfo.registeredProvinceName = item.name;
                });
                this.registerCityList.forEach((item,index) => {
                    if(this.corpInfo.registeredCityId == item.id) this.corpInfo.registeredCityName = item.name;
                });
                if(this.registerCountyList != ''){
                    this.registerCountyList.forEach((item,index) => {
                        if(this.corpInfo.registeredCountyId == item.id) this.corpInfo.registeredCountyName = item.name
                    });
                }

                this.manageProvinceList.forEach((item,index) => {
                    if(this.corpInfo.provinceId == item.id) this.corpInfo.provinceName = item.name;
                });
                this.manageCityList.forEach((item,index) => {
                    if(this.corpInfo.cityId == item.id) this.corpInfo.cityName = item.name;
                });
                if(this.manageCountyList != ''){
                    this.manageCountyList.forEach((item,index) => {
                        if(this.corpInfo.countyId == item.id) this.corpInfo.countyName = item.name
                    });
                }
                if(this.status == 1){
                    this.axios({
                        method: 'post',
                        header: {"Content-Type": 'application/x-www-form-urlencoded'},
                        url: api.supplierAdd,
                        data: {corpInfo: this.corpInfo},
                    })
                    .then((res) => {
                        console.log('res',res);
                        if(res.data.status == 1){
                            this.back();
                        }else {
                            this.re_do = res.data.message;
                            this.do_no = true;
                            setTimeout(() => { this.do_no = false;}, 2000);
                        }
                    })
                    .catch((res) => {console.log(res);})
                }else {
                    if(!this.corpInfo.supplierId){
                        this.corpInfo.id = this.supplierId;
                    }
                    this.axios({
                        method: 'post',
                        url: '/api/customer/corpinfo/save.do',
                        data: this.corpInfo,
                    })
                    .then((res) => {
                        if(res.data.status == 1){
                            this.re_do = '修改成功';
                            this.do_yn = true;
                            setTimeout(() => { this.do_yn = false;}, 2000);
                            // this.supplierId = res.data.datas;
                        }else {
                            this.re_do = res.data.message;
                            this.do_no = true;
                            setTimeout(() => { this.do_no = false;}, 2000);
                        }
                    })
                    .catch((res) => {console.log(res);})
                }
            },
            provinceIdChange(param) {
                let id = '';
                switch (param) {
                    case 'register':
                        id = this.corpInfo.registeredProvinceId;
                        break;
                    case 'manage':
                        id = this.corpInfo.provinceId;
                        break;
                    default:
                        break;
                }
                this.axios({
                    method: 'get',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: '/api/base/address/'+id+'/queryCities.do'
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        if(param == 'register'){
                            this.registerCityList = res.data.datas;
                            setTimeout(() => {
                                if(!this.corpInfo.registeredCityId){
                                    this.corpInfo.registeredCountyId = '';
                                    this.registerCountyList = [];
                                }
                            },0);
                        }else if(param == 'manage') {
                            this.manageCityList = res.data.datas;
                            setTimeout(() => {
                                if(!this.corpInfo.cityId){
                                    this.corpInfo.countyId = '';
                                    this.manageCountyList = [];
                                }
                            },0);
                        }
                    } else {
                        this.do_no = true;
                        this.re_do = res.data.message;
                        setTimeout(() => { this.do_no = false; }, 2000);
                    }
                })
                .catch((err) => {console.log(err);});
			},

            cityIdChange(param){
                let id = '';
                switch (param) {
                    case 'register':
                        id = this.corpInfo.registeredCityId;
                        break;
                    case 'manage':
                        id = this.corpInfo.cityId;
                        break;
                    default:
                        
                        break;
                }
                if(id){
                    this.axios({
                        method: 'get',
                        header: {"Content-Type": 'application/x-www-form-urlencoded'},
                        url: '/api/base/address/' + id + '/queryCounties.do'
                    })
                    .then((res) => {
                        if(res.data.status == 1) {
                            switch (param) {
                                case 'register':
                                    this.registerCountyList = res.data.datas;
                                    break;
                                case 'manage':
                                    this.manageCountyList = res.data.datas;
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            this.do_no = true;
                            this.re_do = res.data.message;
                            setTimeout(() => {
                                this.do_no = false;
                            }, 2000);
                        }
                    })
                    .catch((err) => {console.log(err);});
                }
            },
			back(){
				this.$router.push({path: '/supplier/main/list'})
			},
		},
		created() {
            this.axios({
                method: 'get',
                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                url: '/api/base/address/queryAllProvinces.do'
            })
            .then((res) => {
                if(res.data.status == 1) {
                    this.registerProvinceList = res.data.datas;
                    this.manageProvinceList = res.data.datas;
                }
            })
            .catch((err) => {console.log(err);});

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
                        console.log('state',res);
                        // this.supplierInfo = res.data.datas;
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