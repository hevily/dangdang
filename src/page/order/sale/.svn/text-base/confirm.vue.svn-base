<template>
	<div class="purchase">
        <Breadcrumb>
            	<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
            <Breadcrumb-item>订单管理</Breadcrumb-item>
            <Breadcrumb-item>销售订单</Breadcrumb-item>
        </Breadcrumb>
        <div class="right_home_warp test-1">
        	<div class="but-box">
                <button class="btn-cancel">导入</button>
                <button class="btn-cancel">导出</button>
                <button class="btn-download">模板下载</button>
            </div>
        	<Table :columns="columnsPur" :data="listPur" ></Table>
        </div>
	</div>
</template>
<script>
import api from '@/api/api'
export default {
	created(){
		this.axios(api.scaleQueryList)
		.then((res) => {
			this.listPur = res.data.datas.rows;
		})
	},
	data(){
		return {
			pageInfo:{
				count:10,
				pageStart:1,
				pageNums:5
			},
			columnsPur:[
				{
					title:"下单日期",
//					align:"center",
					key:"applyTime"
				},
				{
					title:"客户名称",
					align:"center",
					key:"corpName"
				},
				{
					title:"产品",
					align:"center",
					key:"catagory"
				},
				{
					title:"订单金额",
					align:"center",
					key:"totalMoney"
				},
				{
					title:"状态（接单成功后显示倒计时）",
					align:"center",
					key:"auditStatusDesc",
					width: 300,
				},
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                    	if(params.row.supplierAuditStatus==0){
	                        return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'text',
	                                    size: 'small'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.modifyPur(params.index)
	                                    }
	                                }
	                            }, '查看'),
	                        ]);
                        }
                        else{
	                        return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'text',
	                                    size: 'small'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.modifyPur(params.index)
	                                    }
	                                }
	                            }, '查看'),
	                        ]);
                        }
                    }
                }
			],
			listPur:[
				{
					id:'123',
					name:'001',
					corpName:'联想',
					applyUserName:'哈哈哈哈',
					totalMoney:100,
					applyTime:'2017-5-11',
					status:'已审批'
				}
			]
		}
	},
    methods:{
        modifyPur(index){
            this.$router.push({path:"/scaleSubmit",query:{id:this.listPur[index].id}});
        }
    }
}
</script>
<style type="text/css">
	.purchase .ivu-table{
		top: 10px;
	}
</style>
<style scoped>
    .upload.ivu-form-item{
        position:relative;
        margin-bottom:6px;
    }
    .upload .uploadNote{
        position:absolute;
        left:200px;
        top:0;
    }
</style>