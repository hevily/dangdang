<template>
	<div class="child-table">
		<div class="child_div">
			<div class="list-box">
				<div class="pagenum">
					{{(pagenum-1)*10+index+1}}
				</div>
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
						<div v-if="model.description.length < 60">
							{{model.description}}
						</div>
						<div v-else-if="model.description.length > 60">
							<Tooltip placement="bottom-start">
								{{model.description}}
								<div slot="content" always>
									<p> {{model.description}}</p>
								</div>
							</Tooltip>
						</div>
					</div>
				</div>
				<div class="buts">
					<Button class="bianji" size="small" @click='edit'></Button>
					<Button class="dele" size="small" @click='isDel'></Button>
				</div>
			</div>
		</div>
        <Modal v-model="delModel" width="460" >
            <p slot="header" class="del_p">
                <span>删除确认</span>
            </p>
            <div class="del_div">
                <p>您确定要删除吗？</p>
            </div>
            <div slot="footer"  class="delbut">
            	<Button @click="del">删除</Button>
            	<Button  @click='cancel'>取消</Button>
            </div>
        </Modal>
	</div>
</template>
<script>
	import api from '@/api/api'
	export default {
		name: 'treeTable',
		props: ['model', 'index', 'pagenum'],
		data() {
			return {
				// isFolder: this.model.child && this.model.child.length > 0,
				moveDownCount: 0,
				newValue1: '',
				newValue2: '',
				delModel: false,
				compileForm: {
					endRow: '',
					name: '',
					code: '',
					description: ''
				},
				isEdit: false
			}
		},
		computed: {
			// this.routerName = this.$router.currentRoute.name;
		},
		methods: {
			onShow() {
				let _this = this;
				if(_this.model.code.length > 15) {
					_this.isEdit = true
				} else {
					_this.isEdit = true
				}
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
<style type="text/css">
	.child-table .ivu-tooltip {
		text-align: left !important;
	}
</style>
<style scoped>
	.child_div {
		width: 100%;
		height: 100%;
	}
	
	.list-box {
		display: flex;
		align-items: center;
		width: 100%;
		line-height: 55px;
		height: 55px;
		border-bottom: 1px solid #eee;
	}
		
	.child_div:hover {
		background: #ebf7ff;
	}
	
	.pagenum {
		width: 10%;
		/*text-align: center;*/
		padding-left: 25px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 13px;
	}
	
	.names {
		width: 25%;
		/*text-align: center;*/
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-left: 7px;
		font-size: 13px;
	}
	
	.codes {
		width: 25%;
		/*text-align: center;*/
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-left: 7px;
		font-size: 13px;
	}
	
	.descriptions {
		width: 30%;
		/*text-align: center;*/
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-left: 7px;
		font-size: 13px;
	}
	
	.buts {
		width: 10%;
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 0px 0 15px;
	}
	
	.ivu-tooltip-inner {
		max-width: 400px !important;
		min-height: 80px !important;
		/*word-break:break-all!important;*/
		z-index: 999 !important;
		text-align: left!important;
	}
	
	.top,
	.bottom {
		/*text-align: center;*/
	}
	
	.bottom p {
		white-space: normal !important;
	}
	
	.ivu-tooltip-content {
		/*word-break:break-all !important;*/
	}
	
	.table {
		display: table;
		width: 100%;
		margin: 10px;
	}
	
	.child-table {
		display: block;
	}
	
	.table-header {
		display: table-header-group;
		background:  #eef1f9;
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
	
	.child-table .ivu-tooltip {
		display: block!important;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}	
	
	
</style>