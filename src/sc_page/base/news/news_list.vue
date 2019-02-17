<template>
    <div class="news_list">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>公告信息</Breadcrumb-item>
			<Breadcrumb-item>公告列表</Breadcrumb-item>
		</Breadcrumb>

        <div class="right_home_warp test-1">
            <Row>
                <Col span="14" class="but_box">
                    <span>公告：</span>
                    <Input class="input-title" placeholder="输入查询的标题" v-model="selectName"></Input>
                    <button class="inbut" type="info" @click="search">查询</button>
                </Col>
                <Col span="10">
                    <div class="btn-box-right">
                        <button class="btn-new" @click.stop='addNews'>新增</button>
                    </div>
                </Col>
            </Row>

            <!-- ******* table 数据展示 **********-->
            <div class="news_list__table">
				<Table :columns="tableModle" :data="customerList"></Table>
			</div>
        </div>
        <!-- ************ 分 页 ************-->
        <div class="page-bot">
			<Page :total="total" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
		</div>
    </div>
</template>

<script>
import api from '@/api/api'
export default {
    name: 'newsList',
    mounted(){
        //let news = [];
        const _this = this;
        _this.getDatas(); //获取数据
    },
    data(){
        return{
            pageStart: 1, //当前页码
            tableModle: [
                {title: '标题', width: 110, key: 'title'},
                {title: '发布者', width: 60, key: 'author'},
                {title: '发布日期', width: 60, key: 'publishTime'},
                // {title: '状态', width: 60, key: 'applyStatusName'},
                {title: '操作', key: 'action', width: 120, align: 'center',
                    render: (h, params) => {
                        return h('div',[
                            h('Button', {
                                props: {type: 'text',size: 'small'},
                                on: {click: () => {this.audit(params.row);}}
                            }, '上移'),
                            h('Button', {
                                props: {type: 'text',size: 'small'},
                                on: {click: () => {this.show(params.row);}}
                            }, '下移'),
                            h('Button', {
                                props: {type: 'text',size: 'small'},
                                on: {click: () => {this.show(params.row);}}
                            }, '查看'),
                            h('Button', {
                                props: {type: 'text',size: 'small'},
                                on: {click: () => {this.show(params.row);}}
                            }, '修改')
                        ]);
                    }
                }
            ],
            customerList: [],
            total: 0, //数据的总数
            selectName: ''
        }
    },
    methods:{

        //点击 新增按钮 跳转至  公告新增页
        addNews(){
            this.$router.push('/newsList/addNews');
        },

        //点击页码跳转
        toPage(count) {
            //console.log("count",count);
            const _this = this;
            _this.pageStart = count;
            _this.getDatas();
        },

        // 获取数据
        getDatas(){
            const _this = this;
            _this.axios({
                method: 'get',
                url: api.NewList + '/news' + api.NewListByRequest,
                params:{
                    'type': 'news',
                    'pageNums': _this.$store.state.pageNums,
                    'pageStart': _this.pageStart
                }
            })
            .then(function(res){
                const data = res.data.datas;
                console.log(data);
                _this.customerList = data.list;
                _this.total = data.total;
            })
            .catch(function(err){
                console.log("err",err);
            })
        },

        //查询
        search(){
            const _this = this;
            _this.pageStart = 1;
            
        }
    }
}
</script>

<style scoped> 
    .news_list__table{
        height: 100%;
    }
    .news_list__table .ivu-table-wrapper{
        height: 100%;
    }

</style>


