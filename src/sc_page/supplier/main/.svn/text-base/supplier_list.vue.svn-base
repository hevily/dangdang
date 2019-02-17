<template>
	<div class="supplierList">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>供应商列表</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
            <Row>
                <Col span="10">
                    <div class="btn-box-left">
                        <button class="btn-new" @click='localAdd'>本地添加</button>
                        <button class="btn-save" @click='netAdd'>网络添加</button>
                    </div>
                </Col>
                <Col span='13'>
                    <div class="btn-box-right">
                        <input class="search-input" v-model="supplierName" placeholder="请输入供应商名称">
                        <button class="search-btn" @click="searchSupplier"><Icon type="search"></Icon></button>
                    </div>
                </Col>
            </Row>
            <table class="zg-table">
                <tr class="zg-th">
                    <th width="15%">供应商名称</th>
                    <th width="15%">供应商编码</th>
                    <th width="10%">结算方式</th>
                    <th width="10%">添加方式</th>
                    <th width="10%">操作</th>
                </tr>
                <tr class="zg-tb" v-for="(item,index) in supplierList" :key="index">
                    <td :title="item.supplierName">
                        <router-link :to="'/cooperation/detail?id=' + item.id" class="tab-link">{{item.supplierName}}</router-link>
                    </td>
                    <td :title="item.supplierCode">{{item.supplierCode ? item.supplierCode : '--'}}</td>
                    <td>{{settlementMode(item.settlementMode) ? settlementMode(item.settlementMode) : '--'}}</td>
                    <td>{{addType(item.supplierFrom)}}</td>
                    <td>
                        <span class="tab-oper" @click="showSupplier(item.id)">查看</span>
                        <span class="tab-oper" @click="editSupplier(item.id)">编辑</span>
                        <span class="tab-oper" @click="delSupplier(index)">删除</span>
                    </td>
                </tr>
            </table>
		</div>
        <div class="page-bot">
			<Page :total="supplierTotalCount" :page-size="pageInfo.pageSize" show-elevator show-total @on-change='toPage'></Page>
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
			this.querySuppliers();
		},
		data() {
			return {
                re_do: '',
                do_yn: '',
                do_no: '',
                supplierTotalCount: 0,
                pageInfo: {
                    pageStart: 1,
                    pageSize: 500
                },
                supplierList: [],
                curSupplierIndex: '',
                delModel: false,
                supplierName: ''
			}
		},
		methods: {
            searchSupplier(){
                if(this.supplierName == ''){
                    this.supplierName = null;
                }
				this.axios({
                    method: 'post',
                    url: api.supplierList,
                    data: {
                        supplierName: this.supplierName,
                        pageStart: this.pageInfo.pageStart,
                        pageSize: this.pageInfo.pageSize
                    }
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.supplierTotalCount = res.data.datas.total;
                        this.supplierList = res.data.datas.rows
                    }
                })
            },
            showSupplier(id){
                this.$router.push({
                    path: '/supplier/information',
                    query: {id: id}
				})
            },
            querySuppliers(){
                this.axios({
                    url: api.supplierList,
                    method: 'post',
                    data: {
                        pageStart: this.pageInfo.pageStart,
                        pageSize: this.pageInfo.pageSize
                    }
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.supplierTotalCount = res.data.datas.total;
                        this.supplierList = res.data.datas.rows
                    }
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
                    url: '/api/supplier/main/' + this.supplierList[this.curSupplierIndex].id + '/deleteById.do'
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.re_do = '删除成功';
                        this.do_yn = true;
                        setTimeout(() => { this.do_yn = false;}, 2000);
                        this.querySuppliers();
                        this.curSupplierIndex = '';
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
                this.curSupplierIndex = '';
                this.delModel = false;
            },
            editSupplier(id){
                this.$router.push({
                    path: '/supplier/edit',
                    query: {id: id}
				})
            },
            delSupplier(index){
                this.curSupplierIndex = index;
                this.delModel = true;
            },
            toPage(count) {//翻页
                this.pageInfo.pageStart = count;
                this.axios({
                    url: api.supplierList,
                    method: 'post',
                    data: {
                        pageStart: this.pageInfo.pageStart,
                        pageSize: this.pageInfo.pageSize
                    }
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.supplierTotalCount = res.data.datas.total;
                        this.supplierList = res.data.datas.rows
                    }
                })
			},
			searchInfo() {
				this.axios({
                    method: 'post',
                    url: api.supplierInfo,
                    // url: api.supplierList,
                    data: api.jsonData(this.formItem)
                })
                .then((res) => {
                    this.data1 = res.data.datas.rows;
                })
			},
			localAdd() {
				this.$router.push({path: '/supplier/edit'})
            },
            netAdd() {
				this.$router.push({path: '/cooperation/supplier/new'})
			},
		}
	}
</script>
<style scoped>
	.supplierList .ivu-cascader .ivu-select-dropdown{
		z-index: 9999 !important;
	}
	.supplierList .ivu-select-dropdown{
		z-index: 9999 !important;
	}
	.supplierList {
		font-size: 14px;
	}
</style>