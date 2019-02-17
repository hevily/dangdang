<template>
	<div class="importCustomer">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>客户管理</Breadcrumb-item>
			<Breadcrumb-item>添加客户</Breadcrumb-item>
			<Breadcrumb-item>导入客户</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<div class="importCustomer_title">
				<img src="../../../../assets/img/downloadcus.jpg" />
				<span>导入模板</span>
			</div>
			<div class="importCustomer_top">
				<div class="importCustomer_import">
					<div class="importCustomer_import_wn">
						<input id="upload" type="file" @change="importfxx(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
						<!--<span>{{importTip}}</span>-->
					</div>
					<button></button>
				</div>
				<p>{{importResult}}</p>
			</div>
			<p class="importCustomer_title2">预览数据</p>
			<Table :columns="tableModle" :data="customerList"></Table>
		</div>
        <div class="page-bot">
            <Page :total="total" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
        </div>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default {
		name: 'importCustomer',
		data() {
			return {
				importTip: '请选择导入文件',
				importResult: '',
				DOM: {},
				name: '',
				tableModle: [{
						title: '序号',
						type: 'index',
						width: 70,
						align: 'center'
					},
					{
						title: '客户名称',
						width: 260,
						align: 'center',
						key: 'customerCorpName'
					},
					{
						title: '客户编码',
						width: 260,
						align: 'center',
						key: 'customerCorpName'
					},
					{
						title: '业务员',
						width: 260,
						align: 'center',
						key: 'Salesman'
					},
					{
						title: '业务员电话',
						width: 260,
						align: 'center',
						key: 'SalesmanPhone'
					},
					{
						title: '申请人',
						width: 130,
						align: 'center',
						key: 'applyUserName'
					},
					{
						title: '申请日期',
						width: 260,
						align: 'center',
						key: 'applyTime'
					},
					{
						title: '申请理由',
						width: 130,
						align: 'center',
						key: 'reason'
					},
				],
				customerList: [],
				name: '',
				total: '',
			}
		},
		methods: {
			importfxx(obj) {
				let _this = this;
				let inputDOM = this.$refs.inputer;
				// 通过DOM取文件数据  
				this.file = event.currentTarget.files[0];

				var rABS = false; //是否将文件读取为二进制字符串  
				var f = this.file;

				var reader = new FileReader();
				//if (!FileReader.prototype.readAsBinaryString) {  
				FileReader.prototype.readAsBinaryString = function(f) {
					var binary = "";
					var rABS = false; //是否将文件读取为二进制字符串  
					var pt = this;
					var wb; //读取完成的数据  
					var outdata;
					var reader = new FileReader();
					reader.onload = function(e) {
						var bytes = new Uint8Array(reader.result);
						var length = bytes.byteLength;
						for(var i = 0; i < length; i++) {
							binary += String.fromCharCode(bytes[i]);
						}
						var XLSX = require('xlsx');
						if(rABS) {
							wb = XLSX.read(btoa(fixdata(binary)), { //手动转化  
								type: 'base64'
							});
						} else {
							wb = XLSX.read(binary, {
								type: 'binary'
							});
						}
						outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西  
					}
					reader.readAsArrayBuffer(f);
				}
				if(rABS) {
					reader.readAsArrayBuffer(f);
				} else {
					reader.readAsBinaryString(f);
				}
			}
		}
	}
</script>
<style type="text/css">
	.importCustomer .ivu-page-item-active {
		background-color: #7b8aa1!important;
	}
	
	.importCustomer .ivu-page-options-elevator input {
		background-color: #f2f5fb!important;
		text-align: center;
	}
	
	.importCustomer .ivu-page-prev,
	.ivu-page-next {
		background-color: #f2f5fb!important;
	}
	
	.importCustomer .ivu-page-prev a i {
		color: #7782ab!important;
	}
	
	.importCustomer .ivu-page-next a i {
		color: #7782ab!important;
	}
	
	.importCustomer .ivu-table {
		overflow: scroll;
	}
	
	.importCustomer table th div span {
		border-left: 1px solid #ddd;
		padding-left: 5px;
	}
	
</style>
<style scoped>
	.customer {
		position: absolute;
		top: 5px;
		left: 10px;
		right: 20px;
		bottom: 0;
	}
	
	.right_home_warp {
		padding: 20px;
		top: 45px!important;
		left: 10px;
		right: 30px;
	}
	
	.importCustomer_title {
		margin-bottom: 20px;
	}
	
	.importCustomer_title img {
		width: 18px;
		height: 18px;
		margin-right: 10px;
	}
	
	.importCustomer_title span {
		font-size: 12px;
	}
	
	.importCustomer_top {
		border: 1px dashed #d7e1eb;
		width: 100%;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 25px;
	}
	
	.importCustomer_top .importCustomer_import {
		width: 50%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid #d7e1eb;
		padding: 0 15px;
	}
	
	.importCustomer_top .importCustomer_import button {
		width: 26px;
		height: 26px;
		background: url(../../../../assets/img/fj_le.png) no-repeat;
		border: none;
	}
	
	.importCustomer_top .importCustomer_import button:hover {
		background: url(../../../../assets/img/fj_le_click.jpg);
	}
	
	.importCustomer_import_wn {
		height: 50px;
		line-height: 50px;
		overflow: hidden;
		display: inline-block;
		width: 92%;
	}
	
	.importCustomer_import_wn span {
		color: #98a4b0;
	}
	
	.importCustomer_top p {
		text-align: center;
	}
	
	.importCustomer_title2 {
		margin-bottom: 20px;
	}
</style>