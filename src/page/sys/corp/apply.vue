<template>
	<div class="applyBox">
		<Breadcrumb>
			<Breadcrumb-item to='/main'>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">公司认证信息</span></Breadcrumb-item>
		
		</Breadcrumb>
	<div class="Bread_ri">
				<div>
					<img src="../../../assets/img/wwj_t.png" alt="" />
					<img src="-" />
					<span>配置</span>
				</div>
				<div>
					<img src="../../../assets/img/wjj_m.png" alt="" />
					<span>帮助</span>
				</div>
			</div>
		<div class="right_home_warp test-1">
			<div class="top_jindu">
				<img src="../../../assets/img/liucheng.png" />
				<!--<img class="liucheng" src="../../../assets/img/liucheng.jpg" />-->
			</div>

			<h4 class="seltil">
			<!--<em>●</em>-->
			类型
			<!--<span>（请从下列类型中选择一项）</span>-->
			<span v-if="!typeDisplay" @click.prevent="updateType">（<a>返回修改</a>）</span>
			<span  v-else @click.prevent="updateType">（ 请从下列类型中选择一项）</span>
			
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
						<div class="rdoPanel">
							<Radio label="物流商"></Radio>
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
				</div>
				<div v-show="!typeDisplay" class="typeDisplay_p">
					<img src="../../../assets/img/aut_Hook.png" />
					<p>{{corpType2}}</p>
				</div>
			</div>
			<div v-show="!typeDisplay" v-if="corpType == 5">
				<div class="rzt">
					<!--<em>●</em>-->
					<div>认证资料</div>
				</div>
				<div class="authDataBox">
					<!--<div class="rdo">-->
					<!--<RadioGroup v-model="animal">-->
					<!--<div class="rdoPanel" @click.stop="Oanimal()">
								<Radio label="个人"></Radio>
							</div>-->
					<!--<div class="rdoPanel" @click.stop="Oanimal1()">
								<Radio label="公司"></Radio>
							</div>-->
					<!--</RadioGroup>-->
					<!--</div>-->
					<!--个人-->
					<!--<div v-show="!animal_pers">
						<Form ref="formValidatepers" :model="formpers" :rules="ruleValidatepers" :label-width="110">
							<div class="formpers">
								<FormItem label="姓名：" prop="namepers">
									<Input v-model="formpers.namepers" placeholder="请输入姓名"></Input>
								</FormItem>
							</div>
							<div class="formpers">
								<FormItem label="联系电话：" prop="dhpers">
									<Input v-model="formpers.dhpers" placeholder="请输入联系电话"></Input>
								</FormItem>
							</div>
							<div class="formpers">
								<FormItem label="身份证号码：" prop="sfzpers">
									<Input v-model="formpers.sfzpers" placeholder="请输入身份证号码"></Input>
								</FormItem>
							</div>
							<div class="formpers">
								<FormItem label="车牌号码：" prop="cppers">
									<div class="add_canpinkuang_input">
										<Input v-model="cpnr" placeholder="请输入..." /><button class="bueadd" @click="addcp">确定</button>
									</div>
									<div class="add_canpinkuang">
										<div>
											<div v-for="(item,index) in cpsshy" class="cpkuang">
												<div v-model="item.value">{{item.value}}<span class="addqukuangnr_del" @click="delcpss(item,index)">X</span></div>

											</div>
										</div>
									</div>
								</FormItem>
							</div>
						</Form>
					</div>-->
					<!--//公司-->
					<div>
						<Form class="authform" ref="formValidatecomp" :model="formcomp" :rules="ruleValidatecomp" :label-width="200">
							<div class="fromItemBox">

								<div class="formcomp">
									<FormItem label="公司名称：" prop="namecomp">
										<Input v-model="companyName" placeholder="请输入企业全称" disabled class="inputDisabled"></Input>
									</FormItem>
								</div>
								<div class="formcomp">
									<FormItem label="统一社会信用代码：" prop="businessNum">
										<Input v-model="formcomp.businessNum" placeholder="请输入统一社会信用代码" class="inputDisabled"></Input>
									</FormItem>
								</div>
								<div class="formcomp">
									<FormItem label="法定代表人/企业负责人姓名：" prop="fzrcomp">
										<Input v-model="formcomp.fzrcomp" placeholder="请输入法定代表人/企业负责人姓名"></Input>
									</FormItem>
								</div>
								<div class="formcomp">
									<FormItem label="手机号码：" prop="sjcomp">
										<Input v-model="formcomp.sjcomp" placeholder="请输入手机号码"></Input>
									</FormItem>
								</div>
								<div class="formcomp">
									<FormItem label="座机号码：" prop="zjcomp">
										<Input v-model="formcomp.zjcomp" placeholder="请输入座机号码"></Input>
									</FormItem>
								</div>
								<div class="formcomp">
									<FormItem label="注册地址：">
										<div class="difelx">
											<div style="width: 300px;">
												<!--<Select placeholder="请选择省" v-model="formcomp.provinceName" @on-change="provinceOK" label-in-value='true' style="width:32%">
													<Option v-for="province in depList" :value="province.id" :key="province.id">{{ province.name }}</Option>
												</Select>
												<Select placeholder="请选择市" v-model="formcomp.cityName" @on-change="cityOK" label-in-value='true' style="width:32%">
													<Option v-for="city in depList5" :value="city.id" :key="city.id">{{ city.name }}</Option>
												</Select>
												<Select placeholder="请选择区" v-model="formcomp.countyName" label-in-value='true' style="width:32%">
													<Option v-for="county in depList6" :value="county.id" :key="county.id">{{ county.name }}</Option>
												</Select>-->

												<Select placeholder="请选择省" v-model="formcomp.provinceId" @on-change="registeredprovinceOK2" label-in-value='true' style="width:32%">
													<Option v-for="provinceName in depList7" :value="provinceName.id" :key="provinceName.id">{{ provinceName.name }}</Option>
												</Select>
												<Select placeholder="请选择市" v-model="formcomp.cityId" @on-change="registeredcityOK2" label-in-value='true' style="width:32%">
													<Option v-for="cityeName in depList8" :value="cityeName.id" :key="cityeName.id">{{ cityeName.name }}</Option>
												</Select>
												<Select placeholder="请选择区" v-model="formcomp.countyId" label-in-value='true' style="width:32%">
													<Option v-for="countyName in depList9" :value="countyName.id" :key="countyName.id">{{ countyName.name }}</Option>
												</Select>
											</div>
											<div>
												<Input v-model="formcomp.address" class="inbox" placeholder="请输入经营地址"></Input>
											</div>
										</div>
									</FormItem>
								</div>
								<div class="fontitemapp">
									<FormItem label="营业执照" prop="businessLicenseUrl2">
										<Upload ref="uploadOrg" :action="uploadUrl" :format="['jpg','jpeg','png']" accept="image/jpg,image/jpeg,image/png" :headers="uploadBusHeader" :before-upload="orgBeforeUpload" :on-success="handleSuccessOrg" :show-upload-list="showOrgUpList" :on-exceeded-size="handleMaxSize">
											<Button type="ghost" v-if="showBtnBus" class="subimg uploadbtn"></Button>
											<Button type="ghost" v-else="showBtnBus" class="subimg2 uploadbtn"></Button>
										</Upload>
										<div class="demo-upload-list" v-show="orgImageShow" style="position: absolute;top:0;left:8px;">
											<img :src="formcomp.businessLicenseUrl2" class="thumbnail">
											<div class="demo-upload-list-cover">
												<Icon size="30" color='white' type="eye" @click.native="handleView(formcomp.businessLicenseUrl2)" style="margin-top: 10px;" />
												<Icon size="30" color='white' type="plus" @click.native="tianjia" style="margin-top: 10px;" />
											</div>
											<Modal title="查看大图" v-model="visible">
												<img :src="imgName" v-if="visible" style="width: 100%">
											</Modal>
										</div>
									</FormItem>
								</div>
							</div>
							<!--<div class="fromItemBox">-->
							<!--<FormItem style="margin-top: 50px;">
								<Button type="primary" @click="saveSubmit('formValidate')">保存</Button>
								<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
								<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px;display: none;">重置</Button>
							</FormItem>-->
							<!--</div>-->
						</Form>
					</div>
				</div>
			</div>

			<!--公司-->
			<div v-show="!typeDisplay" v-if="corpType == 1 || corpType == 2 || corpType == 3">
				<div class="rzt">
					<!--<em>●</em>-->
					<div>认证资料</div>
				</div>
				<div class="authDataBox">
					<Form class="authform" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200">
						<!--<h3 style="font-size: 16px;">企业工商资料</h3>-->
						<div class="fromItemBox">
							<div class="fontitemapp">
								<FormItem label="企业全称:" prop="companyName">
									<Input v-model="companyName" placeholder="请输入企业全称" disabled class="inputDisabled"></Input>
								</FormItem>
							</div>
							<div class="fontitemapp">
								<FormItem label="统一社会信用代码:" prop="businessNum">
									<Input v-model="formValidate.businessNum" placeholder="请输入统一社会信用代码"></Input>
								</FormItem>
							</div>
							<!--prop="registeredAddress"-->
							<div class="fontitemapp">
								<FormItem label="注册地址:">
									<div class="difelx">
										<div style="width: 300px;">
											<Select placeholder="请选择省" v-model="formValidate.registeredProvinceId" @on-change="registeredprovinceOK" label-in-value='true' style="width:32%">
												<Option v-for="registeredprovince in depList" :value="registeredprovince.id" :key="registeredprovince.id">{{ registeredprovince.name }}</Option>
											</Select>
											<Select placeholder="请选择市" v-model="formValidate.registeredCityId" @on-change="registeredcityOK" label-in-value='true' style="width:32%">
												<Option v-for="registeredcity in depList2" :value="registeredcity.id" :key="registeredcity.id">{{ registeredcity.name }}</Option>
											</Select>
											<Select placeholder="请选择区" v-model="formValidate.registeredCountyId" label-in-value='true' style="width:32%">
												<Option v-for="registeredcounty in depList3" :value="registeredcounty.id" :key="registeredcounty.id">{{ registeredcounty.name }}</Option>
											</Select>
										</div>
										<div>
											<Input type="text" placeholder="请输入详细注册地址" class="inbox" v-model="formValidate.registeredAddress"></Input>

										</div>
									</div>
								</FormItem>
							</div>
							<div class="fontitemapp">
								<FormItem label="经营地址:">
									<div class="difelx">
										<div style="width: 300px;">
											<Select placeholder="请选择省" v-model="formcomp.provinceId" @on-change="registeredprovinceOK2" label-in-value='true' style="width:32%">
												<Option v-for="province in depList7" :value="province.id" :key="province.id">{{ province.name }}</Option>
											</Select>
											<Select placeholder="请选择市" v-model="formcomp.cityId" @on-change="registeredcityOK2" label-in-value='true' style="width:32%">
												<Option v-for="city in depList8" :value="city.id" :key="city.id">{{ city.name }}</Option>
											</Select>
											<Select placeholder="请选择区" v-model="formcomp.countyId" label-in-value='true' style="width:32%">
												<Option v-for="county in depList9" :value="county.id" :key="county.id">{{ county.name }}</Option>
											</Select>
										</div>
										<div>
											<Input v-model="formValidate.address" class="inbox" placeholder="请输入经营地址"></Input>
										</div>
									</div>
									<!--<Input v-model="formValidate.jyAddress" placeholder="请输入经营地址"></Input>-->
								</FormItem>
							</div>
							<div class="fontitemapp">
								<FormItem label="法定代表人/企业负责人姓名:" prop="legalPerson">
									<Input v-model="formValidate.legalPerson" placeholder="请输入法定代表人/企业负责人姓名"></Input>
								</FormItem>
							</div>
							<div class="fontitemapp">
								<FormItem label="企业性质:" prop="enterpriseNature">
									<Select placeholder="请输入企业规模" v-model="selected">
										<Option v-for="(item,index) in formValidate.enterpriseNatureId.enterpriseNature" :value="formValidate.enterpriseNatureId.enterpriseNature[index]" :key="index">{{item}}</Option>
									</Select>
								</FormItem>
							</div>
							<div class="fontitemapp">
								<FormItem label="企业规模:" prop="enterpriseSize">
									<Select placeholder="请输入企业规模" v-model="selected2">
										<Option v-for="(item2,index2) in formValidate.enterpriseSizeId.enterpriseSize" :value="formValidate.enterpriseSizeId.enterpriseSize[index2]" :key="index2">{{item2}}</Option>
									</Select>
								</FormItem>
							</div>
							<div class="fontitemapp">
								<FormItem label="年营业额（单位：元）:" prop="yearTurnover">
									<Select placeholder="请输入企业规模" v-model="selected3">
										<Option v-for="(item3,index3) in formValidate.yearTurnoverId.yearTurnover" :value="formValidate.yearTurnoverId.yearTurnover[index3]" :key="index3">{{item3}}</Option>
									</Select>
								</FormItem>
							</div>
							<div class="fontitemapp">
								<FormItem label="经营范围(一般经营范围):" prop="bizScope">
									<Input type="textarea" v-model="formValidate.bizScope" placeholder="请输入经营范围(一般经营范围)"></Input>
								</FormItem>
							</div>
							<div class="fontitemapp">
								<FormItem label="营业执照" prop="businessLicenseUrl">
									<!--<p style="color: red;font-size: 14px;">必须上传原件的扫描件或照片（JPG,JPEG或PNG格式），大小不超过2M，只能上传一张！</p>-->
									<div class="uploaddiv">
										<Upload ref="upload" :format="['jpg','jpeg','png']" accept="image/jpg,image/jpeg,image/png" :action="uploadUrl" :headers="uploadBusHeader" :before-upload="busBeforeUpload" :on-success="handleSuccessBusiness" :show-upload-list="showUpList" style="display: flex;display: -webkit-flex;">
											<Button type="ghost" v-if="showBtnBus" class="subimg uploadbtn"></Button>
											<Button type="ghost" v-else="showBtnBus" class="subimg2 uploadbtn"></Button>
										</Upload>
										<div class="demo-upload-list" v-show="businessImgShow" style="position: absolute;left:8px;">
											<img :src="formValidate.businessLicenseUrl" class="thumbnail">
											<div class="demo-upload-list-cover">
												<Icon size="30" color='white' type="eye" @click.native="handleView(formValidate.businessLicenseUrl)" style="margin-top: 10px;" />
												<Icon size="30" color='white' type="plus" @click.native="tianjia" style="margin-top: 10px;" />
											</div>
										</div>
										<Modal title="查看大图" v-model="visible">
											<img :src="imgName" v-if="visible" style="width: 100%">

										</Modal>
									</div>
								</FormItem>
							</div>
						</div>
						<!--<div class="fromItemBox">-->
						<!--<FormItem style="margin-top: 50px;">
								<Button type="primary" @click="saveSubmit('formValidate')">保存</Button>
								<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
								<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px;display: none;">重置</Button>
							</FormItem>-->
						<!--</div>-->
					</Form>
				</div>
			</div>

		</div>
		<div class="btn-bot">
			<button v-if="this.typeDisplay==false && (this.corpType == 1 || this.corpType == 2 || this.corpType == 3)" class="btn-save" @click="handleSubmit('formValidate')">提交</button>
			<button v-else-if="this.typeDisplay==false && this.corpType == 5" class="btn-save" @click="handleSubmit2('formcomp')">提交</button>
			<button v-else class="btn-return" @click='nextStep'>下一步</button>
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
		mounted() {
			const _this = this;
			//查询公司信息
			const corp = JSON.parse(window.localStorage.getItem('corp')); //将缓存字符串转为json对象
			//数据绑定
			var conpanyUrl = api.save_queryAuthentication + corp.id + api.queryAuthentication;
			this.axios(conpanyUrl)
				.then(function(res) {
					console.log('--\\\\\\\\\\\\\\\--', res);
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
								case "4":
									_this.corpType = "4";
									_this.corpType2 = "物流商个人";
									break;
								case "5":
									_this.corpType = "5";
									_this.corpType2 = "物流商公司";
									break;
							}
						}
						_this.formValidate.businessNum = obj.usci; //统一社会信用代码不能超过50位
						_this.formValidate.registeredAddress = obj.registeredAddress; //注册地址
						_this.formValidate.actualDetailAddress = obj.countyFullName; //实际经营详细地址
						_this.formValidate.registeredProvinceId = obj.registeredProvinceId;
						_this.formValidate.registeredCityId = obj.registeredCityId;
						_this.formValidate.registeredCountyId = obj.registeredCountyId;

						_this.formValidate.address = obj.address; //实际经营详细地址
						_this.formValidate.legalPerson = obj.legalPerson; //法定代表人/企业负责人姓名
						_this.formValidate.telephone = obj.telephone
						_this.formValidate.bizScope = obj.bizScope; //经营范围(一般经营范围)
						_this.formValidate.enterpriseNatureId.id = obj.enterpriseNatureId; //企业性质ID不能超过32位
						_this.selected = obj.enterpriseNature; //企业性质不能超过50位
						_this.formValidate.enterpriseSizeId.id = obj.enterpriseSizeId; //企业规模ID不能超过32位
						_this.selected2 = obj.enterpriseSize; //企业规模不能超过50位
						//						_this.formValidate.yearTurnoverId.id = 	obj.yearTurnoverId;//年营业额ID不能超过32位
						_this.selected3 = obj.yearTurnover; //年营业额不能超过50位yearTurnover

						_this.formcomp.businessNum = obj.usci; //统一社会信用代码不能超过50位
						_this.formcomp.fzrcomp = obj.contact; //主负责人
						_this.formcomp.sjcomp = obj.telephone; //手机号码
						_this.formcomp.zjcomp = obj.telephone; //座机号码
						//						_this.formcomp.businessNum = obj.businessNum;//统一社会信用代码不能超过50位

						_this.formcomp.address = obj.address; //实际经营详细地址				
						//						_this.formValidate.provinceId = obj.provinceId;
						//						_this.formValidate.cityId = obj.cityId;
						//						_this.formValidate.countyId = obj.countyId;
//						if(_this.corpType == 5) {

							_this.formcomp.provinceId = obj.provinceId;
							_this.formcomp.cityId = obj.cityId;
							_this.formcomp.countyId = obj.countyId;
//						} else {
							_this.formValidate.provinceId = obj.provinceId;
							_this.formValidate.cityId = obj.cityId;
							_this.formValidate.countyId = obj.countyId;
//						}

						if(obj.imgBizLicense != null) {
							_this.showBtnOrg = false; //显示重新上传按钮
							_this.orgImageShow = true; //显示图片
							_this.formcomp.businessLicenseUrl2 = obj.imgBizLicense;
						}

						if(obj.imgBizLicense != null) {
							_this.showBtnBus = false; //显示重新上传按钮
							_this.businessImgShow = true; //显示图片
							_this.formValidate.businessLicenseUrl = obj.imgBizLicense;

						}
						_this.selSuo = true;
						_this.shuzud();

					}
				})
				.catch(function(err) {
					console.log(err);
				})

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
				animal: '个人',
				animal_pers: false,
				cpnr: "",
				re_do: '',
				do_yn: false,
				do_no: false,
				cpsshy: [{ //主营产品已有内容，需接入接口数据
						value: '家具制造'
					},
					{
						value: '家具制造2'
					},
					{
						value: '家具制造3'
					},
					{
						value: '家具制造4'
					}
				],
				formpers: {
					namepers: '', //姓名
					dhpers: '', //联系电话
					sfzpers: '', //身份证号码
					cppers: '', //车牌号码

				},
				formcomp: {
					fzrcomp: '', //主负责人
					sjcomp: '', //手机号码
					zjcomp: '', //座机号码
					wdcomp: '', //网点地址
					logoUrl: '', //企业logo
					businessLicenseUrl2: '', //工商营业执照图片路径
					businessNum: '',
					provinceId: '',
					cityId: '',
					countyId: '',
					address: '',

				},
				apap: false,
				selSuo: false,
				depList: [],
				depList2: [],
				depList3: [],
				depList4: [],
				depList5: [],
				depList6: [], //1-3为注册地址的省市区，4-6为经营地址的省市区
				depList7: [],
				depList8: [],
				depList9: [],
				selected: '请选择省',
				selected2: '请选择市',
				selected3: '请选择区',
				id: '', //存储ID
				corpType: '', //类型
				corpType2: '',
				//				corpType: 0, //类型存储
				typeDisplay: true,
				uploadUrl: api.uploadFileUrl,
				logoShow: false,

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
					registeredAddress: '', //注册地址全名
					address: '', //经营地址全名
					registeredProvinceId: '', //	省注册地址不能超过200位
					registeredCityId: '', //	市注册地址不能超过200位
					registeredCountyId: '', //	区注册地址不能超过200位
					provinceId: '', //	省注册地址不能超过200位
					cityId: '', //	市注册地址不能超过200位
					countyId: '', //	区注册地址不能超过200位

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
				ruleValidatepers: {
					namepers: [{
						required: true,
						message: '请输入姓名',
						rigger: 'blur'
					}],
					dhpers: [{
						required: true,
						message: '请输入联系电话',
						rigger: 'blur'
					}],
					sfzpers: [{
						required: true,
						message: '请输入身份证号码',
						rigger: 'blur'
					}],
					cppers: [{
						required: true,
						message: '请输入车牌号码',
						rigger: 'blur'
					}],

				},
				ruleValidatecomp: {
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
					fzrcomp: [{
							required: true,
							message: '请输入主负责人',
							rigger: 'blur'

						},
						{
							//							type: 'string',
							max: 20,
							message: '主负责人不超过20个字符',
							trigger: 'blur'
						}
					],
					sjcomp: [{
							required: true,
							message: '请输入手机号码',
							rigger: 'blur'
						},
						{
							type: 'string',
							max: 11,
							message: '手机号码不超过11个字符',
							trigger: 'blur'
						}
					],
					zjcomp: [{
							required: true,
							message: '请输入座机号码',
							rigger: 'blur'
						},
						{
							type: 'string',
							max: 11,
							message: '座机号码11个字符',
							trigger: 'blur'
						}
					],
					businessLicenseUrl: [{
						required: true,
						message: '请上传营业执照',
						trigger: 'blur'
					}]

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
							message: '请输入详细注册地址',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 200,
							message: '详细注册地址不超过100个汉字',
							trigger: 'blur'
						}
					],
					address: [{
							required: true,
							message: '请输入详细经营地址',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 200,
							message: '详细经营地址不超过100个汉字',
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

					telephone: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 20,
							message: '手机号码，不超过11个字符',
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

					/*registeredAddress: [{
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
					],*/

					businessLicenseUrl: [{
						required: true,
						message: '请上传营业执照图片',
						trigger: 'blur'
					}]

				},

			}
		},
		methods: {
			addcp() {
				let _this = this;
				var zycp = {
					value: _this.cpnr
				};
				_this.cpsshy.push(zycp);
			},
			delcpss(item, index) { //删除主营产品x
				let _this = this;
				_this.cpsshy.splice(index, 1);
			},
//			handleSubmit(name) {
//				this.$refs[name].validate((valid) => {
//					if(valid) {
//						_this.do_yn = true;
//						_this.re_do = "Success!";
//						setTimeout(() => {
//							_this.do_yn = false;
//
//						}, 2000);
//
//					} else {
//						_this.do_no = true;
//						_this.re_do = 'Fail';
//						setTimeout(() => {
//							_this.do_no = false;
//
//						}, 2000);
//
//					}
//				})
//			},
			//				handleSubmit2(name) {
			//				this.$refs[name].validate((valid) => {
			//					if(valid) {
			//						this.$Message.success('Success!');
			//					} else {
			//						this.$Message.error('Fail!');
			//					}
			//				})
			//			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			Oanimal() {
				let _this = this;
				_this.animal_pers = false;
			},
			Oanimal1() {
				let _this = this;
				_this.animal_pers = true;
			},
			apap() {
				this.typeDisplay = !this.typeDisplay
			},
			//			注册
			registeredprovinceOK() {
				//				console.log("!?!?");

				let _this = this;
				let va = _this.formValidate.registeredProvinceId;

				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/' + va + '/queryCities.do'
					})
					.then(function(res) {

						if(res.data.status == 1) {
							_this.depList2 = res.data.datas;
							console.log(_this.depList2);
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);
						}

					})
			},
			registeredcityOK() {

				let _this = this;
				let va = _this.formValidate.registeredCityId;
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/' + va + '/queryCounties.do'
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.depList3 = res.data.datas;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//							_this.$Message.error(res.data.message);
						}

					})
			},

			//			经营
			provinceOK() {
				
				console.log(va);
				let _this = this;
				let va = _this.formValidate.provinceId;
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/' + va + '/queryCities.do'
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.depList5 = res.data.datas;

						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//	_this.$Message.error(res.data.message);
						}

					})
			},
			cityOK() {
				let _this = this;
				let va = _this.formValidate.cityId;
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/' + va + '/queryCounties.do'
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.depList6 = res.data.datas;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);

						}

					})
			},
			//物流
			registeredprovinceOK2() {
				//				console.log("!?!?");

				let _this = this;
				let va = _this.formcomp.provinceId;

				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/' + va + '/queryCities.do'
					})
					.then(function(res) {

						if(res.data.status == 1) {
							_this.depList8 = res.data.datas;
							console.log(_this.depList8);
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);
						}

					})
			},
			registeredcityOK2() {

				let _this = this;
				let va = _this.formcomp.cityId;
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/' + va + '/queryCounties.do'
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.depList9 = res.data.datas;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);
						}

					})
			},
			applyInfo() {
				const _this = this;
				var applyInfo = {};
				applyInfo.id = _this.id; //id
				applyInfo.corpType = _this.corpType; //类型
				applyInfo.name = _this.companyName; //企业全称
				applyInfo.usci = _this.formValidate.businessNum; //统一社会信用代码不能超过50位
				applyInfo.registeredAddress = _this.formValidate.registeredAddress; //详细注册地址
				applyInfo.registeredProvinceId = _this.formValidate.registeredProvinceId;
				applyInfo.registeredCityId = _this.formValidate.registeredCityId;
				applyInfo.registeredCountyId = _this.formValidate.registeredCountyId;
				applyInfo.address = _this.formValidate.address; //详细注册地址
				applyInfo.provinceId = _this.formValidate.provinceId;
				applyInfo.cityId = _this.formValidate.cityId;
				applyInfo.countyId = _this.formValidate.countyId;
				applyInfo.legalPerson = _this.formValidate.legalPerson; //法定代表人/企业负责人姓名1
				applyInfo.bizScope = _this.formValidate.bizScope; //经营范围(一般经营范围)1
				applyInfo.enterpriseNatureId = _this.formValidate.enterpriseNatureId.id; //企业性质ID不能超过32位
				applyInfo.enterpriseNature = _this.selected; //企业性质不能超过50位
				applyInfo.enterpriseSizeId = _this.formValidate.enterpriseSizeId.id; //企业规模ID不能超过32位
				applyInfo.enterpriseSize = _this.selected2; //企业规模不能超过50位
				applyInfo.yearTurnoverId = _this.formValidate.yearTurnoverId.id; //年营业额ID不能超过32位
				applyInfo.yearTurnover = _this.selected3; //年营业额不能超过50位
				applyInfo.imgBizLicense = _this.formValidate.businessLicenseUrl; //企业工商营业执照不能超过

				applyInfo.provinceId = _this.formcomp.provinceId;
				applyInfo.cityId = _this.formcomp.cityId;
				applyInfo.countyId = _this.formcomp.countyId;
				applyInfo.address = _this.formcomp.address;
				return applyInfo;
			},
			applyInfo2() {
				const _this = this;
				var applyInfo2 = {};
				applyInfo2.id = _this.id; //id
				applyInfo2.corpType = _this.corpType; //类型
				applyInfo2.name = _this.companyName; //企业全称
				applyInfo2.contact = _this.formcomp.fzrcomp; //法定代表人/企业负责人姓名1
				applyInfo2.telephone = _this.formcomp.sjcomp;
				applyInfo2.logoUrl = _this.formcomp.logoUrl; //logo
				applyInfo2.imgBizLicense = _this.formcomp.businessLicenseUrl2; //logo
				applyInfo2.businessNum = _this.formcomp.businessNum;
				applyInfo2.provinceId = _this.formcomp.provinceId;
				applyInfo2.cityId = _this.formcomp.cityId;
				applyInfo2.countyId = _this.formcomp.countyId;
				applyInfo2.address = _this.formcomp.address;
				return applyInfo2;

			},

			handleSubmit2(name) {
				let _this = this;
				//				alert('aaa');
				if(_this.formcomp.businessLicenseUrl2 == '') {
					_this.do_no = true;
					_this.re_do = '请上传公司logo图片';
					setTimeout(() => {
						_this.do_no = false;

					}, 2000);

					//_this.$Message.error('请上传公司logo图片!');
				} else {
					//						_this.$refs[name].validate((valid) => {
					var newApplyInfo2 = _this.applyInfo2(); //临时存储页面中输入的数据信息
					console.log(_this.formcomp.businessLicenseUrl2);

					//						if(valid) {
					//							var newApplyInfo = _this.applyInfo(); //临时存储页面中输入的数据信息

					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.apply,
							data: api.convertParam(newApplyInfo2)
						})
						.then(function(res) {

							console.log(res);
							if(res.data.status == 1) {
								//								_this.instance("success", 1, res.data.message);
								console.log('qqqqqqqqqqqqqqqqqq1111111qqqqqqq', newApplyInfo2);
								//_this.$Message.success('表单已提交!')
								_this.do_yn = true;
								_this.re_do = "表单已提交";
								setTimeout(() => {
									_this.do_yn = false;
								}, 2000);

								setTimeout(() => {
									_this.$router.push({
										path: '/sys/corp/authentication_info'
									})
								}, 2000);

							} else {
								//									_this.instance("error", 1, res.data.message);
								//_this.$Message.error(res.data.message);
								_this.do_no = true;
								_this.re_do = res.data.message;
								setTimeout(() => {
									_this.do_no = false;

								}, 2000);

							}
						})
						.catch(function(error) { //捕获错误信息
							console.log(error);
						});
					//this.$Message.success('Success!');
					//						} else {
					////							console.log(this.formcomp.actualAddress, this.companyName);
					//							this.$Message.error('表单验证失败!');
					//
					//						}
					//					})
				}
			},
			//表单提交验证

			handleSubmit(name) { //提交验证
				const _this = this;
				if(_this.formValidate.legalPerson == '') {
					_this.do_no = true;
					_this.re_do = '请选择企业性质！';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
					//					_this.$Message.error();
				} else if(_this.formValidate.enterpriseSize == '') {
					_this.do_no = true;
					_this.re_do = '请选择企业规模！';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
					//					_this.$Message.error('请选择企业规模！');
				} else if(_this.formValidate.enterpriseSize == '') {
					_this.do_no = true;
					_this.re_do = '请选择年营业额！';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
					//					_this.$Message.error('请选择年营业额！');
				} else if(_this.formValidate.businessLicenseUrl == '') {
					_this.do_no = true;
					_this.re_do = '请上传营业执照！';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
					//					_this.$Message.error('请上传营业执照!');
				} else if(_this.formValidate.registeredAddress == '' || _this.formValidate.registeredCityId == '' || _this.formValidate.registeredCountyId == '') {
					//					_this.$Message.error('请选择注册地址!');
					_this.do_no = true;
					_this.re_do = '请选择注册地址！';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
				} else if(_this.formValidate.provinceId == '' || _this.formValidate.cityId == '' || _this.formValidate.countyId == '') {
					//					_this.$Message.error('请选择经营地址!');
					_this.do_no = true;
					_this.re_do = '请选择经营地址！';
					setTimeout(() => {
						_this.do_no = false;
					}, 2000);
				} else {
					_this.$refs[name].validate((valid) => {
						var newApplyInfo = _this.applyInfo(); //临时存储页面中输入的数据信息
						console.log(_this.formValidate.registeredProvinceId);
						if(valid) {
							var newApplyInfo = _this.applyInfo(); //临时存储页面中输入的数据信息

							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: api.apply,
									data: api.convertParam(newApplyInfo)
								})
								.then(function(res) {
									//									console.log("!!!!!!!!!!!!");
									console.log(res);
									if(res.data.status == 1) {
										//								_this.instance("success", 1, res.data.message);
										//										_this.$Message.success('表单已提交!');
										_this.do_yn = true;
										_this.re_do = "表单已提交";
										//										
										setTimeout(() => {
											_this.do_yn = false;
											_this.$router.push({
												path: '/sys/corp/authentication_info'
											})
										}, 2000);

									} else {
										//									_this.instance("error", 1, res.data.message);
										_this.do_no = true;
										_this.re_do = res.data.message;
										setTimeout(() => {
											_this.do_no = false;

										}, 2000);
										//										_this.$Message.error(res.data.message);
									}
								})
								.catch(function(error) { //捕获错误信息
									console.log(error);
								});
							//this.$Message.success('Success!');
						} else {
							console.log(this.formValidate.actualAddress, this.companyName);
							//							this.$Message.error('表单验证失败!');
							_this.do_no = true;
							_this.re_do = "表单验证失败";
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

						}
					})
				}
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
									_this.do_yn = true;
									_this.re_do = "保存成功";
									setTimeout(() => {
										_this.do_yn = false;
										//										_this.$router.push({
										////											_this.$router.go(0);
										//										})
									}, 2000);

								} else {
									//									_this.instance("error", 0, res.data.message);
									//									_this.$Message.error(res.data.message);
									_this.do_no = true;
									_this.re_do = res.data.message;
									setTimeout(() => {
										_this.do_no = false;

									}, 2000);
								}
							})
							.catch(function(error) {
								console.log(error);
							})
					}
				});
			},
			tianjia() {
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
				} else if(this.corpType == 1 || this.corpType == 2 || this.corpType == 3) {
					this.typeDisplay = true;
				} else {
					this.typeDisplay = true;
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
					case "物流商":
						this.corpType = '5';
						this.corpType2 = "物流商";
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
				this.formcomp.businessLicenseUrl2 = res.url; //营业执照图片路径
				this.orgImageShow = true; //图片显示
				this.showBtnOrg = false; //添加附件、重新上传按钮切换
				this.showOrgUpList = false; //已上传文件隐藏
				this.$refs.uploadOrg.fileList = []; //移除已上传的文件信息
				//this.$Message.success("上传成功！");
			},
			handleSuccessBusiness(res, file, fileList) { //上传企业营业执照
				file.url = res.url;
				file.name = res.fileName;
				this.formValidate.businessLicenseUrl = res.url; //工商营业执照图片路径
				this.businessImgShow = true; //企业营业执照照片显示
				this.showBtnBus = false;
				this.showUpList = false; //是否显示已上传的文件
				this.$refs.upload.fileList = []; //移除已上传的文件信息
				//				this.$Message.success("上传成功！");
				_this.do_yn = true;
				_this.re_do = "上传成功";
				setTimeout(() => {
					_this.do_yn = false;

				}, 2000);

			},
			handleView(name) { //查看大图
				this.imgName = name;
				this.visible = true;
			},
			/*showUpList(){
        		console.log(this.$refs.upload.fileList);
        	},*/

			//实际经营地址
			shuzud() {
				let _this = this;
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: '/api/base/address/queryAllProvinces.do'
					})
					.then(function(res) {
						if(res.data.status == 1) {
							//						console.log('---66----', res.data.datas);
							_this.depList = res.data.datas;
							_this.depList4 = res.data.datas;
							_this.depList7 = res.data.datas;
							_this.registeredprovinceOK();
							_this.registeredcityOK();
							_this.provinceOK();
							_this.cityOK();
							_this.registeredprovinceOK2();
							_this.registeredcityOK2();

						}

					})
			}

		}
	}
</script>
<style>
	.ivu-form-item-label,
	.ivu-input {
		font-size: 14px!important;
	}
	
	.seltil .applyBox .ivu-form-item {
		width: 75%;
		display: inline-block;
	}
	
	.fontitemapp {
		width: 75%;
	}
	
	.fontitemapp input {
		width: 500px;
	}
	
	.fontitemapp .ivu-form-item-content {
		width: 500px;
	}
	
	.inbox input {
		width: 210px!important;
	}
	
	.authform .fromItemBox .fontitem .ivu-form-item-label:before {
		content: '*'!important;
		display: inline-block;
		margin-right: 4px;
		line-height: 1;
		font-family: SimSun;
		font-size: 13px;
		color: #ed3f14;
	}
	
	.authform .fromItemBox .ivu-form-item .ivu-form-item-label:before {
		content: '*'!important;
		display: inline-block;
		margin-right: 4px;
		line-height: 1;
		font-family: SimSun;
		font-size: 13px;
		color: #ed3f14;
	}
	
	.ivu-input[disabled],
	fieldset[disabled] .ivu-input {
		color: #333 !important;
	}
	
	.applyBox textarea.ivu-input {
		min-height: 95px!important;
	}
	
	.applyBox .ivu-radio-inner:after {
		background-color: #00cbea;
	}
	
	.ivu-modal-header .ivu-modal-header-inner {
		height: 44px;
		line-height: 44px;
		margin: 0 0 0 20px;
	}
	
	.ivu-modal-footer {
		/*margin-top: 20px;*/
		/*margin-right: 20px;*/
	}
	
	.ivu-modal-footer button {
		border: 1px solid #01bad6;
		background-color: #01bad6;
		border-color: #01bad6;
		width: 88px;
		height: 34px;
		font-size: 16px;
	}
	
	.applyBox .ivu-modal-footer button:nth-child(1) {
		display: none;
	}
	
	.ivu-modal-footer button:nth-child(2):hover {
		border: 1px solid #00d8f8;
		background-color: #00d8f8;
	}
</style>
<style scoped>
	.seltil {
		position: relative;
		padding-left: 10px;
	}
	/*.applyBox {
		position: absolute;
		top: 0px;
		bottom: 0;
		left: 10px;
		right: 30px;
	}*/
	
	.liucheng {
		display: block;
		margin: 0 auto;
		margin-top: 35px;
		margin-bottom: 35px;
		width: 100%;
	}
	
	.uploaddiv {
		display: flex;
		display: -webkit-flex;
	}
	
	h4 {
		font-size: 14px;
		display: flex;
		display: -webkit-flex;
		font-weight: normal;
		line-height: 40px;
		/*background-color: #3abcff;*/
		/*border-radius: 5px;
		-webkit-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.19);
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.19);
		-moz-box-shadow: 0 2px 3px rgba(0, 0, 0, 0.19);*/
	}
	
	h4.seltil:before {
		content: "";
		width: 3px;
		height: 15px;
		position: absolute;
		top: 12.5px;
		left: 0;
		background: #88b7e0;
	}
	
	h4.seltil span a {
		color: #415161;
		/*text-decoration: underline;*/
	}
	
	h4.seltil span a:hover {
		text-decoration: underline;
		color: #00afc9;
	}
	
	.authDataBox {
		padding: 30px 0px;
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
		background-color: #f2ffea;
		border: 1px solid #c7ddb9;
		height: 64px;
		width: 868px;
	}
	
	.PS ul li {
		font-size: 14px;
		height: 32px;
		line-height: 32px;
	}
	
	.zhuyi {
		width: 50px;
		font-size: 13px;
		color: #009900;
		padding-left: 10px;
		line-height: 30px;
	}
	
	.introduceBox {
		font-size: 14px;
	}
	
	.introduceBox li {
		font-size: 13px;
		list-style: disc;
		line-height: 25px;
		color: #009900;
		list-style-type: none;
	}
	
	.subimg {
		width: 95px;
		height: 95px;
		background: url(../../../assets/img/subimg.jpg) no-repeat;
		background-size: 100% 100%;
		border: none;
	}
	
	.subimg2 {
		width: 95px;
		height: 95px;
		background: url(../../../assets/img/subimg.jpg) no-repeat;
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
		padding: 0 20px 20px 10px;
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
		width: 100%;
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
	
	.demo-upload-list-cover i {
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
		width: 14px;
		height: 14px;
	}
	
	.typeDisplay_p p {
		font-size: 14px;
		margin-left: 15px;
	}
	
	.Bread_ri {
		position: absolute;
		top: 12px;
		right: 15px;
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
	
	.rzt {
		border-bottom: 1px solid #ccd9e6;
	}
	
	.rzt div {
		display: inline-block;
		border: none;
		background-color: #415161;
		color: #fff;
		width: 100px;
		height: 33px;
		line-height: 33px;
		text-align: center;
		font-size: 13px;
	}
	
	.wi {
		position: absolute;
		left: -200px;
		width: 550px;
	}
	
	.difelx {
		display: flex;
		justify-content: flex-start
	}
	
	.rdo {
		margin-left: 100px;
	}
	
	.rdo div {
		display: flex;
		/*margin-left: 100px;*/
	}
	
	.formpers,
	.formcomp {
		width: 710px;
	}
	
	.cpkuang {
		display: inline-block;
	}
	
	.cpkuang div {
		height: 34px;
		line-height: 22px;
		display: inline-block;
		padding: 5px 5px;
		border: 1px solid #ccd9e6;
		margin-right: 5px;
		margin-top: 10px;
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
	
	.addqu .addqukuangnr_del {
		margin-left: 6px;
	}
	
	.addqu .addqukuangnr_del:hover {
		cursor: pointer;
		color: #00c1de;
	}
	
	.bueadd {
		width: 50px;
		height: 30px !important;
		line-height: 30px;
		border: none;
		border: 1px solid #ccd9e6;
		background-color: #ccd9e6;
		font-size: 12px;
		border-radius: 0 2px 2px 0;
		color: #415161;
	}
	
	.top_jindu {
		height: 75px;
		width: 100%;
		background: #eceef5;
		text-align: center;
		padding-top: 20px;
		margin-bottom: 20px;
	}
</style>