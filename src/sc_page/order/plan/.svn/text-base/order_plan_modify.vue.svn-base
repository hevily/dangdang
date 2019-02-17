<template>
	<Form class="joinplanInfo">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>物料商城</Breadcrumb-item>
			<Breadcrumb-item>采购计划</Breadcrumb-item>
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
                        <Col span="3" style="text-align:right;"><b>交货日期：</b></Col>
                        <Col span="5">
                            <Form-item class="todate">
                                <Date-picker type="date" v-model="purchaseInfo.deliveryDate" format="yyyy-MM-dd" @on-change="changeDate" placeholder="选择交货日期" style="width: 200px" required></Date-picker>
                            </Form-item>
                        </Col>
                    </Row>
                </div>
                <div class="deliveredInfo">
                    <h3><strong>收货信息</strong><span class="delivered-title" @click="deliverShow = true">[编辑]</span></h3>
                    <div class="deliveredInfo-row">
                        <Row>
                            <Col span="3" style="text-align:right;"><b>收货人：</b></Col>
                            <Col span="5"><span>{{customerInfo.consigneeName}} </span><span> {{customerInfo.consigneeTel}}</span></Col>
                            <Col span="3" style="text-align:right;"><b>收货地址：</b></Col>
                            <Col span="13"><span>{{customerInfo.consigneeProvinceName}} </span><span> {{customerInfo.consigneeCityName }} </span><span> {{customerInfo.consigneeCountyName}} </span><span> {{customerInfo.consigneeAddress}}</span></Col>
                            <Col span="3" style="text-align:right;"><b>备注：</b></Col>
                            <Col span="5"><span>{{customerInfo.description}}</span></Col>
                        </Row>
                    </div>
                    <div class="deliver-edit" v-if="deliverShow">
                        <h4>收货信息</h4>
                        <div class="deliver-form">
                            <div v-for="(item,index) in customerLists" :key="index" class="deliver-list" :class="deliverSelect == item.id ? 'deliver-select' : '' ">
                                <input type="radio" v-model="deliverSelect" :id="index" :value="item.id">
                                <label :for="index" class="deliver-label">
                                    <span>{{item.name}}</span>
                                    <span>{{item.provinceName}}</span>
                                    <span>{{item.cityName}}</span>
                                    <span>{{item.countyName}}</span>
                                    <span>{{item.address}}</span>
                                    <span>{{item.tel}}</span>
                                    <span>{{item.description}}</span>
                                </label>
                                <span class="deliver-editbtn" @click="deliverEdit(item); compileForm.changeoradd = 1; compileForm.id = item.id;">编辑</span>
                            </div>
                        </div>
                        <span class="deliver-new" @click="clientClassifyModel = true; compileForm.changeoradd = 0;">新增收货地址</span>
                        <div class="deliver-submit">
                            <Button type="warning" @click="deliverSave">保存</Button>
                            <Button type="warning" @click="deliverCancel">取消</Button>
                        </div>
                    </div>

                    <Modal v-model="clientClassifyModel" width="666">
                        <div slot="header" class="del_iti">
                            <span>新增收货地址</span>
                        </div>
                        <Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="100">
                            <Form-item label="收货人:" prop="name">
                                <Input v-model="compileForm.name" placeholder="收货人"></Input>
                            </Form-item>
                            <Form-item label="联系电话:" prop='tel'>
                                <Input v-model="compileForm.tel" placeholder="联系电话"></Input>
                            </Form-item>
                            <Form-item label="收货地址:">
                                <Select placeholder="请选择省" v-model="compileForm.provinceId" @on-change="registeredprovinceOK" style="width:32%">
                                    <Option v-for="provinceName in provinceList" :value="provinceName.id" :key="provinceName.id">{{ provinceName.name }}</Option>
                                </Select>
                                <Select placeholder="请选择市" v-model="compileForm.cityId" @on-change="registeredcityOK" style="width:32%">
                                    <Option v-for="cityeName in cityList" :value="cityeName.id" :key="cityeName.id">{{ cityeName.name }}</Option>
                                </Select>
                                <Select placeholder="请选择区、县" v-model="compileForm.countyId" style="width:32%">
                                    <Option v-for="countyName in countyList" :value="countyName.id" :key="countyName.id">{{ countyName.name }}</Option>
                                </Select>
                            </Form-item>
                            <Form-item label="" prop='address'>
                                <Input v-model="compileForm.address" placeholder="街道/路/工业区/门牌号"></Input>
                            </Form-item>
                            <Form-item label="备注:" prop='description'>
                                <Input v-model="compileForm.description" placeholder="备注" type="textarea" :rows="3"></Input>
                            </Form-item>
                        </Form>
                        <div class="modelFooter" slot='footer'>
                            <Button type="info" @click="confirm('compileForm')">确定</Button>
                            <Button type="text" @click='cancel'>取消</Button>
                        </div>
                    </Modal>
                </div>
                <div class="invoiceInfo">
                    <h3><strong>发票信息</strong></h3>
                    <Row>
                        <Col span="3" style="text-align:right;"><b>发票类型：</b></Col>
                        <Col span="5">
                            <span>
                                <select v-model="invoiceType">
                                    <option value="" disabled>请选择发票类型</option>
                                    <option value="0">不开发票</option>
                                    <option value="1">普通发票</option>
                                    <option value="2">增值税发票</option>
                                </select>
                            </span>
                        </Col>
                        <div v-show="invoiceShow">
                            <Col span="3" style="text-align:right;"><b>发票抬头：</b></Col><Col span="13"><span><input type="text" v-model="invoiceInfo.invoiceTitle"></span></Col>
                            <Col span="3" style="text-align:right;"><b>发票内容：</b></Col><Col span="5"><span><input type="text" v-model="invoiceInfo.invoiceContent"></span></Col>
                            <Col span="3" style="text-align:right;"><b>纳税人识别号：</b></Col><Col span="13"><span><input type="text" v-model="invoiceInfo.invoiceTaxpayerId"></span></Col>
                            <Col span="3" style="text-align:right;"><b>开户行：</b></Col><Col span="5"><span><input type="text" v-model="invoiceInfo.invoiceBankName"></span></Col>
                            <Col span="3" style="text-align:right;"><b>账号：</b></Col><Col span="13"><span><input type="text" v-model="invoiceInfo.invoiceBankAccount"></span></Col>
                        </div>
                    </Row>
                </div>
            </div>
            <div class="goods-info">
                <h3><strong>产品信息</strong></h3>
                <span @click="$router.push('/material/mall/main')">【新增产品】</span>
            </div>
			<div class="buyList">
				<table cellspacing="0" cellpadding="0">
					<tr>
						<th>产品名称</th>
						<th>编码</th>
						<th>产品规格</th>
                        <th class="buyList-price">单价<br>(元)</th>
                        <th>数量</th>
						<th class="buyList-subtotal">金额<br>(元)</th>
                        <th>采购说明</th>
						<th class="buyList-oper">操作</th>
					</tr>
					<tr v-for="(item,index) in proList" :key="index">
						<td >
							<router-link :to="{path:'/supplierGoods/info',query:{id:item.productId}}">
								<img :src=item.imageUrl class="proimg">
                                <br>
								<span class="proword">{{item.productName}}</span>
							</router-link>
						</td>
                        <td>{{item.productCode}}</td>
                        <td>{{item.atrributeValue}}</td>
                        <td>{{item.price}}</td>
						<td class="proNum">
							<div class="proNum_div">
								<button class="minuse" @click="minuseNum(index)">-</button>
								<Input v-model="item.amount" style="width: 50px;" @on-change="changeNum(index)"></Input>
								<button class="add" @click="addNum(index)">+</button>
							</div>
						</td>
						<td>{{item.price * item.amount}}</td>
                        <td>
							<Input type="textarea" v-model="item.requiredDesc" :rows="3"></Input>
						</td>
						<td>
							<i-button style="width:60px;text-align:center;" @click="deleteGood(index)">删除</i-button>
						</td>
					</tr>
				</table>
			</div>
			<div class="moneyInfo">
                <div><b>产品种类：</b><span>{{proList.length}}</span></div>
				<div><b>货品金额：</b><span>{{totalMoney}}元</span></div>
				<div><b>运费：</b><span>0元</span></div>
				<div><b>合计金额：</b><span>{{totalMoney}}元</span></div>
			</div>
			<Form-item label="采购要求：">
				<Input type="textarea" v-model="purchaseInfo.description" :rows="2" placeholder="500字以内,采购要求是针对供应商而言" style="width:50%;margin-right:10px;"></Input>
			</Form-item>
			<Form-item label="附    件：" class="upload">
				<Upload ref="upload" 
                  :headers="uploadHeader" 
                  :show-upload-list="true"
                  :on-success="handleSuccess" 
                  :max-size="11112048" 
                  :on-format-error="handleFormatError" 
                  :on-exceeded-size="handleMaxSize" 
                  :before-upload="handleBeforeUpload"
                  multiple 
                  :action="uploadUrl" 
                  :data='uploadData' 
                  style="display: inline-block;width:58px;"
                  class="uploadCont">
					<div style="width: 58px;height:56px;line-height: 56px;">
                        <Icon class="plus" type="plus" size="20"></Icon>
                    </div>
				</Upload>
                <div v-for="(item,index) in attachments" :key="index" class="upload-img" v-if="item.isImage == 1 || item.fileType == 'pg'">
                    <img :src="item.url" style="width: 58px; height: 58px;" @click="imgUrl = item.url;imageShow = true" :title="item.fileName + '.' + item.fileType">
                    <span title="删除" @click="delImg(index)">X</span>
				</div>
                <div v-for="(item,index) in attachments" :key="index" class="upload-file" v-if="item.isImage == '0'" :title="'文件：点击下载 ' + item.fileName + '.' + item.fileType">
                    <a :href="item.url">
                        <img src="../../../assets/img/welpic.jpg" style="width: 58px; height: 58px;">
                    </a>
                    <span title="删除" @click="delImg(index)">X</span>
				</div>
                <div class="image-show" @click="imageShow = false" v-show="imageShow">
                    <div class="image-wrap">
                        <img :src="imgUrl">
                    </div>
                </div>
				<p class="uploadNote">(最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF)</p>
			</Form-item>
			<Form-item label="采购目的：">
				<Input type="textarea" v-model="purchaseInfo.applyReason" :rows="4" placeholder="500字以内" style="width:50%;margin-right:10px"></Input>（供应商不可见）
			</Form-item>
			<div class="handleBtn">
				<button class="btn-save" @click="saveModify()">保存计划</button>
				<button class="btn-save" @click="saveModify(11)">提交审批</button>
				<button class="btn-save" @click="saveModify(99)">立即下单</button>
                <button class="btn-return" @click="$router.push({path: '/order/purchase/plan'})">返回</button>
			</div>
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
        <tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</Form>
</template>
<script>
	import api from '@/api/api'
    import tis from '@/page/set/tishisub.vue'
    import treeTable from '@/page/logistics/table_receipt.vue'
    
    export default {
		components: {
            tis: tis,
            treeTable: treeTable
        },
		name: 'purchaseForm',
        watch: {
            'compileForm.cityId': function(newVal){
                if(newVal == '') this.compileForm.countyId = '';
            },
            customerModel: {
                handler(newVal){
                    this.customerLists.forEach((item) => {
                        if(item.id == newVal){
                            this.customerInfo.consigneeName = item.name;
                            this.customerInfo.consigneeTel = item.tel;
                            this.customerInfo.consigneeAddress = item.address;
                            this.customerInfo.consigneeProvinceId = item.provinceId;
                            this.customerInfo.consigneeProvinceName = item.provinceName;
                            this.customerInfo.consigneeCityId = item.cityId;
                            this.customerInfo.consigneeCityName = item.cityName;
                            this.customerInfo.consigneeCountyId = item.countyId;
                            this.customerInfo.consigneeCountyName = item.countyName;
                            this.customerInfo.description = item.description;
                        }
                    })
                },
            },
            invoiceType: {
                handler(newVal){
                    if(newVal == 0 || newVal == '') {
                        this.invoiceShow = false;
                    }else {
                        this.invoiceShow = true;
                    }
                },
                immediate: true
            },
        },
		created() {
            const _this = this;

            this.corpId = this.$store.state.user.user.corpId;
            this.compileForm.corpId = _this.corpId;

			//采购清单查询
			var url = '/api/order/plan/' + this.$route.query.id + '/queryById.do';
			this.axios(url)
            .then((res) => {
                _this.purchaseInfo = res.data.datas;

                _this.customerInfo.consigneeName = _this.purchaseInfo.consigneeName;
                _this.customerInfo.consigneeTel = _this.purchaseInfo.consigneeTel;
                _this.customerInfo.consigneeAddress = _this.purchaseInfo.consigneeAddress;
                _this.customerInfo.consigneeProvinceId = _this.purchaseInfo.consigneeProvinceId;
                _this.customerInfo.consigneeProvinceName = _this.purchaseInfo.consigneeProvinceName;
                _this.customerInfo.consigneeCityId = _this.purchaseInfo.consigneeCityId;
                _this.customerInfo.consigneeCityName = _this.purchaseInfo.consigneeCityName;
                _this.customerInfo.consigneeCountyId = _this.purchaseInfo.consigneeCountyId;
                _this.customerInfo.consigneeCountyName = _this.purchaseInfo.consigneeCountyName;
                _this.customerInfo.description = _this.purchaseInfo.description;

                _this.attachments = _this.purchaseInfo.attachments;

                if(this.purchaseInfo.invoiceType == 0){
                    this.invoiceType = 0;
                }else {
                    this.invoiceType = this.purchaseInfo.invoiceType;
                    for (const key in this.invoiceInfo) {
                        this.invoiceInfo[key] = this.purchaseInfo[key];
                    }
                }

                _this.proList = _this.purchaseInfo.products;
                _this.totalMoney = 0;
                var len = _this.proList.length;
                for(var i = 0; i < len; i++) {
                    _this.totalMoney += _this.proList[i].subtotalMoney
                }
            })
            .catch((err) => {
                console.log(err);
            })

            var urlhis = '/api/order/plan/' + this.$route.query.id + '/queryAuditRecords.do';
			this.axios(urlhis)
            .then(function(res) {
                _this.auditHistory = res.data.datas;
            })
            .catch(function(err) {
                console.log(err);
            })

            this.axios('/api/upms/corp/consignee/' + _this.corpId + '/queryListByCorpId.do')
            .then((res) => {
                _this.customerLists = res.data.datas;
            })

			this.axios({
                method: 'get',
                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                url: '/api/base/address/queryAllProvinces.do'
            })
            .then((res) => {
                if(res.data.status == 1) _this.provinceList = res.data.datas;
            })
		},
		data() {
            const validatePass = (rule, value, callback) => {
				var mobile = /^1[3|5|8]\d{9}$/,
					phone = /^0\d{2,3}-?\d{7,8}$/;

				if(mobile.test(value) || phone.test(value)) {
					callback();
				} else {
					callback(new Error('请输入正确的手机号或座机号'));
				}
			};
			return {
                auditHistory: '',
                re_do: '',
				do_yn: false,
                do_no: false,
                
				hideHis: false,
				totalMoney: 0,
				purchaseInfo: {},
				attachments: [],
				
				proList: [],
				uploadUrl: api.uploadFileUrl,
				uploadData: {
					path: 'order/main/' + this.$route.query.id
				},
                uploadList: [],

                customerModel: '',

                customerInfo: {},
                customerLists: [],

                clientClassifyModel: false,
                deliverSelect: '',

                deliverShow: false,

                provinceList: '',
                cityList: '',
                countyList: '',
                compileForm: {
					corpId: '',
					name: '',
					description: '',
					provinceId: '',
					cityId: '',
					countyId: '',
					tel: '',
					defaultStatus: 0,
					address: '',
					changeoradd: ''
                },
                ruleValidate: {
					name: [{required: true,	message: '收货人能为空', trigger: 'blur'}, {type: 'string', max: 20, message: '收货人不能超过20个字符'}],
					tel: [{required: true, message: '联系电话不能为空', trigger: 'blur'}, { type: 'string', max: 20, message: '联系电话不能超过20个字符'}, { type: 'string', validator: validatePass, trigger: 'blur' }],
					address: [{type: 'string', max: 150, message: '详细收货地址不能超过150个字符'}]
                },
                invoiceInfo: {
                    invoiceTitle: '',
                    invoiceType: '',
                    invoiceContent: '',
                    invoiceBankName: '',
                    invoiceBankAccount: '',
                    invoiceTaxpayerId: ''
				},
                corpId: '',
                invoiceType: '',
                invoiceShow: false,

                imgUrl: '',
                imageShow: false,
			}
		},
		methods: {
            delImg(index){
                this.attachments.splice(index,1);
            },
            deliverEdit(item){
                this.compileForm.name = item.name;
                this.compileForm.tel = item.tel;
                this.compileForm.provinceId = item.provinceId;
                this.compileForm.cityId = item.cityId;
                this.compileForm.countyId = item.countyId;
                this.compileForm.address = item.address;
                this.compileForm.description = item.description;
                this.clientClassifyModel = true;
            },
            queryCustomer(id){
                const _this = this;
                this.axios('/api/upms/corp/consignee/' + id + '/queryListByCorpId.do')
                .then((res) => {
                    if(res.status == 200) _this.customerLists = res.data.datas;
                })
            },
            deliverCancel(){
                this.deliverSelect = '';
                this.deliverShow = false;
            },
            deliverSave(){
                this.customerModel = this.deliverSelect;
                this.deliverShow = false;
            },

            registeredprovinceOK(){
                let _this = this;
				var va = _this.compileForm.provinceId;
                if(va){
                    _this.axios({
                        method: 'get',
                        header: {"Content-Type": 'application/x-www-form-urlencoded'},
                        url: '/api/base/address/' + va + '/queryCities.do'
                    })
                    .then((res) => {
                        if(res.data.status == 1) {
                            _this.cityList = res.data.datas;
                        } else {
                            _this.do_no = true;
                            _this.re_do = res.data.message;
                            setTimeout(() => { _this.do_no = false; }, 2000);
                        }
                    })
                }
            },
            registeredcityOK(){
                let _this = this;
                var va = _this.compileForm.cityId;
                if(va){
                    _this.axios({
                        method: 'get',
                        header: { "Content-Type": 'application/x-www-form-urlencoded' },
                        url: '/api/base/address/' + va + '/queryCounties.do'
                    })
                    .then((res) => {
                        if(res.data.status == 1) {
                            _this.countyList = res.data.datas;
                        } else {
                            _this.do_no = true;
                            _this.re_do = res.data.message;
                            setTimeout(() => { _this.do_no = false;	}, 2000);
                        }
                    })
                }
            },
            cancel(){
                this.clientClassifyModel = false;
                this.compileForm.name = '';
                this.compileForm.description = '';
                this.compileForm.provinceId = '';
                this.compileForm.provinceName = '';
                this.compileForm.cityId = '';
                this.compileForm.cityName = '';
                this.compileForm.countyId = '';
                this.compileForm.countyName = '';
                this.compileForm.tel = '';
                this.compileForm.address = '';
            },
            confirm(name){
                const _this = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
                        _this.provinceList.forEach((item) => {
                            if(item.id == _this.compileForm.provinceId) _this.compileForm.provinceName = item.name;
                        })
                        _this.cityList.forEach((item) => {
                            if(item.id == _this.compileForm.cityId) _this.compileForm.cityName = item.name;
                        })
                        _this.countyList.forEach((item) => {
                            if(item.id == _this.compileForm.countyId) _this.compileForm.countyName = item.name;
                        })

                        _this.customerInfo.consigneeName = _this.compileForm.name;
                        _this.customerInfo.consigneeTel = _this.compileForm.tel;
                        _this.customerInfo.consigneeAddress = _this.compileForm.address;
                        _this.customerInfo.consigneeProvinceId = _this.compileForm.provinceId;
                        _this.customerInfo.consigneeProvinceName = _this.compileForm.provinceName;
                        _this.customerInfo.consigneeCityId = _this.compileForm.cityId;
                        _this.customerInfo.consigneeCityName = _this.compileForm.cityName;
                        _this.customerInfo.consigneeCountyId = _this.compileForm.countyId;
                        _this.customerInfo.consigneeCountyName = _this.compileForm.countyName;
                        _this.customerInfo.description = _this.compileForm.description;

						if(_this.compileForm.changeoradd == 0) {
							_this.axios({
                                method: 'post',
                                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                                url: '/api/upms/corp/consignee/add.do',
                                data: api.convertParam(_this.compileForm)
                            })
                            .then((res) => {
                                if(res.data.status == 1) {
                                    _this.clientClassifyModel = false;
                                    _this.compileForm.name = '';
                                    _this.compileForm.description = '';
                                    _this.compileForm.provinceId = '';
                                    _this.compileForm.provinceName = '';
                                    _this.compileForm.cityId = '';
                                    _this.compileForm.cityName = '';
                                    _this.compileForm.countyId = '';
                                    _this.compileForm.countyName = '';
                                    _this.compileForm.tel = '';
                                    _this.compileForm.address = '';

                                    _this.do_yn = true;
                                    _this.re_do = "添加成功";
                                    setTimeout(() => { _this.do_yn = false; }, 2000);
                                    _this.queryCustomer(_this.corpId);
                                    _this.deliverShow = false;
                                }
                            })
						} else if(_this.compileForm.changeoradd == 1) {
							_this.axios({
                                method: 'post',
                                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                                url: '/api/upms/corp/consignee/modify.do',
                                data: api.convertParam(_this.compileForm)
                            })
                            .then((res) => {
                                if(res.data.status == 1) {
                                    _this.clientClassifyModel = false;
                                    _this.compileForm.name = '';
                                    _this.compileForm.description = '';
                                    _this.compileForm.provinceId = '';
                                    _this.compileForm.provinceName = '';
                                    _this.compileForm.cityId = '';
                                    _this.compileForm.cityName = '';
                                    _this.compileForm.countyId = '';
                                    _this.compileForm.countyName = '';
                                    _this.compileForm.tel = '';
                                    _this.compileForm.address = '';

                                    _this.do_yn = true;
                                    _this.re_do = "修改成功";
                                    setTimeout(() => {_this.do_yn = false;}, 2000);
                                    _this.queryCustomer(_this.corpId);
                                    _this.deliverShow = false;
                                }
                            })
                        }
					}
				})
            },
			saveModify(val) {
                if(!this.purchaseInfo.deliveryDate){
                    this.do_no = true;
                    this.re_do = "请选择交货日期";
                    setTimeout(() => { this.do_no = false; }, 2000);
                    return false;
                }
				if(this.attachments.length == 0) {
					this.purchaseInfo.attachments = [];
				} else {
					this.purchaseInfo.attachments = this.attachments;
                }
                if(this.invoiceType == 0){
                    for (const key in this.invoiceInfo) {
                        this.purchaseInfo[key] = '';
                    }
                    this.purchaseInfo.invoiceType = 0;
                }else {
                    for (const key in this.invoiceInfo) {
                        this.purchaseInfo[key] = this.invoiceInfo[key];
                    }
                    this.purchaseInfo.invoiceType = parseInt(this.invoiceType);
                }
				this.purchaseInfo.commandTag = val;

                for (const key in this.customerInfo) {
                    this.purchaseInfo[key] = this.customerInfo[key];
                } 
				this.axios({
                    method: 'post',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: api.modifyPlan,
                    data: api.convertParam(this.purchaseInfo),
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        var msg;
                        if(val == 11) {
                            msg = "提交审核成功"
                        } else if(val == 99) {
                            msg = "下单成功";
                        } else {
                            msg = "保存成功";
                        }
                        this.$Message.success(msg);
                        this.$router.push({path: "/order/purchase/plan",})
                    } else {
                        console.log('失败',res);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            },
            
			changeNum(index) {
				this.purchaseInfo.products[index].subtotalMoney = parseInt(this.purchaseInfo.products[index].amount) * this.purchaseInfo.products[index].price;
				var len = this.proList.length;
				this.totalMoney = 0;
				for(var i = 0; i < len; i++) {
					this.totalMoney += this.proList[i].subtotalMoney
				}
            },
            //减少产品数量
			minuseNum(index) {
				var v = parseInt(this.proList[index].amount);
				if(v >= 1) {
					this.proList[index].amount = v - 1;
					this.proList[index].subtotalMoney = this.proList[index].price * parseInt((v + 1));
					var len = this.proList.length;
					this.totalMoney -= this.proList[index].price;
				}
			},
			//增加产品数量
			addNum(index) {
				var v = parseInt(this.proList[index].amount);
				this.proList[index].amount = v + 1;
				this.proList[index].subtotalMoney = this.proList[index].price * v + 1;
				var len = this.proList.length;
				this.totalMoney += this.proList[index].price;
            },
            deleteGood(index){
                this.proList.splice(index,1);
            },

			changeDate(value) {
				this.purchaseInfo.deliveryDate = value;
			},
			handleSuccess(res, file, fileList) {
				file.url = res.url;
				file.name = res.fileName;
				const image = {
					fileName: res.fileName,
					fileType: res.fileSuffix,
					filePath: res.filePath,
					url: res.url,
					orderNum: fileList.length
				}
                this.attachments.splice(this.attachments.length,0,image);
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
				});
			},
			handleBeforeUpload() {
                const check = this.uploadList.length < 5;
                const limit = this.attachments.length < 5;
				if(!limit) {
					this.$Notice.warning({
						title: '最多只能上传 5 张图片。'
                    });
                    return false;
				}
			},
		},
		computed: {
			uploadHeader() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
            },
		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
		}
	}
</script>
<style>
    .basicInfo input, .basicInfo .ivu-input {
        height: 20px;
        line-height: 20px;
    }
    .basicInfo .ivu-input {
        position: relative;
        top: 4px;
    }
    .basicInfo .ivu-input-icon {
        width: 20px;
        height: 20px;
        vertical-align: top;
    }

    .basicInfo .ivu-input-icon::before {
        position: relative;
        top: -2px;
    }

    .information>div {
        margin: 30px 0;
    }

    .information h3, .audit-history h3, .goods-info h3, .basicInfo h3 {
        margin: 20px 0 10px;
        border-bottom: 1px solid #00FF00;
        width: 90%;
        height: 30px;
    }

    .goods-info {
        height: 30px;
        margin-bottom: 10px;
        position: relative;
    }

    .goods-info span {
        position: absolute;
        top: 0;
        right: 108px;
        cursor: pointer;
        color: #8A4DB3;
    }

    .deliveredInfo strong, .basicInfo strong, .invoiceInfo strong, .goods-info strong, .audit-history strong {
        box-sizing: content-box;
        padding: 3px 7px;
        margin-bottom: 4px;
        color: #fff;
        background: #ED3F14;
        border-radius: 4px;
        font-size: 12px;
        border-bottom: 1px solid #22DDDD;
        height: 26px;
    }

    .information .ivu-col {
        height: 24px;
        line-height: 24px;
    }

    .basicInfo b, .invoiceInfo b, .deliveredInfo-row b {
        color: #464c5b;
        font-size: 12px;
    }

    .basicInfo span, .invoiceInfo span, .deliveredInfo-row span {
        color: #657180;
        font-size: 12px;
    }

    .buyList table {
        table-layout: fixed;
        border-collapse: collapse;
        width: 90%;
    }

    .buyList tr {
        height: 70px;
    }

    .buyList tr:first-child {
        height: 40px;
    }

    .buyList th {
        background: #ebf7ff;
        font-size: 12px;
        color: #464c5b;
    }

	.buyList td {
		text-align: center;
        color: #657180;
        font-size: 12px;
	}

    .buyList th, .buyList td {
        border: 1px solid #ccc;
    }

    .buyList table tr td a {
		display: inline-block;
	}
	
	.buyList table tr td a img {
		width: 50px;
	}

    .moneyInfo {
		width: 90%;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 20px;
		overflow: auto;
		clear: both;
        margin: 20px 0 40px;
	}
	
	.moneyInfo div {
        width: 150px;
	}

    .moneyInfo div:last-child {
        margin-right: 0;
        width: 120px;
    }

    .moneyInfo b {
        color: #464c5b;
        font-size: 12px;
    }

    .moneyInfo span {
        color: #657180;
        font-size: 12px;
    }

    .audit-history {
        margin-bottom: 50px;
    }

    .audit-history table {
        table-layout: fixed;
        width: 800px;
        border-collapse: collapse;
        margin: 30px 0 0 0;
    }

    .audit-history th {
        background: #ebf7ff;
        font-size: 12px;
        color: #464c5b;
        height: 34px;
    }
    
    .audit-history td, .audit-history th {
        border: 1px solid #ccc;
    }

    .audit-history td {
        padding-left: 10px;
        color: #657180;
        font-size: 12px;
        height: 40px;
    }
</style>


<style scoped>
	.plus {
		padding: 15px 20px;
		margin-top: -3px;
		border: 1px dashed #ccc;
        cursor: pointer;
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

    .upload-img:hover span, .upload-file:hover span {
        background: #ccc;
        display: block;
    }

    .upload-img span, .upload-file span {
        position: absolute;
        display: none;
        top: 0px;
        right: 0;
        height: 15px;
        width: 15px;
        line-height: 15px;
        text-align: center;
    }

    .upload-img span:hover, .upload-file span:hover {
        background: #000;
        color: #fff;
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
	
	.todate.ivu-form-item {
		margin-bottom: 10px;
	}
	
	.todate .ivu-form-item-label {
		float: left;
	}
	
	.todate .ivu-form-item-content {
		float: left;
		width: 200px;
	}

    .todate .ivu-input {
        padding: 0;
        height: 20px;
    }
	
	.joinplanInfo {
		font-size: 14px;
	}
	
	.joinplanInfo .remarks {
		width: 80%
	}
	
	.joinplanInfo.ivu-form .ivu-form-item-label {
		font-weight: bold;
		font-size: 14px;
	}
	
	.joinplanInfo .label {
		font-size: 14px;
	}
	
	.joinplanInfo .upload {
		padding: 0;
		float: none;
	}
	
	.joinplanInfo .upload .ivu-upload {
		float: none;
	}
	
	.joinplanInfo .upload .ivu-upload-list-file {
		/* float: left; */
		width: 20%;
	}
	
	.joinplanInfo .ivu-tabs-content {
		margin-top: 30px;
	}
	
	.joinplanInfo .ivu-tabs-mini .ivu-tabs-tab {
		font-size: 14px;
	}
	
	.joinplanInfo .ivu-tabs-mini .ivu-tabs-tab-active {
		font-weight: bold;
	}

	.joinplanInfo .upload.ivu-form-item {
		margin-top: -10px;
	}
	
	.joinplanInfo .purchaseInfo.ivu-row {
		margin-top: 20px;
	}

    

    .deliveredInfo, .invoiceInfo {
        position: relative;
    }

    .invoiceInfo input, .invoiceInfo select {
        height: 20px;
        border-radius: 4px;
        outline: none;
        border: 1px solid #ccc;
        width: 200px;
    }

    .invoiceInfo input {
        padding-left: 4px;
    }

    .basicInfo label {
        color: #464c5b;
        font-size: 12px;
    }


	.joinplanInfo .infoItem {
		width: 100%;
		padding: 4px 0;
		overflow: auto;
		clear: both;
	}
	
	.joinplanInfo .infoItem .label {
		float: left;
		font-weight: bold;
	}
	
	.joinplanInfo .infoItem .itemWord {
		overflow: auto;
	}
	
    .buyList-price, .buyList-subtotal, .buyList-oper {
        width: 10%;
    }
	
	.buyList .proNum .minuse,
	.buyList .proNum .add {
		display: inline-block;
		width: 27px;
		height: 27px;
		margin: 0 -1px;
		font-size: 18px;
		font-weight: bold;
		background-color: #ededed;
		border: 1px solid #ccc;
		cursor: pointer;
	}

	.minuse {
		width: 30px !important;
		height: 32px !important;
	}
	
	.add {
		width: 30px !important;
		height: 32px !important;
	}
	
	.buyList .proNum .ivu-input {
		height: 27px;
		line-height: 27px;
		vertical-align: 6px;
		border-left: 0;
		border-right: 0;
		border-radius: 0;
		text-align: center;
		outline: none;
	}
	
	.ivu-input {
		text-align: center !important;
	}
	
	.buyList .proNum .ivu-input:focus {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		box-shadow: none;
	}
	
	.buyList .proNum .ivu-input:hover {
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		box-shadow: none;
	}
	
	.proNum_div {
		display: flex;
		justify-content: center;
	}

    .delivered-title {
        margin-left: 6px;
        margin-top: 2px;
        font-size: 14px;
        color: #0000ff;
        cursor: pointer;
        vertical-align: middle;
    }

    .deliver-edit {
        z-index: 2;
        position: absolute;
        background: #fff;
        border: 1px solid #ff9900;
        left: 64px;
        top: 4px;
        padding: 4px 0 20px 10px;
        width: 800px;
    }

    .deliver-edit h4 {
        margin: 0 0 10px 10px;
    }

    .deliver-form {
        height: 120px;
        overflow: auto;
        margin-bottom: 10px;
    }

    .deliver-list {
        margin-left: 20px;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
    }

    .deliver-list:hover {
        background: #f1d9d2;
    }

    .deliver-list span {
        margin-left: 10px;
    }

    .deliver-submit {
        margin-top: 20px;
    }

    .deliver-select {
        background: #f1d9d2;
    }

    .deliver-label {
        cursor: pointer;
    }

    .deliver-editbtn {
        color: #0000ff;
        cursor: pointer;
        float: right;
        margin-right: 20px;
    }

    .deliver-new {
        margin: 0 0 0 10px;
        color: #0000ff;
        font-size: 14px;
        cursor: pointer;
    }

    .deliver-list-edit {
        float: right;
        margin-right: 20px;
        color: #0000ff;
        font-size: 12px;
        cursor: pointer;
    }

    
</style>