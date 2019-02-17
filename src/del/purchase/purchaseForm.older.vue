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
		<div class="right_home_warp">
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
                            <Col span="5"><span>{{customerInfo.consigneeName + ' ' + customerInfo.consigneeTel}}</span></Col>
                            <Col span="3" style="text-align:right;"><b>收货地址：</b></Col>
                            <Col span="13"><span>{{customerInfo.provinceName + ' ' + customerInfo.cityName + ' ' + customerInfo.countyName + ' ' + customerInfo.address}}</span></Col>
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
                                </label>
                            </div>
                        </div>
                        <span class="deliver-new">新增收货地址</span>
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
                                    <Option v-for="provinceName in depList1" :value="provinceName.id" :key="provinceName.id">{{ provinceName.name }}</Option>
                                </Select>
                                <Select placeholder="请选择市" v-model="compileForm.cityId" @on-change="registeredcityOK" style="width:32%">
                                    <Option v-for="cityeName in depList2" :value="cityeName.id" :key="cityeName.id">{{ cityeName.name }}</Option>
                                </Select>
                                <Select placeholder="请选择区" v-model="compileForm.countyId" style="width:32%">
                                    <Option v-for="countyName in depList3" :value="countyName.id" :key="countyName.id">{{ countyName.name }}</Option>
                                </Select>
                            </Form-item>
                            <Form-item label="" prop='address'>
                                <Input v-model="compileForm.address" placeholder="详细收货地址"></Input>
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
                                    <option value="" selected disabled>请选择发票类型</option>
                                    <option v-for="(item,index) in invoiceOption" :key="index" :value="item.value">{{item.text}}</option>
                                    <!-- <option value="" disabled>请选择发票类型</option>
                                    <option :value="0">不开发票</option>
                                    <option :value="1">普通发票</option>
                                    <option :value="2">增值税发票</option> -->
                                </select>
                            </span>
                        </Col>
                        <div v-show="show">
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
				<Input type="textarea" v-model="purchaseInfo.description" :rows="2" placeholder="500字以内,采购要求是针对供应商而言" style="width:50%;margin-right:10px;"></Input>(供应商可见)
			</Form-item>
			<Form-item label="附件：" class="upload">
				<Upload ref="upload" 
                  :headers="uploadHeader" 
                  :show-upload-list="true" 
                  :default-file-list="defaultList" 
                  :on-success="handleSuccess" 
                  :max-size="11112048" 
                  :on-format-error="handleFormatError" 
                  :on-exceeded-size="handleMaxSize" 
                  :before-upload="handleBeforeUpload" multiple 
                  :action="uploadUrl" 
                  :data='uploadData' 
                  style="display: inline-block;width:58px;"
                  class="uploadCont">
					<div style="width: 58px;height:56px;line-height: 56px;">
                        <Icon class="plus" type="plus" size="20"></Icon>
                    </div>
				</Upload>
				<p class="uploadNote">(最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF)</p>
			</Form-item>
			<div class="audit-info">
                <h3><strong>审核信息</strong></h3>
            </div>
			<Form-item label="采购目的：">
				<Input type="textarea" v-model="purchaseInfo.applyReason" :rows="4" placeholder="500字以内" style="width:50%;margin-right:10px"></Input>（供应商不可见）
			</Form-item>
			<div class="handleBtn">
				<button class="btn-save" @click="saveModify()">保存计划</button>
				<button class="btn-save" @click="saveModify(11)">提交审批</button>
				<button class="btn-save" @click="saveModify(99)">立即下单</button>
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
            customerModel: {
                handler(newVal){
                    this.customerLists.forEach((item) => {
                        if(item.id == newVal){
                            this.customerInfo = item;
                            this.customerInfo.consigneeName = this.purchaseInfo.consigneeName;
                            this.customerInfo.consigneeTel = this.purchaseInfo.consigneeTel;
                            this.customerInfo.consigneeAddress = this.purchaseInfo.consigneeAddress;
                            this.customerInfo.consigneeProvinceId = this.purchaseInfo.consigneeProvinceId;
                            this.customerInfo.consigneeProvinceName = this.purchaseInfo.consigneeProvinceName;
                            this.customerInfo.consigneeCityId = this.purchaseInfo.consigneeCityId;
                            this.customerInfo.consigneeCityName = this.purchaseInfo.consigneeCityName;
                            this.customerInfo.consigneeCountyId = this.purchaseInfo.consigneeCountyId;
                            this.customerInfo.consigneeCountyName = this.purchaseInfo.consigneeCountyName;
                        }
                    })
                },
            },
        },
		created() {
            const _this = this;

            this.corpId = this.$store.state.user.user.corpId;
            this.compileForm.corpId = this.corpId;

			//采购清单查询
			var url = '/api/order/plan/' + this.$route.query.id + '/queryById.do';
			this.axios(url)
            .then((res) => {
                this.purchaseInfo = res.data.datas;
                
                // if(res.data.datas.invoiceType != null){
                //     this.invoiceType = this.res.data.datas.invoiceType;
                // }
                
                this.customerInfo.consigneeName = this.purchaseInfo.consigneeName;
                this.customerInfo.consigneeTel = this.purchaseInfo.consigneeTel;
                this.customerInfo.consigneeAddress = this.purchaseInfo.consigneeAddress;
                this.customerInfo.consigneeProvinceId = this.purchaseInfo.consigneeProvinceId;
                this.customerInfo.consigneeProvinceName = this.purchaseInfo.consigneeProvinceName;
                this.customerInfo.consigneeCityId = this.purchaseInfo.consigneeCityId;
                this.customerInfo.consigneeCityName = this.purchaseInfo.consigneeCityName;
                this.customerInfo.consigneeCountyId = this.purchaseInfo.consigneeCountyId;
                this.customerInfo.consigneeCountyName = this.purchaseInfo.consigneeCountyName;


                this.proList = this.purchaseInfo.products;
                this.totalMoney = 0;
                var len = this.proList.length;
                for(var i = 0; i < len; i++) {
                    this.totalMoney += this.proList[i].subtotalMoney
                }
            })
            .catch((err) => {
                console.log(err);
            })

            this.axios('/api/upms/corp/consignee/' + _this.corpId + '/queryListByCorpId.do')
            .then((res) => {
                _this.customerLists = res.data.datas;
            })

			this.searchaddress();

			this.axios({
                method: 'get',
                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                url: '/api/base/address/queryAllProvinces.do'
            })
            .then((res) => {
                if(res.data.status == 1) _this.depList1 = res.data.datas;
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
				defaultList: [],
                uploadList: [],

                customerModel: '',

                customerInfo: {},
                customerLists: [],

                clientClassifyModel: false,
                deliverSelect: '',

                deliverShow: false,

                depList1: '',
                depList2: '',
                depList3: '',
                compileForm: {
					corpId: '',
					name: '',
					code: '',
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
					invoiceContent: '',
                    invoiceBankAccount: '',
                    invoiceBankName: '',
                    invoiceTaxpayerId: '',
				},
                corpId: '',
                invoiceType: '',
                invoiceOption: [
                    // {text: '请选择发票类型', value: ''},
                    {text: '不开发票', value: '0'},
                    {text: '普通发票', value: '1'},
                    {text: '增值税发票', value: '2'},
                ],
                show: false,
                invoiceShow: false,
			}
		},
		methods: {
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
            addRoot() {
				const _this = this;
				_this.compileForm.changeoradd = 0;
				_this.compileForm.corpId = _this.corpId;
				_this.parentName = '无';
				_this.clientClassifyModel = true;
			},
            searchaddress() {
				const _this = this;
				_this.axios({
                    method: 'get',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: '/api/upms/corp/consignee/' + _this.compileForm.corpId + '/queryListByCorpId.do',
                    data: api.convertParam({corpId: _this.compileForm.corpId})
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        _this.data = res.data.datas;
                    }
                })
			},
            registeredprovinceOK(){
                let _this = this;
				let va = _this.compileForm.provinceId;

				_this.axios({
                    method: 'get',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: '/api/base/address/' + va + '/queryCities.do'
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        _this.depList2 = res.data.datas;
                    } else {
                        _this.do_no = true;
                        _this.re_do = res.data.message;
                        setTimeout(() => { _this.do_no = false; }, 2000);
                    }
                })
            },
            registeredcityOK(){
                let _this = this;
				let va = _this.compileForm.cityId;
				_this.axios({
                    method: 'get',
                    header: { "Content-Type": 'application/x-www-form-urlencoded' },
                    url: '/api/base/address/' + va + '/queryCounties.do'
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        _this.depList3 = res.data.datas;
                    } else {
                        _this.do_no = true;
                        _this.re_do = res.data.message;
                        setTimeout(() => { _this.do_no = false;	}, 2000);
                    }
                })
            },
            cancel(){
				this.clientClassifyModel = false;
				this.compileForm.name = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
            },
			addPro(event) {
				this.$router.push({path: "/material/mall/main"});
            },
            confirm(name){
                const _this = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
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
                                    _this.compileForm.code = '';
                                    _this.compileForm.description = '';
                                    _this.compileForm.provinceId = '';
                                    _this.compileForm.cityId = '';
                                    _this.compileForm.countyId = '';
                                    _this.compileForm.tel = '';
                                    _this.compileForm.defaultStatus = 0;
                                    _this.compileForm.address = '';
                                    _this.searchaddress();

                                    _this.do_yn = true;
                                    _this.re_do = "添加成功";
                                    setTimeout(() => { _this.do_yn = false; }, 2000);
                                    _this.queryCustomer(_this.corpId);
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
                                    _this.deliverSelect = _this.compileForm.id;

                                    _this.clientClassifyModel = false;
                                    _this.compileForm.name = '';
                                    _this.compileForm.code = '';
                                    _this.compileForm.description = '';
                                    _this.compileForm.provinceId = '';
                                    _this.compileForm.cityId = '';
                                    _this.compileForm.countyId = '';
                                    _this.compileForm.tel = '';
                                    _this.compileForm.defaultStatus = 0;
                                    _this.compileForm.address = '';

                                    _this.searchaddress();

                                    _this.do_yn = true;
                                    _this.re_do = "修改成功";
                                    setTimeout(() => {_this.do_yn = false;}, 2000);
                                    _this.queryCustomer(_this.corpId);
                                }
                            })
                        }
					}
				})
            },
			saveModify(val) {
                const _this = this;
                var postInfo = {};

                if(!this.purchaseInfo.deliveryDate){
                    _this.do_no = true;
                    _this.re_do = "请选择交货日期";
                    setTimeout(() => { _this.do_no = false; }, 2000);
                    return false;
                }
				postInfo.id = this.purchaseInfo.id;
				postInfo.applyDepId = this.purchaseInfo.applyDepId;
				postInfo.deliveryDate = this.purchaseInfo.deliveryDate;
                postInfo.description = this.purchaseInfo.description;
                if(this.invoiceType == 1 || this.invoiceType == 2){
                    postInfo.invoiceType = this.invoiceType;
                    postInfo.invoiceTitle = this.invoiceInfo.invoiceTitle;
                    postInfo.invoiceContent = this.invoiceInfo.invoiceContent;
                    postInfo.invoiceBankAccount = this.invoiceInfo.invoiceBankAccount;
                    postInfo.invoiceBankName = this.invoiceInfo.invoiceBankAccount;
                    postInfo.invoiceTaxpayerId = this.invoiceInfo.invoiceTaxpayerId;
                }else {
                    postInfo.invoiceType = 0;
                }
				if(this.attachments.length < 1) {
					//postInfo.attachments = '';
				} else {
					postInfo.attachments = this.attachments;
                }
				postInfo.applyReason = this.purchaseInfo.applyReason;
				postInfo.commandTag = val;
                postInfo.products = [];
                
				this.purchaseInfo.products.forEach((item, index) => {
					var newsku = {};
					newsku.productId = item.productId;
					newsku.skuId = item.skuId;
					newsku.amount = item.amount;
                    newsku.requiredDesc = this.proList[index].requiredDesc;
                    postInfo.products[index] = newsku;
                });
                postInfo.consigneeName = this.customerInfo.name;
                postInfo.consigneeTel = this.customerInfo.tel;
                postInfo.consigneeAddress = this.customerInfo.address;
                postInfo.consigneeProvinceId = this.customerInfo.provinceId;
                postInfo.consigneeProvinceName = this.customerInfo.provinceName;
                postInfo.consigneeCityId = this.customerInfo.cityId;
                postInfo.consigneeCityName = this.customerInfo.cityName;
                postInfo.consigneeCountyId = this.customerInfo.countyId;
                postInfo.consigneeCountyName = this.customerInfo.countyName;

				_this.axios({
                    method: 'post',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: api.modifyPlan,
                    data: api.convertParam(postInfo),
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
                        _this.$Message.success(msg);
                        _this.$router.push({
                            path: "/order/purchase/plan",
                        })
                    } else {

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
				this.attachments.push(image);
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
				if(!check) {
					this.$Notice.warning({
						title: '最多只能上传 5 张图片。'
					});
				}
				return check;
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

</style>


<style scoped>
	.plus {
		padding: 15px 20px;
		margin-top: -3px;
		border: 1px dashed #ccc;
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
	
	.moneyInfo {
		width: 90%;
		display: flex;
		justify-content: flex-end;
		/*margin-top: -10px;*/
		margin-bottom: 20px;
		overflow: auto;
		clear: both;
        margin: 20px 0 40px;
	}
	
	.moneyInfo div {
		margin-right: 50px;
	}

    .moneyInfo div:last-child {
        margin-right: 0;
    }

    .moneyInfo b {
        color: #464c5b;
        font-size: 12px;
    }

    .moneyInfo span {
        color: #657180;
        font-size: 12px;
    }

	.joinplanInfo .upload.ivu-form-item {
		margin-top: -10px;
	}
	
	.joinplanInfo .purchaseInfo.ivu-row {
		margin-top: 20px;
	}

    .information>div {
        margin: 30px 0;
    }

    .information h3, .audit-info h3, .audit-history h3, .goods-info h3, .basicInfo h3 {
        margin: 20px 0 10px;
        border-bottom: 1px solid #00FF00;
        width: 90%;
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

    h3 {
        height: 30px;
    }

    .deliveredInfo strong, .basicInfo strong, .invoiceInfo strong, .goods-info strong, .audit-info strong, .audit-history strong {
        box-sizing: content-box;
        padding: 3px 7px;
        margin-bottom: 4px;
        color: #fff;
        background: #ED3F14;
        border-radius: 4px;
        font-size: 12px;
        border-bottom: 1px solid #22DDDD;
        padding: 0 5px 2px 5px;
    }

    .audit-info {
        margin: 0 0 20px 0;
    }

    .audit-info span {
        color: #ccc;
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
	
	/* .buyList tr:hover {
		background-color: #ebf7ff;
	} */
	
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

	.buyList table tr td a {
		display: inline-block;
	}
	
	.buyList table tr td a img {
		width: 50px;
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
    }
    
    .audit-history td, .audit-history th {
        height: 30px;
        border: 1px solid #ccc;
    }
</style>