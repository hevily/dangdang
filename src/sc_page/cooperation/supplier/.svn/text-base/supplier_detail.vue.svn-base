<template>
	<div class="showCustomer">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>
				<router-link to='/customerList'>
					客户列表
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>申请明细</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp">
            <Row style="margin-top: 20px;">
                <Col span="3" class="col-title">供应商名称：</Col>
                <Col span="8" class="col-info">
                    <router-link :to="'/cooperation/detail?id=' + customer.supplierCorpId">{{customer.supplierCorpName}}</router-link>
                </Col>

                <Col span="3" class="col-title">申请状态：</Col>
                <Col span="8" class="col-info">{{customer.applyStatusName}}</Col>

                <Col span="3" class="col-title">法人代表：</Col>
                <Col span="8" class="col-info">{{corpInfo.legalPerson}}</Col>

                <Col span="3" class="col-title">社会信用代码：</Col>
                <Col span="8" class="col-info">{{corpInfo.uscc}}</Col>

                <Col span="3" class="col-title">申请人：</Col>
                <Col span="8" class="col-info">{{customer.applyUserName}}</Col>

                <Col span="3" class="col-title">申请日期：</Col>
                <Col span="8" class="col-info">{{customer.applyTime}}</Col>
            
                <Col span="3" class="col-title">地址：</Col>
                <Col span="19" class="col-info" :title="address">{{address}}</Col>
            </Row>
            <Row>
                <Col span="3" class="col-title">申请描述：</Col>
                <Col span="19" class="col-info" :title="customer.applyReason">{{customer.applyReason}}</Col>
            </Row>
            <Row>
                <Col span="3" class="col-title" style="margin-top: 20px;">附件：</Col>
                <div class="showCustomer-img">
                    <div class="upload-oneimg" v-if="customer.isImg == '1'">
                        <img :src="customer.attachmentUrl" style="width: 58px; height: 58px;" :title="customer.attachmentName" @click="showImg">
                    </div>
                    <div class="upload-onefile" v-if="customer.isImg == '0' && customer.attachmentUrl" :title="'文件：点击下载 ' + (customer.attachmentName ? customer.attachmentName : '')">
                        <a :href="customer.attachmentUrl" download="">
                            <img src="../../../assets/img/welpic.jpg" style="width: 58px; height: 58px;">
                        </a>
                    </div>
                    <!-- <div class="sc_box">
                        <img src="../../../../assets/img/fj_le.png" @click='showImg' />
                    </div> -->
                </div>
            </Row>
		</div>
        <div class="btn-bot">
            <button class="btn-return" @click='back'>返回</button>
        </div>
        <Modal title="查看图片" v-model="visible" width= 800 class-name="vertical-center-modal">
            <div class="image-modal-wrap">
                <img :src="imgUrl" style="maxHeight: 500px; width: auto; margin: 0 auto;">
            </div>
        </Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'showCustomer',
		created() {
			if(!this.$route.params.id) {
				this.$router.go(-1);
			}
			const id = this.$route.params.id;
			this.axios(api.cooperation + id + api.queryById)
            .then((res) => {
                if(res.data.status == 1){
                    this.customer = res.data.datas;
                    this.corpInfo = res.data.datas.corpInfo;
                }
            })
            .catch((err) => {
                console.log(err);
            })
		},
		data() {
			return {
                customer: {},
                corpInfo: {},
				imgUrl: '',
				visible: false,
                audit: {},
			}
		},
		methods: {
			back() {this.$router.push('/cooperation/supplier/add');},
			showImg() {
				this.imgUrl = this.customer.attachmentUrl;
				this.visible = true;
			}
        },
        computed:{
            address(){
                return `${this.corpInfo.provinceName ? this.corpInfo.provinceName : ''} ${this.corpInfo.cityName ? this.corpInfo.cityName : ''} ${this.corpInfo.countyName ? this.corpInfo.countyName : ''} ${this.corpInfo.address ? this.corpInfo.address : ''}`;
            }
        }
	}
</script>
<style type="text/css">
	.showCustomer .ivu-form-item-content{
		border-radius: 5px;
	}
	.showCustomer .ivu-form-item-label{
		font-size: 12px!important;
	}

    .showCustomer-title {
        text-align: right;
        padding-right: 10px;
    }

</style>
<style scoped>
	.sc_box {
		display: flex;
		padding: 10px;
		background: #ccc;
		border-radius: 5px;
	}

    .showCustomer-title, .showCustomer-info {
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        margin-bottom: 7px;
    }

    .showCustomer-img, .showCustomer-applyreason {
        display: inline-block;
        
    }

    .showCustomer-applyreason {
        width: 33.33%;
        height: 33px;
        margin-left: 2px;
        border-bottom: 1px dashed #999;
        position: relative;
        top: -1px;
        padding-left: 10px;
    }

    .showCustomer-applyreason span {
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        word-wrap: break-word;
        word-break: break-all;
        padding-bottom: 7px;
        border-bottom: 1px dashed #999;
    }

    .showCustomer-img {
        margin: 24px 0 0 10px;
    }
</style>