<template>
	<div class="applyBox">
		<Breadcrumb>
			<Breadcrumb-item to='/main'>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">企业开票信息</span></Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
            <div class="right_home_warp-title">
                <router-link to="/sys/corp/modifyme">基本信息</router-link>
                <router-link to="">联系人</router-link>
                <router-link to="/sys/corp/consignees_list">收货地址</router-link>
                <router-link to="">银行账户信息</router-link>
                <router-link to="/sys/corp/invoice/modify" class="right_home_warp-sel">发票信息</router-link>
            </div>
			<form>
                <h3 style="border-bottom: 1px solid #ccc;"><span style="color:#000;font-size: 18px;">企业增值税开票资料</span></h3>
                <ul class="form_ul">
                    <li>
                        <label><span class="Must">*</span>发票抬头:</label>
                        <input type="text" placeholder="请输入发票抬头" v-model="invoiceInfo.invoiceTitle" required="required" maxlength="100">
                    </li>
                    <li>
                        <label><span class="Must">*</span>纳税人识别号:</label>
                        <input type="text" placeholder="请输入纳税人识别号" v-model="invoiceInfo.taxNumber" required="required" maxlength="32">
                    </li>
                    <li>
                        <label>注册地址:</label>
                        <span></span>
                    </li>
                    <li>
                        <label>注册电话:</label>
                        <input type="tel" placeholder="请输入注册电话" v-model="invoiceInfo.taxRegistrationTelephone" maxlength="20">
                    </li>
                    <li>
                        <label>开户银行:</label>
                        <input type="text" placeholder="请输入开户银行" v-model="invoiceInfo.bankName" maxlength="100">
                    </li>
                    <li>
                        <label>银行帐号:</label>
                        <input type="text" placeholder="请输入银行帐号" v-model="invoiceInfo.bankAccount" maxlength="100">
                    </li>
                </ul>
                <h3 style="margin: 30px 0 0 240px;"><span style="color:#000;font-size: 18px;">寄票地址</span>（非必填）</h3>
                <ul class="form_ul">
					<li>
						<label>收票联系人:</label>
                        <input type="text" placeholder="请输入固定电话" v-model="invoiceInfo.contactName"/>
					</li>
					<li>
						<label>联系电话:</label>
                        <input type="text" placeholder="请输入联系电话" v-model="invoiceInfo.contactTel"/>
					</li>
					<li class="form_ul-address">
						<label>收票地址:</label>
                        <div>
                            <Select placeholder="请选择省" v-model="provinceId" @on-change="changeProvinceId" style="width:33%">
                                <Option v-for="province in provinceList" :value="province.id" :key="province.id">{{ province.name }}</Option>
                            </Select>
                            <Select placeholder="请选择市" v-model="cityId" @on-change="changeCityId" style="width:33%">
                                <Option v-for="city in cityList" :value="city.id" :key="city.id">{{ city.name }}</Option>
                            </Select>
                            <Select placeholder="请选择区、县" v-model="countyId" style="width:32%">
                                <Option v-for="county in countyList" :value="county.id" :key="county.id">{{ county.name }}</Option>
                            </Select>
                            <Input v-model="invoiceInfo.address" placeholder="街道/路/工业区/门牌号" style="margin-top: 20px;"></Input>
                        </div>
					</li>
				</ul>
			</form>
            <div style="margin: 80px 0 30px;">
                <button class="btn-save" @click="invoiceSave('formValidate')" style="position: relative; left: 30px;">保存</button>
            </div>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>

<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
        components:{
            tis : tis
        },
		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,
				id: '',

                corpId: '',
                
                invoiceInfo: {
                    id: '',
                    corpId: '',
                    invoiceTitle: '',
                    taxNumber: '',
                    bankName: '',
                    bankAccount: '',
                    taxRegistrationTelephone: '',
                    contactName: '',
                    contactTel: '',
                    provinceId: '',
                    provinceName: '',
                    cityId: '',
                    cityName: '',
                    countyId: '',
                    countyName: '',
                    address: ''
                },

                provinceId: '',
                provinceName: '',
                cityId: '',
                cityName: '',
                countyId: '',
                countyName: '',

                provinceList: [],
                cityList: [],
                countyList: []
			}
        },
		methods: {
			invoiceSave() {
                this.axios({ 
                    method: 'post',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: api.queryInvoice_e,
                    data: api.convertParam(this.invoiceInfo)
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        this.do_yn = true;
                        this.do_no = false;
                        this.re_do = "保存成功";
                    } else {
                        this.do_no = true;
                        this.do_yn = false;
                        this.re_do = res.data.message;
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            changeProvinceId(){
                this.invoiceInfo.provinceId = this.provinceId;
                var newVal = this.provinceId;
                if(newVal){
                    this.provinceList.forEach((item,index) => {
                        if(item.id == newVal) {
                            this.invoiceInfo.provinceName = item.name;
                            this.provinceName = item.name;
                        }
                    })
                    this.axios({
                        method: 'get',
                        header: {"Content-Type": 'application/x-www-form-urlencoded'},
                        url: '/api/base/address/' + newVal + '/queryCities.do'
                    })
                    .then((res) => {
                        if(res.data.status == 1) {
                            this.cityList = res.data.datas;
                        } else {
                            this.do_no = true;
                            this.re_do = res.data.message;
                            setTimeout(() => { this.do_no = false; }, 2000);
                        }
                    })
                }
                this.invoiceInfo.cityId = '';
                this.invoiceInfo.cityName = '';
                this.invoiceInfo.countyId = '';
                this.invoiceInfo.countyName = '';
                this.cityId = '';
                this.cityName = '';
                this.countyId = '';
                this.countyName = '';
            },
            changeCityId(){
                this.invoiceInfo.cityId = this.cityId;
                var newVal = this.cityId;
                if(newVal){
                    this.cityList.forEach((item,index) => {
                        if(item.id == newVal) {
                            this.invoiceInfo.cityName = item.name;
                            this.cityName = item.name;
                        }
                    })
                    this.axios({
                        method: 'get',
                        header: {"Content-Type": 'application/x-www-form-urlencoded'},
                        url: '/api/base/address/' + newVal + '/queryCounties.do'
                    })
                    .then((res) => {
                        if(res.data.status == 1) {
                            this.countyList = res.data.datas;
                        } else {
                            this.do_no = true;
                            this.re_do = res.data.message;
                            setTimeout(() => { this.do_no = false; }, 2000);
                        }
                    })
                }
                this.invoiceInfo.countyId = '';
                this.invoiceInfo.countyName = '';
                this.countyId = '';
                this.countyName = '';
            },
            changeCountyId(){
                this.invoiceInfo.countyId = this.countyId;
                let newVal = this.countyId;
                if(newVal) {
                    this.countyList.forEach((item,index) => {
                        if(item.id == newVal) {
                            this.invoiceInfo.countyName = item.name;
                            this.countyName = item.name;
                        }
                    })
                }
            }
		},
		created() {
            this.corpId = this.$store.state.user.user.corpId;

			this.axios('/api/upms/corp/invoice/' + this.corpId + '/queryByCorpId.do')
            .then((res) => {
                if(res.data.status == 1) {
                    var info = res.data.datas;
                    this.invoiceInfo.id = info.id;
                    this.invoiceInfo.invoiceTitle = info.invoiceTitle;
                    this.invoiceInfo.taxNumber = info.taxNumber;
                    this.invoiceInfo.bankName = info.bankName;
                    this.invoiceInfo.bankAccount = info.bankAccount;
                    this.invoiceInfo.taxRegistrationTelephone = info.taxRegistrationTelephone;
                    this.invoiceInfo.contactName = info.contactName;
                    this.invoiceInfo.contactTel = info.contactTel;
                    this.invoiceInfo.provinceId = info.provinceId;
                    this.invoiceInfo.provinceName = info.provinceName;
                    this.invoiceInfo.cityId = info.cityId;
                    this.invoiceInfo.cityName = info.cityName;
                    this.invoiceInfo.countyId = info.countyId;
                    this.invoiceInfo.countyName = info.countyName;
                    this.invoiceInfo.address = info.address;
                    this.invoiceInfo.corpId = this.corpId;

                    this.axios({
                        method: 'get',
                        header: {"Content-Type": 'application/x-www-form-urlencoded'},
                        url: '/api/base/address/queryAllProvinces.do'
                    })
                    .then((re) => {
                        if(re.data.status == 1) {
                            this.provinceList = re.data.datas;
                            this.provinceId = this.invoiceInfo.provinceId;
                        }
                    })
                    
                    if(info.provinceId){
                        this.axios({
                            method: 'get',
                            header: {"Content-Type": 'application/x-www-form-urlencoded'},
                            url: '/api/base/address/' + info.provinceId + '/queryCities.do'
                        })
                        .then((resul) => {
                            if(resul.data.status == 1) {
                                this.cityList = resul.data.datas;
                                this.cityId = this.invoiceInfo.cityId;
                            }
                        })
                    }
                    if(info.cityId){
                        this.axios({
                            method: 'get',
                            header: {"Content-Type": 'application/x-www-form-urlencoded'},
                            url: '/api/base/address/' + info.cityId + '/queryCounties.do'
                        })
                        .then(function(result) {
                            if(result.data.status == 1) {
                                this.countyList = result.data.datas;
                                this.countyId = this.invoiceInfo.countyId;
                            }
                        })
                    }
                }
            })
            .catch(function(err) {
                console.log(err);
            })
		},
	}
</script>

<style scoped>
	.form_box {
		width: 100%;
		background: #fff;
		padding: 0 20px 20px 20px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
	}
	
	.form_ul {
        width: 76%;
        margin: 0 auto;
	}
	
	.form_ul li {
		width: 100%;
		display: flex;
		margin-top: 25px;
		align-items: center;
		position: relative;
	}
	
	.form_ul li label {
		display: block;
		width: 177px;
		padding-right: 10px;
		text-align: right;
        font-size: 14px;
        font-weight: bolder;
	}
	
	.form_ul li input {
		width: 440px;
		height: 34px;
		border-radius: 5px;
		border: 1px solid #ccd9e6;
		padding: 10px 10px;
		font-size: 13px;
	}
	.form_ul li input:focus {
		border-color: #00d8f8;
		outline: none;
	}
	.do_no{
		min-width: 260px;
		height: 78px;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		margin:-36px 0 0 -130px ;
		border: 1px solid #00c1de;
		z-index: 999;
	}
	.do_no img{
		width: 44px;
		height: 44px;
		margin-right: 30px;
	}
	.do_no span{
		font-size: 18px;
		color: #415161;
    }
    
    .form_ul-address label {
        position: relative;
        top: -26px;
    }

    .form_ul-address div {
        width: 440px;
    }

    .form_ul-address select {
        height: 32px;
    }

    .form_ul-address input {
        margin-top: 20px;
    }
</style>