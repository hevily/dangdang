<template>
	<div class="addCustomer">
		<Breadcrumb>
				<Breadcrumb-item>
					<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
				</Breadcrumb-item>
			<Breadcrumb-item>
				<router-link to='/applyCustomerList'>
					供应商申请列表
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>添加供应商</Breadcrumb-item>
		</Breadcrumb>
        <div>
		<Form ref="customer" :model="customer" :rules="ruleValidate" :label-width="85">
			<Row>
				<Col span="24" class='span8'>
				<Form-item label="供应商名称:" prop="name">
					<Input v-model="customer.name" placeholder="请输入供应商名称" style='width : 200px;'></Input>
					<Button type="info" @click='queryClient'>搜索</Button>
					<!-- 选择页面 @click='select' -->
				</Form-item>
				</Col>
				<Col span="8" class='span8'>
				<Form-item label="联系人:" prop="people">
					<Input v-model="customer.people" disabled></Input>
				</Form-item>
				</Col>
				<Col span="8" class='span8'>
				<Form-item label="电话:" prop="phone">
					<Input v-model="customer.phone" disabled></Input>
				</Form-item>
				</Col>

				<Col span="16" class='span8'>
				<Form-item label="地址:" prop="addr">
					<Input v-model="customer.addr" disabled></Input>
				</Form-item>
				</Col>
				<Col span="16" class='span8'>
				<Form-item label="添加理由:" prop="applyReason">
					<Input v-model="customer.applyReason" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入..."></Input>
				</Form-item>
				</Col>

			</Row>
		</Form>
		<div class="appendixUpload">
			<label class="uploadLabel" style='width:80px;text-align:right;'>相关文件</label>
			<Upload :action="uploadUrl" class='inline-block' :on-success="attachmentsSuccess" :headers='uploadHeader' :data='uploadData' :default-file-list="defaultList" :on-remove='handleRemoveUpload'>
				<Button type="ghost" icon="ios-cloud-upload-outline">添加附件</Button>
			</Upload>
		</div>
		<Row type="flex" class="code-row-bg addFooter">
			<!-- <Button type="info" @click="save">保存</Button> -->

			<Button type="warning" @click="submitAudit" style="margin-left: 280px">添加</Button>

		</Row>

		<Modal v-model="customerListModel" title="选择客户" width='800' @on-ok='selectOk'>
			<Row>
				<Col span='24'>
				<span>公司名称：</span>
				<Input placeholder="产品名称/编码" style="width: 230px" v-model='name'></Input>

				<Button type="warning" @click='query'>查询</Button>

				</Col>
			</Row>
			<div>
				<!-- <div class="table">
                    <div class="table-header">
                        <div class="table-td">请选择</div>
                        <div class="table-td">客户名称</div>
                        <div class="table-td">联系人</div>
                        <div class="table-td">电话</div>
                        <div class="table-td">地址</div>
                    </div>
                    <div class="table-tbody">
                        <div class="table-tr" v-for='(item,index) in customerList' :key='index'>
                            <div class="table-td">
                                <Checkbox label="香蕉"></Checkbox>
                            </div>
                            <div class="table-td">
                                {{item.name}}
                            </div>
                            <div class="table-td">
                                {{item.contact}}
                            </div>
                            <div class="table-td">
                                {{item.telephone}}
                            </div>
                            <div class="table-td">
                                {{item.address}}
                            </div>
                        </div>
                    </div>
                </div> -->
				<Table :columns="tableModle" :data="customerList" highlight-row @on-current-change='customerSelect'></Table>
			</div>
			<Row type="flex" justify="end">
				<Page :total="total" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
			</Row>
		</Modal>

		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>

<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			tis: tis
		},

		name: 'addCustomer',
		mounted() {
			const _this = this;
			this.DOM = {
				content: document.getElementById('content'),
			};
			this.$store.commit('addCustomerListPage', 1);
			this.axios({
					method: 'post',
					url: api.baseCorp + api.queryAllPost,
					data: api.convertParam(this.data)
				})
				.then(function(res) {
					console.log(res);
					_this.customerList = res.data.datas.rows;
					_this.total = res.data.datas.total;
				})
				.catch(function(err) {
					console.log(err);
				})

			if(this.$route.query.id) {
				const id = this.$route.query.id;
				this.isModify = true;
				this.axios(api.cooperation + id + api.queryById)
					.then(function(res) {
						const data = res.data.datas;
						_this.customer.id = data.id;
						_this.customer.name = data.customerCorpName;
						_this.customer.people = data.contact;
						_this.customer.phone = data.telephone;
						_this.customer.addr = data.address;
						_this.customer.customerId = data.customerCorpId;
						_this.customer.applyReason = data.applyReason;
						_this.customer.attachmentName = data.attachmentName;
						_this.customer.attachmentUrl = data.attachmentUrl;
						if(data.attachmentName && data.attachmentUrl) {
							_this.defaultList.push({
								name: data.attachmentName,
								url: data.attachmentUrl,
							});
							_this.uploadList = _this.defaultList;
						}
					})
					.catch(function(err) {
						console.log(err);
					})
			}
		},
		data() {
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

				DOM: {},
				isModify: false,
				customer: {
					customerId: '',
					name: '',
					people: '',
					phone: '',
					addr: '',
					applyReason: '',
					attachmentName: '', // 附件名称
					attachmentUrl: '', // 附件地址
				},
				ruleValidate: {
					applyReason: [{
						type: 'string',
						max: 1000,
						message: '申请理由最多1000个字',
						trigger: 'change'
					}]
				},
				customerListModel: false,
				uploadUrl: api.uploadFileUrl,
				uploadData: {
					path: 'product'
				},

				defaultList: [],
				uploadList: [],

				name: '',
				tableModle: [

					{
						title: '客户名称',
						key: 'name'
					},
					{
						title: '联系人',
						key: 'contact'
					},
					{
						title: '电话',
						key: 'telephone'
					},
					{
						title: '地址',
						key: 'address'
					}

				],
				selectCust: '',
				customerList: [],
				total: 30,
			}
		},
		computed: {
			uploadHeader: function() {
				const tokenId = this.$store.state.token;
				return {
					token_id: tokenId
				}
			},
			data: function() {
				return {
					name: this.name,
					pageStart: this.$store.state.page.addCustomerListPage,
					pageNums: this.$store.state.pageNums,
				};
			}
		},
		methods: {
			queryClient() {
				const _this = this;
				if(this.customer.name) {
					const name = {
						name: this.customer.name
					}
					this.axios({
							method: 'post',
							url: api.baseCorp + api.baseCorpBykeyWords,
							data: api.convertParam(name)
						})
						.then(function(res) {
							if(res.data.status == 1) {
								_this.customer.name = res.data.datas.name;
								_this.customer.people = res.data.datas.contact;
								_this.customer.phone = res.data.datas.telephone;
								_this.customer.addr = res.data.datas.address;
								_this.customer.customerId = res.data.datas.id;
							} else {
								_this.$Message.warning(res.data.message);
							}
						})
						.catch(function(err) {
							console.log(err);
						})
				} else {
					_this.do_no = true;
					_this.re_do = '请输入客户名称e;
					setTimeout(() => {
						_this.do_no = false;

					}, 2000);

					//this.$Message.error('请输入客户名称');
				}
			},
			select() {
				this.customerListModel = true;
			},
			attachmentsSuccess(res, file, fileList) {
				console.log(fileList);
				if(fileList.length > 1) {
					fileList.splice(0, 1);
				}
				this.customer.attachmentName = res.fileName;
				this.customer.attachmentUrl = res.url;
				this.uploadList = fileList;
			},
			/*handleBeforeUpload () {
			    const check = this.uploadList.length < 1;
			    if (!check) {
			        this.$Notice.warning({
			            title: '最多只能上传 1 个附件。'
			        });
			    }
			    return check;
			},*/
			handleRemoveUpload(file, fileList) {
				this.uploadList = fileList;
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						//this.$Message.success('提交成功!');
						_this.do_yn = true;
						_this.re_do = "提交成功";
						setTimeout(() => {
							_this.do_yn = false;

						}, 2000);

					} else {
						_this.do_no = true;
						_this.re_do = '表单验证失败';
						setTimeout(() => {
							_this.do_no = false;

						}, 2000);

						// this.$Message.error('表单验证失败!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			customerSelect(data) {
				console.log(data);
				this.selectCust = data;
			},
			selectOk() {
				this.customer.name = this.selectCust.name;
				this.customer.people = this.selectCust.contact;
				this.customer.phone = this.selectCust.telephone;
				this.customer.addr = this.selectCust.address;
				this.customer.customerId = this.selectCust.id;
			},
			toPage(count) {
				const _this = this;
				this.$store.commit('addCustomerListPage', count);

				this.axios({
						method: 'post',
						url: api.baseCorp + api.queryAllPost,
						data: api.convertParam(this.data)
					})
					.then(function(res) {
						console.log(res);
						_this.customerList = res.data.datas.rows;
						_this.total = res.data.datas.total;
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			query() {
				const _this = this;
				if(!this.data.name) {
					this.$Message.warning('请输入查询条件');
					return;
				}
				this.$store.commit('addCustomerListPage', 1);

				this.axios({
						method: 'post',
						url: api.baseCorp + api.queryAllPost,
						data: api.convertParam(this.data)
					})
					.then(function(res) {
						// console.log(res);
						_this.customerList = res.data.datas.rows;
						_this.total = res.data.datas.total;
					})
					.catch(function(err) {
						console.log(err);
					})
			},
			save() {
				const _this = this;
				// console.log(this.customer);

				if(this.isModify) {
					this.axios({
							method: 'post',
							url: api.customer + api.modify,
							data: api.convertParam(this.customer)
						})
						.then(function(res) {
							// console.log(res);
							if(res.data.status == 1) {
								_this.$router.push('/cooperation/customer/add');
							} else {
								_this.do_no = true;
								_this.re_do = res.data.message;
								setTimeout(() => {
									_this.do_no = false;

								}, 2000);

								//  _this.$Message.error(res.data.message);
							}
						})
						.catch(function(err) {
							console.log(err);
						})
				} else {
					this.axios({
							method: 'post',
							url: api.customer + api.add,
							data: api.convertParam(this.customer)
						})
						.then(function(res) {
							if(res.data.status == 1) {
								_this.$router.push('/cooperation/customer/add');
							} else {
								_this.do_no = true;
								_this.re_do = res.data.message;
								setTimeout(() => {
									_this.do_no = false;

								}, 2000);

								//                             _this.$Message.error(res.data.message);
							}
						})
						.catch(function(err) {
							console.log(err);
						})
				}
			},
			submitAudit() {
				const _this = this;
				console.log(this.customer);
				this.axios({
						method: 'post',
						url: api.addCustomer,
						data: api.convertParam(this.customer)
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.$router.push('/cooperation/customer/add');
						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);
						}

					})
					.catch(function(err) {
						console.log(err);
					})
			}
		}
	}
</script>

<style>
	.addCustomer .appendixUpload label {
		width: 80px;
		text-align: right;
		display: inline-block;
		padding: 10px 12px 10px 0;
		vertical-align: top;
	}
	
	.addCustomer .appendixUpload .inline-block {
		display: inline-block;
		width: 500px;
	}
	
	.addCustomer .ivu-table table {
		width: 100%;
	}
	
	.addCustomer .table-td {
		display: table-cell;
		height: 30px;
		width: auto;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
		padding: 10px 20px;
	}
</style>