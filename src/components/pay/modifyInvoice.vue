<template>
	<div class="invoice">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>发货单</Breadcrumb-item>
            <Breadcrumb-item>新增发货单</Breadcrumb-item>
        </Breadcrumb>

<div class="right_home_warp test-1">
	

        <div class="invoiceItem" slot="content">
        	<table cellspacing="0" cellpadding="0">
        		<tr>
        			<td><b>订单编号：</b>{{formItem.code}}</td>
        			<td><b>下单日期：</b>{{formItem.applyTime }}</td>
        		</tr>
        		<tr>
        			<td><b>客户名称：</b>{{formItem.customerCorpName}}</td>
        			<td><b>联系电话：</b>{{formItem.applyUserTel}}</td>
        		</tr>
        		<tr>
        			<td><b>采购员：</b>{{formItem.applyUserName}}</td>
        			<td><b>订单交货日期：</b>{{formItem.deliveryDate}}</td>
        		</tr>
        	</table>
        </div>

        <div class="invoiceItem reciveInfo" slot="content">
        	<table cellspacing="0" cellpadding="0">
        		<tr>
	        		<td>
	        			<b class="label"><i>*</i>收货人：</b>
	        			<Input placeholder="请输入..." v-model="postInfo.consigneeName" style="width:200px"></Input>
	        		</td>
	        		<td>
	        			<b class="label"><i>*</i>收货人电话：</b>
	        			<Input placeholder="请输入..." v-model="postInfo.consigneeName" style="width:200px"></Input>
	        		</td>
        		</tr>
        		<tr>
	        		<td colspan="2">
	        			<b class="label"><i>*</i>收货地址：</b>
	        			<Input placeholder="请输入..." v-model="postInfo.consigneeAddress" style="width:573px"></Input>
	        		</td>
        		</tr>
        		<tr>
	        		<td colspan="2">
	        			<b class="label"><i style="visibility:hidden;">*</i>邮编：</b>
	        			<Input placeholder="请输入..." v-model="postInfo.consigneePostcode" style="width:200px"></Input>
	        		</td>
        		</tr>
        	</table>
        </div>

        <div class="invoiceItem reciveInfo" slot="content">
        	<table cellspacing="0" cellpadding="0">
        		<tr>
	        		<td>
	        			<b class="label">物流公司：</b>
					    <Select v-model="logCompanySel" style="width:200px">
					        <Option v-for="item in logCompany" :value="item.id" :key="item">{{ item.name }}</Option>
					    </Select>
	        		</td>
	        		<td>
	        			<b class="label">物流单号：</b>
	        			<Input placeholder="请输入..." v-model="postInfo.logisticsBillNo" style="width:200px"></Input>
	        		</td>
        		</tr>
        		<tr>
	        		<td>
	        			<b class="label">联系人：</b>
	        			<Input placeholder="请输入..." v-model="postInfo.driverName" style="width:200px"></Input>
	        		</td>
	        		<td>
	        			<b class="label">联系电话：</b>
	        			<Input placeholder="请输入..." v-model="postInfo.driverTel" style="width:200px"></Input>
	        		</td>
        		</tr>
        		<tr>
	        		<td>
	        			<b class="label">车牌号：</b>
	        			<Input placeholder="请输入..." v-model="postInfo.vehicleNumber" style="width:200px"></Input>
	        		</td>
	        		<td>
	        			<b class="label">包装件数：</b>
	        			<Input v-model="formItem.amount" placeholder="请输入..." style="width:200px"></Input>
	        			<Button type="primary" class="btn" style="margin-left:20px;">打包清单</Button>
	        		</td>
        		</tr>
        		<tr>
	        		<td>
	        			<b class="label">重量：</b>
	        			<Input placeholder="请输入..." style="width:200px"></Input>
	        			<span style="margin-left:6px;">吨</span>
	        		</td>
	        		<td>
	        			<b class="label">体积：</b>
	        			<Input placeholder="请输入..." style="width:200px"></Input>
	        			<span style="margin-left:6px;">立方米</span>
	        		</td>
        		</tr>
        		<tr>
        			<td colspan="2">
        				<b class="label">备注说明：</b>
				        <div class="signWord">
					        <div class="invoiceItem remarks">
					        	<Input type="textarea" placeholder="请输入..." :rows="3" style="width:606px"></Input>
					        </div>
				        </div>
        			</td>
        		</tr>
        		<tr>
        			<td colspan="2">
        				<b class="label">附件信息：</b>
				        <div class="upload">
					    <Upload
				        ref="upload"
				        :headers="uploadHeader" 
				        :show-upload-list="true"
				        :default-file-list="defaultList"
				        :on-success="handleSuccess"
				        :max-size="11112048"
				        :on-format-error="handleFormatError"
				        :on-exceeded-size="handleMaxSize"
				        :before-upload="handleBeforeUpload"
				        multiple
				        :action="uploadUrl" 
				        :data='uploadData'
				        class="uploadCont"
				        >
				        <Button type="ghost" icon="ios-cloud-upload-outline">添加附件</Button>
				    	</Upload>
						    <span class="tips">最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF)</span>
				        </div>
        			</td>
        		</tr>
        	</table>
        </div>
    	<div class="invoiceTit">货品清单</div>
        <div class="purList">
        	<Table :columns="columns" :data="purList"></Table>
        </div>
        <div class="invoiceHandle">
        	<Button type="primary" class="btn">返回</Button>
        	<Button type="primary" class="btn" @click="saveFun">保存</Button>
        </div>
       </div> 
	</div>
</template>
<script>
import api from '@/api/api'
export default {
	data(){
		return {
			collapse: '1',
	    	logCompany:[

	    	],
	    	logCompanySel:"yuantong",
	    	columns:[
	    		{
					title:"产品信息",
					align:"center",
					width:300,
					key:"proinfo",
                    render (row , column , index) {
                        return  `<div class="wares">
                                    <img src='${row.imageUrl}'>
                                    <div class="waresInfo">
                                        <h3>${row.productName}</h3> 
                                    </div>
                                </div>`
                    }
	    		},
	    		{
					title:"总数量",
					align:"center",
                    render (row , column , index) {
                        return  `${row.amount}`
                    }
	    		},
	    		{
					title:"已发送数量",
					align:"center",
					key:"deliveryAmount",
	    		},
	    		{
	    			title:"本次发送数量",
	    			align:"center",
	    			key:"nowSendNum",
                    render (row , column , index) {
                        return  `<div class="handleNum"><span class="minuse" @click="minuseNum(${index})">-</span>
	    				<Input v-model="row.waitDeliveryAmount" class="inp"></Input>
	    				<span class="add" @click="addNum(${index})">+</span></div>`
                    }
	    		},
	    		{
	    			title:"备注",
	    			align:"center",
	    			key:"remarks",
                    render (row , column , index) {
                    return  `<textarea placeholder="最多不超过500个字" class="signTxt" maxlength="500"></textarea>`
                    }
	    		}
	    	],
	    	purList:[

	    	],
	    	formItem:{

	    	},
	    	postInfo:{
	    		logisticsBillNo:''
	    	},
	    	attachments:[],
		    uploadUrl : api.uploadFileUrl,
		    uploadData : {path : 'order/main/'+this.$route.query.id},
            defaultList: [],
            imgUrl: '',
            visible: false,
            uploadList: [],
	    }
	},
	created(){
		const _this = this;
		var url = '/api/order/delivery/'+this.$route.query.id+'/queryByOrderId.do';
		this.axios(url)
	    .then(function(res) {
	    	
	    	_this.formItem = res.data.datas;
	    	_this.purList  = res.data.datas.products;
	    })
	    .catch(function(err) {
	        console.log(err);
	    });

	    this.axios(api.queryLogistics)
	    .then(function(res) {
	    	_this.logCompany = res.data.datas;

	    })
	    .catch(function(err) {
	        console.log(err);
	    });
	},
	methods:{
		saveFun(){
			const _this = this;

	        _this.axios({
	            method : 'post',
	            header : {
	                "Content-Type" : 'application/x-www-form-urlencoded'
	            },
	            url :api.addDeliveryBill,
	            data : api.jsonData(_this.postInfo),
	        })
            .then(function(res){
            	if(res.data.status==1){
            		_this.$Message.success("保存成功");
            		_this.$router.push({path:"/invoiceList",query:{}});
            	}
            	else{
            		_this.$Message.warning(res.data.message);
            	}

            })
		    .catch(function(err) {
		        console.log(err);
		    }); 
		},
		//减少产品数量
		minuseNum(index){
			var v = this.purList[index].waitDeliveryAmount;
			if(v>1){
				this.purList[index].waitDeliveryAmount = v-1;
			}
		},
		//增加产品数量
		addNum(index){
			var v = this.purList[index].waitDeliveryAmount;
			this.purList[index].waitDeliveryAmount = v+1;
		},
		//文件上传
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
		   this.attachments.push(image);
		   console.log(res);
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
    mounted () {
        this.uploadList = this.$refs.upload.fileList;

    }
}
</script>
<style>
.invoice .upload .ivu-upload-list-file{
	float:left;
	width:30%;
}
.invoice .upload {
	float:none;
}
.invoiceItem table{
	width:750px;
}
.invoiceItem .signWord{
	overflow:auto;
}
.upload{
	float:left;
	margin-top:0;
	padding:0;
}
.upload .tips{

	position:absolute;
	left:220px;
	top:0;
	margin-left:10px;
	margin-top:4px;
}
.remarks{
	width:auto;
	margin-top:0;
	padding:0;
}
.invoiceTit{
    height: 38px;
    line-height: 38px;
    position: relative;
	width: 100%;
    margin-top: 20px;
    font-weight: bold;
    font-size: 16px;
    color: #39f;
}
.handleNum .minuse,
.handleNum .add{
	display:inline-block;
	width:27px;
	height:27px;
	margin:0 -4px;
	font-size:18px;
	font-weight:bold;
	background-color:#ededed;
	border:1px solid #ccc;
	cursor:pointer;
}
.handleNum .inp{
	
	width:50px;
	height:27px;
	line-height:27px;
	vertical-align:3px;
	border-left:0;
	border-right:0;
	border-radius:0;
	text-align:center;
	outline:none;
	border-top:1px solid #ccc;
	border-bottom:1px solid #ccc;
}
.handleNum .inp:focus{
	border-top:1px solid #ccc;
	border-bottom:1px solid #ccc;
	box-shadow:none;
}
.handleNum .inp:hover{
	border-top:1px solid #ccc;
	border-bottom:1px solid #ccc;
	box-shadow:none;
}
.signTxt{
	padding:5px;
}
</style>