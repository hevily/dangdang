<template>
	<div class="modifyPsw">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
        <BreadcrumbItem>设置</BreadcrumbItem>
        <BreadcrumbItem>个人名片</BreadcrumbItem>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<div class="seltilge">个人名片</div>
			<div class="ge_box">
                <div class="ge_box_d2">
                    <div class="uploaddiv">
                        <Upload :format="['jpg','jpeg','png']" accept="image/jpg,image/jpeg,image/png" :action="uploadUrl" :headers="uploadBusHeader" :on-success="handleSuccessBusiness">
                            <Button type="text" class="uploadbtn"></Button>
                        </Upload>
                        <div id="imgupload_zhe_div">
                            <img :src="logosrc" class="imgshow" style="border-radius: 50%; border:none;"/>
                            <div class="imgupload_zhe">
                                <div class="imgupload_zhediv" style="text-align: center;width: 100%;">
                                    <Icon size="30" color='white' type="eye" @click.native="fangda" />
                                    <Icon size="30" color='white' type="plus" @click.native="tianjia" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p style="text-align: center;margin-bottom: 20px;">{{pageInfo.username}}</p>
                <p>手机号码：{{pageInfo.phone}}</p>
                <p>部门：{{pageInfo.bm}}</p>
                <p>公司名称：{{pageInfo.gsname}}</p>
			</div>
			<!--<div class="formModifypsw">
				<ul>
					<li>
						<div>公司名称：</div>
						<div>{{pageInfo.gsname}}</div>
					</li>
					<li>
						<div>我的姓名：</div>
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
				</ul>
				<div v-show="showis" class="rightBox_but" @click="isshow">
					<div>
						<img :src="logosrc" />
					</div>
				</div>
			</div>-->
			<div v-show="showis" class="rightBox_but" @click="isshow">
				<div>
					<img :src="logosrc" />
				</div>
			</div>
		</div>
		<div class="btn-bot">
			<button class="btn-save" @click='save_img'>保存</button>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>
<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			tis: tis,
		},
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
				re_do:'',
				do_yn: false,
				do_no: false,
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
					mobile: ''
				}
			}
		},
		methods: {
			get_mymessage() {
				let _this = this;
				_this.axios({ //发送请求
						method: 'get',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						//url:'/api/upms/corp/{id}/queryAuthentication.do',
						url: api.getUserName
						//data: api.convertParam({'id':'100'})
					})
					.then(function(res) {
						if(res.data.status == '1') {
							_this.pageInfo.gsname = res.data.datas.corpName;
							_this.pageInfo.username = res.data.datas.name;
							_this.pageInfo.phone = res.data.datas.mobile;
							_this.pageInfo.job = res.data.datas.title;
							_this.pageInfo.bm = res.data.datas.departmentName;
							_this.imgup.mobile = res.data.datas.mobile;
							if(res.data.datas.userPhoto !== null) {
								_this.logosrc = res.data.datas.userPhoto;
								let imgdiv = document.getElementById("imgupload_zhe_div");
								imgdiv.style.display = "block";
							}
							_this.imgup.id = res.data.datas.id;
						} else {
							//	_this.$Message.error(res.data.message);
						}
						//_this.fun_yzm();
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
				_this.axios({ //发送请求
						method: 'post',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						url: api.uploaduserimg,
						data: api.convertParam(_this.imgup)
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.do_yn = true;
							_this.re_do = "保存成功";
							setTimeout(() => {_this.do_yn = false;}, 2000);
							//	_this.$Message.success('添加成功');
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {_this.do_no = false;}, 2000);
							//	_this.$Message.success('添sdf加成功');
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
	
	.uploaddiv {
		position: relative;
		width: 95px;
		height: 95px;
	}
	
	.uploadbtn {
		width: 95px;
		height: 95px;
		/* background: url(../../../assets/img/subimg.jpg) no-repeat; */
		background-size: 100% 100%;
		border: none;
		margin: 0 0 !important;
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
        border-radius: 50%;
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
		z-index: 9999;
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
	
	.seltilge {
		position: relative;
		padding: 0 0 0 15px;
		font-size: 15px;
		color: #415161;
		margin-bottom: 25px;
		font-weight: 500;
	}
	
	.seltilge:before {
		content: "";
		width: 3px;
		height: 15px;
		position: absolute;
		top: 3px;
		left: 0;
		background: #88b7e0;
	}
	
	.ge_box {
		font-size: 14px;
        width: 300px;
        border: 4px solid #668B8B;
        padding: 30px 40px 40px;
        margin: 0 auto;
	}
    .ge_box_d2 {
		display: flex;
        justify-content: center;
        margin: 6px 0;
	}
    .ge_box p {
        height: 30px;
        line-height: 30px;
    }

</style>
<style>

	.ivu-upload-list {
		display: none!important;
	}
</style>