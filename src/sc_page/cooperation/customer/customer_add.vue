<template>
	<div class="addsupplier">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>客户</Breadcrumb-item>
			<Breadcrumb-item>网络邀请客户</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
			<div style="width: 500px; margin-top: 10px;">
				<Steps :current="current" width='100px'>
					<Step title="选择客户" content="选择需要添加的客户"></Step>
					<Step title="填写请求信息" content="编辑申请理由和上传相关附件"></Step>
				</Steps>
			</div>
			<Tabs :value="tabPage">
				<TabPane name="1">
					<div class="search-box">
						<input class='search-input' v-model="searchInput" placeholder="请输入企业名称"/>
						<button class="search-btn" @click='queryClient'><img /></button>
					</div>
					<Table :columns="tableModle" :data="corpList" highlight-row></Table>
					<div class="tab-one">
						<button class="btn-return" @click.native="back">返回列表</button>
						<button class="btn-save" @click="next">下一步</button>
					</div>
				</TabPane>
				<TabPane name="2">
					<Row style="border-top: 1px solid #ccd9e6;">
						<Col span="8" style="color: #000; font-size: 16px;">您期望邀请的客户信息：</Col>
						<Col span="16"></Col>

						<Col span="8" class="addsupplier-title">供应商：</Col>
						<Col span="16" class="addsupplier-info">{{selectSupplier.name}}</Col>

						<Col span="8" class="addsupplier-title">法人代表：</Col>
						<Col span="16" class="addsupplier-info">{{selectSupplier.legalPerson}}</Col>

						<Col span="8" class="addsupplier-title">社会信用代码：</Col>
						<Col span="16" class="addsupplier-info">{{selectSupplier.uscc}}</Col>
						
						<Col span="8" class="addsupplier-title" style="text-align: right;"><span class="Must">*</span>邀请描述：</Col>
						<Col span="16" style="height: 70px; margin: 10px 0 20px;">
							<Input v-model="customer.applyReason" type="textarea" :maxlength="240" placeholder="请输入不超过255个字符申请描述" style="width: 50%"></Input>
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
					<Modal title="附件图片" v-model="visible" :styles="{top: '20px'}">
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
                    {title: ' ', width: 160, align: 'center',
                        render: (h,params) => {
                            return h('div',[
                                h('input',{
									attrs: {type:"radio",name: "select", checked: params.index == this.select ? "checked" : ""},
									props: {},
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

				customer: {
					customerId: '',
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
			back(){
				this.$router.push({path: '/cooperation/customer/add'})
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
                    if(res.data.status == 1){
                        this.corpList = res.data.datas.list;
                        this.corpTotalCount = res.data.datas.total;
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
			submitAudit(){
				if(!this.customer.applyReason){
                    this.re_do = '请填写申请描述';
                    this.do_no = true;
                    setTimeout(() => {this.do_no = false;}, 2000);
                    return ;
                }
                if(!this.customer.attachmentName){
                    this.re_do = '请提交附件';
                    this.do_no = true;
                    setTimeout(() => {this.do_no = false;}, 2000);
                    return ;
                }
                this.customer.customerId = this.selectSupplier.id;

				this.axios({
                    method: 'post',
                    url: api.addCustomer,
                    data: api.convertParam(this.customer)
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        this.do_yn = true;
                        this.re_do = '已发送供应商审核';
                        setTimeout(() => {
                            this.$router.push('/cooperation/customer/add');
                        }, 2000);
                    } else {
                        this.do_no = true;
                        this.re_do = res.data.message;
                        setTimeout(() => {this.do_no = false;}, 2000);
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
				this.customer.attachmentName = res.fileName;
				this.customer.attachmentUrl = res.url;
                this.uploadList = fileList;
                this.re_do = '附件提交成功';
                this.do_yn = true;
                setTimeout(() => {this.do_yn = false;}, 2000);
			},
			handleRemoveUpload(file, fileList) {
				this.uploadList = fileList;
			},
			selectHandler(index){
                this.select = index;
            },
		},
		created() {

		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}
		},
	}
</script>
<style type="text/css">
	.uploadbtn2 span:first-child {
		display: flex;
		align-items: center;
	}
	
	.uploadbtn2 span:first-child .uploadbtn2_title {
		margin-left: 15px;
	}
	
	.uploadbtn2 span:first-child .uploadbtn2_title2 {
		color: #8e9faf;
	}
	
	.localimport .fontitem input,
	.localimport .fontitem textarea {
		width: 300px;
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
        margin-top: 52px;
        bottom: 0;
    }

    .tab-two {
        position: relative;
        margin-top: 84px;
        left: 36%;
        top: -10px;
    }

    .addsupplier-title {
        text-align: right;
        padding-right: 10px;
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
</style>
