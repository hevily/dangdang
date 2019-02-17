<template>
   <div class="goodsList">
       <Breadcrumb>
       		<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
            <Breadcrumb-item>产品信息</Breadcrumb-item>
            <Breadcrumb-item>全部产品</Breadcrumb-item>
        </Breadcrumb>
        <div class="right_home_warp test-1">
        <Row class="fileHandle mag" type='flex' justify='center'>
            <Col span='6'>
                <!--<span>品类：</span>-->
                <!--<Cascader class='catalogCascader' change-on-select :data="CatalogList" v-model='catalog' trigger='hover'-->
                <!--@keyup.native='enter($event)'></Cascader>-->
                 <!--<Cascader class='catalogCascader' change-on-select :data="CatalogList" v-model='catalog' trigger='hover'
                @keyup.native='enter($event)'></Cascader>-->
                <span class="spanCol">品类：</span>
                <Cascader class="cas_dev" placeholder="请选择" size="large" v-model='catalog' :data="CatalogList" :render-format="format" change-on-select style="width:200px;display: inline-block;"></Cascader>
                  <!--<Select  style="width:200px" @keyup.native='enter($event)'>
                    <Option  v-for="item in CatalogList" :data="CatalogList" trigger='hover' :value="item.name" :key="item">{{ item.name }}</Option>
               	</Select>-->
            </Col>
            <Col span='6'>
                <span class="spanCol">状态：</span><Select v-model="data.status" style="width:200px" @keyup.native='enter($event)'>
                    <Option v-for="item in statusList" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span='6'>
                <span class="spanCol">产品名称：</span>
                <Input v-model="data.name" placeholder="产品名称/编码" style="width: 200px" @keyup.native='enter($event)'></Input>
                <Row class="fileHandle" type='flex' justify='end'>
                    <!--<Col span='9'>
                        <Button type="warning" icon="ios-search" long @click.native='query'>查询</Button>
                    </Col>-->
                </Row>
            </Col>
              <Col span='6'>
                        <Button class="ButCol" type="warning" icon="ios-search" long @click.native='query'>查询</Button>
                        <Button class="ButCol" type="warning"  long @click='aaa'>修改页面入口</Button>
               </Col>
             
        </Row>
        <Row type="flex" justify="end" class="fileHandle mag">
            <div class="buttonM">
                <router-link to='/goodsList/add'>
                    <Button type="warning">新增</Button>
                </router-link>
            </div>
            <div class="buttonM">
                <!--<Button type="info">导入</Button>-->
            </div>
            <div class="buttonM">
                <!--<Button type="info">导出</Button>-->
            </div>
            <div class="buttonM">
                <!--<Button type="info">模板下载</Button>-->
            </div>
            <div class="buttonM">
                <!--<a href="###" type="text">产品导入帮助</a>-->
            </div>
        </Row>

        <div class="fileHandle">
            <Table :columns="columns5" :data="goodsList"></Table>
        </div>
        <Row class="fileHandle mag" type="flex" justify="end">
            <Page :total="goodsTotalCount" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
        </Row>
        <div class="fileHandle"></div>
        
        </div>
   </div>
</template>

<script>
    import api from '@/api/api'
export default {
    mounted () {
        const _this = this;
        const goods = [];
        this.DOM = {
            content : document.getElementById('content'),
        };
        // 获取产品分类
        _this.axios({
                method : 'get',
//              url :api.qroductCatalog + api.queryAll
 				url :'/api/product/catalog/9999/queryTreeById.do'
            })
            .then(function(res) {
            	 console.log('11111111111',res.data);
                _this.CatalogList = res.data.datas;
            })
            .catch(function(err) {
                console.log(err);
            })

        _this.axios({
                method : 'post',
                header : {
                    "Content-Type" : 'application/x-www-form-urlencoded'
                },
                url : api.product + api.productByRequset,
                data : api.convertParam({pageStart : _this.$store.state.goodsListPage , pageNums : _this.$store.state.pageNums})
            })
            .then(function(res) {
                const data = res.data.datas.rows;
                console.log(res);
                _this.goodsTotalCount = res.data.datas.total;
                _this.originalGoodsList = data;
                data.forEach(function(item , index){
                    goods.push({
                        id : item.id,
                        name : {
                            img : item.imageUrl,
                            name : item.name , 
                            code : item.barCode
                        },
                        prize : item.price ? item.price : '协商',
                        unit : item.unitId,
                        qrUrl : item.qrUrl,
                        status : item.status == 0 ? '下架' : '上架',
                        classify : item.catalogId,
                        inventoryQty : item.inventoryQty,
                        spec : item.spec
                    })
                })
                _this.goodsList = goods;

            })
            .catch(function(err){
                console.log(err);
            })
       

    },
    data () {
        return {
            DOM : {},
            CatalogList : [],
            catalog : [],
            statusList: [
                {
                    value: '3',
                    label: '无'
                },
                {
                    value: '1',
                    label: '上架'
                },
                {
                    value: '0',
                    label: '下架'
                }
            ],
            columns5 : [
                {
                    title: '产品名称',
                    key: 'name',
                    width : 300,
                    render (h, params) {
                        return h('div',{
                            attrs : {
                                class : 'wares'
                            }
                        },[
                            h('img',{
                                attrs : {
                                    src : params.row.name.img
                                }
                            }),
                            h('div',{
                                attrs : {
                                    class : 'waresInfo'
                                }
                            },[
                                h('h3',params.row.name.name)
                            ])
                               
                        ])
                    }
                },
                {
                    title: '规格型号',
                    key: 'spec'
                },
                {
                    title: '销售价格',
                    key: 'prize',
                    sortable: true,
                    render (h, params) {
                        // return `<span class='prize'>${row.prize}</span>`;
                        return h('span',params.row.prize);
                    }
                },
                
                {
                    title: '库存数量',
                    key: 'inventoryQty',
                },
                {
                    title : '产品二维码',
                    key : 'qrUrl',
                    render (h, params) {
                        return h('img',{
                            attrs : {
                                src : params.row.qrUrl,
                                class : 'qrUrl'
                            }
                        })
                    }
                },
                {
                    title : '状态',
                    key : 'status'
                },
                {
                    title : '操作',
                    key: 'action',
                    align: 'center',
                    render : (h, params) => {
                        /*return `<i-button type="text" size="small" @click="modify(${index},row)">修改</i-button> <i-button type="text" size="small" @click="remove(${index})">删除</i-button>`;*/
                        return h('div',[
                            h('Button',{
                                props : {
                                    size : 'small'
                                },
                                on : {
                                    click : () => {
                                        this.modify(params.index,params.row);
                                    }
                                }
                            },'修改'),
                            h('Button',{
                                props : {
                                    size : 'small'
                                },
                                on: {
                                    click : () => {
                                        this.remove(params.index);
                                    }
                                }
                            },'删除')
                        ])
                    }
                }
            ],
            originalGoodsList : [],
            goodsList : [],
            goodsTotalCount : 0 ,
            // pageCount : 1
            data : {
                catalogId : '',
                status : '',
                name : '',
                page :  this.$store.state.goodsListPage , 
                page : this.$store.state.pageNums,
//              	name: '',
//					: 10,
//					page: 1, //page
//					rows: 10 //rows
            }
        }
    },
    methods : {
    	aaa(){
    		let _this=this;
    		     _this.$router.push('goodsListtow')
    	},
    	Catalog(){
    		
    	},
        format(labels, selectedData) {
				const _this = this;
				const index = labels.length - 1;
				const datas = selectedData[index] || false;
				if(datas && datas.code) {
					_this.catalogId = datas.id;
					return labels[index]; //+ ' - ' + data.code
				}
				return labels[index];
			},
    	
    	
        query () {
            const _this = this;
            let catalogId;
            if(this.catalog.length > 0) {
                catalogId = this.catalog[this.catalog.length - 1];
            }else {
                catalogId = '';
            }
            if (this.data.status == 3) {
                this.data.status = '';
            }


            _this.$store.commit('goodsListPage',1);
            this.data.pageStart = 1;
            this.data.catalogId = catalogId;
            this.axios({
                method : 'post',
                url :api.product + api.productByRequset,
                data : api.convertParam(this.data)
            })
                .then(function(res) {
                    const data = res.data.datas.rows;
                    if(res.data.status == 1) {
                        _this.goodsTotalCount = res.data.datas.total;
                        _this.originalGoodsList = data;
                        if(data.length == 0 ){
                            _this.goodsList = [];
                            return;
                        }
                        let goods = [];
                        data.forEach(function(item , index){
                            goods.push({
                                id : item.id,
                                name : {
                                    img : item.imageUrl,
                                    name : item.name , 
                                    code : item.barCode
                                },
                                prize : item.price ? item.price : '协商',
                                unit : item.unitId,
                                qrUrl : item.qrUrl,
                                status : item.status == 0 ? '下架' : '上架',
                                classify : item.catalogId,
                                inventoryQty : item.inventoryQty,
                                spec : item.spec
                            })
                        })
                        _this.goodsList = goods;
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        enter (event) {
            console.log(event.keyCode);
            if(event.keyCode == 13) {
                this.query();
            }
        },
        toPage (count) {
           
            const _this = this;
            const goods = [];
            // _this.pageCount = count;
            _this.$store.commit('goodsListPage',count);

            
            this.data.pageStart = count;

            _this.axios({
                    method : 'post',
                    header : {
                        "Content-Type" : 'application/x-www-form-urlencoded'
                    },
                    url : api.product + api.productByRequset,
                    data : api.convertParam(this.data)
                })
                .then(function(res) {
                    console.log(res);
                    const data = res.data.datas.rows;
                    _this.goodsTotalCount = res.data.datas.total;
                    data.forEach(function(item , index){
                        goods.push({
                            id : item.id,
                            name : {
                                img : item.imageUrl,
                                name : item.name , 
                                code : item.barCode
                            },
                            prize : item.price ? item.price : '协商',
                            unit : item.unitId,
                            qrUrl : item.qrUrl,
                            status : item.status == 0 ? '下架' : '上架',
                            classify : item.catalogId,
                            inventoryQty : item.inventoryQty,
                            spec : item.spec
                        })
                    })
                    _this.goodsList = goods;
                    _this.DOM.content.scrollTop = 0;
                })
                .catch(function(err){
                    console.log(err);
                })

        },
        remove (index) {
            this.$Modal.confirm({
                content: '确定要删除吗？',
                onOk  : () => {

                    console.log(index);
                    console.log(this.originalGoodsList[index]);
                    const _this = this;
                    const id = this.originalGoodsList[index].id;
                    _this.axios(api.product + id + api.productDelete)
                        .then(function(res){
                            console.log(res);
                            const goods = [];
                            _this.axios({
                                    method : 'post',
                                    header : {
                                        "Content-Type" : 'application/x-www-form-urlencoded'
                                    },
                                    url : api.product + api.productByRequset,
                                    data : api.convertParam({pageStart :  _this.pageCount , pageNums : _this.$store.state.pageNums})
                                })
                                .then(function(res) {
                                    console.log(res);
                                    const data = res.data.datas.rows;
                                    _this.goodsTotalCount = res.data.datas.total;
                                    data.forEach(function(item , index){
                                        goods.push({
                                            id : item.id,
                                            name : {
                                                img : item.imageUrl,
                                                name : item.name , 
                                                code : item.barCode
                                            },
                                            prize : item.price ? item.price : '协商',
                                            unit : item.unitId,
                                            qrUrl : item.qrUrl,
                                            status : item.status == 0 ? '下架' : '上架',
                                            classify : item.catalogId,
                                            inventoryQty : item.inventoryQty,
                                            spec : item.spec
                                        })
                                    })
                                    _this.goodsList = goods;
                                    _this.DOM.content.scrollTop = 0;
                                })
                                .catch(function(err){
                                    console.log(err);
                                })
                        })
                        .catch(function(err){
                            console.log(err);
                        })
                }
            });

        },
        modify (index, data) {
            this.$router.push({name : 'addGoods' , query : {id : this.goodsList[index].id}})
        },
       
    }
}
</script>

<style scoped>

.goodsList .qrUrl {
    width: 80px;
    height: auto;
}
.ivu-select .ivu-select-dropdown {
    overflow: inherit;
}
.control {
    margin-top: 20px;
}
.buttonM {
    margin-right: 10px;
}
.ivu-table-cell .ivu-table-sort i:first-child {
    top: -1px;
}
.prize {
    color: red;
}
/*.prize:before {
    content : '￥';
}*/
.wares {
    display: flex;
    padding: 10px 0;
}
.wares  img {
    width : 80px;
    height: 80px;
}
.wares .waresInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
}
.wares .waresInfo h3 {
    font-weight: 500;
    margin: 10px 0;
}
.catalogCascader {
    width: 200px;
    display: inline-block;
}
.spanCol{
	display: inline-block;
	margin: 0 0 0 20px;
}
.ButCol{
	width: 100px !important;
	margin: 0 0 0 50px !important;
}
.ivu-select-dropdown{
	overflow: auto;
}
	.qaz {
		width: 980px;
		background: #fff;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		position: absolute;
		top: 50px;
		left: 0;
		bottom: 10px;
		right: 0;
		overflow: hidden;
		overflow-y: scroll;
	}
.mag{
	margin: 20px 0;
}

</style>
