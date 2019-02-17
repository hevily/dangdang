<template>
	<div class="authenBox">
		<Breadcrumb style="padding-top: 10px;padding-bottom: 10px;">
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
					<span>配置</span>
				</div>
				<div>
					<img src="../../assets/img/wjj_m.png" alt="" />
					<span>帮助</span>
				</div>
			</div>
		</Breadcrumb>
		<div class="right_home_warp_box test-1">
			<div v-if="status == 0 || status == 2">
				<div class="autedStatusBox">
					<div v-if="status == 2" class="status5">

						<h2 class="status5_ri">
						<img src="../../assets/img/btg_1.png" />
						    <div class="ps_span">
						    	<span class="status5_span">认证资料审核不通过！<br /><span class="h_span">（{{ applyInfo.authenticationAuditContent }}）</span></span>
								
						    </div>
									
								</h2>
						<div class="status5_print">
							<img src="../../assets/img/btg.png" />
						</div>
						<!--<span class="statusText">验证状态</span>-->
						<!--	<span class="iconRed renzhengspan">认证未通过</span><Icon type="information-circled"></Icon>-->
						<Button type="success" class="btnApply" @click="apply">修改信息</Button>
					</div>
					<div v-if="status == 0" style="padding: 0 0 45px 0;display: flex;display: -webkit-flex;align-items: flex-end;">
						<span class="statusText">验证状态</span>
						<span class="renzhengspan">未认证</span>
						<!--<Icon type="information-circled" class="iconRed"></Icon>-->
						<Button type="success" class="btnApply" @click="apply">去认证</Button>
					</div>
				</div>
				<!-- 状态为2时表示未通过，显示下面的信息 -->
				<div v-show="status == 2">
					<h3>
					<ul class="authenInfoBox">
						<li>
							<div class="leftBox">公司类型：</div>
							<div class="rightBox">{{ applyInfo.corpType }}</div>
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
							<div class="rightBox">{{ applyInfo.selected3  }}</div>
						</li>
						<li>
							<div class="leftBox">经营范围(一般经营范围)：</div>
							<div class="rightBox">{{ applyInfo.bizScope }}</div>
						</li>
					</ul>
					<ul class="authenInfoBox">
					<li>
						<div class="leftBox">企业工商营业执照：</div>
						<div class="rightBox" @click="isshow">
							<img :src="applyInfo.businessLicenseUrl">
						</div>
						<div v-show="showis" class="rightBox_but" @click="isshow">
							<div>
								<img :src="applyInfo.businessLicenseUrl">
							</div>
						</div>		
					
					</li>
				</ul>
				</h3>
				</div>
				<!-- 状态为0时表示未认证，显示下面的信息 -->
				<div v-show="status == 0">
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
			<div v-else-if="status == 5 || status == 1 || status == 7">
				<h2 v-show="status == 5" class="status5">
					<h2 class="status5_ri" >
						<img src="../../assets/img/btg_1.png"/>
						    <div class="ps_span">
						    	<span class="status5_span">智谷王正在审核中……<br /><span class="ing_span">（您的资料已经提交成功，我们将在3-7个工作日内完成审核，请您耐心等待！）</span></span>
								
						    </div>
						
					</h2>
				</h2>
				<h2 v-show="status == 7" class="status5"> 
					<h2 class="status5_ri" >
						<img src="../../assets/img/btg_1.png"/>
						    <div class="ps_span">
						    	<span class="status5_span">帐号已冻结……<br /><span class="ing_span">（智谷王提醒您：您帐号已冻结）</span></span>
						    </div>
						
					</h2>
				</h2>
				<h2 class="" v-show="status == 1" class="status5" style="justify-content: space-between;">
					<h2 class="status5_ri">
						<img src="../../assets/img/tg_1.png"/>
						    <div class="ps_span">
						    	<span class="status5_span">企业已认证！<br /><span class="ok_span">（智谷王提醒您，后期资料有所改动，请及时重新认证！）</span></span>
						    </div>
						
					</h2>

				<div class="status5_print">
					<img src="../../assets/img/tg.png" />
				</div>
				<Button type="success" class="btnApply" @click="apply">重新认证</Button>
				</h2>
				<h4></h4>
				<ul class="authenInfoBox">
					<li>
						<div class="leftBox">公司类型：</div>
						<div class="rightBox">{{ applyInfo.corpType }}</div>
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
						<div class="leftBox">经营范围（一般经营范围）：</div>
						<div class="rightBox">{{ applyInfo.bizScope }}</div>
					</li>
				</ul>
				<ul class="authenInfoBox">
					<li>
						<div class="leftBox">企业工商营业执照：</div>
						<div class="rightBox" @click="isshow">
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
</template>

<script>
	import api from '@/api/api'
	export default {
		data() {
			return {
				authStatus: false,
				status: null,
				applyInfo: {},
				showis: false
			}
		},
		methods: {
			isshow() {
				let _this = this;
				_this.showis = !_this.showis;

			},
			apply() {
				this.$router.push({
					path: '/apply'
				});
			}
		},
		created() {

			const _this = this;
			const corp = JSON.parse(window.localStorage.getItem('corp')); //将缓存字符串转为json对象
			var registerInfoUrl = api.save_queryAuthentication + corp.id + api.queryAuthentication;
			_this.axios(registerInfoUrl)
				.then(function(res) {
					_this.status = res.data.datas.status;
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
							default:
								_this.applyInfo.corpType = "生产+贸易型";
								break;
						}
						let applyInfo = {};
						//						applyInfo.corpType = datas.corpType; //类型
						_this.applyInfo.companyName = datas.name; //企业全称
						_this.applyInfo.businessNum = datas.usci; //统一社会信用代码不能超过50位
						_this.applyInfo.registeredAddress = datas.registeredAddress; //注册地址
						_this.applyInfo.legalPerson = datas.legalPerson; //法定代表人/企业负责人姓名1
						_this.applyInfo.bizScope = datas.bizScope; //经营范围(一般经营范围)1
						_this.applyInfo.selected = datas.enterpriseNature; //企业性质不能超过50位
						_this.applyInfo.selected2 = datas.enterpriseSize; //企业规模不能超过50位
						_this.applyInfo.selected3 = datas.yearTurnover; //年营业额不能超过50位
						_this.applyInfo.businessLicenseUrl = datas.imgBizLicense; //企业工商营业执照不能超过500位
						_this.applyInfo.authenticationAuditContent = datas.authenticationAuditContent; //企业工商营业执照不能超过500位

					}
				})
				.catch(function(error) {
					console.log(error);
				});

		}
	}
</script>

<style scoped>
	.authenBox {
		position: absolute;
		top: 10px;
		bottom: 0;
		left: 10px;
		right: 30px;
	}
	
	.right_home_warp_box {
		width: 100%;
		padding: 0 20px 20px 20px;
		background-color: #fff;
		position: absolute;
		top: 45px;
		left: 2px;
		right: 30px;
		bottom: 10px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		overflow: hidden;
		overflow-y: scroll;
	}
	
	.btnApply {
		width: 129px;
		height: 46px;
		margin-top: 40px;
		margin-right: 40px;
		font-size: 18px;
		background-color: #faa600;
		border-color: #faa600;
	}
	
	.btnApply:hover {
		background-color: #ffb21a;
		border-color: #ffb21a;
	}
	
	.iconRed {
		color: red;
	}
	
	.link_span {
		font-weight: normal;
	}
	
	.ok_link {
		color: #4e9bc3;
	}
	
	.auteed {
		color: #19be6b;
	}
	
	.autedStatusBox {
		font-size: 16px;
		/*padding-bottom:40px;*/
		border-bottom: 1px solid #e9eaec;
	}
	
	.autedStatusBox .statusText {
		padding-right: 48px;
		font-size: 20px;
		/*font-weight:bold;*/
		color: #0f8dcf;
		font-weight: 500;
	}
	
	.autedStatusBox .renzhengspan {
		font-size: 20px;
	}
	
	.autedStatusBox .btnApply {
		margin-left: 100px;
		background-color: #faa600;
		border-color: #faa600;
		font-size: 18px;
		width: 128px;
		height: 47px;
	}
	
	h3 {
		font-size: 14px;
		padding: 35px 10px 10px;
		/*color:#ff8900;*/
	}
	
	.introduceBox {
		padding: 0 10px;
		margin-left: 20px;
		font-size: 14px;
	}
	
	.introduceBox li {
		list-style: disc;
		line-height: 30px;
		color: #ff8900;
	}
	
	.status5 {
		display: flex;
		align-items: center;
		height: 200px;
		position: relative;
		justify-content: space-between;
	}
	
	h2 {
		/*认证中*/
		color: #fc8541;
		line-height: 24px;
		/*margin-left: 35px;*/
	}
	
	.h_span,
	.ing_span,
	.ok_span {
		font-size: 12px;
		color: #4e9bc3;
		margin-left: 70px;
		font-weight: 100;
	}
	
	.h_span {
		color: #ef2222;
	}
	
	.ing_span {
		color: #4e9bc3;
	}
	
	.ok_span {
		color: #4e9bc3;
		font-weight: 100;
	}
	
	.status5_ri {
		display: flex;
		align-items: center;
	}
	
	.status5_span {
		margin-left: 70px;
	}
	
	.status5_print {
		position: absolute;
		top: 183px;
		left: 45%;
	}
	/* h2 .alertBg{
		display: inline-block;
		width:30px;
		height:30px;
		background: -webkit-linear-gradient(#ffb82b, #fc8541);  Safari 5.1 - 6.0 
		background: -o-linear-gradient(#ffb82b, #fc8541);       Opera 11.6 - 12.0 
		background: -moz-linear-gradient(#ffb82b, #fc8541);     Firefox 3.6 - 15 
		background: linear-gradient(#ffb82b, #fc8541);          标准的语法 
		border-radius: 15px;               圆角
		-moz-border-radius: 15px;
		-webkit-border-radius: 15px;
		box-shadow:1px 2px 1px #888888;    模块阴影
		-moz-box-shadow: 1px 2px 1px #888888;
		-webkit-box-shadow: 1px 2px 1px #888888;
		text-align: center;
		color:#fff;
		line-height: 30px;
		margin-right:8px;
	}*/
	
	.authenInfoBox {
		width: 80%;
		padding-left: 25px;
		font-weight: 500;
	}
	
	.authenInfoBox li {
		line-height: 40px;
		padding: 10px;
		font-size: 14px;
	}
	
	.authenInfoBox li:after {
		clear: both;
		content: " ";
		display: block;
		height: 0;
	}
	
	.authenInfoBox li .leftBox {
		float: left;
		width: 38%;
		text-align: right;
		color: #383b40;
	}
	
	.authenInfoBox li .rightBox {
		float: left;
		width: 60%;
		text-align: left;
		padding-left: 10px;
		color: #383b40;
	}
	
	.authenInfoBox li .rightBox img {
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
	/*.authenInfoBox li .rightBox img:hover {
		width: 100%;
	}*/
	
	h4 {
		/*font-size:16px;*/
		/*padding:25px 10px 10px;*/
		margin-bottom: 30px;
		border-bottom: 1px solid #ccd9e6;
	}
	
	h2 .redColor {
		/*认证中*/
		color: red;
	}
	
	.ps_span {
		margin-top: 20px;
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
</style>