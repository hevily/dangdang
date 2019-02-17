<template>
	<div class="audit_box ">
			<Breadcrumb style="padding-top: 10px;padding-bottom: 10px;">
			<Breadcrumb-item to='/main'>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">平台</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">会员管理</span></Breadcrumb-item>
		</Breadcrumb>
		
		<div class="fromItemBox  right_home_warp_box  test-1">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
			
	
			<h3>
				审核意见
			</h3>
			<div class="aa">
				<!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">-->
				  <CheckboxGroup v-model="fruit" class="aaa">
                    <Checkbox class="Checkbox" label="企业名称填写有误"></Checkbox>
                    <Checkbox class="Checkbox" label="统一社会信用代码填写有误"></Checkbox>
                    <Checkbox class="Checkbox" label="注册地址填写有误"></Checkbox>
                    <Checkbox class="Checkbox" label=" 法定代表人/ 企业负责人姓名填写有误"></Checkbox>
                    <Checkbox class="Checkbox" label="企业性质选择有误"></Checkbox>
                    <Checkbox class="Checkbox" label="企业规模选择有误"></Checkbox>
                    <Checkbox class="Checkbox" label="年营业额选择有误"></Checkbox>
                    <Checkbox class="Checkbox" label=" 经营范围（一般经营范围）填写有误"></Checkbox>
                    <Checkbox class="Checkbox" label="企业营业执照上传有误"></Checkbox>
			    </CheckboxGroup>
				<!--<FormItem label="其他:" prop="auditedContent" >-->
					<FormItem label="其他原因:" prop="auditedContent" >
          				<Input v-model="formValidate.auditedContent" type="textarea" placeholder="请填写审核内容"></Input>
		            <!--<Input v-model="formValidate.auditedContent" type="textarea" placeholder="请填写审核内容" ></Input>-->
		            </FormItem>
		        <FormItem>
		            <button class="btn-save" @click="handleAgree('formValidate')">通过</button>
		          	<button class="btn-del" @click="handleDisagree('formValidate')" style="margin-left: 8px">不通过</button>
		        </FormItem>
			</div>
			</Form>
			<!--资料-->
			<div class="authenInfoPanel">
				<h4>企业认证信息</h4>
				<ul class="authenInfoBox">
					<li>
						<div class="leftBox">企业全称：</div>
						<div class="rightBox">{{ applyInfo.name }}</div>
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
						<div class="leftBox">经营范围(一般经营范围)：</div>
						<div class="rightBox">{{ applyInfo.registeredAddress }}</div>
					</li>
					<li>
						<div class="leftBox">企业性质：</div>
						<div class="rightBox">{{ applyInfo.selected}}</div>
					</li>
					<li>
						<div class="leftBox">企业规模：</div>
						<div class="rightBox">{{ applyInfo.selected2}}</div>
					</li>
					<li>
						<div class="leftBox">年营业额：（单位：元）：</div>
						<div class="rightBox">{{ applyInfo.selected3}}</div>
					</li>
						<li>
						<div class="leftBox">经营范围（一般经营范围）：</div>
						<div class="rightBox_t">{{ applyInfo.bizScope}}</div>
					</li>
				</ul>
				<ul class="authenInfoBox">
					<li>
						<div class="leftBox">企业工商营业执照：</div>
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
		</div>
		<div v-cloak v-show="status == '5' || status == '2'">
			<!--<div @click="show = !show" class="btnFlex">
				<Icon class="icon animated fadeIn" type="arrow-down-b" v-show="!show"></Icon><Icon class="icon animated fadeIn" type="arrow-right-b" v-show="show"></Icon>附件
			</div>-->
				<div v-if="show" class="authenInfoPanel" style="">
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
				</div>
			<!--</transition>-->
		</div>
	</div>
</template>

<script>
	import animate from 'animate.css'
	import api from '@/api/api'
	export default{
		data(){
			return{
				show:false,
				showis:false,
				fruit: [],
				formValidate:{
					auditedContent:''
				},
				ruleValidate:{
					auditedContent:[
						{ required: true, message: '审核内容不能为空', trigger: 'blur' }
					]
				},
				status:0,
				applyInfo:{},
				opinion:7,
				companyId:''
			}
		},
		methods:{
	isshow(){
				let _this = this;
				_this.showis = !_this.showis;
					
			},
			instance (type,message) {
                const title = 'Title';
                const content = '<p>'+ message +'</p>';
            	switch (type) {
                    case 'pass':
                        this.$Modal.success({
                            content: "同意通过！",
                        	
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            content: content
                        });
                        break;
                    case 'loss':
                    	this.$Modal.error({
                    		content: "不同意通过！"
                    		
                    	});
                }
                
            },
			handleAgree(name){
				const _this = this;
				_this.opinion = 9;
				_this.$refs[name].validate((valid) => {
                    if (valid) {
                    	var auditingInfo = {
                    		corpID: _this.companyId,
                    		content: _this.formValidate.auditedContent,
                    		result: _this.opinion
                    	}
                    	_this.axios({
                    		method:'post',
                    		header:{
                    			"Content-Type": 'application/x-www-form-urlencoded'
                    		},
                    		url:api.auditing,
                    		data: api.convertParam(auditingInfo)
                    	})
                    	.then(function(res){
                    		if(res.data.status == 1){
                    			
//          					_this.instance("pass",res.data.message);
            					setTimeout(() => {
				                   _this.$router.push({path:'/companyList'})
				                }, 2000);
            				}else{
//          					_this.instance("error",res.data.message);
            					setTimeout(() => {
				                   _this.$router.push({path:'/companyList'})
				                }, 2000);
            					
            				}
                    	})
                    	.catch(function(error){
                    		console.log(error);
                    	});
                          this.$Message.success('审核成功!');
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })
			},
			handleDisagree(name){
				this.$refs[name].validate((valid) => {
                    if (valid) {
                    	const _this = this;
						_this.$refs[name].validate((valid) => {
		                    if (valid) {
		                    	var auditingInfo = {
		                    		corpID: _this.companyId,
		                    		content: _this.formValidate.auditedContent,
		                    		result: _this.opinion
		                    	}
		                    	_this.axios({
		                    		method:'post',
		                    		header:{
		                    			"Content-Type": 'application/x-www-form-urlencoded'
		                    		},
		                    		url:api.auditing,
		                    		data: api.convertParam(auditingInfo)
		                    	})
		                    	.then(function(res){
		                    		if(res.data.status == 1){
		                    					_this.instance("loss",res.data.message);
		                    			setTimeout(() => {
							                   _this.$router.push({path:'/companyList'})
							                }, 2000);
		            			
		            				}else{
		            					_this.instance("error",res.data.message);
		            					setTimeout(() => {
							                  _this.$router.push({path:'/companyList'})
							              }, 2000);
		            				}
		                    	})
		                    	.catch(function(error){
		                    		console.log(error);
		                    	});
//		                        this.$Message.success('审核成功!');
		                    } else {
		                        this.$Message.error('提交失败!');
		                    }
		                })
//                        this.$Message.success('审核成功!');
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })
			}
		},
		created(){
			const _this = this;
			let companyId = this.$route.query.companyId;
			var url = api.save_queryAuthentication + companyId + api.queryAuthentication;
			this.axios(url)
			.then(function(res){
				console.log(res.data.datas);
				var datas = res.data.datas;
				_this.status = datas.status;
				switch (datas.corpType) {  //生产类型
					case 1:
						_this.applyInfo.corpType = "生产型";
						break;
					case 2:
						_this.applyInfo.corpType = "贸易型";
						break;
					default:
						_this.applyInfo.corpType = "生产+贸易型";
						break;
				}
				
				_this.companyId = datas.id; //全称
					_this.applyInfo.name = datas.name; //全称
					_this.applyInfo.businessNum = datas.usci; //统一社会信用代码不能超过50位
					_this.applyInfo.registeredAddress = datas.registeredAddress; //注册地址
			    	_this.applyInfo.legalPerson = datas.legalPerson; //法定代表人/企业负责人姓名1
						_this.applyInfo.bizScope = datas.bizScope; //经营范围(一般经营范围)1
						_this.applyInfo.selected = datas.enterpriseNature;//企业性质不能超过50位
						_this.applyInfo.selected2 = datas.enterpriseSize; //企业规模不能超过50位
						_this.applyInfo.selected3  = 	datas.yearTurnover;//年营业额不能超过50位
						_this.applyInfo.businessLicenseUrl = datas.imgBizLicense; //企业工商营业执照不能超过500位
						_this.applyInfo.authenticationAuditContent = datas.authenticationAuditContent; //企业工商营业执照不能超过500位
					
				
				
				
			})
			.catch(function(error){
				console.log(error);
			});
		}
	}
</script>

<style scoped>
.audit_box{
	/*position: relative;*/
}
	.fromItemBox{
		width:98%;
	}
	.right_home_warp_box{
  	width: 100%;

  	padding: 20px;
  	background-color: #fff;
  	position: absolute;
  	z-index: 999;
  	top: 0px;
  	left: 2px;
  	right: 10px;
  	bottom: 10px;
  	box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
  	overflow: hidden;
  	overflow-y: scroll;
  }
		h3 {
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
	h4{
		font-size: 16px;
		padding: 25px 10px 10px;
		margin-bottom: 30px;
		color: #0083c0;
		border-bottom: 1px solid #ccd9e6;
	}
	.authenInfoBox{
		width:80%;
		padding-left:25px;
	}
	.authenInfoBox2{
		width:80%;
		padding-left:25px;
	
	}
	.authenInfoBox li{
		line-height: 20px;
		padding:10px;
		font-size:14px;
	}
	.authenInfoBox li:after{
		clear:both;
		content:" ";
		display: block;
		height:0;
	}
	.authenInfoBox li .leftBox{
		float:left;
		width:35%;
		text-align:right;
	}
	.authenInfoBox li .rightBox{
		float:left;
		width:60%;
		height: 33px;
		line-height: 33px;
		text-align:left;
		padding-left:10px;
		background: #eff1f8;
		border-radius: 5px;
		border: 1px solid #ccd9e6;
		margin: 0 0 0 10px;
	}
	.authenInfoBox li .rightBox2{
		background: #fff;
		border: 1px solid #fff;
		padding-left: 10px;
		
	}
	.authenInfoBox li .rightBox2 img{
		width:40%;
		cursor: pointer;
		transition:width 1s;
		-moz-transition:width 1s; /* Firefox 4 */
		-webkit-transition:width 1s; /* Safari and Chrome */
		-o-transition:width 1s; /* Opera */
	}

	[v-cloak] { display: none }
	.btnFlex{
		font-size:16px;
		/*font-weight: bold;*/
		padding-left:20px;
		cursor: pointer;
	}
	.btnFlex .icon{
		margin-right:8px;
		font-weight: bold;
		font-size: 18px;
	}

.Checkbox{
	width: 33%;
	margin: 15px 0 ;
}
	.rightBox_t{
		font-size: 14px;
		float: left;
		width: 60%;
		text-align: left;
		padding: 10px;
		background: #eff1f8;
		border-radius: 5px;
		border: 1px solid #ccd9e6;
		margin: 0 0 0 10px;
	}

	.rightBox_t{
		
		font-size: 14px;
		float: left;
		width: 60%;
		text-align: left;
		padding: 10px;
		background: #eff1f8;
		border-radius: 5px;
		border: 1px solid #ccd9e6;
		margin: 0 0 0 10px;
	}
	  .rightBox_but{
  	height: 100%;
  	width: 100%;
  	background: rgba(0,0,0,0.3);
  	position: fixed;
  	top: 0;
  	left: 0;
  }
   .rightBox_but div{
   	width: 600px;
	margin-left: -260px;
    position: relative;	
    top:100px;
    left: 45%;
    }
   .rightBox_but div img{
   	 width: 100%;
   } 
</style>