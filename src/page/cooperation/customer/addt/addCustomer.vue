<template>
	<div class="addCustomer">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>
				客户列表
			</Breadcrumb-item>
			<Breadcrumb-item>添加客戶</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp test-1">
			<Form ref="customer" :model="customer" :rules="ruleValidate" :label-width="80">
				<Row>
					<Col span="24" class='search-box'>
                        <span>客户名称：</span>
                        <Input v-model="customer.name" placeholder="请输入客户名称" style='width : 510px;margin: 0 15px 0 0;'></Input>
                        <button type="info" class="btn-search" @click='queryClient'>搜索</button>
					</Col>
					<Col span="8" class='span8'>
                        <Form-item label="主联系人" prop="people">
                            <Input v-model="customer.people" disabled></Input>
                        </Form-item>
					</Col>
					<Col span="8" class='span8'>
                        <Form-item label="联系电话" prop="phone">
                            <Input v-model="customer.phone" disabled></Input>
                        </Form-item>
					</Col>

					<Col span="16" class='span8'>
                        <Form-item label="联系地址" prop="addr">
                            <Input v-model="customer.addr" disabled></Input>
                        </Form-item>
					</Col>
					<Col span="16" class='span8'>
                        <Form-item label="添加理由" prop="applyReason">
                            <Input v-model="customer.applyReason" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入..."></Input>
                        </Form-item>
					</Col>
				</Row>
			</Form>
			<div class="sc_box">
				<!--:default-file-list="defaultListagst"-->
				<Upload :action="uploadUrl" class='inline-block' :on-success="attachmentsSuccess" :headers='uploadHeader' :data='uploadData' :on-remove='handleRemoveUpload'>
					<div class="sc_box-div">
						<img src="../../../../assets/img/fj_le.png" />
						<label>添加附件:</label>
						<div style="min-width: 450px;font-size: 14px;">{{ uploadList }}</div>
						<span style="color: rgba(0,0,0,.3);">(产品附件最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF、RAR、ZIP)</span>
					</div>
				</Upload>
			</div>
			<div class="tag">
				<div class="tag-le">
					客户归属：
				</div>
				<div class="tag-ri">
					<div>{{fruit}}</div>
					<div class="tag-ri-bot">
						<div class="tag-ri-so">
							<div>
								<Select v-model="model1" style="width:200px">
									<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</div>
							<div class="tag-ri-so_tow">
								<input class="search-input" type="text" placeholder="产品名称/编码"/>
								<button class="search-btn" @click='query'><Icon type="search"></Icon></button>
							</div>
						</div>
						<div class="tag-ri-so-tag">
							<div>
								<ul>
									<li v-for="(reg,index) in region" track-by="$index" class="ul_zi" :key="index">
										<div>{{reg.title}}</div>
										<div class='aa'>
											<ul class="ul_zi">
												<li v-for="(item,idx) in reg.list" :key="idx">
													<!--<input type="checkbox"  />{{item}}-->
													<CheckboxGroup>
														<Checkbox :label="item"></Checkbox>
													</CheckboxGroup>
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal v-model="customerListModel" title="选择客户" width='800' @on-ok='selectOk'>
				<Row>
					<Col span='24'>
					<span>公司名称：</span>
					<Input placeholder="产品名称/编码" style="width: 230px" v-model='name'></Input>
					<Button type="warning" @click='query'>查询</Button>
					</Col>
				</Row>
				<Table :columns="tableModle" :data="customerList" highlight-row @on-current-change='customerSelect'></Table>
				<Row type="flex" justify="end">
					<Page :total="total" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
				</Row>
			</Modal>
		</div>
		<div class="btn-bot">
			<button class="btn-new" @click="submitAudit">新加</button>
			<button class="btn-cancel" size="large">取消</button>
		</div>
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
				fruit: [],
				count: [0, 1, 2],
				region: [{
						title: '华南地区',
						list: ['成龙', '洪金宝', '元彪', '元华', '元秋', '周润发', '周星驰', '周杰伦', '李小龙']
					},
					{
						title: '华南地区2',
						list: ['成龙3', '洪金宝宝', '元彪', '元华', '元秋', '周润发', '周星驰', '周杰伦', '李小龙', '周星驰', '周杰伦', '李小龙', '周星驰', '周杰伦', '李小龙']
					},
					{
						title: '华南地区3',
						list: ['成龙3', '洪金宝', '元彪', '元华', '元秋', '周润发', '周星驰', '周杰伦', '李小龙']
					},
					{
						title: '华南地区4',
						list: ['成龙4', '洪金宝', '元彪', '元华', '元秋', '周润发', '周星驰', '周杰伦', '李小龙']
					}

				],
				cityList: [{
						value: 'New York',
						label: 'New York'
					},
					{
						value: 'London',
						label: 'London'
					},
					{
						value: 'Sydney',
						label: 'Sydney'
					},
					{
						value: 'Ottawa',
						label: 'Ottawa'
					},
					{
						value: 'Paris',
						label: 'Paris'
					},
					{
						value: 'Canberra',
						label: 'Canberra'
					}
				],
				model1: '',
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
				uploadList: '',

				name: '',
				tableModle: [
					{title: '客户名称', key: 'name'},
					{title: '联系人', key: 'contact'},
					{title: '电话', key: 'telephone'},
					{title: '地址', key: 'address'}
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
			handleAdd() {
				if(this.tag.length) {
					this.tag.push(this.tag[this.tag.length - 1] + 1);
				} else {
					this.tag.push(0);
				}
			},
			handleClose2(event, name) {
				const index = this.count.indexOf(name);
				this.count.splice(index, 1);
			},
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
					_this.re_do = '请输入客户名称';
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
				//				console.log(fileList);
				if(fileList.length > 1) {
					fileList.splice(0, 1);
				}
				this.customer.attachmentName = res.fileName;
				this.customer.attachmentUrl = res.url;
				this.uploadList = fileList[0].name;

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
								_this.do_yn = true;
								_this.re_do = "提交成功";
								setTimeout(() => {
									_this.do_yn = false;
								}, 2000);
//						this.$Message.success('提交成功!');
					} else {
						_this.do_no = true;
						_this.re_do = '表单验证失败';
						setTimeout(() => {
							_this.do_no = false;

						}, 2000);

						//this.$Message.error('表单验证失败!');
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

								//_this.$Message.error(res.data.message);
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

								//_this.$Message.error(res.data.message);
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
							setTimeout(() => {_this.do_no = false;}, 2000);
						}
					})
					.catch(function(err) {
						console.log(err);
					})
			}
		}
	}
</script>
<style type="text/css">
	.addCustomer .ivu-input[disabled],
	fieldset[disabled] .ivu-input {
		color: #333!important;
	}
</style>
<style scoped>
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
	
	.sc_box {
		display: flex;
		padding: 10px;
		background: #f8f9fd;
	}
	
	.sc_box-div {
		display: flex;
		align-items: center;
	}
	
	.sc_box-div>img {
		width: 26px;
		height: 26px;
	}
	
	.sc_box-div>label {
		font-weight: 700;
		font-size: 14px;
		margin: 0 10px;
	}

	.tag {
		margin-bottom: 80px;
		display: flex;
	}
	
	.tag-ri-so-tag>ul>li {
		display: flex;
	}
	
	li.ul_zi {
		border-bottom: 1px solid #e1e7f6;
	}
	
	.ul_zi {
		display: flex;
	}
	
	.ul_zi>div:nth-child(1) {
		width: 90px;
	}
	
	ul.ul_zi {
		width: 940px;
		flex-wrap: wrap;
	}
	
	.ul_zi>li {
		width: 90px;
	}
	
	.tag-le {
		font-size: 14px;
		line-height: 44px;
	}
	
	.tag-ri div:nth-child(1) {
		font-size: 14px;
		line-height: 44px;
	}
	
	.tag-ri-bot {
		border: dashed 1px #ddd;
		padding: 10px;
		width: 1050px;
	}
	
	.tag-ri-so {
		display: flex;
		margin-top: 15px;
	}
	
	.tag-ri-so div:nth-child(1) {
		margin-right: 15px;
	}
	
	.tag-ri-so-tag {
		display: flex;
	}
	
	.tag-ri-so-tag div:nth-child(1) {
		margin: 3px 0 0 0;
		font-size: 14px;
	}
	
	.tag-ri-so-tag ul li {
		display: flex;
	}
	
	.tag-ri-so_tow {
		display: flex;
	}
</style>