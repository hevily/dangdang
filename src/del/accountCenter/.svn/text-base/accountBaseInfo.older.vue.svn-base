<template>
	<div class="modifyPsw" style="left:10px!important;top: 10px;">
		<Breadcrumb style="padding-left: 0;">
			<Breadcrumb-item><span class="link_span">首页</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">设置</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span  ok_link">基本信息</span></Breadcrumb-item>
			<div class="Bread_ri">
				<div>
					<img src="../../assets/img/wwj_t.png" alt="" />
					<span>配置</span>
				</div>
				<div>
					<img src="../../assets/img/wjj_m.png" alt="" />
					<span>帮助</span>
				</div>
			</div>
		</Breadcrumb>
		<div class="right_home_warp">
			<div class="psw_title">
				<span>基本信息</span>
			</div>

			<div class="formModifypsw">
				<ul>
					<li>
						<div>公司名称：</div>
						<div>{{pageInfo.gsname}}</div>
					</li>
					<li>
						<div>您的姓名：</div>
						<div>{{pageInfo.username}}</div>
					</li>
					<li>
						<div>手机号码：</div>
						<div>{{pageInfo.phone}}</div>
					</li>
					<li>
						<div>职位：</div>
						<div>{{pageInfo.job}}</div>
					</li>
					<li>
						<div>部门：</div>
						<div>{{pageInfo.bm}}</div>
					</li>
					<li>
						<div>上传头像：</div>
						<div class="uploaddiv">
							<Upload :format="['jpg','jpeg','png']" accept="image/jpg,image/jpeg,image/png" :action="uploadUrl" :headers="uploadBusHeader" :on-success="handleSuccessBusiness">
								<Button type="ghost" class="uploadbtn"></Button>
							</Upload>
							<div id="imgupload_zhe_div">
								<img :src="logosrc" class="imgshow" />
								<div class="imgupload_zhe">
									<div class="imgupload_zhediv" style="text-align: center;width: 100%;">
										<Icon size="30" color='white' type="eye" @click.native="fangda" />
										<Icon size="30" color='white' type="plus" @click.native="tianjia" />
									</div>

								</div>
							</div>

						</div>
					</li>
					<li>
						<button class="btn-save" @click='save_img'>保存</button>
					</li>
				</ul>
				<div v-show="showis" class="rightBox_but" @click="isshow">
					<div>
						<img :src="logosrc" />
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		computed: {
			userInfo() {
				let _this = this;
				_this.pageInfo.username = _this.$store.state.user.user.name;
				return _this.$store.state.user.user
			},
			uploadHeader() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			},
			uploadBusHeader() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			}

		},
		created() {
			let _this = this;
			_this.get_mymessage();
			//_this.imgup.id = _this.$store.state.user.corp.id;
		},
		data() {
			return {
				showUpList: 'false',
				showis: false,
				uploadUrl: api.uploadFileUrl,
				logosrc: '',
				file: '',
				src: '',
				pageInfo: {
					gsname: "",
					username: "",
					phone: "",
					job: "",
					bm: "",
					userphoto: ''
				},
				imgup: {
					id: '',
					userPhoto: '',
					mobile:''
				}
			}
		},
		methods: {
			get_mymessage() {
				let _this = this;
				_this.axios({ //发送请求
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						//url:'/api/upms/corp/{id}/queryAuthentication.do',
						url: api.getUserName
						//data: api.convertParam({'id':'100'})
					})
					.then(function(res) {
						//console.log(res);
						if(res.data.status == '1') {
							_this.pageInfo.gsname = res.data.datas.corpName;
							_this.pageInfo.username = res.data.datas.name;
							_this.pageInfo.phone = res.data.datas.mobile;
							_this.pageInfo.job = res.data.datas.title;
							_this.pageInfo.bm = res.data.datas.departmentName;
							_this.imgup.mobile = res.data.datas.mobile;
							if(res.data.datas.userPhoto !== null) {
								_this.logosrc = res.data.datas.userPhoto;
//								console.log(_this.logosrc);
								let imgdiv = document.getElementById("imgupload_zhe_div");
								imgdiv.style.display = "block";
							}
							_this.imgup.id = res.data.datas.id;
						} else {
							_this.$Message.error(res.data.message);
						}
						_this.fun_yzm();

					})
					.catch(function(error) { //捕获错误信息
						console.log(error);
					});
			},
			handleSuccessBusiness(res, file, fileList) {
				let _this = this;
				_this.logosrc = res.url; //上传成功的图片路径
				_this.imgup.userPhoto = res.url; //显示的图片路径
				//this.$refs.upload.fileList = []; //移除已上传的文件信息
				let imgdiv = document.getElementById("imgupload_zhe_div");
				imgdiv.style.display = "block";

			},
			fangda() {
				let _this = this;
				_this.showis = !_this.showis;
			},
			tianjia() {
				document.querySelector(".uploadbtn").click(); //点击浮动图片
			},
			isshow() {
				let _this = this;
				_this.showis = !_this.showis;
			},
			save_img() {
				let _this = this;
				console.log(_this.imgup);
				_this.axios({ //发送请求
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.uploaduserimg,
						data: api.convertParam(_this.imgup)
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.$Message.success('添加成功');
						} else {
							_this.$Message.error(res.data.message);
						}
					})
					.catch(function(error) {
						console.log(error);
					})
			}
		}
	}
</script>
<style scoped>
	.modifyPsw {
		position: absolute;
		top: 0;
		left: 10px;
		right: 30px;
		bottom: 10px;
		/*padding-left: 230px;*/
	}
	
	.psw_titles  {
		margin: 0 0 0 0 ;
	}
	.psw_titles span {
		font-size: 16px;
	}
	
	.formModifypsw {
		width: 100%;
		margin: 0 auto;
		margin-top: 50px;
	}
	
	.formModifypsw ul {
		margin-left: 230px;
	}
	
	.formModifypsw ul li {
		display: flex;
		display: -webkit-flex;
		align-content: center;
		margin-bottom: 37px;
	}
	
	.formModifypsw ul li div {
		font-size: 14px;
		margin-right: 20px;
		/*32*/
	}
	
	.formModifypsw ul li div:first-child {
		width: 70px;
		text-align: right;
	}
	
	.Bread_ri {
		position: absolute;
		top: 15px;
		right: 3px;
		display: flex;
		margin-right: 30px;
	}
	
	.Bread_ri div {
		display: flex;
		align-items: center;
		margin-left: 20px;
	}
	
	.Bread_ri div:hover {
		cursor: pointer;
	}
	
	.Bread_ri div img {
		width: 14px;
		height: 14px;
		margin-right: 5px;
	}
	
	.uploaddiv {
		position: relative;
		width: 95px;
		height: 95px;
	}
	
	.uploadbtn {
		width: 95px;
		height: 95px;
		background: url(../../assets/img/subimg.jpg) no-repeat;
		background-size: 100% 100%;
		border: none;
	}
	
	#imgupload_zhe_div {
		position: absolute;
		top: 0;
		width: 95px;
		height: 95px;
		display: none;
	}
	
	.imgshow {
		width: 95px;
		height: 95px;
		display: block;
	}
	
	#imgupload_zhe_div:hover .imgupload_zhe {
		display: block;
	}
	
	.imgupload_zhe {
		position: absolute;
		top: 0;
		width: 95px;
		height: 95px;
		background-color: rgba(0, 0, 0, 0.4);
		display: none;
	}
	
	.imgupload_zhediv {
		width: 95px;
		height: 95px;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		text-align: center;
		margin: 0!important;
		align-content: space-around;
	}
	
	.imgupload_zhediv i {
		margin-top: 11px;
	}
	
	.rightBox_but {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
	}
	
	.rightBox_but div {
		width: 600px;
		margin-left: -260px;
		position: relative;
		top: 100px;
		left: 45%;
	}
	
	.rightBox_but div img {
		width: 100%;
	}
</style>
<style>
	.ivu-upload-list {
		display: none!important;
	}
</style>