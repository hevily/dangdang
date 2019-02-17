<template>
	<div class="customerList">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>客户列表</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
            <Row>
                <Col span='14' class="">
                    <div class="search-box">
                        <input class="search-input" v-model="customerName" placeholder="请输入客户名称">
                        <button class="search-btn" @click="searchCustomer"><Icon type="search"></Icon></button>
                    </div>
                </Col>
                <Col span="10">
                    <button class="btn-new" @click='localAdd' style="float: right;">本地添加</Button>
                </Col>
            </Row>
            <table class="zg-table">
                <thead>
                    <tr>
                        <th width="18%">客户名称</th>
                        <th width="18%">客户编码</th>
                        <th width="8%">客户级别</th>
                        <th width="8%">结算方式</th>
                        <th width="15%">联系人</th>
                        <th width="8%">添加方式</th>
                        <th width="12%" class="zg-tab-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="customerList.length == 0" class="zg-none"><td colspan="7">暂无数据。。。</td></tr>
                    <tr v-for="(item,index) in customerList" :key="index">
                        <td :title="item.customerName">
                            <span @click="$router.push('/cooperation/detail?id=' + item.id)" class="zg-tab-link">{{item.customerName}}</span>
                        </td>
                        <td>
                            <span :title="item.customerCode">{{item.customerCode ? item.customerCode : '--'}}</span>
                        </td>
                        <td :title="item.levelName">{{item.levelName ? item.levelName : '--'}}</td>
                        <td>{{settlementMode(item.settlementMode) ? settlementMode(item.settlementMode) : '--'}}</td>
                        <td :title="item.contractName + item.contractTel">{{(item.contractName + item.contractTel) ? (item.contractName + item.contractTel) : '--'}}</td>
                        <td>{{item.customerFrom == 0 ? '本地添加' : '网络添加'}}</td>
                        <td class="zg-tab-center">
                            <span class="zg-tab-oper" @click="showCustomer(item.id)">查看</span>
                            <span :class="item.customerFrom == 1 ? 'zg-tab-inoper' : 'zg-tab-oper'" @click="editCustomer(item.id,item.customerFrom)">编辑</span>
                            <span :class="item.customerFrom == 1 ? 'zg-tab-inoper' : 'zg-tab-oper'" @click="delCustomer(index,item.customerFrom)">删除</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- <Table :columns="tableModle" :data="customerList"></Table> -->
            <div class="explain">
                说明： <br />
                <span>
                    1、网络添加的客户已入住平台，并且已经过客户公司验证通过；<br />
                    2、本地添加的客户，未经客户公司验证； <br />
                </span>
            </div>
		</div>
        <div class="page-bot">
			<Page :total="customerTotalCount" :page-size="pageInfo.pageSize" show-elevator show-total @on-change='toPage'></Page>
		</div>
        <Modal v-model="delModel" width="460">
            <p slot="header" class="del_p">
                <span>删除确认</span>
            </p>
            <div class="del_div">
                <p>您确定要删除吗？</p>
            </div>
            <div slot="footer" class="delbut">
                <Button @click="del">删除</Button>
                <Button @click='ccl'>取消</Button>
            </div>
        </Modal>
        <tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>
<script>
    import api from '@/api/api'
    import tis from '@/page/set/tishisub.vue'
	export default {
		components: { tis },
		created() {
			this.queryCustomers();
		},
		data() {
			return {
                re_do: '',
                do_yn: '',
                do_no: '',
                customerTotalCount: 0,
                pageInfo: {
                    pageStart: 1,
                    pageSize: 10
                },
                customerList: [],
                curCustomerIndex: '',
                delModel: false,
                customerName: '',
                tableModle: [
                    {title: '客户名称', key: 'customerName', width: 130, ellipsis: true, render: (h,params) => {
                        return h('span', {
                            attrs: {title: params.row.customerName},
                            domProps: {innerHTML: params.row.customerName},
                            style: {padding: '0 10px;'}
                        })
                    }},
                    {title: '客户编码', key: 'customerCode', width: 130, ellipsis: true, render: (h,params) => {
                        return h('span', {
                            attrs: {title: params.row.customerCode},
                            domProps: {innerHTML: params.row.customerCode}
                        })
                    }},
                    {title: '客户级别', key: 'levelName', width: 60},
                    {title: '结算方式', key: 'settlementMode', width: 60, render: (h,params) => {
                        let set = ''
                        if(params.row.settlementMode == 0){
                            set = '款到发货';
                        }else if(params.row.settlementMode == 1){
                            set = '货到付款';
                        }else if(params.row.settlementMode == 2){
                            set = '账期结';
                        }
                        return h('span', {
                            domProps: {innerHTML: set}
                        })
                    }},
                    {title: '联系人', width: 80, ellipsis: true, render: (h,params) => {
                        let info = (params.row.contractName ? params.row.contractName : '')  + ' ' + (params.row.contractTel ? params.row.contractTel : '');
                        return h('span', {
                            domProps: {innerHTML: info},
                            attrs: {title: info}
                        })
                    }},
                    {title: '添加方式', key: 'customerFrom', align: 'center', width: 60, render: (h,params) => {
                        let set = ''
                        if(params.row.customerFrom == 0){
                            set = '本地添加';
                        }else {
                            set = '网络添加';
                        }
                        return h('span', {
                            domProps: {innerHTML: set}
                        })
                    }},
                    {title: '操作', width: 90, align: 'center', render: (h,params) => {
                        return h('div', [
                            h('Icon', {
                                attrs: {title: '查看'},
                                props: {type: 'ios-paper-outline', size: '26',},
                                style: {lineHeight: '48px',marginRight: '10px',cursor: 'pointer'},
                                nativeOn: { click: () => {this.showCustomer(params.row.id)}},
                                // on: {click: function(){this.showCustomer(params.row.id)}},
                            }),
                            h('Icon', {
                                attrs: {title: '编辑'},
                                props: {type: 'ios-compose-outline', size: '26',},
                                style: {lineHeight: '48px',marginRight: '10px',cursor: 'pointer'},
                                nativeOn: {click: () => {this.editCustomer(params.row.id)}}
                            }),
                            h('Icon', {
                                attrs: {title: '删除'},
                                props: {type: 'ios-trash-outline', size: '26',},
                                style: {lineHeight: '48px',cursor: 'pointer'},
                                nativeOn: {click: () => {this.delCustomer(params.index)}}
                            }),
                        ]);
                    }},
                ]
			}
		},
		methods: {
            searchCustomer(){
                if(this.customerName == ''){
                    this.customerName = null;
                }
				this.axios({
                    method: 'post',
                    url: api.main + api.queryByRequest,
                    data: {
                        customerName: this.customerName,
                        pageStart: this.pageInfo.pageStart,
                        pageSize: this.pageInfo.pageSize
                    }
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.customerTotalCount = res.data.datas.total;
                        this.customerList = res.data.datas.rows
                    }
                })
            },
            showCustomer(id){
                this.$router.push({
                    path: '/customer/localimport' + '?id=' + id,
				})
            },
            queryCustomers(){
                this.axios({
                    url: '/api/customer/main/queryByRequest.do',
                    method: 'post',
                    data: {
                        pageStart: this.pageInfo.pageStart,
                        pageSize: this.pageInfo.pageSize
                    }
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.customerTotalCount = res.data.datas.total;
                        this.customerList = res.data.datas.rows
                    }
                })
            },
            del(){
                this.axios({
                    method: 'get',
                    url: '/api/customer/main/' + this.customerList[this.curCustomerIndex].id + '/deleteById.do'
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.re_do = '删除成功';
                        this.do_yn = true;
                        setTimeout(() => { this.do_yn = false;}, 2000);
                        this.queryCustomers();
                        this.curCustomerIndex = '';
                        this.delModel = false;
                    }else {
                        this.re_do = res.data.message;
                        this.do_no = true;
                        setTimeout(() => { this.do_no = false;}, 2000);
                        this.delModel = false;
                    }
                })
            },
            ccl(){
                this.curCustomerIndex = '';
                this.delModel = false;
            },
            editCustomer(id,from){
                if(from == 1) {
                    return ;
                }
                this.$router.push({
                    path: '/import/localImport' + '?id=' + id,
				})
            },
            delCustomer(index,from){
                if(from == 1) {
                    return ;
                }
                this.curCustomerIndex = index;
                this.delModel = true;
            },
            toPage(count) {//翻页
                this.pageInfo.pageStart = count;
                this.axios({
                    url: api.main + api.queryByRequest,
                    method: 'post',
                    data: {
                        pageStart: this.pageInfo.pageStart,
                        pageSize: this.pageInfo.pageSize
                    }
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.customerTotalCount = res.data.datas.total;
                        this.customerList = res.data.datas.rows
                    }
                })
			},
			searchInfo() {
				this.axios({
                    method: 'post',
                    url: api.main + api.queryByRequest,
                    data: api.jsonData(this.formItem)
                })
                .then((res) => {
                    this.data1 = res.data.datas.rows;
                })
			},
			localAdd() {
				this.$router.push({
					path: '/import/localImport'
				})
            },
            settlementMode(data){
                if(data == 0){
                    return '款到发货';
                }else if(data == 1){
                    return '货到付款';
                }else if(data == 2){
                    return '账期结';
                }
            },
		}
	}
</script>
<style type="text/css">
	.customerList .ivu-table{
		position: absolute;
		top: 0;
		height: 416px;
	}
</style>
<style scoped>
    .explain {
		font-size: 14px;
        margin-bottom: 20px;
	}
	
	.explain span {
		line-height: 23px;
        color: #e16d6d;
	}
</style>