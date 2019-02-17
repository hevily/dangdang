<template>
	<div class="applyBox">
		<Breadcrumb style="padding-left: 0;padding-top: 0;">
			<Breadcrumb-item to='/main'>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">公司认证信息</span></Breadcrumb-item>
			<div class="Bread_ri">
				<div>
					<img src="../../assets/img/wwj_t.png" alt="" />
					<img src="-"/>
					<span>配置</span>
				</div>
				<div>
					<img src="../../assets/img/wjj_m.png" alt="" />
					<span>帮助</span>
				</div>
			</div>
		</Breadcrumb>

		<div class="applyBox_com test-1">

			<img class="liucheng" src="../../assets/img/liucheng.png" />
			<h4>
			<!--<em>●</em>-->
			类型（请从下列类型中选择一项）
			<!--<span>（请从下列类型中选择一项）</span>-->
			<a v-show="!typeDisplay" @click.prevent="updateType">返回修改</a>
		</h4>
			<div class="typeRadioBox">
				<div v-show="typeDisplay">
					<RadioGroup v-model="corpType" vertical class="radGrop">
						<div class="rdoPanel">
							<Radio label="生产型"></Radio>
						</div>
						<div class="rdoPanel">
							<Radio label="贸易型"></Radio>
						</div>
						<div class="rdoPanel">
							<Radio label="生产+贸易型"></Radio>
						</div>
					</RadioGroup>
					<div class="PS">
						<div class="zhuyi">注意： </div>
						<ul class="introduceBox">
							<li>
								1、默认选择生产+贸易型，并标注说明信息
							</li>
							<li>
								2、选择企业类型不同，认证通过后显示的功能模块也不同，请认真选择
							</li>
						</ul>
					</div>
					<div class="btnBox">
						<Button type="success" @click="nextStep">下一步</Button>
						<!--<Button type="info">取消</Button>-->
					</div>
				</div>
				<div v-show="!typeDisplay" class="typeDisplay_p">
					<img src="../../assets/img/aut_Hook.png" />
					<p>{{corpType2}}</p>
				</div>
			</div>

			<div v-show="!typeDisplay">
				<h4>
					<!--<em>●</em>-->
					认证资料
				</h4>

				<div class="authDataBox">
					<Form class="authform" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="250">
						<h3 style="font-size: 16px;">企业工商资料</h3>
						<div class="fromItemBox">
							<FormItem class="fontitem" label="企业全称:" prop="companyName">
								<Input v-model="companyName" placeholder="请输入企业全称" disabled class="inputDisabled"></Input>
							</FormItem>
							<FormItem label="统一社会信用代码:" prop="businessNum">
								<Input v-model="formValidate.businessNum" placeholder="请输入统一社会信用代码"></Input>
							</FormItem>
							<FormItem prop="registeredAddress" label="注册地址:">
								<Input type="text" placeholder="请输入注册地址" class="" v-model="formValidate.registeredAddress"></Input>
							</FormItem>
							<FormItem label="法定代表人/企业负责人姓名:" prop="legalPerson">
								<Input v-model="formValidate.legalPerson" placeholder="请输入法定代表人/企业负责人姓名"></Input>
							</FormItem>
							<FormItem label="企业性质:" prop="enterpriseNature">
								<Select placeholder="请输入企业规模" v-model="selected">
									<Option v-for="(item,index) in formValidate.enterpriseNatureId.enterpriseNature" :value="formValidate.enterpriseNatureId.enterpriseNature[index]">{{item}}</Option>
								</Select>
							</FormItem>
							<FormItem label="企业规模:" prop="enterpriseSize">
								<Select placeholder="请输入企业规模" v-model="selected2">
									<Option v-for="(item2,index2) in formValidate.enterpriseSizeId.enterpriseSize" :value="formValidate.enterpriseSizeId.enterpriseSize[index2]">{{item2}}</Option>
								</Select>
							</FormItem>
							<FormItem label="年营业额（单位：元）:" prop="yearTurnover">
								<Select placeholder="请输入企业规模" v-model="selected3">
									<Option v-for="(item3,index3) in formValidate.yearTurnoverId.yearTurnover" :value="formValidate.yearTurnoverId.yearTurnover[index3]">{{item3}}</Option>
								</Select>
							</FormItem>
							<FormItem label="经营范围(一般经营范围):" prop="bizScope">
								<Input type="textarea" v-model="formValidate.bizScope" placeholder="请输入经营范围(一般经营范围)"></Input>
							</FormItem>
						</div>

						<div class="fromItemBox">
							<FormItem label="营业执照" prop="businessLicenseUrl">
								<p style="color: red;font-size: 14px;">必须上传原件的扫描件或照片（JPG,JPEG或PNG格式），大小不超过2M，只能上传一张！</p>
								<div class="uploaddiv">
									<Upload ref="upload" :format="['jpg','jpeg','png']" accept="image/jpg,image/jpeg,image/png" :action="uploadUrl" :headers="uploadBusHeader" :before-upload="busBeforeUpload" :on-success="handleSuccessBusiness" :show-upload-list="showUpList" style="display: flex;display: -webkit-flex;">
										<Button type="ghost" v-if="showBtnBus" class="subimg uploadbtn"></Button>
										<Button type="ghost" v-else="showBtnBus" class="subimg2 uploadbtn"></Button>
									</Upload>
									<div class="demo-upload-list" v-show="businessImgShow" style="position: absolute;">
										<img :src="formValidate.businessLicenseUrl" class="thumbnail">
										<div class="demo-upload-list-cover">
											<Icon size="30" color='white' type="eye" @click.native="handleView(formValidate.businessLicenseUrl)" style="margin-top: 10px;"/>
											<Icon size="30" color='white' type="plus" @click.native="tianjia" style="margin-top: 10px;"/>	
										</div>
									</div>
									<Modal title="查看大图" v-model="visible">
										<img :src="imgName" v-if="visible" style="width: 100%">
										
									</Modal>
								</div>
							</FormItem>
							<FormItem style="margin-top: 50px;">
								<button class="btn-save" @click="saveSubmit('formValidate')">保存</button>
								<button class="btn-save" @click="handleSubmit('formValidate')">提交</button>
								<button class="btn-del" @click="handleReset('formValidate')" style="margin-left: 8px;display: none;">重置</button>
							</FormItem>
						</div>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			//手机、电话号码验证
			const numType = (rule, value, callback) => {
				let rel = /(^1[34578]\d{9}$)|(^0\d{2,3}-?\d{7,8}$)/;
				if(!(rel.test(value))) {
					callback(new Error("请输入正确的11位手机号码或电话号码 区号-xxxxx"));
				} else {
					callback();
				}
			};
			return {
				selected: '请选择',
				selected2: '请选择',
				selected3: '请选择',
				id: '', //存储ID
				corpType: '', //类型
				corpType2: '',
				//				corpType: 0, //类型存储
				typeDisplay: true,
				uploadUrl: api.uploadFileUrl,
				logoShow: false,
				logoUrl: '',
				orgImageShow: false, //组织机构代码图片显示
				showOrgUpList: true, //是否显示组织机构已上传文件
				showBtnOrg: true, //
				businessImgShow: false, //上传企业营业执照照片显示
				defaultList: [],
				uploadFlag: true,
				showUpList: true, //是否显示已上传文件列表
				visible: false, //图片放大显示框
				showBtnBus: true, //控制企业工商营业执照显示添加文件、重新上传按钮显示
				uploadData: {
					path: 'corp/'
				},
				uploadList: [],
				flag: false,
				flagReg: false,
				proviceKey: [], //存储索引
				provice: [], //存储内容
				proviceKeyReg: [],
				proviceRge: [],
				cityList: [],
				areaList: [],
				cityListReg: [],
				proviReg: [],
				areaListReg: [],
				countyIdReg: '',
				provinceIdReg: '',
				areaVarry: [],
				areaVarryReg: [],
				companyName: '', //企业全称，不超过100字符
				formValidate: { //资质认证信息
					businessNum: '', //统一社会信用代码
					legalPerson: '', //	法人不能超过30位
					registeredAddress: '', //	注册地址不能超过200位
					actualDetailAddress: '', //实际经营详细地址
					companyManager: '', //法定代表人/企业负责人姓名
					bizScope: '', //经营范围(一般经营范围)
					enterpriseNatureId: {
						id: 1,
						enterpriseNature: ['外资（欧美）企业', '外资（非欧美）企业', '合资', '国企', '民营企业', '上市公司', '创业公司']
					}, //企业性质ID不能超过32位
					enterpriseSizeId: {
						id: 2,
						enterpriseSize: ['100人以下', '100-500人', '500-1000人', '1000-2000人', '2000-5000人', '5000-10000人', '10000-50000人', '50000-100000人', '100000以上'] //企业规模不能超过50位
					}, //企业规模ID不能超过32位
					yearTurnoverId: {
						id: 3,
						yearTurnover: ['500万以下', '500万-1000万', '1000万-2000万', '2000万-5000万', '5000万-1亿', '1亿-5亿', '5亿-10亿', '10亿-50亿', '50亿-100亿', '100亿以上'] //年营业额不能超过50位
					}, //年营业额ID不能超过32位
					businessLicenseUrl: '', //工商营业执照图片路径
				},
				ruleValidate: {

					businessNum: [{
							required: true,
							message: '请输入统一社会信用代码',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 200,
							message: '统一社会信用代码不超过20个字符',
							trigger: 'blur'
						}
					],

					registeredAddress: [{
							required: true,
							message: '请输入注册地址',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 400,
							message: '注册地址不超过200个汉字',
							trigger: 'blur'
						}
					],

					legalPerson: [{
							required: true,
							message: '请输入法定代表人/企业负责人姓名',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 20,
							message: '法定代表人/企业负责人姓名，不超过20个字符',
							trigger: 'blur'
						}
					],
					bizScope: [{
							required: true,
							message: '请经营范围(一般经营范围)',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 1000,
							message: '经营范围(一般经营范围)不超过1000个字符',
							trigger: 'blur'
						}
					],

					registeredAddress: [{
							required: true,
							message: '请输入公司注册详细地址',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 200,
							message: '注册地址不超过200个字符',
							trigger: 'blur'
						}
					],

					businessLicenseUrl: [{
						required: true,
						message: '请上传营业执照图片',
						trigger: 'blur'
					}]

				},

			}
		},
		methods: {

			applyInfo() {
				const _this = this;
				var applyInfo = {};
				applyInfo.id = _this.id; //id
				applyInfo.corpType = _this.corpType; //类型
				applyInfo.name = _this.companyName; //企业全称
				applyInfo.usci = _this.formValidate.businessNum; //统一社会信用代码不能超过50位
				applyInfo.registeredAddress = _this.formValidate.registeredAddress; //注册地址
				applyInfo.legalPerson = _this.formValidate.legalPerson; //法定代表人/企业负责人姓名1
				applyInfo.bizScope = _this.formValidate.bizScope; //经营范围(一般经营范围)1
				applyInfo.enterpriseNatureId = _this.formValidate.enterpriseNatureId.id; //企业性质ID不能超过32位
				applyInfo.enterpriseNature = _this.selected; //企业性质不能超过50位
				applyInfo.enterpriseSizeId = _this.formValidate.enterpriseSizeId.id; //企业规模ID不能超过32位
				applyInfo.enterpriseSize = _this.selected2; //企业规模不能超过50位
				applyInfo.yearTurnoverId = _this.formValidate.yearTurnoverId.id; //年营业额ID不能超过32位
				applyInfo.yearTurnover = _this.selected3; //年营业额不能超过50位
				applyInfo.imgBizLicense = _this.formValidate.businessLicenseUrl; //企业工商营业执照不能超过500位
				return applyInfo;
			},

			//表单提交验证
			handleSubmit(name) { //提交验证
				const _this = this;
				if(_this.formValidate.legalPerson == '') {
					_this.$Message.error('请选择企业属性！');
				} else if(_this.formValidate.enterpriseSize == '') {
					_this.$Message.error('请选择企业规模！');
				} else if(_this.formValidate.enterpriseSize == '') {
					_this.$Message.error('请选择年营业额！');
				} else if(_this.formValidate.businessLicenseUrl == '') {
					_this.$Message.error('请上传营业执照!');
				}
				_this.$refs[name].validate((valid) => {
					var newApplyInfo = _this.applyInfo(); //临时存储页面中输入的数据信息
					console.log(newApplyInfo);
					if(valid) {
						var newApplyInfo = _this.applyInfo(); //临时存储页面中输入的数据信息
						console.log(newApplyInfo);
						_this.axios({ //发送请求
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.apply,
								data: api.convertParam(newApplyInfo)
							})
							.then(function(res) {
								console.log("!!!!!!!!!!!!");
								console.log(res);
								if(res.data.status == 1){
//								_this.instance("success", 1, res.data.message);
								_this.$Message.success('表单已提交!');
									setTimeout(() => {
										_this.$router.push({
											path: '/authentication'
										})
									}, 2000);

								} else {
//									_this.instance("error", 1, res.data.message);
									_this.$Message.error(res.data.message);
								}
							})
							.catch(function(error) { //捕获错误信息
								console.log(error);
							});
						//this.$Message.success('Success!');
					} else {
						console.log(this.formValidate.actualAddress, this.companyName);
						this.$Message.error('表单验证失败!');

					}
				})
			},
			saveSubmit(name) { //保存
				const _this = this;
				_this.$refs[name].validate((valid) => {
					if(valid) {
						var saveApplyInfo = _this.applyInfo();
						_this.axios({ //发送请求
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.apply_save,
								data: api.convertParam(saveApplyInfo)
							})
							.then(function(res) {
								console.log(res);
								if(res.data.status == 1) {
//									_this.instance("success", 0, res.data.message);
									_this.$Message.success('保存成功');
									setTimeout(() => {
										_this.$router.go(0);
									}, 2000);
								} else {
//									_this.instance("error", 0, res.data.message);
									_this.$Message.error(res.data.message);
								}
							})
							.catch(function(error) {
								console.log(error);
							})
					}
				});
			},
			tianjia(){
				document.querySelector(".uploadbtn").click(); //点击浮动图片
			},
//			instance(type, subtype, message) {
//				const title = 'Title';
//				const content = '<p>' + message + '</p>';
//				if(subtype == 1) {
//					switch(type) {
//						case 'success':
//							this.$Modal.success({
//								content: "提交成功！",
//								/*onOk: ()=>{
//									this.$router.push("/");
//								}*/
//							});
//							break;
//						case 'error':
//							this.$Modal.error({
//								content: content
//							});
//							break;
//					}
//				} else {
//					switch(type) {
//						case 'success':
//							this.$Modal.success({
//								content: "保存成功！",
//								/*onOk: ()=>{
//									this.$router.push("/");
//								}*/
//							});
//							break;
//						case 'error':
//							this.$Modal.error({
//								content: content
//							});
//							break;
//					}
//				}
//
//			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			nextStep() {
				if(this.corpType != "") {
					this.typeDisplay = false;
				}
				switch(this.corpType) {
					case "生产型":
						this.corpType = '1';
						this.corpType2 = "生产型";
						break;
					case "贸易型":
						this.corpType = '2';
						this.corpType2 = "贸易型";
						break;
					case "生产+贸易型":
						this.corpType = '3';
						this.corpType2 = "生产+贸易型";
						break;
					default:
						this.corpType = 0;
						break;
				}
			},
			updateType() {
				this.typeDisplay = true;
			},
			handleFormatError(file) { //判断上传的文件格式
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
			orgBeforeUpload() { //组织机构代码证上传之前，显示已上传文件
				this.showOrgUpList = true;
			},
			busBeforeUpload() { //企业营业执照上传之前将已上传文件显示
				this.showUpList = true;
			},
			handleSuccessOrg(res, file, fileList) {
				file.url = res.url;
				file.name = res.fileName;
				this.formValidate.orgImageUrl = res.url; //营业执照图片路径
				this.orgImageShow = true; //图片显示
				this.showBtnOrg = false; //添加附件、重新上传按钮切换
				this.showOrgUpList = false; //已上传文件隐藏
				this.$refs.uploadOrg.fileList = []; //移除已上传的文件信息
				this.$Message.success("上传成功！");
			},
			handleSuccessBusiness(res, file, fileList) { //上传企业营业执照
				file.url = res.url;
				file.name = res.fileName;
				this.formValidate.businessLicenseUrl = res.url; //工商营业执照图片路径
				this.businessImgShow = true; //企业营业执照照片显示
				this.showBtnBus = false;
				this.showUpList = false; //是否显示已上传的文件
				this.$refs.upload.fileList = []; //移除已上传的文件信息
				this.$Message.success("上传成功！");

			},
			handleView(name) { //查看大图
				this.imgName = name;
				this.visible = true;
			},
			/*showUpList(){
        		console.log(this.$refs.upload.fileList);
        	},*/

			//实际经营地址

		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			},
			uploadBusHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}
		},
		created() {
			const _this = this;
			//查询公司信息
			const corp = JSON.parse(window.localStorage.getItem('corp')); //将缓存字符串转为json对象
			//数据绑定
			var conpanyUrl = api.save_queryAuthentication + corp.id + api.queryAuthentication;
			this.axios(conpanyUrl)
				.then(function(res) {
					if(res.data.status == 1) {
						var obj = res.data.datas;
						_this.companyName = obj.name;
						//						_this.formValidate.openName = obj.name;
						_this.id = obj.id;
						_this.corpType = obj.corpType;
						if(_this.corpType != null) {
							_this.typeDisplay = false;
							console.log(_this.corpType);
							switch(_this.corpType) {
								case "1":
									_this.corpType = "1";
									_this.corpType2 = "生产型";
									break;
								case "2":
									_this.corpType = "2";
									_this.corpType2 = "贸易型";
									break;
								case "3":
									_this.corpType = "3";
									_this.corpType2 = "生产+贸易型";
									break;
							}
						}
						_this.formValidate.businessNum = obj.usci; //统一社会信用代码不能超过50位
						_this.formValidate.registeredAddress = obj.registeredAddress; //注册地址
						_this.formValidate.actualDetailAddress = obj.countyFullName; //实际经营详细地址
						_this.formValidate.legalPerson = obj.legalPerson; //法定代表人/企业负责人姓名
						_this.formValidate.bizScope = obj.bizScope; //经营范围(一般经营范围)
						_this.formValidate.enterpriseNatureId.id = obj.enterpriseNatureId; //企业性质ID不能超过32位
						_this.selected = obj.enterpriseNature; //企业性质不能超过50位
						_this.formValidate.enterpriseSizeId.id = obj.enterpriseSizeId; //企业规模ID不能超过32位
						_this.selected2 = obj.enterpriseSize; //企业规模不能超过50位
						//						_this.formValidate.yearTurnoverId.id = 	obj.yearTurnoverId;//年营业额ID不能超过32位
						_this.selected3 = obj.yearTurnover; //年营业额不能超过50位yearTurnover
						//						if(obj.imgOrgCode != null) {
						//							_this.showBtnOrg = false; //显示重新上传按钮
						//							_this.orgImageShow = true; //显示图片
						//							_this.formValidate.orgImageUrl = obj.imgOrgCode;
						//						}
						if(obj.imgBizLicense != null) {
							_this.showBtnBus = false; //显示重新上传按钮
							_this.businessImgShow = true; //显示图片
							_this.formValidate.businessLicenseUrl = obj.imgBizLicense;
						}
					}
				})
				.catch(function(err) {
					console.log(err);
				})
		}
	}
</script>
<style type="text/css">
	.ivu-form-item-label,
	.ivu-input {
		font-size: 14px!important;
	}
</style>
<style scoped>
	.applyBox {
		padding: 10px;
		padding-left: 0;
		position: absolute;
		top: 10px;
		bottom: 0;
		left: 10px;
		right: 30px;
	}
	
	.applyBox_com {
		padding: 0 35px;
		background: #fff;
		position: absolute;
		top: 45px;
		bottom: 10px;
		left: 0;
		overflow: hidden;
		overflow-y: scroll;
		right: 30px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
	}
	
	.liucheng {
		display: block;
		margin: 0 auto;
		margin-top: 35px;
		margin-bottom: 35px;
	}
	
	.uploaddiv {
		display: flex;
		display: -webkit-flex;
	}
	
	h4 {
		font-size: 14px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		font-weight: normal;
		line-height: 40px;
		padding-left: 20px;
		background-color: #3abcff;
		color: #fff;
		border-radius: 5px;
		-webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.19);
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.19);
		-moz-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.19);
	}
	
	h4 em {
		color: #bfbfbf;
		font-style: normal;
		margin-right: 5px;
	}
	/*h4 span{
		color:#fff;
	}*/
	
	h4 a {
		color: white;
		margin-right: 20px;
	}
	
	h4 a:hover {
		text-decoration: underline;
	}
	
	.authDataBox {
		padding: 10px 0px;
	}
	
	.authDataBox .authform .fromItemBox .fontitem label {
		font-size: 14px!important;
	}
	
	.textAddress {
		margin-top: 5px;
	}
	
	h3 {
		font-size: 14px;
		padding: 25px 10px 10px;
		margin-bottom: 30px;
		color: #0083c0;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.fontitem label {
		font-size: 16px;
	}
	
	.ivu-form-item-content {
		padding-left: 150px;
	}
	
	.typeRadioBox {
		margin: 23px 0px;
	}
	
	.PS {
		display: flex;
		display: -webkit-flex;
		margin-top: 45px;
	}
	
	.PS ul li {
		font-size: 14px;
	}
	
	.zhuyi {
		width: 50px;
		font-size: 12px;
		color: #ff8900;
		padding-left: 10px;
		line-height: 25px;
	}
	
	.introduceBox {
		font-size: 14px;
	}
	
	.introduceBox li {
		font-size: 12px;
		list-style: disc;
		line-height: 25px;
		color: #ff8900;
		list-style-type: none;
	}
	
	.subimg {
		width: 95px;
		height: 95px;
		background: url(../../assets/img/subimg.jpg) no-repeat;
		background-size: 100% 100%;
		border: none;
	}
	.subimg2 {
		width: 95px;
		height: 95px;
		background: url(../../assets/img/subimg.jpg) no-repeat;
		background-size: 100% 100%;
		border: none;
	}
	.btnBox {
		margin: 50px auto;
	}
	
	.btnBox button {
		background-color: #faa600;
		border-color: #faa600;
		font-size: 16px;
		margin-left: 180px;
		width: 140px;
	}
	
	.rdoPanel {
		padding: 10px;
	}
	
	.rdoPanel label {
		font-size: 14px;
	}
	
	.rdoPanel label span {
		margin-left: 30px;
		color: red;
	}
	
	.radGrop {
		width: 100%;
	}
	
	.fromItemBox {
		width: 80%;
	}
	
	.fromItemBox .fontitem .ivu-form-item-label {
		font-size: 14px!important;
	}
	
	.encloImg {
		width: 80px;
		visibility: visible;
	}
	
	.orangUploadBox {
		position: relative;
		top: 2px;
	}
	
	.orangUploadBox .upFile {
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
	
	.orangUploadBox .formLogo {
		height: 100%;
		overflow: hidden;
	}
	
	.orangUploadBox .formItem {
		width: 100%;
		margin-bottom: 18px;
		float: left;
		clear: both;
	}
	/*上传图片样式*/
	
	.ivu-form-item-content {
		display: flex;
		display: -webkit-flex;
	}
	
	.demo-upload-list {
		width: 95px;
		height: 95px;
		/*margin-left: 30px;*/
	}
	
	.demo-upload-list img {
		width: 95px;
		height: 95px;
		margin-top: 0;
	}
	.demo-upload-list-cover i{
		display: block;
	}
	.demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}
	
	.demo-upload-list:hover .demo-upload-list-cover {
		/*display: block;*/
	}
	
	.demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
	/*缩略图*/
	
	.thumbnail {
		margin-top: 8px;
	}
	/*地址选择*/
	
	.formItem {
		width: 100%;
		margin-bottom: 18px;
		float: left;
		clear: both;
	}
	
	.formItemArea {
		position: relative;
	}
	
	.formItemArea .area {
		width: 370px;
		position: absolute;
		left: 0px;
		top: 35px;
		margin: 5px 0;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 4px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
		z-index: 900;
	}
	
	.formItemArea .areaTab {
		width: 100%;
		height: 28px;
		line-height: 28px;
	}
	
	.formItemArea .areaTab span {
		float: left;
		width: 33.33%;
		height: 100%;
		background-color: #f0f0f0;
		border-left: 1px solid #ccc;
		text-align: center;
		cursor: pointer;
	}
	
	.formItemArea .areaTab span:first-child {
		border: 0;
	}
	
	.formItemArea .areaTab .tactive {
		background-color: #fff;
		color: #f60;
	}

	
	.formItemArea ul {
		overflow: auto;
		padding: 20px 0 20px 11px;
	}
	
	.formItemArea ul li {
		min-height: 48px;
	}
	
	.formItemArea ul a {
		display: inline-block;
		color: #4D4D4D;
		padding: 0 10px;
		outline: 0;
		text-decoration: none;
		white-space: nowrap;
		margin-right: 2px;
		line-height: 2;
	}
	
	.formItemArea ul .active {
		background-color: #f60;
		color: #fff;
		border-radius: 2px
	}
	
	.inputDisabled input[type="text"] {
		color: #000 !important;
	}
	/*改动*/
	
	.typeDisplay_p {
		display: flex;
		align-items: center;
	}
	
	.typeDisplay_p img {
		width: 18px;
		height: 18px;
	}
	
	.typeDisplay_p p {
		font-size: 14px;
		margin-left: 15px;
	}
	
	.Bread_ri {
		position: absolute;
		top: 15px;
		right: 3px;
		display: flex;
		margin-right: 30px;
	}
	
	.Bread_ri div {
		display: flex;
		align-items: center;
		margin-left: 20px;
	}
	
	.Bread_ri div:hover {
		cursor: pointer;
	}
	
	.Bread_ri div img {
		width: 14px;
		height: 14px;
		margin-right: 5px;
	}
	
	select {
		width: 100%;
		height: 30px;
		border-radius: 5px;
		border: 1px solid #dddee1;
	}
</style>