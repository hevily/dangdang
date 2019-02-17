<template>
	<div class="applyBox">
		<Breadcrumb>
			<Breadcrumb-item to='/main'>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">基本信息</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span ok_link">信息管理</span></Breadcrumb-item>
		</Breadcrumb>

		<div class="right_home_warp test-1">
			<form action="">
				<ul class="form_ul">
					<li>
						<label>信息标题:</label><input type="text" placeholder="请输入信息标题" v-model="formProp.title" />
					</li>
					<li>
						<label>作者:</label><input type="text" placeholder="请输入作者" v-model="formProp.author" />
					</li>
					<li>
						<label>发布日期:</label><input type="text" placeholder="请输入发布日期" v-model="formProp.publishTime" />
					</li>
					<li>
                        <editor id="editor_id" height="30px" width="40px" :content="formProp.mainBody"
                            pluginsPath="/static/kindeditor/plugins/"
                            :loadStyleMode="false"
                            @on-content-change="onContentChange">
                        </editor>
                        <script id='editor' type="text/plain"></script>
					</li>
				</ul>
			</form>
		</div>
		<div class="btn-bot">
			<button class="btn-save" @click="kk(formProp)">保存</button>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import '../../assets/UE/ueditor.config.js'
	import '../../assets/UE/ueditor.all.min.js'
	import '../../assets/UE/lang/zh-cn/zh-cn.js'
	import '../../assets/UE/ueditor.parse.js'
	import ue from '@/components/UE'

	export default {
		mounted () {
		 	const _this = this;
			_this.editor = UE.getEditor('editor_id');
			_this.editor.addListener("ready", function (){
   				try{
   					//确保UE加载完成后，放入内容。
					_this.editor.setContent(_this.formProp.mainBody); 
				}catch(err) {
		      		//alert(err);
  				}
      		});
  		},
		destroyed() {
      		this.editor.destroy();
    	},
		data() {
			return {
				id: '',
				formProp: {
					title: '', 		//标题
					author: '', 	//作者
					publishTime: '',//发布时间
					mainBody:'',	//主体内容
					editor : null,	//编辑插件
					
				},
			}
		},
		methods: {
			getFormData() {
				let _this = this;
				let tmpFormData 	= {};
				tmpFormData.id 		= _this.id; 
				tmpFormData.title 	= _this.formProp.title; 
				tmpFormData.author 	= _this.formProp.author; 			//作者
				tmpFormData.publishTime = _this.formProp.publishTime; 	//发布时间
				tmpFormData.mainBody = _this.editor.getContent(); 		//发布内容
				
				return tmpFormData;
			},
			kk(name) {
				let _this 			= this;
				let saveFormInfo 	= _this.getFormData();
				let re = /(1[3-9]\d{9}$)/;
				let regh = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
  				let reg = /^\d+$/;
				if(_this.formProp.title == '') {
					_this.$Message.error("请输入title")
					return false;
				} 
				else if(_this.formProp.title.length > 50) {
					_this.$Message.error("title不能超过50个字")
					return false;
				} else if(_this.formProp.author == '') {
					_this.$Message.error("请输入author")
					return false;
				}
				else if(_this.formProp.author.length > 30) {
					_this.$Message.error("author不能超过30个字")
					return false;
				}			
				else {
					_this.axios({ //发送请求
							method: 'post',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: "/api/base/introduce/modify.do",
							data: api.convertParam(saveFormInfo)
						})
						.then(function(res) {
							if(res.data.status == 1) {
								_this.$Message.success("修改成功")
									setTimeout(() => {
							                  _this.$router.go(0)
							             }, 2000);								
							} else {
//								_this.instance("error", 0, res.data.message);
								_this.$Message.error(res.data.message)
							}
						})
						.catch(function(error) {
							console.log(error);
						})
				}

			},
		},
		created(){
			let _this = this;
			let type = this.$route.query.type ;

			let queryurl =  "/api/base/introduce/"+type+"/query.do";
			this.axios(queryurl)
				.then(function(res) {
					if(res.data.status == 1) {
						let obj = res.data.datas;
						_this.id = obj.id;
						_this.formProp.title 		= obj.title; //标题
						_this.formProp.author 		= obj.author; //作者
						_this.formProp.publishTime 	= obj.publishTime; //发布时间
						_this.formProp.mainBody 		= obj.mainBody; //内容
						_this.editor.setContent(_this.formProp.mainBody);  //防止加载不上数据

					}
				}).catch(function(err) {
					console.log(err);
			})
		},
	}	
</script>

<style scoped>
	/*.applyBox {
		position: absolute;
		top: 0px;
		bottom: 0;
		left: 0px;
		right: 30px;
	}
	*/
	.form_box {
		width: 100%;
		background: #fff;
		padding:0 20px 20px 20px;
		/*padding: 20px 35px 114px 35px;*/
		box-shadow: 0px 0px 5px rgba(140, 205, 218, 0.78);
	}
	
	.form_ul {
		width: 76%;
	}
	
	.form_ul li {
		width: 100%;
		display: flex;
		margin: 20px 0;
		align-items: center;
	}
	
	.form_ul li label {
		display: block;
		width: 215px;
		padding-right: 10px;
		text-align: right;
		font-size: 14px;
	}
	
	.form_ul li input {
		width: 100%;
		border-radius: 5px;
		border: 1px solid #ccd9e6;
		padding: 10px 10px;
		font-size: 14px;
	}


	
	h4 {
		font-size: 16px;
		color: #0083c0;
		padding: 10px 10px 10px;
		margin-bottom: 30px;
		border-bottom: 1px solid #ccd9e6;
		font-weight: normal;
	}

	.applyBox .span8 {
    	padding-left: 20px;
	}

</style>