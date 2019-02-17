<template>
	<div class="addAttr">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>产品信息</Breadcrumb-item>
			<Breadcrumb-item>产品属性</Breadcrumb-item>
			<Breadcrumb-item>添加属性</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
			<Form :model="data" ref='attrform' :label-width="120" :rules='attrRules'>
				<Row type='flex' justify='left'>
					<Col span='7'>
					<Form-item label="属性名称：" prop="name">
						<Input v-model="data.name" style="width: 200px" placeholder="必填"></Input>
					</Form-item>
					</Col>
					<!-- <Col span='7'>
					<Form-item label="属性编码：">
						<Input v-model="data.code" style="width: 200px"></Input>
					</Form-item>
					</Col> -->
					<Col span='7'>
					<Form-item label="属性描述：">
						<Input v-model="data.description" style="width: 200px"></Input>
					</Form-item>
					</Col>
				</Row>
			</Form>
            <div style="text-align: right;"><strong style="line-height: 36px; margin-right: 10px;">说明：属性如”颜色”，属性值如“白色”、“红色”等。</strong></div>
			<div>
				<div class="table">
					<div class="table-header">
						<div class="table-td">属性值</div>
						<!-- <div class="table-td">属性编码</div> -->
						<div class="table-td">属性值描述</div>
						<div class="table-td">排序</div>
						<div class="table-td">操作</div>
					</div>
					<div class="table-tbody">
						<div class="table-tr" v-for='(item,index) in data.values' :key='index'>
							<div class="table-td">
								<Input v-model="item.name" placeholder="请输入属性值名称"></Input>
							</div>
							<!-- <div class="table-td">
								<Input v-model="item.code"></Input>
							</div> -->
							<div class="table-td">
								<Input v-model="item.description"></Input>
							</div>
							<div class="table-td">
								<Input v-model="item.orderNum"></Input>
							</div>
							<div class="table-td">
								<Button type='info' @click='add'>增加</Button>
								<Button type="info" @click="del(index)">删除</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Row type="flex" justify="center" class="code-row-bg addFooter" style='margin-top : 40px;'>
				<Col span="3">
				    <Button type="warning" size="large" long @click.native='save("formItem")'>保存</Button>
				</Col>
			</Row>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>
<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
			components:{
				tis : tis
			},

		name: 'addAttr',
		mounted() {
			const _this = this;
			if(this.$route.params.id) {
				console.log(this.$route.params.id);
				const id = this.$route.params.id;
				_this.axios(api.productAttr + id + api.queryById)
					.then(function(res) {
						console.log(res);
						const data = res.data.datas;
						// _this.data = res.data.datas;
						_this.data.id = data.id;
						_this.data.name = data.name;
						_this.data.code = data.code;
						_this.data.description = data.description;
						_this.data.values = res.data.datas.productAttributeValues;
						_this.isModify = true;
					})
					.catch(function(err) {
						console.log(err);
					})
			}

		},
		data() {
			return {
					re_do:'',
				do_yn: false,
				do_no: false,

				isModify: false,
				data: {
					name: '',
					code: '',
					description: '',
					values: [{
						name: '',
						code: '',
						orderNum: '',
						description: ''
					}]
				},
				status: false,
				attrRules: {
					name: [{
						required: true,
						message: '请输入产品名称',
						trigger: 'blur'
					}],
					attrValue: [{
						required: true,
						message: '请输入产品属性值',
						trigger: 'blur'
					}]
				}

			}
		},
		computed: {

		},
		methods: {
			add() {
				console.log(this.data);
				const corp = JSON.parse(window.localStorage.getItem('corp')); //将缓存字符串转为json对象
				const values = {
					name: '',
					code: '',
					orderNum: '',
					description: ''
				}
				this.data.values.push(values);
				console.log(this.data.values);
			},
			del(index) {
				/*if(this.data.values.length == 1) {
				    this.$Message.warning('属');
				}*/
				const _this = this;

				this.$Modal.confirm({
					title: '确认框',
					content: '<p>确定要删除产品属性值吗</p>',
					onOk: () => {
						if(this.isModify) {
							if(this.data.values[index].id) {
								_this.axios(api.productAttr + this.data.values[index].id + api.productAttrValue)
									.then(function(res) {
										console.log(res);
										if(res.data.status == 1) {
											_this.data.values.splice(index, 1);
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
								this.data.values.splice(index, 1);
							}
						} else {
							this.data.values.splice(index, 1);
						}
						// console.log(this.)
						if(this.data.values.length == 0) {
							const values = {
								name: '',
								code: '',
								orderNum: '',
								description: ''
							}
							this.data.values.push(values);
						}
					}
				});
			},
			save() {
				const _this = this;
				this.$refs['attrform'].validate((valid) => {
					if(valid) {
						if(this.data.values.length == 0) {
							_this.status = true;
							console.log(this.data);
							return;
						}
						this.data.values.forEach(function(item, index) {
							if(item.name == '' || item.name == undefined) {
								_this.do_no = true;
								_this.re_do = '属性值名称不能为空';
								setTimeout(() => {
									_this.do_no = false;

								}, 2000);

								//_this.$Message.error('属性值名称不能为空');
								_this.status = false;
								return;
							} else {
								_this.status = true;
							}
						})
					} else {
						_this.do_no = true;
						_this.re_do = '属性名称不能为空';
						setTimeout(() => {
							_this.do_no = false;

						}, 2000);
						//this.$Message.error('属性名称不能为空');
					}
				})

				if(this.status) {
					if(!this.isModify) {
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.productAttr + api.add,
								data: api.convertParam(this.data)
							})
							.then(function(res) {
								console.log(res);
								if(res.data.status) {
									_this.$router.push('/product/attribute');
								}
							})
							.catch(function(err) {
								console.log(err);
							})
					} else {
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.productAttr + api.modify,
								data: api.convertParam(this.data)
							})
							.then(function(res) {
								console.log(res);
								if(res.data.status == 1) {
									_this.$router.push('/product/attribute');
								}
							})
							.catch(function(err) {
								console.log(err);
							})
					}
				}

			}
		}
	}
</script>

<style scoped>
	.table {
		display: table;
		width: 100%;
		margin: 10px;
	}
	
	.child-table {
		display: table;
		width: 200%;
	}
	
	.table-header {
		display: table-header-group;
		background: #eef1f9;
		border: 1px solid #e1e7f6;
		/*color: #fff;*/
	}
	
	.table-tbody {
		display: table-row-group;
	}
	
	.table-tr {
		display: table-row;
		background: #fff;
	}
	
	.table-tr:hover {
		background: #ebf7ff;
	}
	
	.table-td {
		display: table-cell;
		height: 30px;
		width: auto;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
		padding: 10px 20px;
	}
</style>