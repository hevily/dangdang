<template>

	<div class="child-table">
		<div class="child_div">
			<div class="list-box">

				<div class="names">
					<div class="bottom qq">
						<div v-if="model.name.length < 20">
							{{model.name}}
						</div>
						<div v-else-if="model.name.length > 20">
							<Tooltip placement="bottom-start">
								{{model.name}}
								<div slot="content" always>
									<p>{{model.name}}</p>
								</div>
							</Tooltip>
						</div>

					</div>
				</div>
				<div class="codes">
					<div class="bottom qq">
						<div v-if="model.code.length < 20">
							{{model.code}}
						</div>
						<div v-else-if="model.code.length > 20">
							<Tooltip placement="bottom-start">
								{{model.code}}
								<div slot="content" always>
									<p>{{model.code}}</p>
								</div>
							</Tooltip>
						</div>

					</div>
				</div>
				<div class="descriptions">
					<div class="bottom qq">
						<div v-if="model.description.length < 40">
							{{model.description}}
						</div>
						<div v-else-if="model.description.length > 240">
							<Tooltip placement="bottom-start">
								{{model.description}}
								<div slot="content" always>
									<p>{{model.description}}</p>
								</div>
							</Tooltip>
						</div>

					</div>
				</div>
				<div class="buts">

					<Button class="bianji" size="small" @click='edit()'></Button>
					<Button class="shangyi" size="small" @click='moveUp(index)'></Button>
					<Button class="xaiyi" size="small" @click='moveDown(index)'></Button>
					<Button class="dele" size="small" @click='isDel'></Button>
				</div>
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
		<!--<div class="table-tbody">

			<Modal v-model="delModel" width="360">
				<p slot="header" style="color:#f60;text-align:center;">
					<span>删除确认</span>
				</p>
				<div style="text-align:center">
					<p>你确定要删除吗？</p>
				</div>
				<div slot="footer">
					<Button type='text' @click='cancel'>取消</Button>
					<Button type="error" @click="del">删除</Button>
				</div>
			</Modal>
		</div>-->
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
	</div>
</template>

<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
		name: 'treeTable',
		props: ['model', 'index', 'parentModel'],
		components: {
			tis: tis
		},

		data() {
			return {
				// isFolder: this.model.child && this.model.child.length > 0,
				re_do: '',
				do_yn: false,
				do_no: false,

				moveDownCount: 0,
				da: [],
				newValue1: '',
				newValue2: '',
				delModel: false,
				compileForm: {
					name: '',
					code: '',
					description: ''
				},
				isEdit: false

			}
		},
		methods: {
			//上移
			moveUp(data) {
				if(data.id) {
					this.$emit('moveUp', data);
					return;
				}
				const _this = this;
				_this.axios(api.rootBaseUnit + _this.model.id + api.moveUp)
					.then(function(res) {
						if(res.data.status == 1) {
							if(_this.model.level !== 1) {
								if(_this.index == 0) {
									return;
								}
							}
							_this.newValue1 = _this.model;
							_this.newValue2 = _this.parentModel[_this.index - 1];
							_this.parentModel.splice(_this.index - 1, 2, _this.newValue1, _this.newValue2);
							//							_this.$Message.success('上移成功');
							_this.do_yn = true;
							_this.re_do = "上移成功";
							setTimeout(() => {
								_this.do_yn = false;

							}, 2000);

						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);
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
				_this.axios(api.rootBaseUnit + _this.model.id + api.moveDown)
					.then(function(res) {
						if(res.data.status == 1) {
							if(_this.model.level !== 1) {
								if(_this.index == _this.model.length - 1) {
									return;
								}
								_this.newValue1 = _this.parentModel[_this.index + 1];
								_this.newValue2 = _this.model;
								_this.parentModel.splice(_this.index, 2, _this.newValue1, _this.newValue2);
							} else {

								if(_this.index == _this.model.length - 1) {
									return;
								}
								//								var treeparent = document.querySelector(".table_qaz");
								//								var treedom = document.querySelector(".table_qaz").childNodes[_this.index];
								//								treeparent.insertBefore(treedom, treeparent.childNodes[_this.index + 2]);
								//								_this.index = _this.index + 1;
								_this.newValue1 = _this.parentModel[_this.index + 1];
								_this.newValue2 = _this.model;
								_this.parentModel.splice(_this.index, 2, _this.newValue1, _this.newValue2);
							}
							//							_this.$Message.success('下移成功');
							_this.do_yn = true;
							_this.re_do = "下移成功";
							setTimeout(() => {
								_this.do_yn = false;

							}, 2000);

						} else {
							_this.do_no = true;
							_this.re_do = res.data.message;
							setTimeout(() => {
								_this.do_no = false;

							}, 2000);

							//_this.$Message.error(res.data.message);
						}
					})

			},
			edit() {
				this.$emit('edit', this.index);

			},
			del() {
				this.$emit('del', this.index);
				this.delModel = false;
			},
			isDel() {
				this.delModel = true;
			},
			cancel() {
				this.delModel = false;
				this.compileForm.name = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
			}
		}
	}
</script>

<style scoped>
	.qq {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.child_div {
		width: 100%;
		height: 100%;
	}
	
	.child_div:hover {
		background: #ebf7ff;
	}
	
	.list-box {
		display: flex;
		align-items: center;
		width: 100%;
		height: 55px;
		line-height: 55px;
		border-bottom: 1px solid #eee;
	}
	
	.names {
		width: 20%;
		/*text-align: center;*/
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0 0px 0 40px;
		font-size: 13px;
	}
	
	.codes {
		width: 20%;
		/*text-align: center;*/
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0 0px 0 15px;
		font-size: 13px;
	}
	
	.descriptions {
		width: 35%;
		/*text-align: center;*/
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0 0px 0 15px;
		font-size: 13px;
	}
	
	.buts {
		/*height: 50px;*/
		display: flex;
		align-items: center;
		padding: 0 0px 0 15px;
		font-size: 13px;
	}
	
	.bottom p {
		max-width: 400px !important;
		white-space: normal !important;
		/*word-wrap:break-word !important;*/
	}
	
	.table {
		display: table;
		width: 100%;
		margin: 10px;
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
		margin: 5px 0;
	}
	
	.table-tr:hover {
		background: #ebf7ff;
	}
	
	.table-td {
		display: table-cell;
		height: 30px;
		/*width: 50%;*/
		vertical-align: middle;
		text-align: center;
		border-bottom: 1px solid #e1e7f6;
		word-wrap: break-word;
	}
	
	.align_left {
		text-align: left;
		padding-left: 30px;
	}
	
	
	.table_fl {
		display: flex;
	}
	
	.ivu-tooltip {
		display: block!important;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.ivu-form-item-content {
		margin-left: 120px !important;
	}
	

	
	
</style>
<style type="text/css">
	.ivu-tooltip-inner {
		max-width: 400px !important;
		min-height: 100% !important;
	}
</style>