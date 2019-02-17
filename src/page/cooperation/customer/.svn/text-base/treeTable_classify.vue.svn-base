<template>

	<div class="child-table">
		<div class="table-tbody">
			<div class="table-tr" style="display: flex;">
				<div class="table-td align_left modelname" :style="{paddingLeft : model.level * 30 + 'px'}">
					<div class="classityTeite" @click="toggle">
						<Icon :type="open ? 'minus-round' : 'plus-round'" class='isOpenicon' v-if='model.children'></Icon>
						{{model.name}}
					</div>
				</div>
				<div class="table-td caozuo">
					<!--<Button class="addfenlei" size='small' v-on:click='add' v-if='model.level!==5'>添加子分类</Button>-->
					<Button class="bianji" size="small" @click='toEdit'></Button>
					<Button class="shangyi" size="small" @click='moveUp'></Button>
					<Button class="xaiyi" size="small" @click='moveDown'></Button>
					<Button class="dele" size="small" @click='isDel'></Button>
				</div>
			</div>
			<div class="table-tr" v-if='model.children' v-show='open'>
				<tree-table v-for="(item , index) in model.children" :key='index' :model="item" :parentModel='model' :index='index' v-on:del='del' v-on:addChild='addChild' v-on:edit='edit' v-on:moveUp='moveUp' v-on:moveDown='moveDown'></tree-table>
			</div>

			<!--<Modal v-model="delModel" width="460">
				<p slot="header" class="del_p">
					<span>删除确认</span>
				</p>
				<div class="del_div">
					<p>你确定要删除吗？</p>
				</div>
				<div slot="footer" class="delbut">
					<Button @click="del">确定</Button>
					<Button @click='cancel'>取消</Button>
				</div>
			</Modal>-->
			<Modal v-model="delModel" width="460">
				<p slot="header" class="del_p">
					<span>删除确认</span>
				</p>
				<div class="del_div">
					<p>您确定要删除吗？</p>
				</div>
				<div slot="footer" class="delbut">
					<Button @click="del">删除</Button>
					<Button @click='cancel'>取消</Button>
				</div>
			</Modal>

			<!--<Modal v-model="clientClassifyModel">
				<h3 v-if="!this.isEdit">新增子分类</h3>
				<h3 v-else>编辑</h3>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="85">
					<div class="prevClassName">
						<div class="title">上级分类:</div>
						<div class="prevName">{{ parentName }}</div>
					</div>
					<Form-item label="分类名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="分类名称"></Input>
					</Form-item>
					<Form-item label="分类编码:" prop="code">
						<Input v-model="compileForm.code" placeholder="分类编码"></Input>
					</Form-item>
					<Form-item label="描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="分类描述"></Input>
					</Form-item>
				</Form>

			</Modal>-->

			<Modal v-model="clientClassifyModel" width="666">
				<div slot="header" class="del_iti">
					<span v-if="!div_tit">编辑</span>
					<span v-else>新增子分类</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="85">
					<FormItem class="fontitem" label="上级分类:" prop="parentName">
						<Input v-model="parentName" disabled class="inputDisabled"></Input>
					</FormItem>
					<Form-item label="分类名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="分类名称"></Input>
					</Form-item>
					<Form-item label="分类编码:" prop="code">
						<Input v-model="compileForm.code" placeholder="分类编码"></Input>
					</Form-item>
					<Form-item label="描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="分类描述"></Input>
					</Form-item>

				</Form>
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
				open: false,
				re_do: '',
				do_yn: false,
				do_no: false,
				// isFolder: this.model.child && this.model.child.length > 0,
				moveDownCount: 0,
				newValue1: '',
				newValue2: '',
				div_tit: false,
				delModel: false,
				clientClassifyModel: false,
				compileForm: {
					parentId: '',
					name: '',
					// EPR: '',
					code: '',
					description: ''
				},
				ruleValidate: {
					name: [{
							required: true,
							message: '分类名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 100,
							message: '分类名称不能超过100个字符'
						}
					],
					code: [{
							required: true,
							message: '分类编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '分类编码不能超过30个字符'
						}
					],
					description: [{
							required: true,
							message: '分类描述不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 500,
							message: '分类描述不能超过500个字符'
						}
					]
				},
				parentName: '无', //父级分类名称
				isEdit: false

			}
		},
		computed: {
			// this.routerName = this.$router.currentRoute.name;
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
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: api.category + api.cetegoryAdd,
									data: api.jsonData(_this.compileForm)
								})
								.then(function(res) {
									console.log(res);
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
									}
								})
						} else {
							const editInfo = _this.compileForm;
							editInfo.id = this.model.id;
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: api.category + api.cetegoryModify,
									data: api.jsonData(editInfo)
								})
								.then(function(res) {
									console.log(res);
									_this.model = res.data.datas;
									_this.clientClassifyModel = false;
									_this.compileForm.name = '';
									_this.compileForm.parentId = '';
									_this.compileForm.code = '';
									_this.compileForm.description = '';
								})
							this.isEdit = false;
						}
					}
				})

			},
			toEdit() {

				const _this = this;
				this.div_tit = false;
				_this.axios(api.category + _this.model.id + api.categoryGetById)
					.then(function(res) {
						var data = res.data.datas;
						console.log(data);

						if(res.data.status == 1) {
							_this.clientClassifyModel = true;
							_this.compileForm.name = data.name;
							_this.compileForm.parentId = data.parentId;
							_this.compileForm.code = data.code;
							_this.compileForm.description = data.description;
							_this.isEdit = true;
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
				_this.axios(api.category + _this.model.id + api.cetegoryMoveUp)
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

						}
					})

			},
			moveDown(data) {
				const _this = this;
				if(data.id) {
					_this.$emit('moveDown', data);
					return;
				}
				_this.axios(api.category + _this.model.id + api.cetegoryMoveDown)
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

						}
					})

			},
			del(data) {
				if(data.id) {
					this.$emit('del', data);
					return;
				}

				const _this = this;
				_this.axios(api.category + _this.model.id + api.cetegoryDelete)
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
				// console.log(this.$router.currentRoute.name);
				this.delModel = true;
			},
			cancel() {
				this.delModel = false;
				this.clientClassifyModel = false;
				this.compileForm.name = '';
				this.compileForm.parentId = '';
				// this.compileForm.EPR = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
			}
		}
	}
</script>

<style scoped>
	.table {
		display: block;
		width: 100%;
		margin: 10px;
	}
	
	.child-table {
		display: block;
		width: 100%;
	}
	
	.table-header {
		display: block;
		background: #eef1f9;
		border: 1px solid #e1e7f6;
		/*color: #fff;*/
	}
	
	.table-tbody {
		display: block;
	}
	
	.table-tr {
		display: block;
		background: #fff;
	}
	
	.table-tr:hover {
		background: #ebf7ff;
	}
	
	.child-table .table-tr .table-td {
		display: flex;
		height: 55px;
		align-items: center;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
	}
	
	.table-tr .table-td:first-child {
		width: 60%;
	}
	
	.table-tr .table-td:nth-of-type(2) {
		width: 40%;
	}
	/*.table-td {
	    width: 200%;
	}*/
	
	.align_left {
		text-align: left;
		padding-left: 30px;
	}
	
	.classityTeite {
		position: relative;
	}

	

	.caozuo {
		padding: 8px 0;
	}
</style>