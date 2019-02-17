<template>
	<div class="area">
		<Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
			<Breadcrumb-item>客户管理</Breadcrumb-item>
			<Breadcrumb-item>区域设置</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
			<Row>
				<Col span='14'>
                    <div class="search-box">
                        <span>区域名称：</span>
                        <Input placeholder="请输入区域名称" style="width: 440px;margin: 0 15px 0 0;"></Input>
                        <button class="btn-search" type="info">查询</button>
                    </div>
				</Col>
				<Col span='10'>
                    <div class="btn-box-right">
                        <button class="btn-new" @click="addRoot" style="width: 140px;">新增区域及负责人</button>
                    </div>
				</Col>
			</Row>
            <div class="table">
                <div class="table-header">
                    <div class="table-td align_left ttd"><span>区域名称</span></div>
                    <div class="table-td align_left3 ttd"><span>区域负责人</span></div>
                    <div class="table-td align_left3  ttd"><span>操作</span></div>
                </div>
                <div class="table-tbody">
                    <div class="table-tr" v-for='(classify , index) in data'>
                        <tree-table :model='classify' :parentModel='data' :key='index' :index='index' @moveUp='moveUp'></tree-table>
                    </div>
                </div>
            </div>
			<Modal v-model="clientClassifyModel" width="666">
				<div slot="header" class="del_iti">
					<span>新增区域及负责人</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="105">
					<!--<div class="prevClassName">
						<div class="title">上级区域</div>
						<div class="prevName">{{ parentName }}</div>
					</div>-->
					<Form-item label="区域名称:" prop="name">
						<Input v-model="compileForm.name" placeholder="区域名称"></Input>
					</Form-item>
					<Form-item label="区域编码:" prop="code">
						<Input v-model="compileForm.code" placeholder="区域编码"></Input>
					</Form-item>
					<Form-item label="区域负责人1:" prop="code">
						<Input v-model="compileForm.code" placeholder="区域负责人1"></Input>
					</Form-item>
					<Form-item label="区域负责人2:" prop="code">
						<Input v-model="compileForm.code" placeholder="区域负责人2"></Input>
					</Form-item>
					<Form-item label="描述:" prop="description">
						<Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="区域描述"></Input>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="info" @click="confirm('compileForm')">确定</Button>
					<Button type="text" @click='cancel'>取消</Button>
				</div>
			</Modal>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>

<script>
	import api from '@/api/api'
	import treeTable from '@/page/cooperation/customer/treeTable_area'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
			treeTable: treeTable,
			tis: tis
		},
		created() {
			this.axios(api.region + api.regionGetRoot)
            .then((res) => {
                this.data = res.data.datas;
            })
            .catch((err) => {
                console.log(err);
            })
		},
		data() {
			return {
				data: '',
				re_do: '',
				do_yn: false,
				do_no: false,

				clientClassifyModel: false,
				compileForm: {
					parentId: '',
					name: '',
					code: '',
					description: ''
				},
				ruleValidate: {
					name: [{
							required: true,
							message: '区域名称不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 100,
							message: '区域名称不能超过100个字符'
						}
					],
					code: [{
							required: true,
							message: '区域编码不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 30,
							message: '区域编码不能超过30个字符'
						}
					],
					description: [{
							required: true,
							message: '区域描述不能为空',
							trigger: 'blur'
						},
						{
							type: 'string',
							max: 500,
							message: '区域描述不能超过500个字符'
						}
					]
				},
				parentName: '无',
				prevClass: null,
			}
		},
		methods: {
			show(index) {
				this.clientClassifyModel = true;
			},
			confirm(name) {
				const _this = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
						_this.axios({
								method: 'post',
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: api.region + api.regionAddRoot,
								// url : '/prize',
								data: api.convertParam(_this.compileForm)
							})
							.then(function(res) {
								if(res.data.status == 1) {
									_this.data.push(res.data.datas);
									_this.clientClassifyModel = false;
									_this.compileForm.name = '';
									_this.compileForm.parentId = '';
									_this.compileForm.code = '';
									_this.compileForm.description = '';
									//									_this.$Message.success('添加成功');
									_this.do_yn = true;
									_this.re_do = "添加成功";
									setTimeout(() => {
										_this.do_yn = false;

									}, 2000);
								}
							})
					}
				})
			},
			addRoot() {
				// this.enterType = 1;
				this.parentName = '无';
				this.clientClassifyModel = true;
			},
			moveUp(data) {
				// console.log(data);
			},
			cancel() {
				// this.delModel = false;
				this.clientClassifyModel = false;
				this.compileForm.name = '';
				this.compileForm.parentId = '';
				// this.compileForm.EPR = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
			}
		}
	}
</script>
<style scoped>
	.area .align_left {
		/*text-align: left;*/
		padding-left: 13px !important;
		width: 40% !important;
	}
	
	.ivu-form-item {
		margin-bottom: 20px;
	}

	.table {
		display: block;
		width: 100%;
		margin: 10px;
	}
	
	.child-table {
		display: block;
		width: 100%;
	}
	
	.table-header {
		display: flex;
		background: #eef1f9;
		border: none;
		/*color: #fff;*/
	}
	
	.table-tbody {
		display: block;
		font-size: 13px !important;
	}
	
	.table-tr {
		display: flex;
		background: #fff;
	}
	
	.table-tr:hover {
		background: #ebf7ff;
	}
	
	.table-td {
		display: block;
		height: 30px;
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
	}
	/*.table-td {
        width: 200%;
    }*/
	/*.align_left2 {
		text-align: left;
		padding-left: 30px;
		width: 30%;
	}*/
	
	.align_left3 {
		text-align: left;
		/*padding-left: 30px;*/
		width: 40%;
	}
	
	.ttd {
		height: 50px;
		line-height: 50px;
		text-align: left;
	}
	/*.ttd:nth-of-type(2){
		width: 40%;
	}*/
	
	.ttd span {
		border-left: 1px solid #ddd;
		padding-left: 5px;
		font-size: 13px;
		font-weight: 600;
	}
</style>