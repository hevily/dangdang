<template>
	<div class="authenBox">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">公司认证信息</span></Breadcrumb-item>
			<div class="Bread_ri">
				<div>
					<img src="../../../assets/img/wwj_t.png" alt="" />
					<span>配置</span>
				</div>
				<div>
					<img src="../../../assets/img/wjj_m.png" alt="" />
					<span>帮助</span>
				</div>
			</div>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<div v-if="(status == 0 || status == 2) || (status == 2 && corpType == 5)">

				<div class="autedStatusBox">
					<div v-if="status == 2" class="status5">
						<h2 class="status5_ri">
						<img src="../../../assets/img/btg_1.png" />
						    <div class="ps_span">
						    	<span class="status5_span">认证资料审核不通过！<br /><span class="h_span">（智谷王提醒您，认证资料有误，请重新认证！）</span></span>
						    </div>
								</h2>
						<!--<div class="status5_print">
							<img src="../../../assets/img/btg.png" />
						</div>-->
						<!--<span class="statusText">验证状态</span>-->
						<!--	<span class="iconRed renzhengspan">认证未通过</span><Icon type="information-circled"></Icon>-->
						<!--	<Button type="success" class="btnApply" @click="apply">修改信息</Button>-->
					</div>
					<div v-if="status == 0" style="padding: 0 0 10px 0;display: flex;display: -webkit-flex;align-items: flex-end;">
						<span class="statusText">验证状态</span>
						<span class="renzhengspan">未认证</span>
						<!--<Icon type="information-circled" class="iconRed"></Icon>-->
						<Button type="success" class="btnApply" @click="apply">去认证</Button>
					</div>
				</div>
				<!-- 状态为2时表示未通过，显示下面的信息 -->
				<div v-show="status == 2 && corpType == 5">
					<div>
						<ul class="authenInfoBox">
							<li>
								<div class="leftBox">企业类型：</div>
								<div class="rightBox">{{ applyInfo.corpType }} </div>
							</li>
							<li>
								<div class="leftBox">企业全称：</div>
								<div class="rightBox">{{ applyInfo.companyName }}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.a != ''"><img src="../../../assets/img/iocn_ji.png" /></div>
									{{auditItems.a}}
								</div>
							</li>
							<li>
								<div class="leftBox">统一社会信用代码：</div>
								<div class="rightBox">{{ applyInfo.businessNum}}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.b != ''"><img src="../../../assets/img/iocn_ji.png" /></div>
									{{auditItems.b}}
								</div>
							</li>
							<li>
								<div class="leftBox">法定代表人/企业负责人姓名：</div>
								<div class="rightBox">{{ applyInfo.legalPerson }}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.e != ''"><img src="../../../assets/img/iocn_ji.png" /></div>
									{{auditItems.e}}
								</div>
							</li>
							<li>
								<div class="leftBox">手机号码：</div>
								<div class="rightBox">{{ applyInfo.telephone}}</div>
							</li>
							<li>
								<div class="leftBox">座机号码：</div>
								<div class="rightBox">{{ applyInfo.telephone}}</div>
							</li>
							<li>
								<div class="leftBox">注册地址：</div>
								<div class="rightBox">{{ auditItems.bizScopeAddress }}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.c != ''"><img src="../../../assets/img/iocn_ji.png" /></div>
									{{auditItems.c}}
								</div>
							</li>
						</ul>
						<ul class="authenInfoBox">
							<li>
								<div class="leftBox">企业工商营业执照：</div>
								<div class="rightBox ul_img" @click="isshow">
									<img :src="applyInfo.businessLicenseUrl">
								</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.i != ''"><img src="../../../assets/img/iocn_ji.png" /></div>
									{{auditItems.i}}
								</div>
							</li>
						</ul>
						<div class="li_fa">
							<div class="li_fali" style="color: #de5454;">其他审核意见：</div>
							<div class="li_fari">{{ applyInfo.authenticationAuditContent}}</div>
						</div>
					</div>
				</div>
				<!--status == 2 && (corpType == 1 || corpType == 2 || corpType == 3)"-->
				<div v-show="status == 2 && (corpType == 1 || corpType == 2 || corpType == 3)">
					<div>
						<ul class="authenInfoBox">
							<li>
								<div class="leftBox">企业类型：</div>
								<div class="rightBox">{{ applyInfo.corpType }} </div>

							</li>
							<li>
								<div class="leftBox">企业全称：</div>
								<div class="rightBox">{{ applyInfo.companyName }}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.a != ''">
										<img src="../../../assets/img/iocn_ji.png" />
									</div>
									{{auditItems.a}}
								</div>
							</li>
							<li>
								<div class="leftBox">统一社会信用代码：</div>
								<div class="rightBox">{{ applyInfo.businessNum}}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.b != ''">
										<img src="../../../assets/img/iocn_ji.png" />
									</div>
									{{auditItems.b}}
								</div>
							</li>
							<li>
								<div class="leftBox">注册地址：</div>
								<div class="rightBox">{{ applyInfo.registeredAddress }}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.d != ''"> 
										<img src="../../../assets/img/iocn_ji.png" />
									</div>
									{{auditItems.d}}
								</div>
							</li>
							<li>
								<div class="leftBox">经营地址：</div>
								<div class="rightBox">{{ applyInfo.bizScopeAddress }}</div>
								<div class="rightBox_iocn">

									<div class="img_iocn" v-if="auditItems.c != ''">
										<img src="../../../assets/img/iocn_ji.png" />
									</div>
									{{auditItems.c}}
								</div>
							</li>
							<li>
								<div class="leftBox">法定代表人/企业负责人姓名：</div>
								<div class="rightBox">{{ applyInfo.legalPerson }}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.e != ''">
										<img src="../../../assets/img/iocn_ji.png" />
									</div>
									{{auditItems.e}}
								</div>
							</li>
							<li>
								<div class="leftBox">企业性质：</div>
								<div class="rightBox">{{ applyInfo.selected }}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.f != ''">
										<img src="../../../assets/img/iocn_ji.png" />
									</div>
									{{auditItems.f}}
								</div>
							</li>
							<li>
								<div class="leftBox">企业规模：</div>
								<div class="rightBox">{{ applyInfo.selected2 }}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.h != ''">
										<img src="../../../assets/img/iocn_ji.png" />
									</div>
									{{auditItems.h}}
								</div>
							</li>
							<li>
								<div class="leftBox">年营业额：（单位：元）</div>
								<div class="rightBox">{{ applyInfo.selected3 }}</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.g != ''">
										<img src="../../../assets/img/iocn_ji.png" />
									</div>
									{{auditItems.g}}
								</div>
							</li>
						</ul>
						<ul class="authenInfoBox">
							<li>
								<div class="leftBox">企业工商营业执照：</div>
								<div class="rightBox ul_img" @click="isshow">
									<img :src="applyInfo.businessLicenseUrl">
								</div>
								<div v-show="showis" class="rightBox_but" @click="isshow">
									<div>
										<img :src="applyInfo.businessLicenseUrl">
									</div>
								</div>
								<div class="rightBox_iocn">
									<div class="img_iocn" v-if="auditItems.i != ''">
										<img src="../../../assets/img/iocn_ji.png" />
									</div>
									{{auditItems.i}}
								</div>
							</li>
						</ul>
					</div>
					<div class="li_fa">
						<div class="li_fali" style="color: #de5454;">其他审核意见：</div>
						<div class="li_fari">{{ applyInfo.authenticationAuditContent}}</div>
					</div>
				</div>
				<!-- 状态为0时表示未认证，显示下面的信息 -->
				<div v-show="status == 0" class="introduceBox_b">
					<h3>说明</h3>
					<ul class="introduceBox">
						<li>
							智谷科技企业云平台资质认证提供更安全、更严格的真实性认证、也能够更好的保护企业及用户的合法权益
						</li>
						<li>
							资质认证通过后，智谷科技企业云平台帐号下的应用，将获得供应商、采购等高级能力
						</li>
						<li>
							认证有效期：一年，有效期最后三个月可申请年审即可续期
						</li>
					</ul>
				</div>
			</div>
			<!-- 若status为5 或 1 时，则显示提交的材料  1通过  5审核中 -->
			<div v-else-if="(status == 5 || status == 1 || status == 7) || ((status == 5 && corpType == 5) || (status == 1 && corpType == 5))  ">
				<h2 v-show="status == 5" class="status5">
					<h2 class="status5_ri" >
						<img src="../../../assets/img/tg_1.png"/>
                        <div class="ps_span">
                            <span class="status5_span">智谷王正在审核中……<br /><span class="ing_span">（您的资料已经提交成功，我们将在3-7个工作日内完成审核，请您耐心等待！）</span></span>
                        </div>
					</h2>
				</h2>
				<h2 v-show="status == 7" class="status5"> 
					<h2 class="status5_ri" >
						<img src="../../../assets/img/btg_1.png"/>
                        <div class="ps_span">
                            <span class="status5_span">帐号已冻结……<br /><span class="ing_span">（智谷王提醒您：您帐号已冻结）</span></span>
                        </div>
					</h2>
				</h2>
				<h2 class="" v-show="status == 1" class="status5" style="justify-content: space-between;">
					<h2 class="status5_ri">
						<img src="../../../assets/img/dtg_1.png"/>
                        <div class="ps_span">
                            <span class="status5_span">企业已认证！<br /><span class="ok_span">（智谷王提醒您，后期资料有所改动，请及时重新认证！）</span></span>
                        </div>
					</h2>
				<div class="status5_print">
					<img src="../../../assets/img/tg.png" />
				</div>
				<!--<Button type="success" class="btnApply" @click="apply">重新认证</Button>-->
				</h2>
				<div v-show="(status == 5 && (corpType == 1 || corpType == 2 || corpType == 3)) || (status == 1 && (corpType == 1 || corpType == 2 || corpType == 3) ) || (status == 7 && (corpType == 1 || corpType == 2 || corpType == 3) )  ">
					<ul class="authenInfoBox">
						<li>
							<div class="leftBox">企业类型：</div>
							<div class="rightBox">{{ applyInfo.corpType }} </div>
						</li>
						<li>
							<div class="leftBox">企业全称：</div>
							<div class="rightBox">{{ applyInfo.companyName }}</div>
						</li>
						<li>
							<div class="leftBox">统一社会信用代码：</div>
							<div class="rightBox">{{ applyInfo.businessNum}}</div>
						</li>
						<li>
							<div class="leftBox">注册地址：</div>
							<div class="rightBox">{{ applyInfo.registeredAddress }}</div>
						</li>
						<li>
							<div class="leftBox">经营地址：</div>
							<div class="rightBox">{{ applyInfo.bizScopeAddress }}</div>
						</li>

						<li>
							<div class="leftBox">法定代表人/企业负责人姓名：</div>
							<div class="rightBox">{{ applyInfo.legalPerson }}</div>
						</li>
						<li>
							<div class="leftBox">企业性质：</div>
							<div class="rightBox">{{ applyInfo.selected }}</div>
						</li>
						<li>
							<div class="leftBox">企业规模：</div>
							<div class="rightBox">{{ applyInfo.selected2 }}</div>
						</li>
						<li>
							<div class="leftBox">年营业额：（单位：元）</div>
							<div class="rightBox">{{ applyInfo.selected3 }}</div>
						</li>
						<li>
							<div class="leftBox">经营范围：</div>
							<div class="rightBox">{{ applyInfo.bizScope }}</div>
						</li>
					</ul>
					<ul class="authenInfoBox">
						<li>
							<div class="leftBox">企业工商营业执照：</div>
							<div class="rightBox ul_img" @click="isshow">
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
				<div v-show="((status == 5 && corpType == 5) || (status == 1 && corpType == 5) || (status == 7 && corpType == 5)) ">
					<ul class="authenInfoBox">
						<li>
							<div class="leftBox">企业类型：</div>
							<div class="rightBox">{{ applyInfo.corpType }} </div>
						</li>
						<li>
							<div class="leftBox">企业全称：</div>
							<div class="rightBox">{{ applyInfo.companyName }}</div>
						</li>
						<li>
							<div class="leftBox">统一社会信用代码：</div>
							<div class="rightBox">{{ applyInfo.businessNum}}</div>
						</li>
						<li>
							<div class="leftBox">手机号码：</div>
							<div class="rightBox">{{ applyInfo.telephone}}</div>
						</li>
						<li>
							<div class="leftBox">座机号码：</div>
							<div class="rightBox">{{ applyInfo.telephone}}</div>
						</li>
						<li>
							<div class="leftBox">法定代表人/企业负责人姓名：</div>
							<div class="rightBox">{{ applyInfo.legalPerson }}</div>
						</li>
						<li>
							<div class="leftBox">注册地址：</div>
							<div class="rightBox">{{auditItems.bizScopeAddress }}</div>
						</li>
					</ul>
					<ul class="authenInfoBox">
						<li>
							<div class="leftBox">企业工商营业执照：</div>
							<div class="rightBox ul_img" @click="isshow">
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
			</div>
		</div>
		<div class="btn-bot" v-show="status == 1 ||  status == 2">
			<button v-show="status == 1" class="btn-save" type="info" size="large" long @click='apply'>重新认证</button>
			<button v-show="status == 2" class="btn-save" type="info" size="large" long @click='apply'>重新认证</button>
		</div>
		<div v-show="showis" class="rightBox_but" @click="isshow">
			<div>
				<img :src="applyInfo.businessLicenseUrl">
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				authStatus: false,
				status: null,
				applyInfo: {},
				corpType: null,
				showis: false,
				imgshow: false,
				auditItems: {
					a: '',
					b: '',
					c: '',
					d: '',
					e: '',
					f: '',
					g: '',
					h: '',
					i: '',
					bizScopeAddress: '',
				}
			}
		},
		methods: {
			isshow() {
				this.showis = !this.showis;
			},
			apply() {
				this.$router.push({path: '/sys/corp/apply'});
			}
		},
		mounted() {
			const _this = this;
			const corp = JSON.parse(window.localStorage.getItem('corp')); //将缓存字符串转为json对象
			var registerInfoUrl = api.save_queryAuthentication + corp.id + api.queryAuthentication;
			_this.axios(registerInfoUrl)
				.then(function(res) {
					_this.status = res.data.datas.status;
					_this.corpType = res.data.datas.corpType;
					let datas = res.data.datas;
					if(_this.status != 0) {
						//_this.applyInfo.
						switch(datas.corpType) { //生产类型
							case '1':
								_this.applyInfo.corpType = "生产型";
								break;
							case '2':
								_this.applyInfo.corpType = "贸易型";
								break;
							case '3':
								//							default:
								_this.applyInfo.corpType = "生产+贸易型";
								break;
							case '4':
								//									default:
								_this.applyInfo.corpType = "物流商（个人）";
								break;
								//								case '5'
							default:
								_this.applyInfo.corpType = "物流商";
								break;
						}
						let applyInfo = {};
						//applyInfo.corpType = datas.corpType; //类型
						_this.applyInfo.companyName = datas.name; //企业全称
						_this.applyInfo.businessNum = datas.usci; //统一社会信用代码不能超过50位
						_this.applyInfo.registeredAddress = datas.registeredProvinceName + datas.registeredCityName + datas.registeredCountyName + datas.registeredAddress; //注册地址
						_this.applyInfo.legalPerson = datas.legalPerson; //法定代表人/企业负责人姓名1
						_this.applyInfo.bizScopeAddress = datas.provinceName + datas.cityName + datas.countyName + datas.address; //经营范围(一般经营范围)1
						_this.applyInfo.bizScope = datas.bizScope;
						_this.applyInfo.selected = datas.enterpriseNature; //企业性质不能超过50位
						_this.applyInfo.selected2 = datas.enterpriseSize; //企业规模不能超过50位
						_this.applyInfo.selected3 = datas.yearTurnover; //年营业额不能超过50位
						_this.applyInfo.telephone = datas.telephone; //电话
						_this.applyInfo.businessLicenseUrl = datas.imgBizLicense; //企业工商营业执照不能超过500位
						_this.applyInfo.authenticationAuditContent = datas.authenticationAuditContent; //企业工商营业执照不能超过500位
						_this.auditItems.bizScopeAddress = datas.provinceName + datas.cityName + datas.countyName + datas.address; //物流
						//						_this.auditItems.
						if(datas.auditItems.indexOf("企业名称填写有误") >= 0) {
							//				    	alert("qq")
							_this.auditItems.a = '企业名称填写有误';
							//				    	if(_this.auditItems.a == '企业名称填写有误'){
							//				    		_this.imgshow = true
							//				    	}else{
							//				    		_this.imgshow = false
							//				    	}

						}
						if(datas.auditItems.indexOf("统一社会信用代码填写有误") >= 0) {
							_this.auditItems.b = '统一社会信用代码填写有误';
							//				    	if(_this.auditItems.b == '统一社会信用代码填写有误'){
							//				    		_this.imgshow = true
							//				    	}else{
							//				    		_this.imgshow = false
							//				    	}
						}
						if(datas.auditItems.indexOf("经营地址填写有误") >= 0) {
							_this.auditItems.c = '经营地址填写有误';
							//				    	if(_this.auditItems.c == ''){
							//				    		_this.imgshow = true
							//				    	}else{
							//				    		
							//				    	}
						}
						if(datas.auditItems.indexOf("注册地址填写有误") >= 0) {
							_this.auditItems.d = '注册地址填写有误';
							//				   		 if(_this.auditItems.d == ''){
							//				    		_this.imgshow = true
							//				    	}else{
							//				    		
							//				    	}
						}
						if(datas.auditItems.indexOf("法定代表人/ 企业负责人姓名填写有误") >= 0) {
							_this.auditItems.e = '法定代表人/ 企业负责人姓名填写有误';
							//				    	if(_this.auditItems.e == datas.auditItems){
							//				    		_this.imgshow = true
							//				    	}else{
							//				    			_this.imgshow = false
							//				    	}
						}
						if(datas.auditItems.indexOf("企业性质选择有误") >= 0) {
							_this.auditItems.f = '企业性质选择有误';
							//				    	if(_this.auditItems.f == '企业性质选择有误'){
							//				    		_this.imgshow = true
							//				    	}else{
							//				    		
							//				    	}
						}
						if(datas.auditItems.indexOf("年营业额选择有误") >= 0) {
							_this.auditItems.g = '年营业额选择有误';
							//				    	if(_this.auditItems.g == ''){
							//				    		_this.imgshow = true
							//				    	}
							//				    	else{
							//				    		
							//				    	}
						}
						if(datas.auditItems.indexOf("企业规模选择有误") >= 0) {
							_this.auditItems.h = '企业规模选择有误';
							//				    	if(_this.auditItems.h == ''){
							//				    		_this.imgshow = true
							//				    	}
							//				    	else{
							//				    		
							//				    	}
						}
						if(datas.auditItems.indexOf("企业营业执照上传有误") >= 0) {
							_this.auditItems.i = '企业营业执照上传有误';
							//				    	if(_this.auditItems.i == ''){
							//				    		_this.imgshow = true
							//				    	}else{
							//				    		
							//				    	}
						}

					}
				})
				.catch(function(error) {
					console.log(error);
				});

		}
	}
</script>

<style scoped>
	.btnApply {
		width: 100px;
		height: 3px;
		margin-right: 40px;
		font-size: 18px;
		background-color: #faa600;
		border-color: #faa600;
	}
	
	.btnApply:hover {
		background-color: #28b5d6;
		border-color: #28b5d6;
	}
	
	.iconRed {
		color: red;
	}
	
	.link_span {
		font-weight: normal;
	}
	
	.ok_link {
		color: #6e8093;
	}
	
	.auteed {
		color: #19be6b;
	}
	
	.autedStatusBox {
		font-size: 16px;
		border-bottom: 1px solid #e9eaec;
	}
	
	.autedStatusBox .statusText {
		padding-right: 48px;
		font-size: 20px;
		color: #0099cc;
	}
	
	.autedStatusBox .renzhengspan {
		font-size: 20px;
	}
	
	.autedStatusBox .btnApply {
		margin-left: 100px;
		background-color: #0099cc;
		border-color: #0099cc;
		font-size: 18px;
		width: 100px;
		height: 38px;
	}
	
	.autedStatusBox .btnApply:hover {
		margin-left: 100px;
		background-color: #28b5d6;
		border-color: #28b5d6;
		font-size: 18px;
		width: 100px;
		height: 38px;
	}
	
	h3 {
		font-size: 14px;
		padding: 35px 10px 10px;
	}
	
	.introduceBox_b {
		margin: 20px 0;
		padding: 10px;
		background: #f2ffea;
		border: 1px solid #c7ddb9;
	}
	
	.introduceBox_b h3 {
		padding: 0 10px;
		color: #009900;
	}
	
	.introduceBox {
		padding: 0 10px;
		margin-left: 20px;
		font-size: 14px;
	}
	
	.introduceBox li {
		list-style: disc;
		line-height: 30px;
		color: #009900;
	}
	
	.status5 {
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		border-bottom: 1px solid #ccd9e6;
	}
	
	h2 {
		/*认证中*/
		color: #fc8541;
		line-height: 24px;
	}
	
	.h_span, .ing_span,	.ok_span {
		font-size: 13px;
		color: #6e8093;
		margin-left: 70px;
		font-weight: 500;
	}
	
	.status5_ri {
		display: flex;
	}
	
	.status5_span {
		margin-left: 70px;
		color: #415161;
		font-size: 24px;
	}
	
	.status5_print {
		position: absolute;
		top: 150px;
		left: 500px;
		z-index: -1;
	}
	
	.authenInfoBox {
		width: 1000px;
		padding-left: 25px;
		font-weight: 500;
	}
	
	.authenInfoBox li {
		padding: 10px 0;
		font-size: 14px;
		display: flex;
	}
	
	.authenInfoBox li:after {
		clear: both;
		content: " ";
		display: block;
		height: 0;
	}
	
	.authenInfoBox li .leftBox {
		float: left;
		width: 400px;
		font-size: 14px;
		text-align: right;
		color: #415161;
	}
	
	.authenInfoBox li .rightBox {
		float: left;
		text-align: left;
		padding-left: 10px;
		color: #415161;
	}
	
	.authenInfoBox li .rightBox img {
		width: 100%;
		cursor: pointer;
		transition: width 1s;
		-moz-transition: width 1s;
		/* Firefox 4 */
		-webkit-transition: width 1s;
		/* Safari and Chrome */
		-o-transition: width 1s;
		/* Opera */
	}
	
	h4 {
		margin-bottom: 30px;
		border-bottom: 1px solid #ccd9e6;
	}
	
	h2 .redColor {
		color: red;
	}
	
	.ps_span {
		margin-top: 30px;
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
	
	.ul_img {
		width: 200px;
	}
	
	.rightBox_but {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2222;
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
	
	.li_fa {
		display: flex;
		height: 100px;
		padding: 20px 0 0 0;
		border-top: 1px dashed #ccd9e6;
		font-size: 14px;
	}
	
	.li_fali {
		text-align: right;
	}
	
	.li_fari {
		color: #415161;
	}
	
	.rightBox_iocn {
		display: flex;
		color: #eb4949;
		z-index: 2220;
	}
	
	.img_iocn {
		width: 18px;
		margin: 1px 8px 0 10px;
	}
	
	.img_iocn img {
		width: 18px;
	}
</style>