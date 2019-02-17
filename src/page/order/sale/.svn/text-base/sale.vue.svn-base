<template>
	<div class="orderList">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>订单管理</Breadcrumb-item>
			<Breadcrumb-item>订单列表</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1 ddtable">

			<Form :model="formItem" :label-width="0" class="orderSearch">
				<Form-item style="margin-bottom: 20px;">
					<span>订单状态</span>
					<Radio-group type="button" v-model="formItem.orderStatus">
						<Radio label="全部"></Radio>
						<Radio label="待确认"></Radio>
						<Radio label="待发货"></Radio>
						<Radio label="待收货"></Radio>
						<Radio label="已完成"></Radio>
						<Radio label="已取消"></Radio>
					</Radio-group>
				</Form-item>
				<Form-item style="margin-bottom: 30px;">
					<span>付款状态</span>
					<Radio-group type="button" v-model="formItem.payStatus">
						<Radio label="全部"></Radio>
						<Radio label="未付款"></Radio>
						<Radio label="部分付款"></Radio>
						<Radio label="部分付款待确认"></Radio>
						<Radio label="待付款确认"></Radio>
						<Radio label="已付款"></Radio>
					</Radio-group>
				</Form-item>
				<Form-item class="orderTime">
					<span>订单时间</span>
					<Date-picker type="date" placeholder="选择日期" style="width: 200px;display: inline-block;"></Date-picker>
				</Form-item>
				<Form-item class="orderTime" :label-width="10">
					<span class="spandao">到</span>
					<Date-picker type="date" placeholder="选择日期" style="width: 200px;display: inline-block;margin-left: 5px;"></Date-picker>
				</Form-item>
				<Form-item class="orderTime" :label-width="67">
					<span class="ddbh">订单编号</span>
					<Input placeholder="请输入..." style="width: 300px"></Input>
				</Form-item>
				<Form-item class="orderTime" :label-width="35">
					<Button type="primary" class="searchbtn">查询</Button>
				</Form-item>
			</Form>

			<div class="tableList ddnumt">
				<Table highlight-row :columns="columnsInfo" :data="orderList"></Table>
			</div>
		</div>
		<div class="page-bot">
			<Page :total="pageInfo.count" :current="pageInfo.pageStart" :page-size="pageInfo.pageNums" show-elevator></Page>
		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		created() {
			const _this = this;
			_this.axios({
					method: 'post',
					header: {"Content-Type": 'application/x-www-form-urlencoded'},
					url: api.orderQueryList,
					data: api.jsonData(_this.pageInfo),
				})
				.then(function(res) {
					if(res.data.status == 1) {
						// _this.data.push(res.data.datas);
						_this.orderList = res.data.datas.rows;
						_this.pageInfo.count = res.data.datas.total;
					}
				})
		},
		data() {
			return {
				pageInfo: {
					count: 5,
					pageStart: 1,
					pageNums: 1
				},
				formItem: {
					orderStatus: '全部',
					payStatus: '全部'
				},
				columnsInfo: [{
						type: 'index',
						title: '序号',
						width: 75
					},
					{
						title: "订单名称",
						key: "name",
						width: 500
					},
					{
						title: "供应商名称",
						key: "supplierCorpName",
						width: 300
					},
					{
						title: "制单人",
						key: "applyUserName",
						width:150
					},
					{
						title: "下单时间",
						key: "applyTime",
						width:150
					},
					{
						title: "订单金额",
						key: "totalMoney",
						width:150
					},
					{
						title: "订单状态",
						key: "statusDesc",
						width:150
					},
					{
						title: '操作',
						key: 'action',						
						width:100,
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'text',
										size: 'small'
									},
                                    style: {
                                        paddingLeft: '0!important',
                                        paddingRight:'0!important',
                                        color:'#0099cc',
                                        textAlign:'center'
                                    },
									on: {
										click: () => {
											this.viewInfo(params.index)
										}
									}
								}, '编辑'),

							]);
						}
					}
				],
				orderList: [

				]
			}
		},
		methods: {
			viewInfo(index) {
				this.$router.push({
					path: "/orderInfo",
					query: {
						id: this.orderList[index].id
					}
				});
			}
		}
	}
</script>
<style type="text/css">
	.ddnumt table{
		overflow: scroll;
	}
	.ddtable table th{
		/*border-bottom: none!important;*/
		text-align: left!important;
	}
	.ddnumt table tr{
		overflow: scroll;
	}
	.ddnumt table tr td{
		border-right: none!important;
		height: 55px;
	}
	.ddnumt table th .ivu-table-cell span{
		border-left: 1px solid #cdd9e6!important;
		padding-left: 7px;
	}
	.ddnumt table th:first-child .ivu-table-cell span{
		border: none!important;
	}
	.ddnumt table th:first-child .ivu-table-cell span{
		/*border: none!important;*/
	}
	.ddnumt table th:first-child .ivu-table-cell span{
		padding-left: 0;
		
	}
	.ddnumt table th:first-child .ivu-table-cell{
		padding-left: 30px;
		
	}
	.ddnumt table td:first-child .ivu-table-cell{
		padding-left: 30px;
	}
	.ddnumt .ivu-btn-small{
		padding-left: 0!important;
	}
	.ddnumt .ivu-table-cell{
		padding-left: 20px!important;
	}
	.ddtable .ivu-form-item-content {
		height: 30px;
		line-height: 30px!important;
		display: flex!important;
		font-size: 14px;
	}

	.orderList	.ivu-table-cell span{
		font-size: 14px !important;
	}
	.orderList .ivu-table{
		top: 5px;
	}
</style>
<style scoped>
	

	.orderList{
		font-size: 14px;
		/*position: absolute;
		top: 5px;
		left: 10px;
		right: 20px;
		bottom: 0;*/
	}
	
	.tableList{
		clear: both;
		margin-top: 0;
	}
	
	.orderSearch {
		width: 100%;
		clear: both;
		overflow: auto;
	}
	
	.orderSearch .ivu-form-item {
		height: 30px;
	}
	
	.orderSearch .orderTime .ivu-form-item {
		float: left;
		width: auto;
	}
	
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper {
		margin-right: 10px;
		background: none;
		border: 0;
		font-size: 14px;
		color: #333;
	}
	
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper:first-child {
		border-radius: 0;
		border: 0;
	}
	
	.orderSearch .ivu-form .ivu-form-item-label {
		padding-top: 14px;
		font-size: 14px;
		color: #333;
	}
	
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper-checked,
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
		background-color: #3399ff;
		color: #fff;
		box-shadow: none;
	}
	
	.orderSearch.ivu-form .ivu-form-item-label {
		padding: 12px 12px 10px 0;
		font-size: 12px;
	}
	
	.orderTime {
		float: left;
		width: auto;
		font-size: 12px;
	}
	
	.ddbh {
		margin-right: 20px;
	}
	
	.plusPrice {
		padding: 10px;
		background: #fff;
		position: absolute;
		z-index: 999;
		top: 50px;
		left: 10px;
		right: 30px;
		bottom: 10px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
		overflow: hidden;
		overflow-y: scroll;
	}
	
	.ivu-btn-primary {
		padding: 0 25px!important;
		letter-spacing: 1px;
	}
	
	.ivu-date-picker {
		margin-left: 20px;
	}
	
	
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper {
		font-size: 12px;
	}
	
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper {
		margin-left: 20px;
		margin-right: 0;
		padding: 0 10px;
		letter-spacing: 1px;
	}
	
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper-checked,
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper-checked {
		height: 30px;
	}
	
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper-checked,
	.orderSearch .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
		background-color: #546478;
	}
	.searchbtn{
		height: 32px;
	}
	.ivu-btn-primary{
		background-color: #0099cc!important;
	}
	.ivu-btn-primary:hover{
		background-color: #1ab3df!important;
		border-color: #1ab3df!important;
	}

	.magbut{
		margin: 25px;
	}
</style>