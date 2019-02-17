<template>
	<div class="role">
        <Breadcrumb>
            	<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">组织</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">员工权限设置</span></Breadcrumb-item>
        </Breadcrumb>
        <div class="right_home_warp test-1">
			<div class="three_span">
				<span  @click="deve_in">员工账号</span>
				<span  @click="deve" >部门设置</span>
				<span  style="color: #0083c0;">员工权限设置</span>
			</div>
    	<Input icon="ios-search" placeholder="请输入..." class="searchRole"></Input>
        <div class="mebList">
        	<Table stripe :columns="columnsRole" :data="roleList"></Table>
        </div>
      
       </div> 
       <div class="btn-bot">
       	  <div class="pageBar magbut">
        	<Page :total="pageInfo.count" :current="pageInfo.pageStart" :page-size="pageInfo.pageNums" show-elevator @on-change="pageFun"></Page>
        </div>
       	</div>
	</div>
</template>
<script>
import api from '@/api/api'
export default {
    data () {
        return {
        	pageInfo:{
        		count:1,
        		pageStart:1,
        		pageNums:10
        	},
        	columnsRole:[
	        	{
	        		title: '角色名称',
	        		align:'center',
	        		key:'name'
	        	},
	        	{
	        		title: '角色编码',
	        		align:'center',
	        		key:'code'
	        	},
	        	{
	        		title: '角色描述',
	        		align:'center',
	        		key:'description'
	        	}
        	],
	    	roleList:[

        	]
        }
    },
    created(){
    	const _this = this;


        this.axios({
            method : 'post',
            header : {
                "Content-Type" : 'application/x-www-form-urlencoded'
            },
            url :api.queryRole,
            data : api.jsonData(this.pageInfo),

        })
        .then(function (res) {
            if(res.data.status == 1) {
                _this.roleList = res.data.datas.rows;
               _this.pageInfo.count = res.data.datas.total;

            }
            else{
                _this.$Message.warning(res.data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    methods:{
			deve_in() {
				let _this = this;
				_this.$router.push({
					path: '/sys/user/main'
				});
			},
			deve() {
				let _this = this;
				_this.$router.push({
					path: '/sys/org/main'
				});
			},
    	pageFun(x){
    		const _this = this;
    		_this.pageInfo.pageStart = x;
	        this.axios({
	            method : 'post',
	            header : {
	                "Content-Type" : 'application/x-www-form-urlencoded'
	            },
	            url :api.queryRole,
	            data : api.jsonData(this.pageInfo),

	        })
	        .then(function (res) {
	            if(res.data.status == 1) {
	                _this.roleList = res.data.datas.rows;
	               _this.pageInfo.count = res.data.datas.total;

	            }
	            else{
	                _this.$Message.warning(res.data.message);
	            }
	        })
	        .catch(function (error) {
	            console.log(error);
	        });
    	},
    }
}
</script>
<style scoped>
	
	.depa_box {
		background: #fff;
		overflow: auto;
		padding: 20px 20px;
		position: absolute;
		top: 50px;
		bottom: 10px;
		left: 10px;
		right: 15px;
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
	}
.searchRole.ivu-input-wrapper{
	width:300px;
	margin-top:20px;
}
.mebList{
	margin-top:30px;
}	.three_span {
		border-bottom: 1px solid #ccd9e6;
		padding: 0px 0 20px 0;
		margin-bottom: 20px;
	}
	
	.three_span span {
		margin-right: 80px;
		font-size: 16px;
	}
	
	.three_span span:hover {
		color: #0083c0;
		cursor: pointer;
	}
    
	.right_home_warp{
		margin-bottom: 80px;
	}
	.magbut{
		margin: 25px;
	}
</style>