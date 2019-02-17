<template>
	<div class="index">
		<appHeader></appHeader>
		<div class="warpper">
			<div class="leftMenu">
				<LeftMenu></LeftMenu>
			</div>
			<div class="content" id="content">
				<div class="" style="padding: 0;background-color: rgba(0,0,0,0);">
					<router-view :time='"2017-04-08"'></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import appHeader from '@/page/set/header'
	import LeftMenu from '@/page/set/leftMenu'
	import IconA from '@/page/set/icon'
	export default {
		name: 'index',
		components: {
			appHeader,
			LeftMenu,
			IconA
			// Welcome
		},
		data() {
			return {

			}
		},
		methods: {
			ajax() {
				this.$store.dispatch('login')
				console.log("name: " + this.$store.state.user.user.name);
			}
		}
	}
</script>

<style>
	.index {
		height: 100%;
		background: #f0f3fa;
		min-width: 1240px;
	}
	
	.warpper {
		display: flex;
		height: calc(100% - 60px);
		width: calc(100vw + 20px);
	}
	
	.leftMenu {
		height: 100%;
		position: relative;
	}
	/*最外层*/
	
	.content {
		flex-grow: 1;
		overflow: hidden;
		position: absolute;
		z-index: 99;
		right: 4px;
		top: 58px;
		bottom: 0;
		left: 154px;
	}
	
	.ivu-menu-submenu-title {
		padding: 14px!important;
	}

	
	/* -----------------------页面主体--------------------- */
	
    /* 底部有按钮或者分页按钮 */
	.right_home_warp {
		padding: 20px 20px 0 20px;
		background-color: #fff;
		position: absolute;
		z-index: 333;
		top: 30px!important;
		left: 2px;
		right: 2px;
		bottom: 2px;
		box-shadow: 0 1px 1px rgba(0,0,0,0.15);
		overflow: auto;
		min-width: 1100px;
        margin-bottom: 54px;
	}

    /* 底部没按钮或分页按钮，即margin-bottom为0 */
    .right_home_warp-nobot {
        padding: 20px 20px 0 20px;
		background-color: #fff;
		position: absolute;
		z-index: 333;
		top: 30px!important;
		left: 2px;
		right: 2px;
		bottom: 2px;
		box-shadow: 0 1px 1px rgba(0,0,0,0.15);
		overflow: auto;
		min-width: 1100px;
    }
    /* --------------------------------------------------------- */


    /* -------------------------页面主体底部------------------------- */

    /* 页面底部 按钮外层div */
    .btn-bot {
        height: 56px;
        background-color: #fff;
        position: absolute;
        box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
        bottom: 2px;
        right: 2px;
        left: 2px;
        z-index: 999;
        display: flex;
        justify-content: center;
    }
    .btn-bot button {
        width: 88px;
		height: 34px;
		border: 1px solid #d9d9d9;
		border-radius: 2px;
        margin: 11px 20px;
    }

    /* 页面底部 分页外层div */
    .page-bot {
        height: 56px;
        background-color: #fff;
        position: absolute;
        box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
        bottom: 2px;
        right: 2px;
        left: 2px;
        z-index: 666;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* --------------------------------------------------- */



    /* -----------------------标准--表格---------------------- */
    .zg-table {
        width: 100%;
        table-layout: fixed;
        font-size: 14px;
        border-collapse: collapse;
    }
    .zg-table th, .zg-table td {
        border-bottom: 1px solid #e9eaec;
        padding: 0 10px;
        overflow: hidden;
    }

    .zg-table thead tr:hover {
        background-color: #ebf7ff;
    }
    .zg-table th {
        color: #787878;
        height: 40px;
        background-color: #eef1f9;
        text-align: left;
    }
    .zg-table td {
        color: #000;
        height: 50px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    /* 没有数据时的样式 */
    .zg-none {
        text-align: center;
    }

    /* 表单内容单元格 居中 */
    .zg-tab-center {
        text-align: center !important;
    }
    .zg-tab-center span {
        margin: 0 6px;
    }

    /* 表格链接样式 */
    .zg-tab-link {
        color: #00c1de;
        cursor: pointer;
    }

    /* 表格操作 可以操作的样式 */
    .zg-tab-oper {
        color: #1ab3df;
        cursor: pointer;
    }
    .zg-tab-oper:hover {
        color: #d53855;
    }

    /* 表格操作 不能操作的颜色 */
    .zg-tab-inoper {
        color: #ccc;
        cursor: default;
    }
    /* ----------------------------------------- */


    /* -----------------提交组件----------------- */
    .zg-upload-only {
        display: inline-block;
        width:58px;
        height: 58px;
    }
    .zg-upload-icon {
        width: 58px;
        height:58px;
        line-height: 58px;
    }
    .zg-upload-icon i {
        padding: 18px 20px;
        border: 1px dashed #ccc;
        cursor: pointer;
    }
    .zg-upload-img {
        display: inline-block;
        vertical-align: bottom;
        cursor: pointer;
        position: absolute;
        width: 58px;
        height: 58px;
        overflow: hidden;
    }
    .zg-upload-img:hover .zg-upload-oper {
        background: rgba(204, 204, 204, .3);
        display: flex;
    }
    .zg-upload-img img {
        width: 100%;
        height: 100%;
    }
    .zg-upload-oper {
        position: absolute;
        top: 0;
        width: 58px;
		height: 58px;
		display: none;
		flex-direction: column;
		text-align: center;
        justify-content: space-around;
    }
    .zg-upload-oper:hover {
        cursor: default;
    }
    .zg-upload-oper:hover i {
        cursor: pointer;
    }

	/* ----------------------------------------- */




    /* -----------------------操作块----------------------- */    

    /* --页面上方的搜索功能的样式-- */
    .search-box {
        display: flex;
		align-items: center;
        justify-content: flex-start;
        margin-bottom: 20px;
    }
    .search-box button {
        vertical-align: top;
    }
    /* 搜索框 */
	.search-input {
		width: 400px;
		height: 32px;
		padding: 0 7px;
		box-sizing: border-box;
		outline: none;
		user-select: none;
		position: relative;
		background-color: #fff;
		border: 1px solid #e1e7f6;
		transition: all 0.2s ease-in-out;
		color: #333333;
		font-size: 14px;
	}
	
	.search-input:hover {
		border-color: #269edc;
	}

    /* 搜索按钮 button元素里面还有个icon <Icon type="search"></Icon> */
    .search-btn {
		width: 34px;
		height: 32px;
		border: none;
        outline: none;
        background-color:#bbd3eb;
		transition: background-color .2s linear;
	}
    .search-btn i {
        color: #fff;
        font-size: 24px;
    }
	.search-btn:hover{		
		background-color: #1ab3df;
	}
















	.link_span {
		font-weight: normal;
		color: #8499a4;
	}
	
	.ok_link {
		color: #415161;
	}

    /* 简单的布局 flex 避免使用 float */
    .flex-box {
        display: flex;
    }


    


    /* --------按钮----------- */
    .btn-search, .btn-new, .btn-add, .btn-return, .btn-del, .btn-cancel, .btn-download, .btn-save {
        width: 88px;
        height: 32px;
        border-radius: 2px !important;
        outline: none;
        border: 1px solid transparent;
        font-size: 12px !important;
        transition: color 0.2s linear, background-color 0.2s linear, border 0.2s linear;
    }

    /* 保存、提交、确定、重新认证 */
    .btn-save {
        color: #fff;
        background-color: #01bad6;
    }
    .btn-save:hover {
        background-color: #00d8f8;
    }

    /* 返回、返回列表、下一步 */
    .btn-return {
        color: #fff;
        background-color: #ff9900;
    }
    .btn-return:hover {
        background-color: #ffad33;
    }

    /* 新增 */
    .btn-new {
        background-color: #13c19f !important;
        color: #fff !important;
    }
    .btn-new:hover {
        background-color: #00d8ae !important;
    }

    /* 导入、导出、取消 */
    .btn-cancel {
        background-color: #fff !important;
        border: 1px solid #d9d9d9 !important;
        color: #415161 !important;
    }
    .btn-cancel:hover {
        border: 1px solid #00d8ae !important;
        color: #00d8ae !important;
    }

    /* 模板下载 */
    .btn-download {
        background-color: #69cf36 !important;
        color: #fff !important;
        width: 92px;
    }
    .btn-download:hover {
        background-color: #7ce04b !important;
    }

    /* 搜索 */
    .btn-search {
        background: #0099cc;
        color: #fff;
    }
    .btn-search:hover {
        background: #1ab3df;
    }

    /* 删除、重置、不通过 */
    .btn-del {
        background-color: #ed3f14;
        color: #fff;
    }
    .btn-del:hover {
        background-color: #f16543;
    }




    



    .search-btn img {
        width: 34px;
        height: 32px;
        background-image: url('../assets/img/searchorg.jpg');
    }
    /* .search-btn {
		width: 34px;
		height: 32px;
		border: none;
		background: url(../assets/img/search.jpg) no-repeat;
		background-size: 100% 100%;
	}
	.search-btn:hover{		
		background: url(../assets/img/search_click.jpg) no-repeat;
		background-size: 100% 100%;
	} */

    /* ------------------------------------------ */



    /* ---------页面上方的按钮------------- */
    .btn-box-right {
        display: flex;
		align-items: center;
        justify-content: flex-end;
        margin-bottom: 20px;
    }
    .btn-box-right button {
        margin-left: 10px;
    }

    .btn-box-left {
        display: flex;
		align-items: center;
        justify-content: flex-start;
        margin-bottom: 20px;
    }
    .btn-box-left button {
        margin-right: 10px;
    }







	/* 信息展示页面样式 */
	.infoshow {
		width: 1000px;
		margin:0 auto;
	}
	.infoshow img {
		width: 96px;
		height: 96px;
		vertical-align: top;
	}
	.infoshow h2 {
		color: #000;
	}
	
	.infoshow p {
		height: 25px;
		line-height: 25px;
		margin: 2px 0;
		font-size: 14px;
		font-weight: bold;
		color: #000;
	}
	.infoshow-base p {
		margin-left: 20px;
	}
	.infoshow span {
		margin-left: 10px;
		font-weight: normal;
	}
	.infoshow-header {
		border: 4px solid #668B8B;
		padding: 20px 40px;
        box-shadow: 0px 2px 6px rgba(140, 205, 218, 0.78);
	}
	.infoshow h3 {
		margin: 10px 0;
		border-left: 8px solid #00c1de;
		padding-left: 6px;
	}
    .infoshow-body {
        border: 4px solid #668B8B;
        margin: 20px 0;
        box-shadow: 0px 2px 16px rgba(140, 205, 218, 0.78);
    }

	.infoshow-box {
		padding: 16px 24px 30px;
        border-top: none;
        border-top: 2px solid #ccc;
	}
    .infoshow-box:first-child {
        border-top: none;
    }

	.infoshow-box th span {
		font-weight: bold;
	}

	.infoshow-box .ivu-table {
		min-height: auto;
	}







    /* 业务联系人弹出框 */
    .modal-salesman .ivu-modal {
        top: 60px;
    }
    .modal-salesman .ivu-table-wrapper {
        margin-top: 30px;
    }

    .modal-salesman .ivu-modal-content {
        width: 100%;
    }
    .modal-salesman .ivu-table {
        min-height: 350px;
        top: 0;
    }
    .modal-salesman .ivu-table-body {
        height: 300px;
    }




    /* 附件图片-弹出窗样式 */
    .image-modal-wrap {
        width: 100%;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center; 
    }
    .image-modal-wrap img{
        width: 100%;
    }
    /* 附件图片-显示样式 */
    .upload-onefile, .upload-oneimg {
        display: inline-block;
        vertical-align: top;
        /* margin-left: 10px; */
        cursor: pointer;
        position: relative;
        height: 52px;
        overflow: hidden;
    }





    /* 信息展示 一行一条信息 */
    .col-title, .col-info, .col-img-title {
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        margin-bottom: 7px;
        color: #415161;
        border-bottom: 1px dashed #999;
        
    }
    .col-img-title {
        /* margin: 20px 1px 0 0; */
    }

    .col-title {
        margin-right: 1px;
    }
    .col-info {
        padding-left: 10px;
        margin-right: 1px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding-right: 20px;
    }
    .col-info p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding-right: 20px;
    }


    /* 原生表格 样式 */
    .zg-table {
        width: 100%;
        
        table-layout:fixed;
        
    }

    .zg-th, .zg-tb {
        border-bottom: 1px solid #e9eaec
    }

    .zg-table th, .zg-table td {
        padding: 0 10px;
        overflow: hidden;
    }

    .zg-th {
        background-color: #eef1f9;
    }

    .zg-th th {
        height: 50px;
        line-height: 50px;
        text-align: left;
    }

    .zg-tb {
        transition: background-color 0.2s ease-in-out;
        /* border: 1px solid # */
    }
    .zg-tb:hover {
        background-color: #ebf7ff;
    }
    .zg-tb td {
        padding: 0 10px;
        height: 60px;
    }






    /* 表格操作 颜色 */
    .tab-oper {
        color: #1ab3df;
        cursor: pointer;
        margin-right: 10px;
    }
    .tab-oper:hover {
        border-bottom: 1px solid #1ab3df;
    }
    /* 表格操作 不能操作的颜色 */
    .tab-inoper {
        color: #ccc;
        margin-right: 10px;
    }

    /* 表格链接 颜色 */
    .tab-link {
        color: #00c1de;
        cursor: pointer;
    }

    




	/* ivew表格 样式 */
	
	.ivu-table table {
		width: 100% !important;
	}
	
	.ivu-table-wrapper {
		/*max-width: 1650px !important;*/
		border: 0 !important;
        margin-top: 20px;
	}
	
	.ivu-table {
		position: relative;
		top: 0;
		left: 0px;
		right: 0px;
		bottom: 200px;
		min-height: 395px !important;
		max-height: 750px !important;
        font-size: 14px!important;
	}
	
	.ivu-table:before {
		z-index: -1 !important;
	}
	
	.ivu-table:after {
		z-index: -1 !important;
	}

    .ivu-table th {
      height: 50px !important;
      font-weight: 600 !important;
      font-size: 14px !important;
      background: #eef1f9 !important;
      padding: 0 10px !important;
	}

    .ivu-table td {
        height: 60px !important;
        padding: 0 10px !important;
    }

    .ivu-table .ivu-table-border {
		height: 800px;
	}

    .ivu-table-cell {
		padding: 0!important;
	}
	
	.ivu-table-cell span {
		font-size: 14px !important;
	}

    .ivu-table-tip td {
        height: 50px;
    }

    
	


    /*表单*/

	.ivu-select-dropdown {
		border-radius: 0!important;
		/*选择框为矩形*/
	}
	
	.compInfoForm .formItem {
		margin-bottom: 25px;
		/*表单内容行距*/
	}
	
	.formModifypsw ul li {
		margin-bottom: 25px!important;
		/*表单内容行距*/
	}
	
	.selectdiv {
		margin-bottom: 25px!important;
		/*表单内容行距*/
	}
	button:hover{
		cursor: pointer;
	}
	.form_ul li {
		margin-bottom: 25px!important;
		/*表单内容行距*/
	}
	
	
	
	.ivu-input {
		border: 1px solid #ccd9e6!important;
		/*表单输入框*/
	}
	
	.ivu-input:hover {
		/*表单输入框-鼠标移上去*/
		border: 1px solid #00cbea!important;
	}
	
	.ivu-input:active {
		/*表单输入框-鼠标点击*/
		border: 1px solid #00cbea!important;
	}
	
	.sel_sta {
		border: 1px solid #ccd9e6!important;
		/*表单选择框*/
	}
	
	.sel_sta:hover {
		/*表单选择框-鼠标移上去*/
		border: 1px solid #00cbea!important;
	}
	
	.sel_sta:active {
		/*表单选择框-鼠标点击*/
		border: 1px solid #00cbea!important;
	}
	
	.ivu-form-item {
		margin-bottom: 25px!important;
	}
	
	.ivu-cascader-menu-item:hover {
		/*选择框内容选中*/
		color: #0099cc!important;
	}
	
	.ivu-select-dropdown-list .ivu-select-item:hover {
		color: #0099cc!important;
	}

    .ivu-select-dropdown-list li {
        margin: 0 !important;
    }
	
	.Must {
		/**样式*/
		color: red;
		margin-right: 7px;
	}
	



	/* 删除弹出窗 */
	
	.ivu-modal-header {
		/*background: #eef1f9;*/
		border-bottom: 0 !important;
		padding: 0 0!important;
	}
	
	.ivu-modal-footer {
		/*padding: 0 0!important;*/
		/*padding:0!important;*/
		background: #fff!important;
		border-top:none !important;
	}
	.ivu-modal-footer .ivu-btn:first-child{
		background-color: white !important;
		color: #01bad6 !important;
        border: 1px solid #00cbea !important;
	}
	.ivu-modal-footer .ivu-btn:first-child:hover{
		background-color:#01bad6!important;
		color: white!important;
	}
	.ivu-modal-footer .ivu-btn:nth-child(2){
		background-color:#01bad6!important;
		color: white!important;
		
	}
	.ivu-modal-footer .ivu-btn:nth-child(2):hover{
		background-color: white!important;
		color: #01bad6!important;
	}
	.delbut {
		text-align: center;
		/*height: 56px;
		line-height: 56px;*/
		background: #eef1f9;
		padding: 20px 0;
	}
	.delbut button{
		margin-left: 0;
	}
	.delbut Button:nth-child(1) {
		width: 90px;
		background: #00cbea;
		color: #fff;
		/* border: none; */
	}
	
	.delbut Button:nth-child(2) {
		width: 90px;
		border: 1px solid #ddd;
		color: #333;
		margin-left: 20px;
		background-color: #eef1f9;
		box-sizing: border-box;
	}
	.delbut Button:nth-child(1):hover{
		background-color: #00d8f8;
	}
	.delbut Button:nth-child(2):hover{
		color: #00c1de;
		border-color: #00c1de;
		background-color: #eef1f9!important;
	}
	.delbut Button:hover:nth-child(1) {
		border: 1px solid #00d8f8;
		color: #fff;
	}
	.del_iti,.div_tit{
		color: #415161;
		/*height: 56px;
		line-height: 56px;*/
		padding: 26px 0 6px 20px;
		
	}
	.del_p {
		height: 76px!important;
		line-height: 76px!important;
		background: #eef1f9;
		padding-left: 20px;
	}
	
	.del_p span ,.del_iti span,.div_tit span{
		font-size: 14px;
		border-left: 1px solid #ddd;
		padding-left: 5px;
		font-weight: 700 !important;
	}
	
	.del_div {
		text-align: center;
		color: #415161;
		font-size: 16px;
	}
	
	.del_div p {
		padding: 75px 0;
	}


	.ivu-modal-body {
		background: #fff;
		min-height: 120px;
		padding: 10px 30px 0 10px !important;
	}
	


    
	/* 面包屑 */

    .ivu-breadcrumb {
		padding: 6px 0 6px 6px;
		font-size: 14px !important;
	}
	.ivu-breadcrumb>span:last-child{
		font-weight: 500 !important;
		color: #415161!important;
	}
	.ivu-breadcrumb>span:last-child .ivu-breadcrumb-item-separator{
		display: none !important; 
	}

	.ok_link span:last-child{
		display: none;
	}



	/*滚动条整体样式*/
	
	.test-1::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	
	.test-1::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		/* -webkit-box-shadow: inset 0 0 5px #b0c0d0;*/
		background: #b0c0d0;
	}
	
	.test-1::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		/*-webkit-box-shadow: inset 0 0 5px #b0c0d0;*/
		border-radius: 10px;
		background: #fff;
	}
	/*ie*/
	
	.test-1::-ms-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	
	.test-1::-ms-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}
	
	.test-1::-ms-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: #EDEDED;
	}
	/*火狐*/
	
	.test-1::-moz-scrollbar {
		/*滚动条整体样式*/
		width: 10px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 1px;
	}
	.test-1::-moz-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #535353;
	}
	
	.test-1::-moz-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background: #EDEDED;
	}
		/*滚动条整体样式*/
	
	
	
	
	
	
	
	.ivu-modal-mask {
		background: rgba(0, 0, 0, 0)!important;
	}
	
	.ivu-modal-content {
		border: 1px solid #00c1de !important;
		border-radius: 2px !important;
		box-shadow: 0px 0px 30px rgba(0, 198, 226, 0.5);
		/*box-shadow: 0 1px 1px rgba(0,0,0,0.15);*/
        /* width: 666px; */
	}

	.modelFooter{
		/* padding:  0 0 25px 132px */
        
        width: 200px;
        margin: 0 auto 10px;
	}
	.modelFooter button{
		font-size: 14px !important;
	}
	.ivu-modal-close{
		display: none;
	}
	.ivu-modal {
		top: 150px;
	}
	
	
	/*分页控件*/
	
	.ivu-page-item-active {
		border: none!important;
		background-color: #7b8aa1!important;
	}
	
	.ivu-page-options-elevator input {
		background-color: #f2f5fb!important;
		text-align: center;
	}
	
	.ivu-page-prev,
	.ivu-page-next {
		background-color: #f2f5fb!important;
	}
	
	.ivu-page-prev a i {
		color: #7782ab!important;
	}
	
	.ivu-page-next a i {
		color: #7782ab!important;
	}
	/*全部打勾*/
	.ivu-checkbox-checked .ivu-checkbox-inner{
		
	}
	.ivu-checkbox-checked .ivu-checkbox-inner{
		    border-color: #00c1de  !important;
    	background-color: #00c1de !important;
	}
	


    /* 其它 */
    .area .td_but {
		width: 40%;
		justify-content: flex-start !important;
	}

    .td_but {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 40%;
		height: 60px;
	}

    .area .child-table .table-tr {
		height: 55px;
		line-height: 55px;
	}

    .area .table-tbody .table-td {
		height: 55px;
		line-height: 55px;
		width: 40%!important;
	}

    .area .ivu-input {
		height: 34px !important;
		font-size: 13px !important;
	}



    .consignee-table th, .consignee-table td {
        text-align: left;
        border: 1px solid #ccc;
        padding-left: 10px;
    }

    .consignee-table tr:hover {
        background: #ebf7ff;
    }

    .consignee-table input {
        vertical-align: middle;
    }




    .localimport .ivu-tabs-ink-bar {
		background-color: #00C1DE !important;
	}

	.localimport .ivu-tabs-nav .ivu-tabs-tab-active {
		color: #00C1DE !important;
	}
	
	.localimport .uploadbtn2 span:first-child {
		display: flex;
		align-items: center;
	}
	
	.localimport .uploadbtn2 span:first-child .uploadbtn2_title {
		margin-left: 15px;
	}
	
	.localimport .uploadbtn2 span:first-child .uploadbtn2_title2 {
		color: #8e9faf;
	}



    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .vertical-center-modal .ivu-modal {
        top: 0;
    }



    /* 分类弹出框 元素样式 */
	.prevClassName {
		display: flex;
		align-items: center;
        margin-bottom: 15px;
	}
	
	.prevClassName .title {
		width: 80px;
		text-align: right;
		vertical-align: middle;
		float: left;
		font-size: 12px;
		color: #657180;
		line-height: 1;
		padding: 10px 12px 10px 0;
		box-sizing: content-box;
	}
    	
	.prevName {
		display: inline-block;
		width: 100%;
	}


    
    .file {
		margin-bottom: 15px;
	}

    /* 设置默认值 */
    .morenspan {
		font-size: 14px;
		color: #404040;
    }


    /*  */
    .isOpenicon {
		position: absolute;
		padding: 0 5px;
		font-size: 16px;
		left: -20px;
	}

    /* 采购计划和审核里的列表 产品名 */
    .proword {
		padding-left: 20px;
		overflow: auto;
	}

    /* 提交等按钮 居中 */
    .handleBtn {
        width: 560px;
        margin: 0 auto;
    }
    .handleBtn button {
        margin-right: 20px;
    }


    /* --------附件的图片样式------- */
    .addMainImg {
		width: 80px;
		height: 80px;
		line-height: 80px;
		border: 1px dashed #d7dde4;
		display: inline-block;
		cursor: pointer;
		background: #fff;
		text-align: center;
		border-radius: 3px;
		transition: border 0.2s ease;
	}
	
	.addMainImg:hover {
		border: 1px dashed #09f;
	}
	
	.addMainImg img {
		width: 100%;
		height: 100%;
	}
    /* -------------------- */


    /* ------------列表图标-------------- */
    .bianji {
		border: none !important;
		width: 32px;
		height: 32px;
		background: url(../assets/img/quyu.jpg) no-repeat !important;
		background-size: 100%;
	}
	
	.bianji:hover {
		width: 32px;
		height: 32px;
		border: none;
		background: url(../assets/img/quyu_h.jpg) no-repeat !important;
		background-size: 100%;
	}

    .dele {
		border: none !important;
	    width: 32px;
		height: 32px;
		background: url(../assets/img/dele.jpg) no-repeat !important;
		background-size: 100%;
		margin-right: 10px!important;
	}
	
	.dele:hover {
		width: 32px;
		height: 32px;
		background: url(../assets/img/deleclick.jpg) no-repeat !important;
		background-size: 100%;
	}

    .shangyi {
		border: none !important;
		width: 32px;
		height: 32px;
		background: url(../assets/img/shangyi.jpg) no-repeat !important;
		background-size: 100%;
		/*margin-right: 10px!important;*/
	}
	
	.shangyi:hover {
		width: 32px;
		height: 32px;
		background: url(../assets/img/shangyiclick.jpg) no-repeat !important;
		background-size: 100%;
	}

    .xaiyi {
		border: none !important;
		width: 32px;
		height: 32px;
		background: url(../assets/img/xiayi.jpg) no-repeat !important;
		background-size: 100%;
	}
	
	.xaiyi:hover {
		border: none;
		width: 32px;
		height: 32px;
		background: url(../assets/img/xiayiclick.jpg) no-repeat !important;
		background-size: 100%;
	}

    .addfenlei {
		width: 98px;
		height: 33px;
		font-size: 12px;
		margin-right: 10px!important;
	}
	
	.addfenlei:hover {
		color: #0099cc!important;
		border-color: #0099cc!important;
	}
    /* ---------------------------------- */



    /* ------------------标准-表单样式---------------- */
    .zg-form {
        width: 800px;
        margin: 0 auto;
    }
    /* 左边的label样式 */
    .zg-form .ivu-form-item-label {
        color: #787878;
    }
    /* 右边的表单样式 */
    .zg-form .ivu-form-item-content {
        width: 450px;
        color: #000;
    }
    .zg-form .ivu-input {
        color: #000;
    }
    .zg-form .zg-input-small {
        width: 33%;
    }
    .zg-form .ivu-radio-wrapper {
        margin-right: 28px;
    }
    .zg-form button {
        margin-right: 16px;
    }
    /* ------------------------------------------------ */
    
</style>