<template>

	<div class="child-table">
		<div class="table-tbody">
			<div class="table-tr">
				<div class="table-td align_left" style="width: 10%!important;">
					{{model.name}}
				</div>
				<div class="table-td align_left" style="width: 10%!important;">
					{{model.tel}}
				</div>
				<div class="table-td align_left" style="width: 20%!important;" :title="model.provinceName + model.cityName + model.countyName">
					{{model.provinceName}} {{model.cityName}} {{model.countyName}}
				</div>
				<div class="table-td align_left" style="width: 20%!important;" :title="model.address">
					{{model.address}}
				</div>
                <div class="table-td align_left" style="width: 20%!important;" :title="model.description">
					{{model.description}}
				</div>
				<div class="table-td td_but" style="width: 20%!important;">
					<Button class="bianji" size="small" v-on:click='toEdit(model)'></Button>
					<Button class="dele" size="small" v-on:click='isDel'></Button>
					<div class="radiof" v-on:click.stop='radiochange(model)'>
						<div class="radioc" v-show='model.defaultStatus==1'></div>
					</div>
					<span class="morenspan">设置为默认</span>
				</div>
			</div>

			<Modal v-model="delModel" width="460">
				<p slot="header" class="del_p">
					<span>删除确认</span>
				</p>
				<div class="del_div">
					<p>您确定要删除吗？</p>
				</div>
				<div slot="footer" class="delbut">
					<Button @click="del">删除</Button>
					<Button @click='cancel'>取消</Button>
				</div>
			</Modal>
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
		name: 'treeTable',
		props: ['model', 'index', 'parentModel'],
		data() {
			return {
				re_do: '',
				do_yn: false,
                do_no: false,
                
				corpId: '',
				model1: '',
				model2: '',
				model3: '',
				spani: ['马云', '马化腾'],
				open: false,
				moveDownCount: 0,
				newValue1: '',
				newValue2: '',
				delModel: false,
				clientClassifyModel: false,
				clientClassifyModel_r: false,
				div_tit: false,
				compileForm: {
					corpId: '',
					name: '',
					code: '',
					description: '',
					provinceId: '',
					cityId: '',
					countyId: '',
					postcode: '',
					tel: '',
					defaultStatus: 0,
					address:''
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
				parentName: '无', //父级分类名称
				isEdit: false
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.user.user
			}
		},
		mounted() {
			const _this = this;
			_this.corpId = _this.userInfo.id;
		},
		methods: {
			radiochange(index) {
				const _this = this;
				
				var changer = '';
				if(index.defaultStatus == 0) {
					var changer = 1;
				} else if(index.defaultStatus == 1) {
					var changer = 0;
				}
				_this.axios({
						method: 'post',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						url: '/api/upms/corp/consignee/modify.do',
						data: api.convertParam({
							id: index.id,
                            corpId: index.corpId,
                            name: index.name,
                            defaultStatus: changer,
							//code: index.code,
							description: index.description,
							provinceId: index.provinceId,
							provinceName: index.provinceName,
							cityId: index.cityId,
							cityName: index.cityName,
							countyId: index.countyId,
							countyName: index.countyName,
							postcode: index.postcode,
							tel: index.tel,
							address: index.address,
						})
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.searchaddress();
							_this.do_yn = true;
							_this.re_do = "设置成功";
							setTimeout(() => {_this.do_yn = false;}, 2000);
						}
					})
			},
			toggle() {
				if(this.model.children) {
					this.open = !this.open
				}
			},
			add() {
				this.parentName = this.model.name;
				this.compileForm.parentId = this.model.id;
				this.div_tit = true;
				this.clientClassifyModel = true;

			},
			add_r() {
				this.parentName = this.model.name;
				this.compileForm.parentId = this.model.id;
				this.clientClassifyModel_r = true;
			},
			toEdit(index) {
				const _this = this;
				_this.div_tit = false;
				_this.axios({
						method: 'get',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						url: '/api/upms/corp/consignee/' + index.id + '/queryById.do',
						data: api.convertParam({
							id: index.id
						})
					})
					.then(function(res) {
						var data = res.data.datas;
						if(res.data.status == 1) {
							_this.clientClassifyModel = true;
							_this.$emit('addresschange',index);
							_this.isEdit = true;
						}
					})
			},
			edit() {
				// 	// this.$emit('edit',this.model);
			},
			//	上移
			moveUp(data) {
				if(data.id) {
					this.$emit('moveUp', data);
					return;
				}
				const _this = this;
				_this.axios(api.region + _this.model.id + api.regionMoveUp)
					.then(function(res) {
						if(res.data.status == 1) {
							if(_this.model.level !== 1) {
								if(_this.index == 0) return;
								_this.newValue1 = _this.model;
								_this.newValue2 = _this.parentModel.children[_this.index - 1];
								_this.parentModel.children.splice(_this.index - 1, 2, _this.newValue1, _this.newValue2);
								_this.$emit('moveUp', _this.model);
							} else {
								if(_this.index == 0) return;
								_this.newValue1 = _this.model;
								_this.newValue2 = _this.parentModel[_this.index - 1];
								_this.parentModel.splice(_this.index - 1, 2, _this.newValue1, _this.newValue2);
							}
							_this.do_yn = true;
							_this.re_do = "上移成功";
							setTimeout(() => {
								_this.do_yn = false;
							}, 2000);
						}
					})
			},
			//下移
			moveDown(data) {
				const _this = this;
				if(data.id) {
					_this.$emit('moveDown', data);
					return;
				}
				_this.axios(api.region + _this.model.id + api.regionMoveDown)
					.then(function(res) {
						if(res.data.status == 1) {
							if(_this.model.level !== 1) {
								if(_this.index == _this.parentModel.children.length - 1) return;
								_this.newValue1 = _this.parentModel.children[_this.index + 1];
								_this.newValue2 = _this.model;
								_this.parentModel.children.splice(_this.index, 2, _this.newValue1, _this.newValue2);
								_this.$emit('moveDown', _this.model);
							} else {
								if(_this.index == _this.parentModel.length - 1) return;
								_this.newValue1 = _this.parentModel[_this.index + 1];
								_this.newValue2 = _this.model;
								_this.parentModel.splice(_this.index, 2, _this.newValue1, _this.newValue2);
							}
							_this.do_no = true;
							_this.re_do = '下移成功';
							setTimeout(() => {
								_this.do_no = false;
							}, 2000);
						}
					})
			},
			del(data) {
				if(data.id) {
					this.$emit('del', data);
					return;
				}
				const _this = this;
				_this.axios('/api/upms/corp/consignee/' + _this.model.id + '/delete.do')
					.then(function(res) {
						if(res.data.status == 1) {
							_this.searchaddress();
							if(_this.model.level !== 1) {
								_this.delModel = false;
								_this.do_yn = true;
								_this.re_do = "删除成功";
								setTimeout(() => {
									_this.do_yn = false;

								}, 2000);
							} else {
								_this.parentModel.splice(_this.index, 1);
								_this.delModel = false;
								_this.do_yn = true;
								_this.re_do = "删除成功";
								setTimeout(() => {
									_this.do_yn = false;
								}, 2000);
							}
						} else if(res.data.status == 0) {
							_this.delModel = false;
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;
							}, 2000);
						}
					})

			},
			searchaddress() {
				const _this = this;
				_this.axios({
						method: 'get',
						header: {"Content-Type": 'application/x-www-form-urlencoded'},
						url: '/api/upms/corp/consignee/' + _this.corpId + '/queryListByCorpId.do',
						data: api.convertParam({
							corpId: _this.corpId
						})
					})
					.then(function(res) {
						if(res.data.status == 1) {
							_this.$emit('nrchange', res.data.datas);
						}
					})
			},
			isDel() {
				this.delModel = true;
			},
			cancel() {
				this.delModel = false;
				this.clientClassifyModel = false;
				this.compileForm.name = '';
				this.compileForm.parentId = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
			}
		}
	}
</script>
<style scoped>
	.ivu-form-item {
		margin-bottom: 24px !important;
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
	
	button {
		padding: 0 18px;
		height: 30px;
		border: 0;
		border-radius: 3px;
		background: #fff;
		border: 1px #dddddd solid;
	}
	
	.table-header {
		display: block;
		background: #eef1f9;
		border: 1px solid #e1e7f6;
		/*color: #fff;*/
	}
	
	.table-tbody {
		display: block;
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
		height: 22px;
		text-align: center;
		border-bottom: 1px solid #999;
		border-right: 1px solid #999;
    }

    .table-tr .table-td:first-child {
        border-left: 1px solid #999;
    }
	
	.align_left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		text-align: left;
		padding-left: 10px;
		height: 60px;
		line-height: 60px;
		width: 50%;
	}
	
	.posirelative {
		position: relative;
	}
	
	.select-out-div {
		width: 160px;
		overflow: hidden;
	}
	
	.radiof {
		width: 16px;
		height: 16px;
		border: 1px solid #eee;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 10px;
	}
	
	.radioc {
		width: 8px;
		height: 8px;
		background-color: black;
		border: 1px solid black;
		border-radius: 50%;
	}
	
	.radiof:hover {
		cursor: pointer;
	}
</style>