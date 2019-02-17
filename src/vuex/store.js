import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/usermodule'
import pageModule from './modules/page'


Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义模块
	modules : {
		user : UserModule,
		page : pageModule
	},
  // 定义状态
  	state: {
  		token: null,
        title: '',
        pageNums : 10,		//分页条数
        goodsListPage : 1,	//产品列表 页码
        goodsAttrPage : 1,	// 产品属性 页码
        localImportStatus: 1,  // 客户信息编辑状态：0 为修改; 1 为新增
        customerId: '',
  	},
 	// actions : api,
	mutations : {
		login: function(state, data){
		    localStorage.token = data;
		    document.cookie = data;
		    state.token = data;
		},
		logout: function(state){
		    localStorage.removeItem('token');
		    localStorage.removeItem('corp');
		    localStorage.removeItem('user');		    
		    state.token = null;
		    state.user.user = {};
		    state.user.corp = {};
		},
		title: function(state, data){
		    state.title = data;
		},
		goodsListPage: function(state, page){
			state.goodsListPage = page;
		},
		goodsAttrPage: function(state, page){
			state.goodsAttrPage = page;
        },
        changeLocalImportStatus: function(state, data){
            state.localImportStatus = data;
        },
        changeCustomerId: function(state,data){
            state.customerId = data;
        }
	}
})

export default store