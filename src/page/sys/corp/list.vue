<template>
	<div class="companyList">
		<Breadcrumb style="padding-left: 0;">
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>设置</Breadcrumb-item>
			<Breadcrumb-item>企业信息</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
            <div class="asasa">
                <div class="flex">
                    <div class="search_span_box">
                        <div>
                            <select class="sel_sta" v-model="cityList2" @change='search_message_status'>
                                <option value="">全部状态</option>
                                <option value="0">未认证</option>
                                <option value="5">认证中</option>
                                <option value="1">已认证</option>
                                <option value="2">认证未通过</option>
                                <option value="7">禁用中</option>
                            </select>
                        </div>
                        <input class="search-input" type="text" v-model="search_nap" placeholder="请输入公司名称/手机号"/>
                        <button class="search-btn" @click="search_message"><Icon type="search"></Icon></button>
                    </div>
                    <div>
                        <button class="btn-new" @click="addCorp">新增</button>
                        <button class="btn-new">启用</button>
                        <button class="btn-del" @click="addFun">禁用</button>
                        <button class="btn-del" @click="deleteFun">删除企业</button>
                    </div>
                </div>
			</div>
			<div class="tableList test-1">
				<Table size="small" class="tbClass" highlight-row border :columns="columnsInfo" :data="companyArry" @on-select="selectFun" ref="selection"></Table>
			</div>
			<!--删除对话框-->
			<Modal v-model="deleteModel" title="">
				<p>确定要删除该用户吗？</p>
				<div slot="footer">
					<Button size="large">取消</Button>
					<Button type="info" size="large">确定</Button>
				</div>
			</Modal>
		</div>
		<div class="page-bot">
			<Page :total="pageInfo.count" :current="pageInfo.page" :page-size="pageInfo.rows" show-elevator @on-change="pageFun"></Page>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>
<script>
	import api from '@/api/api'
	import companyInfo from '@/page/MemberManageMent/companyInfo'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			companyInfo,
			tis: tis
		},
		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,
				id: {}, //选中的id
				cityList2: '',
				companyId: "",
				modifyModel: false,
				deleteModel: false,
				addModel: true,
				search_nap: '', //搜索
				search_nap1: '',
				selArry: [], //新增
				pageInfo: {
					name: '', //公司
					count: 10,
					page: 1, //page
					rows: 10 //rows
				},
				pageInfo2: {
					legalPerson: '', //法人
					count: 10,
					page: 1, //page
					rows: 10 //rows
				},
				pageInfo3: {
					mobile: '', //手机号
					count: 10,
					page: 1, //page
					rows: 10 //rows
				},
				pageInfo4: {
					status: '',
					count: 10,
					page: 1, //page
					rows: 10 //rows
				},
				columnsInfo: [
                    {type: 'selection', width: 30, align:'center'},
					{title: '序号', type: 'index2', width: 30,
						render: (h, params) => {
							return h('span', params.index + 1 + (this.pageInfo.page - 1) * (this.pageInfo.rows));
						}
					},
					{title: '公司名称',	key: 'name', width: 130, ellipsis: true,
						render: function(h, params) {
							return h('span', {
									attrs: {title: params.row.name},
									domProps: {innerHTML: params.row.name}
								})
						}
					},
					{title: '联系人', key: 'contact', width: 60},
					{title: '联系电话',	key: 'telephone', width: 80},
					{title: '地址',	key: 'address',	width: 130,	className: 'textOver', ellipsis: true,
						render: function(h, params) {
							return h('span', {
									attrs: {title: params.row.address},
									domProps: {innerHTML: params.row.address}
								})
						}
					},
					{title: '状态',	key: 'status', className: 'textOver2', width: 50,
						render: function(h, params) {
							var str = "",
								className = "";
							switch(params.row.status) {
								case "0":
									str = "未认证";
									className = "notAudited";
									break;
								case "5":
									str = "认证中";
									className = "audit";
									break;
								case "2":
									str = "认证未通过";
									className = "audit";
									break;
								case "1":
									str = "认证通过";
									className = "audit";
									break;
								case "7":
									str = "已禁用";
									className = "audit";
									break;
							}
							return h('div', [
								h('span', {
									attrs: {class: className},
									domProps: {innerHTML: str}
								}),
							]);
						}
					},
					{title: '操作',	key: 'action', align: 'center',	className: 'textOver2',	width: 60,
						render: (h, params) => {
							if(params.row.status == "5") {
								return h(
									'div', {
										style: {'text-align': 'center',}
									}, [
										h('Button', { //跳转审核页面
											style: {
												'margin-left': '-5px',
												border: '1px solid #d9d9d9',
												backgroundColor: '#f7f7f7'
											},
											attrs: {'v-show': false},
											props: {type: 'text',size: 'small',},
											on: {click: () => {this.auditingCom(params.index)}}
										}, '认证'),
									],
								);
							} else {
								return h('div', {
									style: {'text-align': 'center'}
								}, [
									h('Button', {
										style: {
											'margin-left': '-5px',
											border: '1px solid #d9d9d9',
											backgroundColor: '#f7f7f7'
										},
										props: {type: 'text',size: 'small'},
										on: {click: () => {this.modifyFun(params.index)}}
									}, '查看'),
								]);
							}
						}
					}
				],
				companyArry: [],
				pageInfos: ''
			}
		},
		created() {
			this.creat_z();
		},
		methods: {
            addCorp(){
                this.$router.push('/sys/corp/add');
            },
			creat_z() {
				const _this = this;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.companyQuery,
						data: api.convertParam(_this.pageInfo),

					})
					.then(function(res) {
							console.log('-----',res)
						_this.companyArry = res.data.datas.list;
						_this.pageInfo.count = res.data.datas.total;
						_this.pageInfo.rows = res.data.datas.pageSize;
						_this.pageInfo.page = res.data.datas.pageNum;
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			search_message_phone() {
				let _this = this;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.companyQuery,
						data: api.convertParam(_this.pageInfo3), //手
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.companyArry = res.data.datas.list;
							_this.pageInfo.count = res.data.datas.total;
							_this.pageInfo.rows = res.data.datas.pageSize;
							_this.pageInfo.page = res.data.datas.pageNum;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},

			search_message_name() {
				let _this = this;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.companyQuery,
						data: api.convertParam(_this.pageInfo),
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.companyArry = res.data.datas.list;
							_this.pageInfo.count = res.data.datas.total;
							_this.pageInfo.rows = res.data.datas.pageSize;
							_this.pageInfo.page = res.data.datas.pageNum;
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			search_message() {
				let _this = this;
				var reg = /^\d+$/;

				if(reg.test(_this.search_nap) == true) {
					//alert("都是数字！通过");
					_this.pageInfo3.mobile = _this.search_nap;
					_this.search_message_phone();
				}
				//				else if(_this.search_nap == ''){
				//						setTimeout(() => {
				//										_this.$router.go(0)
				//									}, 300);
				//				}
				else {
					_this.pageInfo.name = _this.search_nap;
					//						_this.pageInfo.legalPerson = _this.search_nap1;
					_this.search_message_name();

				}

			},
			//状态下啦
			search_message_status(index) {
				let _this = this;
				_this.pageInfo4.status = _this.cityList2;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.companyQuery,
						data: api.convertParam(_this.pageInfo4),
					})
					.then(function(res) {
						//						console.log("????!!!");
						//						console.log(_this.pageInfo4);
						//						console.log(res);
						if(res.data.status == 1) {
							_this.companyArry = res.data.datas.list;
							_this.pageInfo.count = res.data.datas.total;
							_this.pageInfo.rows = res.data.datas.pageSize;
							_this.pageInfo.page = res.data.datas.pageNum;

						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			//获取选中的对象数据(表格单选框)
			selectFun(selection) {
				this.selArry = selection;
			},
			//新增企业
			addFun() {
				let _this = this;
				let froze = [];
				let frozeid = '';
				for(let i = 0; i < _this.selArry.length; i++) {
					console.log("id" + _this.selArry[i].id);
					froze.push(_this.selArry[i].id)
				}

				_this.id = froze.toString();
				var companyData = {
					name: '',
					shortName: '',
					englishName: '',
					keyId: '',
					address: '',
					contact: '',
					telephone: '',
					fax: '',
					postCode: '',
					bankName: '',
					bankAccount: '',
					taxNumber: '',
					shortName: '',
					invoiceTitle: ''
				}

				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.freezeenterpriseheader + _this.id + api.freezeenterprisetail
					})
					.then(function(res) {
						//debugger
						console.log(res.data);
						if(res.data.status == '1') {
							_this.do_yn = true;
							_this.re_do = "冻结成功";
							setTimeout(() => {
								_this.do_yn = false;

							}, 2000);

							//							_this.$Message.success("冻结成功");
							//							console.log("成功" + res.data);
							//								this.$router.push({
							//									path: "/companyInfo",
							//									query: companyData
							//								});
							setTimeout(() => {
								_this.$router.push({
									path: "/companyInfo",
									query: companyData
								})
							}, 2000);
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

//							_this.$Message.error(res.data.message);
						}

					})
					.catch(function(error) {
						console.log("error");
					});

			},
			//删除企业
			deleteFun() {
				let _this = this;
				let froze = [];
				let frozeid = '';
				for(let i = 0; i < this.selArry.length; i++) {
					froze.push(this.selArry[i].id)
				}
				this.id = froze.toString();
				for(var i = 0; i < this.selArry.length; i++) {
					for(var j = 0; j < this.companyArry.length; j++) {
						//判断对象是否相等
						if(JSON.stringify(this.selArry[i]) == JSON.stringify(this.companyArry[j])) {
							let _this = this;
							//数据绑定//
							let deletes = api.odelete + froze + api.odelete_h;
							this.axios(deletes)
								.then(function(res) {
									if(res.data.status == 1) {
										_this.do_yn = true;
										_this.re_do = "删除成功";
										setTimeout(() => {
											_this.do_yn = false;
										}, 2000);
									} else {
										_this.do_no = true;
										_this.re_do = res.data.message;
										setTimeout(() => {
											_this.do_no = false;

										}, 2000);

//										_this.$Message.error(res.data.message);
									}
								})
								.catch(function(err) {
									console.log(err);
								})

							this.companyArry.splice(j, 1); //删除对象
						}
					}
				}
			},
			//查看企业详情
			modifyFun(index) {
				var companyId = this.companyArry[index].id;
				this.$router.push({
					path: "/companyInfo",
					query: {
						companyId: companyId
					}
				});
			},
			//审核企业信息
			auditingCom(index) {
				var companyId = this.companyArry[index].id;
				//console.log(companyId);
				this.$router.push({
					path: '/auditing',
					query: {
						companyId: companyId
					}
				});
				//params与query的区别在于,params需要用name来引入路由，不然传过来的值就是undefined
				//this.$router.push({name:'auditing',params:{companyId:companyId}});
			},
			pageFun(x) {
				const _this = this;
				_this.pageInfo.page = x;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.companyQuery,
						data: api.convertParam(_this.pageInfo),

					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.companyArry = res.data.datas.list;
							_this.pageInfo.count = res.data.datas.total;
							_this.pageInfo.rows = res.data.datas.pageSize;
							_this.pageInfo.page = res.data.datas.pageNum;
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			handleSelectAll(status) {
				this.$refs.selection.selectAll(status);
			}
		}
	}
</script>
<style type="text/css">
	.ivu-btn-text:hover {
		background: #fff;
		border: 1px solid;
	}
	
/*总体列表样式存放*/
	
	
 .ivu-table-header,
 .ivu-table-fixed-right{
	position: absolute;
		top:0px;
		right: 0;
		left: 0;
		/*bottom: 20%;*/
		/*height: 80%;*/
		overflow: auto;
		overflow-x:auto ;
		z-index: 100;
}
.ivu-table-fixed-right{
		height: 100%;
}
/*.ivu-table-body,.ivu-table-fixed-body{
	position: absolute;
		top:50px;
		right: 0;
		left: 0;
		bottom: 20%;
		height:80%;
		overflow: auto;
		overflow-x:auto ;
}*/
.ivu-table-body{
		position: absolute;
		top:50px;
		right: 0;
		left: 0;
		bottom: 20px;
		height:86%;
		overflow: auto;
		/*overflow-x:hidden;
		overflow-y: scroll;*/
		overflow-y:auto;
		overflow-x: scroll; 
		/*padding-bottom:230px;*/
}
.ivu-table-fixed-body{
		position: absolute;
		top:0px;
		right: 0;
		left: 0;
		/*bottom: 20%;*/
		height:82%!important;
		overflow: auto;
		overflow-y:hidden;
		overflow-x: scroll; 
		border: none;
		/*padding-bottom: 420px;*/
}
@media only screen and (min-width: 1680px) {
	.ivu-table-fixed-body{
	
		height:85%!important;

}
/* .ivu-table{
	min-height: 680px !important;
} */
}
.ivu-table-fixed-body::-webkit-scrollbar {
    display: none;
}
.ivu-table-fixed-body{
	/*padding-bottom: 80px;*/
	
}
.ivu-table-fixed::before, .ivu-table-fixed-right::before{
	   content: '';
    width: 100%;
    height: 0px !important;
    background-color: #dddee1;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 4;

}
.ivu-table-fixed-right{
	box-shadow: none!important;
}
		.ivu-table-body::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 1px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 10px;
	}
	
	
	
	.ivu-table-body::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 10px;
		/* -webkit-box-shadow: inset 0 0 5px #b0c0d0;*/
		background: #b0c0d0;
	}
	
	.ivu-table-body::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		/*-webkit-box-shadow: inset 0 0 5px #b0c0d0;*/
		border-radius: 10px;
		background: #fff;
	}
</style>
<style scoped>
	.companyList .ivu-table-cell,
	.companyList .ivu-btn-text {
		font-size: 14px;
	}
	
	.companyList .ivu-btn {
		font-size: 14px;
	}
	
	.tbClass {
		margin-top: 60px;
	}
/* 	
	.textOver span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		display: block;
	} */
	
	.notAudited {
		/*未审核显示红色*/
		color: red;
	}
	
	.audit {
		/*审核中显示橙色*/
		color: #fc8541;
	}
	
	.ivu-checkbox-wrapper {
		margin-right: 0!important;
	}

	.search_span_box {
		display: flex;
		align-items: center;
	}
	
	.sel_sta {
		width: 106px;
		height: 35px;
		margin-right: 20px;
		font-size: 14px;
		color: #495060;
		border: 1px solid #dddee1;
		border-radius: 5px;
		padding: 0 7px;
	}
	
	.sel_sta:hover {
		border-color: #269edc;
	}
	
	@media only screen and (min-width: 980px) and (max-width: 1270px) {
		.right_home_warp_box {
			width: 840px;
		}
		.search_nap {
			width: 180px;
		}
		@media only screen and (min-width:1280px) {
			.search_nap {
				width: 300px;
			}
		}
	}
	
	.asasa{
		position: absolute;
		top: 20px;
		left: 20px;
		right: 20px;
		height: 50px;
	}
	.tableList{
		/*position: absolute;
		top: 50px;
		left: 20px;
		right: 30px;
		height: 80%;
		overflow: auto;
		overflow-x:auto ;*/
	}

</style>
