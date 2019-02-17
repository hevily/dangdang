<template>
    <div class="showCustomer">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>
                <router-link to='/applyCustomerList'>
                    客户列表
                </router-link>
            </Breadcrumb-item>
            <Breadcrumb-item>申请明细</Breadcrumb-item>
        </Breadcrumb>
    <Form :model="audit"  label-position="left" :label-width="100">
        <Row class='clientInfo'>
            <Col span='8'>
                <Form-item label="客户名称:">
                    <span v-if='customer.customerCorpName'>{{customer.customerCorpName}}</span><span v-else>--</span> 
                </Form-item>
            </Col> 
            <Col span='9'>
                <Form-item label="申请状态:">
                    <span style="font-size:18px;" v-if='customer.applyStatusDispName'>{{customer.applyStatusDispName}}</span><span v-else>--</span>
                </Form-item>
            </Col> 
            <Col span='8'>
                <Form-item label="联系人:">
                    <span v-if='customer.contact'>{{customer.contact}}</span><span v-else>--</span>
                </Form-item>
            </Col> 
            <Col span='8'>
                <Form-item label="电话:">
                    <span v-if='customer.telephone'>{{customer.telephone}}</span><span v-else>--</span>
                </Form-item>
            </Col>
            <Col span='16'>
                <Form-item label="地址:">
                    <span v-if='customer.address'>{{customer.address}}</span><span v-else>--</span>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span='8'>
                <Form-item label="申请人:">
                    <span v-if='customer.applyUserName'>{{customer.applyUserName}}</span><span v-else>--</span>
                </Form-item>
            </Col> 
            <Col span='8'>
                <Form-item label="申请日期:">
                    <span v-if='customer.applyTime'>{{customer.applyTime}}</span><span v-else>--</span>
                </Form-item>
            </Col>
            <Col span='24'>
                <Form-item label="申请理由:">
                    <span v-if='customer.applyReason'>{{customer.applyReason}}</span><span v-else>--</span>
                </Form-item>
            </Col>
            <Col span='24'>
                <Form-item label="附件:">
                    <img v-if='customer.isImg == 1' :src="customer.attachmentUrl" style="width:200px;height : auto;" @click='showImg'>
                    <a v-else style="color:#09f;" :href="customer.attachmentUrl" title='点击下载'>{{customer.attachmentName}}</a>
                </Form-item>
            </Col>
        </Row>
        <Row class='auditInfo'>
            <Col span='16'>
                <Form-item label="审核理由">
                    <Input v-model="audit.auditContent" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入..."></Input>
                </Form-item>
            </Col>
        </Row>
    </Form>
    <Row type="flex" justify="center" class="addFooter">
        <Button type="info" @click="auditSave(true)">同意</Button>
        <Button type="info" @click="auditSave(false)" style="margin-left: 8px">不同意</Button>
    </Row>
        <Modal title="查看图片" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%">
        </Modal>
                     

      
    </div>
</template>

<script>
    import api from '@/api/api'
export default {
    name :'showCustomer',
    mounted () {
        const _this = this;
        this.DOM = {
            content : document.getElementById('content'),
        };

        // console.log(this.$route.params.id);

        const oid = this.$route.params.id;
        this.axios(api.cooperation + oid + api.queryById)
           .then(function(res){
               const data = res.data.datas;
               console.log(data);
               _this.customer = data;
           })
           .catch(function(err){
               console.log(err);
           })
        
    },
    data () {
        return {
            audit : {
                id : this.$route.params.id,
                auditStatus : false,
                auditContent : ''
            },
           customer : {},
           imgUrl : '',
           visible : false,
           // value : ''
        }
    },
    computed : {
        
    },
    methods: {
        showImg () {
            this.imgUrl = this.customer.attachmentUrl;
            this.visible = true;
        },
        auditSave (status) {
            const _this = this;
            if(status) {
                this.audit.auditStatus = 9;
            }else {
                this.audit.auditStatus = 7;
            }
            // this.audit.auditStatus = status;
            // console.log(this.audit);
            this.axios({
                method: 'post',
                //url : api.cooperation + api.audit,原来
                url : api.cooperation + api.customeraudit,//后改
                data : api.convertParam(this.audit)
            })
                .then(function(res){
                    console.log(res);
                    if(res.data.status == 1) {
                        _this.$router.push('/cooperation/supplier/audit');
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
        }
    }
}
</script>

<style scoped>
    .ivu-form-item {
        margin: 0;
        margin-top: 10px;

    }
    .ivu-form .ivu-form-item-label {
        font-size: 16px;
        color: #666;
    }
    .ivu-form-item-content {
        font-size: 18px;
        color: #333;
    }

    .addFooter {
        margin-top: 20px;
        padding-bottom: 20px;
    }
</style>