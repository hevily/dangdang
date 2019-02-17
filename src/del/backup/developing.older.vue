<template>
	<div class="modifyPsw">
		<Breadcrumb style="padding-left: 2px;">
			<Breadcrumb-item><span class="link_span">首页</span></Breadcrumb-item>
			<Breadcrumb-item><span class="link_span">组织</span></Breadcrumb-item>
			<!--<Breadcrumb-item>信息提示</Breadcrumb-item>-->
			<Breadcrumb-item><span class="link_span ok_link">组织与用户</span></Breadcrumb-item>
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
		<div class="right_home_warp test-1">
			<div class="three_span">
				<span style="color: #0083c0;">员工账号</span>
				<span @click="depa">部门设置</span>
				<span @click="deve">员工权限设置</span>
			</div>
			<div class="selectdiv">
				<div class="select_left">
					<!--@on-change="casterok($event)"-->
					<Cascader class="cas_dev" placeholder="请选择部门" v-model='Cascaderval' :value='Cascaderval2' :data="depList" :render-format="format" change-on-select></Cascader>
					<!--<Select placeholder="所有部门">
						<Option></Option>
					</Select>-->
					<select class="sel_sta" v-model="cityList2" @change='search_message_status'>
						<option value="2">全部状态</option>
						<option value="0">冻结</option>
						<option value="1">启用</option>
					</select>
					<span>搜索</span>
					<input class="search-input" type="text" v-model="search_nap" placeholder="请输入员工姓名/手机号"/>
					<button class="search-btn" @click="search_message"><Icon type="search"></Icon></button>
				</div>
				<div class="select_right">
					<button class="btn-del" @click="del_new">删除</button>
					<button class="btn-new" @click="developing_new">添加人员</button>
				</div>
			</div>
			<Table size="small" highlight-row border :row-class-name="tableClassName" :columns="columnsInfo" :data="companyArry" @on-select="selectFun" ref="selection"></Table>
			<div class="page-bot">
				<Page :total="pageInfo.count" :current="pageInfo.page" :page-size="pageInfo.rows" show-elevator @on-change="pageFun"></Page>
			</div>
		</div>
	</div>

</template>
<script>
	import api from '@/api/api'
	export default {
		created() {
			const _this = this;
			_this.axios({
					method: 'post',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: api.subordinate,
					data: api.convertParam(_this.pageInfo),

				})
				.then(function(res) {
					if(res.data.status == 1) {
						_this.companyArry = res.data.datas.list;
						_this.pageInfo.count = res.data.datas.total;
						_this.pageInfo.rows = res.data.datas.pageSize;
						_this.pageInfo.page = res.data.datas.pageNum;
					} else {
						_this.$Message.error(res.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
			_this.axios({
					method: 'get',
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: api.sysDepartment + api.sysDepartmentFetchAsTree,
					// url : '/prize',
				})
				.then(function(res) {
					if(res.data.status == 1) {
						if(res.data.datas == '') {
							res.data.datas.unshift({
								children: '',
								code: "1",
								corpId: "",
								description: "暂无部门",
								id: "",
								idTree: "-1",
								label: "暂无部门",
								leaf: false,
								leafNode: 0,
								level: 1,
								name: "暂无部门",
								orderNum: 1,
								parentId: "-1",
								value: ""
							})
						} else {
							res.data.datas.unshift({
								children: '',
								code: "1",
								corpId: "",
								description: "全部部门",
								id: "",
								idTree: "-1",
								label: "全部部门",
								leaf: false,
								leafNode: 0,
								level: 1,
								name: "全部部门",
								orderNum: 1,
								parentId: "-1",
								value: ""
							})
						}

						_this.depList = res.data.datas;
					}
				})
		},
		data() {
			return {
				select_zt: '',
				Cascaderval: [],
				Cascaderval2: [],
				depList: [],
				id: '',
				isshow: false,
				cityList2: 2,
				search_nap: '',
				selArry: [],
				companyArry: [],
				userInfo: {
					id: '', //用户ID
					//corpId: '', //忽略
					name: '', //用户姓名
					//loginName: '', //登陆名称
					mobile: '', //手机号
					email: '', //电子邮件
					//qq: '', //QQ
					title: '', //职务
					departmentId: '',
					departmentName: '', //部门名称
					//jobNumber: '', //工号
					idCardNo: '', //身份证号
					//roleNam: '', //角色名称
					sex: '1', //1,男性，2、女性
					address: '' //现居地址
				},
				pageInfo: {
					name: '',
					count: 10,
					page: 1, //page
					rows: 10 //rows

				},
				pageInfo2: {
					department: '',
					count: 10,
					page: 1, //page
					rows: 10 //rows

				},
				pageInfo3: {
					mobile: '',
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
                    {type: 'selection',width: 50,align: 'center',},
					{title: '姓名',key: 'name',},
					{title: '职位',key: 'title'},
					{title: '部门',key: 'departmentName'},
					{title: '手机号码',key: 'mobile'},
					{title: '邮箱',key: 'email'},
					{title: '状态',key: 'state',
						render: (h, params) => {
							if(params.row.status == 1) {
								return h(
									'div', {
										style: {'padding-left': '1px',}
									}, [
										h('Button', { //跳转审核页面
											style: {color: '#fc8541',},
											attrs: {'v-show': false},
											props: {type: 'text',size: 'small',},
											on: {click: () => {this.state_click_s(params.index)}}
										}, '启用'),
									],
								);
							} else {
								return h('div', {
									style: {'padding-left': '1px'}
								}, [
									h('Button', {
										props: {type: 'text',size: 'small'},
										on: {click: () => {this.state_click(params.index)}}
									}, '冻结'),
								]);
							}
						}
					},
					{title: '操作',
						render: (h, params) => {
							return h('div', [
								h('span', {
									style: {marginRight: '5px'},
									on: {click: () => {this.modifyFun(params.index);}}
								}, '编辑')
							]);
						}
					}
				],
				companyArry: []
			}
		},
		methods: {
			tableClassName (row, index) {
                if (row.title === '管理员') {
                    return 'managertable';
                }else{
                	 return 'wrokertable';
                }
            },
			format(labels, selectedData) {
				const _this = this;
				const index = labels.length - 1;
				const data = selectedData[index] || false;
				if(data && data.code) {
					if(data.name == "全部部门") {
						_this.pageInfo.name = '';
						_this.axios({
								method: 'post',
								header: {"Content-Type": 'application/x-www-form-urlencoded'},
								url: api.subordinate,
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
					} else {
						_this.userInfo.departmentId = data.id;
						_this.userInfo.departmentName = labels[index];
						_this.pageInfo2.department = data.id;
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.subordinate,
								data: api.convertParam(_this.pageInfo2),

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
						return labels[index]; //+ ' - ' + data.code
					}

				}
				return labels[index];

			},
			//获取选中的对象数据(表格单选框)
			selectFun(selection) {
				console.log(selection);
				this.selArry = selection;
			},
			search_message() {
				let _this = this;
				var reg = /^\d+$/;

				if(reg.test(_this.search_nap) == true) {
					//alert("都是数字！通过");
					_this.pageInfo3.mobile = _this.search_nap;
					_this.search_message_phone();
				} else {
					//alert("不是纯数字！失败！");
					_this.pageInfo.name = _this.search_nap;
					_this.search_message_name();
				}

			},
			modifyFun(index) {
				var companyId = this.companyArry[index].id;
				var a = this.companyArry[index];
				var aa = {}
				aa.mobile = a.mobile;
				aa.name = a.name;
				aa.id = a.id;
				aa.email = a.email;
				aa.title = a.title;
				aa.departName = a.departName;
				aa.idCardNo = a.idCardNo;
				aa.sex = a.sex;
				aa.address = a.address;
				aa.departmentId = a.departmentId;
				aa.departmentName = a.departmentName;
				//				aa.departmentval= a.value;
				this.$router.push({
					path: "/developing/add",
					query: {
						companyId: companyId,
						aa
					}
				});
			},
			developing_new() {
				let _this = this;
				_this.$router.push({
					path: '/developing/add'
				});
			},
			rowClassName(row, index) {
				if(index === -1) {
					return 'table_title';
				}
				return '';
			},
			depa() {
				let _this = this;
				_this.$router.push({
					path: '/department'
				});
			},
			deve() {
				let _this = this;
				_this.$router.push({
					path: '/developing_detailed'
				});
			},
			//启用
			state_click(index) {
				let _this = this;
				var companyId = _this.companyArry[index].id;
				_this.axios({
						method: 'get',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.state_user + companyId + api.state_user_q
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.$Message.success('成功启用');
							setTimeout(() => {
								_this.$router.go(0)
							}, 2000);
						} else {
							_this.$Message.error(res.data.message);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//禁用
			state_click_s(index) {
				let _this = this;
				var manager = _this.companyArry[index].title;
				var companyId = _this.companyArry[index].id;
				
				if(manager == '管理员') {
					_this.$Message.error("不能冻结管理员！");
				} else {
					_this.axios({
							method: 'get',
							header: {
								"Content-Type": 'application/x-www-form-urlencoded'
							},
							url: api.state_user + companyId + api.state_user_h
						})
						.then(function(res) {
							if(res.data.status == 1) {
								_this.$Message.success('冻结成功');
								setTimeout(() => {
									_this.$router.go(0)
								}, 2000);
							} else {
								_this.$Message.error(res.data.message);
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				}
			},
			//删除
			del_new() {
				let _this = this;
				var manager;
				let froze = [];
				//				let frozeid =  froze.id;
				for(let i = 0; i < this.selArry.length; i++) {
					froze.push(this.selArry[i].id);
					manager = this.selArry[i].title;
				}
				if(manager == '管理员') {
					_this.$Message.error("不能删除管理员！");
				} else {
					this.id = froze.toString();
					console.log(this.id);
					for(var i = 0; i < this.selArry.length; i++) {
						for(var j = 0; j < this.companyArry.length; j++) {
							//判断对象是否相等
							if(JSON.stringify(this.selArry[i]) == JSON.stringify(this.companyArry[j])) {
								//数据绑定//
								let deletes = api.state_user + this.id + api.belByid;
								this.axios(deletes)
									.then(function(res) {

										if(res.data.status == 1) {
											_this.$Message.success('删除成功');
											//											setTimeout(() => {
											//												_this.$router.go(0)
											//											}, 2000);
										} else {
											_this.$Message.error(res.data.message);
										}
									})
									.catch(function(err) {
										console.log(err);
									})

								this.companyArry.splice(j, 1); //删除对象
							}
						}
					}
				}

			},

			search_message_name() {
				let _this = this;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.subordinate,
						data: api.convertParam(_this.pageInfo),
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.companyArry = res.data.datas.list;
							_this.pageInfo.count = res.data.datas.total;
							_this.pageInfo.rows = res.data.datas.pageSize;
							_this.pageInfo.page = res.data.datas.pageNum;
						} else {
							_this.$Message.error(res.data.message);
						}
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
						url: api.subordinate,
						data: api.convertParam(_this.pageInfo3),
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
			search_message_status(index) {
				let _this = this;
				_this.pageInfo4.status = _this.cityList2;
				_this.axios({
						method: 'post',
						header: {
							"Content-Type": 'application/x-www-form-urlencoded'
						},
						url: api.subordinate,
						data: api.convertParam(_this.pageInfo4),
					})
					.then(function(res) {

						if(res.data.status == 1) {
							_this.companyArry = res.data.datas.list;
							_this.pageInfo.count = res.data.datas.total;
							_this.pageInfo.rows = res.data.datas.pageSize;
							_this.pageInfo.page = res.data.datas.pageNum;
						} else {
							_this.$Message.error(res.data.message);
						}
					})
					.catch(function(error) {
						console.log(error);
					});

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
							_this.$Message.error(res.data.message)
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}

		}
	}
</script>
<style>
	.modifyPsw {
		left: 0!important;
	}
	
	.three_span {
		border-bottom: 1px solid #ccd9e6;
		padding: 0px 0 20px 0;
		margin-bottom: 20px;
	}
	
	.three_span span {
		margin-right: 80px;
		font-size: 16px;
	}
	
	.three_span span:hover {
		color: #0083c0;
		cursor: pointer;
	}
	
	.selectdiv {
		margin-bottom: 20px;
		display: flex;
		display: -webkit-flex;
		align-content: center;
		justify-content: space-between;
	}
	
	.selectdiv .select_left,
	.select_right {
		display: flex;
		display: -webkit-flex;
		align-content: center;
		width: auto;
	}
	
	.selectdiv .select_left div {
		width: 106px;
		margin-right: 20px;
		text-align: center;
		border-radius: 0;
	}
	
	.ivu-select-placeholder {
		font-size: 14px!important;
		color: #626262!important;
	}
	
	.table_title {
		background-color: #3bbcff;
		color: white;
	}
	
	.dev_table {
		width: 100%;
	}
	
	.dev_table tr th {
		background-color: #3bbcff;
		color: white;
		width: 12vw;
		height: 40px;
		font-weight: normal!important;
		font-size: 14px;
	}
	
	.dev_table tr td {
		width: 12vw;
		height: 50px;
		text-align: center;
		border-bottom: 1px solid #d8e1ea;
		font-size: 14px;
		position: relative;
		font-weight: normal!important;
	}
	
	.dev_table tr td span {
		color: #0a96df;
	}
	
	.dev_table tr td span:hover {
		cursor: pointer;
	}
	
	.dev_table tr td label {
		position: absolute;
		cursor: pointer;
		left: 0;
	}
	
	.dev_table tr td label input {
		cursor: pointer;
		opacity: 0;
		position: absolute;
	}
	
	.dev_table tr td label input:checked+.show-box {
		background: #15afff;
	}
	
	.dev_table tr td label .show-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 17px;
		height: 17px;
		border-radius: 2px;
		border: 1px solid #d8d8d8;
		background: white;
	}
	
	.dev_table tr td label .show-box:before {
		content: '';
		position: absolute;
		top: 2px;
		left: 4px;
		width: 7px;
		height: 9px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}
	
	.Bread_ri {
		position: absolute;
		top: 12px;
		right: 15px;
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
	
	.cas_dev div div input {
		height: 32px!important;
	}
	
	.sel_sta {
		width: 106px;
		height: 32px;
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
	
	.cas_dev div div span .ivu-cascader-menu {
		height: auto!important;
		max-height: 180px!important;
		background-color: #fff;
		box-shadow: 0 0 5px 1px #eeeeee;
	}
	
	::-webkit-input-placeholder {
		/* WebKit, Blink, Edge */
		color: #ccd9e6!important;
	}
	
	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #ccd9e6!important;
	}
	
	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #ccd9e6!important;
	}
	
	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #ccd9e6!important;
	}
	.managertable td:nth-child(2){
		background-color: #2d8cf0!important;
	}
	.wrokertable td button{
		display: none!important;
	}
</style>
<style scoped>
	.ivu-checkbox-wrapper {
		margin-right: 0!important;
	}
	
</style>