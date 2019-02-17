<template>

    <Form class="joinplanInfo">
        <div class="auditList">
        	<Table size="small" :columns="columns" :data="auditList" :context="root"></Table>
        </div>
    </Form> 
</template>
<script>

export default {
	name:'purchaseList',
	data(){
		return {
			columns:[
				{
					type:"index",
					title:"编号",
					width:80,
					align:"center"
				},
				{
					title:"申请单编号",
					align:"center",
					key:"num"
				},
				{
					title:"供应商名称",
					align:"center",
					key:"supplierName"
				},
				{
					title:"申请部门",
					align:"center",
					key:"department"
				},
				{
					title:"申请人",
					align:"center",
					key:"applicant"
				},
				{
					title:"申请日期",
					align:"center",
					key:"datetime"
				},
				{
					title:"当前状态",
					align:"center",
					key:"status"
				},
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render (row, column, index) {
                        return `<i-button type="text" size="small" @click="chose" class="dj">修改</i-button>`;
                    }
                }
			],
			auditList:[
				{
					num:'001',
					supplierName:'联想',
					department:'研发部',
					applicant:'哈哈哈哈',
					datetime:'2017-5-11',
					status:'已审批'
				}
			]
		}
	},
    methods:{
        chose(){
            console.log(111);
        }

    }
}
</script>
<style scoped>
	.joinplanInfo{
		font-size: 14px;
	}

    .warning {
        background: #000;
    }
</style>
