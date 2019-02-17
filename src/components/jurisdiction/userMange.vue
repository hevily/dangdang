<template>
	<div class="userManage">
	    <Breadcrumb>
	        <Breadcrumb-item>首页</Breadcrumb-item>
	        <Breadcrumb-item>权限管理</Breadcrumb-item>
	        <Breadcrumb-item>用户管理</Breadcrumb-item>
	    </Breadcrumb>
        <div class="right_home_warp">
            <Row type="flex" justify="start">
                <div class="search-box">
                    <input class="search-input" v-model="pageInfo.name" placeholder="请输入要查询的用户名">
                    <button class="search-btn" @click="queryuserFun"><Icon type="search"></Icon></button>
                    <button class="btn-new" @click="adduserFun">新增用户</button>
                </div>
            </Row>
            <div class="tableList">
                <Table highlight-row  :columns="columnsInfo" :data="userList" ></Table>
            </div>
        </div>
        <div class="page-bot">
            <Page :total="pageInfo.count" :current="pageInfo.pageStart" :page-size="pageInfo.pageNums" show-elevator @on-change="pageFun"></Page>
        </div>
        
        <!--新增用户对话框-->
        <Modal
            v-model="adduserModel"
            title="新增用户"
            @on-ok="adduserSure"
            @on-cancel="adduserCancle" >
            <Form :model="submitList" :label-width="80" class="modifyDialog">
                <Form-item label="用户姓名">
                    <Input v-model="submitList.name" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="职务">
                    <Input v-model="submitList.title" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="登录名称">
                    <Input v-model="submitList.loginName" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="手机号">
                    <Input v-model="submitList.mobile" placeholder="请输入"></Input>
                </Form-item>    
                <Form-item label="email">
                    <Input v-model="submitList.email" placeholder="请输入"></Input>
                </Form-item>    
                <Form-item label="qq">
                    <Input v-model="submitList.qq" placeholder="请输入"></Input>
                </Form-item>    
                <Form-item label="微信号">
                    <Input v-model="submitList.wxIdentity" placeholder="请输入"></Input>
                </Form-item>    
            </Form>
            <div slot="footer">
                <Button size="large"  @click="adduserCancle">重置</Button>
                <Button type="info" size="large"  @click="adduserSure">确定</Button>
            </div>
        </Modal>
        <!--修改对话框-->
	    <Modal
	        v-model="modifyModel"
	        title="修改用户信息"
	        @on-ok="modifySure"
	        @on-cancel="modifyCancle" >
	        <Form :model="submitList" :label-width="80" class="modifyDialog">
		        <Form-item label="姓名">
		            <Input v-model="submitList.name" placeholder="姓名最多为10个字符"></Input>
		        </Form-item>
		        <Form-item label="职务">
		            <Input v-model="submitList.title" placeholder="请输入"></Input>
		        </Form-item>
		        <Form-item label="登录名称">
		            <Input v-model="submitList.loginName" placeholder="登陆名称最多为30个字符"></Input>
		        </Form-item>
		        <Form-item label="手机号">
		            <Input v-model="submitList.mobile" placeholder="请输入正确的11位数字手机号"></Input>
		        </Form-item>	
		        <Form-item label="email">
		            <Input v-model="submitList.email" placeholder="请输入"></Input>
		        </Form-item>	
		        <Form-item label="qq">
		            <Input v-model="submitList.qq" placeholder="请输入"></Input>
		        </Form-item>	
		        <Form-item label="微信号">
		            <Input v-model="submitList.wxIdentity" placeholder="请输入"></Input>
		        </Form-item>	
	        </Form>
	        <div slot="footer">
	            <Button size="large"  @click="modifyCancle">取消</Button>
	            <Button type="info" size="large"  @click="modifySure">确定</Button>
	        </div>
	    </Modal>
        <!--删除对话框-->
	    <Modal
	        v-model="deleteModel"
	        title="" >
	        <p>确定要删除该用户吗？</p>
	        <div slot="footer">
	            <Button size="large"  @click="deleteCancle">取消</Button>
	            <Button type="info" size="large"  @click="deleteSure">确定</Button>
	        </div>
	    </Modal>
        <!--绑定对话框-->
	    <Modal
	        v-model="bindwxModel"
	        title="" >
	        <Form :model="userInfo" :label-width="80" class="modifyDialog">
		        <Form-item label="姓名">
		            <Input v-model="userInfo.name" placeholder="" disabled></Input>
		        </Form-item>
		        <Form-item label="职务">
		            <Input v-model="userInfo.title" placeholder="" disabled></Input>
		        </Form-item>
		        <Form-item label="绑定手机号">
		            <Input v-model="userInfo.wxIdentity" placeholder="请输入"></Input>
		        </Form-item>	
		    </Form>
	        <div slot="footer">
	            <Button size="large"  @click="bindwxCancle">取消</Button>
	            <Button type="info" size="large"  @click="bindwxSure">确定</Button>
	        </div>
	    </Modal>
	</div>
</template>
<script>
import api from '@/api/api'
    export default {
        data () {
            return {
            	modifyModel:false,
            	deleteModel:false,
            	bindwxModel:false,
            	adduserModel:false,
		    	pageInfo:{
                    name:'',
		    		count:10,
		    		pageStart:1,
		    		pageNums:10
		    	},
		    	userInfo:{
		    		ix:'',
		    		name:'',
		    		title:'',
		    		loginName:'',
		    		mobile:'',
		    		email:'',
		    		wxIdentity:'',
		    		userIdentity:''
		    	},
                columnsInfo: [
                    {
                        title: '姓名',
                        key: 'name',
                    },
                    {
                        title: '职务',
                        key: 'title'
                    },
                    {
                        title: '登录名称',
                        key: 'loginName'
                    },
                    {
                        title: '手机号',
                        key: 'mobile'
                    },
                    {
                        title: 'email',
                        key: 'email'
                    },
                    {
                        title: '微信标识',
                        key: 'wxIdentity'
                    },
                    {
                        title: '用户标识',
                        key: 'userIdentity'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width:200,

                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.modifyFun(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeFun(params.index)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.bindwxFun(params.index)
                                        }
                                    }
                                }, '绑定微信'),
                            ]);
                        }
                    }
                ],
                submitList:{


                },
                userList: [
                    {
                        name: '商贩1',
                        title: '',
                        loginName: 'aa',
                        mobile:'123456',
                        email:'sdkf@126.com',
                        wxIdentity:'',
                        userIdentity:'系统用户'
                    },
                    {
                        name: '商贩2',
                        title: '',
                        loginName: 'aa',
                        mobile:'123456',
                        email:'sdkf@126.com',
                        wxIdentity:'已绑定(13910841948)',
                        userIdentity:'系统用户'
                    },
                    {
                        name: '商贩3',
                        title: '',
                        loginName: 'aa',
                        mobile:'123456',
                        email:'sdkf@126.com',
                        wxIdentity:'已绑定(13910841948)',
                        userIdentity:'系统用户'
                    },
                    {
                        name: '商贩4',
                        title: '',
                        loginName: 'aa',
                        mobile:'123456',
                        email:'sdkf@126.com',
                        wxIdentity:'已绑定(13910841948)',
                        userIdentity:'系统用户'
                    }   
                ]
            }
        },
        created(){
            const _this = this;
            //加载用户信息
            _this.axios({
                method : 'post',
                header : {
                    "Content-Type" : 'application/x-www-form-urlencoded'
                },
                url :api.queryUsers,
                data : api.jsonData(_this.pageInfo)
            })
            .then(function(res){
                if(res.data.status==1){
                   var newmeb = {}
                    _this.userList = res.data.datas.rows;
                   _this.pageInfo.count = res.data.datas.total;
                }
            })
        },
        methods:{
            //查询用户
            queryuserFun(){
                const _this = this;
                _this.axios({
                    method : 'post',
                    header : {
                        "Content-Type" : 'application/x-www-form-urlencoded'
                    },
                    url :api.queryUsers,
                    data : api.jsonData(_this.pageInfo)
                })
                .then(function(res){
                    if(res.data.status==1){
                       var newmeb = {}
                        _this.userList = res.data.datas.rows;
                       _this.pageInfo.count = res.data.datas.total;
                    }
                })
            },
            //新增用户
            adduserFun(){
                this.adduserModel = true;
                this.submitList.name = "";
                this.submitList.title = "";
                this.submitList.loginName = "";
                this.submitList.mobile = "";
                this.submitList.email = "";
                this.submitList.wxIdentity = "";
            },
            adduserSure(){
                const _this = this;
                var regphone = /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.submitList.mobile);
                var regemail =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.submitList.email);       
                if(!_this.submitList.name){
                    _this.$Message.warning('用户名不能为空');
                }
                else if(_this.submitList.name.length>10){
                    _this.$Message.warning('用户名最多为10个字符');
                }
                else if(!_this.submitList.loginName){
                    _this.$Message.warning('登录名称不能为空');
                }
                else if(_this.submitList.loginName.length>30){
                    _this.$Message.warning('登录名称最多为30个字符');
                }
                else if(!regphone){
                    _this.$Message.warning('请输入正确的11位数字手机号');
                }
                else if(!regemail){
                    this.$Message.warning('请输入正确的邮箱格式');
                }
                else{
                    _this.axios({
                        method : 'post',
                        header : {
                            "Content-Type" : 'application/x-www-form-urlencoded'
                        },
                        url :api.addOrModifySave,
                        data : api.jsonData(_this.submitList)
                    })
                    .then(function(res){
                        
                        if(res.data.status==1){
                           var newmeb = {}
                           newmeb.name = _this.submitList.name;
                           newmeb.title = _this.submitList.title;
                           newmeb.loginName = _this.submitList.loginName;
                           newmeb.mobile = _this.submitList.mobile;
                           newmeb.email = _this.submitList.email;
                           newmeb.wxIdentity = _this.submitList.wxIdentity;
                           _this.userList.push(newmeb);
                            _this.$Message.success('新增用户成功');
                            _this.adduserModel = false; 
                        }
                    })
                }
            },
            adduserCancle(){
                this.userInfo.name = "";
                this.userInfo.title = "";
                this.userInfo.loginName = "";
                this.userInfo.mobile = "";
                this.userInfo.email = "";
                this.userInfo.wxIdentity = "";
            },
        	//修改
        	modifyFun(index){
        		this.modifyModel = true;
        		this.submitList.ix = index;
                this.submitList.id = this.userList[index].id;
        		this.submitList.name = this.userList[index].name;
        		this.submitList.title = this.userList[index].title;
        		this.submitList.loginName = this.userList[index].loginName;
        		this.submitList.mobile = this.userList[index].mobile;
        		this.submitList.email = this.userList[index].email;
        		this.submitList.wxIdentity = this.userList[index].wxIdentity;
        	},
        	modifySure(){
                const _this = this; 
                var regphone = /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.submitList.mobile);
                var regemail =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.submitList.email);       
                if(!_this.submitList.name){
                    _this.$Message.warning('用户名不能为空');
                }
                else if(_this.submitList.name.length>10){
                    _this.$Message.warning('用户名最多为10个字符');
                }
                else if(!_this.submitList.loginName){
                    _this.$Message.warning('登录名称不能为空');
                }
                else if(_this.submitList.loginName.length>30){
                    _this.$Message.warning('登录名称最多为30个字符');
                }
                else if(!regphone){
                    _this.$Message.warning('请输入正确的11位数字手机号');
                }
                else if(!regemail){
                    this.$Message.warning('请输入正确的邮箱格式');
                }
                else{
                    _this.axios({
                        method : 'post',
                        header : {
                            "Content-Type" : 'application/x-www-form-urlencoded'
                        },
                        url :api.addOrModifySave,
                        data : api.jsonData(_this.submitList)
                    })
                    .then(function(res){
                        console.log(res.data);
                        if(res.data.status==1){
                           _this.userList[_this.submitList.ix].id = _this.submitList.id;
                           _this.userList[_this.submitList.ix].name = _this.submitList.name;
                           _this.userList[_this.submitList.ix].title = _this.submitList.title;
                           _this.userList[_this.submitList.ix].loginName = _this.submitList.loginName;
                        _this.userList[_this.submitList.ix].mobile = _this.submitList.mobile;
                           _this.userList[_this.submitList.ix].email = _this.submitList.email;
                           _this.userList[_this.submitList.ix].wxIdentity = _this.submitList.wxIdentity;
                           console.log(_this.submitList);
                            _this.$Message.success('修改成功');
                            _this.modifyModel = false; 
                        }
                    })
                }


        	},
        	modifyCancle(){
        		this.modifyModel = false;
        	},
        	//删除
        	removeFun(index){
        		this.deleteModel = true;
        		this.userInfo.ix = index;
        	},
			deleteSure(){
				this.userList.splice(this.userInfo.ix,1);
				this.$Message.success('删除成功');
				this.deleteModel = false;
			},
			deleteCancle(){
				this.deleteModel = false;
			},
			//绑定微信
			bindwxFun(index){
				this.userInfo.ix = index;
				if(this.userList[this.userInfo.ix].wxIdentity===""){
					this.bindwxModel = true;
	        		this.userInfo.ix = index;
	        		this.userInfo.name = this.userList[index].name;
	        		this.userInfo.title = this.userList[index].title;
	        		this.userInfo.loginName = this.userList[index].loginName;
	        		this.userInfo.mobile = this.userList[index].mobile;
	        		this.userInfo.email = this.userList[index].email;
	        		this.userInfo.wxIdentity = this.userList[index].wxIdentity;
				}
				else{
					this.$Message.warning('此用户已绑定，不能重复执行此项操作');
				}
			},
			bindwxSure(){
				var phnum = this.userInfo.wxIdentity;
				var reg = /^1[3|4|5|8][0-9]\d{4,8}$/.test(this.userInfo.wxIdentity);
				if(phnum==='' || !reg){
					this.$Message.warning('请输入正确的11位数字手机号');
				}
				else{
					this.userList[this.userInfo.ix].wxIdentity = this.userInfo.wxIdentity;
					this.$Message.success('绑定成功');
					this.bindwxModel = false;
				}
			},
			bindwxCancle(){
				this.bindwxModel = false;
			},
            //分页
            pageFun(x){
                const _this = this;
                _this.pageInfo.pageStart = x;


                _this.axios({
                    method : 'post',
                    header : {
                        "Content-Type" : 'application/x-www-form-urlencoded'
                    },
                    url :api.queryUsers,
                    data : api.jsonData(_this.pageInfo)
                })
                .then(function(res){
                    
                    if(res.data.status==1){
                       var newmeb = {}
                        _this.userList = res.data.datas.rows;
                       _this.pageInfo.count = res.data.datas.total;
                    }
                })
            }
        }
    }
</script>
<style>
.modifyDialog{
	overflow:auto;
}
.modifyDialog .ivu-form-item{
	width:100%
}
.tableList{
	margin-top:20px;
}
</style>