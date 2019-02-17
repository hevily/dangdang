<template>
	<div class="shuxingjia">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>产品</Breadcrumb-item>
			<Breadcrumb-item>
				<router-link to='/goodsList'>
					产品列表
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>
				<span class="link_span ok_link" v-if="isModify">编辑产品</span><span class="link_span ok_link" v-else>产品新增</span>
			</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp addGoods test-1">
				<div>
					<Form ref="formItem" :model="formItem" :rules="goodsRule" :label-width="120">
						<Row>
							<Col span="12" class='span8'>
							<Form-item label="产品名称" prop='name'>
								<Input type="text" v-model="formItem.name" placeholder="最多输入100个字符"></Input>
							</Form-item>
							</Col>
							<Col span="12" class='span8'>
							<Form-item label="产品编码" prop='code'>
								<Input type="text" v-model="formItem.code" placeholder="最多输入100个字符" @on-blur='changeskucode()'></Input>
							</Form-item>
							</Col>
							<Col span="12" class='span8'>
							<Form-item label="型号" prop='spec'>
								<Input type="text" v-model="formItem.spec" placeholder="最多输入100个字符"></Input>
							</Form-item>
							</Col>
							<Col span="12" class='span8'>
							<Form-item label="产品分类" prop='catalog'>
								<!--<Cascader :data="CatalogList" v-model='formItem.catalog' trigger='hover'></Cascader>-->
								<!--<span>品类：</span>-->
								<Cascader class="cas_dev" placeholder="请选择" size="large" v-model='formItem.catalog' :data="CatalogList" :render-format="format" change-on-select></Cascader>
								<!--<Select v-model='formItem.catalog'   @keyup.native='enter($event)'>
				                    <Option v-for="item in CatalogList" :data="CatalogList" trigger='hover' :value="item.name" :key="item">{{ item.name }}</Option>
				               	</Select>-->
							</Form-item>
							</Col>
							<Col span="12" class='span8'>
							<Form-item label="产品品牌" prop='brandId'>
								<Select v-model="formItem.brandId" placeholder="请选择" not-found-text='当前选项没有数据'>
									<Option v-for='(brand , index) in brandList' :key='index' :value="brand.id">{{brand.name}}</Option>
								</Select>
							</Form-item>
							</Col>
							<Col span="12" class='span8'>
							<Form-item label="条形码" prop='barCode'>
								<Input type="text" v-model="formItem.barCode" placeholder="最多输入100个字符"></Input>
							</Form-item>
							</Col>
							<Col span="12" class='span8'>
							<Form-item label="主计量单位" prop='unitId' not-found-text='当前选项没有数据'>
								<Select v-model="formItem.unitId" placeholder="请选择">
									<Option v-for='(unit , index) in unitList' :key='index' :value="unit.id">{{unit.name}}</Option>
								</Select>
							</Form-item>
							</Col>
							<Col span="12" class='span8'>
							<Form-item label="库存初始数量" prop='inventoryQty'>
								<Input type="text" v-model="formItem.inventoryQty" number></Input>
							</Form-item>
							</Col>
							<Col span="12" class='span8'>
							<Form-item label="排序号" prop='orderNum'>
								<Input type="text" v-model="formItem.orderNum" number></Input>
							</Form-item>
							</Col>
							<Col span="12" class='span8'>
							<Form-item label="上下架" prop='status'>
								<i-switch v-model='formItem.isUp' @on-change="change(formItem)">
									<Icon type="android-done" slot="open"></Icon>
									<Icon type="android-close" slot="close"></Icon>
								</i-switch>
							</Form-item>
							</Col>
							<Col span="8" class='span8'>
							<Form-item label="销售价" prop='price'>
								<Input type="text" v-model="formItem.price" number></Input>
								<!-- <Input-number :max="99999999" :min="0" v-model="formItem.costPrice"></Input-number> -->
							</Form-item>
							</Col>
							<Col span="8" class='span8'>
							<Form-item label="成本价格" prop='costPrice'>
								<Input type="text" v-model="formItem.costPrice" number></Input>
								<!-- <Input-number :max="99999999" :min="0" v-model="formItem.costPrice"></Input-number> -->
							</Form-item>
							</Col>
							<Col span="8" class='span8'>
							<Form-item label="起订量" prop='minimumOrderQuantity'>
								<Input type="text" v-model="formItem.minimumOrderQuantity" number></Input>
								<!-- <Input-number :max="9999999999" :min="0" v-model="formItem.minimumOrderQuantity"></Input-number> -->
							</Form-item>
							</Col>
							<Col span="24" class='span8'>
							<Form-item label="支持定制" prop='dingzhi'>
								<i-switch v-model='dingzhi' @on-change="changeding(formItem)">
									<Icon type="android-done" slot="open"></Icon>
									<Icon type="android-close" slot="close"></Icon>
								</i-switch>
							</Form-item>
							</Col>
						</Row>
						<h4>产品属性</h4>
						<div class="set_box" style="padding-top: 10px;">
							<Form ref="formItem" :model="formItem" :rules="goodsRule" :label-width="30">
								<Row>
									<Col span="24" class='span8'>
									<Form-item label="">
										<Row>
											<Col span='24' v-for='(attrItem,index) in attrList' :key='index'>
											<label class="goodsAttr">{{attrItem.name}}</label>
											<Checkbox-group v-model='attrCheck[index]' @on-change='checkedAttr' @click.native='attrindex = index'>
												<Checkbox v-for='(item,index) in attrItem.productAttributeValues' :key='index' :label="item.name"></Checkbox>
											</Checkbox-group>
											</Col>
											<Icon type="android-add-circle" class='attrAdd' @click.native='seleckAttr'></Icon>
										</Row>
									</Form-item>
									</Col>
									<Col span="24" class='span8' v-show="dingzhi">
									<Form-item label="支持定制的属性：">
										<Row>
											<Col span='24'>
											<div style="display: flex;">
												<div style="display: flex;flex-direction: column;">
													<CheckboxGroup v-model="seldzd" style="display: flex;flex-direction: column;">
														<Checkbox v-for='(attrItem,index) in formItem.spuAttributes' :label="attrItem.attributeName" @click.native='selsx_dz(index)' style="height: 44px;" :key="index"></Checkbox>
													</CheckboxGroup>
												</div>
												<div style="display:flex;flex-direction: column;">
													<div v-for='(attrItem,index) in formItem.spuAttributes' style="margin-bottom: 10px;" :key="index">
														<!--<span style="margin-left: 20px;">提示信息</span> -->
														<Input v-if='formItem.spuAttributes[index].canCustomMade==0' placeholder="提示信息" type="text" :class="attrItem.attributeId" v-model="attrItem.customMadeTip" disabled style="width:400px"></Input>
														<Input v-else type="text" :class="attrItem.attributeId" placeholder="提示信息" @on-blur='inputsx_dz(index)' v-model="attrItem.customMadeTip" style="width:400px"></Input>
													</div>
												</div>
											</div>
											<!--<label class="goodsAttr">{{attrItem.attributeName}}</label>-->
											<!--<Checkbox-group v-model='attrCheck[index]' @on-change='checkedAttr' @click.native='attrindex = index'>
												<Checkbox v-for='(item,index) in attrItem.productAttributeValues' :key='index' :label="item.name"></Checkbox>
											</Checkbox-group>-->
											</Col>
											<!--<Icon type="android-add-circle" class='attrAdd' @click.native='seleckAttr'></Icon>-->
										</Row>
									</Form-item>
									</Col>
									<Col span='24' class='span8 dingzlb' v-show='SKUstate'>
									<Form-item label="产品属性列表：">
										<div class="table">
											<div class="table-header">
												<div class="table-td bold">主图</div>
												<div class="table-td bold" v-for='(attr,index) in attrList' :key='index'>{{attr.name}}</div>
												<div class="table-td bold">SKU编码</div>
												<div class="table-td bold">成本价格</div>
												<div class="table-td bold">销售价格</div>
												<div class="table-td bold">起订量</div>
												<div class="table-td bold">库存设置</div>
												<div class="table-td bold">上下架</div>
												<div class="table-td bold">操作</div>
											</div>
											<div class="table-tbody">
												<div class="table-tr" v-for='(sku , index) in formItem.skus' :key='index'>
													<div class="table-td" style='padding:10px 10px;'>
														<Upload :action="uploadUrl" :show-upload-list="false" :on-success="skuMainImgSuccess" :headers='uploadHeader' :data='uploadData' @click.native='skuItem = sku; mainImgIndex = index'>
															<div class="addImg">
																<!--<img :src="formItem.imageUrl" class="mainImg" v-if='!sku.imageUrl&!formItem.imageUrl'>-->
																<Icon type="plus-round" size='20' v-if='!sku.imageUrl'></Icon>
																<img :src="sku.imageUrl" class="mainImg" v-else>
															</div>
														</Upload>
													</div>
													<div class="table-td" style='width : 50px;' v-for='attr in sku.productSkuAttributes'>
														{{attr.attributeValueName}}
													</div>
													<div class="table-td">
														<div style="position: relative;">
															<input class="tableinput" :placeholder="formItem.code + '_'" v-model="sku.code" @blur="changecode(index)"></input>
															<div v-if='sku.code==null' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.code.length==0' class="ivu-form-item-error-tip tabletip errotip">编码为必填项</div>
															<div v-else-if='sku.code.lengt>64' class="ivu-form-item-error-tip tabletip errotip">最多64位数</div>
															<div v-else class="ivu-form-item-error-tip tabletip"></div>
														</div>
													</div>
													<div class="table-td">
														<div style="position: relative;">
															<input class="tableinput" v-model="sku.costPrice"></input>
															<div v-if='sku.costPrice==null' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.costPrice.length==0' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.costPrice.toString().split(".")[1]== null||sku.costPrice.toString().split(".")[1]== undefined' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.costPrice.toString().split(".")[1].length>2' class="ivu-form-item-error-tip tabletip errotip">最多两位小数</div>
															<div v-else class="ivu-form-item-error-tip tabletip"></div>
														</div>
													</div>
													<div class="table-td">
														<div style="position: relative;">
															<input class="tableinput" v-model="sku.price"></input>
															<div v-if='sku.price==null' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.price.length==0' class="ivu-form-item-error-tip tabletip errotip">销售价格必填项</div>
															<div v-else-if='sku.price.toString().split(".")[1]== null||sku.price.toString().split(".")[1]== undefined' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.price.toString().split(".")[1].length>2' class="ivu-form-item-error-tip tabletip errotip">最多两位小数</div>
															<div v-else class="ivu-form-item-error-tip tabletip"></div>
														</div>
													</div>
													<div class="table-td">
														<div style="position: relative;">
															<input class="tableinput" v-model="sku.minimumOrderQuantity"></input>
															<div v-if='sku.minimumOrderQuantity==null' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.minimumOrderQuantity.length==0' class="ivu-form-item-error-tip tabletip errotip">起订量必填项</div>
															<div v-else-if='sku.minimumOrderQuantity.toString().split(".")[1]== null||sku.minimumOrderQuantity.toString().split(".")[1]== undefined' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.minimumOrderQuantity.toString().split(".")[1].length>4' class="ivu-form-item-error-tip tabletip errotip">最多四位小数</div>
															<div v-else class="ivu-form-item-error-tip tabletip"></div>
														</div>
													</div>
													<div class="table-td">
														<div style="position: relative;">

															<input class="tableinput" v-model="sku.inventoryQty"></input>
															<div v-if='sku.inventoryQty==null' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.inventoryQty.length==0' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.inventoryQty.toString().split(".")[1]== null||sku.inventoryQty.toString().split(".")[1]== undefined' class="ivu-form-item-error-tip tabletip"></div>
															<div v-else-if='sku.inventoryQty.toString().split(".")[1].length>4' class="ivu-form-item-error-tip tabletip errotip">最多四位小数</div>
															<div v-else class="ivu-form-item-error-tip tabletip"></div>
														</div>
													</div>
													<div class="table-td">
														<i-switch size="large" v-model='sku.isUp' @on-change='change(sku)'>
															<span slot="open">上架</span>
															<span slot="close">下架</span>
														</i-switch>
													</div>
													<div class="table-td">
														<Button type="text" @click='del(index)'>删除</Button>
													</div>
												</div>
											</div>
										</div>
									</Form-item>
									</Col>
								</Row>
							</Form>
						</div>
						<h4>主图</h4>
						<div class="appendixUpload_img">
							<Upload :action="uploadUrl" class='inline-block' :on-success="mainImgSuccess" :headers='uploadHeader' :show-upload-list="false">
								<div class="addMainImg" style="width: 100px;height: 100px;">
									<Icon type="plus-round" size='20' v-if='!formItem.imageUrl'></Icon>
									<img :src="formItem.imageUrl" class="mainImg" v-else>
								</div>
							</Upload>
						</div>
						<h4>相关图片</h4>
						<div class="upload" v-if="isModify">
							<div class="appendixUpload">
								<!--<label class="uploadLabel" style='width:120px;text-align:right;'>相关图片</label>-->
								<div class="demo-upload-list" v-for="(item,index) in formItem.images">
									<!-- <template v-if="item.status === 'finished'"> -->
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
									</div>
									<!-- </template> -->
									<!-- <template v-else> -->
									<!-- <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress> -->
									<!-- </template> -->
								</div>
								<Upload v-bind:class='{yinc: noneblock}' :show-upload-list="false" :on-success="handleSuccess" :on-error='handleError' :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :headers='uploadHeader' multiple type="drag" :action="uploadUrl" style="display: inline-block;width:60px;">
									<div style="width: 60px;height:60px;line-height: 60px;">
										<Icon type="plus-round" size="20">
										</Icon>
									</div>
								</Upload>
								<span style="display: block; color: #f00;margin: 10px 0 0 0;">
										注意事项:最多只能上传20张图片
							</span>
								<Modal title="查看图片" v-model="visible">
									<img :src="imgUrl" v-if="visible" style="width: 100%">
								</Modal>
							</div>
						</div>
						<div class="upload" v-else>
							<div class="appendixUpload">
								<!--<label class="uploadLabel" style='width:120px;text-align:right;'>相关图片</label>-->
								<div class="demo-upload-list" v-for="item in formItem.images">
									<!-- <template v-if="item.status === 'finished'"> -->
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
									</div>
									<!-- </template> -->
									<!-- <template v-else> -->
									<!-- <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress> -->
									<!-- </template> -->
								</div>
								<Upload ref="upload" v-if="this.firstimgnum < 3" :show-upload-list="false" :on-success="handleSuccess" :on-error='handleError' :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :headers='uploadHeader' multiple type="drag" :action="uploadUrl" style="display: inline-block;width:60px;">
									<div style="width: 60px;height:60px;line-height: 60px;">
										<Icon type="plus-round" size="20">
										</Icon>
									</div>
								</Upload>
								<span style="display: block; color: #f00;margin: 10px 0 0 0;">
										注意事项:最多只能上传5张图片
							</span>
								<Modal title="查看图片" v-model="visible">
									<img :src="imgUrl" v-if="visible" style="width: 100%">
								</Modal>
							</div>
						</div>
						<!--</Col>-->
						<h4>产品描述</h4>
						<div>
							<!--<Col span='24' class='span8 spante'>-->
								<editor id="editor_id" height="500px" width="100%" :content="formItem.description" pluginsPath="/static/kindeditor/plugins/" :loadStyleMode="false" @on-content-change="onContentChange"></editor>
								<!--:options="editorOption"-->
								<quill-editor v-model="formItem.description" ref="myQuillEditor">
									@blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"
								</quill-editor>
								<script id='editor' type="text/plain"></script>
								<!--<textarea name="" rows="" cols=""></textarea>-->
							<!--</Col>-->
						</div>
						<h4>产品附件</h4>
						<div class="sc_box">
							<Upload :action="uploadUrl" class='inline-block' :on-success="attachmentsSuccess" :headers='uploadHeader' :data='uploadData' :default-file-list="defaultList">
								<!--<Button type="ghost" icon="ios-cloud-upload-outline" >添加附件</Button>-->
								<div class="sc_box-div">
									<img src="../../assets/img/fj_le.png" />
									<label>添加附件</label>
									<!--{{ uploadList }}-->
									<div style="min-width: 450px;font-size: 14px;"></div>
									<span style="color: rgba(0,0,0,.3);">(产品附件最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF、RAR、ZIP)</span>
								</div>
							</Upload>
						</div>
						<div class="showfile">
							<ul>
								<li v-for='(file,index) in formItem.attachments'><span>{{file.fileName}}</span>
									<span @click='delfile(index)'><Icon type="close-circled" ></Icon></span>
								</li>
							</ul>
						</div>

					</Form>
				</div>
			<!--<div class="demo-spin-col" span="8" v-if='spinShow'>
				<Spin fix>
					<Icon type="load-c" size=35 class="demo-spin-icon-load"></Icon>
					<div>Loading</div>
				</Spin>
			</div>-->
		</div>
		<div class="btn-bot">
			<button class="btn-return" @click="add_back">返回</button>
			<button class="btn-save" @click='save("formItem")'>立即发布</button>
		</div>
        <Modal title="产品属性" v-model="attributeModel" @on-ok="attrIsOk" class-name="vertical-center-modal">
            <Checkbox-group v-model="attributeChecked">
                <Checkbox :label="attr.name" v-for='(attr,index) in attributeAll' :key='index'></Checkbox>
            </Checkbox-group>
        </Modal>
        <Modal title="是否修改产品属性" v-model="attributeChangeModel" @on-ok='attrChangeIsOk' @on-cancel='attrChangeIsCancel' class-name="vertical-center-modal">
            <span>点击确定修改产品属性，并会清空之前的数据，否则请点击取消</span>
        </Modal>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>
<script>
	import api from '@/api/api'

	import '../../assets/UE/ueditor.config.js'
	import '../../assets/UE/ueditor.all.min.js'
	import '../../assets/UE/lang/zh-cn/zh-cn.js'
	import '../../assets/UE/ueditor.parse.js'
	import ue from '@/components/UE'
	import tis from '@/page/set/tishisub.vue'
	export default {
		mounted() {
			const _this = this;
			this.uploadList = this.$refs.upload.fileList;

			this.DOM = {
				content: document.getElementById('content')
			};
			this.editor = UE.getEditor('editor');
			document.getElementById('content').scrollTop = 0;
			//

			_this.axios({
					method: 'get',
					//              url :api.qroductCatalog + api.queryAll
					url: '/api/product/catalog/9999/queryTreeById.do'
				})
				.then(function(res) {
					if(res.data.status == 1) {

						_this.formItem.catalog = res.data.datas;
					} else {
						_this.do_no = true;
						_this.re_do = res.data.message;
						setTimeout(() => {
							_this.do_no = false;

						}, 2000);

						//_this.$Message.error(res.data.message);
					}

				})

			// 获取产品分类
			_this.axios({
					method: 'get',
					//              url :api.qroductCatalog + api.queryAll
					url: '/api/product/catalog/9999/queryTreeById.do'
				})
				.then(function(res) {

					_this.CatalogList = res.data.datas;
					_this.getspsx();

				})
				.catch(function(err) {
					console.log(err);
				})

			window.doExchange = function(doubleArrays) {
				var len = doubleArrays.length;
				if(len >= 2) {
					var len1 = doubleArrays[0].length;
					var len2 = doubleArrays[1].length;
					var newlen = len1 * len2;
					var temp = new Array(newlen);
					var index = 0;
					for(var i = 0; i < len1; i++) {
						for(var j = 0; j < len2; j++) {
							temp[index] = doubleArrays[0][i] + '--' + doubleArrays[1][j];
							index++;
						}
					}
					var newArray = new Array(len - 1);
					for(var i = 2; i < len; i++) {
						newArray[i - 1] = doubleArrays[i];
					}
					newArray[0] = temp;

					return window.doExchange(newArray);
				} else {
					return doubleArrays[0];
				}
			}

		},
		components: {
			tis: tis
		},
		watch: {
			formData(newVal, oldVal) {
				this.codePrice = newVal.sku.codePrice;
			}
		},
		data() {
			const validatePass = (rule, value, callback) => {
				if(value.toString().split(".")[1] !== null && value.toString().split(".")[1] !== undefined && value.toString().split(".")[1].length > 2) {
					callback(new Error('最多两位小数'));
				} else {
					callback();
				}

			};
			const minqiding = (rule, value, callback) => {
				if(value.toString().split(".")[1] != null && value.toString().split(".")[1] !== undefined && value.toString().split(".")[1].length > 4) {
					callback(new Error('最多四位小数'));
				} else {
					callback();
				}

			};
			return {
				show: 0,
				codePrice: 0,
				re_do: '',
				do_yn: false,
				do_no: false,

				old_qianzui: '',

				dingzhi: false,
				seldzd: [],

				noneblock: false,
				imglength: '',
				firstimgnum: '',
				Cascaderval: [],
				Cascaderval2: [],
				DOM: {},
				isModify: false,
				isSkuModify: false,
				formItem: {
					name: '', //产品名
					code: '', //产品编码
					spec: '', //产品型号
					barCode: '', //条形码
					spuAttributes: [], //产品属性
					inventoryQty: '',
					catalogId: '',
					catalog: [],
					unitId: '', //主计量单位
					price: '', //销售价
					orderNum: '',
					isUp: true,
					canCustomMade: '0',
					status: '1',
					//              description: '<h2>I am Example</h2>',
					images: [],
					attachments: [], //附件
					imageUrl: '',
					brandId: '', //品牌
					skus: [],
					costPrice: '', //成本价格
					minimumOrderQuantity: '' // 起订量

				},
				img: false,
				goodsRule: {
					code: [{
							required: true,
							message: '产品编码不能为空'
						},
						{
							type: 'string',
							max: 64,
							message: '最多输入64个字符'
						}
					],
					barCode: [,
						{
							type: 'string',
							max: 32,
							message: '最多输入32个字符'
						}
					],
					spec: [{
						type: 'string',
						max: 100,
						message: '最多输入100个字符'
					}],
					name: [{
							required: true,
							message: '产品名称不能为空'
						},
						{
							type: 'string',
							max: 100,
							message: '最多输入100个字符'
						}
					],
					catalog: [{
						required: true,
						message: '请选择产品分类'
					}],
					unitId: [{
						required: true,
						message: '请选择主计量单位'
					}],
					price: [{
						required: true,
						message: '销售价不能为空'
					}, {
						type: 'number',
						max: 99999999,
						min: 0,
						message: '请输入最多为8位数的数字'
					}, {
						type: 'number',
						validator: validatePass,
						trigger: 'blur'
					}],
					costPrice: [{
						type: 'number',
						max: 99999999,
						min: 0,
						message: '请输入最多为8位数的数字'
					}, {
						type: 'number',
						validator: validatePass,
						trigger: 'blur'
					}],
					inventoryQty: [{
						type: 'number',
						max: 9999999999,
						min: 0,
						message: '请输入最多为10位数的数字'
					}],
					minimumOrderQuantity: [{
						required: true,
						message: '起订量不能为空'
					}, {
						type: 'number',
						max: 9999999999,
						min: 0,
						message: '请输入最多为10位数的数字'
					}, {
						required: true,
						type: 'number',
						validator: minqiding,
						trigger: 'blur',
						type: 'number'

					}],
					orderNum: [{
						type: 'number',
						max: 99999,
						min: 0,
						message: '请输入最多为5位数的数字'
					}]
				},
				/* 文件上传 */
				uploadUrl: api.uploadFileUrl,
				uploadData: {
					path: 'product'
				},
				defaultList: [],
				imgUrl: '',
				visible: false,
				uploadList: [], //图片
				uploadList2: [], //图片
				mainImgIndex: '',
				skuItem: '',

				editor: null,

				attrindex: '',
				attrCheck: [],
				attrList: [], //
				attributeAll: [], //  请求来的 所有的产品属性
				attributeChecked: [], // 选择的所有产品属性
				attributeCheckedHistory: [], //选择了产品属性 要去更改产品属性时 保存的 历史产品属性值
				attributeModel: false, //选择产品属性的 Model
				attributeChangeModel: false, //更改 产品属性 的确认 Model

				CatalogList: [], //产品分类
				unitList: [], //计量单位
				brandList: [], //产品品牌

				spinShow: false
				// SKUstate : false

			}
		},
		destroyed() {
			this.editor.destroy();
		},
		computed: {
			skus: {
				get: function() {

					const _this = this;
					if(this.attrList.length == 0) {

						return;
					}

					if(this.attrCheck.length == this.attrList.length) {

						if(this.isSkuModify) {

							this.isSkuModify = false;
							return this.formItem.skus;
						}
						const result = [];
						const checkds = window.doExchange(this.attrCheck);
						checkds.forEach(function(item, index) {
							const itemArr = item.split('--');
							const attrArr = [];
							itemArr.forEach(function(el, j) {
								_this.attrList[j].productAttributeValues.forEach(function(e, i) {
									if(el == e.name) {
										attrArr.push({
											attributeId: _this.attrList[j].id,
											attributeName: _this.attrList[j].name,
											attributeValueId: e.id,
											attributeValueName: e.name,
											orderNum: j
										})
									}
								})
							})
							result.push({
								productSkuAttributes: attrArr,
								code: '',
								inventoryQty: '',
								price: '',
								// description : '',
								minimumOrderQuantity: '',
								costPrice: '',
								orderNum: index + 1,
								isMainImg: 0,
								imageUrl: '',
								isUp: true,
								status: 1,
							})
						})

						_this.formItem.skus = result;

						setTimeout(function() {

							for(var skuimg = 0; skuimg < _this.formItem.skus.length; skuimg++) {

								if(_this.formItem.skus[skuimg].imageUrl == '') {

									if(_this.formItem.imageUrl !== '') {

										_this.formItem.skus[skuimg].imageUrl = _this.formItem.imageUrl;
									}
								}

							}

						}, 500)

						return result;

					} else {
						_this.formItem.skus = [];
						return [];

					}

				},
				set: function(newValue) {
					// this.formItem.skus = newValue;
				}
			},
			SKUstate: function() {
				if(this.skus) {
					return this.skus.length >= 1;
				}
			},
			uploadHeader() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			},
			uploadBusHeader() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}
		},
		methods: {
			changeskucode() {
				const _this = this;
				
				console.log('_this.old_qianzui',_this.old_qianzui);
				if(_this.formItem.skus != null || _this.formItem.skus != undefined || _this.formItem.skus != '') {
					for(var skulength = 0; skulength < _this.formItem.skus.length; skulength++) {
						if(_this.old_qianzui != '') {
							
							if(_this.formItem.skus[skulength].code!=''||_this.formItem.skus[skulength].code!=undefined){
								_this.formItem.skus[skulength].code =  _this.formItem.code + '_' + _this.formItem.skus[skulength].code.toString().substring( _this.old_qianzui.length+1);
								
							}else{
								_this.formItem.skus[skulength].code = _this.formItem.code + '_' +_this.formItem.skus[skulength].code;
								
							}
							
						}else{
							
							_this.formItem.skus[skulength].code = _this.formItem.code + '_' + _this.formItem.skus[skulength].code;
						}
						
						
					}
					_this.old_qianzui = _this.formItem.code;
				}

			},
			changecode(index) {
				const _this = this;
				if(_this.formItem.code != '') {
					
					if(_this.formItem.skus[index].code!=''||_this.formItem.skus[index].code!=undefined){
						if(_this.formItem.skus[index].code.indexOf(_this.old_qianzui)==-1){
							_this.formItem.skus[index].code = _this.old_qianzui + '_' +_this.formItem.skus[index].code;
						}else if(_this.formItem.skus[index].code.length <=_this.old_qianzui.length){
							
							_this.formItem.skus[index].code = _this.old_qianzui + '_' +_this.formItem.skus[index].code;
						}else{
							
							_this.formItem.skus[index].code =  _this.old_qianzui + '_' + _this.formItem.skus[index].code.toString().substring( _this.old_qianzui.length+1);
						}
						
					}
				}

			},
			twomin_check(val, index) {
				const _this = this;

				this.$set(_this.formItem.skus[index], "costPrice", val);

			},

			format(labels, selectedData) {
				const _this = this;
				const index = labels.length - 1;
				const datas = selectedData[index] || false;
				if(datas && datas.code) {
					_this.formItem.catalogId = datas.id;
					return labels[index]; //+ ' - ' + data.code
				}
				return labels[index];
			},
			// 富文本
			onContentChange(val) {
				this.formItem.description = val;

			},
			handleView(item) {
				this.imgUrl = item.url;
				this.visible = true;
			},
			handleRemove(file, index) {
				// 从 upload 实例删除数据
				const _this = this;

				_this.formItem.images.splice(index, 1);

				/*const fileList = this.$refs.upload.fileList;
				console.log(fileList);
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
				this.formItem.images.forEach(function(item, index) {
					if(item.fileName == file.name && item.url == item.url) {
						_this.formItem.images.splice(index, 1);
					}
				})*/

				_this.firstimgnum = _this.firstimgnum - 1;
				_this.noneblock = false;

			},
			handleError(err, file, fileList) {
				this.$Notice.warning(err);
			},
			handleSuccess(res, file, fileList) {
				const _this = this;
				file.url = res.url;
				file.name = res.fileName;

				const image = {
					fileName: res.fileName,
					fileType: res.fileSuffix,
					filePath: res.filePath,
					url: res.url,
					orderNum: fileList.length
				}
				if(_this.formItem.images == '' || _this.formItem.images == null || _this.formItem.images == undefined) {
					_this.formItem.images = [];
				}
				_this.formItem.images.push(image);

				_this.firstimgnum = _this.imglength + _this.uploadList.length;

				if(_this.firstimgnum > 4) {
					_this.noneblock = true;
				}
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超出文件大小限制',
					desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
				});
			},
			handleBeforeUpload() {
				//let _this = this;
				//console.log("ppppppppppppppppp");
				//console.log(this.$refs.upload.fileList);
				//const check = _this.firstimgnum;

				/*if (check>3) {
       			
               this.$Notice.warning({
                   title: '最多只能上传 20 张图片。'
               });
                  
                 
           }*/

			},
			mainImgSuccess(res, file, fileList) {
				const _this = this;
				this.formItem.imageUrl = res.url;

				for(var skuimg = 0; skuimg < _this.formItem.skus.length; skuimg++) {

					if(_this.formItem.skus[skuimg].imageUrl == '') {
						_this.formItem.skus[skuimg].imageUrl = res.url;
					}
				}
			},
			skuMainImgSuccess(res, file, fileList) {

				if(res.status == 1) {
					this.skuItem.imageUrl = res.url;
					this.formItem.skus[this.mainImgIndex] = this.skuItem;
				}
			},
			attachmentsSuccess(res, file, fileList) {

				const attachment = {
					fileName: res.fileName,
					fileType: res.fileSuffix,
					filePath: res.filePath,
					url: res.url,
					orderNum: fileList.length
				}
				this.formItem.attachments.push(attachment);

			},
			delfile(index) {

				const _this = this;

				_this.formItem.attachments.splice(index, 1);
			},
			del(index) { //删除skus
				const _this = this;

				var dzsx_ls = _this.formItem.skus;
				dzsx_ls.splice(index, 1);
				setTimeout(function() {
					_this.formItem.skus = dzsx_ls;
				}, 100)

			},
			change(data) {
				data.status = data.isUp ? '1' : '0';

			},
			changeding(data) {
				let _this = this;
				if(_this.dingzhi) {
					_this.formItem.canCustomMade = 1;
				} else {
					_this.formItem.canCustomMade = 0;
				}
			},
			seleckAttr() {
				if(this.attributeChecked.length !== 0) {
					this.attributeCheckedHistory = this.attributeChecked;
				}
				this.attributeModel = true;

			},
			attrIsOk() {

				if(this.attributeCheckedHistory.length !== 0) {
					if(this.attributeChecked.join('') == this.attributeCheckedHistory.join('')) {

						return;
					} else {
						this.attributeChangeModel = true;

						return;
					}
				}

				const _this = this;
				this.attrCheck = [];
				const attr = [];
				let attrIds = '';
				_this.formItem.spuAttributes = [];
				if(this.attributeChecked.length == 0) {
					this.attrList = [];

				}
				this.attributeChecked.forEach(function(el, i) {
					_this.attributeAll.forEach(function(item, index) {

						if(item.name == el) {
							let shuxing_dz = {};
							shuxing_dz.attributeId = item.id; //属性id
							shuxing_dz.attributeName = item.name; //属性名
							shuxing_dz.canCustomMade = '0'; //属性是否能控制，1可以，0不行
							shuxing_dz.customMadeTip = ''; //定制提示信息

							_this.formItem.spuAttributes.push(shuxing_dz);

							attr.push(item);
							attrIds += item.id + ',';
						}
					})

				})

				attrIds = attrIds.slice(0, attrIds.length - 1);
				_this.axios(api.productAttr + attrIds + api.productGetById)
					.then(function(res) {

						_this.attrList = res.data.datas;

					})
					.catch(function(err) {
						console.log(err);
					})

			},
			attrChangeIsOk() {
				const _this = this;
				this.attrCheck = [];
				const attr = [];
				let attrIds = '';

				_this.formItem.spuAttributes = [];
				_this.seldzd = [];
				if(this.attributeChecked.length == 0) {
					_this.attrList = [];

				}
				this.attributeChecked.forEach(function(el, i) {
					_this.attributeAll.forEach(function(item, index) {

						if(item.name == el) {
							let shuxing_dz = {};
							shuxing_dz.attributeId = item.id; //属性id
							shuxing_dz.attributeName = item.name; //属性名
							shuxing_dz.canCustomMade = '0'; //属性是否能控制，1可以，0不行
							shuxing_dz.customMadeTip = ''; //定制提示信息

							_this.formItem.spuAttributes.push(shuxing_dz);

							attr.push(item);
							attrIds += item.id + ',';
						}
					})
					//console.log("itemok",)
				})

				attrIds = attrIds.slice(0, attrIds.length - 1);
				_this.axios(api.productAttr + attrIds + api.productGetById)
					.then(function(res) {
						_this.attrList = res.data.datas;

					})
					.catch(function(err) {
						console.log(err);
					})

			},
			attrChangeIsCancel() {
				this.attributeChecked = this.attributeCheckedHistory;
			},
			selsx_dz(index) {

				let _this = this;
				if(_this.formItem.spuAttributes[index].canCustomMade == 0) {
					_this.formItem.spuAttributes[index].canCustomMade = 1;
				} else {
					_this.formItem.spuAttributes[index].canCustomMade = 0;
				}

			},
			inputsx_dz(index) {
				let _this = this;

				_this.formItem.spuAttributes[index].customMadeTip = document.getElementsByClassName(_this.formItem.spuAttributes[index].attributeId)[0].children[1].value;
			},
			checkedAttr(data) {

				const _this = this;

				if(this.attrCheck.length - 1 < this.attrindex) {

					this.attrCheck.lenght = this.attrindex + 1;
					this.attrCheck[this.attrindex] = data;
					this.attrCheck.forEach(function(el, i) {
						if(i !== _this.attrindex) {
							_this.attrCheck.splice(i, 1, []);

						}
					})
				}

			},
			add_back() {
				const _this = this;
				_this.$router.push('/goodsList');
			},
			save(name) {
				const _this = this;

				// _this.formItem.description = _this.editor.getContent();
				// console.log("发布",_this.skus);
				//console.log("发布2",this.attrCheck);
				var errtip_len = document.querySelectorAll(".errotip");
                alert("jinru");
				if(errtip_len.length < 1) {

					this.$refs[name].validate((valid) => {

						_this.spinShow = true;
						if(valid) {
							_this.formItem.description = _this.editor.getContent();
							_this.formItem.catalogId = _this.formItem.catalog[_this.formItem.catalog.length - 1];

							if(this.isModify == false) {

								_this.axios({
										method: 'post',
										header: {
											"Content-Type": 'application/x-www-form-urlencoded'
										},
										url: api.product + api.add,
										data: api.convertParam(_this.formItem)
									})
									.then(function(res) {

										const data = res.data;

										if(data.status == 1) {

											_this.spinShow = false;
											_this.$router.push('/goodsList');
										} else {
											console.log("erro1");

											_this.do_no = true;
											_this.re_do = res.data.message;
											setTimeout(() => {
												_this.do_no = false;

											}, 2000);

											//_this.$Message.error(data.message);
										}
									})
									.catch(function(err) {

										console.log(err);
									})
							} else {

								_this.axios({
										method: 'post',
										header: {
											"Content-Type": 'application/x-www-form-urlencoded'
										},
										url: api.product + api.productModeify,
										data: api.convertParam(_this.formItem)
									})
									.then(function(res) {

										const data = res.data;
										if(data.status == 1) {
											_this.spinShow = false;
											_this.$router.push('/goodsList');
										} else {
											console.log("erro2");
											_this.do_no = true;
											_this.re_do = res.data.message;
											setTimeout(() => {
												_this.do_no = false;

											}, 2000);

											// _this.$Message.error(data.message);
										}

									})
									.catch(function(err) {
										console.log(err);
									})
							}
						} else {
							_this.spinShow = false;
							this.$Notice.warning({
								title: '请按照页面提示修改信息',
							});

							_this.DOM.content.scrollTop = 0;
						}
					})

				}else{
					console.log(errtip_len);
					alert("erro");
				}

			},
			getspsx() { // 获取产品属性		
				const _this = this;
				this.axios(api.productAttr + api.queryAll)
					.then(function(res) {
						_this.attributeAll = res.data.datas.rows;
						_this.getjldw();
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			getjldw() { // 获取计量单位

				const _this = this;
				_this.axios(api.baseUnit + api.queryAll)
					.then(function(res) {
						_this.unitList = res.data.datas;
						_this.getsppp();
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			getsppp() { // 获取产品品牌
				const _this = this;
				_this.axios(api.baseBrand + api.queryAll)
					.then(function(res) {
						_this.brandList = res.data.datas.list;
						_this.changeallmes();
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			changeallmes() { //  修改		
				const _this = this;

				if(this.$route.query.id) {
					const id = this.$route.query.id;
					_this.axios(api.product + id + api.productQueryById)
						.then(function(res) {

							const data = res.data.datas;
							console.log("修改获取?", data);
							data.skus.forEach(function(sku, index) {
								sku.isUp = sku.status == 1 ? true : false;
							})
							if(data.images != null) {
								_this.imglength = data.images.length;
							} else {
								_this.imglength = 0;
							}
							//_this.imglength = data.images.length;
							_this.firstimgnum = _this.imglength;

							_this.formItem = {
								id: data.id,
								name: data.name,
								code: data.code,
								spec: data.spec,
								barCode: data.barCode,
								inventoryQty: data.inventoryQty,
								catalogId: data.catalogId,
								unitId: data.unitId,
								price: data.price,
								orderNum: data.orderNum,
								isUp: data.status == 1 ? true : false,
								status: data.status,
								description: data.description,
								images: data.images,
								attachments: data.attachments,
								imageUrl: data.imageUrl,
								brandId: data.brandId,
								costPrice: data.costPrice,
								minimumOrderQuantity: data.minimumOrderQuantity,
								//canCustomMade: data.canCustomMade,
								canCustomMade: data.canCustomMade,
								skus: res.data.datas.skus,
								spuAttributes: res.data.datas.attributes
							};
							console.log('_this.formItem', _this.formItem);
							//_this.formItem.skus = res.data.datas.skus;
                            _this.old_qianzui = data.code;
							if(_this.formItem.canCustomMade == 1) {
								_this.dingzhi = true;
							}
							if(data.description) {
								_this.editor.setContent(data.description);
							}
							_this.formItem.catalog = [];
							_this.formItem.catalog.push(data.catalogId);
							console.log("sku", data.skus);
							if(data.skus.length >= 1) {
								let attrIds = '';
								let checkedAttr = [];
								console.log("skus");
								if(data.attributes != null) {
									console.log('data.attributes.length', data.attributes.length);
									for(var attrn = 0; attrn < data.attributes.length; attrn++) {
										attrIds += data.attributes[attrn].id + ',';
										checkedAttr[attrn] = [];
										if(data.attributes[attrn].canCustomMade == 1) {
											_this.seldzd.push(data.attributes[attrn].attributeName);

										}
										_this.attributeChecked.push(data.attributes[attrn].attributeName);
									}
									console.log('data.skus.length', data.skus.length);
									for(var attra = 0; attra < data.skus.length; attra++) {
										console.log('data.skus[attra].productSkuAttributes.length', data.skus[attra].productSkuAttributes.length);
										for(var attrb = 0; attrb < data.skus[attra].productSkuAttributes.length; attrb++) {
											checkedAttr[attrb].push(data.skus[attra].productSkuAttributes[attrb].attributeValueName);
										}
									}
									var newcheckedAttr = [];
									console.log('checkedAttr', checkedAttr);
									for(var cka = 0; cka < checkedAttr.length; cka++) {
										var newcka = [];
										console.log('checkedAttr.length', checkedAttr[cka].length);
										for(var ckb = 0; ckb < checkedAttr[cka].length; ckb++) {
											if(newcka.indexOf(checkedAttr[cka][ckb]) == -1) {
												newcka.push(checkedAttr[cka][ckb]);
											}
										}
										newcheckedAttr.push(newcka);
									}
									console.log('attrIds.length', attrIds.length);
									_this.attrCheck = newcheckedAttr;
									attrIds = attrIds.slice(0, attrIds.length - 1);
									console.log('data.attributes.length', data.attributes.length);
									for(var attrbt = 0; attrbt < data.attributes.length; attrbt++) {
										data.attributes[attrbt].name = data.attributes[attrbt].attributeName;
									}
									_this.attrList = data.attributes;
								}

							}
							if(data.attachments != null) {
								data.attachments.forEach(function(img, index) {
									_this.defaultList.push({
										name: img.fileName,
										url: img.url,
									});
								})
							}
							_this.isModify = true;
							_this.isSkuModify = true;
						})
				}
			}
		}
	}
</script>

<style type="text/css">
	.ivu-select-dropdown {
		overflow: hidden !important;
		overflow-y: auto !important
	}
	
	.shuxingjia .ivu-table-header {
		z-index: 100!important;
	}
	
	.shuxingjia .table .table-header .table_td {
		height: 50px!important;
	}
	
	.shuxingjia .ivu-modal-footer {
		padding: 12px 18px 12px 18px!important;
	}
	
	.shuxingjia .ivu-modal-footer .ivu-btn:first-child {
		color: white!important;
	}
	
	.shuxingjia .set_box .dingzlb .ivu-form-item .ivu-form-item-content {
		margin-left: 0!important;
	}
	.shuxingjia #edui1{
		width: 100%!important;
	}
</style>
<style scoped>
	.addGoods .ivu-form-item-content {
		line-height: 20px;
	}
	
	.spante {
		margin: 0 0 0 -120px;
		padding-left: 0!important;
	}
	
	.ivu-form-item-content {
		margin: 0 0 !important;
	}
	
	.addGoods .span8 {
		padding-left: 20px;
	}
	
	.addGoods .link {
		color: #09f;
	}
	
	.addGoods .link:hover {
		color: #283f82;
	}
	
	.upload {
		float: none !important;
		display: block !important;
		border-top: 1px solid #ddd;
		margin-bottom: 10px;
	}
	
	.ivu-switch {
		line-height: 16px !important;
	}
	
	.addGoods .demo-upload-list {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 15px;
		margin-top: 15px;
	}
	
	.addGoods .demo-upload-list img {
		width: 100%;
		height: 100%;
	}
	
	.addGoods .demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}
	
	.addGoods .demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}
	
	.addGoods .demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
	
	.addGoods .ivu-checkbox-group {
		display: inline-block;
		padding-left: 20px;
	}
	
	.addGoods .attrAdd {
		font-size: 24px;
		cursor: pointer;
	}
	
	.addGoods .attrAdd:hover {
		color: #09f;
	}
	
	.addGoods .table {
		display: table;
		width: 100%;
		margin: 10px;
	}
	
	.addGoods .child-table {
		display: table;
		width: 200%;
	}
	
	.addGoods .table-header {
		display: table-header-group;
		background: #eef1f9;
		border: 1px solid #e1e7f6;
		/*color: #fff;*/
	}
	
	.addGoods .table-tbody {
		display: table-row-group;
	}
	
	.addGoods .table-tr {
		display: table-row;
		background: #fff;
	}
	
	.addGoods .table-tr:hover {
		background: #ebf7ff;
	}
	
	.addGoods .table-td {
		display: table-cell;
		height: 50px;
		width: auto;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
	}
	
	.addGoods .bold {
		font-weight: 900;
	}
	
	.addGoods .upload {
		padding-top: 15px;
	}
	
	.addGoods .uploadLabel {
		width: 120px;
		display: inline-block;
		padding: 10px 12px 10px 0;
		vertical-align: top;
	}
	
	.addGoods .appendixUpload {
		/*padding-top: 15px;*/
	}
	
	.addGoods .inline-block {
		display: inline-block;
	}
	
	.addGoods .addFooter {
		padding: 15px 0;
	}
	/*.addGoods .ql-toolbar.ql-snow {
		background: #f9f9f9;
	}*/
	
	.addGoods .ql-toolbar.ql-snow+.ql-container.ql-snow {
		height: 500px;
		background: #fff;
	}
	
	.addGoods .ivu-icon {
		vertical-align: sub;
	}
	
	.addGoods .addMainImg {
		width: 50px;
		height: 50px;
		line-height: 50px;
		border: 1px dashed #d7dde4;
		display: block;
		margin: 10px 0 0 0;
		cursor: pointer;
		background: #fff;
		text-align: center;
		border-radius: 3px;
		transition: border 0.2s ease;
	}
	
	.addGoods .addMainImg:hover {
		border: 1px dashed #09f;
	}
	
	.addGoods .addImg {
		width: 58px;
		height: 58px;
		line-height: 58px;
		border: 1px dashed #d7dde4;
		cursor: pointer;
		background: #fff;
		text-align: center;
		border-radius: 3px;
		transition: border 0.2s ease;
	}
	
	.appendixUpload_img {
		padding: 0px 0 0 2px;
		border-top: 1px solid #ddd;
		margin-bottom: 10px;
	}
	
	.addGoods .addImg:hover {
		border: 1px dashed #09f;
	}
	
	.addGoods .ivu-input-wrapper-small .ivu-input-icon+.ivu-input {
		padding-right: 0;
	}
	
	.addGoods .mainImg {
		width: 100%;
		height: 100%;
	}
	
	.addGoods .demo-spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}
	
	@keyframes ani-demo-spin {
		from {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	.addGoods .demo-spin-col {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 10;
	}
	
	.addGoods .ivu-spin-fix {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 8;
		display: table;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
	}
	
	.addGoods .ivu-spin {
		color: #fff;
	}
	
	.quill-editor {
		display: none;
	}
	
	h4 {
		font-size: 16px;
		/*margin: 0 15px;*/
		color: #6bb8da;
		border: 1px solid #ddd;
		border-bottom: none;
		margin-top: 10px;
		padding: 5px 10px;
		border-radius: 5px 5px 0 0;
		display: inline-block;
	}
	
	.set_box {
		border-top: 1px solid #ddd;
	}

	.sc_box {
		display: flex;
		padding: 10px;
		background: #f8f9fd;
		border-top: 1px solid #ddd;
	}
	
	.sc_box:hover {
		cursor: pointer;
	}
	
	.sc_box-div {
		display: flex;
		align-items: center;
	}
	
	.sc_box-div>img {
		width: 26px;
		height: 26px;
	}
	
	.sc_box-div>label {
		font-weight: 700;
		font-size: 14px;
		margin: 0 10px;
	}
	
	.showfile {
		margin-bottom: 50px;
	}
	
	.showfile li {
		height: 22px;
		background-color: white;
		border: none;
		margin-top: 10px;
		display: flex;
		align-items: center;
	}
	
	.showfile li span {
		margin-left: 10px;
	}
	
	.showfile li i {
		margin-left: 5px;
	}
	
	.showfile li i:hover {
		cursor: pointer;
	}
	
	.ivu-switch-checked {
		border-color: #69cf36;
		background-color: #69cf36;
	}
	
	.ivu-upload .ivu-upload-drag {
		border: none;
	}
	
	.yinc {
		display: none!important;
	}
	
	.tabletip {
		position: absolute;
		left: 50%;
		margin-left: -25%;
	}
	
	.tableinput {
		width: 100px;
		height: 25px;
		text-align: center;
	}
</style>