<template>
	<div class="invoice">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>发货单</Breadcrumb-item>
            <Breadcrumb-item>新增发货单</Breadcrumb-item>
        </Breadcrumb>
        <Collapse v-model="collapse">
        <Panel name="1">
	        基本信息
	        <div class="invoiceItem" slot="content">
	        	<table cellspacing="0" cellpadding="0">
	        		<tr>
	        			<td><b>订单号：</b>uo12391023123</td>
	        			<td><b>订单日期：</b>2017-10-22</td>
	        		</tr>
	        		<tr>
	        			<td><b>联系人：</b>bj</td>
	        			<td><b>联系电话：</b>13654633333</td>
	        		</tr>
	        		<tr>
	        			<td><b>客户名称：</b>演示经销商</td>
	        			<td><b>发货日期：</b>2017-10-22</td>
	        		</tr>
	        	</table>
	        </div>
        </Panel>
        <Panel name="2">
	        收货信息
	        <div class="invoiceItem reciveInfo" slot="content">
	        	<table cellspacing="0" cellpadding="0">
	        		<tr>
		        		<td>
		        			<b class="label"><i>*</i>收货人：</b>
		        			<Input placeholder="请输入..." style="width:200px"></Input>
		        		</td>
		        		<td>
		        			<b class="label"><i>*</i>收货人电话：</b>
		        			<Input placeholder="请输入..." style="width:200px"></Input>
		        		</td>
	        		</tr>
	        		<tr>
		        		<td colspan="2">
		        			<b class="label"><i>*</i>收货地址：</b>
		        			<Input placeholder="请输入..." style="width:540px"></Input>
		        		</td>
	        		</tr>
	        		<tr>
		        		<td colspan="2">
		        			<b class="label"><i style="visibility:hidden;">*</i>邮编：</b>
		        			<Input placeholder="请输入..." style="width:200px"></Input>
		        		</td>
	        		</tr>
	        	</table>
	        </div>
        </Panel>
        <Panel name="3">
	    	物流信息
	        <div class="invoiceItem reciveInfo" slot="content">
	        	<table cellspacing="0" cellpadding="0">
	        		<tr>
		        		<td>
		        			<b class="label">物流公司：</b>
						    <Select v-model="logCompanySel" style="width:200px">
						        <Option v-for="item in logCompany" :value="item.value" :key="item">{{ item.label }}</Option>
						    </Select>
		        		</td>
		        		<td>
		        			<b class="label">物流单号：</b>
		        			<Input placeholder="请输入..." style="width:200px"></Input>
		        		</td>
	        		</tr>
	        		<tr>
		        		<td>
		        			<b class="label">司机姓名：</b>
		        			<Input placeholder="请输入..." style="width:200px"></Input>
		        		</td>
		        		<td>
		        			<b class="label">司机电话：</b>
		        			<Input placeholder="请输入..." style="width:200px"></Input>
		        		</td>
	        		</tr>
	        		<tr>
		        		<td>
		        			<b class="label">车牌号：</b>
		        			<Input placeholder="请输入..." style="width:200px"></Input>
		        		</td>
		        		<td>
		        			<b class="label">包装件数：</b>
		        			<Input placeholder="请输入..." style="width:200px"></Input>
		        		</td>
	        		</tr>
	        	</table>
	        </div>
        </Panel>
        <Panel name="4">
	        发货备注
	        <div slot="content">
		        <div class="invoiceItem remarks">
		        	<Input type="textarea" placeholder="请输入..." :rows="3"></Input>
		        </div>
		        <div class="upload">
				    <Upload
				        multiple
				        action="//jsonplaceholder.typicode.com/posts/">
				        <Button type="ghost" icon="ios-cloud-upload-outline">添加附件</Button>
				    </Upload>
				    <span class="tips">可以包含多个图片</span>
		        </div>
	        </div>
        </Panel>
        <Panel name="5">
        	采购清单
	        <div class="purList" slot="content">
	        	<Table :columns="columns" :data="purList"></Table>
	        </div>
        </Panel>
        </Collapse>
        <div class="invoiceHandle">
        	<Button type="primary" class="btn">返回</Button>
        	<Button type="primary" class="btn">保存</Button>
        	<Button type="primary" class="btn">保存并发货</Button>
        </div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			collapse: '1',
	    	logCompany:[
	    		{
		    		value:'shunfeng',
		    		label:'顺丰'
		    	},
		    	{
		    		value:'yuantong',
		    		label:'圆通'
		    	}
	    	],
	    	logCompanySel:"yuantong",
	    	columns:[
	    		{
					title:"产品信息",
					align:"center",
					key:"proinfo",
                    render (row , column , index) {
                        return  `<div class="wares">
                                    <img src='${row.name.img}'>
                                    <div class="waresInfo">
                                        <h3>${row.name.name}</h3> 
                                    </div>
                                </div>`
                    }
	    		},
	    		{
					title:"单位",
					align:"center",
					key:"unit",
	    		},
	    		{
					title:"总数量",
					align:"center",
					key:"totalNum",
	    		},
	    		{
					title:"已发送数量",
					align:"center",
					key:"sendNum",
	    		},
	    		{
	    			title:"本次发送数量",
	    			align:"center",
	    			key:"nowSendNum",
                    render (row , column , index) {
                        return  `<Input-number :max="1000000" :min="1"></Input-number>`
                    }
	    		},
	    		{
	    			title:"备注",
	    			align:"center",
	    			key:"remarks",
                    render (row , column , index) {
                    return  `<textarea placeholder="不超过500字"></textarea>`
                    }
	    		}
	    	],
	    	purList:[
	    		{
	    			name: {img : '/static/img/pic-login-bg.png' , name : '计算机计算机计算机'},
	    			unit:"台",
	    			totalNum:1000,
	    			sendNum:200
	    		},
	    		{
	    			name: {img : '/static/img/pic-login-bg.png' , name : '计算机'},
	    			unit:"台",
	    			totalNum:1000,
	    			sendNum:200
	    		},
	    	]
	    }
	}
}
</script>
<style>
.invoiceHandle{
	margin-top:20px;
	text-align:center;
}
.invoiceHandle .btn{
	margin:0 4px;
}
.purList{
	margin-top:10px;
}
.purList table{
	width:100%;
}
.upload{
	position:relative;
	margin-top:10px;
	padding:0 30px;
}
.upload .ivu-btn-ghost{
	font-weight:bold;
	font-size:14px;
}
.upload .tips{
	position:absolute;
	left:150px;
	top:8px;
	font-size:12px;
	color:#999;
}
.invoiceItem{
	padding:0 30px;
	overflow:auto;
}
.invoiceItem table{
	width:680px;
	margin-top:10px;
	line-height:32px;
	font-size:14px;
}
.invoiceItem .label{
	float:left;
	width:100px;
}
.invoiceItem .label i{
	margin-right:4px;
	color:#ff0000;
}
.invoiceItem .ivu-input-type{
	float:left;
}
.invoiceItem td{
	padding:6px 0;
	font-size:14px;
}
.remarks{
	width:680px;
	margin-top:20px;
	overflow:auto;
}
.invoice .ivu-collapse{
	background:none;
	border:0;
}
.invoice .ivu-collapse-header{
	width:100%;
	height:30px;
	line-height:30px;
	margin-top:20px;
	text-indent:24px;
	background:#dbdbdb;
	font-weight:bold;
	font-size:16px;
	color:#666;
}
.invoice .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header > i{
	margin-left:-60px;
	margin-right:10px;
}
.invoice .ivu-collapse > .ivu-collapse-item.ivu-collapse-item-active > .ivu-collapse-header > i{
	transform: rotate(90deg) translate(-12px,-12px);
}
.invoice .ivu-collapse > .ivu-collapse-item{
	border:0;
}
</style>