<template>

	<div class="child-table">
		<div class="table-tbody">
			<div class="table-tr">
				<div class="table-td align_left" :style="{paddingLeft : model.level * 20 + 'px'}">
					<div class="classityTeite img_i" @click="toggle">
						<div :class="open ? 'packageb' : 'packagea'" class="packagea" v-if='model.children'></div>
						<div class="packagec" v-else></div>
						<!--<Icon :type="open ? 'minus-round' : 'plus-round'" class='isOpenicon' v-if='model.children'></Icon>-->
						<!--<img :type="open ? 'minus-round' : 'plus-round'" class='isOpenicon' v-if='model.children' alt="" />-->
						{{model.name}}
					</div>
				</div>
				<div class="table-td table-td_div">
					<!-- <Button type="buttom" class="addfenlei" v-if='model.level!==5' @click='add'>添加子部门</Button>
					<Button class="bianji" size="small" @click='toEdit'></Button>
					<Button class="shangyi" size="small" @click='moveUp'></Button>
					<Button class="xaiyi" size="small" @click='moveDown'></Button>
					<Button class="dele" size="small" @click='isDel'></Button> -->
					<span class="tab-oper" v-if='model.level!==5' @click='add'>添加子部门</span>
					<span class="tab-oper" size="small" @click='toEdit'>编辑</span>
					<span class="tab-oper" size="small" @click='moveUp'>上移</span>
					<span class="tab-oper" size="small" @click='moveDown'>下移</span>
					<span class="tab-oper" size="small" @click='isDel'>删除</span>
				</div>
			</div>
			<div class="table-tr" v-if='model.children' v-show='open'>
				<tree-table v-for="(item , index) in model.children" :key='index' :model="item" :parentModel='model' :index='index' v-on:del='del' v-on:addChild='addChild' v-on:edit='edit' v-on:moveUp='moveUp' v-on:moveDown='moveDown'></tree-table>
			</div>
			<Modal v-model="delModel" width="460">
				<p slot="header" class="del_p">
					<span>删除确认</span>
				</p>
				<div class="del_div">
					<p>您确定要删除吗？</p>
				</div>
				<div slot="footer" class="delbut">
					<Button @click="del">确认</Button>
					<Button @click='cancel'>取消</Button>
				</div>
			</Modal>

			<Modal v-model="clientClassifyModel" width="666">
				<div slot="header" class="del_iti">
					<span v-if="!div_tit">编辑</span>
					<span v-else>新增子部门</span>
				</div>

				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="80">

					<FormItem class="fontitem" label="上级部门:" prop="parentName">
						<Input v-model="parentName" disabled class="inputDisabled"></Input>
					</FormItem>
					<Form-item label="部门名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="部门名称"></Input>
					</Form-item>
					<Form-item label="部门编码" prop="code">
						<Input v-model="compileForm.code" placeholder="部门编码"></Input>
					</Form-item>
					<Form-item label="ERP编码" prop="EPR">
						<Input v-model="compileForm.EPR" placeholder="EPR编码"></Input>
					</Form-item>
					<Form-item label="部门描述" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="部门描述"></Input>
					</Form-item>
				</Form>
				<!--<div class="modelFooter" slot='footer'>
					<Button class="child_sure_btn" type="info" @click="addChild('compileForm')">确定</Button>
					<Button class="child_no_btn" type="text" @click='cancel'>返回</Button>
				</div>-->
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="addChild('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>

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

		name: 'treeTable',
		props: ['model', 'index', 'parentModel'],
		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

				open: false,
				div_tit: false,
				moveDownCount: 0,
				newValue1: '',
				newValue2: '',
				delModel: false,
				clientClassifyModel: false,
				compileForm: {
					parentId: '',
					name: '',
					code: '',
					description: ''
				},
				ruleValidate: {
					name: [{
							required: true,
							message: '部门名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 100,
							message: '部门名称不能超过100个字符'
						}
					],
					code: [{
							required: true,
							message: '部门编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '部门编码不能超过30个字符'
						}
					],
					description: [{
							required: true,
							message: '部门描述不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 500,
							message: '部门描述不能超过500个字符'
						}
					]
				},
				parentName: '无', //父级分类名称
				isEdit: false
			}
		},
		methods: {
			toggle() {
				if(this.model.children) {
					this.open = !this.open
				}
			},
			add() {
				this.parentName = this.model.name;
				this.compileForm.parentId = this.model.id;
				this.div_tit = true;
				this.clientClassifyModel = true;
			},
			addChild(name) {
				const _this = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(!this.isEdit) {
							//							alert("添加");
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: api.sysDepartment + api.sysDepartmentAdd,
									data: api.convertParam(_this.compileForm)
								})
								.then(function(res) {
									if(res.data.status == 1) {
										if(_this.model.children) {
											_this.model.children.push(res.data.datas);
										} else {
											_this.model.children = [res.data.datas];

										}
										_this.clientClassifyModel = false;
										_this.compileForm.name = '';
										_this.compileForm.parentId = '';
										_this.compileForm.code = '';
										_this.compileForm.description = '';
										//			 				    location.reload();
										//										_this.$Message.success("添加成功");
										_this.do_yn = true;
										_this.re_do = "添加成功";
										setTimeout(() => {
											_this.do_yn = false;
										}, 2000);

										//										setTimeout(() => {
										//											_this.$router.go(0)
										//										}, 2000);
									}
								})
						} else {
							//							alert("修改");
							const editInfo = _this.compileForm;
							editInfo.id = this.model.id;
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: api.sysDepartment + api.sysDepartmentModify,
									data: api.convertParam(editInfo)
								})
								.then(function(res) {

									if(res.data.status == 1) {
										if(_this.model.children) {
											_this.model.children.push(res.data.datas.children);

										} else {
											//alert("2");
											_this.model.children = [res.data.datas];

											//			 			    		_this.$Message.error(res.data.message);

										}
										_this.model = res.data.datas;
										_this.data = res.data.datas;

										_this.clientClassifyModel = false;
										_this.compileForm.name = '';
										_this.compileForm.parentId = '';
										_this.compileForm.code = '';
										_this.compileForm.description = '';
										//			 			    	location.reload();
										//										_this.$Message.success("修改成功");
										_this.do_yn = true;
										_this.re_do = "修改成功";
										setTimeout(() => {
											_this.do_yn = false;
										}, 2000);

										setTimeout(() => {
											_this.$router.go(0)
										}, 2000);
									} else {
										_this.do_no = true;
										_this.re_do = res.data.message;
										setTimeout(() => {
											_this.do_no = false;
										}, 2000);

										//										_this.$Message.error(res.data.message);
									}
								})
							this.isEdit = false;
						}
					}
				})
			},
			//修改
			toEdit() {
				const _this = this;
				_this.div_tit = false;
				_this.axios(api.sysDepartment + _this.model.id + api.sysDepartmentQueryById)
					.then(function(res) {
						var data = res.data.datas;
						if(res.data.status == 1) {
							_this.clientClassifyModel = true;
							_this.compileForm.name = data.name;
							_this.compileForm.parentId = data.parentId;
							_this.compileForm.code = data.code;
							_this.compileForm.description = data.description;
							_this.isEdit = true;
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
			edit() {
				// 	// this.$emit('edit',this.model);
			},
			moveUp(data) {
				if(data.id) {
					this.$emit('moveUp', data);
					return;
				}
				const _this = this;
				_this.axios(api.sysDepartment + _this.model.id + api.sysDepartmentMoveUp)
					.then(function(res) {
						// console.log(res);
						if(res.data.status == 1) {

							if(_this.model.level !== 1) {
								// console.log(data);
								if(_this.index == 0) {
									return;
								}
								// console.log(this.parentModel);
								_this.newValue1 = _this.model;
								_this.newValue2 = _this.parentModel.children[_this.index - 1];
								_this.parentModel.children.splice(_this.index - 1, 2, _this.newValue1, _this.newValue2);
								_this.$emit('moveUp', _this.model);
							} else {

								if(_this.index == 0) {
									return;
								}
								_this.newValue1 = _this.model;
								_this.newValue2 = _this.parentModel[_this.index - 1];
								_this.parentModel.splice(_this.index - 1, 2, _this.newValue1, _this.newValue2);
							}
							//							_this.$Message.success('上移成功');
							_this.do_yn = true;
							_this.re_do = "上移成功";
							setTimeout(() => {
								_this.do_yn = false;
							}, 2000);

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
			moveDown(data) {
				const _this = this;
				if(data.id) {
					_this.$emit('moveDown', data);
					return;
				}
				_this.axios(api.sysDepartment + _this.model.id + api.sysDepartmentMoveDown)
					.then(function(res) {
						if(res.data.status == 1) {
							if(_this.model.level !== 1) {

								if(_this.index == _this.parentModel.children.length - 1) {
									return;
								}
								_this.newValue1 = _this.parentModel.children[_this.index + 1];
								_this.newValue2 = _this.model;
								_this.parentModel.children.splice(_this.index, 2, _this.newValue1, _this.newValue2);
								_this.$emit('moveDown', _this.model);
							} else {

								if(_this.index == _this.parentModel.length - 1) {
									return;
								}
								_this.newValue1 = _this.parentModel[_this.index + 1];
								_this.newValue2 = _this.model;
								_this.parentModel.splice(_this.index, 2, _this.newValue1, _this.newValue2);
								// _this.$emit('moveDown',_this.model);
							}
							//							_this.$Message.success('下移成功');
							_this.do_yn = true;
							_this.re_do = "下移成功";
							setTimeout(() => {
								_this.do_yn = false;
							}, 2000);

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
			del(data) {
				if(data.id) {
					this.$emit('del', data);
					return;
				}

				const _this = this;
				_this.axios(api.sysDepartment + _this.model.id + api.sysDepartmentDel)
					.then(function(res) {
						console.log(res);
						if(res.data.status == 1) {
							if(_this.model.level !== 1) {
								_this.parentModel.children.splice(_this.index, 1);
								_this.delModel = false;
								//								_this.$Message.success('删除成功');
								_this.do_yn = true;
								_this.re_do = "删除成功";
								setTimeout(() => {
									_this.do_yn = false;
								}, 2000);

								_this.$emit('del', _this.model);
							} else {
								_this.parentModel.splice(_this.index, 1);
								_this.delModel = false;
								//								_this.$Message.success('删除成功');
								_this.do_yn = true;
								_this.re_do = "删除成功";
								setTimeout(() => {
									_this.do_yn = false;
								}, 2000);
								_this.$emit('del', _this.model);
							}
						} else if(res.data.status == 0) {
							_this.delModel = false;
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;
							}, 2000);

							//							_this.$Message.error(res.data.message);
						}
					})

			},
			isDel() {
				this.delModel = true;
			},
			cancel() {
				this.delModel = false;
				this.clientClassifyModel = false;
				this.compileForm.name = '';
				this.compileForm.parentId = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
			}
		}
	}
</script>

<style scoped>
	.child-table .table {
		display: table;
		width: 100%;
		margin: 10px;
	}
	
	.child-table .child-table {
		display: table;
		width: 200%;
	}
	
	.child-table .table-header {
		display: table-header-group;
		background: #eef1f9;
		border: 1px solid #e1e7f6;
		/*color: #fff;*/
	}
	
	.child-table .table-tbody {
		display: table-row-group;
	}
	
	.child-table .table-tr {
		display: table-row;
		background: #fff;
		height: 60px;
	}
	
	.child-table .table-tr:hover {
		background: #ebf7ff;
	}
	
	.child-table .table-td {
		display: table-cell;
		height: 44px;
		width: 50%;
		vertical-align: middle;
		text-align: right;
		border-bottom: 1px solid #e1e7f6;
	}
	
	.child-table .table-td_div div {
		display: inline-block;
		/*float: left;*/
	}
	
	.child-table .table-td_div div button {
		font-size: 13px;
	}
	
	.child-table .table-td_div img {
		float: left;
		margin-top: 24px;
		width: 12px;
	}
	
	.child-table .align_left {
		text-align: left;
		padding-left: 30px;
	}
	
	.child-table .classityTeite {
		position: relative;
	}
	
	.child-table .isOpenicon {
		top: 19px;
	}

	.child-table .img_i img {
		float: left;
		margin-top: 10px;
		width: 14px;
	}
	
	.child-table .ivu-modal-header p,
	.child-table .ivu-modal-header-inner {
		color: #0191d4;
	}
	
	.child-table .child_no_btn:hover {
		background: #faa600!important;
		color: white!important;
		border-color: #faa600!important;
	}
	
	.child-table .child_sure_btn:hover {
		background: white!important;
		color: #faa600!important;
		border-color: #faa600!important;
	}
	
	.div_tit {
		height: 56px;
		line-height: 56px;
		padding: 0 0 0 20px;
	}
	
	.div_tit span {
		font-size: 16px;
		border-left: 1px solid #ddd;
		padding-left: 5px;
	}
	
	.packagea {
		width: 22px;
		height: 18px;
		background: url(../../assets/img/packagea.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
		margin-right: 10px;
	}
	
	.area .table-tr .table-tbody .table-td:hover .packagea {
		background: url(../../assets/img/packagea_click.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.packageb {
		width: 22px;
		height: 18px;
		background: url(../../assets/img/packageb.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
		margin-right: 10px;
	}
	
	.area .table-tr .table-tbody .table-td:hover .packageb {
		background: url(../../assets/img/packageb_click.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.packagec {
		width: 22px;
		height: 18px;
		background: url(../../assets/img/packagec.png) no-repeat;
		background-size: 100% 100%;
		display: inline-block;
		margin-right: 10px;
	}
	
	.area .table-tr .table-tbody .table-td:hover .packagec {
		background: url(../../assets/img/packagec_click.png) no-repeat;
		background-size: 100% 100%;
	}
</style>