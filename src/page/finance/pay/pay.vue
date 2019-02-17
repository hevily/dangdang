<template>
	<div class="purchase">
        <Breadcrumb>
            	<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
            <Breadcrumb-item>支付管理</Breadcrumb-item>
            <Breadcrumb-item>采购订单</Breadcrumb-item>
        </Breadcrumb>
        <div class="purchase_box test-1">
	         <div class="purchaseList">
	        	<Table stripe :columns="columns" :data="orderList"></Table>
	        </div>
	        <div class="pageBar">
	        	<Page :total="pageInfo.count" :current="pageInfo.pageStart" :page-size="pageInfo.pageNums" show-elevator ></Page>
	        </div>
        </div>
       
	</div>
</template>
<script>
import api from '@/api/api'
export default {
	data(){
		return {
	    	pageInfo:{
	    		count:5,
	    		pageStart:1,
	    		pageNums:1
	    	},
			columns:[
		        {
		        	type: 'index',
		            title: '序号',
		            width:60
		        },
				{
					title:"订单编号",
					align:"center",
					key:"code"
				},
				{
					title:"供应商名称",
					align:"center",
					key:"supplierCorpName"
				},
				{
					title:"订单日期",
					align:"center",
					key:"applyTime"
				},
				{
					title:"订单状态",
					align:"center",
					key:"statusDesc"
				},
				{
					title:"付款状态",
					align:"center",
					key:"payStatus"
				},
				{
					title:"总金额(元)",
					align:"center",
					key:"totalMoney"
				},
				{
					title:"已支付金额(元)",
					align:"center",
					key:"payTotalMoney"
				},
				{
					title:"客户确认金额(元)",
					align:"center",
					key:"payConfirmTotalMoney"
				},
				{
					title:"待支付金额(元)",
					align:"center",
					key:"payingMoney" //没有
				},
				{
		            title: '操作',
                    key: 'action',
                    align:'center',

                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.toPay(params.index)
                                    }
                                }
                            }, '付款'),

                        ]);
                    }

				}
			],

			orderList:[
				{
					code:'001',
					applyName:'中国联想',
					orderDate:'2017-5-23',
					orderStatus:'待支付',
					payStatus:'待支付',
					totalMoney:'200',
					payedMoney:'100',
					sureMoney:'100',
					payingMoney:'100'
				},
				{
					code:'002',
					applyName:'中国联想',
					orderDate:'2017-5-23',
					orderStatus:'待支付',
					payStatus:'待支付',
					totalMoney:'200',
					payedMoney:'100',
					sureMoney:'100',
					payingMoney:'100'
				}
			]
		}
	},
	created(){
		const _this = this;
		//支付订单查询
        _this.axios({
            method : 'post',
            header : {
                "Content-Type" : 'application/x-www-form-urlencoded'
            },
            url :api.queryPayOrderListByRequest,
            data : api.convertParam(_this.pageInfo),

        })
		.then(function (res) {
			_this.orderList = res.data.datas.rows;
			_this.pageInfo.count = res.data.datas.total;
			console.log(res.data.datas);
			
		})
		.catch(function (error) {
			console.log(error);
		});
	},
	methods:{
		toPay(index){
			var oid = this.orderList[index].id;
			this.$router.push({path:"/pay",query:{id:oid}});
		}
	}
}
</script>
<style>
	.purchase_box{
		width: 98%;
		position: absolute;
		top: 50px;
		left: 10px;
		right: 30px;
		bottom: 10px;
		background: #fff;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
	}
.payLink.ivu-btn-text{
	text-decoration:underline;
	color:#39f;
}
.pageBar{
	float:right;
	margin-top:20px;
	margin-right: 20px;

}
</style>