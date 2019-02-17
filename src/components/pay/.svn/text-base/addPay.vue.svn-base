<template>
	<div class="pay">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>支付管理</Breadcrumb-item>
            <Breadcrumb-item>支付</Breadcrumb-item>
        </Breadcrumb>
    	<Tabs value="name1">
	        <Tab-pane label="确认款项" name="name1">
		        <div class="payInfo">
		        	<table>
			        	<tr>
				        	<td align="right"><b>订单编号：</b></td>
				        	<td clospan="3">YY0990808080809890</td>
			        	</tr>
		        		<tr>
		        			<td align="right"><b>供应商名称：</b></td>
		        			<td clospan="3">华东软件科技有限公司</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>订单信息：</b></td>
		        			<td clospan="3">总金额<span class="num">880</span>元，已支付<span class="num">330</span>元，本次支付不能超过余额<span class="num">55</span>元</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>支付单号：</b></td>
		        			<td><Input placeholder="请输入..." style="width: 200px"></Input></td>
		        			<td><b>支付项目：</b></td>
		        			<td><Input placeholder="如预付款等" style="width: 200px"></Input></td>
		        		</tr>
		        		<tr>
		        		<td align="right"><span class="star">*</span><b>付款金额：</b></td>
		        			<td><Input placeholder="请输入..." style="width: 200px"></Input><span class="unit">(元)</span></td>
		        			<td><b>支付时间：</b></td>
		        			<td><Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker></td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>付款方式：</b></td>
		        			<td colspan="3">
							    <Radio-group type="button">
							        <Radio label="线下支付"></Radio>
							        <Radio label="在线支付"></Radio>
							    </Radio-group>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>支付方式：</b></td>
		        			<td colspan="3">
							    <Radio-group type="button">
							        <Radio label="银行转账"></Radio>
							        <Radio label="现金"></Radio>
							    </Radio-group>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>汇款银行账户：</b></td>
		        			<td colspan="3">
							    <Select v-model="model1" style="width:200px">
							        <Option v-for="item in accoutList" :value="item.value" :key="item">{{ item.label }}</Option>
							    </Select>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>收款银行账户：</b></td>
		        			<td colspan="3" valign="top">
		        				<p>中国工商银行 中国工商银行股份有限公司 232424324234243 北京 北京 东城</p>
		        				<i-button type="text" size="small" class="modifyLink">修改</i-button>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>支付说明：</b></td>
		        			<td colspan="3" valign="top">
		        				<Input type="textarea" placeholder="请输入..."></Input>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>附件信息：</b></td>
		        			<td colspan="3" valign="top">
							    <Upload action="//jsonplaceholder.typicode.com/posts/" class="upload">
							    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button><span class="tips">(最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF)</span>
							    </Upload>
		        			</td>
		        		</tr>
		        	</table>
		        </div>
		        <div class="payBtn">
        			<Button type="primary">返回</Button>
        			<Button type="primary">确认支付</Button>
        		</div>
        	</Tab-pane>
        	<Tab-pane label="确认记录" name="name2">
        		<div class="payRecords">
        			<Table stripe :columns="columns" :data="confirmList"></Table>
        		</div>
		        <div class="pageBar">
		        	<Page :total="pageInfo.count" :current="pageInfo.pageStart" :page-size="pageInfo.pageNums" show-elevator ></Page>
		        </div>
        	</Tab-pane>
        </Tabs>
	</div>
</template>
<script>
export default {
	data(){
		return {
	    	pageInfo:{
	    		count:5,
	    		pageStart:1,
	    		pageNums:1
	    	},
			accoutList:[
				{
					value:'1',
					label:'账户1'
				},
				{
					value:'2',
					label:'账户2'
				},
				{
					value:'3',
					label:'账户3'
				}
			],
			columns:[
				{
					title:"支付单号",
					align:"center",
					key:"payCode"
				},
				{
					title:"客户名称",
					align:"center",
					key:"customer"
				},
				{
					title:"订单编号",
					align:"center",
					key:"code"
				},
				{
					title:"订单总金额",
					align:"center",
					key:"totalMoney"
				},
				{
					title:"已支付金额",
					align:"center",
					key:"payMoney"
				},
				{
					title:"本次支付金额",
					align:"center",
					key:"nowPayMoney"
				},
				{
					title:"付款方式",
					align:"center",
					key:"payBy"
				},
				{
					title:"支付方式",
					align:"center",
					key:"payMethod"
				},
				{
					title:"支付时间",
					align:"center",
					key:"payTime"
				}
			],
			confirmList:[
				{
					payCode:'000012121',
					customer:'客户1',
					code:'12',
					payTime:'2017-10-22',
					totalMoney:110,
					payMoney:20,
					nowPayMoney:100,
					payBy:'在线支付',
					payMethod:'微信'
				},
				{
					payCode:'000012121',
					customer:'客户1',
					code:'12',
					payTime:'2017-10-22',
					totalMoney:110,
					payMoney:20,
					nowPayMoney:100,
					payBy:'在线支付',
					payMethod:'微信'
				},
			]
		}
	}
}
</script>
<style>
.payBtn{
	width:100%;
	text-align:center;
}
.payBtn .ivu-btn{
	width:80px;
	margin:0 10px;
	padding:8px 0;
}
.modifyLink.ivu-btn-small{
	padding:0;
	color:#39f;
}
.payInfo{
	font-size:14px;
	color:#666;
}
.payInfo .ivu-select-dropdown{
	margin-top:-50px;
}
.payInfo .tips{
	margin-left:10px;
	font-size:12px;
	color:#999;
}
.payInfo .upload{
	margin-top:4px;
}
.payInfo .star{
	color:#ff0000;
}
.payInfo .num{
	color:#39f;
}
.payInfo .unit{
	margin-left:5px;
}
.payInfo td{
	padding:4px;
}
</style>