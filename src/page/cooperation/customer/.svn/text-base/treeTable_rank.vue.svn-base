<template>
    <div class="table-tbody">
        <div class="table-tr">
            <div class="table-td " style="width: 60%;">
                <div class="classityTeite">
                    {{model.name}}
                </div>
            </div>
            <div class="table-td"  style="width: 40%;">
                <Button class="bianji" size='small' @click.prevent='edit'></Button>
                <Button class="dele" size='small' @click='isDel'></Button>
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
</template>
<script>
	import api from '@/api/api'
	export default {
		name: 'treeTable',
		props: ['model', 'index'],
		data() {
			return {
				// isFolder: this.model.child && this.model.child.length > 0,
				moveDownCount: 0,
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
		computed: {
			// this.routerName = this.$router.currentRoute.name;
		},
		methods: {
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
		display: block;
	}
	
	.table-tr {
		height: 55px;
		display: flex;
		justify-content: center;
		border-bottom: 1px solid #e1e7f6;
	}
	
	.table-td {
		display: flex;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		align-items: center!important;
		height: auto !important;
		vertical-align: middle;
		text-align: left;
		border-bottom: 0px solid #fff !important;
	}
	
	.align_left {
		text-align: left;
		
		display: flex!important;
		align-items: center!important;
	}
	
	.classityTeite {
		position: relative;
		display: flex!important;
		align-items: center!important;
		display: inline;
		margin-left: 30px;
	}
</style>