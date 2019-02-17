<template>
	<div class="subi">
        <span class="formItem_renzhengok" v-if="status == 0 || status == 2 || status == 5 || status == 1 || status == 7">
            <span v-if="status == 0" v-show="status == 0">(未认证)<span @click="apply()" class="cssshou">(立即认证)
                </span>
            </span>
            <span v-if="status == 1" v-show="status == 1">(已认证)</span>
            <span v-if="status == 2" v-show="status == 2">(认证未通过)
                <span @click="apply()" class="cssshou">
                    (重新认证)
                </span>
            </span>
            <span v-if="status == 5" v-show="status == 5">(认证审核中)</span>
            <span v-if="status == 7" v-show="status == 7">(帐号已冻结)</span>
        </span>
	</div>
</template>

<script>
    export default {
        props:['status'],
        data() {
            return {
            
            }
        },
        methods: {
            //	去认证
            apply() {
                this.$router.push({
                    path: '/sys/corp/apply'
                });
            },
        }
    }
</script>

<style scoped>
	.cssshou{
		cursor:pointer;
		margin-left: 15px;
	}
</style>