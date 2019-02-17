<template>
	<div class="addsupplier">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>供应商</Breadcrumb-item>
			<Breadcrumb-item>网络邀请供应商</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
            <div style="width: 500px; margin-top: 10px;">
                <Steps :current="current" width='100px'>
                    <Step title="选择供应商" content="选择需要添加的供应商"></Step>
                    <Step title="填写请求信息" content="编辑申请理由和上传相关附件"></Step>
                </Steps>
            </div>
            <Tabs :value="tabPage">
                <TabPane name="1">
                    <div class="search-box">
                        <input class='search-input' v-model="searchInput" placeholder="请输入企业名称">
                        <button class="search-btn" @click='queryClient'><Icon type="search"></Icon></button>
                    </div>
                    <Table :columns="tableModle" :data="corpList" highlight-row></Table>
                    <div class="tab-one">
                        <button class="btn-return" @click.native="back">返回列表</button>
                        <button class="btn-save" @click="next">下一步</button>
                    </div>
                </TabPane>
                <TabPane name="2">
                    <Row style="border-top: 1px solid #ccd9e6;">
                        <Col span="8">您期望邀请的供应商信息：</Col>
                        <Col span="16"></Col>

                        <Col span="8" class="addsupplier-title">供应商：</Col>
                        <Col span="16" class="addsupplier-info">{{selectSupplier.name}}</Col>

                        <Col span="8" class="addsupplier-title">法人代表：</Col>
                        <Col span="16" class="addsupplier-info">{{selectSupplier.legalPerson}}</Col>

                        <Col span="8" class="addsupplier-title">社会信用代码：</Col>
                        <Col span="16" class="addsupplier-info">{{selectSupplier.uscc}}</Col>
                        
                        <Col span="8" class="addsupplier-title" style="text-align: right;"><span class="Must">*</span>邀请描述：</Col>
                        <Col span="16" style="height: 70px; margin: 10px 0 20px;">
                            <Input v-model="supplier.applyReason" type="textarea" :maxlength="240" placeholder="请输入不超过255个字符申请描述" style="width: 50%"></Input>
                        </Col>

                        <Col span="8" class="addsupplier-title" style="text-align: right;"><span class="Must">*</span>附件：</Col>
                        <Col span="16">
                            <Upload 
                                :action="uploadUrl"
                                class='inline-block'
                                style="display: inline-block;width:58px;"
                                :on-success="attachmentsSuccess"
                                :headers='uploadHeader'
                                :data='uploadData'
                                :default-file-list="defaultList"
                                :on-remove='handleRemoveUpload'>
                                <div style="width: 58px;height:56px;line-height: 56px;">
                                    <Icon class="plus" type="plus" size="20"></Icon>
                                </div>
                            </Upload>
                            <div class="upload-oneimg" v-if="uploadFile.isImage == '1'">
                                <img :src="uploadFile.filePath" style="width: 58px; height: 58px;" :title="fileName" @click="uploadShow">
                            </div>
                            <div class="upload-onefile" v-if="uploadFile.isImage == '0'" :title="'文件：点击下载 ' + fileName">
                                <a :href="uploadFile.filePath" download="">
                                    <img src="../../../assets/img/welpic.jpg" style="width: 58px; height: 58px;">
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <div class="tab-two">
                        <button class="btn-return" @click.native="back">返回列表</button>
                        <button class="btn-return" @click="tabPage = '1'; current = 0;">返回上一步</button>
                        <button class="btn-save" @click="submitAudit">提交</button>
                    </div>
                    <Modal title="附件图片" v-model="visible" :styles="{top: '20px'}" @on-ok="ok" @on-cancel="cancel">
                        <div class="image-modal-wrap">
                            <img :src="uploadFile.url" style="maxHeight: 500px; width: 100%; margin: 0 auto;">
                        </div>
                    </Modal>
                </TabPane>
            </Tabs>
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
		name: 'addsupplier',
		data() {
			return {
				re_do: '',
				do_yn: false,
                do_no: false,
                tabPage: '1',
                current: 0,

                searchInput: '',
                corpList: [],
                select: undefined,
                selectSupplier: {},
                tableModle: [
                    {title: '选择', width: 160, align: 'center',
                        render: (h,params) => {
                            return h('div',[
                                h('div',{
                                        style: {
                                        width: '100%',
                                        height: '48px',
                                        backgroundImage: this.select == params.index ? "url('" + require('../../../assets/img/button/selected.jpg') +"')" : 'none',
                                        backgroundSize: '40px 30px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    },
                                    on: {
                                        click: () => {
                                            this.selectHandler(params.index);
                                        }
                                    }
                                })
                            ])
                        }
                    },
					{title: '企业名称',	key: 'name', ellipsis: true},
					{title: '社会统一信用代码', key: 'uscc', ellipsis: true},
					{title: '法人代表',	key: 'legalPerson', ellipsis: true},
					{title: '注册地址',	key: 'address', ellipsis: true}
				],
                corpTotalCount: 1000,
                pageInfo: {
                    pageStart: 1,
                    pageSize: 1000
                },

				supplier: {
					supplierId: '',
					name: '',
					people: '',
					phone: '',
					addr: '',
					applyReason: '',
					attachmentName: '', // 附件名称
					attachmentUrl: '', // 附件地址
				},
				uploadUrl: api.uploadFileUrl,
				uploadData: {
					path: 'product'
				},

				defaultList: [],
                uploadList: [],
                uploadFile: {
                    fileName: '',
                    filePath: '',
                    fileSuffix: '',
                    isImage: '',
                    message: '',
                    status: '',
                    url: '',
                },
                fileName: '',
                visible: false,
			}
		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			},
		},
		methods: {
            ok(){
                this.visible = false;
            },
            cancel(){
                this.visible = false;
            },
            uploadShow(){
                this.visible = true;
            },
            back(){
                this.$router.push({path: '/cooperation/supplier/add'})
            },
            submitAudit() {
                if(!this.supplier.applyReason){
                    this.re_do = '请填写申请描述';
                    this.do_no = true;
                    setTimeout(() => {this.do_no = false;}, 2000);
                    return ;
                }
                if(!this.supplier.attachmentName){
                    this.re_do = '请提交附件';
                    this.do_no = true;
                    setTimeout(() => {this.do_no = false;}, 2000);
                    return ;
                }
                this.supplier.supplierId = this.selectSupplier.id;

				this.axios({
                    method: 'post',
                    url: api.supplierSave,
                    data: api.convertParam(this.supplier)
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        this.do_yn = true;
                        this.re_do = '已发送供应商审核';
                        setTimeout(() => {
                            this.$router.push('/cooperation/supplier/add');
                        }, 2000);
                    } else {
                        this.do_no = true;
                        this.re_do = res.data.message;
                        setTimeout(() => {this.do_no = false;}, 2000);
                    }
                })
			},
            next(){
                if(this.select == undefined){
                    this.re_do = '请选择供应商';
                    this.do_no = true;
                    
                    setTimeout(() => {this.do_no = false;}, 2000);
                    return ;
                }
                this.tabPage = '2';
                this.current = 1;
                this.selectSupplier = this.corpList[this.select];
            },
            selectHandler(index){
                this.select = index;
            },
            queryClient(){
                if(!this.searchInput) {
                    this.corpList = [];
                    return ;
                } 
                this.axios({
                    method: 'post',
                    url: '/api/upms/corp/queryByRequest.do',
                    data: {
                        name: this.searchInput,
                        uscc: this.searchInput,
                        status: 1,
                        page: 1,
                        rows: 1000,
                    }
                })
                .then((res) => {
                    console.log('res',res);
                    if(res.data.status == 1){
                        this.corpList = res.data.datas.list;
                        this.corpTotalCount = res.data.datas.total;
                    }
                })
            },

			attachmentsSuccess(res, file, fileList) {
				if(fileList.length > 1) {
					fileList.splice(0, 1);
                }
                if(file.response.status == 0){
                    this.re_do = file.response.message;
                    this.do_no = true;
                    setTimeout(() => {this.do_no = false;}, 2000);
                    return ;
                }
                this.uploadFile = file.response;
                this.fileName = file.name;
				this.supplier.attachmentName = res.fileName;
				this.supplier.attachmentUrl = res.url;
                this.uploadList = fileList;
                this.re_do = '附件提交成功';
                this.do_yn = true;
                setTimeout(() => {this.do_yn = false;}, 2000);
			},
			handleRemoveUpload(file, fileList) {
				this.uploadList = fileList;
			},
		}
	}
</script>
<style>
	.addsupplier .appendixUpload label {
		width: 80px;
		text-align: right;
		display: inline-block;
		padding: 10px 12px 10px 0;
		vertical-align: top;
	}
	
	.addsupplier .appendixUpload .inline-block {
		display: inline-block;
		width: 500px;
	}
	
	.addsupplier .ivu-table table {
		width: 100%;
	}
	
    .addsupplier .ivu-table {
        min-height: 300px;
    }

    /* .addsupplier .ivu-table-body{
        max-height: 250px;
    } */

	.addsupplier .table-td {
		display: table-cell;
		height: 30px;
		width: auto;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
		padding: 10px 20px;
	}

    .addsupplier th {
        padding: 10px;
    }
	
	.searchinput input {
		border-radius: 4px 0 0 4px;
		border-right: none!important;
	}
	
	.searchbtn {
		width: 40px;
		border: 1px solid transparent;
		border-radius: 0 4px 4px 0!important;
		height: 32px;
		margin-left: 0!important;
		background-color: #ff9900;
	}
	.addsupplier.searchbtn img{
		height: 30px;
        position: relative;
        top: -2px;
	}

    .addsupplier .ivu-tabs-bar {
        border-bottom: none;
        margin-bottom: 10px;
        visibility: hidden;
    }

    .addsupplier .ivu-table-tbody .ivu-table-row .ivu-table-cell {
        height: 48px;
        line-height: 48px;
    }
</style>
<style scoped>
    .addsupplier-order {
        display: flex;
    }

    .addsupplier-orderOne, .addsupplier-orderTwo {
        width: 28px;
        background: #3E96DB;
        height: 28px;
        line-height: 28px;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        margin: 0 10px;
    }

    .addsupplier-orderDescOne span, .addsupplier-orderDescTwo span {
        display: inline-block;
        width: 100px;
        height: 1px;
        background: #EBEAEA;
        margin-left: 6px
    }

    .addsupplier-order p {
        color: #333333;
    }

    .addsupplier-orderDescOne p:last-child, .addsupplier-orderDescTwo p:last-child {
        color: #999999;
        margin-top: 4px;
    }

    h3 {
        color: #000;
    }

    .ivu-col {
        height: 40px;
        line-height: 40px;
        /* margin: 4px 0; */
        font-size: 14px;
        color: #415161;
        font-weight: 500;
    }

    .upload-btn {
        margin-left: 0;
    }

    .tab-one {
        position: relative;
        left: 36%;
        margin: 22px 0 30px;
        bottom: 0;
    }

    .tab-two {
        position: relative;
        margin-top: 84px;
        left: 36%;
        top: -10px;
    }

    .addsupplier-title, .addsupplier-info {
        
    }

    .addsupplier-title {
        text-align: right;
        padding-right: 10px;
    }

    .addsupplier-info {

    }

    .Must {
        position: relative;
        top: 2px;
        margin-right: 2px;
    }

    .plus {
		padding: 15px 20px;
		margin-top: -3px;
		border: 1px dashed #ccc;
        cursor: pointer;
	}

    

    /* .upload-file:hover span {
        background: #ccc;
        display: block;
    }

    .upload-file span {
        position: absolute;
        display: none;
        top: 0px;
        right: 0;
        height: 15px;
        width: 15px;
        line-height: 15px;
        text-align: center;
    }

    .upload-file span:hover {
        background: #000;
        color: #fff;
    } */
</style>
