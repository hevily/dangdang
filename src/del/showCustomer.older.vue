<template>
	<div class="localimport" @click="maopao">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>客户</Breadcrumb-item>
			<Breadcrumb-item>添加新客户</Breadcrumb-item>
			<Breadcrumb-item>网络添加</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<div class="right_home_warp_topdiv">
				<span class="right_home_warp_title">客户名称</span>
				<Input placeholder="请输入..." v-model="companyData.name" style="width:440px"></Input>
				<button class="localimport_search">搜索</button>
			</div>

			<Form class="compInfoForm">
				<div class="formItem">
					<div class="label"><span class="Must">*</span>公司名称：</div>
					<span class="formItem_span">广州市XX电子科技有限公司 </span>
					<span class="formItem_renzhengok">[已认证]</span>
				</div>
				<div class="formItem">
					<div class="label">企业英文名称：</div>
					<span class="formItem_span">http://www.csduhgz.com</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>统一社会信用代码：</div>
					<span class="formItem_span">91440101XXXXXXXXXX </span>
					<span class="formItem_renzhengok">[已认证]</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>注册地址：</div>
					<span class="formItem_span">广州市天河区天河北路XXX号X楼XX室</span>
					<span class="formItem_renzhengok">[已认证]</span>
				</div>
				<div class="formItem">
					<div class="label">经营地址：</div>
					<span class="formItem_span">广州市天河区天河北路XXX号X楼XX室</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>法定代表/企业负责人姓名：</div>
					<span class="formItem_span">陈XX </span>
					<span class="formItem_renzhengok">[已认证]</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>经营模式：</div>
					<span class="formItem_span">生产+贸易型</span>
					<span class="formItem_renzhengok">[已认证]</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>企业性质：</div>
					<span class="formItem_span">合资企业</span>
					<span class="formItem_renzhengok">[已认证]</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>企业规模：</div>
					<span class="formItem_span">500人以下</span>
					<span class="formItem_renzhengok">[已认证]</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>年营业额：</div>
					<span class="formItem_span">5亿-10亿（单位：元）</span>
					<span class="formItem_renzhengok">[已认证]</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>经营范围：</div>
					<span class="formItem_span">XXXXXXXXXXXXXXXXXXXXXXXXXX</span>
					<span class="formItem_renzhengok">[已认证]</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>企业所属行业：</div>

					<div class="addqu">
						<div class="addqukuang" v-show="qysshy.length>0">
							<div v-for="(item,index) in qysshy" class="addqukuangnr test-1"><span class="addqukuangf">{{item.value}}</span></div>
						</div>
					</div>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>客户所属行业：</div>
					<div class="addqu">
						<div class="addqukuang" v-show="khsshy.length>0">
							<div v-for="(item,index) in khsshy" class="addqukuangnr test-1"><span class="addqukuangf">{{item.value}}</span></div>
						</div>
					</div>
				</div>
				<div class="formItem">
					<div class="label">主营产品：</div>
					<div class="add_canpinkuang">
						<div>
							<div v-for="(item,index) in cpsshy" class="cpkuang">
								<div v-model="item.value">{{item.value}}</div>

							</div>
						</div>
					</div>
				</div>
				<div class="formItem">
					<div class="label">品牌名称：</div>
					<span class="formItem_span">当当橡胶牌</span>
				</div>
				<div class="formItem">
					<div class="label">主要销售区域：</div>
					<div class="addqu">
						<div class=" addqukuang addqukuang2" v-show="xssshy.length>0">
							<div v-for="(item,index) in xssshy" class="addqukuangnr test-1"><span class="addqukuangf">{{item.value}}</span></div>
						</div>
					</div>

				</div>
				<div class="formItem">
					<div class="label">公司网址：</div>
					<span class="formItem_span">https://corp.dinghuo123.com</span>
				</div>
				<div class="formItem">
					<div class="label">公司电话：</div>
					<span class="formItem_span">020-85545589</span>
				</div>
				<div class="formItem">
					<div class="label">公司传真：</div>
					<span class="formItem_span">020-85545589</span>
				</div>
				<div class="formItem">
					<div class="label">公司简介：</div>
					<span class="formItem_span formItem_span_textarea">  公司与华北理工、江西财经大学、天津财经大学等多家院校展开深入的合作，共同开创高校实践教学新模式。   结合云技术+移动应用</span>
				</div>
				<div class="formItem">
					<div class="label"><span class="Must">*</span>企业营业执照：</div>
					<img :src="companyData.logoUrl" class="logo" v-show="logoShow">
				</div>
				<div class="formItem formLogo" @mouseenter="uploadShow" @mouseleave="uploadHide">
					<div class="label"><span class="Must">*</span>公司LOGO：</div>
					<div class="uploaddiv">
						<img :src="companyData.logoUrl" class="imgshow" />
					</div>
				</div>
				<div class="formItem">
					<div class="label">附件：</div>
					<div>
						<Upload :action="uploadUrl" :headers="uploadHeader">
							<Button type="ghost" class="uploadbtn2">
								<img src="../../../../assets/img/fj_le.png"/>
								<span class="uploadbtn2_title">添加附件</span>
								<span class="uploadbtn2_title2">（产品附件最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF、RAR、ZIP）</span>
							</Button>
						</Upload>
					</div>
				</div>

			</Form>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		data() {
			return {		
                customer: {},
                companyData: {},
				imgUrl: '',
				visible: false,
				audit: {},
				qysshy: [{
					value: '火星'
				}], //企业所属行业已选择的内容
				qysshy2: [{ //企业所属行业弹窗内容，需接入接口数据
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
				khsshy: [{
					value: '火星'
				}], 
				khsshy2: [{ //客户所属行业弹窗内容，需接入接口数据
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
				xssshy: [{
					value: '火星'
				}], 
				xssshy2: [{ //销售区域弹窗内容，需接入接口数据
						value: '非洲'
					},
					{
						value: '木星'
					},
					{
						value: '火星'
					},
					{
						value: '月球'
					}
				],
				cpnr: "",
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
				]
			}
		},
		methods: {
			showImg() {
				this.imgUrl = this.customer.attachmentUrl;
				this.visible = true;
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
			maopao() {
				this.flag = false;
			},
		},
		created() {
			const _this = this;

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
			const _this = this;
			this.DOM = {
				content: document.getElementById('content'),
			};

			console.log(this.$route.params.id);
			if(!this.$route.params.id) {
				this.$router.go(-1);
			}

			const id = this.$route.params.id;
			this.axios(api.cooperation + id + api.queryById)
				.then(function(res) {
					const data = res.data.datas;
					console.log(data);
					_this.customer = data;
				})
				.catch(function(err) {
					console.log(err);
				})
				
			this.uploadList = this.$refs.upload.fileList;
		}
	}
</script>
<style type="text/css">
	.add_canpinkuang .add_canpinkuang_input .ivu-input-type {
		width: 440px!important;
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
</style>
<style scoped>
	.right_home_warp_topdiv{
		display: flex;
		align-items: center;
	}
	.right_home_warp_title {
		color: #415161;
		font-size: 13px;
		margin-left: 4px;
		margin-right: 10px;
	}
	
	.localimport_search {
		background-color: #0099cc;
		border: none;
		width: 79px;
		height: 32px;
		margin-left: 30px;
		border-radius: 2px;
		color: white;
	}
	.localimport_search:hover{
		background-color: #1ab3df;
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
	
	.compInfoForm .areaTab {
		width: 100%;
		height: 28px;
		line-height: 28px;
	}
	
	.compInfoForm .areaTab span {
		float: left;
		width: 33.33%;
		height: 100%;
		z background-color: #f0f0f0;
		border-left: 1px solid #ccc;
		text-align: center;
		cursor: pointer;
	}
	
	.compInfoForm .areaTab span:first-child {
		border: 0;
	}
	
	.compInfoForm .areaTab .tactive {
		background-color: #fff;
		color: #f60;
	}
	
	.compInfoForm .areaCont {
		display: none;
		padding: 0 28px;
	}
	
	.compInfoForm .areaProv {
		display: block;
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
		margin-bottom: 18px;
		float: left;
		clear: both;
		font-size: 13px;
	}
	
	.compInfoForm .formItem .formItem_span {
		height: 32px;
		line-height: 32px;
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
	
	.compInfoForm .formItem2 {
		float: left;
		width: 282px;
		margin-right: 20px;
		margin-bottom: 18px;
	}
	
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
		width: 193px;
		padding-right: 12px;
		line-height: 32px;
		text-align: right;
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
		width: 300px;
		height: 95px;
		background: url(../../../../assets/img/logoupload.jpg) no-repeat;
		background-size: 100% 100%;
		border: none;
		margin-left: 0;
	}
	
	.uploadbtn2 {
		width: 70%;
		height: 50px;
		background-color: #f8f9fd;
		border: none;
	}
	
	#imgupload_zhe_div {
		position: absolute;
		top: 0;
		width: 300px;
		height: 95px;
		display: none;
	}
	
	.imgshow {
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
	}
	
	.addqu .addqukuang2 {
		height: auto;
	}
	
	.addqu .addqukuang .addqukuangnr {
		display: inline-block;
		padding: 5px 5px;
		border: 1px solid #ccd9e6;
		margin-right: 5px;
		margin-bottom: 10px;
		font-size: 12px;
		color: #415161;
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
		margin-left: 15px;
		border: none;
		background-color: #ccd9e6;
		font-size: 12px;
		border-radius: 2px;
		color: #415161;
	}
	
	.qysstan {
		width: 50%;
		height: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 999;
		border: 1px solid #000000;
		z-index: 999;
		padding: 20px;
		background-color: #fff;
		margin-left: -25%;
		margin-top: -25%;
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
</style>