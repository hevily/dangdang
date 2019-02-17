<template>
	<div class="developing_new">
		<Breadcrumb>
			<Breadcrumb-item to='/main'>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">组织与用户</span></Breadcrumb-item>
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
			<div class="three_span">
				<span @click="deve_in">员工账号</span>
				<span @click="deve">部门设置</span>
				<span style="color: #00c1de;">员工权限设置</span>
			</div>
			<div>
				<div class="choice">
					<div class="choice_choices">
						<label>选择角色：</label>
						<div style="margin-left: 20px;">
							<div class="select_js">
								<div class="seljuese" @click="seltanchu">
									<input class="selinput" type="text" disabled v-model="selnr" />
									<img src="../../../assets/img/seldown.png" alt="" v-if="seltan" />
									<img src="../../../assets/img/selup.png" alt="" v-else/>
								</div>
								<div class="seltan test-1" v-if="seltan">
									<div v-for="(item,index) in xz" class="selopt" @click="opt_click(item)" :key="index">{{item}}</div>
								</div>

							</div>
						</div>
					</div>
					<div class="choice_eject" >
						<span class='bi'></span>
                        <span @click="aaa">修改角色名称</span>
						<!--<img src="../../../assets/img/bi.png" />-->
						<!-- <span>
							<button @click="aaa()">修改角色名称</button>
						</span> -->
					</div>
				</div>
				<div class="explain">
					<span>
						说明： <br />
						1、具备该角色的用户登录后显示操作员工作台；<br />
						2、修改角色权限后，所有赋予此角色的员工账号对应权限均将修改； <br />
						3、系统管理员角色不允许改名，也不予许修改器操作权限；<br />
					</span>
					<span>
						4、“禁止查看产品订货价”不得与【产品管理、产品删除、产品导出、促销管理权限】同时勾选； <br />
						5、“禁止查看订单金额”不得与【订单修改、订/退单审核、财务审核、代下订/退单、订单产品统计查看、订单产品统计导出、发货统计查看、发货统计导出、资金所有权限、报表所有权限】同时勾选。<br /> 
						6、需要实现仅让业务员看到自己客户产品报价并且能代下单的场景，请勾选“禁止查看产品订货价”、“报价单查看”、“代下订单”权限。
					</span>
				</div>
			</div>
			<h4 class="h4">角色权限明细</h4>
			<!--账户角色-->
			<div class="form_div_three" v-for="(le,index) in list_le" :key="index">
				<div class="power_le_three">
					<div>
						{{le.name}}
					</div>
				</div>
				<div class="power_ri_box_three">
					<Row>
						<Col span="4" v-for="(ri,index) in le.list_ri" :key="index">
						<CheckboxGroup class="CheckboxGroup1">
							<Checkbox label="" class="Checkbox">{{ri}}</Checkbox>
						</CheckboxGroup>
						</Col>
					</Row>
				</div>
			</div>
		</div>
		<!--按钮-->

		<!--<Modal
		        v-model="modal1"
		        title="更改"
		        @on-ok="ok"
		        @on-cancel="cancel">
		      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
		        <FormItem label="更改" prop="name">
		            <Input v-model="formValidate.name" placeholder="请更改"></Input>
		        </FormItem>
		     </Form>
		 
		    </Modal>-->
		<div class="btn-bot">
			<button class="btn-save">保存</button>
			<button class="btn-cancel">取消</button>
		</div>

	</div>
</template>
<script>
	import api from '@/api/api'
	export default {

		data() {
			return {
				selnr: '',
				seltan: false,
				zishow: false,
				xz: ['系统管理员', '业务负责人', '订单审核员', '财务审核人', '发货审核人'],
				list_le: [{
						name: '系统管理员',
						list_ri: ['系统管理员', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', ],
					},
					{
						name: '责任管理员',
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
				//			 	  formValidate: {
				//                  name: '',
				//              },

			}
		},
		methods: {

			deve_in() {
				let _this = this;
				_this.$router.push({
					path: '/sys/user/main'
				});
			},
			deve() {
				let _this = this;
				_this.$router.push({
					path: '/sys/org/main'
				});
			},
			aaa() {
				let _this = this;
				_this.zishow = !_this.zishow;
			},
			seltanchu() {
				let _this = this;
				_this.seltan = !_this.seltan;
			},
			opt_click(item) {
				let _this = this;
				_this.selnr = item;
				_this.seltan = !_this.seltan;
			}

		},

		mounted() {

		},
	}
</script>
<style type="text/css">
	.ivu-checkbox-wrapper {
		font-size: 14px!important;
	}
	
	.power_le_three div {
		font-size: 14px!important;
	}
</style>
<style scoped>
	.developing_new {
		/*padding: 10px 0px;*/
		width: 100%;
	}
	
	.three_span {
		border-bottom: 1px solid #ccd9e6;
		padding: 0px 0 20px 0;
		margin-bottom: 20px;
	}
	
	.three_span span {
		margin-right: 80px;
		font-size: 16px;
	}
	
	.three_span span:hover {
		color: #00c1de;
		cursor: pointer;
	}
	
	.select_js {
		font-size: 14px;
		position: relative;
	}
	
	.form_box_js {
		width: 98%;
		background-color: #fff;
		padding: 20px 0 20px 20px;
		position: absolute;
		top: 45px;
		left: 2px;
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
	
	h4 {
		padding: 45px 0px 20px 0;
	}
	
	.h4 {
		font-size: 16px;
		color: #2e98ce;
		font-weight: normal;
	}
	
	.CheckboxGroup {
		display: flex;
		align-items: center;
		margin-left: 45px;
		margin-bottom: 20px;
	}
	
	.power_le {
		width: 128px;
		font-size: 12px;
		color: #0083c0;
	}
	
	.form_div_three {
		display: flex;
		border-top: 1px solid #e7e9f1;
		border-right: 1px solid #e7e9f1;
		border-left: 1px solid #e7e9f1;
		width: 100%;
	}
	
	.form_div_three:last-of-type {
		border-bottom: 1px solid #e7e9f1;
	}
	
	.power_le_three {
		width: 100px;
		height: 180px;
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
		padding: 10px 0 10px 0;
	}
	
	..ivu-checkbox-inner {
		border: 1px solid #269edc !important;
	}
	.explain{
		font-size: 13px;
	}
	
	.explain span {
		line-height: 23px;
	}
	
	.explain>span:nth-of-type(1) {
		color: #848d9c;
	}
	
	.explain>span:nth-of-type(2) {
		color: #e16d6d;
	}
	
	.choice {
		height: 40px;
		line-height: 40px;
		margin-bottom: 30px;
		margin-top: 20px;
		display: flex;
	}
	
	.choice_choices {
		display: flex;
		margin-right: 60px;
	}
	
	.choice_choices label {
		font-size: 14px;
		color: #414141;
	}
	
	.choice_choices select {
		width: 315px !important;
		height: 35px;
		border-radius: 5px;
	}
	
	.choice_choices div {
		width: 315px !important;
	}
	
	.choice_eject {
		display: flex;
		align-items: center;
        cursor: pointer;
	}
	
	.choice_eject span {
		color: #0083c0;
        font-size: 16px;
        margin-right: 6px;
	}
	
	/* .choice_eject button {
		border: none;
		background-color: white;
		font-size: 14px;
		padding-left: 0!important;
		margin-left: 10px;
	} */
	
	.ivu-row {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		align-items: center;
		height: 100%;
		margin-left: 30px;
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
	
	.ivu-modal-header p,
	.ivu-modal-header-inner {
		color: #0191d4 !important;
	}
	
	.bi {
		width: 15px;
		height: 21px;
		background: url(../../../assets/img/bi.png) no-repeat;
	}
	
	.choice_eject:hover .bi {
		width: 15px;
		height: 21px;
		background: url(../../../assets/img/bih.png) no-repeat;
	}
	
	.choice_eject:hover span {
		color: #35afe8;
	}
	
	/* .choice_eject:hover button {
		color: #35afe8;
	} */
	
	.seljuese {
		width: 316px;
		height: 34px;
		border: 1px solid #e1e7f6;
		border-radius: 5px;
		text-align: right;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.seljuese img {
		margin-right: 10px;
		width: 16px;
		height: 9px;
	}
	
	.seltan {
		width: 316px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
		background-color: #fff;
		position: absolute;
		top: 35px;
		border-radius: 5px;
		max-height: 280px;
		/*overflow: hidden;
		overflow-y: scroll;*/
	}
	
	.seltan div {
		padding-left: 10px;
		height: 40px;
	}
	
	.seltan div:hover {
		background-color: #eff1f8;
	}
	
	.selinput {
		border: none;
		background-color: #fff;
		width: 270px;
		height: 30px;
	}
</style>