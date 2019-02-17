<template>
   <div class="goodsAttr">
       <Breadcrumb>
            <Breadcrumb-item>产品信息</Breadcrumb-item>
            <Breadcrumb-item>产品属性</Breadcrumb-item>
        </Breadcrumb>
         <Row class="fileHandle">
             <Col span='14'>
                <div>
                    <span class="fileHandle_span">关 键 字：</span>
                    <Input placeholder="产品名称/编码" style="width: 230px; margin-right: 20px;" v-model='name'></Input>
                    <Button type="warning"  @click.native='query'>查 询</Button>
                
             </Col>
              <Col span='10'>
              	<div class="buttonM">
	                 <router-link to='/productAttribute/add'>
	                     <Button type="warning" class="warning">新 增</Button>
	                 </router-link>
	             </div>
              </Col>
         </Row>
         <Row type="flex" justify="end" class="fileHandle">
             <div class="buttonM">
                 <!--<Button type="info">导入</Button>-->
             </div>
             <div class="buttonM">
                 <!--<Button type="info">导出</Button>-->
             </div>
             <!--<div class="buttonM">
                 <Button type="info">产品属性模板下载</Button>
             </div>-->
         </Row>
         <div class="fileHandle">
            <Table :columns="tableHeader" :data="attrList"></Table>
         </div>
         <Row class="fileHandle" type="flex" justify="end">
             <Page :total="totalCount" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
         </Row>
        
        
   </div>
</template>

<script>
    import api from '@/api/api'
export default {
    name : 'goodsAttr',
    mounted () {
        const _this = this;
        this.DOM = {
            content : document.getElementById('content'),
        };

        _this.axios({
            method : 'post',
            url :api.productAttr + api.productGetAll,
            data : api.convertParam(this.data)
        })
            .then(function(res){
                console.log(res);
                _this.totalCount = res.data.datas.total;
                _this.attrList = res.data.datas.rows;
            })
            .catch(function(err){
                console.log(err);
            })

    },
    data () {
        return {
            DOM : {},
            tableHeader : [
                    {
                        title: '属性名称',
                        key: 'name'
                    },
                    {
                        title: '属性值',
                        key: 'valueNames'
                    },
                    {
                        title : '操作',
                        key: 'action',
                        align: 'center',
                        render : (h,params) => {
                            return h('div',[
                                h('Button',{
                                    props: {
                                        size : 'small'
                                    },
                                    on : {
                                        click : () => {
                                            this.modify(params.index , params.row);
                                        }
                                    }
                                },'编辑'),
                                h('Button',{
                                    props: {
                                        size : 'small'
                                    },
                                    on : {
                                        click : () => {
                                            this.remove(params.index , params.row);
                                        }
                                    }
                                },'删除'),
                            ])
                        }
                    }
            ],
            attrList : [],
            name : '',
            totalCount: 30,
        }
    },
    computed : {
        data :function(){
            return {
                name : this.name,
                pageStart : this.$store.state.goodsAttrPage,
                pageNums : this.$store.state.pageNums
            };

        }
    },
    methods : {
        toPage (count) {
            const _this = this;
            _this.$store.commit('goodsAttrPage',count);
            _this.axios({
                    method : 'post',
                    header : {
                        "Content-Type" : 'application/x-www-form-urlencoded'
                    },
                    url : api.productAttr + api.productGetAll,
                    data : api.convertParam(this.data)
                })
                .then(function(res) {
                    const data = res.data.datas;
                    _this.totalCount = data.total;

                    _this.attrList = data.rows;
                    _this.DOM.content.scrollTop = 0;
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        query () {
            const _this = this;
            _this.$store.commit('goodsAttrPage',1);
            _this.axios({
                method : 'post',
                url :api.productAttr + api.productGetAll,
                data : api.convertParam(this.data)
            })
                .then(function(res){
                    // console.log(res);
                    _this.totalCount = res.data.datas.total;
                    _this.attrList = res.data.datas.rows;
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        modify (index,data) {
            this.$router.push({name :"addGoodsAttr",params : {id : data.id}});
        },
        remove (index,data) {
            const _this = this;

            this.$Modal.confirm({
                title: '确认框',
                content: '<p>确定要删除产品属性吗</p>',
                onOk: () => {
                    _this.axios(api.productAttr + data.id + api.deleted)
                        .then(function(res){
                            console.log(res);
                            if(res.data.status == 1) {
                                _this.attrList.splice(index , 1);
                            }else {
                                _this.$Message.error(res.data.message);
                            }
                        })
                        .catch(function(err){
                            console.log(err);
                        })
                }
            });
            
        }
       
    }
}
</script>

<style scoped>
.table {
    display: table;
    width: 100%;
    margin: 10px;
}
.child-table {
    display: table;
    width: 200%;
}
.table-header {
    display: table-header-group;
    background : #f5f7f9;
    border: 1px solid #ddd;
    /*color: #fff;*/
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
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.warning{
	width: 120px;
}
.fileHandle_span{
	display: inline-block;
	margin: 0 0 0 20px;
}
.buttonM{
	text-align: right;
}
</style>