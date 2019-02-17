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
		        			<b class="label">收货人：</b>
		        			张三
		        		</td>
		        		<td>
		        			<b class="label">收货人电话：</b>
		        			1234234234
		        		</td>
	        		</tr>
	        		<tr>
		        		<td colspan="2">
		        			<b class="label">收货地址：</b>
		        			北京市海淀区
		        		</td>
	        		</tr>
	        		<tr>
		        		<td colspan="2">
		        			<b class="label"><i style="visibility:hidden;">*</i>邮编：</b>
		        			10010
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
						    圆通
		        		</td>
		        		<td>
		        			<b class="label">物流单号：</b>
		        			12313123
		        		</td>
	        		</tr>
	        		<tr>
		        		<td>
		        			<b class="label">司机姓名：</b>
		        			李四
		        		</td>
		        		<td>
		        			<b class="label">司机电话：</b>
		        			13523424
		        		</td>
	        		</tr>
	        		<tr>
		        		<td>
		        			<b class="label">车牌号：</b>
		        			京s1212
		        		</td>
		        		<td>
		        			<b class="label">包装件数：</b>
		        			10
		        		</td>
	        		</tr>
	        	</table>
	        </div>
        </Panel>
        <Panel name="4">
	        发货备注
	        <div slot="content">
		        <div class="invoiceItem remarks">
		        	测试测试测试测试测试测试测试测试
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
	    		},
	    		{
	    			title:"备注",
	    			align:"center",
	    			key:"remarks",
	    		}
	    	],
	    	purList:[
	    		{
	    			name: {img : '/static/img/pic-login-bg.png' , name : '计算机计算机计算机'},
	    			unit:"台",
	    			totalNum:1000,
	    			sendNum:200,
	    			nowSendNum:1000,
	    			remarks:'测试文字测试文字测试文字'
	    		},
	    		{
	    			name: {img : '/static/img/pic-login-bg.png' , name : '计算机计算机计算机'},
	    			unit:"台",
	    			totalNum:1000,
	    			sendNum:200,
	    			nowSendNum:1000,
	    			remarks:'测试文字测试文字测试文字'
	    		},
	    	]
	    }
	}
}
</script>
