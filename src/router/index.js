import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'




//import Login from '@/pages/login/login'
//import Hello from '@/pages/Hello'
import Index from '@/page/index'
import Welcome from '@/page/welcome/welcome'
import audit from '@/pages/client/audit'
import UE from '@/components/UE'
///////////////////////////--xia///////////////////////////////////////////

import priceDetail from '@/components/price/priceDetail'
import goodsDetail from '@/components/product/goodsDetail'
import userMange from '@/components/jurisdiction/userMange'

//支付管理
import pay from '@/components/pay/pay'
import addInvoice from '@/components/pay/addInvoice'
import modifyInvoice from '@/components/pay/modifyInvoice'
import invoiceInfo from '@/components/pay/invoiceInfo'
import payConfirm from '@/components/pay/payConfirm'
import addPay from '@/components/pay/addPay'

/////////////////////////////////--lizhijie/////////////////////////////////////

///////////////////////////////--luowenjuan///////////////////////////////
import register from '@/pages/register/register'
import baseInfo from '@/pages/register/baseInfo'
import emailActivate from '@/pages/register/emailActivate'



import sys_user from '@/components/organize/sys_user' //用戶管理




///////////////////2018////////////////////////////////





//开发中的临时提示页面
import developingi from '@/page/developing'
import noright from '@/page//noright'
//import gooche from '@/page//gooche'
//////////////////////////////////////////////////---------2018.3.6-----------------





//******************************公司信息**********************************
import sys_modify_mycorp from '@/page/sys/corp/modifyme' //公司信息


//////////////////登陆注册//////************/login文件下
//登陆注册
import loginTel from '@/page/login/loginTel' //手机号码登录页面
import login from '@/page/login/login' //登录组件
import newregister from '@/page/login/register' //注册组件
import scanCode from '@/page/login/scanCode' //扫码码登录组件

//////////////////组织/////////***********
//--------/个人信息/--------
import userAccount from '@/page/sys/user/account' //账号基本信息
import userModifypwd from '@/page/sys/user/modifypwd' //密碼修改
//--------	基本信息--------	
import orgMain from '@/page/sys/user/developing' ///组织机构
import developing_new from '@/page/set/developing_new' //员工  编辑/ 新增人员
import department from '@/page/sys/org/department' //部门
import sys_modify_phone from '@/page/set/sys_modify_phone' //更换号码
import sys_tou from '@/page/set/tou' //右上设置
//import sys_role from '@/page/sys/role/sys_role' //角色設置
import sys_role from '@/page/sys/role/sys_role' //员工权限设置
//import developing_detailed from '@/page/set/developing_detailed' //员工权限设置
//--------	认证--------	
import apply from '@/page/sys/corp/apply' //填写认证页
//import accountCenter from '@/page/set/accountCen01ter' //账号信息首页
import authentication_info from '@/page/sys/corp/authentication_info' //认证页面
import invoiceModify from '@/sc_page/sys/corp/invoice' //开票
import companyBaseInfo from '@/page/set/companyBaseInfo' //公司基本信息


//-**********************/left 组件 下的功能按按顺序排***************----2018.3.8----------  
////////////////////////////////组织///////////////////-
//基础资料
import unit from '@/page/base/comm/unit' //计量单位 2018.03.05  by junting
import brand from '@/page/base/comm/brand' //品牌管理 2018.03.05  by junting


//////////////////////////////供应链///////////////////
//云采购
import waitAuditListForSupplier from '@/sc_page/cooperation/supplier/supplier_auditList' //供应商 审核列表
import supplierApplyList from '@/sc_page/cooperation/supplier/supplier_applyList' //供应商网络新增
import supplierAdd from '@/sc_page/cooperation/supplier/supplier_add' //供应商 网络邀请
import supplierDetail from '@/sc_page/cooperation/supplier/supplier_detail' //供应商 申请明细

//供应商 列表
import supplier from '@/sc_page/supplier/main/supplier_list'
import supplierEdit from '@/sc_page/supplier/main/supplier_base'
import supplierInfo from '@/sc_page/supplier/main/supplier_info'

import corpDetail from '@/sc_page/pop/corp_detail' // 供应商 网络新增 详情


//物料
import supplierCatalog from '@/page/material/catalog/catalog' //物料fen
import supplierGoods from '@/page/material/mall/supplierGoods' //物料商城


//采购计划
import purchasePlan from '@/sc_page/order/plan/order_plan_draft_list' //采购计划 
import purchaseAudit from '@/sc_page/order/plan/order_plan_audit_list' //采购审核
import purchaseInfo from '@/sc_page/order/plan/order_plan_detail'
import purchaseForm from '@/sc_page/order/plan/order_plan_modify'
import reviewedForm from '@/sc_page/order/plan/order_plan_audit'


//////////////////////////////云销售///////////////////
//产品管理
import catalog from '@/page/CommodityManageMent/catalog' //分类
import goodsList from '@/page/CommodityManageMent/goodsList' //列表
//import goodsListtow from '@/page/CommodityManageMent/goodsList-fu'//列表副本
import addGoods from '@/page/CommodityManageMent/addGoods' //列表add
/*import addGoodstow from '@/page/CommodityManageMent/addGoods-fu'//列表add副本*/
import showGoodstow from '@/page/CommodityManageMent/showgood' //列表查看产品详情
import goodsAttr from '@/page/CommodityManageMent/attribute' //属性
import addGoodsAttr from '@/page/CommodityManageMent/addAttr' //属性add

//客户
import applyCustomerList from '@/page/cooperation/customer/addt/applyCustomerList' //添加客户列表
import addCustomer from '@/page/cooperation/customer/addt/addCustomer' //添加客户添加操作页
import showCustomer from '@/page/cooperation/customer/addt/showCustomer' //客户申请明细
import applicationCustomer from '@/page/cooperation/customer/addt/applicationCustomer' //客户申请审核
import customerAuditList from '@/sc_page/cooperation/customer/customer_auditList' //确认新客户
import importCustomer from '@/page/cooperation/customer/addt/importCustomer' //导入客户
import localImport from '@/sc_page/customer/main/customer_base' //客户 本地添加
import customerAdd from '@/sc_page/cooperation/customer/customer_add' //客户 网络邀请


import customer from '@/sc_page/customer/main/customer_list' //客户列表
import customerInfo from '@/sc_page/customer/main/customer_info' //客户列表本地添加 信息显示
import editCustomer from '@/page/cooperation/customer/editCustomer'
import customerCatalog from '@/page/cooperation/customer/catalog' //客户分类
import customerLeve from '@/page/cooperation/customer/leve' //客户级别
import customerArea from '@/page/cooperation/customer/area' //区域/customer/area
import customerTrade from '@/page/cooperation/customer/trade' //行业/customer/trade

//销售
import orderSale from '@/page/order/sale/sale' //订单列表
import scaleConfirm from '@/page/order/sale/confirm' //确认新订单order/sale/confirm
import scaleAudits from '@/page/order/sale/audit' //审核新订单 /order/sale/audit
import saleDelivery from '@/page/order/sale/delivery' //审核新订单 /order/sale/delivery 
import priceAdjust from '@/page/product/price/adjust' //调价单 /product/price/
import priceSet from '@/page/product/price/set' //价格设置product/price/set
//////////////////////////////订单///////////////////
//订单管理
import scaleSubmit from '@/page/linshi/scaleSubmit'
import scaleAudit from '@/page/linshi/scaleAudit'
import orderInfo from '@/page/linshi/orderInfo'

//////////////////////////////收发货///////////////////
//import receipt from '@/page/Logistics/receipt' //收货地址管理
import receipt from '@/sc_page/sys/corp/consignees_list' //收货地址管理
//////////////////////////////财务///////////////////
//付款管理
import financePay from '@/page/finance/pay/pay' //付款管理/finance/pay 
import financeCollect from '@/page/finance/bill/collect' //收款确认finance/collect 

//////////////////////////////信息处理///////////////////
import baseInfoIntroduce from '@/pages/info/introduce' //add by xiamj on 2018.5.28

//////////////////////////////库存///////////////////

//////////////////////////////生产///////////////////

//////////////////////////////门店///////////////////

//////////////////////////////货源///////////////////

//////////////////////////////大数据///////////////////
import kanbanmain from '@/sc_page/kanban/main/main'
import kanbanWelcome from '@/sc_page/kanban/welcome'
import kanbanWelcomeInfo from '@/sc_page/kanban/welcome_info'



////////////////////////////平台////////////////////////
//平台会员管理	
import corpList from '@/page/sys/corp/list' //会员列表
import companyInfo from '@/page/MemberManageMent/companyInfo' //详情
import auditing from '@/page/MemberManageMent/auditing' //审核
import corpAdd from '@/page/sys/corp/corp_add'

/*--------------------- 公告列表 -----------------------*/
import newsList from '@/sc_page/base/news/news_list'
import addNews from '@/sc_page/base/news/add_news'


//---------------------------优化整理结束--2018.3.6-----------------------


/////////////////////////////////--lizhijie/////////////////////////////////////
//***********路由配置************
Vue.use(Router)
const routes = [
    //****重定向*******
    {
        path: '/index.html',
        redirect: '/'
    },
    ///*********登陆注册
    {
        path: '/',
        name: 'loginTel',
        component: loginTel,
        children: [{
                path: '/',
                name: 'login',
                component: login
            }, {
                path: '/newregister',
                name: 'newregister',
                component: newregister
            },
            {
                path: '/scanCode',
                name: 'scanCode',
                component: scanCode
            },
        ]
    },
    //*******主要页面路由配置
    {
        ///*********登陆进去首页重定向
        path: '/main',
        name: 'index',
        meta: {
            requireAuth: true,
        },
        component: Index,
        children: [{
                path: '/',
                name: '/',
                component: Welcome
            },

            //开发中的临时提示页面
            {
                path: '/developing',
                name: 'developingi',
                component: developingi
            },
            {
                path: '/noright',
                name: 'noright',
                component: noright
            },
            //		{
            //		path: '/gooche',
            //		name: 'gooche',
            //		component: gooche
            //	},

            //****************************-组织 ****************************-		
            ///**************************************
            //权限管理
            {
                path: '/sys/corp/modifyme',
                name: 'sys_modify_mycorp',
                component: sys_modify_mycorp
            },
            {
                path: '/sys/corp/apply',
                name: 'apply',
                component: apply
            },
            //审核状态
            {
                path: "/sys/corp/authentication_info",
                name: 'authentication_info',
                component: authentication_info
            },
            //开票信息
            {
                path: "/sys/corp/invoice/modify",
                name: 'invoiceModify',
                component: invoiceModify
            },

            //员工账号
            {
                path: '/sys/user/main',
                name: 'orgMain',
                component: orgMain
            },
            {
                path: '/developing/add',
                name: 'developing_new',
                component: developing_new
            },
            //部门设置
            {
                path: '/sys/org/main',
                name: 'department',
                component: department
            },
            //角色
            {
                path: '/sys/role/main',
                name: 'sys_role',
                component: sys_role
            },

            //个人信息
            //更换号码
            {
                path: '/sys_modify_phone',
                name: 'sys_modify_phone',
                component: sys_modify_phone
            },
            //注册信息
            {
                path: '/companyBaseInfo',
                name: 'companyBaseInfo',
                component: companyBaseInfo
            },
            //		右上角
            {
                path: '/set/tou',
                name: 'sys_tou',
                component: sys_tou
            },
            {
                path: '/sys/user/account',
                name: 'userAccount',
                component: userAccount
            },
            //修改密码
            {
                path: '/sys/user/modifypwd',
                name: 'userModifypwd',
                component: userModifypwd
            },

            //基础资料
            //计量单位 2018.03.05 by junting
            {
                path: '/base/comm/unit',
                name: 'unit',
                component: unit
            },
            //品牌管理 2018.03.05 by junting
            {
                path: '/base/comm/brand',
                name: 'brand',
                component: brand
            },
            //基础资料end---
            //****************************组织 -end-****************************

            //****************************云采购****************************
            //物料
            {
                path: '/material/mall/main',
                name: 'supplierGoods',
                component: supplierGoods
            },
            {
                path: '/material/catalog',
                name: 'supplierCatalog',
                component: supplierCatalog
            },

            //.物料---end-
            //供应.供应商
            {
                path: '/cooperation/supplier/audit',
                name: 'waitAuditListForSupplier',
                component: waitAuditListForSupplier
            },
            {
                path: '/cooperation/supplier/add',
                name: 'supplierApplyList',
                component: supplierApplyList
            },
            {
                path: '/cooperation/detail',
                name: 'corpDetail',
                component: corpDetail
            },
            {
                path: '/cooperation/supplier/new',
                name: 'supplierAdd',
                component: supplierAdd
            },
            {
                path: '/supplier/main/list',
                name: 'supplier',
                component: supplier
            },
            {
                path: '/supplier/edit',
                name: 'supplierEdit',
                component: supplierEdit,
            },
            {
                path: '/supplier/information',
                name: 'supplierInfo',
                component: supplierInfo,
            },
            {
                path: '/cooperation/supplier/detail/:id',
                name: 'supplierDetail',
                component: supplierDetail
            },


            //.供应商---end-
            //.采购
            {
                path: '/order/purchase/audit',
                name: 'purchaseAudit',
                component: purchaseAudit
            },
            {
                path: '/order/purchase/plan',
                name: 'purchasePlan',
                component: purchasePlan
            },
            {
                path: '/purchaseForm',
                name: 'purchaseForm',
                component: purchaseForm
            },
            {
                path: '/purchaseInfo',
                name: 'purchaseInfo',
                component: purchaseInfo
            },
            {
                path: '/reviewedForm',
                name: 'reviewedForm',
                component: reviewedForm
            },
            //.云采购---end
            //****************************供应链 end-****************************


            //****************************云销售****************************
            //云销售---客户
            {
                path: '/addCustomer',
                name: 'addCustomer',
                component: addCustomer
            },
            {
                path: '/showCustomer/:id',
                name: 'showCustomer',
                component: showCustomer
            },
            {
                path: '/applicationCustomer/:id',
                name: 'applicationCustomer',
                component: applicationCustomer
            },
            {
                path: '/cooperation/customer/add',
                name: 'applyCustomerList',
                component: applyCustomerList
            },

            {
                path: '/cooperation/customer/audit',
                name: 'customerAuditList',
                component: customerAuditList
            },
            {
                path: '/cooperation/customer/importCustomer',
                name: 'importCustomer',
                component: importCustomer
            },
            {
                path: '/import/localImport',
                name: 'localImport',
                component: localImport
            },
            {
                path: '/cooperation/customer/new',
                name: 'customerAdd',
                component: customerAdd
            },
            {
                path: '/customer/catalog',
                name: 'customerCatalog',
                component: customerCatalog
            },
            {
                path: '/customer/level',
                name: 'customerLeve',
                component: customerLeve
            },
            {
                path: '/customer/area',
                name: customerArea,
                component: customerArea
            },
            {
                path: '/customer/trade',
                name: 'customerTrade',
                component: customerTrade
            },
            {
                path: '/customer',
                name: 'customer',
                component: customer
            },
            {
                path: '/editCustomer',
                name: 'editCustomer',
                component: editCustomer
            },
            {
                path: '/customer/localimport',
                name: 'customerInfo',
                component: customerInfo
            },
            //云销售---客户- end-

            //-产品管理
            //产品分类
            {
                path: '/product/catalog',
                name: 'productCatalog',
                component: catalog
            },
            //产品属性
            {
                path: '/product/attribute',
                name: 'productAttribute',
                component: goodsAttr
            },
            {
                path: '/productAttribute/add',
                name: 'addGoodsAttr',
                component: addGoodsAttr
            },


            //产品列表
            //			{
            //				path: '/product/goodsList',
            //				name: 'productGoodsList',
            //				component: goodsList,
            //			},
            //			{
            //				path: '/productGoodsList/add',
            //				name: 'addGoods',
            //				component: addGoods
            //			},

            {
                path: '/goodsList',
                name: 'goodsList',
                component: goodsList,
            },

            // {
            // 	path: '/goodsListtow',
            // 	name: 'goodsListtow',
            // 	component: goodsListtow,
            // },
            {
                path: '/goodsList/add',
                name: 'addGoods',
                component: addGoods
            },
            // {
            // 	path: '/goodsListtow/add',
            // 	name: 'addGoodstow',
            // 	component: addGoodstow
            // },
            {
                path: '/goodsList/showGoodstow',
                name: 'showGoodstow',
                component: showGoodstow
            },

            //产品管理end-

            //销售
            {
                path: '/order/sale',
                name: 'orderSale',
                component: orderSale
            },
            {
                path: '/order/sale/confirm',
                name: 'scaleConfirm',
                component: scaleConfirm
            },
            {
                path: '/order/sale/audit',
                name: 'scaleAudits',
                component: scaleAudits
            },
            {
                path: '/order/sale/delivery',
                name: 'saleDelivery',
                component: saleDelivery
            },
            {
                path: '/product/price/adjust',
                name: 'priceAdjust',
                component: priceAdjust
            },
            {
                path: '/product/price/set',
                name: 'priceSet',
                component: priceSet
            },
            //-------------------xiamj------------------------------------
            {
                path: '/base/info/introduce',
                name: 'baseInfoIntroduce',
                component: baseInfoIntroduce
            },


            //-------------------xiamj------------------------------------



            ///销售end-
            //****************************云销售 end-****************************

            //***************************订单*****************************
            {
                path: '/orderInfo',
                name: 'orderInfo',
                component: orderInfo
            },
            {
                path: '/scaleSubmit',
                name: 'scaleSubmit',
                component: scaleSubmit
            },
            {
                path: '/scaleAudit',
                name: 'scaleAudit',
                component: scaleAudit
            },
            //****************************订单 end-************************

            //***************************收发货*****************************
            {
                path: '/sys/corp/consignees_list',
                name: 'receipt',
                component: receipt
            },

            //****************************收发货 end-************************

            //***************************财务*****************************
            //付款管理
            {
                path: '/finance/pay/list',
                name: 'financePay',
                component: financePay
            },
            //收款确认
            {
                path: '/finance/bill/list',
                name: 'financeCollect',
                component: financeCollect
            },
            //****************************财务 end-************************

            //***************************库存*****************************
            //****************************库存 end-************************

            //***************************生产*****************************
            //****************************生产 end-************************

            //***************************门店*****************************
            //****************************门店 end-************************

            //***************************货源*****************************
            //****************************货源 end-************************

            //***************************大数据*****************************
            {
                path: '/kanban/main',
                name: 'kanbanmain',
                component: kanbanmain
            },
            {
                path: '/kanban/welcome/:id',
                name: 'kanbanWelcome',
                component: kanbanWelcome
            },
            {
                path: '/kanban/welcomeInfo/:id',
                name: 'kanbanWelcomeInfo',
                component: kanbanWelcomeInfo
            },

            //****************************大数据 end-************************


            //****************************平台****************************
            ///-------------------------会员管理-------------------
            //会员管理列表
            {
                path: '/sys/corp/list',
                name: 'corpList',
                component: corpList
            },
            {
                path: '/companyInfo',
                name: 'companyInfo',
                component: companyInfo
            },
            //-----------------------------------------------------

            //****************************平台-end****************************


            {
                path: '/sys/corp/add',
                name: 'corpAdd',
                component: corpAdd,
            },
            {
                path: '/audit/:id',
                name: 'audit',
                component: audit
            },

            /////////////////////////////--lizhijun/////////////////////////////////
            {
                path: '/supplierGoods/info',
                name: 'goodsDetail',
                component: goodsDetail
            },
            {
                path: '/userMange',
                name: 'userMange',
                component: userMange
            },




            {
                path: '/pay',
                name: 'pay',
                component: pay
            },

            {
                path: '/addInvoice',
                name: 'addInvoice',
                component: addInvoice
            },
            {
                path: '/modifyInvoice',
                name: 'modifyInvoice',
                component: modifyInvoice
            },
            {
                path: '/invoiceInfo',
                name: 'invoiceInfo',
                component: invoiceInfo
            },

            {
                path: '/payConfirm',
                name: 'payConfirm',
                component: payConfirm
            },
            {
                path: '/addPay',
                name: 'addPay',
                component: addPay
            },
            {
                path: '/sys_user',
                name: 'sys_user',
                component: sys_user
            },


            /////////////////////////////-lizhijie--begin/////////////////////////////////////



            {
                path: '/priceDetail',
                name: 'priceDetail',
                component: priceDetail
            },
            ////////////////////////--lizhijie-END--///////////////////////////////////////

            /////////////////////--luowenjuan--/////////////
            //审核
            {
                path: '/auditing',
                name: 'auditing',
                component: auditing
            },
            //			,
            //			{
            //				path: '/auditing_x',
            //				name: 'auditing_x',
            //				component: auditing_x
            //			}

            /*---------------- 公告列表 ------------------*/
            {
                path: '/base/news/main',
                name: 'newsList',
                component: newsList
            },
            {
                path: '/newsList/addNews',
                name: 'addNews',
                component: addNews
            },
        ]
    },
    //	{
    //		path: '/:id/login',
    //		name: 'login',
    //		component: Login
    //	},

    //	{
    //		path: '/aa',
    //		name: 'aa',
    //		component: Hello
    //	},
    {
        path: '/editor',
        name: 'editor',
        component: UE
    },

    {
        path: "/register", //注册
        component: register,
        children: [{
                path: "/",
                component: baseInfo
            },
            {
                path: "/baseInfo",
                component: baseInfo
            },
            {
                path: "/emailActivate",
                name: "emailActivate",
                component: emailActivate
            }
        ]
    },





    //-------------------------------------------------------









    //********************head-组件--基础信息---2018.3.6---- 暂时不要动******************************


    ///*****************head-组件--基础信息---2018.3.6*****************************

]


// 页面刷新，重新给 token 赋值
if (window.localStorage.getItem('token')) {
    store.commit('login', window.localStorage.getItem('token'));
    store.commit('saveUser', JSON.parse(window.localStorage.getItem('user')));
    store.commit('saveCorp', JSON.parse(window.localStorage.getItem('corp')));
}

var router = new Router({
    routes: routes
    //	mode: 'history',
    //打包后打开页面刷新当前页面会404 HTML5 History 模式
    //	 routes: [
    //	 { path: '*', component: NotFoundComponent }
    //	 ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        } else {
            next({
                path: '/',
            })
        }
    } else {
        next();
    }
})

export default router;