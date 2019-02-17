<template>
	<div class="pay">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>支付管理</Breadcrumb-item>
            <Breadcrumb-item>支付</Breadcrumb-item>
        </Breadcrumb>
    	<Tabs value="name1">
	        <Tab-pane label="支付信息" name="name1">
		        <div class="payInfo">
		        	<table>
			        	<tr>
				        	<td align="right"><b>订单编号：</b></td>
				        	<td clospan="3">{{formItem.orderCode}}</td>
			        	</tr>
		        		<tr>
		        			<td align="right"><b>供应商名称：</b></td>
		        			<td clospan="3">{{formItem.supplierCorpName}}</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>订单信息：</b></td>
		        			<td clospan="3">总金额<span class="num">{{formItem.orderTotalMoney}}</span>元，已支付<span class="num">{{formItem.orderPayTotalMoney}}</span>元，本次支付不能超过余额<span class="num">{{formItem.orderWaitPayTotalMoney}}</span>元</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>支付单号：</b></td>
		        			<td><Input placeholder="请输入..." v-model="postData.payBillNumber" style="width: 200px"></Input></td>
		        			<td><b>支付项目：</b></td>
		        			<td><Input placeholder="如预付款等" v-model="postData.payItem" style="width: 200px"></Input></td>
		        		</tr>
		        		<tr>
		        			<td align="right"><span class="star">*</span><b>付款金额：</b></td>
		        			<td><Input placeholder="请输入..." v-model="postData.payMoney" style="width: 200px"></Input><span class="unit">(元)</span></td>
		        			<td><b>支付时间：</b></td>
		        			<td><Date-picker type="date" v-model="postData.payTime" placeholder="选择日期" format="yyyy-MM-dd" style="width: 200px"></Date-picker></td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>支付状态：</b></td>
		        			<td colspan="3">
							    <Select style="width:200px" v-model="postData.orderPayStatus">
							        <Option v-for="item in orderPayStatus" :value="item.value" :key="item">{{ item.label }}</Option>
							    </Select>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>支付方式：</b></td>
		        			<td colspan="3">
							    <Radio-group type="button" v-model="postData.payMode ">
							        <Radio label="银行转账"></Radio>
							        <Radio label="现金"></Radio>
							    </Radio-group>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>汇款银行账户：</b></td>
		        			<td colspan="3">
							    <Select style="width:200px">
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
		        				<Input type="textarea" placeholder="请输入..." v-model="postData.payDescription"></Input>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td align="right"><b>附件信息：</b></td>
		        			<td colspan="3" valign="top">
							    <div class="demo-upload-list" v-for="item in uploadList">
							        <template v-if="item.status === 'finished'">
							            <img :src="item.url">
							            <div class="demo-upload-list-cover">
							                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
							                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
							            </div>
							        </template>
							        <template v-else>
							            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							        </template>
							    </div>
							    <Upload
							        ref="upload"
							        :headers="uploadHeader" 
							        :show-upload-list="false"
							        :default-file-list="defaultList"
							        :on-success="handleSuccess"
							        :format="['jpg','jpeg','png']"
							        :max-size="2048"
							        :on-format-error="handleFormatError"
							        :on-exceeded-size="handleMaxSize"
							        :before-upload="handleBeforeUpload"
							        multiple
							        type="drag"
							        :action="uploadUrl" 
							        :data='uploadData'
							        style="display: inline-block;width:58px;">
							        <div style="width: 58px;height:58px;line-height: 58px;">
							            <Icon type="camera" size="20"></Icon>
							        </div>
							    </Upload>
							    <Modal title="查看图片" v-model="visible">
							        <img :src="imgUrl" v-if="visible" style="width: 100%">
							    </Modal>
		        			</td>
		        		</tr>
		        	</table>
		        </div>
		        <div class="payBtn">
        			<Button type="primary" @click="backFun">返回</Button>
        			<Button type="primary" @click="toPayFun">确认支付</Button>
        		</div>
        	</Tab-pane>
        	<Tab-pane label="支付记录" name="name2">
        		<div class="payRecords">
        			<Table stripe :columns="columns" :data="payList"></Table>
        		</div>
		        <div class="pageBar">
		        	<Page :total="pageInfo.count" :current="pageInfo.pageStart" :page-size="pageInfo.pageNums" show-elevator ></Page>
		        </div>
        	</Tab-pane>
        </Tabs>
	</div>
</template>
<script>
import api from '@/api/api'
export default {
	data(){
		return {
	    	pageInfo:{
	    		count:5,
	    		pageStart:1,
	    		pageNums:1
	    	},
	    	fileload:api.fileUpload,
	    	orderPayStatus:[
				{
					value:'1',
					label:'部分支付'
				},
				{
					value:'2',
					label:'支付完成'
				},
	    	],
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
		        	type: 'index',
		            title: '序号',
		            width:60
		        },
				{
					title:"支付单号",
					align:"center",
					key:"code"
				},
				{
					title:"支付日期",
					align:"center",
					key:"payDate"
				},
				{
					title:"支付金额",
					align:"center",
					key:"payMoney"
				},
				{
					title:"付款方式",
					align:"center",
					key:"paymentStyle"
				},
				{
					title:"支付方式",
					align:"center",
					key:"payStyle"
				},
				{
					title:"支付人",
					align:"center",
					key:"payMeb"
				}
		    ],	
		    payList:[
		    	{
			    	code:'001',
			    	payDate:'2017-10-22',
			    	payMoney:200,
			    	paymentStyle:'线下',
			    	payStyle:'微信',
			    	payMeb:'张三'
			    },
		    	{
			    	code:'001',
			    	payDate:'2017-10-22',
			    	payMoney:200,
			    	paymentStyle:'线下',
			    	payStyle:'微信',
			    	payMeb:'张三'
		    	}
		    ],
		    postData:{
		    	orderId:'',
		    	payBillNumber:'',
		    	payItem:'',
		    	payMoney:'',
		    	payTime:'',
		    	payMode:'银行转账',
		    	payDescription:'',
		    	orderPayStatus:'1',
		    	attachments : []
		    },
		    uploadUrl : api.uploadFileUrl,
		    uploadData : {path : 'pay/'+this.$route.query.id},
            defaultList: [],
            imgUrl: '',
            visible: false,
            uploadList: [],
            formItem:{}
		}
	},
	computed : {
        uploadHeader : function() {
            const tokenId = this.$store.state.token;
            return {
                token_id : tokenId
            }
        }
	},
	created(){
		const _this = this;
		var url = '/api/order/finance/'+this.$route.query.id+'/queryByOrderId.do';
        this.axios(url)
        .then(function(res){
            _this.formItem = res.data.datas;
            
        })
        .catch(function(err) {
            console.log(err);
        })
	},
	methods:{
		backFun(){
			this.$router.push({path:"/purchaseOrder",query:{}});
		},
		toPayFun(){
			const _this = this;
			this.postData.orderId = this.$route.query.id;
			var myDate = new Date(this.postData.payTime);
			this.postData.payTime = myDate.getFullYear()+"-"+((myDate.getMonth()+1>9) ? (myDate.getMonth()+1) : "0"+(myDate.getMonth()+1))+"-"+(myDate.getDate()>9 ? myDate.getDate() : "0"+myDate.getDate());
			console.log(this.postData);
			//订单付款
	        _this.axios({
	            method : 'post',
	            header : {
	                "Content-Type" : 'application/x-www-form-urlencoded'
	            },
	            url :api.pay,
	            data : api.jsonData(this.postData),

	        })
			.then(function (res) {
				console.log(res.data);
				
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		//图片上传
        handleView (url) {
            this.imgUrl = url;
            this.visible = true;
        },
        handleRemove (file) {
           // 从 upload 实例删除数据
           const _this = this;
           const fileList = this.$refs.upload.fileList;
           this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
           this.postData.attachments.forEach(function(item , index) {
                if(item.fileName == file.name && item.url == item.url) {
                    _this.postData.attachments.splice(index,1);
                }
           })
        },
		handleSuccess (res, file,fileList) {
		   file.url = res.url;
		   file.name = res.fileName;
		   const image = {
		        fileName : res.fileName,
		        fileType : res.fileSuffix,
		        filePath : res.filePath,
		        url : res.url,
		        orderNum : fileList.length
		   }
		   this.postData.attachments.push(image);
		},
		handleFormatError (file) {
		   this.$Notice.warning({
		       title: '文件格式不正确',
		       desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
		   });
		},
		handleMaxSize (file) {
		   this.$Notice.warning({
		       title: '超出文件大小限制',
		       desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
		   });
		},
		handleBeforeUpload () {
		   const check = this.uploadList.length < 5;
		   if (!check) {
		       this.$Notice.warning({
		           title: '最多只能上传 5 张图片。'
		       });
		   }
		   return check;
		},
	},
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
    }
}
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
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