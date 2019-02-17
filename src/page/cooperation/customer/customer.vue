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
			<Form :label-width="0">
				<Row>
					<Col span="8">
					    <input type="text" placeholder="请输入客户名称">
                        <Icon type="android-search" size="20" @click="searchInfo" class="customer-search"></Icon>
					</Col>
					<Col span="16">
						<button type="button" @click='localAdd' class="local-add">本地添加</button>
					</Col>
				</Row>
			</Form>
            <div class="customer-table">
                <table>
                    <thead>
                        <th width="15%">客户名称</th>
                        <th width="15%">客户编码</th>
                        <th width="10%">客户级别</th>
                        <th width="10%">结算方式</th>
                        <th width="13%">联系人</th>
                        <th width="10%">添加方式</th>
                        <th width="13%">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in customerList" :key="index">
                            <td :title="item.customerName">{{item.customerName}}</td>
                            <td :title="item.customerCode">{{item.customerCode}}</td>
                            <td class="customer-level">{{item.levelName}}</td>
                            <td>{{settlementMode(item.settlementMode)}}</td>
                            <td :title="item.contractName + item.contractTel">{{item.contractName}} {{item.contractTel}}</td>
                            <td class="customer-addstyle">{{addType(item.customerFrom)}}</td>
                            <td>
                                <Icon type="ios-paper-outline" size="26"></Icon>
                                <Icon type="ios-compose-outline" size="26" @click.native="editCustomer(item.id)"></Icon>
                                <Icon type="ios-trash-outline" size="26" @click.native="delCustomer(index)"></Icon>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <strong>注：</strong>
                <p style="display: inline-block; vertical-align: top;">
                    网络添加的客户已入住平台，并且已经过客户公司验证通过；
                    <br>
                    本地添加的客户，未经客户公司验证
                </p>
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
                
			}
		},
		methods: {
            queryCustomers(){
                this.axios({
                    // url: api.main + api.queryByRequest,
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
                .catch((err) => {
                    console.log(err);
                });
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
            addType(data){
                if(data == 0){
                    return '本地添加';
                }else {
                    return '网络添加';
                }
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
            editCustomer(id){
                this.$store.commit('changeLocalImportStatus',0);
                this.$store.commit('changeCustomerId',id);
                this.$router.push({
					path: '/import/localImport'
				})
            },
            delCustomer(index){
                this.curCustomerIndex = index;
                this.delModel = true;
                console.log('111');
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
                    console.log('列表',res);
                })
                .catch((err) => {
                    console.log(err);
                });
			},
			searchInfo() {
				const _this = this;
				this.axios({
                    method: 'post',
                    url: api.main + api.queryByRequest,
                    data: api.jsonData(_this.formItem)
                })
                .then(function(res) {
                    _this.data1 = res.data.datas.rows;
                })
                .catch(function(err) {
                    console.log(err);
                })

			},
			localAdd() {
                this.$store.commit('changeLocalImportStatus',1);
				this.$router.push({
					path: '/import/localImport'
				})
			}
		}
	}
</script>
<style type="text/css">
	.customerList .ivu-table-body{
		position: absolute;
		top: 50px;
		height: 500px;
	}
	.customerList  .ivu-table{
		position: absolute;
		top: 0;
		height: 480px;
	}
	.customerList .ivu-cascader .ivu-select-dropdown{
		z-index: 9999 !important;
	}
	.customerList .ivu-select-dropdown{
		z-index: 9999 !important;
	}
</style>
<style scoped>
	.customerList {
		font-size: 14px;
	}

    .customer-search {
        background: #66ccff;
        color: #fff;
        padding: 2px 4px;
        position: relative;
        top: 1px;
        cursor: pointer;
    }
	
    .customer-table {
        margin: 30px 0;
    }
    .customer-table table {
        table-layout: fixed;
        border-collapse: collapse; 
        width: 100%;
    }
    .customer-table th {
        height: 30px;
    }
    .customer-table th, .customer-table td {
        border: 1px solid #ccc;
        text-align: center;
    }
    .customer-table td {
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .customer-table i {
        margin: 0 4px;
        cursor: pointer;
    }
    .customer-level, .customer-addstyle {
        font-weight: bold;
    }

    .local-add {
        padding: 1px 14px;
        float: right;
        font-weight: bold;
        border-radius: 4px;
        border: 1px solid #949494;
        background: #eee;
    }
	
	.magbut {
		margin: 25px;
	}
</style>