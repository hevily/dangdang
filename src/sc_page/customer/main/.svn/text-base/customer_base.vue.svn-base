<template>
	<div class="localimport customer-base">
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
			<Form class="compInfoForm" :rules="validate">
				<Tabs value="name1">
					<TabPane label="基本信息" name="name1" class='test-1'>
						<div class="formItem">
							<div class="label"><span class="Must">*</span>客户名称：</div>
                            <Input placeholder="请输入客户名称" v-model="corpInfo.customerName" style="width:440px" :maxlength=40></Input>
						</div>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>客户编码：</div>
							<Input placeholder="请输入客户编码" v-model="corpInfo.customerCode" style="width:440px" :maxlength=50></Input>
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
                        <div class="bot-btn">
                            <Button class="btn-save" type="info" size="large" @click="companyInfoSave">
                                <div v-if="btnStatus == 1">保存</div>
                                <div v-else-if="btnStatus == 0" class="demo-spin-col">
                                    <Spin fix>
                                        <Icon type="load-a" size=22 class="demo-spin-icon-load"></Icon>
                                    </Spin>
                                </div>
                            </Button>
                            <button class="btn-return" @click="back">返回</button>
                        </div>
					</TabPane>

					<TabPane label=" 交易信息 " name="name2" class='test-1' :disabled="status==1?'disabled':false" :style="status == 1?'color:#ccc;':''">
                        <div class="formItem">
                            <div class="label">物流费用：</div>
                            <div>
                                <RadioGroup v-model="customerInfo.logisticsPaySide">
                                    <Radio label="1">发货方承担</Radio>
                                    <Radio label="0">收货方承担</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div class="formItem">
                            <div class="label">收货方式：</div>
                            <div>
                                <RadioGroup v-model="customerInfo.deliveryMode">
                                    <Radio label="0">送货上门</Radio>
                                    <Radio label="1">物流点自提货物</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div class="formItem">
                            <div class="label">结算方式：</div>
                            <div>
                                <RadioGroup v-model="customerInfo.settlementMode" vertical>
                                    <Radio label="0">款到发货</Radio>
                                    <Radio label="1">货到付款</Radio>
                                    <Radio label="2">账期结</Radio>
                                </RadioGroup>
                                <select style="width: 50px" v-model="customerInfo.accountPeriod" :disabled="customerInfo.settlementMode == 2 ? false : 'disabled'">
                                    <option :value="n" v-for="n in 6" :key="n">{{n}}</option>
                                </select>
                                月结
                                <select style="width: 50px; margin-left: 20px;" v-model="customerInfo.accountDay" :disabled="customerInfo.settlementMode == 2 ? false : 'disabled'">
                                    <option :value="n" v-for="n in 31" :key="n">{{n}}</option>
                                </select>
                                日
                                <span style="margin-left: 20px;">几个月结账一次，每月多少号结账</span>
                            </div>
                        </div>
						<div class="formItem">
							<div class="label">客户级别：</div>
							<div style="line-height: 26px;">
								<select style="width: 100px;" v-model="levelIndex">
                                    <option :value="index" v-for="(item, index) in levelList" :key="index">{{item.name}}</option>
                                </select>
							</div>
						</div>
						<div class="formItem">
							<div class="label">业务联系人：</div>
							<div>
                                <Input v-model="customerInfo.salesmanName" disabled  placeholder="可点击省略号选择" style="width:440px">
                                    <Button slot="append" icon="ios-more" @click="modal1 = true; searchUser()" ></Button>
                                </Input>
                            </div>
						</div>
						<div class="formItem">
							<div class="label">客户联系人：</div>
							<div>
								<Input placeholder="请输入客户联系人名称" style="width:440px" v-model="customerInfo.contractName" :maxlength=40></Input>
							</div>
						</div>
						<div class="formItem">
							<div class="label">客户联系人电话：</div>
							<div>
								<Input placeholder="请输入客户联系人电话" style="width:440px" v-model="customerInfo.contractTel" :maxlength=20></Input>
							</div>
						</div>
                        <div class="bot-btn">
                            <button class="btn-save" @click="tradeInfoSave">保存</button>
                            <button class="btn-return" @click="back">返回</button>
                        </div>

                        <Modal v-model="modal1" title="选择人员" width="800" class="modal-salesman" @on-ok="salesConfirm" @on-cancel="salesCancel">  
                            <Row>
                                <Col span="12">
                                    <Input v-model="salesmanName" placeholder="请输入名称">
                                        <Button slot="append" icon="ios-search" @click="searchUser()"></Button>
                                    </Input>
                                </Col>
                            </Row>
                            <Row>
                                <Table  border :columns="salesmanLists" :data="salesmanData" @on-row-click="salesSelect"></Table>
                            </Row>
                            <Row type="flex" justify="end" style="margin-top: 10px;">
                                <Page :total="salesmanTotal" :page-size="salesPageNums" show-elevator @on-change="changePage"></Page>
                            </Row>
                        </Modal>
					</TabPane>

					<TabPane label="收货地址" name="name3" class='test-1' :disabled="status==1?'disabled':false">
                        <div class="btn-box-right">
                            <button class="btn-new" @click="addRoot">新增收货地址</button>
                        </div>
                        <div class="consignee-lists">
                            <Table :columns="tableModel" :data="deliveryList" ></Table>
                        </div>
                        <Modal v-model="clientClassifyModel" width="666">
                            <div slot="header" class="del_iti">
                                <span>新增收货地址</span>
                            </div>
                            <Form :label-width="100" :model="deliveryInfo" :rules="validate">
                                <Form-item label="收货人:" prop="name">
                                    <Input v-model="deliveryInfo.name" placeholder="收货人" :maxlength=20></Input>
                                </Form-item>
                                <Form-item label="联系电话:" prop="tel">
                                    <Input v-model="deliveryInfo.tel" placeholder="联系电话" :maxlength=20></Input>
                                </Form-item>
                                <Form-item label="收货地址:">
                                    <Select placeholder="请选择省" v-model="deliveryInfo.provinceId" @on-change="provinceIdChange('delivery')" style="width:32%">
                                        <Option v-for="province in deliveryProvinceList" :value="province.id" :key="province.id">{{ province.name }}</Option>
                                    </Select>
                                    <Select placeholder="请选择市" v-model="deliveryInfo.cityId" @on-change="cityIdChange('delivery')" style="width:32%">
                                        <Option v-for="city in deliveryCityList" :value="city.id" :key="city.id">{{ city.name }}</Option>
                                    </Select>
                                    <Select placeholder="请选择区、县" v-model="deliveryInfo.countyId" style="width:32%">
                                        <Option v-for="county in deliveryCountyList" :value="county.id" :key="county.id">{{ county.name }}</Option>
                                    </Select>
                                </Form-item>
                                <Form-item label="">
                                    <Input v-model="deliveryInfo.address" placeholder="街道/路/工业区/门牌号"  :maxlength=120></Input>
                                </Form-item>
                                <Form-item label="备注:">
                                    <Input v-model="deliveryInfo.description" placeholder="备注" type="textarea" :rows="3" :maxlength=200></Input>
                                </Form-item>
                            </Form>
                            <div class="modelFooter" slot='footer'>
                                <Button type="info" @click="confirm">确定</Button>
                                <Button type="text" @click='cancel'>取消</Button>
                            </div>
                        </Modal>
                        <Modal v-model="delModel" width="460">
                            <p slot="header" class="del_p">
                                <span>删除确认</span>
                            </p>
                            <div class="del_div">
                                <p>您确定要删除吗？</p>
                            </div>
                            <div slot="footer" class="delbut">
                                <Button @click="del">删除</Button>
                                <Button @click='ccl'>取消</Button>
                            </div>
                        </Modal>
                        <div class="bot-btn">
                            <button class="btn-return" @click="back">返回</button>
                        </div>
					</TabPane>
					<TabPane label="发票信息" name="name4" class='test-1' :disabled="status==1?'disabled':false">
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>发票抬头：</div>
							<Input placeholder="请输入发票抬头" v-model="invoiceInfo.invoiceTitle" style="width:440px" :maxlength=90></Input>
						</div>
                        <div class="formItem">
							<div class="label"><span class="Must">*</span>纳税人识别号：</div>
							<Input placeholder="请输入纳税人识别号" v-model="invoiceInfo.taxNumber" style="width:440px" :maxlength=32></Input>
						</div>
                        <div class="formItem">
							<div class="label">开户银行：</div>
							<Input placeholder="请输入开户银行" v-model="invoiceInfo.bankName" style="width:440px" :maxlength=90></Input>
						</div>
                        <div class="formItem">
							<div class="label">银行帐号：</div>
							<Input placeholder="请输入银行帐号" v-model="invoiceInfo.bankAccount" style="width:440px" :maxlength=90></Input>
						</div>
                        <div class="formItem">
							<div class="label">税务注册电话：</div>
							<Input placeholder="请输入税务注册电话" v-model="invoiceInfo.taxRegistrationTelephone" style="width:440px" :maxlength=20></Input>
						</div>
                        <div class="formItem">
							<div class="label">收票联系人：</div>
							<Input placeholder="请输入收票联系人" v-model="invoiceInfo.contactName" style="width:440px" :maxlength=10></Input>
						</div>
                        <div class="formItem">
							<div class="label">联系电话：</div>
							<Input placeholder="请输入联系电话" v-model="invoiceInfo.contactTel" style="width:440px" :maxlength=20></Input>
						</div>
                        <div class="formItem">
							<div class="label">收票地址：</div>
							<div style="display: inline-block; width: 440px;">
                                <Select placeholder="请选择省" v-model="invoiceInfo.provinceId" style="width:33%" @on-change="provinceIdChange('invoice')" autocomplete='address-level1'>
                                    <Option v-for="province in invoiceProvinceList" :value="province.id" :key="province.id">{{ province.name }}</Option>
                                </Select>
                                <Select placeholder="请选择市" v-model="invoiceInfo.cityId" style="width:33%" @on-change="cityIdChange('invoice')" autocomplete='address-level2'>
                                    <Option v-for="city in invoiceCityList" :value="city.id" :key="city.id">{{ city.name }}</Option>
                                </Select>
                                <Select placeholder="请选择区、县" v-model="invoiceInfo.countyId" style="width:32%">
                                    <Option v-for="county in invoiceCountyList" :value="county.id" :key="county.id">{{ county.name }}</Option>
                                </Select>
                                <div>
                                    <Input v-model="invoiceInfo.address" placeholder="街道/路/工业区/门牌号"  style="width: 440px; margin-top: 10px;" :maxlength=150></Input>
                                </div>
                            </div>
						</div>
                        <div class="formItem">
							<div class="label">备注：</div>
							<Input placeholder="请输入备注信息" v-model="invoiceInfo.description" style="width:440px" :maxlength=255></Input>
						</div>
                        <div class="bot-btn">
                            <button class="btn-save" @click="invoiceInfoSave">保存</button>
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
                btnStatus: 1, // 1为保存 、 0为保存中

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

                registerProvinceList: [],
                registerCityList: [],
                registerCountyList: [],
                manageProvinceList: [],
                manageCityList: [],
                manageCountyList: [],

                invoiceInfo: {},
                invoiceProvinceList: [],
                invoiceCityList: [],
                invoiceCountyList: [],

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
                    salesmanName: '',
                    salesmanId: '',
                },
                levelList: [],
                levelIndex: '',

                clientClassifyModel: false,
                deliveryList: [],
                deliveryInfo: {},
                deliveryProvinceList: [],
                deliveryCityList: [],
                deliveryCountyList: [],
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
                salesmanName: '',
                salesmanId: '',
                modal1: false,
                salesmanTotal: 0,
                salesmanData: [],
                salesPageStart: 1,
                salesPageNums: 5,
                salesmanLists: [
                    {title: '名称', key: 'name',},
                    {
                        title: '职位',
                        key: 'departmentName'
                    },
                    {
                        title: '电话',
                        key: 'mobile'
                    },
                    {
                        title: '电子邮箱',
                        key: 'email'
                    }
                ],
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
                    {title: '操作', width: 220, render: (h,params) => {
                        var _this = this;
                        return h('div', [
									h('Button', {
                                        attrs: {title: '编辑'},
										props: {type: 'text', size: 'small',},
                                        style: {
                                            border: 'none',
                                            width: '32px',
                                            height: '32px',
                                            background: 'url(' + require('../../../assets/img/quyu.jpg') + ') no-repeat',
                                            backgroundSize: '100%',
                                        },
										on: {click: () => {this.addressChange(params.row)}}
									}),
									h('Button', {
                                        attrs: {title: '删除'},
										props: {type: 'text', size: 'small',},
                                        style: {
                                            border: 'none',
                                            width: '32px',
                                            height: '32px',
                                            background: 'url(' + require('../../../assets/img/dele.jpg') + ') no-repeat',
                                            backgroundSize: '100%',
                                        },
										on: {click: () => {this.addressDel(params.index)}}
                                    }),
                                    h('input', {
                                        attrs: {
                                            type: 'radio',
                                            checked: params.row.defaultStatus == 1,
                                            name: 'default',
                                        },
                                        style: {
                                            margin: '0 6px 0 12px',
                                            verticalAlign: 'middle',
                                        },
                                        on: {click: () => {this.setDefault(params.index)}}
                                    }),
                                    h('span',{
                                        domProps: {innerHTML: '设置为默认'}
                                    })
								]);
                    }},
                ]
			}
        },
		methods: {
            salesConfirm(){
                this.customerInfo.salesmanName = this.salesmanName;
                this.customerInfo.salesmanId = this.salesmanId;
                this.salesmanName = '';
            },
            salesCancel(){
                this.salesmanName = this.customerInfo.salesmanName;
            },
            changePage(page){
                this.page=page;
                this.searchUser()
            },
            searchUser(){
                const nameDate={name: this.salesmanName, pageStart: this.salesPageStart, pageNums: this.salesPageNums};
                this.axios({
                    method:'post',
                    url:api.subordinate,
                    data:api.jsonData(nameDate)
                }).then((res) => {
                    this.salesmanData=res.data.datas.list;
                    this.salesmanTotal=res.data.datas.total;
                })
            },
            salesSelect(currentRow){
                this.salesmanName = currentRow.name;
                this.salesmanId = currentRow.id;
            },
            // selectInfo(currentRow){
            //     this.salesmanName = currentRow.name ;
            //     this.customerInfo.salesmanName = currentRow.name;
            //     this.salesmanId=currentRow.id ;
            //     this.modal1=false
            // },
            invoiceInfoSave(){
                if((!this.invoiceInfo.invoiceTitle) || (!this.invoiceInfo.taxNumber)){
                    this.re_do = '请完整填写信息';
                    this.do_no = true;
                    setTimeout(() => { this.do_no = false;}, 2000);
                    return false;
                }
                this.invoiceProvinceList.forEach((item,index) => {
                    if(this.invoiceInfo.provinceId == item.id) this.invoiceInfo.provinceName = item.name;
                });

                this.invoiceCityList.forEach((item,index) => {
                    if(this.invoiceInfo.cityId == item.id) this.invoiceInfo.cityName = item.name;
                });

                if(this.invoiceCountyList != ''){
                    this.invoiceCountyList.forEach((item,index) => {
                        if(this.invoiceInfo.countyId == item.id) this.invoiceInfo.countyName = item.name
                    });
                }
                
                this.axios({
                    method: 'get',
                    url: '/api/customer/invoice/' + this.c + '/queryByCustomerId.do'
                })
                this.axios({
                    url: '/api/customer/invoice/save.do',
                    method: 'post',
                    data: this.invoiceInfo,
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
            },
            tradeInfoSave(){
                this.btnStatus = 0;
                this.customerInfo.id = this.customerId;
                if(this.levelIndex != ''){
                    this.customerInfo.levelName = this.levelList[this.levelIndex].name;
                    this.customerInfo.levelId = this.levelList[this.levelIndex].id;
                }
                if(this.customerInfo.settlementMode != 2){
                    this.customerInfo.accountPeriod = 0;
                    this.customerInfo.accountDay = 0;
                }else {
                    if(!this.customerInfo.accountPeriod || !this.customerInfo.accountDay){
                        this.re_do = '请选择账期结的日期';
                        this.do_no = true;
                        setTimeout(() => { this.do_no = false;this.btnStatus = 1;}, 2000);
                        return ;
                    }
                }
                
                this.axios({
                    method: 'post',
                    url: 'api/customer/main/modify.do',
                    data: this.customerInfo,
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.re_do = '保存成功';
                        this.do_yn = true;
                        setTimeout(() => { this.do_yn = false; this.btnStatus = 1}, 2000);
                    }else {
                        this.re_do = res.data.message;
                        this.do_no = true;
                        setTimeout(() => { this.do_no = false; this.btnStatus = 1}, 2000);
                    }
                })
            },
            companyInfoSave(){
                this.btnStatus = 0;
                if((!this.corpInfo.customerName) || (!this.corpInfo.customerCode)){
                    this.re_do = '请完整填写信息';
                    this.do_no = true;
                    setTimeout(() => { this.do_no = false; this.btnStatus = 1}, 2000);
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
                        url: '/api/customer/main/add.do',
                        data: {corpInfo: this.corpInfo},
                    })
                    .then((res) => {
                        if(res.data.status == 1){
                            this.re_do = '保存成功';
                            this.do_yn = true;
                            setTimeout(() => { this.do_yn = false; this.back();}, 2000);
                        }else {
                            this.re_do = res.data.message;
                            this.do_no = true;
                            setTimeout(() => { this.do_no = false; this.btnStatus = 1}, 2000);
                        }
                    })
                }else {
                    if(!this.corpInfo.customerId){
                        this.corpInfo.customerId = this.customerId;
                        this.corpInfo.id = this.customerId;
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
                            setTimeout(() => { this.do_yn = false; this.btnStatus = 1}, 2000);
                        }else {
                            this.re_do = res.data.message;
                            this.do_no = true;
                            setTimeout(() => { this.do_no = false; this.btnStatus = 1}, 2000);
                        }
                    })
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
                    case 'invoice':
                        id = this.invoiceInfo.provinceId;
                        break;
                    case 'delivery':
                        id = this.deliveryInfo.provinceId;
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
                        }else if(param == 'invoice'){
                            this.invoiceCityList = res.data.datas;
                            setTimeout(() => {
                                if(!this.invoiceInfo.cityId){
                                    this.invoiceInfo.countyId = '';
                                    this.invoiceCountyList = [];
                                }
                            },0);
                        }else if(param == 'delivery') {
                            this.deliveryCityList = res.data.datas;
                            setTimeout(() => {
                                if(!this.deliveryInfo.cityId){
                                    this.deliveryInfo.countyId = '';
                                    this.deliveryCountyList = [];
                                }
                            },0);
                        }
                    } else {
                        this.do_no = true;
                        this.re_do = res.data.message;
                        setTimeout(() => { this.do_no = false; }, 2000);
                    }
                })
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
                    case 'invoice':
                        id = this.invoiceInfo.cityId;
                        break;
                    case 'delivery':
                        id = this.deliveryInfo.cityId;
                        break;
                    default:
                        if(this.editOrAdd == 0){
                            id = this.deliveryInfo.cityId;
                        }
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
                                case 'invoice':
                                    this.invoiceCountyList = res.data.datas;
                                    break;
                                case 'delivery':
                                    this.deliveryCountyList = res.data.datas;
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
                }
            },
            addRoot(){
                if(this.customerId == ''){
                    this.re_do = '请先填写基本信息并保存';
                    this.do_no = true;
                    setTimeout(() => { this.do_no = false; },2000)
                    return false;
                }
                this.deliveryInfo.customerId = this.customerId;
                this.editOrAdd = 1;
				this.clientClassifyModel = true;
            },
            confirm(){
                this.deliveryInfo.customerId = this.customerId;
                if((!this.deliveryInfo.name) || (!this.deliveryInfo.tel)){
                    this.do_no = true;
                    this.re_do = "请填写收货人姓名、电话";
                    setTimeout(() => { this.do_no = false;}, 2000);
                    return false;
                }
                this.deliveryInfo.defaultStatus = 0;
                this.deliveryProvinceList.forEach((item,index) => {
                    if(this.deliveryInfo.provinceId == item.id) this.deliveryInfo.provinceName = item.name;
                });
                this.deliveryCityList.forEach((item,index) => {
                    if(this.deliveryInfo.cityId == item.id) this.deliveryInfo.cityName = item.name;
                });
                if(this.deliveryCountyList != ''){
                    this.deliveryCountyList.forEach((item,index) => {
                        if(this.deliveryInfo.countyId == item.id) this.deliveryInfo.countyName = item.name
                    });
                }

                if(this.editOrAdd == 1){
                    this.axios({
                        method: 'post',
                        header: {"Content-Type": 'application/x-www-form-urlencoded'},
                        url: '/api/customer/consignee/add.do',
                        data: this.deliveryInfo
                    })
                    .then((res) => {
                        if(res.data.status == 1) {
                            this.clientClassifyModel = false;
                            this.deliveryInfo.name = '';
                            this.deliveryInfo.description = '';
                            this.deliveryInfo.provinceId = '';
                            this.deliveryInfo.provinceName = '';
                            this.deliveryInfo.cityId = '';
                            this.deliveryInfo.cityName = '';
                            this.deliveryInfo.countyId = '';
                            this.deliveryInfo.countyName = '';
                            this.deliveryInfo.tel = '';
                            this.deliveryInfo.defaultStatus = 0;
                            this.deliveryInfo.address = '';
                            this.deliveryCityList = [];
                            this.deliveryCountyList = [];
                            this.deliveryInfo.address = '';
                            this.searchaddress();

                            this.do_yn = true;
                            this.re_do = "添加成功";
                            setTimeout(() => { this.do_yn = false;}, 2000);
                        }
                    })
                }else if(this.editOrAdd == 0) {
                    this.axios({
                        method: 'post',
                        header: {"Content-Type": 'application/x-www-form-urlencoded'},
                        url: '/api/customer/consignee/modify.do',
                        data: this.deliveryInfo
                    })
                    .then((res) => {
                        if(res.data.status == 1) {
                            this.clientClassifyModel = false;
                            this.deliveryInfo.name = '';
                            this.deliveryInfo.description = '';
                            this.deliveryInfo.provinceId = '';
                            this.deliveryInfo.provinceName = '';
                            this.deliveryInfo.cityId = '';
                            this.deliveryInfo.cityName = '';
                            this.deliveryInfo.countyId = '';
                            this.deliveryInfo.countyName = '';
                            this.deliveryInfo.tel = '';
                            this.deliveryInfo.defaultStatus = '';
                            this.deliveryInfo.address = '';
                            delete this.deliveryInfo.id;
                            this.searchaddress();

                            this.do_yn = true;
                            this.re_do = "修改成功";
                            setTimeout(() => { this.do_yn = false;}, 2000);
                        }
                    })
                }
            },
            addressChange(item){
				this.editOrAdd = 0;
				this.deliveryInfo.id = item.id;
				this.deliveryInfo.customerId = item.customerId;
                this.deliveryInfo.name = item.name;
                this.deliveryInfo.tel = item.tel;
                this.deliveryInfo.address = item.address;
				this.deliveryInfo.description = item.description;
				this.deliveryInfo.provinceId = item.provinceId;
				this.deliveryInfo.cityId = item.cityId;
				this.deliveryInfo.countyId = item.countyId;
                this.deliveryInfo.defaultStatus = item.defaultStatus;
                this.clientClassifyModel = true;
            },
            addressDel(index){
                this.curDeliveryIndex = index;
                this.delModel = true;
            },
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
            cancel(){
                this.clientClassifyModel = false;
                this.deliveryInfo.name = '';
                this.deliveryInfo.tel = '';
                this.deliveryInfo.description = '';
                this.deliveryInfo.provinceId = '';
                this.deliveryInfo.cityId = '';
                this.deliveryInfo.countyId = '';
                this.deliveryInfo.address = '';
                this.deliveryInfo.defaultStatus = '';
            },
            del(){
                this.axios({
                    method: 'get',
                    url: '/api/customer/consignee/' + this.deliveryList[this.curDeliveryIndex].id + '/delete.do'
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.deliveryList.splice(this.curDeliveryIndex, 1);
                        this.delModel = false;
                        this.re_do = "删除成功";
                        this.do_yn = true;
                        setTimeout(() => { this.do_yn = false; this.re_do = ''}, 2000);
                        this.curDeliveryIndex = '';
                    }else {
                        this.delModel = false;
                        this.re_do = res.data.message;
                        this.do_no = true;
                        setTimeout(() => { this.do_no = false;}, 2000);
                        this.curDeliveryIndex = '';
                    }
                })
            },
            ccl(){
                this.delModel = false;
                this.curDeliveryIndex = '';
            },
            setDefault(index){
                let info = this.deliveryList[index];
                info.defaultStatus = 1;
                this.axios({
                    method: 'post',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: '/api/customer/consignee/modify.do',
                    data: info,
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        this.searchaddress();
                        this.do_yn = true;
                        this.re_do = "修改成功";
                        setTimeout(() => { this.do_yn = false;}, 2000);
                    }
                })
            },
			back(){
				this.$router.push({path: '/customer'})
			},
        },
		created() {
            if(JSON.stringify(this.$route.query) != '{}'){
                this.status = 0;
                this.customerId = this.$route.query.id;
            }else {
                this.status = 1;
            }
            this.axios({
                method: 'get',
                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                url: '/api/base/address/queryAllProvinces.do'
            })
            .then((res) => {
                if(res.data.status == 1) {
                    this.registerProvinceList = res.data.datas;
                    this.manageProvinceList = res.data.datas;
                    this.invoiceProvinceList = res.data.datas;
                    this.deliveryProvinceList = res.data.datas;
                }
            })

            this.axios.get(api.customer + api.level + api.queryAll)
            .then((res) => {
                if(res.data.status == 1){
                    this.levelList = res.data.datas;
                }
            })

            this.searchaddress();
            if(this.status == 0){
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
                        // this.customerInfo = res.data.datas;
                        for (const key in this.customerInfo) {
                            this.customerInfo[key] = res.data.datas[key];
                        }
                        this.levelList.forEach((item,index) => {
                            if(item.id == this.customerInfo.levelId){
                                this.levelIndex = index;
                            }
                        })
                        if(this.customerInfo.settlementMode != 2){
                            this.customerInfo.accountDay = '';
                            this.customerInfo.accountPeriod = '';
                        }
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
<style>
    .customer-base .ivu-table {
        min-height: 340px;
        border-bottom: 1px solid #e9eaec;
    }
    .customer-base .ivu-table-body {
        height: 290px;
        overflow: auto;
    }
    .customer-base .ivu-table-tbody {
        height: 290px;
        overflow: auto;
    }
</style>
<style scoped>
    .top20 {
        margin-top: 30px;
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

    .demo-spin-col {
        height: 32px;
        line-height: 30px;
        width: 86px;
        top: -6px;
        left: -15px;
        position: relative;
        overflow: hidden;
        border-radius: 6px;
    }

    .demo-spin-col .ivu-spin{
        background: none;
    }

    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>