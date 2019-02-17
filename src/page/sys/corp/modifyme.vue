<template>
	<div class="localimport" @click="maopao">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item class="link_span">设置</Breadcrumb-item>
			<Breadcrumb-item class="link_span ok_link">基本信息</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
            <div class="right_home_warp-title">
                <router-link to="/sys/corp/modifyme" class="right_home_warp-sel">基本信息</router-link>
                <router-link to="">联系人</router-link>
                <router-link to="/sys/corp/consignees_list">收货地址</router-link>
                <router-link to="">银行账户信息</router-link>
                <router-link to="/sys/corp/invoice/modify">发票信息</router-link>
            </div>
			<Form class="compInfoForm">
				<!--<div class="formItem">
					<div class="label"><span class="Must">*</span>公司类型：</div>
					<span class="formItem_span">{{corpType}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>-->
				<div class="formItem">
					<div class="label"><span class="Must">*</span>公司名称：</div>
					<span class="formItem_span">{{companyData.name}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
			
				<div class="formItem">
					<div class="label">企业英文名称：</div>
					<Input placeholder="请输入企业英文名称" v-model="companyData.englishName" style="width:440px"></Input>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>统一社会信用代码：</div>
					<span class="formItem_span">{{companyData.usci}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>注册地址：</div>
					<span class="formItem_span">{{companyData.registeredProvinceName + companyData.registeredCityName +companyData.registeredCountyName+companyData.registeredAddress}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>经营地址：</div>
					<span class="formItem_span">{{companyData.provinceName + companyData.cityName +companyData.countyName+companyData.address }}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<!--<div class="formItem">
					<div class="label">经营地址：</div>
					<Input placeholder="请输入..." v-model="companyData.registeredAddress" style="width:440px"></Input>
				</div>-->
				<div class="formItem">
					<div class="label"><span class="Must">*</span>法定代表/企业负责人姓名：</div>
					<span class="formItem_span">{{companyData.legalPerson}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>经营模式：</div>
					<span class="formItem_span">{{companyData.enterpriseNature}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>企业性质：</div>
					<span class="formItem_span">{{companyData.enterpriseNature}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>企业规模：</div>
					<span class="formItem_span">{{companyData.enterpriseSize}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>年营业额：</div>
					<span class="formItem_span">{{companyData.yearTurnover}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>经营范围：</div>
					<span class="formItem_span">{{companyData.name}}</span>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<div class="formItem">
					<div class="label">企业所属行业：</div>

					<div class="addqu">
						<div class="addqukuang" v-show="qysshy_v.length > 0">
							<div v-for="(item,index) in qysshy_v" class="addqukuangnr test-1" :key="index"><span class="addqukuangf">{{item}}</span><span class="addqukuangnr_del" @click="delqyss(item,index)"></span></div>

						</div>
						<button @click="modal1 = true">选择/修改</button>
					</div>
				</div>
				<div class="formItem">
					<div class="label">客户所属行业：</div>
					<div class="addqu">
						<div class="addqukuang" v-show="khsshy_v.length > 0">
							<div v-for="(item,index) in khsshy_v" class="addqukuangnr test-1" :key="index"><span class="addqukuangf">{{item}}</span><span class="addqukuangnr_del" @click="delkhss(item,index)"></span></div>
						</div>
						<button @click="modal2 = true">选择/修改</button>
					</div>
				</div>
				<div class="formItem">
					<div class="label">主营产品：</div>
					<div class="add_canpinkuang">
						<div>
							<div v-for="(item,index) in cpsshy" class="cpkuang" :key="index">
								<div v-model="item.value">{{item}}<span class="addqukuangnr_del" @click="delcpss(item,index)">X</span></div>

							</div>
						</div>
						<div class="add_canpinkuang_input">
							<Input v-model="cpnr" placeholder="请输入主营产品" /><button @click="addcp">确定</button>
						</div>

					</div>
				</div>
				<!--<div class="formItem">
					<div class="label">品牌名称：</div>
					<Input placeholder="请输入品牌名称" v-model="companyData.englishName" style="width:440px"></Input>
				</div>-->
				<div class="formItem">
					<div class="label">主要销售区域：</div>
					<div class="addqu">
						<div class=" addqukuang addqukuang2" v-show="xssshy_v.length > 0">
							<div v-for="(item,index) in xssshy_v" class="addqukuangnr test-1" :key="index"><span class="addqukuangf">{{item}}</span><span class="addqukuangnr_del" @click="delxsss(item,index)"></span></div>
						</div>
						<button @click="modal3 = true">选择/修改</button>
					</div>
					<!--<Cascader :data="industryData" class="industry" v-model="companyData.lstTradeAncestorIds" style="float:left;"></Cascader>-->
				</div>
				<div class="formItem">
					<div class="label">公司网址：</div>
					<Input placeholder="请输入公司网址" v-model="companyData.website" style="width:440px"></Input>
				</div>
				<div class="formItem">
					<div class="label">公司电话：</div>
					<Input placeholder="请输入公司电话" v-model="companyData.telephone" style="width:440px"></Input>
				</div>
				<div class="formItem">
					<div class="label">公司传真：</div>
					<Input placeholder="请输入公司传真" v-model="companyData.fax" style="width:440px"></Input>
				</div>
				<div class="formItem">
					<div class="label">联系人：</div>
					<Input placeholder="请输入联系人" v-model="companyData.contact" style="width:440px"></Input>
				</div>
				<div class="formItem">
					<div class="label">联系人电话：</div>
					<Input placeholder="请输入联系人电话" v-model="companyData.contactId" style="width:440px"></Input>
				</div>
				<div class="formItem formItem2">
					<div class="label">公司简介：</div>
					<Input type="textarea" :rows="4" v-model="companyData.description" placeholder="请输入公司简介" style="width:500px;height:;"></Input>
				</div>
				<!--<div class="formItem formItemArea">
					<div class="label"><span class="star">*</span>所在地区：</div>
					<div @click="showArea">{{companyData.countyFullName}}</div>
					<div class="area" v-show="flag" @click="showArea">
						<div class="areaTab">
							<span class="tactive" @click="areaTab(0)">省份</span>
							<span @click="areaTab(1)">城市</span>
							<span @click="areaTab(2)">区县</span>
						</div>
						<div class="areaCont areaProv">
							<div>
								<span v-for="item in proviceKey">{{item}}</span>
							</div>
							<ul>
								<li v-for="(item,index) in provice">
									<span v-for="(subitem,subix) in provice[index]"><a href="javascript:;" 
	        					 v-if="subitem.name==areaVarry[0]" @click="selArea(1,subitem.id)" class="active">{{subitem.name}}</a>
	        					 <a href="javascript:;"
	        					  @click="selArea(1,subitem.id)" v-else>{{subitem.name}}</a>
	        					  </span>
								</li>
							</ul>
						</div>
						<div class="areaCont">
							<ul>
								<li>
									<span v-for="(item,index) in cityList"><a href="javascript:;" v-if="item.name==areaVarry[1]"  @click="selArea(2,item.id)" class="active">{{item.name}}</a>
								<a href="javascript:;" @click="selArea(2,item.id)" v-else>{{item.name}}</a>
								</span>
								</li>
							</ul>
						</div>
						<div class="areaCont">
							<ul>
								<li>
									<span v-for="(item,index) in areaList"><a href="javascript:;" v-if="item.name==areaVarry[2]"  @click="selArea(3,item.id)" class="active">{{item.name}}</a>
								<a href="javascript:;" @click="selArea(3,item.id)" v-else>{{item.name}}</a>
								</span>
								</li>
							</ul>
						</div>
					</div>
				</div>-->
				<div class="formItem formItem2">
					<div class="label"><span class="Must">*</span>企业营业执照：</div>
					<div class="uploadbtn">
						<img :src="companyData.imgBizLicense" v-show="logoShow">
					</div>
					<spanz :status="status" class="formItem_renzhengok"></spanz>
				</div>
				<!--<div class="formItem formLogo formItem2" @mouseenter="uploadShow" @mouseleave="uploadHide">
					<div class="label"><span class="Must">*</span>公司LOGO：</div>
					<div class="uploaddiv">
						<Upload :format="['jpg','jpeg','png']" accept="image/jpg,image/jpeg,image/png" :action="uploadUrl" :headers="uploadHeader" :on-success="handleSuccessBusiness">
							<Button type="ghost" class="uploadbtn"></Button>
						</Upload>
						<div id="imgupload_zhe_div">
							<img :src="companyData.logoUrl" class="imgshow" />
							<div class="imgupload_zhe">
								<div class="imgupload_zhediv" style="text-align: center;width: 100%;">
									<Icon size="30" color='white' type="eye" @click.native="fangda" />
									<Icon size="30" color='white' type="plus" @click.native="tianjia" />
								</div>

							</div>
						</div>

					</div>
				</div>-->

				<!--<img :src="companyData.logoUrl" class="logo" v-show="logoShow">
					<Upload ref="upload" :headers="uploadHeader" :show-upload-list="true" :default-file-list="defaultList" :on-success="handleSuccess" :max-size="11112048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :format="['jpg','jpeg','png']" :before-upload="handleBeforeUpload" :action="uploadUrl" :data='uploadData' class="upFile" v-show="uploadFlag">
						<div>
							<Icon type="android-add"></Icon>
						</div>
					</Upload>-->
			</Form>
			<div v-show="showis" class="rightBox_but" @click="isshow">
				<div>
					<img :src="companyData.logoUrl" />
				</div>
			</div>
		</div>
		<div class="btn-bot">
			<button class="btn-save" @click="saveCompany">保存</button>
			<button class="btn-cancel" @click="chongzhi()">取消</button>
		</div>
		<div class="qysstan_box" v-show="modal1">
			<div class="qysstan">
				<div class="py_tit">选择企业所在属行业</div>
				<div style="min-height: 200px;">
					<CheckboxGroup v-model="social">
						<Checkbox :label="index" v-for="(item,index) in qysshy2" :key="index">
							<span>{{item.name}}</span>
						</Checkbox>
					</CheckboxGroup>
				</div>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="qyssguan">确定</Button>
					<Button type="text" @click='qyssguan_x'>取消</Button>
				</div>
			</div>
		</div>

		<div class="qysstan_box" v-show="modal2">
			<div class="qysstan" >
				<div class="py_tit">选择客户所在属行业</div>
				<div style="min-height: 200px;">
					<CheckboxGroup v-model="social2">
						<Checkbox :label="index" v-for="(item,index) in qysshy2" :key="index">
							<span>{{item.name}}</span>
						</Checkbox>
					</CheckboxGroup>
				</div>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="khssguan">确定</Button>
					<Button type="text" @click='khssguan_x'>取消</Button>
				</div>
			</div>
		</div>
		<div class="qysstan_box" v-show="modal3">
			<div class="qysstan" >
				<div class="py_tit">选择主要销售区域</div>
				<div style="min-height: 200px;">
					<CheckboxGroup v-model="social3">
						<Checkbox :label="index" v-for="(item,index) in xssshy2" :key="index">
							<span>{{item.name}}</span>
						</Checkbox>
					</CheckboxGroup>
				</div>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="xsssguan">确定</Button>
					<Button type="text" @click='xsssguan_x'>取消</Button>
				</div>
			</div>
		</div>
		<!--<div v-show="do_yn" class="do_ok">
        	<img src="../../../assets/img/tanokimg.png"/>
        	<span>{{re_do}}</span>
        </div>
        <div v-show="do_no" class="do_no">
        	<img src="../../../assets/img/tannoimg.png"/>
        	<span>{{re_do}}</span>
        </div>-->
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>
<script>
	import api from '@/api/api'
	import spanz from '@/page/sys/corp/modifymeSub.vue'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			spanz: spanz,
			tis: tis
		},
		data() {
			return {
				corpType:'',
				re_do: '',
				do_no: '',
				do_yn: false,
				do_no: false,
				status: null,
//				span_tis: '',
				pageInfo: {
					count: 1,
					pageStart: 1,
					pageNums: 10
				},
				qysstan: true,
				qyhy: false,
				showUpList: 'false',
				showis: false,

				externalName: '',
				externalContactFlag: false,
				cflag: false, //区县能否点
				cflag2: false, //城市能否点
				flag: false,
				areaV: '北京市/市辖区/海淀区/',
				areaVarry: [],
				provice: [],
				proviceKey: [],
				cityList: [],
				areaList: [],
				jyms: '1', //经营模式
				companyData: {
					shortName: '', //简称，少于100字
					description: '', //企业简介，不多于500字
					englishName: '', //英文名称，100个字符以内
					address: '', //详细地址，200字以内 
					postCode: '', //邮政编码：6位数字
					telephone: '', //服务电话：20字符以内
					fax: '', //服务传真：20字符以内
					logoUrl: '', //
					provinceId: '', //
					cityId: '', //
					countyId: '', //
					contact: '', //联系人
					uscc: '', //工商执照注册号/统一社会信用代码：60字符以内 
					website: '', //公司网址，100个字符以内
					tradeId: '', //所在行业
					serviceTradeId: '', //服务行业
					contactId: '', //对外联系人ID
					pinpai: '', //品牌名称
					enterpriseSize: '',
					//					tradeName:'',
					//					serviceTradeName:'',
					//					saleArea:'',

				},
				externalContactValue: {
					name: '',
					title: '',
					mobile: '',
					wxId: ''

				}, //对外联系人
				attachments: [],
				uploadUrl: api.uploadFileUrl,
				uploadData: {
					path: 'corp/'
				},
				defaultList: [],
				imgUrl: '',
				visible: false,
				uploadFlag: true,
				uploadList: [],
				industryV: [],
				industryServiceV: [],
				logoShow: false,
				cityId: '',
				provinceId: '',
				modal1: false, //企业所属行业弹窗显示关闭开关	
				//				qysshyid: [], //企业所属行业：已选择内容id数组
				qysshy_v: [], //企业所属：已选择内容的中文名数组
				qysshy: [], //企业所属行业已选择的内容
				social: [], ////企业所属行业弹窗部分已选择的内容
				qysshy2: [],
				modal2: false, //客户所属行业弹窗显示关闭开关
				//				khsshyid: [], //客户所属行业：已选择内容id数组
				khsshy_v: [], //客户所属行：已选择内容的中文名数组
				khsshy: [], //客户所属行业：已选择内容id数组
				social2: [], ////客户所属行业弹窗部分已选择的内容
				khsshy2: [],
				modal3: false, //销售区域弹窗显示关闭开关
				xssshy: [], //销售区域：已选择内容id数组
				xssshy_v: [], //销售区域：已选择内容的中文名数组
				social3: [], ////销售区域：弹窗部分已选择的内容的数组
				xssshy2: [], //销售区域：弹窗内容数组，需接入接口数据	
				cpnr: "",
				cpsshy: [], //主营产品已有内容，需接入接口数据

				industryData: [{
					value: 'beijing',
					label: '北京',
					children: [{
							value: 'gugong',
							label: '故宫'
						},
						{
							value: 'tiantan',
							label: '天坛'
						},
						{
							value: 'wangfujing',
							label: '王府井'
						}
					]
				}, {
					value: 'jiangsu',
					label: '江苏',
					children: [{
							value: 'nanjing',
							label: '南京',
							children: [{
								value: 'fuzimiao',
								label: '夫子庙',
							}]
						},
						{
							value: 'suzhou',
							label: '苏州',
							children: [{
									value: 'zhuozhengyuan',
									label: '拙政园',
								},
								{
									value: 'shizilin',
									label: '狮子林',
								}
							]
						}
					],
				}],
				columnsContact: [{
						title: '用户姓名',
						align: 'center',
						key: 'name'
					},
					{
						title: '职务',
						align: 'center',
						key: 'title'
					},
					{
						title: '手机号',
						align: 'center',
						key: 'mobile'
					},
					{
						title: '微信号',
						align: 'center',
						key: 'wxId'
					}
				],
				externalContact: [{
						name: '张三',
						title: '',
						mobile: '',
						wxId: ''
					},
					{
						name: '李四',
						title: '',
						mobile: '',
						wxId: ''
					}
				]
			}
		},
		methods: {

			//添加主营产品单个添加按钮
			addcp() {
				let _this = this;
				if(_this.cpnr == '') {
//					_this.span_tis = '请输入产品名'
						_this.do_no = true;
						_this.re_do = '请输入产品名';
							setTimeout(() => {
									_this.do_no = false;		
									}, 2000);
					return false;
				} else {
					let zycp = _this.cpnr;
					_this.cpsshy.push(zycp);
					_this.cpnr = '';
				}

			},
			delcpss(item, index) { //删除主营产品x
				let _this = this;
				_this.cpsshy.splice(index, 1);
			},
			//添加销售区域所属行业弹出确认按钮3
			xsssguan() {
				let _this = this;
				var newxssshy2 = [];
				_this.xssshy_v = [];
				for(var xss = 0; xss < _this.social3.length; xss++) {
					var socailnum = _this.social3[xss];
					_this.xssshy_v.push(_this.xssshy2[socailnum].name); //添加区域名
					newxssshy2.push(_this.xssshy2[socailnum].id);
					_this.xssshy = newxssshy2; //添加区域id
				}
				this.modal3 = false;
			},
			delxsss(item, index) { //删除销售区域已选择的内容x
				let _this = this;
				_this.xssshy.splice(index, 1);
				_this.social3.splice(index, 1);
			},

			//添加企业所属行业弹出确认按钮1
			qyssguan() {
				let _this = this;
				_this.modal1 = !_this.modal1;
				var newqysshy2 = [];
				_this.qysshy_v = [];
				for(var qys = 0; qys < _this.social.length; qys++) {
					var socailnum = _this.social[qys];
					_this.qysshy_v.push(_this.qysshy2[socailnum].name); //添加区域名
					newqysshy2.push(_this.qysshy2[socailnum].id);
					//					newqysshy2.push(newqysshy);

					_this.qysshy = newqysshy2; //添加区域id
				}
				this.modal = false;
			},
			//			qyssguan2 () {
			//				this.modal1 = !this.modal1;
			//			},
			//删除企业所属行业已选择的内容 x
			delqyss(item, index) {
				let _this = this;
				_this.qysshy.splice(index, 1);
				_this.social.splice(index, 1);
			},
			//添加客户所属行业弹出确认按钮2
			khssguan() {
				let _this = this;
				var newkhsshy2 = [];
				_this.khsshy_v = [];
				for(var khs = 0; khs < _this.social2.length; khs++) {
					var socailnum = _this.social2[khs];
					_this.khsshy_v.push(_this.qysshy2[socailnum].name); //添加区域名
					newkhsshy2.push(_this.qysshy2[socailnum].id);
					//					newkhsshy2.push(newkhsshy);
					_this.khsshy = newkhsshy2;

				}
				this.modal2 = false;
			},
			delkhss(item, index) { //删除客户所属行业已选择的内容 x
				let _this = this;
				_this.khsshy.splice(index, 1);
				_this.social2.splice(index, 1);
			},
			qyssguan_x() {
				this.modal1 = false;
			},
			khssguan_x() {
				this.modal2 = false;
			},
			xsssguan_x() {
				this.modal3 = false;
			},
			//----以上新加的行业-----------

			//上传logo相关
			handleSuccessBusiness(res, file, fileList) {
				let _this = this;
				_this.companyData.logoUrl = res.url; //上传成功的图片路径
				//_this.imgup.userPhoto = res.url; //显示的图片路径
				//this.$refs.upload.fileList = []; //移除已上传的文件信息
				let imgdiv = document.getElementById("imgupload_zhe_div");
				imgdiv.style.display = "block";

			},
			fangda() {
				let _this = this;
				_this.showis = !_this.showis;
			},
			tianjia() {
				document.querySelector(".uploadbtn").click(); //点击浮动图片
			},
			isshow() {
				let _this = this;
				_this.showis = !_this.showis;
			},
			//选择对外联系人
			selContact(currentRow, oldCurrentRow) {
				this.companyData.contactId = currentRow.id;
				this.externalContactFlag = false;
				this.externalContactValue = currentRow
			},
			showContact() {
				this.externalContactFlag = true;
			},
			//对外联系人分頁
			//			pageFun(x) {
			//				const _this = this;
			//				var pcontactData = {};
			//				pcontactData.pageStart = x;
			//				pcontactData.pageNums = this.pageInfo.pageNums;
			//				console.log(pcontactData);
			//				this.axios({
			//						method: 'post',
			//						header: {
			//							"Content-Type": 'application/x-www-form-urlencoded'
			//						},
			//						url: api.queryContact,
			//						data: api.jsonData(pcontactData),
			//
			//					})
			//					.then(function(res) {
			//						if(res.data.status == 1) {
			//							_this.externalContact = res.data.datas.rows;
			//
			//						} else {
			//							_this.$Message.warning(res.data.message);
			//						}
			//					})
			//					.catch(function(error) {
			//						console.log(error);
			//					});
			//			},
			//搜索对外联系人
			//			externalSearch() {
			//				const _this = this;
			//				var pcontactData = {};
			//				pcontactData.pageStart = this.pageInfo.pageStart;
			//				pcontactData.pageNums = this.pageInfo.pageNums;
			//				pcontactData.name = this.externalName;
			//				console.log('--33--',pcontactData);
			//				this.axios({
			//						method: 'post',
			//						header: {
			//							"Content-Type": 'application/x-www-form-urlencoded'
			//						},
			//						url: api.queryContact,
			//						data: api.jsonData(pcontactData),
			//
			//					})
			//					.then(function(res) {
			//						if(res.data.status == 1) {
			//							_this.externalContact = res.data.datas.rows;
			//							_this.pageInfo.count = res.data.datas.total;
			//						} else {
			//							_this.$Message.warning(res.data.message);
			//						}
			//					})
			//					.catch(function(error) {
			//						console.log(error);
			//					});
			//			},
			//			areaTab(index) {
			//				var len = document.querySelectorAll(".areaCont").length;
			//				if(index == 0) {
			//					for(var i = 0; i < len; i++) {
			//						document.querySelector(".areaTab").children[i].className = "";
			//						document.querySelectorAll(".areaCont")[i].style.display = "none";
			//					}
			//					document.querySelector(".areaTab").children[index].className = "tactive";
			//					document.querySelectorAll(".areaCont")[index].style.display = "block";
			//				} else if(index == 1) {
			//					if(this.cflag2) {
			//						for(var i = 0; i < len; i++) {
			//							document.querySelector(".areaTab").children[i].className = "";
			//							document.querySelectorAll(".areaCont")[i].style.display = "none";
			//						}
			//						document.querySelector(".areaTab").children[index].className = "tactive";
			//						document.querySelectorAll(".areaCont")[index].style.display = "block";
			//					}
			//				} else if(index == 2) {
			//					if(this.cflag) {
			//						for(var i = 0; i < len; i++) {
			//							document.querySelector(".areaTab").children[i].className = "";
			//							document.querySelectorAll(".areaCont")[i].style.display = "none";
			//						}
			//						document.querySelector(".areaTab").children[index].className = "tactive";
			//						document.querySelectorAll(".areaCont")[index].style.display = "block";
			//					}
			//				}
			//			},
			//			selArea(index, id) {
			//				const _this = this;
			//				var str = "";
			//				var len = document.querySelectorAll(".areaCont").length;
			//				var len2 = document.querySelectorAll(".areaCont")[index - 1].getElementsByTagName("a").length;
			//				//加载城市、区县
			//				var provinceId, cityId;
			//				if(index == 1) {
			//					this.provinceId = id;
			//					this.cflag2 = true;
			//					this.cflag = false;
			//					_this.areaList = [];
			//					_this.cityList = [];
			//				} else if(index == 2) {
			//					this.cityId = id;
			//					this.cflag = true;
			//					_this.areaList = [];
			//				} else if(index == 3) {
			//					this.companyData.provinceId = this.provinceId;
			//					this.companyData.cityId = this.cityId;
			//					this.companyData.countyId = id;
			//					this.flag = false;
			//				}
			//				var url = "/api/base/region/" + id + "/queryByPid.do ";
			//				this.axios(url)
			//					.then(function(res) {
			//						if(res.data.status == 1) {
			//							if(index == 1) {
			//								//console.log(res.data.datas);
			//								_this.cityList = res.data.datas;
			//
			//							} else if(index == 2) {
			//								_this.areaList = res.data.datas;
			//							}
			//
			//						}
			//					})
			//					.catch(function(err) {
			//						console.log(err);
			//					})
			//				for(var i = 0; i < len2; i++) {
			//					document.querySelectorAll(".areaCont")[index - 1].getElementsByTagName("a")[i].className = "";
			//				}
			//				event.target.className = "active";
			//				if(index < len) {
			//					for(var i = 0; i < len; i++) {
			//						document.querySelector(".areaTab").children[i].className = "";
			//						document.querySelectorAll(".areaCont")[i].style.display = "none";
			//					}
			//					document.querySelector(".areaTab").children[index].className = "tactive";
			//					document.querySelectorAll(".areaCont")[index].style.display = "block";
			//				}
			//				var actLen = document.querySelectorAll(".areaCont .active").length;
			//				var txt1 = event.target.innerHTML;
			//				var txt2;
			//				if(_this.companyData.countyFullName) {
			//
			//					if(index == 1) {
			//						var txt2 = _this.companyData.countyFullName.split("/")[0];
			//						if(txt1 != txt2) {
			//							str += txt1 + "/";
			//						} else {
			//							for(var i = 0; i < actLen; i++) {
			//								str += document.querySelectorAll(".areaCont .active")[i].innerHTML + "/";
			//							}
			//						}
			//					} else if(index == 2) {
			//						var txt2 = _this.companyData.countyFullName.split("/")[1];
			//						str += document.querySelectorAll(".areaCont .active")[0].innerHTML + "/";
			//						if(txt1 != txt2) {
			//							str += txt1 + "/";
			//						} else {
			//							for(var i = 1; i < actLen; i++) {
			//								str += document.querySelectorAll(".areaCont .active")[i].innerHTML + "/";
			//							}
			//						}
			//					} else {
			//						for(var i = 0; i < actLen; i++) {
			//							str += document.querySelectorAll(".areaCont .active")[i].innerHTML + "/";
			//						}
			//					}
			//				} else {
			//					for(var i = 0; i < actLen; i++) {
			//						str += document.querySelectorAll(".areaCont .active")[i].innerHTML + "/";
			//					}
			//				}
			//				_this.companyData.countyFullName = str;
			//			},
			maopao() {
				this.flag = false;
			},
			showArea() {
				event.stopPropagation();
				const _this = this;

				if(event.target.className == "selCity") {
					this.flag = !this.flag;
					if(this.companyData.cityId) {
						this.cflag2 = true;
						var url = "/api/base/region/" + this.companyData.provinceId + "/queryByPid.do ";
						this.axios(url)
							.then(function(res) {
								if(res.data.status == 1) {
									_this.cityList = res.data.datas;
								}
							})
							.catch(function(err) {
								console.log(err);
							})
					}
					if(this.companyData.countyId) {
						this.cflag = true;
						var url = "/api/base/region/" + this.companyData.cityId + "/queryByPid.do ";
						this.axios(url)
							.then(function(res) {
								if(res.data.status == 1) {
									_this.areaList = res.data.datas;
								}
							})
							.catch(function(err) {
								console.log(err);
							})
					}
					if(_this.companyData.countyFullName) {
						var arry = _this.companyData.countyFullName.split("/");
						_this.areaVarry = arry;

					}
				}

			},
			//行业列表
			dictionary() {
				let _this = this;
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.dictionary
					})
					.then(function(vle) {
						//						console.log('-----999', vle)
						if(vle.data.status == 1) {
							_this.qysshy2 = vle.data.datas;
						} else {
							//							_this.$Message.error(vle.data.message);
							_this.do_no = true;
							_this.re_do = vle.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

						}

					})
			},
			//			去认证
			apply() {
				this.$router.push({
					path: '/sys/corp/apply'
				});
			},
			//保存公司信息
			saveCompany() {
				const _this = this;
				var newcompanyData = {};
				//				var l1 = _this.companyData.shortName;
				//				var l2 = _this.companyData.description;
				//				var l3 = _this.companyData.englishName;
				//				var l4 = _this.companyData.address;
				//				var l5 = _this.companyData.postCode;
				//				var l6 = _this.companyData.telephone;
				//				var l7 = _this.companyData.fax;
				//				var l8 = _this.companyData.uscc;

				newcompanyData.qysshy = _this.qysshy;
				newcompanyData.description = _this.companyData.description;
				newcompanyData.englishName = _this.companyData.englishName;
				newcompanyData.address = _this.companyData.address;
				newcompanyData.postCode = _this.companyData.postCode;
				newcompanyData.telephone = _this.companyData.telephone;
				newcompanyData.fax = _this.companyData.fax;
				newcompanyData.uscc = _this.companyData.uscc;
				newcompanyData.website = _this.companyData.website;
				newcompanyData.countyFullName = _this.companyData.countyFullName;
				newcompanyData.logoUrl = _this.companyData.logoUrl;
				newcompanyData.id = _this.companyData.id;
				newcompanyData.contact = _this.companyData.contact;
				newcompanyData.contactId = _this.companyData.contactId;

				newcompanyData.saleAreaId = _this.xssshy; //销售区域：已选择内容id数组
				newcompanyData.saleArea = _this.xssshy_v; //销售区域：已选择内容的中文名数组
				newcompanyData.tradeId = _this.qysshy; //
				newcompanyData.tradeName = _this.qysshy_v; //
				newcompanyData.serviceTradeId = _this.khsshy; //
				newcompanyData.serviceTradeName = _this.khsshy_v; //
				newcompanyData.mainProduct = _this.cpsshy;

				//				if(_this.companyData.lstTradeAncestorIds) {
				//					var tradeLen = _this.companyData.lstTradeAncestorIds.length;
				//					newcompanyData.tradeId = _this.companyData.lstTradeAncestorIds[tradeLen - 1];
				//				}
				//				if(_this.companyData.lstServiceTradeAncestorIds) {
				//					var serviceTradeLen = _this.companyData.lstServiceTradeAncestorIds.length;
				//					newcompanyData.serviceTradeId = _this.companyData.lstServiceTradeAncestorIds[serviceTradeLen - 1];
				//				}
				// (l8 == null || l8 == undefined || l8 == "") ||
				//				if((l1 == null || l1 == undefined || l1 == "") || (l2 == null || l2 == undefined || l2 == "") || (l3 == null || l3 == undefined || l3 == "") || (l4 == null || l4 == undefined || l4 == "") || (l5 == null || l5 == undefined || l5 == "") || (l6 == null || l6 == undefined || l6 == "") || (l7 == null || l7 == undefined || l7 == "") || (l9 == null || l9 == undefined || l9 == "")) {
				//					_this.$Message.warning('带红色*为必填项');
				//				}
				//				else {
				//					if(l1.length >= 100) {
				//						_this.$Message.warning('简称，少于100字 ');
				//					} else if(l2.length > 500) {
				//						_this.$Message.warning('企业简介，不多于500字');
				//					} else if(l3.length > 100) {
				//						_this.$Message.warning('英文名称，100个字符以内');
				//					} else if(l4.length > 200) {
				//						_this.$Message.warning('详细地址，200字以内');
				//					} else if(l5.length > 6 && isNaN(this.companyData.postCode)) {
				//						_this.$Message.warning('邮政编码：6位数字');
				//					} else if(l6.length > 20) {
				//						_this.$Message.warning('服务电话,20字符以内');
				//					} else if(l7.length > 20) {
				//						_this.$Message.warning('服务传真,20字符以内 ');
				//					} else if(l8.length > 60) {
				//						_this.$Message.warning('工商执照注册号/统一社会信用代码,60字符以内');
				//					} else if(l9.length > 100) {
				//						_this.$Message.warning('公司网址，100个字符以内');
				//					}
				//					else {
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.companyModify,
						data: api.jsonData(newcompanyData),

					})
					.then(function(res) {
						//						console.log('----------',res);
						if(res.data.status == 1) {
							_this.do_yn = true;
							_this.re_do = "保存成功";
							setTimeout(() => {
								location.reload();
							}, 1500);
							//_this.$Message.success('修改成功');

						} else {
							_this.do_no = true;
							_this.re_do = "请重新提交";
							setTimeout(() => {
								_this.do_no = false;
							}, 1500);
							//_this.$Message.warning('请重新提交');
						}
					})
					.catch(function(error) {
						console.log(error);
					});
				//					}
				//				}
			},
			//chong
			chongzhi() {
				const _this = this;
				_this.companyData.englishName = '';
				_this.companyData.qysshy = '';
				_this.companyData.description = '';
				_this.companyData.englishName = '';
				_this.companyData.address = '';
				_this.companyData.postCode = '';
				_this.companyData.telephone = '';
				_this.companyData.fax = '';
				_this.companyData.uscc = '';
				_this.companyData.website = '';
				_this.companyData.countyFullName = '';
				_this.companyData.logoUrl = '';
				_this.companyData.id = '';
				_this.companyData.contact = '';
				_this.companyData.contactId = '';
				_this.qysshy_v = '';
				_this.khsshy_v = '';
				_this.cpsshy = '';
				_this.xssshy_v = '';
				_this.companyData.saleAreaId = ''; //销售区域：已选择内容id数组
				_this.companyData.saleArea = ''; //销售区域：已选择内容的中文名数组
				_this.companyData.tradeId = ''; //
				_this.companyData.tradeName = ''; //
				_this.companyData.serviceTradeId = ''; //
				_this.companyData.serviceTradeName = ''; //
				_this.companyData.mainProduct = '';
			},
			//图片上传
			handleView(url) {
				this.imgUrl = url;
				this.visible = true;
			},
			handleRemove(file) {
				// 从 upload 实例删除数据
				const _this = this;
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
				this.attachments.forEach(function(item, index) {
					if(item.fileName == file.name && item.url == item.url) {
						_this.attachments.splice(index, 1);
					}
				})
			},
			handleSuccess(res, file, fileList) {
				let _this = this;
				file.url = res.url;
				file.name = res.fileName;
				const image = {
					fileName: res.fileName,
					fileType: res.fileSuffix,
					filePath: res.filePath,
					url: res.url,
					orderNum: fileList.length
				}
				_this.companyData.logoUrl = res.url;
				_this.attachments = [];
				_this.attachments.push(image);
				_this.logoShow = true;
				_this.uploadFlag = false;
				//				this.$Message.success("上传成功");

				_this.do_yn = true;
				_this.re_do = "上传成功";
				setTimeout(() => {
					_this.do_yn = false;

				}, 2000);

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
						title: '最多只能上传 1 张图片。'
					});
				}
				return check;
			},
			uploadShow() {
				if(this.logoShow) {
					this.uploadFlag = true
				}
			},
			uploadHide() {
				if(this.logoShow) {
					this.uploadFlag = false
				}
			},
			//认证判断
			zrpa() {
				const _this = this;
				const corps = JSON.parse(window.localStorage.getItem('corp')); //将缓存字符串转为json对象
				var registerInfoUrl = api.save_queryAuthentication + corps.id + api.queryAuthentication;
				_this.axios(registerInfoUrl)
					.then(function(res) {
						_this.status = res.data.datas.status;

						_this.datas = res.data.datas;
						if(_this.status == 1) {
							let companyData = {};
							applyInfo.corpType = datas.corpType; //类型
							_this.companyData.companyName = _this.datas.name; //企业全称
							_this.companyData.businessNum = _this.datas.usci; //统一社会信用代码不能超过50位
							_this.companyData.registeredAddress = _this.datas.registeredProvinceName + datas.registeredCityName + datas.registeredCountyName + datas.registeredAddress; //注册地址
							_this.companyData.legalPerson = _this.datas.legalPerson; //法定代表人/企业负责人姓名1
							_this.companyData.bizScopeAddress = _this.datas.provinceName + datas.cityName + datas.countyName + datas.address; //经营范围(一般经营范围)1
							_this.companyData.bizScope = _this.datas.bizScope;
							_this.companyData.selected = _this.datas.enterpriseNature; //企业性质不能超过50位
							_this.companyData.selected2 = _this.datas.enterpriseSize; //企业规模不能超过50位
							_this.companyData.selected3 = _this.datas.enterpriseSize; //年营业额不能超过50位
							_this.companyData.businessLicenseUrl = _this.datas.imgBizLicense; //企业工商营业执照不能超过500位
							_this.companyData.authenticationAuditContent = _this.datas.authenticationAuditContent; //企业工商营业执照不能超过500位
							_this.companyData.logoUrl = _this.datas.logoUrl; //企业工商营业执照不能超过500位
						}

					})
					.catch(function(error) {
						console.log(error);
					});

			},
			shenfen() {
				let _this = this
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/queryAllProvinces.do'
					})
					.then(function(res) {
						if(res.data.status == 1) {
							console.log(res.data.datas);
							_this.xssshy2 = res.data.datas;
						} else {
							//						_this.$Message.error(res.data.message);
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

						}

					})
			},

		},
		created() {
			const _this = this;
			//			alert('aaaa');
			//加载省份
			//			var url = api.dictionary;
			//			this.axios(url)
			//				.then(function(res) {
			//					console.log('----888------',res);
			//					if(res.data.status == 1) {
			//						var obj = res.data.datas;
			//						for(var o in obj) {
			//							_this.proviceKey.unshift(o);
			//							_this.provice.unshift(obj[o]);
			//						}
			//					}
			//				})
			//				.catch(function(err) {
			//					console.log(err);
			//				})
			//查询公司信息
			this.axios(api.queryMe)
				.then(function(val) {
					if(val.data.status == 1) {

						_this.companyData = val.data.datas;
						_this.externalContactValue = _this.companyData.contactUser;

						if(_this.companyData.tradeName != null) {

							_this.qysshy_v = _this.companyData.tradeName;
						} else {
							_this.companyData.tradeName = [];
							_this.qysshy_v = _this.companyData.tradeName;
						}
						if(_this.companyData.serviceTradeName != null) {
							_this.khsshy_v = _this.companyData.serviceTradeName;
						} else {
							_this.companyData.serviceTradeName = [];
							_this.qysshy_v = _this.companyData.serviceTradeName;
						}
						if(_this.companyData.saleArea != null) {
							_this.xssshy_v = _this.companyData.saleArea;
						} else {
							_this.companyData.saleArea = [];
							_this.xssshy_v = _this.companyData.saleArea;
						}
						if(_this.companyData.mainProduct != null) {
							_this.cpsshy = _this.companyData.mainProduct;
						} else {
							_this.companyData.mainProduct = [];

							_this.cpsshy = _this.companyData.mainProduct;
						}

						//						console.log('222',_this.companyData)
						//	tradeName:this.qysshy_v,
						//					serviceTradeName:'',
						//					saleArea:'',
						//判断是否存在公司logo
						if(_this.companyData.logoUrl == null && _this.companyData.logoUrl == undefined && _this.companyData.logoUrl == "") {
							_this.uploadFlag = true
							_this.logoShow = false;
						} else {
							_this.uploadFlag = false;
							_this.logoShow = true;
						}
						let imgdiv = document.getElementById("imgupload_zhe_div");
						imgdiv.style.display = "block";
					}
				})
				.catch(function(err) {
					console.log(err);
				});
			//加载行业
			//			this.axios(api.dictionary)
			//				.then(function(res) {
			//					console.log('12121212',res)
			//					if(res.data.status == 1) {
			//						_this.industryData = res.data.datas;
			//					}
			//
			//				})
			//				.catch(function(err) {
			//					console.log(err);
			//				});
			//查询对外联系人
			//			var contactData = {};
			//			contactData.pageStart = this.pageInfo.pageStart;
			//			contactData.pageNums = this.pageInfo.pageNums;
			//			this.axios({
			//					method: 'post',
			//					header: {
			//						"Content-Type": 'application/x-www-form-urlencoded'
			//					},
			//					url: api.queryContact,
			//					data: api.jsonData(contactData),
			//
			//				})
			//				.then(function(res) {
			//					if(res.data.status == 1) {
			//						_this.externalContact = res.data.datas.rows;
			//						_this.pageInfo.count = res.data.datas.total;
			//					} else {
			//						_this.$Message.warning(res.data.message);
			//					}
			//				})
			//				.catch(function(error) {
			//					console.log(error);
			//				});

		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}
		},
		mounted() {
			this.dictionary();
			this.shenfen()
			this.zrpa();
			//			this.uploadList = this.$refs.upload.fileList;
		}
	}
</script>
<style type="text/css">
	.add_canpinkuang .add_canpinkuang_input .ivu-input-type {
		width: 440px!important;
		margin-right: 15px;
	}
	
	.add_canpinkuang .add_canpinkuang_input .ivu-input-type input {
		width: 440px;
		height: 30px;
		border: 1px solid #ccd9e6;
		border-radius: 4px 0 0 4px!important;
	}
	
	.uploadbtn2 span:first-child {
		display: flex;
		align-items: center;
	}
	
	.uploadbtn2 span:first-child .uploadbtn2_title {
		margin-left: 15px;
	}
	
	.uploadbtn2 span:first-child .uploadbtn2_title2 {
		color: #8e9faf;
	}
	
	.localimport .ivu-checkbox-wrapper {
		padding: 5px 8px;
    }
    
    .right_home_warp-title {
        height: 50px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .right_home_warp-title a {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-size: 16px;
    }

    .right_home_warp-title a:hover {
        color: #03b8cc;
        border-bottom: 2px solid #03b8cc;
    }

    .right_home_warp-sel {
        color: #03b8cc;
        border-bottom: 2px solid #03b8cc;
    }
</style>
<style scoped>
	.logo {
		border: none !important;
	}
	
	.externalSearch {
		overflow: auto;
		margin-bottom: 20px;
	}
	
	.externalSearch .externalnameInp {
		width: 300px;
	}
	
	.formContact {
		position: relative;
	}
	
	.formContact .contactValue {
		float: left;
		width: 32px;
		height: 32px;
		line-height: 1.5;
		padding: 4px 7px;
		font-size: 12px;
		border: 1px solid #d7dde4;
		border-radius: 4px;
		color: #657180;
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: pointer;
		text-align: center;
	}
	
	.formContact .contactValue:hover {
		border: 1px solid #39f;
	}
	
	.formContact .contactBox {
		display: none;
		position: absolute;
		left: 82px;
		top: 0;
		z-index: 99;
		width: 500px;
		padding: 10px 20px;
		overflow: auto;
		background-color: #fff;
		border: 1px solid #eee;
		border-radius: 4px;
	}
	
	.compInfoForm .area {
		width: 370px;
		position: absolute;
		left: 112px;
		top: 232px;
		margin: 5px 0;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 4px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
		z-index: 900;
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
		margin-top: 20px;
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
		margin-bottom: 7px!important;
		/*float: left;*/
		clear: both;
		font-size: 14px;
		display: flex;
		align-items: baseline;
	}
	
	.compInfoForm .formItem2 {
		/*width: 100%;*/
		/*margin-bottom: 18px;*/
		/*float: left;*/
		/*clear: both;*/
		/*font-size: 13px;*/
		/*display: flex;*/
		align-items: flex-start !important;
	}
	
	.compInfoForm .formItem .formItem_span {
		height: 32px;
		line-height: 32px;
		color: #415161;
	}
	
	.compInfoForm .formItem .formItem_span_textarea {
		background-color: #eff1f8;
		padding: 10px;
		border: 1px solid #cdd9e6;
	}
	
	.compInfoForm .formItem .formItem_renzhengok {
		color: red;
		margin-left: 15px;
	}
	
	.compInfoForm .ivu-input-wrapper {
		width: 370px;
	}
	/*.compInfoForm .formItem2 {
		float: left;
		width: 282px;
		margin-right: 20px;
		margin-bottom: 18px;
	}*/
	
	.compInfoForm .formItem .word {
		line-height: 32px;
	}
	
	.compInfoForm .formItem .word .s25 {
		float: left;
		width: 25%;
	}
	
	.compInfoForm .industry {
		float: left;
		width: 370px;
	}
	
	.compInfoForm .industry .ivu-input-wrapper {
		width: 100%;
	}
	
	.compInfoForm .industry li {
		min-height: auto;
	}
	
	.compInfoForm .label {
		float: left;
		width: 200px;
		padding-right: 12px;
		line-height: 32px;
		text-align: right;
		color: #415161;
		border: 0;
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
	
	.compInfoForm .formLogo {
		display: flex;
		height: 95px;
		overflow: hidden;
	}
	
	.compInfoForm .ivu-upload-list {
		display: none;
	}
	
	.compInfoForm .formItem .logo {
		width: 80px;
		height: 80px;
		visibility: visible;
	}
	
	.compInfoForm .formItem .logoActive {
		visibility: visible
	}
	
	.uploaddiv {
		position: relative;
		width: 300px;
		height: 95px;
	}
	
	.uploadbtn {
		width: 96px;
		height: 96px;
		background: url(../../../assets/img/subimg.jpg) no-repeat;
		background-size: 100% 100%;
		/*border: 1px dashed #f8f9f9;*/
		margin-left: 0;
		overflow: hidden;
	}
	
	.uploadbtn img {
		width: 100%;
		/*height: 96px;*/
	}
	/*.uploadbtn2 {
		width: 70%;
		height: 50px;
		background-color: #f8f9fd;
		border: none;
	}*/
	
	#imgupload_zhe_div {
		position: absolute;
		top: 0;
		width: 300px;
		height: 95px;
		display: none;
	}
	
	.imgshow {
		width: 300px;
		height: 95px;
		display: block;
	}
	
	#imgupload_zhe_div:hover .imgupload_zhe {
		display: block;
	}
	
	.imgupload_zhe {
		position: absolute;
		top: 0;
		width: 300px;
		height: 95px;
		background-color: rgba(0, 0, 0, 0.4);
		display: none;
	}
	
	.imgupload_zhediv {
		width: 300px;
		height: 95px;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		text-align: center;
		margin: 0!important;
		align-content: space-around;
	}
	
	.imgupload_zhediv i {
		margin-top: 11px;
	}
	
	.rightBox_but {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
	}
	
	.rightBox_but div {
		width: 600px;
		margin-left: -260px;
		position: relative;
		top: 100px;
		left: 45%;
	}
	
	.rightBox_but div img {
		width: 100%;
	}
	
	textarea.ivu-input {
		height: 178px!important;
		color: #;
	}
	
	.add_qyhy {
		color: #00c1de;
	}
	
	.add_qyhy:hover {
		cursor: pointer;
	}
	
	.addqu {
		float: left;
		display: flex;
	}
	
	.addqu .addqukuang {
		display: inline-block;
		width: 440px;
		height: 100px;
		border: 1px solid #ccd9e6;
		overflow-y: scroll;
		padding-bottom: 8px;
		margin-right: 15px;
	}
	
	.addqu .addqukuang2 {
		height: auto;
	}
	
	.addqu .addqukuang .addqukuangnr {
		border: 1px solid #ccd9e6;
		margin: 6px;
		margin-right: 0;
		margin-bottom: 0;
		display: inline-block;
		padding: 6px;
	}
	
	.addqu .addqukuang .addqukuangnr .addqukuangf {
		font-size: 12px;
	}
	
	.addqu .addqukuang .addqukuangnr .addqukuangf:hover {
		cursor: pointer;
		color: #00c1de;
	}
	
	.addqu .addqukuang .addqukuangnr .addqukuangnr_del {
		margin-left: 6px;
	}
	
	.addqu .addqukuang .addqukuangnr .addqukuangnr_del:hover {
		cursor: pointer;
		color: #00c1de;
	}
	
	.addqu button {
		width: 90px;
		height: 30px;
		border: none;
		background-color: #ccd9e6;
		font-size: 12px;
		border-radius: 2px;
		color: #415161;
	}
	
	.qysstan {
		width: 666px;
		position: absolute;
		top: 100px;
		left: 50%;
		z-index: 10010;
		padding: 20px;
		background-color: #fff;
		margin-left: -300px;
		border: 1px solid #00c1de;
		border-radius: 2px;
		box-shadow: 0px 0px 30px rgba(0, 198, 226, 0.5);
	}
	
	.add_canpinkuang {
		width: 550px;
		float: left;
	}
	
	.add_canpinkuang .add_canpinkuang_input {
		display: flex;
	}
	
	.add_canpinkuang .add_canpinkuang_input button {
		width: 50px;
		height: 30px;
		border: none;
		border: 1px solid #ccd9e6;
		background-color: #ccd9e6;
		font-size: 12px;
		border-radius: 0 2px 2px 0;
		color: #415161;
	}
	
	.cpkuang {
		display: inline-block;
	}
	
	.cpkuang div {
		display: inline-block;
		padding: 5px 5px;
		border: 1px solid #ccd9e6;
		margin-right: 5px;
		margin-bottom: 10px;
		font-size: 12px;
		color: #415161;
	}
	
	.cpkuang div span {
		margin-left: 5px;
	}
	
	.cpkuang div span:hover {
		color: #00c1de;
		cursor: pointer;
	}
	
	.rightBox_but {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
	}
	
	.rightBox_but div {
		width: 600px;
		margin-left: -260px;
		position: relative;
		top: 100px;
		left: 45%;
	}
	
	.rightBox_but div img {
		width: 100%;
	}
	
	.qysstan_box {
		position: fixed;
		top: 0px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0);
	}
	
	.py_tit {
		color: #415161;
		height: 56px;
		line-height: 56px;
		padding: 0 0 0 30px;
		font-size: 16px;
		font-weight: 600;
	}
	
	.py_tit:before {
		content: "";
		position: absolute;
		top: 40px;
		left: 40px;
		width: 1px;
		height: 15px;
		background: #bbb;
	}
</style>