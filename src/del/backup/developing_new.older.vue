<template>
	<div class="developing_new">
		<Breadcrumb style="padding-left: 0;">
			<Breadcrumb-item to='/main'>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item ><span class="link_span ok_link"  v-if="gon">编辑员工信息</span><span class="link_span ok_link" v-else>新增员工信息</span></Breadcrumb-item>
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
		<div class="bottom_div">
			<div class="form_box_js test-1">
				<form action="">
					<h4 v-if="gon">编辑员工信息</h4>
					<h4 v-else>新增员工信息</h4>
					<ul class="form_ul">
						<li>
							<!--{{userInfo.name}}-->
							<label><span class="red_coloc">*</span>&nbsp;姓名:</label><input type="text" placeholder="请输入姓名" v-model="userInfo.name" />
						</li>
						<li>
							<label><span class="red_coloc">*</span>&nbsp;手机号码:</label><input type="text" placeholder="请输入手机号码" v-model="userInfo.mobile" />
						</li>
						<li id="depfan">
							<label><span class="red_coloc">*</span>&nbsp;部门:</label>
							<Cascader class="cas_dev" placeholder="请选择" size="large" v-model='Cascaderval' :value='Cascaderval2' :data="depList" :render-format="format" change-on-select></Cascader>
							
						</li>
						<li>
							<label><span class="red_coloc">*</span>&nbsp;职位:</label><input type="text" placeholder="请输入职位" v-model="userInfo.title" />
						</li>
						<li>
							<label><span class="red_coloc">*</span>&nbsp;邮箱:</label><input type="text" placeholder="请输入邮箱" v-model="userInfo.email" />
						</li>
						<li>
							<label>性别:</label>
							<select v-model='selected'>
								<option value="1">男</option>
								<option value="2">女</option>
							</select>
						</li>
						<li>
							<label><span class="red_coloc">*</span>&nbsp;身份证号码:</label><input type="text" placeholder="请输入身份证号码" v-model="userInfo.idCardNo" />
						</li>
						<li>
							<label>现居地址:</label><input type="text" placeholder="请输入现居地址" v-model="userInfo.address" />
						</li>
						<!--<li>
							<label><span class="red_coloc">*</span>初始密码:</label><input type="text" placeholder="请输入初始密码" v-model="InitialCipher" />
						</li>
						<li>
							<label><span class="red_coloc">*</span>确认密码:</label><input type="text" placeholder="请确认密码" v-model="ConfirmCipher" />
						</li>-->
					</ul>
					<h4 class="h4">权限设置   <span class="h4_span">权限与员工关联，选择该账号的员工可完成权限设置</span></h4>
					<!--账户角色-->
					<div class="form_div_js">
						<div class="power_le">
							员工角色
						</div>
						<div class="power_ri_box">
							<div class="power_ri">
								<!--<input type="checkbox"  /><label>{{item}}</label>-->
								<Row>
									<Col span="5" v-for="item in bxa">
									<CheckboxGroup class="CheckboxGroup">
										<Checkbox label="">{{item}}</Checkbox>
									</CheckboxGroup>
									</Col>
								</Row>
							</div>
						</div>
					</div>
					<!--数据权限-->
					<div class="form_div">
						<div class="power_le">
							数据权限
						</div>
						<div class="power_ri_box">
							<div style="margin: 0 0 0 3px;">全部部门</div>
						</div>
					</div>
					<!--账户角色-->

					<div class="form_div_three" v-for="item_le in list_le">
						<div class="power_le_three">
							<div>
								{{item_le.name}}
							</div>
						</div>
						<div class="power_ri_box_three">
							<!--<div v-for="ri in le.list_ri"class="power_ri_three">-->
							<Row>
								<Col span="4" v-for="ri in item_le.list_ri">
								<CheckboxGroup class="CheckboxGroup1">
									<Checkbox label="" class="Checkbox">{{ri}}</Checkbox>
								</CheckboxGroup>
								</Col>
							</Row>
							<!--<div><input type="checkbox" /><label>{{ri}}</label></div>-->
							<!--</div>-->
						</div>
					</div>
				</form>
			</div>
			<div class="btn-bot">
				<img src="../../assets/img/shadow1.jpg" />
				<button class="btn-save" @click="save_usermessage">保存</button>
				<button class="btn-return" @click="add_back">返回</button>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		created() {
			const _this = this;
			let re = /(1[3-9]\d{9}$)/;
			if(this.$route.query.companyId != undefined) {
				_this.gon =true;
				_this.userInfo.mobile = this.$route.query.aa.mobile;
				_this.userInfo.name = this.$route.query.aa.name;
				_this.userInfo.id = this.$route.query.aa.id;
				_this.userInfo.email = this.$route.query.aa.email;
				_this.userInfo.title = this.$route.query.aa.title;
				_this.userInfo.departmentName = this.$route.query.aa.departmentName;
				_this.userInfo.idCardNo = this.$route.query.aa.idCardNo;
				_this.userInfo.address = this.$route.query.aa.address;
				_this.userInfo.departmentId = this.$route.query.aa.departmentId;
				
				//_this.Cascaderval.push(this.$route.query.aa.departmentval);
				_this.Cascaderval.push(this.$route.query.aa.departmentId);
				//_this.Cascaderval2.push(this.$route.query.aa.departmentName);
				console.log("???????", _this.Cascaderval);
				if(this.$route.query.aa.sex == 1) {
					_this.selected = 1;
				} else if(this.$route.query.aa.sex == 2) {
					_this.selected = 2;
				}
			}

			_this.axios({
					method: 'get',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: api.sysDepartment + api.sysDepartmentFetchAsTree,
					// url : '/prize',
				})
				.then(function(res) {
					if(res.data.status == 1) {
						_this.depList = res.data.datas;
					}else{
						_this.$Message.error(res.data.message);
					}
					
				})

		},
		mounted() {
			document.querySelector(".ivu-cascader-label").style.display = "block";
			document.querySelector(".ivu-cascader-label").innerHTML = this.$route.query.aa.departmentName;
			document.querySelector(".ivu-cascader-label").addEventListener("click", function() {
			    document.querySelector(".ivu-cascader-label").style.display = "none";
			})
		},
		data() {
			return {
				gon:false,
				Cascaderval: [],
				Cascaderval2: [],
				companyId: '',
				name: '',
				mobile: '',
				department: '',
				positions: '',
				mailbox: '',
				selected: '1',
				depList: [],
				userInfo: {
					id: '', //用户ID
					//corpId: '', //忽略
					name: '', //用户姓名
					//loginName: '', //登陆名称
					mobile: '', //手机号
					email: '', //电子邮件
					//qq: '', //QQ
					title: '', //职务
					departmentId: '',
					departmentName: '', //部门名称
					//jobNumber: '', //工号
					idCardNo: '', //身份证号
					//roleNam: '', //角色名称
					sex: '1', //1,男性，2、女性
					address: '' //现居地址
				},
				gender: [{
					male: '男',
					female: '女'
				}],
				IdCard: '',
				PresentAddress: '',
				/*InitialCipher: '',*/
				/*ConfirmCipher: '',*/
				bxa: ['系统管理员', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '仓库管理员', '资料维护员', '自定义角色一', '自定义角色二'],
				list_le: [{
						name: '系统管理员',
						list_ri: ['系统管理员', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', ],
					},
					{
						name: '责人管理员',
						list_ri: ['系统管理员', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', ],
					},
					{
						name: '订单审核员',
						list_ri: ['系统管理员', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理'],
					},
					{
						name: '财务审核人',
						list_ri: ['系统管理员', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理'],
					}
				],

			}
		},
		methods: {
			format(labels, selectedData) {
				const _this = this;
				const index = labels.length - 1;
				const datas = selectedData[index] || false;
				if(datas && datas.code) {
//					console.log("!!!!");
//					console.log(labels[index]);
					_this.userInfo.departmentId = datas.id;
					_this.userInfo.departmentName = labels[index];
					return labels[index]; //+ ' - ' + data.code
				}
				return labels[index];
			},
			add_back() {
				const _this = this;
				_this.$router.push({
					path: '/comm_developing'
				})
			},
			save_usermessage() {
				const _this = this;
				let re = /(1[3-9]\d{9}$)/;
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
				var emailreg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
				if(_this.userInfo.name == '') {
					_this.$Message.error("请输入姓名");
					return false;
				} else if(_this.userInfo.mobile == '') {
					_this.$Message.error("请输入手机号");
					return false;
				} else if(!re.test(_this.userInfo.mobile)) {
					_this.$Message.error("请输入正确的手机号");
					return false;
				} else if(emailreg.test(_this.userInfo.email) === false) {
					_this.$Message.error("邮箱不合法");
					return false;
				}else if(_this.userInfo.departmentName == '') {
					_this.$Message.error("请输入部门");
					return false;
				} else if(_this.userInfo.title == '') {
					_this.$Message.error("请输入职位");
					return false;
				} else if(_this.userInfo.idCardNo == '') {
					_this.$Message.error("请输入身份证");
					return false;
				}else if(reg.test(_this.userInfo.idCardNo) === false) {
					_this.$Message.error("身份证不合法");
					return false;
				} else {
					_this.userInfo.sex = _this.selected;
					_this.axios({
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.addOrModifySave,
							data: api.convertParam(_this.userInfo),
						})
						.then(function(res) {
							console.log(res);
							if(res.data.status == 1) {
								_this.$Message.success("保存成功");
								setTimeout(() => {
									_this.$router.push({
										path: '/comm_developing'
									})
								}, 2000);
							}else{
								_this.$Message.error(res.data.message);
							}
						})
						.catch(function(error) {
								console.log(error);
						});
				}
			}
		}
	}
</script>
<style>
	.ivu-cascader div div input {
		height: 33px;
		font-size: 14px!important;
	}
	
	.ivu-cascader-label {
		background-color: white;
		height: 33px;
		line-height: 32px!important;
		font-size: 13px!important;
		border: 1px solid #ccd9e6;
		border-radius: 5px;
		color: black;
	}
</style>
<style scoped>
	.developing_new {
		/*padding: 10px 
		 */
	}
	
	.bottom_div {
		position: absolute;
		top: 0;
		left: 0;
		right: 30px;
		bottom: 0;
	}
	
	.form_box_js {
		width: 100%;
		background-color: #fff;
		padding: 0 20px 30px;
		position: absolute;
		top: 50px;
		left: 0px;
		bottom: 90px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		overflow: auto;
		overflow-x: hidden;
	}
	
	.form_but {
		width: 100%;
		height: 80px;
		background-color: #fff;
		position: absolute;
		bottom: 10px;
		left: 0px;
	}
	
	.form_but img {
		width: 100%;
	}
	
	.form_ul {
		width: 76%;
	}
	
	.form_ul li {
		width: 100%;
		display: flex;
		margin: 20px 0;
		align-items: center;
		position: relative;
	}
	/*.selfu{
		    position: absolute;
    right: 0;
    top: 5px;
    height: 43px;
    line-height: 32px;
    z-index: 999;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #eeeeee;
    padding: 5px 7px;
    font-size: 14px;
    width: 100%;
	}*/
	
	.form_ul li label {
		display: block;
		width: 215px;
		padding-right: 10px;
		text-align: right;
		font-size: 14px;
	}
	
	.form_ul li input {
		width: 100%;
		border-radius: 5px;
		border: 1px solid #ccd9e6;
		padding: 5px 10px;
		font-size: 14px;
	}
	
	.ivu-cascader {
		width: 100%;
		/*border-radius: 5px;
		border: 1px solid #ccd9e6;*/
		padding: 5px 1px;
		font-size: 14px;
	}
	
	.ivu-cascader .ivu-cascader-rel .ivu-input-wrapper .ivu-input {
		border: none!important;
	}
	
	.form_ul li select {
		width: 100%;
		border-radius: 5px;
		border: 1px solid #ccd9e6;
		padding: 6.5px 10px;
	}
	
	h4 {
		font-size: 16px;
		color: #0083c0;
		padding: 25px 0px 10px 0;
		margin-bottom: 30px;
		border-bottom: 1px solid #e6e6e6;
		font-weight: normal;
	}
	
	.red_coloc {
		color: #F00;
	}
	
	.h4 {
		font-size: 16px;
	}
	
	.h4_span {
		display: inline-block;
		margin-left: 60px;
		color: #bec6ce;
		font-size: 14px;
	}
	
	.form_div_js {
		display: flex;
		margin-bottom: 30px;
	}
	
	.form_div {
		display: flex;
		margin-bottom: 30px;
	}
	
	.power_ri_box {
		display: flex;
		flex-wrap: wrap;
	}
	
	.power_ri {
		display: flex;
		flex-wrap: wrap;
	}
	
	.CheckboxGroup {
		display: flex;
		align-items: center;
		/*margin-left: 45px;*/
		margin-bottom: 20px;
	}
	
	.power_le {
		width: 128px;
		font-size: 16px;
		color: #0083c0;
	}
	
	.form_div_three {
		display: flex;
		border-top: 1px solid #eef1f9;
		border-right: 1px solid #eef1f9;
		width: 100%;
	}
	
	.form_div_three:last-of-type {
		border-bottom: 1px solid #eef1f9;
	}
	
	.CheckboxGroup label {
		font-size: 14px!important;
	}
	
	.power_le_three {
		width: 128px;
		height: 180px;
		font-size: 14px;
	}
	.sel_sta:hover {
		border-color: #269edc;
	}
	.cas_dev div div input {
		height: 32px!important;
	}
	.cas_dev div div span .ivu-cascader-menu {
		min-width: 130px !important;
		height: auto!important;
		max-height: 180px!important;
		background-color: #fff;
		box-shadow: 0 0 5px 1px #eeeeee;
	}
	
	.power_le_three>div {
		width: 100px;
		height: 180px;
		line-height: 170px;
		text-align: center;
		background: #eef1f9;
		border-bottom: 1px solid #fff;
	}
	
	.power_ri_box_three {
		/*flex-wrap: wrap;*/
		/*width: 980px;*/
		padding: 10px 0;
	}
	
	.ivu-row {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		align-items: center;
		height: 100%;
		margin-left: 30px;
	}
	/*.power_ri_three{
		display: flex;
	    flex-wrap: wrap;
	    align-items:  center;
	   }*/
	
	.CheckboxGroup1 {
		margin-bottom: 10px;
		font-size: 14px;
	}
	
	.CheckboxGroup1 label {
		font-size: 14px;
	}
	/*.Checkbox{
		height: 20px;
		width: 130px;
	}*/
	
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
	
	.ivu-row {
		height: auto !important;
	}
	
	::-webkit-input-placeholder {
		/* WebKit, Blink, Edge */
		color: #bbbec4;
	}
	
	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #495060;
	}
	
	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #495060;
	}
	
	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #495060;
	}
</style>