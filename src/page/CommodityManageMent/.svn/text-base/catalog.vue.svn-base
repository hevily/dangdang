<template>
	<div class="prodectCategory">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>产品信息</Breadcrumb-item>
			<Breadcrumb-item>产品品类</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
            <div class="btn-box-right">
                <button class="btn-new" @click.stop='addRoot'>新增一级品类</button>
                <button class="btn-cancel" type="info">导入</button>
                <button class="btn-cancel" type="info">导出</button>
            </div>
            <div class="table">
                <div class="table-header">
                    <div class="table-td align_left" style="width:40%;height: 50px!important;">
                        <div class="table-td-div ttd">品类名称</div>
                    </div>
                    <div class="table-td" style='width:30%;'>
                        <div class="table-td-div">品类编码</div>
                    </div>
                    <div class="table-td" style="width : 30%">
                        <div class="table-td-div">操作</div>
                    </div>
                </div>
            </div>
			<div class="table_qaz test-1">
				<treeTableProduct v-for='(classify , index) in data ' :key='index' :model='classify' :parentModel='data' :index='index' @moveUp='moveUp'></treeTableProduct>
			</div>

			<!--弹出窗-->
			<!--<Modal v-model="clientClassifyModel" title="新增产品一级分类" @on-ok="confirm" @on-cancel="cancel">
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="85">
					<div class="prevClassName">
						<div class="title">上级分类:</div>
						<div class="prevName">{{ parentName }}</div>
					</div>
					<Form-item label="分类名称:" prop="name">
						<Input v-model.trim="compileForm.name" placeholder="分类名称"></Input>
					</Form-item>
					<Form-item label="分类编码:" prop="code">
						<Input v-model.trim="compileForm.code" placeholder="分类编码"></Input>
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
					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>-->

			<Modal v-model="clientClassifyModel" width="666">
				<div slot="header" class="del_iti">
					<span>新增产品品类</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="85">
					<FormItem class="fontitem" label="上级品类:" prop="parentName">
						<Input v-model="parentName" disabled class="inputDisabled"></Input>
					</FormItem>
					<Form-item label="品类名称:" prop="name">
						<Input v-model.trim="compileForm.name" placeholder="品类名称"></Input>
					</Form-item>
					<Form-item label="品类编码:" prop="code">
						<Input v-model.trim="compileForm.code" placeholder="品类编码"></Input>
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
					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>

<script>
	import api from '@/api/api'
	import treeTableProduct from '@/page/CommodityManageMent/treeTable_product'
	import tis from '@/page/set/tishisub.vue'
	export default {
		name: 'prodectCategory',
		components: {
			treeTableProduct: treeTableProduct,
			tis: tis
		},
		mounted() {
			const _this = this;
			// this.axios(api.category + api.categoryGetRoots)
			this.axios(api.rootProductCatalog + api.rootId + api.queryTreeById)
			.then((res) => {
				this.data = res.data.datas;
			})
			.catch((err) => {
				console.log(err);
			})
		},
		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

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
							message: '品类名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 50,
							message: '品类名称不能超过50个字符'
						}
					],
					code: [{
							required: true,
							message: '品类编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 64,
							message: '品类编码不能超过64个字符'
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
							message: '品类编码不能超过255个字符'
						}
					]
				},
				isUpload: false,
				uploadUrl: api.uploadFileUrl,
				uploadData: {path: 'product'},
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
			gorun() {
				let _this = this;
				_this.$router.push('/brand');
				//  		  _this.$router.push('/goodsList');
			},
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
								header: {"Content-Type": 'application/x-www-form-urlencoded'},
								url: api.rootProductCatalog + api.add,
								data: api.convertParam(compileForm)
							})
							.then(function(res) {
								if(res.data.status == 1) {
									_this.data.push(res.data.datas);
									_this.clientClassifyModel = false;
									_this.compileForm.name = '';
									_this.compileForm.parentId = '';
									_this.compileForm.code = '';
									_this.compileForm.imageUrl = '';
									//_this.$Message.success('添加成功');
									_this.do_yn = true;
									_this.re_do = "添加成功";
									setTimeout(() => {_this.do_yn = false;}, 2000);
									_this.axios(api.rootProductCatalog + api.rootId + api.queryTreeById)
										.then(function(res) {
											_this.data = res.data.datas;
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
	.table_qaz {
		top: 136px!important;
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
		background: #eef1f9;
		border: 1px solid #e1e7f6;
	}
	
	.table-tbody {
		display: table-row-group;
	}
	
	.table-tr {
		display: table-row;
		background: #fff;
	}
	
	.table-td {
		display: table-cell;
		height: auto !important;
		vertical-align: middle;
		text-align: left;
		border-bottom: 0px solid #e1e7f6;
	}
	
	.align_left {
		text-align: left;
		padding-left: 30px;
	}
	
	.table-td-div {
		height: 25px;
		border-left: 1px solid #cdd9e6;
		display: flex;
		align-items: center;
		padding-left: 5px;
		font-weight: 600;
	}
</style>