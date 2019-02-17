<template>
	<div class="prodectCategory">
		<Breadcrumb>
			<Breadcrumb-item>首页</Breadcrumb-item>
			<Breadcrumb-item>产品信息</Breadcrumb-item>
			<Breadcrumb-item>产品分类</Breadcrumb-item>
		</Breadcrumb>
		<Row type="flex" justify="end">
			<div class="buttonM">
				<Button type="warning" @click='addRoot'>新增一级分类</Button>
			</div>
			<div class="buttonM">
				<!--<Button type="info">导入</Button>-->
			</div>
			<div class="buttonM">
				<!--<Button type="info">导出</Button>-->
			</div>
			<!--<div class="buttonM">
				<Button type="info">模板下载</Button>
			</div>-->
		</Row>
		<div>
			<div class="table">
				<div class="table-header">
					<div class="table-td align_left" style="width:40%">分类名称</div>
					<div class="table-td" style='width:30%'>分类编码</div>
					<div class="table-td" style="width : 30%">操作</div>
				</div>
			</div>
		</div>
		<div class="qaz test-1">
			<treeTableProduct v-for='(classify , index) in data ' :key='index' :model='classify' :parentModel='data' :index='index' @moveUp='moveUp'></treeTableProduct>
		</div>

		<!--弹出窗-->
		<Modal v-model="clientClassifyModel" title="新增产品一级分类" @on-ok="confirm" @on-cancel="cancel">

			<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="80">
				<div class="prevClassName">
					<div class="title">上级分类</div>
					<div class="prevName">{{ parentName }}</div>
				</div>
				<Form-item label="分类名称" prop="name">
					<Input v-model.trim="compileForm.name" placeholder="分类名称"></Input>
				</Form-item>
				<Form-item label="分类编码" prop="code">
					<Input v-model.trim="compileForm.code" placeholder="分类编码"></Input>
				</Form-item>

				<Form-item label="图片" prop="imageUrl">
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
				<Button type="text" @click='cancel'>取消</Button>
				<Button type="info" @click="confirm('compileForm')">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import treeTableProduct from '@/components/goods/treeTable_product'
	export default {
		name: 'prodectCategory',
		components: {
			treeTableProduct: treeTableProduct
		},
		mounted() {
			const _this = this;
			// this.axios(api.category + api.categoryGetRoots)
			this.axios(api.rootProductCatalog+api.rootId+api.queryTreeById)
				.then(function(res) {
					_this.data = res.data.datas;
				})
				.catch(function(err) {
					console.log(err);
				})
		},
		data() {
			return {
				data: '',
				clientClassifyModel: false,
				loading: false,
				compileForm: {
					parentId: '',
					name: '',
					code: '',
					description: '',
					imageUrl: ''
				},
				ruleValidate: {
					name: [{
							required: true,
							message: '分类名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 50,
							message: '分类名称不能超过50个字符'
						}
					],
					code: [{
							required: true,
							message: '分类编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 64,
							message: '分类编码不能超过64个字符'
						}
					],
					description: [{
							required: true,
							message: '描述不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 255,
							message: '分类编码不能超过255个字符'
						}
					]
				},
				isUpload: false,
				uploadUrl: api.uploadFileUrl,
				uploadData: {
					path: 'product'
				},
				defaultList: [],
				imgUrl: '',
				parentName: '无',
				prevClass: null,

			}
		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}
		},
		methods: {
			show(index) {
				this.clientClassifyModel = true;
			},
			handleBeforeUpload() {
				this.isUpload = true;
			},
			mainImgSuccess(res, file, fileList) {
				this.isUpload = false;
				this.compileForm.imageUrl = res.url;
			},
			confirm(name) {
				const _this = this;
				let compileForm = {};
				compileForm.name = _this.compileForm.name;
				compileForm.parentId = _this.compileForm.parentId;
				compileForm.code = _this.compileForm.code;
				compileForm.imageUrl = _this.compileForm.imageUrl;
				//              compileForm.description = _this.compileForm.description;

				this.$refs[name].validate((valid) => {
					if(valid) {
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.rootProductCatalog+api.add,
								data: api.convertParam(compileForm)
							})
							.then(function(res) {
								console.log(res);
								if(res.data.status == 1) {
									_this.data.push(res.data.datas);
									_this.clientClassifyModel = false;
									_this.compileForm.name = '';
									_this.compileForm.parentId = '';
									_this.compileForm.code = '';
									_this.compileForm.imageUrl = '';
									_this.$Message.success('添加成功');
									_this.axios(api.rootProductCatalog+api.rootId+api.queryTreeById)
										.then(function(res) {
											_this.data = res.data.datas;
											console.log(res);
										})
										.catch(function(err) {
											console.log(err);
										})
								}
							})
					} else {
						return;
					}

				})

				// if(this.compileForm.name == '' || this.compileForm.code == ''){
				//     this.$Message.warning('分类名称和分类编码不能为空!');
				//     return;
				// }

			},
			addRoot() {
				this.parentName = '无';
				this.clientClassifyModel = true;
				// console.log(this.data);
			},
			moveUp(data) {},
			cancel() {
				// this.delModel = false;
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
	.prodectCategory {
		/*position: absolute;
		top: 0;
		left: 0;
		bottom:0;
		right: 0;
		background: #000;*/
	}

	.buttonM {
		margin-right: 10px;
	}
	
	.buttonM:nth-last-child(1) {
		margin: 0;
	}
	
	.ivu-form-item {
		margin-bottom: 20px;
	}
	
	.table {
		display: table;
		width: 100%;
		margin: 0;
	}
	
	.table-header {
		display: table-header-group;
		background: #f5f7f9;
		border: 1px solid #ddd;
	}
	
	.table-tbody {
		display: table-row-group;
	}
	
	.table-tr {
		display: table-row;
		background: #fff;
	}
	
	.table-tr:hover {
		background: #f9f9f9;
	}
	
	.table-td {
		display: table-cell;
		height: 30px;
		width: auto;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #ddd;
	}
	
	.align_left {
		text-align: left;
		padding-left: 30px;
	}
	
	.description {
		width: 100%;
		line-height: 18px;
		padding: 4px 7px;
		font-size: 12px;
		border: 1px solid #dddee1;
		border-radius: 4px;
		color: #495060;
		background-color: #fff;
		background-image: none;
		position: relative;
		cursor: text;
		transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}
	
	.qaz {
		width: 100%;
		height: 430px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		overflow: hidden;
		overflow-y: scroll;
	}
</style>