
export default {
	jsonData : function(data){
		// 历史遗留--post请求数据格式由后台统一修正
		return data ;
		// console.log(data);
//		let jsondata = '';
//		const reg = /^\".*\"$/;
//		for(const key in data) {
//			if(data[key]) {
//
//				const tm = JSON.stringify(data[key]);
//				// console.log(tm);
//
//				if(tm.match(reg)) {
//					let atm = tm.substr(1,tm.length - 2);
//					atm = encodeURIComponent(atm);
//
//					jsondata += key + '=' + atm + '&';
//				}else {
//					jsondata += key + '=' + encodeURIComponent(tm) + '&';
//				}
//			}
//		}
//		const json = jsondata.substr(0,jsondata.length-1);
//		return json;
	},
	////////////////////////////////////////////////////////////////////////////////
	convertParam : function(data){
		return data ;
	},
	////////////////////////////////////////////////////////////////////////////////
	uploadFileUrl:'http://121.196.209.122/easycrm/api/common/fileUpload.do',
	
	//--------------------------URL地址参数 begin------	客户 供应商名单-----------------------------
	baseCorp : '/api/upms/corp/',			// 客户供应商名单
	//--------------------------URL地址参数 end------------------------------------
	
	
	//--------------------------URL地址参数 begin------	公司信息-----------------------------
	companyModify:'/api/upms/corp/modify.do',//修改公司信息
	queryMe:'/api/upms/corp/queryMe.do',//查询公司信息
	//--------------------------URL地址参数 end------------------------------------
	
	
	//--------------------------URL地址参数 begin------	设置-----------------------------
	set:'/api/upms/corp/',           //设置 api 根路径
	//--------------------------URL地址参数 end------------------------------------

	//--------------------------URL地址参数 begin---------产品-----------------------------
	//1、通用操作 确认日期：2018.03.01 by xiamj
	queryTreeById	: '/queryTreeById.do',		// 根据ID查询树（包括本身）
	queryById 		: '/queryById.do'		,	// 根据 Id 查询明细 
	modify 			: '/modify.do',				// 根据ID修改
	add 			: '/add.do'	,				// 添加 新的对象
	delete 			: '/delete.do',				// GET /:id/delete.do，根据ID删除
	rootId			: '9999',					// 根节点，统一为9999
	moveUp 			: '/moveUp.do', 			// 将特定节点上移  如 /12/moveUp.do
	moveDown 		: '/moveDown.do', 			// 将特定节点下移  如 /12/moveDown.do
	queryAll 		: '/queryAll.do',			//查询所有  get
	//各功能点的前缀常量
	rootProductCatalog    : '/api/product/catalog/',  //产品分类根路径前缀 2018.03.01 
	rootBaseBrand   : '/api/base/brand/',  //品牌根路径前缀 2018.03.05 
	rootBaseUnit    : '/api/base/unit/',  //计量单位根路径前缀 2018.03.05 
	rootMaterialCatalog    : '/api/material/catalog/',  //物料分类根路径前缀 2018.03.08 
	//--------------------------URL地址参数 end------------------------------------
	
	//--------------------------URL地址参数 begin------	品牌和计量单位-----------------------------
	addAndQueryAll 	: '/addAndQueryAll.do',			// 添加 新的对象	
	query 			: '/query.do',
	queryFen        :'queryByRequest.do',  //品牌管理分页
	spModify        :'modify.do',         //品牌编辑保存
	//--------------------------URL地址参数 end------------------------------------
     
    //--------------------------URL地址参数 begin------	认证-----------------------------
    allAddress   :'/api/base/address/queryTreeToCounty.do',    //地区查询




















//
	deletes 		: '/delete.do',				// GET /:id/delete.do，根据ID删除
	queryAllPost : 'queryByRequest.do',	// 查询所有 post
	
	addRoot : 'addRoot.do',			//添加一级分类
	
	
	
	customeraudit : 'audit.do',				//  post 审核     原先是“audit” 
	


	/**
	 * [login description]
	 * @type {String}
	 */
	login : '/verifyUser.do',
	logout : '/api/sys/logout.do',
	menus : '/sys/menu/fetchUserMenus.do',

//	userPhoto:'/api/upms/user/addOrModifySave.do',//修改用户头像




	/*公司合作*/
	cooperation : '/api/cooperation/main/',		// 公司合作方
    //添加客户
    addCustomer:'/api/cooperation/customer/submitToAudit.do',
	/* 客户列表 */
	cooperationCustomer : '/api/cooperation/customer/',		// 客户列表
	customerSubmitAudit : 'submitToAudit.do',		// 客户提交审核
	customerNew : 'queryAuditListByRequest.do',		// 新客户列表

	/* 客户分类 */
	category : '/api/customer/category/', 	//客户分类 api 根路径
	categoryGetRoots : 'queryAll.do' , 		//查询客户分类列表
	categoryGetById : '/query.do', 			// 根据ID查询某一个客户分类详情 -- 之前添加查询ID 如 /12/query.do
	categoryPostAddRoot :'addRoot.do' ,  	//增加跟节点 post请求
	cetegoryAdd : 'add.do', 				//增加子节点 post请求 ，其中必须指定 parentId
	cetegoryModify : 'modify.do', 			//修改指定节点
	cetegoryDelete : '/delete.do',  		//删除指定节点 -- 之前添加删除ID  如 /12/delete.do
	cetegoryMoveUp : '/moveUp.do', 			//将特定节点上移-- 之前添加上移ID  如 /12/moveUp.do
	cetegoryMoveDown : '/moveDown.do', 		//将特定节点下移-- 之前添加上移ID  如 /12/moveDown.do
	//  客户级别
	clientLevel : '/api/customer/level/',   // 客户级别 api 根路径
	clientLevelqueryAll : 'queryAll.do',   	// 查询客户级别列表
	clientLevelQueryById : '/query.do',  	// 根据ID查询某一个客户级别详情 -- 之前添加查询ID 如 /12/query.do
	clientLevelAdd : 'add.do',   			// 添加客户级别
	clientLevelModify : 'modify.do',   		// 编辑客户级别
	clientLevelDel : '/delete.do',   		// 删除指定节点 -- 之前添加删除ID  如 /12/delete.do
	// 区域设置
	region : '/api/customer/region/', 	//区域设置 api 根路径
	regionGetRoot : 'queryAll.do',		//查询区域设置列表
	regionGetById : '/query.do',		//根据ID查询某一个节点详情 -- 之前添加查询ID 如 /12/query.do
	regionAddRoot : 'addRoot.do',		//添加一级区域
	regionAdd : 'add.do',				//添加区域设置子分类
	regionModify : 'modify.do',			//修改区域设置
	regionMoveUp : '/moveUp.do',		//将特定节点上移-- 之前添加上移ID  如 /12/moveUp.do
	regionMoveDown : '/moveDown.do',	//将特定节点下移-- 之前添加上移ID  如 /12/moveDown.do
	regionDel : '/delete.do',			//删除指定节点 -- 之前添加删除ID  如 /12/delete.do


	///////////////////////////////////////////////////////////////////////////////////////
			
	
		//设置
//	set:'/api/base/corp/',           //设置 api 根路径
//	companyQuery:'/api/base/corp/queryByRequest.do',//企业列表


	///////////////////////////////--李志军////////////////////////////////////////////////////////
  	// 产品属性
	product : '/api/product/attribute/',		//产品属性 api 根路径
	productGetById : '/queryByIds.do',	//根据多	个id查询产品属性   如 /1,2,3/queryByIds.do
	
	

    //公司信息
	companyQueryMe:'/queryMe.do',
	//companyModify:'/api/base/corp/modify.do',//修改公司信息
	//queryMe:'/api/base/corp/queryMe.do',//查询公司信息

	//供应商
	supplier:'/api/cooperation/supplier/queryAuditListByRequest.do',//供应商审核列表查询
    supplierInfo:'/api/supplier/main/queryAll.do',//供应商信息
    supplierList: '/api/supplier/main/queryByRequest.do', //供应商查询列表 2018-6-26
    supplierAdd: '/api/supplier/main/add.do', //供应商 添加（本地） 2018-6-26

	supplierQuery:'/api/product/main/queryBySupplierProduct.do',//供应商产品
	supplierAll:'/api/cooperation/supplier/queryByRequest.do',//添加供应商列表页查询
	supplierSave:'/api/cooperation/supplier/submitToAudit.do',//供应商添加操作页保存
	supplierToPage:'/api/cooperation/supplier/queryAuditListByRequest.do',//供应商审核页topage
		
	//用户管理
	queryUsers:'/api/sys/user/queryByRequest.do',//查询用户信息
	addOrModifySave:'/api/upms/user/addOrModifySave.do',//添加、修改用户信息
    subordinate:'/api/upms/user/queryByRequest.do',//查询下属员工账号信息  // 业务员 2018-6-26
    

	//加入采购计划
	jionPlan:'/api/order/plan/addSku.do',//加入采购计划
	planList:'/api/order/plan/queryList.do',//查询采购计划表
	modifyPlan:'/api/order/plan/modify.do',//修改采购计划表
	submittoAudit:'/api/order/plan/submitToAudit.do',//提交采购计审核
	auditList:'/api/order/plan/queryListForAudit.do',//查询采购计划审核
	audit:'/api/order/plan/audit.do',//审核采购计划


	//订单管理
	scaleQueryList:'/api/order/sale/plan/queryList.do',//查询销售订单列表
	scaleSubmit:'/api/order/sale/plan/submitToAudit.do',//提交销售订单审核
	scaleQueryAudit:'/api/order/sale/plan/queryListForAudit.do',//查询采购计划审核
	scaleAudit:'/api/order/sale/plan/audit.do',//审核销售订单
	orderQueryList:'/api/order/main//queryByRequest.do',//订单列表

	//支付管理
	queryPayOrderListByRequest:'/api/order/finance/queryPayOrderListByRequest.do', //支付查询
	pay:'/api/order/finance/pay.do', //订单付款
	queryConfirmListByRequest:'/api/order/finance/queryConfirmListByRequest.do', //支付确认列表查询
	confirm:'/api/order/finance/confirm.do', //订单付款确认
	queryWaitDeliveryOrders:'/api/order/delivery/queryWaitDeliveryOrders.do',//发货单查询
	addDeliveryBill:'/api/order/delivery/addDeliveryBill.do',//发货单保存
	queryLogistics:'/api/base/expresscorp/queryAll.do',//物流信息


		
	//组织
	queryIndustry:'/api/base/industry/queryTree.do ',//所属行业
//	setNewPassword:'/api/sys/user/sysModifyPassword.do ',//修改密码
	setNewPassword:'api/upms/user/setNewPassword.do',
	queryContact:'/api/sys/user/queryByRequest.do ',//对外联系人
	queryRole:'/api/sys/role/queryByRequest.do ',//角色列表

	//////////////////////////////////--lizhijun--END/////////////////////////////////////////////////////////
 
 //客户管理
  main : '/api/customer/main/', //客户管理 api 根路径
  queryByRequest : 'queryByRequest.do', //客户管理 api 根路径
 // --上面已有-- queryById:'/queryById.do', //客户管理，通过id查询
  customer:'/api/customer/', //客户管理查询根目录
  industry:'industry/', //客户管理查询行业
  level:'level/', //客户管理查询 级别
  // region:'region/', //客户管理查询 区域 同上
  // category:'category/', //客户管理查询 分类 同上
  adjustment:'price/adjustment/', //查询调价单信息

  user:'/api/sys/user/', //客户管理中查询业务员

  productMain:'/api/product/main/' ,//查询产品

	////////////////////////////////////////////////////////////////////////////////////////////
	// 客户行业
	indeustry : '/api/customer/industry/' ,  	//客户行业 api 根路径
	indeustryqueryAll : 'queryAll.do',			// 查询客户行业列表
	indeustryGetById : '/query.do',				//根据ID查询某一个节点详情 -- 之前添加查询ID 如 /12/query.do
	indeustryAdd : 'add.do',					//添加客户行业分类
	indeustryModify : 'modify.do',				// 修改客户行业分类
	indeustryDel : '/delete.do',				//删除指定节点 -- 之前添加删除ID  如 /12/delete.do
	
	//产品
	product : '/api/product/main/',				//产品
	productByRequset : 'queryByRequest.do',		//post 111
	productByRequsetskus : 'querySkusByRequest.do',  //产品根据skus编码查询
	productModeify : 'modify.do',
	productQueryById : '/queryById.do',			//根据ID查询某一个客户级别详情 -- 之前添加查询ID 如 /12/query.do
	productDelete : '/deleteById.do',			// 删除指定节点 -- 之前添加删除ID  如 /12/deleteById.do1

	// 产品属性
	productAttr : '/api/product/attribute/',		//产品属性 api 根路径
	productGetAll : '/queryByRequest.do',			//查询全部或者根据关键字查询	name ; pageStart ; pageNums;
	productGetById : '/queryByIds.do',				//根据多	个id查询产品属性   如 /1,2,3/queryByIds.do
	productAttrValue : '/deleteValue.do',			// 删除属性值			

	//计量单位
	baseUnit : '/api/base/unit/',			// 单位 api 根路径

	//产品品牌
	baseBrand : 'api/base/brand/',			//产品品牌

	// 客户 供应商名单
	//baseCorp : '/api/base/corp/',			// 客户供应商名单
	baseCorpBykeyWords : 'queryByKeyword.do',			// 根据关键词查找客户
	
	//供应商产品
	searchClassification:'queryTreeBySupplier.do',  //供应商分类搜索
	
	
	
	
//---------------------2018.4.17------------------------------
	dictionary:'/api/base/dictionary/industries/queryByKey.do', //查询一级行业列表4.17
	
	textResetPwd:'/unintercept/api/comm/upms/testResetPwd.do', //忘记密码手机号和验证码验证


	


	
	
	
	
	
	
	
	
	
	
	//--------------以下17年前完成----------------
	
	getUupmsName:'/api/upms/corp/queryMe.do',//查询当前用户企业信息 
    getUserName:'/api/upms/user/queryMe.do',//查询当前登录用户信息
	companyQuery:'/api/upms/corp/queryByRequest.do',//企业列表
	
//	组织与员工
	sysDepartment:'/api/upms/department/',
	sysDepartmentFetchAsTree:'/queryTree.do',//查询部门级别
	sysDepartmentQueryById : '/query.do',	//根据ID查询某一个节点详情 -- 之前添加查询ID 如 /12/query.do
	sysDepartmentAddRoot : '/addRoot.do',	//添加一级区域
	sysDepartmentAdd : '/add.do',			//添加区域设置子分类
	sysDepartmentModify : '/modify.do',		//修改区域设置
	sysDepartmentMoveUp : '/moveUp.do',		//将特定节点上移-- 之前添加上移ID  如 /12/moveUp.do
	sysDepartmentMoveDown : '/moveDown.do',	//将特定节点下移-- 之前添加上移ID  如 /12/moveDown.do
	sysDepartmentDel : '/delete.do',	//删除指定节点 -- 之前添加删
//	-------------------组织与员工以上-----------------

	uploadlogo:'/api/upms/corp/modify.do',//修改公司logo
	loginTel:'/unintercept/api/sys/login/verifyByMobile.do',  //手机号登录
	uploaduserimg:'/api/upms/user/addOrModifySave.do',//修改用户头像
	//注册用户
	register:'/unintercept/api/register/new.do',
	//注册获取验证码
	enrollVerification:'/unintercept/api/comm/sms/',
	enrollVerificationRepair:'/register_code.do',
	//忘记密码获取验证码
	enrollVerification_forget:'/unintercept/api/comm/sms/',
	enrollVerificationRepair_forget:'/modify_pwd.do',
	
	
	//员工设置
	state_user:'/api/upms/user/',
	state_user_q:'/valid.do',//启用
	state_user_h:'/invalid.do',//禁用
	belByid:'/delById.do',//删除

	//资质认证
	apply:'/api/upms/corp/authentication/submit.do', 
	apply_save:'/api/upms/corp/authentication/save.do', //临时保存
	save_queryAuthentication:'/api/upms/corp/',//公司认证信息查询
	queryAuthentication:'/queryAuthentication.do',//公司认证信息查询
	

	
	//用户资质认证信息
	saveApplyInfo: '/api/base/corp/authentication/save.do',
	//开发票信息
	queryInvoice_e:'/api/upms/corp/invoice/save.do',//提交开发票信息表单
	queryInvoice_k:	'/api/upms/corp/',//渲染开发票信息根路径
	queryInvoice_h:'/queryInvoice.do',//渲染开发票信息
	//审核
	auditing: '/api/upms/corp/authentication/audit.do',
//	auditing: '/api/base/corp/authentication/audit.do',
	//冻结企业
	freezeenterpriseheader:'/api/upms/corp/',
	freezeenterprisetail:'/status/disabled.do',
	//、	删除企业
	odelete:'/api/upms/corp/',
	odelete_h:'/delete.do ',
	//6、查询审核结果
	queryauditheader:'/api/sys/audit/',
	queryaudittail:'/query.do',
	//	重置密码
	ResetPassword:'/unintercept/api/comm/upms/resetPwd.do',
	//--------------------------以下17年前完成 end------------------------------------


	//--------------------公告列表 增加--------------------
	addNew: '/api/base/news/add.do',

	//---------------------公告列表 查询---------------------
	NewList: '/api/base/news',
    NewListByRequest: '/queryList.do'

}
