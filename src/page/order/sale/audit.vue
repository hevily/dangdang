<template>
	<div class="purchase">
        <Breadcrumb>
            	<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
            <Breadcrumb-item>订单管理</Breadcrumb-item>
            <Breadcrumb-item>销售订单审核</Breadcrumb-item>
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
		const _this = this;
		this.axios(api.scaleQueryAudit)
		.then(function(res) {
			_this.listPur = res.data.datas.rows;
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
					title:"申请单编号",
					align:"center",
					key:"code"
				},
				{
					title:"客户名称",
					align:"center",
					key:"corpName"
				},
				{
					title:"申请部门",
					align:"center",
					key:"applyDeptName"
				},
				{
					title:"申请人",
					align:"center",
					key:"applyUserName"
				},
				{
					title:"申请日期",
					align:"center",
					key:"applyTime"
				},
				{
					title:"当前状态",
					align:"center",
					key:"auditStatusDesc"
				},
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',

                    render: (h, params) => {
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
                            }, '审批'),
                        ]);
                    }
                }
			],
			listPur:[
				{
					id:'123',
					name:'001',
					supplierCorpName:'联想',
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
            this.$router.push({path:"/scaleAudit",query:{id:this.listPur[index].id}});
        }
    }
}
</script>
<style scoped>

</style>
