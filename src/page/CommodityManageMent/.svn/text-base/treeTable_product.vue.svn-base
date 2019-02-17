<template>
	<div class="child-table">
		<div class="table-tr">
			<div class="table-td align_left" :style="{paddingLeft : model.level * 30 + 'px',width : '40%'}">
				<div class="classityTeite" @click="toggle">
					<Icon :type="open ? 'minus-round' : 'plus-round'" class='isOpenicon' v-if='model.children'></Icon>
					<img class="showimg" v-if='model.imageUrl' :src="model.imageUrl" alt="">{{model.name}}
				</div>
			</div>
			<div class="table-td" style="width:30%">
				{{model.code}}
			</div>
			<div class="table-td" style="width:30%;">
				<Button class="addfenlei" size="small" v-on:click='add' v-if='model.level!==5'>添加子品类</Button>
				<Button class="bianji" size="small" v-on:click='toEdit'></Button>
				<Button class="shangyi" size="small" v-on:click='moveUp'></Button>
				<Button class="xaiyi" size="small" v-on:click='moveDown'></Button>
				<Button class="dele" size="small" v-on:click='isDel'></Button>
			</div>
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
			<div slot="header" class="del_iti">
				<span v-if="!div_tit">编辑</span>
				<span v-else>新增子品类</span>
			</div>
			<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="85">
				<FormItem class="fontitem" label="上级品类:" prop="parentName">
					<Input v-model="parentName" disabled class="inputDisabled"></Input>
				</FormItem>
				<Form-item label="品类名称:" prop="name">
					<Input v-model="compileForm.name" placeholder="品类名称"></Input>
				</Form-item>
				<Form-item label="品类编码:" prop="code">
					<Input v-model="compileForm.code" placeholder="品类编码"></Input>
				</Form-item>
				<Form-item label="图片:" prop="imageUrl">
					<Upload :action="uploadUrl" class='inline-block' :on-success="mainImgSuccess" :headers='uploadHeader' :show-upload-list="false" :before-upload="handleBeforeUpload">
						<div class="addMainImg" v-if='!isUpload'>
							<Icon type="plus-round" size='20' v-if='!compileForm.imageUrl'></Icon>
							<img :src="compileForm.imageUrl" class="mainImg" v-else>
						</div>
						<div v-else>
							<Spin fix>上传中...</Spin>
						</div>
					</Upload>
				</Form-item>
			</Form>
			<div class="modelFooter" slot='footer'>
				<Button type="info" @click="addChild('compileForm')">确定</Button>
				<Button type="text" @click='cancel'>取消</Button>
			</div>
		</Modal>

		<div v-if='model.children' v-show='open'>
			<tree-table v-for="(item , index) in model.children" :key='index' :model="item" :parentModel='model' :index='index' v-on:del='del' v-on:addChild='addChild' v-on:edit='edit' v-on:moveUp='moveUp' v-on:moveDown='moveDown'></tree-table>
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

				data: this.model,
				open: false,
				div_tit: false,
				moveDownCount: 0,
				newValue1: '',
				newValue2: '',
				delModel: false,
				div_tit: false,
				clientClassifyModel: false,
				compileForm: {
					parentId: '',
					name: '',
					// EPR: '',
					code: '',
					imageUrl: ''
				},
				changeji: {
					id: '',
					name: '',
					// EPR: '',
					code: '',
					imageUrl: ''
				},
				ruleValidate: {
					name: [
						{required: true,message: '品类名称不能为空',trigger: 'blur'},
						{type: 'string',max: 100,message: '品类名称不能超过100个字符'}
					],
					code: [
						{required: true,message: '品类编码不能为空',trigger: 'blur'},
						{type: 'string',max: 30,message: '品类编码不能超过30个字符'}
					]
				},
				isUpload: false,
				uploadUrl: api.uploadFileUrl,
				uploadData: {
					path: 'product'
				},
				defaultList: [],
				imgUrl: '',
				parentName: '无', //父级分类名称
				isEdit: false,
				xig: ''
			}
		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {token_id: tokenId}
			}
		},
		methods: {
			toggle() {
				if(this.model.children) {
					this.open = !this.open
				}
			},
			handleBeforeUpload() {
				this.isUpload = true;
			},
			mainImgSuccess(res, file, fileList) {
				this.isUpload = false;
				this.compileForm.imageUrl = res.url;
			},
			add() {
				// this.xig = '新增子类';
				this.div_tit = true;
				this.parentName = this.model.name;
				this.compileForm.parentId = this.model.id;
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
									url: api.rootProductCatalog + api.add,
									data: api.convertParam(_this.compileForm)
								})
								.then(function(res) {
									//console.log(_this.parentModel);
									var thisid = _this.model.id;
									if(res.data.status == 1) {
										_this.axios({
												method: 'get',
												header: {"Content-Type": 'application/x-www-form-urlencoded'},
												url: api.rootProductCatalog + thisid + api.queryTreeById,
												//data: api.convertParam(_this.model.id)
											})
											.then(function(res) {
												_this.model = res.data.datas[0];
												//_this.model.children.push(res.data.datas);
											})
										if(_this.model.children) {
											_this.model.children.push(res.data.datas);
										} else {
											_this.model.children = [res.data.datas];
										}
										_this.clientClassifyModel = false;
										_this.compileForm.name = '';
										_this.compileForm.parentId = '';
										_this.compileForm.code = '';
										_this.compileForm.imageUrl = '';
										//_this.$Message.success('添加成功');
										_this.do_yn = true;
										_this.re_do = "添加成功";
										setTimeout(() => {_this.do_yn = false;}, 2000);
									}
								})
						} else {
							const editInfo = _this.compileForm;
							editInfo.id = this.model.id;
							var thisid = _this.model.id;
							_this.axios({
									method: 'post',
									header: {"Content-Type": 'application/x-www-form-urlencoded'},
									url: api.rootProductCatalog + api.modify,
									data: api.convertParam(editInfo)
								})
								.then(function(res) {
									_this.axios({
											method: 'get',
											header: {"Content-Type": 'application/x-www-form-urlencoded'},
											url: api.rootProductCatalog + thisid + api.queryById,
											//data: api.convertParam(_this.model.id)
										})
										.then(function(res) {
											_this.model = res.data.datas;
										})
									// _this.model = res.data.datas;
									_this.data = res.data.datas;
									_this.clientClassifyModel = false;
									_this.compileForm.name = '';
									_this.compileForm.parentId = '';
									_this.compileForm.code = '';
									_this.compileForm.imageUrl = '';
									//_this.$Message.success('修改成功');
									_this.do_yn = true;
									_this.re_do = "修改成功";
									setTimeout(() => {_this.do_yn = false;}, 2000);
								})
							this.isEdit = false;
						}
					}
				})
			},
			toEdit() {
				const _this = this;
				//				_this.xig = '修改';
				this.div_tit = false;
				_this.axios(api.rootProductCatalog + _this.model.id + api.queryById)
					.then(function(res) {
						let data = res.data.datas;
						if(res.data.status == 1) {
							_this.clientClassifyModel = true;
							_this.compileForm.name = res.data.datas.name;
							_this.parentName = res.data.datas.parentName;
							_this.compileForm.parentId = res.data.datas.parentId;
							_this.compileForm.code = res.data.datas.code;
							_this.compileForm.imageUrl = res.data.datas.imageUrl;
							_this.isEdit = true;
						} else {}
					})

			},
			edit() {
				// 	// this.$emit('edit',this.model);
			},
			//上移
			moveUp(data) {
				if(data.id) {
					this.$emit('moveUp', data);
					return;
				}
				const _this = this;
				_this.axios(api.rootProductCatalog + _this.model.id + api.moveUp)
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

							}, 2000); //							_this.$Message.error(res.data.message);
						}
					})
			},
			//下移
			moveDown(data) {
				const _this = this;
				if(data.id) {
					this.$emit('moveDown', data);
					return;
				}
				this.axios(api.rootProductCatalog + _this.model.id + api.moveDown)
					.then(function(res) {
						if(res.data.status == 1) {
							if(_this.model.level !== 1) {
								if(_this.index == _this.parentModel.children.length - 1) { return; }
								_this.newValue1 = _this.parentModel.children[_this.index + 1];
								_this.newValue2 = _this.model;
								_this.parentModel.children.splice(_this.index, 2, _this.newValue1, _this.newValue2);
								_this.$emit('moveDown', _this.model);
							} else {
								if(_this.index == _this.parentModel.length - 1) { return;}
								_this.newValue1 = _this.parentModel[_this.index + 1];
								_this.newValue2 = _this.model;
								_this.parentModel.splice(_this.index, 2, _this.newValue1, _this.newValue2);
								// _this.$emit('moveDown',_this.model);
							}
							//_this.$Message.success('下移成功');
							_this.do_yn = true;
							_this.re_do = "下移成功";
							setTimeout(() => {_this.do_yn = false;}, 2000);
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {_this.do_no = false;}, 2000);
							// _this.$Message.error(res.data.message);
						}
					})
			},
			//删除
			del(data) {
				if(data.id) {
					this.$emit('del', data);
					return;
				}
				const _this = this;
				_this.axios(api.rootProductCatalog + _this.model.id + api.deletes)
					.then(function(res) {
						if(res.data.status == 1) {
							if(_this.model.level !== 1) {
								_this.parentModel.children.splice(_this.index, 1);
								_this.delModel = false;
								//_this.$Message.success('删除成功');
								_this.do_yn = true;
								_this.re_do = "删除成功";
								setTimeout(() => {
									_this.do_yn = false;
								}, 2000);
								_this.$emit('del', _this.model);
							} else {
								_this.parentModel.splice(_this.index, 1);
								_this.delModel = false;
									_this.do_yn = true;
								_this.re_do = "删除成功";
								setTimeout(() => {
									_this.do_yn = false;
								}, 2000);
//								_this.$Message.success('删除成功');
								_this.$emit('del', _this.model);
							}
						} else if(res.data.status == 0) {
							_this.delModel = false;
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {_this.do_no = false;}, 2000);
							//_this.$Message.error(res.data.message);
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
				// this.compileForm.EPR = '';
				this.compileForm.code = '';
				this.compileForm.imageUrl = '';
			}
		}
	}
</script>

<style scoped>
	.child-table {
		display: block;
		width: 100%;
	}
	
	.table-tr {
		display: flex;
		justify-content: center;
		padding: 13px 0;
		border-bottom: 1px solid #e1e7f6;
	}
	
	.table-tr:hover {
		background: #ebf7ff;
	}
	
	.table-td {
		display: flex;
		align-items: center!important;
		height: auto !important;
		vertical-align: middle;
		text-align: left;
		border-bottom: 0px solid #fff !important;
	}
	
	.align_left {
		text-align: left;
		padding-left: 30px;
		display: flex!important;
		align-items: center!important;
	}
	
	.classityTeite {
		position: relative;
		display: flex!important;
		align-items: center!important;
	}
	
	.classityTeite img {
		width: 20px;
		height: auto;
		vertical-align: middle;
		margin-right: 5px;
	}
	
	.showimg {
		width: auto!important;
		height: 33px!important;
	}
	
	.classityTeite i {
		position: initial!important;
	}
</style>