<template>

	<div class="child-table">
		<div class="table-tbody">
			<div class="table-tr">
				<div class="table-td align_left" :style="{paddingLeft : model.level * 10 + 'px'}">
					<div class="classityTeite" @click="toggle">
						<Icon :type="open ? 'minus-round' : 'plus-round'" class='isOpenicon' v-if='model.children'></Icon>
						{{model.name}}
					</div>
				</div>
				<div class="table-td align_left" :style="{paddingLeft : model.level * 10 + 'px'}">
					<div class="classityTeite_r" @click="toggle">
						<p v-if="spani == 0">暂无</p>
						<span v-for="spani in spani">{{spani}}<Icon type="android-cancel"></Icon></span>
					</div>
				</div>
				<div class="table-td td_but">
					<!--<Button size='small' v-on:click='add'  v-if='model.level!==5'>添加子区域</Button>
                <Button size='small' v-on:click='toEdit'>编辑</Button>
                <Button size='small' v-on:click='moveUp'>上移</Button>
                <Button size='small' v-on:click='moveDown'>下移</Button>
                <Button class="dele"  size='small' v-on:click='isDel'>删除</Button>-->
					<Button class="addfenlei" size="small" v-on:click='add' v-if='model.level!==5'>添加子区域及负责人</Button>
					<!--<Button class="addfenlei" size="small" v-on:click='add_r' v-if='model.level!==5'>添加负责人</Button>-->
					<Button class="bianji" size="small" v-on:click='toEdit'></Button>
					<Button class="shangyi" size="small" v-on:click='moveUp'></Button>
					<Button class="xaiyi" size="small" v-on:click='moveDown'></Button>
					<Button class="dele" size="small" v-on:click='isDel'></Button>
				</div>
			</div>
			<!--bianji-->
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
					<Button @click="del">删除</Button>
					<Button @click='cancel'>取消</Button>
				</div>
			</Modal>

			<Modal v-model="clientClassifyModel" width="666">
				<!--title="新增子区域"-->
				<div class="div_tit">
					<span v-if="!div_tit">子区域</span>
					<span v-else>新增子区域</span>
				</div>

				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="135">

					<FormItem class="fontitem" label="上级区域:" prop="parentName">
						<Input v-model="parentName" disabled class="inputDisabled"></Input>
					</FormItem>
					<Form-item label="子级区域名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="子级区域名称"></Input>
					</Form-item>
					<Form-item label="子级区域编码:" prop="code">
						<Input v-model="compileForm.code" placeholder="子级区域编码"></Input>
					</Form-item>
					<Form-item label="子级区域负责人1:" prop="code">
						<Input v-model="compileForm.code" placeholder="子级区域负责人1"></Input>
					</Form-item>
					<Form-item label="子级区域负责人2:" prop="code">
						<Input v-model="compileForm.code" placeholder="子级区域负责人2"></Input>
					</Form-item>
					<!-- <Form-item label="EPR编码" prop="EPR">
                    <Input v-model="compileForm.EPR" placeholder="EPR编码"></Input>
                </Form-item> -->
					<Form-item label="子级区域描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="子级区域描述"></Input>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="addChild('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>

			<!--<Modal v-model="clientClassifyModel_r" title="添加负责人" width="666">
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="115">
				
					<Form-item label="选择一级区域:">
						 <Select v-model="model1" style="width:100%">
						        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    </Select>
					</Form-item>
					<Form-item label="选择二级区域:">
						 <Select v-model="model2" style="width:100%">
						        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    </Select>
					</Form-item>
				
					<Form-item label="区域负责人:">
						 <Select v-model="model3" style="width:100%">
						        <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    </Select>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="addChild('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>-->
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

				cityList: [{
						value: 'New York',
						label: 'New York'
					},
					{
						value: 'London',
						label: 'London'
					},
					{
						value: 'Sydney',
						label: 'Sydney'
					},
				],
				cityList2: [{
						value: 'New York',
						label: 'New York'
					},
					{
						value: 'London',
						label: 'London'
					},
					{
						value: 'Sydney',
						label: 'Sydney'
					},
				],
				cityList3: [{
						value: 'New York',
						label: 'New York'
					},
					{
						value: 'London',
						label: 'London'
					},
					{
						value: 'Sydney',
						label: 'Sydney'
					},
				],
				model1: '',
				model2: '',
				model3: '',
				spani: ['马云', '马化腾'],
				open: false,
				moveDownCount: 0,
				newValue1: '',
				newValue2: '',
				delModel: false,
				clientClassifyModel: false,
				clientClassifyModel_r: false,
				div_tit: false,
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
							message: '区域名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 100,
							message: '区域名称不能超过100个字符'
						}
					],
					code: [{
							required: true,
							message: '区域编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '区域编码不能超过30个字符'
						}
					],
					description: [{
							required: true,
							message: '区域描述不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 500,
							message: '区域描述不能超过500个字符'
						}
					]
				},
				parentName: '无', //父级分类名称
				isEdit: false

			}
		},
		methods: {
			aa() {
				let _this = this
				_this.open = !_this.open
			},
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
			add_r() {
				this.parentName = this.model.name;
				this.compileForm.parentId = this.model.id;
				this.clientClassifyModel_r = true;
			},
			addChild(name) {
				const _this = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
						console.log(_this.compileForm);
						if(!this.isEdit) {
							_this.axios({
									method: 'post',
									header: {
										"Content-Type": 'application/x-www-form-urlencoded'
									},
									url: api.region + api.regionAdd,
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
									url: api.region + api.regionModify,
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
				_this.div_tit = false;
				_this.axios(api.region + _this.model.id + api.regionGetById)
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
			//			上移
			moveUp(data) {
				if(data.id) {
					this.$emit('moveUp', data);
					return;
				}
				const _this = this;
				_this.axios(api.region + _this.model.id + api.regionMoveUp)
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

			//			下移
			moveDown(data) {
				const _this = this;
				if(data.id) {
					_this.$emit('moveDown', data);
					return;
				}
				_this.axios(api.region + _this.model.id + api.regionMoveDown)
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
							//_this.$Message.success('下移成功');
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
				_this.axios(api.region + _this.model.id + api.regionDel)
					.then(function(res) {
						console.log(res);
						if(res.data.status == 1) {
							if(_this.model.level !== 1) {
								_this.parentModel.children.splice(_this.index, 1);
								_this.delModel = false;
								_this.do_yn = true;
								_this.re_do = "删除成功";
								setTimeout(() => {
									_this.do_yn = false;

								}, 2000);

								//								_this.$Message.success('删除成功');
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
	.ivu-form-item {
		margin-bottom: 24px !important;
	}
	
	.table {
		display: block;
		width: 100%;
		margin: 10px;
	}
	
	.child-table {
		display: block;
		width: 100%;
	}
	
	button {
		padding: 0 18px;
		height: 30px;
		border: 0;
		border-radius: 3px;
		background: #fff;
		border: 1px #dddddd solid;
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
		display: flex;
		background: #fff;
	}
	
	.table-tr:hover {
		background: #ebf7ff;
	}
	
	.table-td {
		display: block;
		height: 30px;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
	}
	/*.table-td {
	    width: 200%;
	}*/
	
	.align_left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		text-align: left;
		padding-left: 30px;
		height: 60px;
		line-height: 60px;
		width: 50%;
	}
	
	.classityTeite {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 20px;
	}
	
	.classityTeite i {
		left: 0;
	}
	
	.classityTeite_r span {
		padding: 3px 5px;
		border: 1px solid #ddd;
		margin: 0 5px 0 0;
		border-radius: 3px;
	}
	
	.classityTeite_r i {
		margin: 0 0 0 5px;
	}
</style>