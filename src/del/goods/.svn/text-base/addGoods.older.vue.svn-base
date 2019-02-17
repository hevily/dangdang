<template>
   <div class="addGoods">
        <Breadcrumb>
             <Breadcrumb-item>产品信息</Breadcrumb-item>
            <Breadcrumb-item>
                <router-link to='/goodsList'>
                    产品列表
                </router-link>
            </Breadcrumb-item>
             <Breadcrumb-item>产品新增</Breadcrumb-item>
         </Breadcrumb>
         <div class="qaz test-1">
         <div class="fileHandle">
           <Form ref="formItem" :model="formItem" :rules="goodsRule" :label-width="120">
                <Row>
                    <Col span="8" class='span8'>
                        <Form-item label="产品名称" prop='name'>
                            <Input type="text" v-model="formItem.name" placeholder="最多输入100个字符"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="产品编码" prop='code'>
                            <Input type="text" v-model="formItem.code" placeholder="最多输入50个字符"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="型号/规格" prop='spec'>
                            <Input type="text" v-model="formItem.spec" placeholder="最多输入100个字符"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="产品条形码" prop='barCode'>
                            <Input type="text" v-model="formItem.barCode" placeholder="最多输入50个字符"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="产品分类" prop='catalog'>
                           <!--<Cascader :data="CatalogList" v-model='formItem.catalog' trigger='hover'></Cascader>-->
                            <!--<span>品类：</span>-->
				                  <Select v-model='formItem.catalog'   @keyup.native='enter($event)'>
				                    <Option v-for="item in CatalogList" :data="CatalogList" trigger='hover' :value="item.name" :key="item">{{ item.name }}</Option>
				               	</Select>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="产品品牌" prop='brandId'>
                           <Select v-model="formItem.brandId" placeholder="请选择" not-found-text='当前选项没有数据'>
                               <Option v-for='(brand , index) in brandList' :key='index' :value="brand.id">{{brand.name}}</Option>
                           </Select>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="主计量单位" prop='unitId' not-found-text='当前选项没有数据'>
                            <Select v-model="formItem.unitId" placeholder="请选择">
                                <Option v-for='(unit , index) in unitList' :key='index' :value="unit.id">{{unit.name}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="成本价格" prop='costPrice'>
                            <Input type="text" v-model="formItem.costPrice" number></Input>
                            <!-- <Input-number :max="99999999" :min="0" v-model="formItem.costPrice"></Input-number> -->
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="销售价格" prop='price'>
                            <Input type="text" v-model="formItem.price" number></Input>
                            <!-- <Input-number :max="99999999" :min="0"  v-model="formItem.price"></Input-number> -->
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="库存设置" prop='inventoryQty'>
                            <Input type="text" v-model="formItem.inventoryQty"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="排序号" prop='orderNum'>
                            <Input type="text" v-model="formItem.orderNum" number></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="起订量" prop='minimumOrderQuantity'>
                            <Input type="text" v-model="formItem.minimumOrderQuantity" number></Input>
                            <!-- <Input-number :max="9999999999" :min="0" v-model="formItem.minimumOrderQuantity"></Input-number> -->
                        </Form-item>
                    </Col>
                    <Col span="24" class='span8'>
                        <Form-item label="上下架" prop='status'>
                            <i-switch v-model='formItem.isUp' @on-change="change(formItem)">    
                                <Icon type="android-done" slot="open"></Icon>
                                <Icon type="android-close" slot="close"></Icon>
                            </i-switch>
                        </Form-item>
                    </Col>
                    <Col span="24" class='span8'>
                        <Form-item label="产品属性">
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
                    <Col span='24' class='span8' v-show='SKUstate'>
                         <Form-item label="产品SKU">
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
                                        <div class="table-td" style='padding:10px 0;'>
                                            <Upload :action="uploadUrl"
                                                :show-upload-list="false"
                                                :on-success="skuMainImgSuccess"
                                                :headers='uploadHeader'
                                                :data='uploadData'
                                                @click.native = 'skuItem = sku; mainImgIndex = index'>
                                                <div class="addImg">
                                                    <Icon type="plus-round" size='20' v-if='!sku.imageUrl'></Icon>
                                                    <img :src="sku.imageUrl" class="mainImg" v-else>
                                                </div>
                                            </Upload>
                                        </div>
                                        <div class="table-td" style='width : 50px;' v-for='attr in sku.productSkuAttributes'>{{attr.attributeValueName}}</div>
                                        <div class="table-td">
                                            <Input v-model="skus[index].code" size="small" style='width:100px'></Input>
                                        </div>
                                        <div class="table-td">
                                            
                                            <!-- <Input v-model="skus[index].costPrice" size="small" style='width:100px' number></Input> -->
                                            
                                            <Input-number :max="99999999" :min="0" size='small' v-model="skus[index].costPrice" style='width:100px'></Input-number>
                                        </div>
                                        <div class="table-td">
                                            <!-- <Input v-model="skus[index].price" size="small" style='width:100px' number></Input> -->
                                            <Input-number :max="99999999" :min="0" size='small' v-model="skus[index].price" style='width:100px'></Input-number>
                                        </div>
                                       <!--  <div class="table-td">
                                           <Input v-model="skus[index].description" size="small" style='width:100px'></Input>
                                       </div> -->
                                        <div class="table-td">
                                            <!-- <Input v-model="skus[index].minimumOrderQuantity" size="small" style='width:100px' number></Input> -->
                                            <Input-number :max="9999999999" :min="0" size='small' v-model="skus[index].minimumOrderQuantity" style='width:100px'></Input-number>
                                        </div>
                                        <div class="table-td">
                                            <Input v-model="skus[index].inventoryQty" size="small" style='width:100px'></Input>
                                        </div> 
                                        <div class="table-td">
                                            <i-switch size="large" v-model='skus[index].isUp' @on-change='change(skus[index])'>
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
                      <Col span='24' class='span8' style='margin-bottom:20px;'>
                        <div class="appendixUpload">
                            <label class="uploadLabel" style='width:120px;text-align:right;'>产品主图</label>
                            <Upload :action="uploadUrl" class='inline-block' :on-success="mainImgSuccess" :headers='uploadHeader' :show-upload-list="false">
                                <div class="addMainImg">
                                    <Icon type="plus-round" size='20' v-if='!formItem.imageUrl'></Icon>
                                    <img :src="formItem.imageUrl" class="mainImg" v-else>
                                </div>
                            </Upload>
                        </div>
                      </Col>                
                    <Col span='24' class='span8'>
                        <Form-item label="产品描述">
                             <editor id="editor_id" height="500px" width="100%" :content="formItem.description"
                                    pluginsPath="/static/kindeditor/plugins/"
                                    :loadStyleMode="false"
                                    @on-content-change="onContentChange"></editor> 

<!--:options="editorOption"-->
                             <quill-editor v-model="formItem.description"
                                        ref="myQuillEditor"
                                        
                                        >
                            
                                        @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)"
                                        @ready="onEditorReady($event)"
                              </quill-editor> 
                              <script id='editor' type="text/plain"></script>
                              <!--<textarea name="" rows="" cols=""></textarea>-->
                        </Form-item>
                    </Col>

                </Row>
           </Form>
           <div class="upload">
                <div class="appendixUpload">
                    <label class="uploadLabel" style='width:120px;text-align:right;'>相关图片</label>
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
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :on-error='handleError'
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        :headers='uploadHeader'
                        multiple
                        type="drag"
                        :action="uploadUrl"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="查看图片" v-model="visible">
                        <img :src="imgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </div>
                <div class="appendixUpload">
                    <label class="uploadLabel" style='width:120px;text-align:right;'>相关文件</label>
                    <Upload :action="uploadUrl" class='inline-block' 
                        :on-success="attachmentsSuccess" :headers='uploadHeader' :data='uploadData'
                        :default-file-list="defaultList">
                        <Button type="ghost" icon="ios-cloud-upload-outline">添加附件</Button>
                    </Upload>

                </div>
           </div>
            <Row type="flex" justify="center" class="code-row-bg addFooter">
                <Col span="3">
                    <Button type="info" size="large" long @click.native='save("formItem")'>立即发布</Button>
                </Col>
                <!-- <Col span="2">
                    <Button type="warning" size="large">立即发布</Button>
                </Col> -->
            </Row>
            
        </div>
 </div>

        <Modal
            title="产品属性"
            v-model="attributeModel"
            @on-ok="attrIsOk"
            class-name="vertical-center-modal">
            <Checkbox-group v-model="attributeChecked">
                <Checkbox :label="attr.name" v-for='(attr,index) in attributeAll' :key='index'></Checkbox>
            </Checkbox-group>
        </Modal>
        <Modal
            title="是否修改产品属性"
            v-model="attributeChangeModel"
            @on-ok='attrChangeIsOk'
            @on-cancel='attrChangeIsCancel'
            class-name="vertical-center-modal">
            <span>点击确定修改产品属性，并会清空之前的数据，否则请点击取消</span>
        </Modal>

        
        <div class="demo-spin-col" span="8" v-if='spinShow'>
            <Spin fix>
                <Icon type="load-c" size=35 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div>

   </div>
</template>
<script>
import api from '@/api/api'

import '../../assets/UE/ueditor.config.js'
import '../../assets/UE/ueditor.all.min.js'
import '../../assets/UE/lang/zh-cn/zh-cn.js'
import '../../assets/UE/ueditor.parse.js'
import ue from '@/components/UE'
export default {
    mounted () {
        const _this = this;
        this.uploadList = this.$refs.upload.fileList;
        this.DOM = {
            content : document.getElementById('content')
        };
       this.editor = UE.getEditor('editor');
        document.getElementById('content').scrollTop = 0;
        // 获取产品分类
        _this.axios({
                method : 'get',
//              url :api.qroductCatalog + api.queryAll
				url :'/api/product/catalog/9999/queryTreeById.do'
            })
            .then(function(res) {
                _this.CatalogList = res.data.datas;
                // console.log(res);
            })
            .catch(function(err) {
                console.log(err);
            })

        // 获取产品属性
        this.axios(api.productAttr + api.queryAll)
            .then(function(res) {
               _this.attributeAll = res.data.datas;
            })
            .catch(function(err) {
                console.log(err);
            })

        // 获取计量单位
        _this.axios(api.baseUnit + api.queryAll) 
            .then(function(res){
                _this.unitList = res.data.datas;
                // console.log(res);
             })
            .catch(function(err){
                console.log(err);
            })

        // 获取产品品牌
        _this.axios(api.baseBrand + api.queryAll)
            .then(function(res){
                _this.brandList = res.data.datas.list;
                
            })
            .catch(function(err){
                console.log(err);
            })


            //  修改
            if(this.$route.query.id) {
                const id = this.$route.query.id;
                _this.axios(api.product + id + api.productQueryById)
                    .then(function(res){
                        
                        const data = res.data.datas;
                        data.skus.forEach(function(sku , index) {
                            sku.isUp = sku.status == 1 ? true : false;
                        })
                        _this.formItem = {
                            id : data.id,
                            name : data.name,
                            code : data.code,
                            spec : data.spec,
                            barCode : data.barCode,
                            inventoryQty : data.inventoryQty,
                            catalogId: data.catalogId,
                            unitId : data.unitId,
                            price : data.price,
                            orderNum : data.orderNum,
                            isUp : data.status == 1 ? true : false,
                            status : data.status,
                            description: data.description,
                            images : data.images,
                            attachments : data.attachments,
                            imageUrl : data.imageUrl,
                            brandId : data.brandId,
                            skus : data.skus
                        };

                        console.log(data);

                        if(data.description) {
                            _this.editor.setContent(data.description);
                        }

                        const catalog = data.catalogAncestorIds.split(',');
                        catalog.push(data.catalogId);
                        _this.formItem.catalog = catalog;

                       if(data.skus.length >= 1) {
                            let attrIds = '';
                            let checkedAttr = [];
                            data.attributes.forEach(function(attr , index) {
                                attrIds += attr.id + ',';
                                checkedAttr[index] = [];
                                attr.productAttributeValues.forEach(function(item , i) {
                                   checkedAttr[index].push(item.name);
                                })
                                _this.attributeChecked.push(attr.name);
                            })

                            _this.attrCheck = checkedAttr;

                            attrIds = attrIds.slice(0,attrIds.length-1);
                            _this.axios(api.productAttr + attrIds + api.productGetById )
                                .then(function(res){
                                    console.log(res.data.datas);
                                    _this.attrList = res.data.datas; 
                                })
                                .catch(function(err) {
                                    console.log(err);
                                })
                       }


                       data.attachments.forEach(function(img , index) {
                            _this.defaultList.push({
                                name : img.fileName,
                                url : img.url,
                            });
                       })

                        _this.isModify = true;
                        _this.isSkuModify = true;
                        
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            }


        window.doExchange = function(doubleArrays) {
            var len = doubleArrays.length;
               if (len >= 2) {
                   var len1 = doubleArrays[0].length;
                   var len2 = doubleArrays[1].length;
                   var newlen = len1 * len2;
                   var temp = new Array(newlen);
                   var index = 0;
                   for (var i = 0; i < len1; i++) {
                       for (var j = 0; j < len2; j++) {
                           temp[index] = doubleArrays[0][i] + '--' + doubleArrays[1][j];
                           index++;
                       }
                   }
                   var newArray = new Array(len - 1);
                   for (var i = 2; i < len; i++) {
                       newArray[i - 1] = doubleArrays[i];
                   }
                   newArray[0] = temp;
                   
                   return window.doExchange(newArray);
               }
               else {
                   return doubleArrays[0];
               }
        }


    },
    data () {
        return {
            DOM : {},
            isModify : false,
            isSkuModify : false,
            formItem: {
                name : '',
                code : '',
                spec : '',
                barCode : '',
                inventoryQty : '',
                catalogId: '',
                catalog: [],
                unitId : '',
                price : '',
                orderNum : '',
                isUp : true,
                status : '1',
//              description: '<h2>I am Example</h2>',
                images : [],
                attachments : [],
                imageUrl : '',
                brandId : '',
                skus : [],
                costPrice : '' ,     //成本价格
                minimumOrderQuantity : ''       // 起订量

            },
            img : false,
            goodsRule : {
                code : [
                    {required: true, message : '产品编码不能为空'} ,
                    {type: 'string' , max : 50 ,  message : '最多输入50个字符'}
                ],
                barCode : [,
                    {type: 'string' , max : 50 ,  message : '最多输入50个字符'}
                ],
                spec : [
                    {type : 'string' , max : 100 ,message : '最多输入100个字符'} 
                ], 
                name : [
                    {required : true , message : '产品名称不能为空'}
                ],
                catalog : [
                    {required : true , message : '请选择产品分类'}
                ],
                unitId : [
                    {required : true , message : '请选择主计量单位'}
                ],
                price : [
                    {type : 'number', max : 99999999 , min : 0, message : '请输入最多为8位数的数字'}
                ],
                costPrice : [
                    {type : 'number', max : 99999999 , min : 0, message : '请输入最多为8位数的数字'}
                ],
                minimumOrderQuantity : [
                    {type : 'number', max : 9999999999 , min : 0, message : '请输入最多为10位数的数字'}
                ]
            },
            /* 文件上传 */
            uploadUrl : api.uploadFileUrl,
            uploadData : {path : 'product'},
            defaultList: [],
            imgUrl: '',
            visible: false,
            uploadList: [],

            mainImgIndex : '',
            skuItem : '',

            editor : null,

            attrindex : '',
            attrCheck:[],       
            attrList : [],          //
            attributeAll : [],   //  请求来的 所有的产品属性
            attributeChecked : [],   // 选择的所有产品属性
            attributeCheckedHistory : [],  //选择了产品属性 要去更改产品属性时 保存的 历史产品属性值
            attributeModel : false,         //选择产品属性的 Model
            attributeChangeModel : false,   //更改 产品属性 的确认 Model


            CatalogList : [],   //产品分类
            unitList : [],      //计量单位
            brandList : [],      //产品品牌

            spinShow : false
            // SKUstate : false
            
        }
    },
    destroyed () {
      this.editor.destroy();
    },
    computed : {
        skus :{
            get : function() {
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
                    checkds.forEach(function(item,index){
                        const itemArr = item.split('--');
                        const attrArr = [];
                        itemArr.forEach(function(el , j) {
                            _this.attrList[j].productAttributeValues.forEach(function(e , i) {
                                if(el == e.name) {
                                    attrArr.push({
                                        attributeId : _this.attrList[j].id,
                                        attributeName : _this.attrList[j].name,
                                        attributeValueId : e.id,
                                        attributeValueName : e.name,
                                        orderNum : j
                                    })
                                }
                            })
                        })
                        result.push({
                            productSkuAttributes : attrArr,
                            code : '',
                            inventoryQty : '',
                            price : '',
                            // description : '',
                            minimumOrderQuantity : '',
                            costPrice : '',
                            orderNum : index + 1,
                            isMainImg : 0,
                            imageUrl : '',
                            isUp : true,
                            status : 1,
                        })
                    })
                    _this.formItem.skus = result;
                    return result;

                }else {
                    _this.formItem.skus = [];
                    return [];
                }
            },
            set : function(newValue) {
                // this.formItem.skus = newValue;
            }
        },
        SKUstate : function() {
            if(this.skus) {
                return this.skus.length >= 1;
            }
        },
        uploadHeader : function() {
            const tokenId = this.$store.state.token;
            return {
                token_id : tokenId
            }
        }
    },
    methods: {
        // 富文本
        onContentChange  (val) {
            this.formItem.description = val;
            console.log(this.formItem.description);
        },
       handleView (item) {
           this.imgUrl = item.url;
           this.visible = true;
       },
       handleRemove (file) {
           // 从 upload 实例删除数据
           const _this = this;
           const fileList = this.$refs.upload.fileList;
           this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
           this.formItem.images.forEach(function(item , index) {
                if(item.fileName == file.name && item.url == item.url) {
                    _this.formItem.images.splice(index,1);
                }
           })
       },
       handleError (err,file,fileList) {
            this.$Notice.warning(err);
       },
       handleSuccess (res, file,fileList) {
           file.url = res.url;
           file.name = res.fileName;
           const image = {
                fileName : res.fileName,
                fileType : res.fileSuffix,
                filePath : res.filePath,
                url : res.url,
                orderNum : fileList.length
           }
           this.formItem.images.push(image);
       },
       handleFormatError (file) {
           this.$Notice.warning({
               title: '文件格式不正确',
               desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
           });
       },
       handleMaxSize (file) {
           this.$Notice.warning({
               title: '超出文件大小限制',
               desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
           });
       },
       handleBeforeUpload () {
           const check = this.uploadList.length < 5;
           if (!check) {
               this.$Notice.warning({
                   title: '最多只能上传 5 张图片。'
               });
           }
           return check;
       },
       mainImgSuccess (res , file , fileList) {
            this.formItem.imageUrl = res.url;
       },
       skuMainImgSuccess (res,file,fileList) {
            console.log(res);
            if(res.status==1) {
                this.skuItem.imageUrl = res.url;
                this.formItem.skus[this.mainImgIndex] = this.skuItem;
            }
       },
       attachmentsSuccess (res,file,fileList) {
            console.log(res);
            const attachment = {
                 fileName : res.fileName,
                 fileType : res.fileSuffix,
                 filePath : res.filePath,
                 url : res.url,
                 orderNum : fileList.length
            }
            this.formItem.attachments.push(attachment);
            console.log(this.formItem);
       },
        del (index) {
            this.formItem.skus.splice(index,1);
        },
        change (data) {
            data.status = data.isUp ? '1' : '0';
            console.log(this.formItem);
            // console.log(this.skus);
            // console.log(this.formItem);
        },
        seleckAttr () {
            if(this.attributeChecked.length !== 0) {
                this.attributeCheckedHistory = this.attributeChecked;
            }
            this.attributeModel = true;
            
        },
        attrIsOk () {

            if(this.attributeCheckedHistory.length !== 0) {
                if(this.attributeChecked.join('') == this.attributeCheckedHistory.join('')) {
                    console.log('值相同');
                    return;
                }else {
                    this.attributeChangeModel = true;
                    
                    return;
                }
            }

            const _this = this;
            this.attrCheck = [];
            const attr = [];
            let attrIds = '';
            if(this.attributeChecked.length == 0) {
                this.attrList = [];
            }
            this.attributeChecked.forEach(function(el , i) {
                _this.attributeAll.forEach(function(item , index) {
                    if(item.name == el) {
                        attr.push(item);
                        attrIds += item.id + ',';
                    }
                })
            })
            attrIds = attrIds.slice(0,attrIds.length-1);
            _this.axios(api.productAttr +attrIds + api.productGetById )
                .then(function(res){
                    _this.attrList = res.data.datas;
                    
                })
                .catch(function(err) {
                    console.log(err);
                })
        },
        attrChangeIsOk () {
            const _this = this;
            this.attrCheck = [];
            const attr = [];
            let attrIds = '';
            if(this.attributeChecked.length == 0) {
                this.attrList = [];
            }
            this.attributeChecked.forEach(function(el , i) {
                _this.attributeAll.forEach(function(item , index) {
                    if(item.name == el) {
                        attr.push(item);
                        attrIds += item.id + ',';
                    }
                })
            })
            attrIds = attrIds.slice(0,attrIds.length-1);
            _this.axios(api.productAttr +attrIds + api.productGetById )
                .then(function(res){
                    _this.attrList = res.data.datas;
                    
                })
                .catch(function(err) {
                    console.log(err);
                })
        },
        attrChangeIsCancel () {
            this.attributeChecked = this.attributeCheckedHistory;
        },
        checkedAttr (data) {

            const _this = this;

            if(this.attrCheck.length - 1 < this.attrindex) {
                this.attrCheck.lenght = this.attrindex + 1;
                this.attrCheck[this.attrindex] = data;
                this.attrCheck.forEach(function(el,i) {
                    if(i !== _this.attrindex) {
                        _this.attrCheck.splice(i,1,[]);
                    }
                })
            }

            
        },

        save (name) {
            const _this = this;

            // _this.formItem.description = _this.editor.getContent();
            console.log("发布",_this.skus);
            console.log("发布2",this.attrCheck);
            this.$refs[name].validate((valid) => {

                _this.spinShow = true;
                if (valid) {
                    _this.formItem.description = _this.editor.getContent();
                    _this.formItem.catalogId = _this.formItem.catalog[_this.formItem.catalog.length-1];

                    // console.log(_this.formItem);

                    if(!this.isModify) {
                        _this.axios({
                                method : 'post',
                                header : {
                                    "Content-Type" : 'application/x-www-form-urlencoded'
                                },
                                url :api.product + api.add,
                                data : api.convertParam(_this.formItem)
                            })
                            .then(function(res) {
                                
                                const data = res.data;
                                if(data.status == 1) {
                                	 console.log("发布3",data);
                                    _this.spinShow = false;
                                    _this.$router.push('/goodsList');
                                }else {
                                    _this.$Message.error(data.message);
                                }
                            })
                            .catch(function(err) {
                                console.log(err);
                            })
                    }else {
                        console.log("发布444",_this.formItem);
                        _this.axios({
                            method : 'post',
                            header : {
                                "Content-Type" : 'application/x-www-form-urlencoded'
                            },
                            url :api.product + api.productModeify,
                            data : api.convertParam(_this.formItem)
                        })
                        .then(function(res){
                            const data = res.data;
                            if(data.status == 1) {
                                _this.spinShow = false;
                                _this.$router.push('/goodsList');
                            }else {
                                _this.$Message.error(data.message);
                            }
                        })
                        .catch(function(err){
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
        }
    }
}
</script>

<style scoped>
.addGoods .ivu-form-item-content {
    line-height: 20px;
}
.addGoods .span8 {
    padding-left: 20px;
}
.addGoods .link {
    color: #09f;
}
.addGoods .link:hover {
    color : #283f82;
}
.addGoods .demo-upload-list{
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
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.addGoods .demo-upload-list img{
    width: 100%;
    height: 100%;
}
.addGoods .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.addGoods .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.addGoods .demo-upload-list-cover i{
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
    background : #f5f7f9;
    border: 1px solid #ddd;
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
    background: #f9f9f9;
}
.addGoods .table-td {
    display: table-cell;
    height: 30px;
    width: auto;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.addGoods .bold {
    font-weight: 900;
}
.addGoods .upload {
    padding-left : 20px;
}
.addGoods .uploadLabel {
    width: 120px;
    display: inline-block;
    padding: 10px 12px 10px 0;
    vertical-align: top;
}
.addGoods .appendixUpload {
    padding-top: 15px;
}
.addGoods .inline-block {
    display: inline-block;
    width: 300px;
}
.addGoods .addFooter {
    padding: 15px 0;
}
.addGoods .ql-toolbar.ql-snow {
    background: #f9f9f9;
}
.addGoods .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: 500px;
    background: #fff;
}
.addGoods .ivu-icon {
    vertical-align: sub;
}

.addGoods .addImg {
    width: 58px;
    height: 58px;
    line-height: 58px;
    border: 1px dashed #d7dde4;
    display: inline-block;
    cursor: pointer;
    background: #fff;
    text-align: center;
    border-radius: 3px;
    transition: border 0.2s ease;
}
.addGoods .addImg:hover {
    border: 1px dashed #09f;
}
.addGoods .ivu-input-wrapper-small .ivu-input-icon + .ivu-input {
    padding-right: 0;
}
.addGoods .mainImg {
    width: 100%;
    height: 100%;
}


.addGoods .demo-spin-icon-load{
       animation: ani-demo-spin 1s linear infinite;
   }
@keyframes ani-demo-spin {
   from { transform: rotate(0deg);}
   50%  { transform: rotate(180deg);}
   to   { transform: rotate(360deg);}
}
.addGoods .demo-spin-col{
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
    background-color: rgba(0,0,0,.5);
}
.addGoods .ivu-spin {
    color: #fff;
}
	.qaz {
		width: 100%;
		height: 430px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		overflow: hidden;
		overflow-y: scroll;
	}
</style>
