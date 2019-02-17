<template>
    <div class="customer">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>供应商管理</Breadcrumb-item>
            <Breadcrumb-item>供应商审核</Breadcrumb-item>
        </Breadcrumb>
        <Row class="fileHandle">
            <Col span='8'>
               <span>客户名称：</span>
               <Input placeholder="产品名称/编码" style="width: 230px" v-model='name'></Input>
                    
               <Button type="warning"  @click='query'>查询</Button>
            <div>
            </Col>
        </Row>
        <Row type="flex" justify="end" class="fileHandle">
            <div class="buttonM">
                <router-link to='/addCustomer'>
                   <Button type="warning">新增</Button>
               </router-link>
            </div>
            <div class="buttonM">
                <Button type="info">导入</Button>
            </div>
            <div class="buttonM">
                <Button type="info">导出</Button>
            </div>
            <div class="buttonM">
                <Button type="info">模板下载</Button>
            </div>
        </Row>

        <div class='fileHandle'>
            <Table :columns="tableModle" :data="customerList"></Table>
        </div>
        <Row class="fileHandle" type="flex" justify="end">
           <Page :total="total" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
       </Row>
       <div class="fileHandle"></div>        
    </div>
</template>

<script>
    import api from '@/api/api'
export default {
    name :'customer',
    mounted () {
        const _this = this;
        this.DOM = {
            content : document.getElementById('content'),
        };
        _this.axios({
            method : 'post',
            //url :api.customer + api.queryAllPost,
	    url :"/api/cooperation/supplier/queryAuditListByRequest.do",
            data : api.jsonData(this.data)
        })
            .then(function(res){
                console.log(res);
                _this.total = res.data.datas.total;
                _this.customerList = res.data.datas.rows;
            })
            .catch(function(err){
                console.log(err);
            })

        
    },
    data () {
        return {
            DOM : {},
            name : '',
            tableModle : [
                {
                    type: 'index',
                    title: '编号',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '供应商',
                    width: 230,
                    align: 'center',
                    key: 'supplierCorpName'
                },
                {
                    title: '添加人',
                    width: 100,
                    align: 'center',
                    key: 'applyUserName'
                },
                {
                    title: '添加日期',
                    width: 180,
                    align: 'center',
                    key: 'applyTime'
                },
                {
                    title: '验证人',
                    width: 100,
                    align: 'center',
                    key: 'auditUserName'
                },
                {
                    title: '验证日期',
                    width: 180,
                    align: 'center',
                    key: 'auditTime'
                },
                {
                    title: '状态',
                    width: 100,
                    align: 'center',
                    key: 'applyStatusDispName'
                },
                {
                    title : '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        if(params.row.applyStatus == 1){
                            return h('Button',{
                                props : {
                                    type : 'text',
                                    size : 'small'
                                },
                                on : {
                                    click : () => {
                                        this.audit(params.row);
                                    }
                                }
                            },'接受');
                        }
                        return h('Button',{
                            props : {
                                type : 'text',
                                size : 'small'
                            },
                            on : {
                                click : () => {
                                    this.show(params.row);
                                }
                            }
                        },'查看')
                    }
                }

            ],
           customerList : [],
           name : '',
           total: 30,
        }
    },
    computed : {
        data :function(){
            return {
                name : this.name,
                pageStart : this.$store.state.page.auditCustomer,
                pageNums : this.$store.state.pageNums,
            };

        }
    },
    methods: {
        toPage (count) {
            const _this = this;
            _this.$store.commit('auditCustomer',count);

            _this.axios({
                method : 'post',
               // url :api.customer + api.queryAllPost,
	        url :"/api/cooperation/supplier/queryAuditListByRequest.do",
                data : api.jsonData(this.data)
            })
                .then(function(res){
                    console.log(res);
                    _this.total = res.data.datas.total;
                    _this.customerList = res.data.datas.rows;
                    _this.DOM.content.scrollTop = 0;
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        query () {
            const _this = this;
            _this.$store.commit('auditCustomer',1);
            if(!this.data.name) {
                this.$Message.warning('请输入查询条件');
                return;
            }

            _this.axios({
                method : 'post',
                //url :api.customer + api.queryAllPost,
		url :"/api/cooperation/supplier/queryAuditListByRequest.do",
                data : api.jsonData(this.data)
            })
                .then(function(res){
                    // console.log(res);
                    _this.total = res.data.datas.total;
                    _this.customerList = res.data.datas.rows;
                    _this.DOM.content.scrollTop = 0;
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        audit (data) {
            // console.log(data);
            this.$router.push({path : '/audit/' + data.id})
        },
        show(data){
            // console.log(data);
            this.$router.push('/showCustomer/' + data.id);
        }
    }
}
</script>

<style scoped>
    
</style>