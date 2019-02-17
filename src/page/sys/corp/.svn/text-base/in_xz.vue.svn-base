<template>
	<div class="in_xz">
		<div class="div_xz">
			<!--<input type="text" v-model="message" />-->
			<div v-for=" (ind,index) in messages" >
				<!--{{ ind }}-->
				<span v-show="ind">
					{{ ind }}
					<label @click="ind">xx</label>
				</span>
			</div>
				 <Select v-model="message" style="width:100%">
						 <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<!--<input type="checkbox" name="" id="" value="" v-model="message" /><label>sdfsdf</label>-->
						
			<button v-on:click="handleSendMessage">Send</button>
		</div>
<!--父组件-->
	<!--<div class="inxz" v-show="qyhy">
			<div class="inxz_div">
				<inxz v-on:message="handleMessage" :messages="messages" :key="index" ></inxz>
			</div>
			
			  handleMessage: function (payload) {
			      this.messages.push(payload.message)
			    },
		</div>-->
	</div>
</template>

<script>
		import api from '@/api/api'
	export default {
			props: ['messages','index'],
			data() {
			return {
				    message: '',
				    ind:false,
//				    list_ri: ['系统管理员', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', '业务经理', '业务负责人', '订单审核员', '财务审核人', '发货审核人', ],
				        cityList3: [
                    {
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
                ],
				}
			},
			methods: {
				 handleSendMessage: function () {
				 	 	this.ind = !this.ind
				      this.$emit('message', { message: this.message })
				   },
				   ind(){
				   	this.ind = !this.ind
				   	this.$emit('ind', { index: this.ind })
				   },
				   handleMessage: function (payload) {
			      this.messages.push(payload.message)
			    },
				 
			}
	}
</script>

<style scoped>

</style>