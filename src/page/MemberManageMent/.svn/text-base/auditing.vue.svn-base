<template>
	<div>
		<div class="audit_box">
			<!--<Breadcrumb style="padding-top: 10px;padding-bottom: 10px;">
				<Breadcrumb-item>
					<router-link to='/main'>
						<span class="link_span">首页</span>
					</router-link>
				</Breadcrumb-item>-->
					<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
				<Breadcrumb-item><span class="link_span">平台</span></Breadcrumb-item>
				<Breadcrumb-item><span class="link_span ok_link">会员管理</span></Breadcrumb-item>
			</Breadcrumb>
		</div>

		<div class="fromItemBox  right_home_warp " style="overflow: hidden;">
			<div class="rhw  test-1">
				<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
					<!--<h3>
				审核意见
			</h3>-->
					<h4>审核意见（多选）</h4>
					<div class="aa">
						<!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">-->
						<!--<Row  class="list">-->
						<!--<Col span="4" >-->
						<CheckboxGroup v-model="social" class="aaa" v-if='corpType == 1 || corpType == 2 || corpType == 3'>
							<Checkbox class="Checkbox" :label="lists1"></Checkbox>
							<Checkbox class="Checkbox" :label="lists2"></Checkbox>
							<Checkbox class="Checkbox" :label="lists3"></Checkbox>
							<Checkbox class="Checkbox" :label="lists4"></Checkbox>
							<Checkbox class="Checkbox" :label="lists5"></Checkbox>
							<Checkbox class="Checkbox" :label="lists6"></Checkbox>
							<Checkbox class="Checkbox" :label="lists7"></Checkbox>
							<Checkbox class="Checkbox" :label="lists8"></Checkbox>
							<Checkbox class="Checkbox" :label="lists9"></Checkbox>
						</CheckboxGroup>
						<CheckboxGroup v-model="social" class="aaa" v-if='corpType == 5'>
							<Checkbox class="Checkbox" :label="lists1"></Checkbox>
							<Checkbox class="Checkbox" :label="lists2"></Checkbox>
							<Checkbox class="Checkbox" :label="lists3"></Checkbox>
							<Checkbox class="Checkbox" :label="lists5"></Checkbox>
							<Checkbox class="Checkbox" :label="lists9"></Checkbox>
						</CheckboxGroup>
						<!--</Col>-->
						<!--</Row>-->

						<h4 style="margin: 30px 0 20px 0;">审核意见（必填）</h4>
						<!--<Input v-model="formValidate.auditedContent" type="textarea" style="height: 100px;" placeholder="请填写审核内容"></Input>-->
						<!--<FormItem label="其他:" prop="auditedContent" >-->
						<FormItem prop="auditedContent" label-width="15">
							<Input v-model="formValidate.auditedContent" type="textarea" placeholder="请填写审核内容(必填)"></Input>

						</FormItem>

					</div>
				</Form>
				<!--资料-->
				<div class="authenInfoPanel">
					<h4>企业认证资料</h4>
					<div v-if="corpType == 5">
						<ul class="authenInfoBox">
							<li>
								<!--<span class="Must">*</span>-->
								<div class="leftBox">企业类型:</div>
								<div class="rightBox">{{ applyInfo.corpType }}</div>
							</li>
							<li>
								<!--<span class="Must">*</span>-->
								<div class="leftBox">企业全称:</div>
								<div class="rightBox">{{ applyInfo.name }}</div>
							</li>
							<li>
								<div class="leftBox">统一社会信用代码:</div>
								<div class="rightBox">{{ applyInfo.businessNum}}</div>
							</li>

							<li>
								<div class="leftBox">法定代表人/企业负责人姓名:</div>
								<div class="rightBox">{{ applyInfo.legalPerson }}</div>
							</li>
							<li>
								<div class="leftBox">手机电话:</div>
								<div class="rightBox">{{ applyInfo.telephone }}</div>
							</li>

							<li>
								<div class="leftBox">注册地址:</div>
								<div class="rightBox">{{ wlbizScopeAddress }}</div>
							</li>

						</ul>
						<ul class="authenInfoBox">
							<li>
								<div class="leftBox">企业工商营业执照:</div>
								<div class="rightBox  rightBox2" @click="isshow">
									<img :src="applyInfo.businessLicenseUrl">
								</div>
								<div v-show="showis" class="rightBox_but" @click="isshow">
									<div>
										<img :src="applyInfo.businessLicenseUrl">
									</div>
								</div>

							</li>
						</ul>
					</div>
					<div v-if="corpType == 1 || corpType == 2 || corpType == 3 ">
						<ul class="authenInfoBox">
							<li>
								<!--<span class="Must">*</span>-->
								<div class="leftBox">企业类型:</div>
								<div class="rightBox">{{ applyInfo.corpType }}</div>
							</li>
							<li>
								<!--<span class="Must">*</span>-->
								<div class="leftBox">企业全称:</div>
								<div class="rightBox">{{ applyInfo.name }}</div>
							</li>
							<li>
								<div class="leftBox">统一社会信用代码:</div>
								<div class="rightBox">{{ applyInfo.businessNum}}</div>
							</li>

							<li>
								<div class="leftBox">注册地址:</div>
								<div class="rightBox">{{ applyInfo.registeredAddress }}</div>
							</li>
							<li>
								<div class="leftBox">经营地址:</div>
								<div class="rightBox">{{ applyInfo.bizScopeAddress }}</div>
							</li>
							<li>
								<div class="leftBox">法定代表人/企业负责人姓名:</div>
								<div class="rightBox">{{ applyInfo.legalPerson }}</div>
							</li>
							<li>
								<div class="leftBox">经营模式:</div>
								<div class="rightBox">{{ applyInfo.legalPerson }}</div>
							</li>

							<li>
								<div class="leftBox">企业性质:</div>
								<div class="rightBox">{{ applyInfo.selected}}</div>
							</li>
							<li>
								<div class="leftBox">企业规模:</div>
								<div class="rightBox">{{ applyInfo.selected2}}</div>
							</li>
							<li>
								<div class="leftBox">年营业额（单位：元）:</div>
								<div class="rightBox">{{ applyInfo.selected3}}</div>
							</li>
							<li>
								<div class="leftBox">经营范围（一般经营范围）:</div>
								<div class="rightBox_t">{{ applyInfo.bizScope}}</div>
							</li>
						</ul>
						<ul class="authenInfoBox">
							<li>
								<div class="leftBox">企业工商营业执照:</div>
								<div class="rightBox  rightBox2" @click="isshow">
									<img :src="applyInfo.businessLicenseUrl">
								</div>

							</li>
						</ul>
					</div>

					<!--<ul class="authenInfoBox">
						<li>
							<div class="leftBox">公司logo:</div>
							<div class="rightBox  rightBox2" @click="isshow">
								<img :src="applyInfo.logoUrl">
							</div>
							<div v-show="showis" class="rightBox_but" @click="isshow">
								<div>
									<img :src="applyInfo.logoUrl">
								</div>
							</div>
						</li>
					</ul>-->
				</div>
			</div>
			<div class="btn-bot">
                <button class="btn-save" @click="handleAgree('formValidate')">审核通过</button>
                <button class="btn-del" @click="handleDisagree('formValidate')" >审核不通过</button>
                <button class="btn-return" @click="back" >返回</button>
			</div>

		</div>
		<!--<div v-cloak v-show="status == '5' || status == '2'">-->
		<!--<div @click="show = !show" class="btnFlex">
				<Icon class="icon animated fadeIn" type="arrow-down-b" v-show="!show"></Icon><Icon class="icon animated fadeIn" type="arrow-right-b" v-show="show"></Icon>附件
			</div>-->
		<!--<div v-if="show" class="authenInfoPanel" style="">-->
		<!--<h4>企业业务资料</h4>-->
		<!--<ul class="authenInfoBox">
						<li>
							<div class="leftBox">公司类型：</div>
							<div class="rightBox" >{{ applyInfo.corpType }}</div>
						</li>
						<li>
							<div class="leftBox">企业全称：</div>
							<div class="rightBox">{{ applyInfo.name }}</div>
						</li>
						<li>
							<div class="leftBox">组织机构代码：</div>
							<div class="rightBox">{{ applyInfo.orgCode }}</div>
						</li>
						<li>
							<div class="leftBox">工商执照注册号：</div>
							<div class="rightBox">{{ applyInfo.uscc}}</div>
						</li>
						<li>
							<div class="leftBox">实际经营地址：</div>
							<div class="rightBox">{{ applyInfo.countyFullName }}</div>
						</li>
						<li>
							<div class="leftBox">法定代表人/企业负责人姓名：</div>
							<div class="rightBox">{{ applyInfo.leader }}</div>
						</li>
						<li>
							<div class="leftBox">经营范围(一般经营范围)：</div>
							<div class="rightBox">{{ applyInfo.bizScope }}</div>
						</li>
						<li>
							<div class="leftBox">经营范围(前置许可经营范围)：</div>
							<div class="rightBox">{{ applyInfo.preBizScope }}</div>
						</li>
						<li>
							<div class="leftBox">企业规模：</div>
							<div class="rightBox">{{ applyInfo.enterpriseSize }}</div>
						</li>
					</ul>-->
		<!--<h4>企业开票信息</h4>-->
		<!--<ul class="authenInfoBox">
						<li>
							<div class="leftBox">发票抬头：</div>
							<div class="rightBox">{{ applyInfo.invoiceTitle }}</div>
						</li>
						<li>
							<div class="leftBox">注册地址：</div>
							<div class="rightBox">{{ applyInfo.registeredAddress }}</div>
						</li>
						<li>
							<div class="leftBox">税号：</div>
							<div class="rightBox">{{ applyInfo.taxNumber }}</div>
						</li>
						<li>
							<div class="leftBox">电话号码：</div>
							<div class="rightBox">{{ applyInfo.telephone }}</div>
						</li>
						<li>
							<div class="leftBox">企业开户银行：</div>
							<div class="rightBox">{{ applyInfo.bankName }}</div>
						</li>
						<li>
							<div class="leftBox">企业银行帐号：</div>
							<div class="rightBox">{{ applyInfo.bankAccount }}</div>
						</li>
					</ul>-->
		<!--<h4>企业基本资料</h4>-->
		<!--<ul class="authenInfoBox">
						<li>
							<div class="leftBox">组织机构代码证：</div>
							<div class="rightBox"><img :src="applyInfo.imgOrgCode"></div>
						</li>
						<li>
							<div class="leftBox">企业工商营业执照：</div>
							<div class="rightBox"><img :src="applyInfo.imgBizLicense"></div>
						</li>
					</ul>-->
		<!--</div>-->
		<!--</transition>-->
		<!--</div>-->
		<div v-show="showis" class="rightBox_but" @click="isshow">
			<div>
				<img :src="applyInfo.businessLicenseUrl">
			</div>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>

<script>
	import animate from 'animate.css'
	import tis from '@/page/set/tishisub.vue'
	import api from '@/api/api'
	export default {
		components: {
			tis: tis
		},

		data() {
			return {
				social: [],
				re_do: '',
				do_yn: false,
				do_no: false,

				show: false,
				corpType: '', //类型
				showis: false,
				fruit: [],
				ig: 1,
				//lists1:	'企业名称填写有误',
				lists1: '企业名称填写有误',
				lists2: '统一社会信用代码填写有误',
				lists3: '注册地址填写有误',
				lists4: '经营地址填写有误',
				lists5: '法定代表人/ 企业负责人姓名填写有误',
				lists6: '企业性质选择有误',
				lists7: '年营业额选择有误',
				lists8: '企业规模选择有误',
				lists9: '企业营业执照上传有误',

				lists: [
					'企业名称填写有误',
					'统一社会信用代码填写有误',
					'注册地址填写有误',
					'经营地址填写有误',
					'法定代表人/ 企业负责人姓名填写有误',
					'企业性质选择有误',
					'年营业额选择有误',
					'企业规模选择有误',
					'企业营业执照上传有误',
				],
				formValidate: {
					auditedContent: ''
				},
				ruleValidate: {
					auditedContent: [{
						required: true,
						message: '审核内容不能为空',
						trigger: 'blur'
					}]
				},
				status: 0,
				applyInfo: {},
				opinion: 7,
				companyId: '',
				//				authenticationAuditDetail
				wlbizScopeAddress: '',
			}
		},
		methods: {
			isshow() {
				let _this = this;
				_this.showis = !_this.showis;

			},
//			instance(type, message) {
//				let _this = this;
//				const title = 'Title';
//				const content = '<p>' + message + '</p>';
//				switch(type) {
//					case 'pass':
//						this.$Modal.success({
//							content: "同意通过！",
//
//						});
//						break;
//					case 'error':
//						this.$Modal.error({
//							content: content
//						});
//						break;
//					case 'loss':
//						this.$Modal.error({
//							content: "不同意通过！"
//							
//						});
//							
//					
//					
//				}
//
//			},
			handleAgree(name) {
				const _this = this;
				_this.opinion = 9;
				_this.$refs[name].validate((valid) => {
					if(valid) {
						var auditingInfo = {
							corpID: _this.companyId,
							content: _this.formValidate.auditedContent,

							result: _this.opinion
						}
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.auditing,
								data: api.convertParam(auditingInfo)
							})
							.then(function(res) {
								if(res.data.status == 1) {
//									_this.instance("pass",res.data.message);
									_this.do_yn = true;
									_this.re_do = '审核意见提交成功';
									setTimeout(() => {
										_this.do_yn = false;
										
										_this.$router.push({
											path: '/sys/corp/list'
										})
									}, 2000);
//									this.$Message.success('审核成功!');
								
								
								} else {
									//          	_this.do_no = true;
									_this.re_do = '提交失败!';
									setTimeout(() => {
										_this.do_no = false;
//										_this.instance("error", res.data.message);

										_this.$router.push({
											path: '/sys/corp/list'
										})
									}, 2000);
//									this.$Message.error('提交失败!');

								}
							})
							.catch(function(error) {
								console.log(error);
							});
						//	this.$Message.success('审核成功!');
						_this.do_yn = true;
						_this.re_do = "审核成功!";
						setTimeout(() => {
							_this.do_yn = false;

						}, 2000);

					} else {
						//						this.$Message.error('提交失败!');
						_this.do_no = true;
						_this.re_do = '提交失败!';
						setTimeout(() => {
							_this.do_no = false;

						}, 2000);

					}
				})
			},

			handleDisagree(name) {
				console.log(this.social);
				const _this = this;
				//			      let items={}
				//			      items.lists1 = _this.lists1;
				//				  items.lists2 = _this.lists2;
				//				  items.lists3 = _this.lists3;
				//				  items.lists4 = _this.lists4;
				//				  items.lists5 = _this.lists5;
				//				  items.lists6 = _this.lists6;
				//				  items.lists7 = _this.lists7;
				//				  items.lists8 = _this.lists8;
				//				  items.lists9 = _this.lists9;

				//				    if(this.social.indexOf("企业名称填写有误")>=0){
				//				    	alert("1");
				//				    }
				//				    if(this.social.indexOf("统一社会信用代码填写有误")>=0){
				//				    	alert("2");
				//				    }
				//				    if(this.social.indexOf("经营地址填写有误")>=0){
				//				    	alert("3");
				//				    }
				//				    if(this.social.indexOf("注册地址填写有误")>=0){
				//				    	alert("4");
				//				    }
				//				    if(this.social.indexOf("法定代表人/ 企业负责人姓名填写有误")>=0){
				//				    	alert("5");
				//				    }
				//				    if(this.social.indexOf("企业性质选择有误")>=0){
				//				    	alert("6");
				//				    }
				//				     if(this.social.indexOf("年营业额选择有误")>=0){
				//				    	alert("6");
				//				    }
				//				      if(this.social.indexOf("经营范围（一般经营范围）填写有误")>=0){
				//				    	alert("6");
				//				    }
				//				       if(this.social.indexOf("企业营业执照上传有误")>=0){
				//				    	alert("6");
				//				    }
				//			
				this.$refs[name].validate((valid) => {
					if(valid) {

						_this.$refs[name].validate((valid) => {
							if(valid) {

								var auditingInfo = {
									corpID: _this.companyId,
									content: _this.formValidate.auditedContent,
									result: _this.opinion,
									auditItems: _this.social
								}
//								console.log("loss", auditingInfo.auditItems);
								_this.axios({
										method: 'post',
										header: {
											"Content-Type": 'application/x-www-form-urlencoded'
										},
										url: api.auditing,
										data: api.convertParam(auditingInfo)
									})
									.then(function(res) {
										if(res.data.status == 1) {
//											_this.instance("loss", res.data.message);
											_this.do_yn = true;
											_this.re_do = "审核意见提交成功";
											setTimeout(() => {
													_this.do_yn = false;
												_this.$router.push({
													path: '/sys/corp/list'
												})
											}, 2000);

										} else {
//											_this.instance("error", res.data.message);

											setTimeout(() => {
												_this.$router.push({
													path: '/sys/corp/list'
												})
											}, 2000);
										}
									})
									.catch(function(error) {
										console.log(error);
									});
								//		                        this.$Message.success('审核成功!');
							} else {
								_this.do_no = true;
								_this.re_do = '提交失败!';
								setTimeout(() => {
									_this.do_no = false;

								}, 2000);

								//this.$Message.error('提交失败!');
							}
						})
						//                        this.$Message.success('审核成功!');
					} else {
						_this.do_no = true;
								_this.re_do = '提交失败!';
								setTimeout(() => {
									_this.do_no = false;

								}, 2000);
						//this.$Message.error('提交失败!');
					}
				})
			},
			back(){
				let _this=this;
				_this.$router.push({
					path: '/sys/corp/list'
				})
			}
		},
		created() {
			const _this = this;
			let companyId = this.$route.query.companyId;
			var url = api.save_queryAuthentication + companyId + api.queryAuthentication;
			this.axios(url)
				.then(function(res) {
					var datas = res.data.datas;
					_this.status = datas.status;
					_this.corpType = datas.corpType;
					switch(_this.corpType) { //生产类型
						case 1:
							_this.applyInfo.corpType = "生产型";
							break;
						case 2:
							_this.applyInfo.corpType = "贸易型";
							break;
						case 3:
							_this.applyInfo.corpType = "生产+贸易型";
							break;
						case 4:
							_this.applyInfo.corpType = "物流商（个人）";
							break;
						default:
							_this.applyInfo.corpType = "物流商";
							break;

					}
					_this.companyId = datas.id; //全称
					_this.applyInfo.name = datas.name; //全称
					_this.applyInfo.businessNum = datas.usci; //统一社会信用代码不能超过50位
					_this.applyInfo.registeredAddress = datas.registeredProvinceName + datas.registeredCityName + datas.registeredCountyName + datas.registeredAddress; //注册地址
					_this.applyInfo.bizScopeAddress = datas.provinceName + datas.cityName + datas.countyName + datas.address;
					_this.applyInfo.legalPerson = datas.legalPerson; //法定代表人/企业负责人姓名1
					_this.applyInfo.bizScope = datas.bizScope; //经营范围(一般经营范围)1
					_this.applyInfo.selected = datas.enterpriseNature; //企业性质不能超过50位
					_this.applyInfo.selected2 = datas.enterpriseSize; //企业规模不能超过50位
					_this.applyInfo.selected3 = datas.yearTurnover; //年营业额不能超过50位
					_this.applyInfo.businessLicenseUrl = datas.imgBizLicense; //企业工商营业执照不能超过500位
					_this.applyInfo.authenticationAuditContent = datas.authenticationAuditContent; //企业工商营业执照不能超过500位
					_this.wlbizScopeAddress = datas.provinceName + datas.cityName + datas.countyName + datas.address;
					_this.applyInfo.telephone = datas.telephone;

				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
</script>
<style type="text/css">
	textarea.ivu-input {
		height: 70px!important;
	}
	
	.fromItemBox .ivu-checkbox {
		margin-right: 15px!important;
	}
</style>
<style scoped>
	.audit_box .ivu-input {
		height: 95px!important;
	}
	
	.audit_box .textar {
		border: 1px solid #dddee1;
		border-radius: 4px;
	}
	
	.aaa {
		margin-bottom: 10px;
	}
	
	.fromItemBox {
		width: 99%;
	}
	/*h3 {
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
	}*/
	
	h4 {
		font-size: 15px;
		padding-left: 15px;
		color: #415161;
		border-left: 3px solid #ccd9e6;
	}
	
	.authenInfoBox {
		width: 80%;
		padding-left: 25px;
	}
	
	.authenInfoBox2 {
		width: 80%;
		padding-left: 25px;
	}
	
	.authenInfoBox {
		margin-top: 40px;
	}
	
	.authenInfoBox li {
		font-size: 14px;
		margin-bottom: 15px;
	}
	
	.authenInfoBox li:after {
		clear: both;
		content: " ";
		display: block;
		height: 0;
	}
	
	.authenInfoBox li .leftBox {
		float: left;
		width: 190px;
		text-align: right;
		font-size: 14px;
	}
	
	.authenInfoBox li .rightBox {
		float: left;
		width: 60%;
		text-align: left;
		border: none;
		margin: 0 0 0 15px;
		font-size: 14px;
	}
	
	.authenInfoBox li .rightBox2 {
		background: #fff;
		border: 1px solid #fff;
		padding-left: 10px;
	}
	
	.authenInfoBox li .rightBox2 img {
		width: 40%;
		cursor: pointer;
		transition: width 1s;
		-moz-transition: width 1s;
		/* Firefox 4 */
		-webkit-transition: width 1s;
		/* Safari and Chrome */
		-o-transition: width 1s;
		/* Opera */
	}
	
	[v-cloak] {
		display: none
	}
	
	.btnFlex {
		font-size: 16px;
		/*font-weight: bold;*/
		padding-left: 20px;
		cursor: pointer;
	}
	
	.btnFlex .icon {
		margin-right: 8px;
		font-weight: bold;
		font-size: 18px;
	}
	
	.Checkbox {
		width: 32%;
		margin-top: 15px;
	}
	
	.rightBox_t {
		font-size: 14px;
		float: left;
		width: 60%;
		text-align: left;
		border: none;
		margin: 0 0 0 10px;
	}

	.rightBox_but {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
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
	
	.rhw {
		position: absolute;
		z-index: 100;
		top: 20px!important;
		left: 2px;
		right: 2px;
		bottom: 80px;
		overflow-y: scroll;
		padding: 20px;
		padding-top: 0;
		padding-bottom: 156px;
	}
	
	.list {
		margin-top: 15px;
	}
</style>