<template>
<div>
    <Breadcrumb>
		<Breadcrumb-item>
			<router-link to='/main'>
				<span class="link_span">首页</span>
			</router-link>
		</Breadcrumb-item>
		<Breadcrumb-item>看板</Breadcrumb-item>
        <Breadcrumb-item>看板列表</Breadcrumb-item>
	</Breadcrumb>
    <div class="right_home_warp test-1">
         <table class="zg-table">
            <tr>
                <th>看板名称</th>
                <th>看板类型</th>
                <th>看板位置</th>
                <th>看板状态</th>
                <th>操作</th>
            </tr>
            <tr v-for="(item,index) in kanbanList" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.type == 1 ? '欢迎看板' : '其他'}}</td>
                <td>{{item.position}}</td>
                <td>{{item.statusName}}</td>
                <td class="zg-tab-center">
                    <span class="zg-tab-oper" @click="$router.push('/kanban/welcome/' + item.id)">编辑</span>
                    <span class="zg-tab-oper" @click="$router.push('/kanban/welcomeInfo/' + item.id)">查看</span>
                </td>
            </tr>
        </table>
    </div>
</div>
   
</template>

<script>
export default {
    data() {
        return {
            kanbanList: []
        }
    },
    methods: {
        type(status){
            if(status == 1){
                return '欢迎看板'
            }
        }
    },
    created(){
        this.axios({
            method: 'get',
            url: '/api/kanban/main/queryMyKanBans.do',
        })
        .then((res) => {
            console.log('res',res);
            if(res.data.status == 1){
                this.kanbanList = res.data.datas;
            }
        })
    }
};
</script>
<style scoped>


</style>