<template>
    <div class="corp-detail">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>供应商</Breadcrumb-item>
			<Breadcrumb-item>详情</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
            <div class="infoshow">
                <div class="infoshow-header">
                    <img :src="imgUrl" class="col-img" @click="showImg">
                    <div class="infoshow-base" style="display: inline-block; margin-left: 20px;">
                        <h2>{{companyInfo.name}}</h2>
                        <p>统一社会信用代码：<span>{{companyInfo.uscc}}</span></p>
                        <p>法人代表：<span>{{companyInfo.legalPerson}}</span></p>
                        <p>注册地址：<span>{{registeredAddress}}</span></p>
                        <p>经营地址：<span>{{address}}</span></p>
                    </div>
                </div>
                <div class="infoshow-body">
                    <div class="infoshow-box">
                        <h3>发票信息</h3>
                        <Row>
                            <Col span="12"><p>· 发票抬头：<span>{{invoiceInfo.invoiceTitle}}</span></p></Col>
                            <Col span="12"><p>· 纳税人识别号：<span>{{invoiceInfo.taxNumber}}</span></p></Col>
                            <Col span="12"><p>· 开户银行：<span>{{invoiceInfo.bankName}}</span></p></Col>
                            <Col span="12"><p>· 银行账户：<span>{{invoiceInfo.bankAccount}}</span></p></Col>
                            <Col span="12"><p>· 收票联系人：<span>{{invoiceInfo.contactName}}</span></p></Col>
                            <Col span="12"><p>· 联系电话：<span>{{invoiceInfo.contactTel}}</span></p></Col>
                            <Col span="12"><p>· 收票地址：<span>{{invoiceAddress}}</span></p></Col>
                        </Row>
                    </div>
                    <div class="infoshow-box">
                        <h3>收货地址</h3>
                        <Table :height="tableHeight" :columns="tableModel" :data="deliveryList"></Table>
                    </div>
                </div>
            </div>
		</div>
        <div class="btn-bot">
			<div>
				<button class="btn-return" @click="back">返回</button>
			</div>
		</div>
        <Modal title="查看图片" v-model="visible" width= 800 class-name="vertical-center-modal">
            <div class="image-modal-wrap">
                <img :src="imgUrl" style="maxHeight: 500px; width: auto; margin: 0 auto;">
            </div>
        </Modal>
	</div>
</template>

<script>
    import api from '@/api/api'
    export default {
        name: 'corpDetail',
        data() {
            return {
                deliveryList: [],
                companyInfo: {},
                invoiceInfo: {},
                corpId: '',
                imgUrl: '',
                visible: false,
                tableModel: [
                    {title: '收货人', key: 'name', width: 110, align: 'center'},
                    {title: '手机/电话', key: 'tel', width: 130},
                    {title: '所在地区', width: 220, render: (h,params) => {
                        return h('div', {
                            attrs: {title: params.row.provinceName + ' ' + params.row.cityName + ' ' + params.row.countyName},
                            domProps: {innerHTML: params.row.provinceName + ' ' + params.row.cityName + ' ' + params.row.countyName}
                        })
                    }},
                    {title: '详细地址',	key: 'address', width: 220, render: (h,params) => {
                        return h('div', {
                            attrs: {title: params.row.address},
                            domProps: {innerHTML: params.row.address}
                        })
                    }},
                    {title: '备注',	key: 'description', width: 220, render: (h,params) => {
                        return h('div', {
                            attrs: {title: params.row.description},
                            domProps: {innerHTML: params.row.description}
                        })
                    }},
                ],
                tableHeight: '',
            }
        },
        computed: {
            registeredAddress(){
                let address = this.companyInfo.registeredAddress ? this.companyInfo.registeredAddress : '';
                let province = this.companyInfo.registeredProvinceName ? this.companyInfo.registeredProvinceName : '';
                let city = this.companyInfo.registeredCityName ? this.companyInfo.registeredCityName : '';
                let county = this.companyInfo.registeredCountyName ? this.companyInfo.registeredCountyName : '';
                return province + city + county + address;
            },
            address(){
                let address = this.companyInfo.address ? this.companyInfo.address : '';
                let province = this.companyInfo.provinceName ? this.companyInfo.provinceName : '';
                let city = this.companyInfo.cityName ? this.companyInfo.cityName : '';
                let county = this.companyInfo.countyName ? this.companyInfo.countyName : '';
                return province + city + county + address;
            },
            invoiceAddress(){
                let address = this.invoiceInfo.address ? this.invoiceInfo.address :'';
                let province = this.invoiceInfo.provinceName ? this.invoiceInfo.provinceName : '';
                let city = this.invoiceInfo.cityName ? this.invoiceInfo.cityName : '';
                let county = this.invoiceInfo.countyName ? this.invoiceInfo.countyName : '';
                return province + city + county + address;
            }
        },
        methods: {
            showImg(){
                this.visible = true;
            },
            back(){
                // this.$router.push('/cooperation/supplier/add');
                this.$router.back('-1');
            }
        },
        created(){
            this.corpId = this.$route.query.id;

            this.axios({
                method: 'get',
                url: '/api/upms/corp/' + this.corpId + '/queryById.do'
            })
            .then((res) => {
                console.log('info',res);
                if(res.data.status == 1){
                    this.companyInfo = res.data.datas;
                    this.imgUrl = res.data.datas.imgBizLicense;
                }else {
                    this.re_do = res.data.message;
                    this.do_no = true;
                    setTimeout(this.do_no = false, 2000);
                }
            })

            this.axios('/api/upms/corp/invoice/' + this.corpId + '/queryByCorpId.do')
            .then((res) => {
                if(res.data.status == 1){
                    this.invoiceInfo = res.data.datas;
                }
            })

            this.axios({
                method: 'get',
                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                url: '/api/upms/corp/consignee/' + this.corpId + '/queryListByCorpId.do',
                data: {corpId: this.corpId}
            })
            .then((res) => {
                if(res.data.status == 1) {
                    this.deliveryList = res.data.datas;
                    this.tableHeight = this.deliveryList.length * 60 + 50;
                }
            })
        }
    }
</script>

<style scoped>
    .time-line {
        position: fixed;
        right: 50px;
        top: 120px;
        z-index: 1111;
    }

    .detail-tips {
        border-left: 10px solid #4F9CEE;
        padding-left: 20px;
        position: relative;
        left: -20px;
        margin: 50px 0 20px;
    }
    .col-img {
        margin: 4px 0 0 10px;
        width: 98px;
        height: 98px;
    }

    
</style>