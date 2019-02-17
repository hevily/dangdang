<template>
	<div class="supplier-net-list">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>供应商管理</Breadcrumb-item>
			<Breadcrumb-item>网络邀请</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Row>
				<Col span='14'>
                    <span>供应商：</span>
                    <Input placeholder="请输入供应商名称" style="width: 440px;margin-right:15px;" v-model='pageInfo.supplierName'></Input>
                    <button class="btn-search" @click="query" style="vertical-align: bottom;">查询</button>
				</Col>
				<Col span='10'>
					<div class="btn-box-right">
						<button class="btn-new" @click.stop='addRoot()'>邀请</button>
                        <button class="btn-cancel">导入</button>
                        <button class="btn-cancel">导出</button>
                        <button class="btn-download">模板下载</button>
					</div>
				</Col>
			</Row>
			<Table :columns="tableModel" :data="customerList" :height="tableHeight"></Table>
		</div>
		<div class="page-bot">
			<Page :total="total" :page-size='pageInfo.pageSize' show-elevator show-total @on-change='toPage'></Page>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'supplierApplyList',
		created() {
			this.queryList();
		},
		data() {
			return {
				tableModel: [
					{title: '供应商', key: 'supplierCorpName', ellipsis: true, width: 260,
                        render: (h,params) => {
                            return h('a',{
                                style: {fontSize: '14px'},
                                attrs: {
                                    title: params.row.supplierCorpName,
                                    href: '/#/cooperation/detail?id=' + params.row.supplierCorpId,
                                },
                                domProps: {innerHTML: params.row.supplierCorpName}
                            })
                        }
					},
					{title: '申请人', key: 'applyUserName'},
					{title: '申请日期', key: 'applyTime'},
					{title: '审核人', key: 'auditUserName'},
					{title: '审核日期', key: 'auditTime'},
					{title: '审核状态', key: 'applyStatusName'},
					{title: '操作',	key: 'action', width: 90,
						render: (h, params) => {
							if(params.row.applyStatus == 0) {
								return h('span', {
                                    class: {oper: true},
									on: {click: () => {this.modify(params.row);}}
								}, '编辑');
							}
							return h('span', {
                                class: {oper: true},
								on: {click: () => {this.show(params.row);}}
							}, '查看');
						}
					}
				],
				customerList: [],
                total: 0,
                pageInfo: {
                    supplierName: '',
                    pageStart: 1,
                    pageSize: 100,
                }
			}
        },
        computed: {
            tableHeight() {
                return this.customerList ? this.customerList.length * 60 + 50 : 50;
            }
        },
		methods: {
			toPage(count) {
                this.pageInfo.pageStart = count;
				this.queryList();
			},
			query() {
				this.queryList();
            },
            queryList(){
                this.axios({
                    method: 'post',
                    url: api.supplierAll,
                    data: this.pageInfo
                })
                .then((res) => {
                    console.log('res',res);
                    this.total = res.data.datas.total;
                    this.customerList = res.data.datas.rows;
                })
                .catch((err) => {
                    console.log(err);
                })
            },
			modify(data) {
				this.$router.push({
					path: '/addCustomer',
					query: {id: data.id}
				});
			},
			addRoot(){
				this.$router.push({path:'/cooperation/supplier/new',});
			},
			show(data) {
				this.$router.push('/cooperation/supplier/detail/' + data.id)
			}
		}
	}
</script>
<style scoped>

</style>