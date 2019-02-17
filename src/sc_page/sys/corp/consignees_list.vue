<template>
	<div class="area">
		<Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>设置</Breadcrumb-item>
			<Breadcrumb-item>收货地址</Breadcrumb-item>
		</Breadcrumb>
		<div class="right_home_warp-nobot test-1">
            <div class="right_home_warp-title">
                <router-link to="/sys/corp/modifyme">基本信息</router-link>
                <router-link to="">联系人</router-link>
                <router-link to="/sys/corp/consignees_list" class="right_home_warp-sel">收货地址</router-link>
                <router-link to="">银行账户信息</router-link>
                <router-link to="/sys/corp/invoice/modify">发票信息</router-link>
            </div>
			<div class="btn-box-right">
				<button class="btn-new" @click="addRoot">新增收货地址</button>
			</div>
            <Table :height="tableHeight" :columns="tableModel" :data="deliveryList" style="margin-bottom: 20px;"></Table>
			<Modal v-model="clientClassifyModel" width="666">
				<div slot="header" class="del_iti">
					<span>新增收货地址</span>
				</div>
				<Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="100">
					<Form-item label="收货人:" prop="name">
						<Input v-model="compileForm.name" placeholder="收货人"></Input>
					</Form-item>
					<Form-item label="联系电话:" prop='tel'>
						<Input v-model="compileForm.tel" placeholder="联系电话"></Input>
					</Form-item>
					<Form-item label="收货地址:">
						<Select placeholder="请选择省" v-model="compileForm.provinceId" @on-change="registeredprovinceOK" style="width:32%">
							<Option v-for="provinceName in provinceList" :value="provinceName.id" :key="provinceName.id">{{ provinceName.name }}</Option>
						</Select>
						<Select placeholder="请选择市" v-model="compileForm.cityId" @on-change="registeredcityOK" style="width:32%">
							<Option v-for="cityeName in cityList" :value="cityeName.id" :key="cityeName.id">{{ cityeName.name }}</Option>
						</Select>
						<Select placeholder="请选择区、县" v-model="compileForm.countyId" style="width:32%">
							<Option v-for="countyName in countyList" :value="countyName.id" :key="countyName.id">{{ countyName.name }}</Option>
						</Select>
					</Form-item>
					<Form-item label="" prop='address'>
						<Input v-model="compileForm.address" placeholder="街道/路/工业区/门牌号"></Input>
					</Form-item>
                    <Form-item label="备注:" prop='description'>
						<Input v-model="compileForm.description" placeholder="备注" type="textarea" :rows="3"></Input>
					</Form-item>
				</Form>
				<div class="modelFooter" slot='footer'>
					<Button type="text" @click='cancel'>取消</Button>
                    <Button type="info" @click="confirm('compileForm')">确定</Button>
				</div>
			</Modal>
		</div>
		<tis :re_do='re_do' :do_yn='do_yn' :do_no='do_no'></tis>
        <Modal v-model="delModel" width="460">
            <p slot="header" class="del_p">
                <span>删除确认</span>
            </p>
            <div class="del_div">
                <p>您确定要删除吗？</p>
            </div>
            <div slot="footer" class="delbut">
                <Button @click="del">删除</Button>
                <Button @click='ccl'>取消</Button>
            </div>
        </Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import tis from '@/page/set/tishisub.vue'
	export default {
		components: {
            tis: tis,
        },
        data() {
			const validatePass = (rule, value, callback) => {
				var mobile = /^1[3|5|8]\d{9}$/,
					phone = /^0\d{2,3}-?\d{7,8}$/;
				if(mobile.test(value) || phone.test(value)) {
					callback();
				} else {
					callback(new Error('请输入正确的手机号或座机号'));
				}
			};
			return {
				re_do: '',
				do_yn: false,
				do_no: false,

				provinceList: [],
				cityList: [],
				countyList: [],

				deliveryList: [],
				clientClassifyModel: false,
				compileForm: {
					corpId: '',
					name: '',
					code: '',
					description: '',
					provinceId: '',
					cityId: '',
					countyId: '',
					tel: '',
					defaultStatus: 0,
					address: '',
					changeoradd: ''
				},
				ruleValidate: {
					name: [
                        {required: true, message: '收货人不能为空', trigger: 'blur'},
						{type: 'string', max: 20, message: '收货人不能超过20个字符'}
					],
					tel: [
                        {required: true, message: '联系电话不能为空', trigger: 'blur'},
                        {type: 'string', max: 20, message: '联系电话不能超过20个字符'}, 
                        {type: 'string', validator: validatePass, trigger: 'blur'}
					],
					address: [{type: 'string', max: 150, message: '详细收货地址不能超过150个字符'}]
				},
                prevClass: null,
                delModel: false,
                curModel: '',
                tableModel: [
                    {title: '收货人', key: 'name', width: 70, align: 'center'},
                    {title: '手机/电话', width: 90, key: 'tel'},
                    {title: '地址', width: 110, render: (h,params) => {
                        return h('span', {
                            attrs: {title: params.row.provinceName + ' ' + params.row.cityName + ' ' + params.row.countyName + ' ' + params.row.address},
                            domProps: {innerHTML: params.row.provinceName + ' ' + params.row.cityName + ' ' + params.row.countyName + ' ' + params.row.address}
                        })
                    }},
                    // {title: '详细地址',	key: 'address', render: (h,params) => {
                    //     return h('span', {
                    //         attrs: {title: params.row.address},
                    //         domProps: {innerHTML: params.row.address}
                    //     })
                    // }},
                    {title: '备注', width: 90,	key: 'description', render: (h,params) => {
                        return h('span', {
                            attrs: {title: params.row.description},
                            domProps: {innerHTML: params.row.description}
                        })
                    }},
                    {title: '操作', width: 90, render: (h,params) => {
                        var _this = this;
                        return h('div', [
                            h('span', {
                                class: {'tab-oper': true},
                                domProps: {innerHTML: '编辑'},
                                on: {click: () => {this.toEdit(params.row)}}
                            }),
                            h('span', {
                                class: {'tab-oper': true},
                                domProps: {innerHTML: '删除'},
                                on: {click: () => {this.isDel(params.row)}}
                            }),
                            h('span', {
                                class: {
                                    'tab-oper': params.row.defaultStatus == 0 ? true : false,
                                    'tab-inoper': params.row.defaultStatus == 1 ? true : false
                                },
                                domProps: {
                                    innerHTML: params.row.defaultStatus == 1 ? '默认值' : '设为默认值'
                                },
                                on: {click: () => {this.setDefault(params.row)}}
                            }),
                        ]);
                    }},
                ]
			}
		},
		created() {
			this.compileForm.corpId = this.userInfo.corpId;
			this.searchaddress();
			this.axios({
                method: 'get',
                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                url: '/api/base/address/queryAllProvinces.do'
            })
            .then((res) => {
                if(res.data.status == 1) this.provinceList = res.data.datas;
            })
		},
		computed: {
            userInfo() { return this.$store.state.user.user },
            tableHeight() {
                return this.deliveryList ? this.deliveryList.length * 60 + 50 : 50;
            }
		},
		methods: {
            setDefault(item){
                if(item.defaultStatus == 1){
                    return ;
                }
                var obj = {};
                obj.id = item.id;
                obj.defaultStatus = 1;
                obj.address = item.address;
                obj.cityId = item.cityId
                obj.cityName = item.cityName
                obj.corpId = item.corpId
                obj.countyId = item.countyId
                obj.countyName = item.countyName
                obj.description = item.description
                obj.name = item.name
                obj.provinceId = item.provinceId
                obj.provinceName = item.provinceName
                obj.tel = item.tel;
                this.axios({
                    method: 'post',
                    header: { "Content-Type": 'application/x-www-form-urlencoded'},
                    url: '/api/upms/corp/consignee/modify.do',
                    data: obj,
                })
                .then((res) => {
                    if(res.data.status == 1){
                        this.searchaddress();
                        this.do_yn = true;
                        this.re_do = "修改成功";
                        setTimeout(() => {this.do_yn = false;}, 2000);
                    }
                })
            },
            del() {
				this.axios('/api/upms/corp/consignee/' + this.curModel.id + '/delete.do')
                .then((res) => {
                    if(res.data.status == 1) {
                        this.searchaddress();
                        if(this.curModel.level !== 1) {
                            this.delModel = false;
                            this.do_yn = true;
                            this.re_do = "删除成功";
                            setTimeout(() => {
                                this.do_yn = false;
                            }, 2000);
                        } else {
                            this.delModel = false;
                            this.do_yn = true;
                            this.re_do = "删除成功";
                            setTimeout(() => {
                                this.do_yn = false;
                            }, 2000);
                        }
                    } else if(res.data.status == 0) {
                        this.delModel = false;
                        this.do_no = true;
                        this.re_do = res.data.message;
                        setTimeout(() => {
                            this.do_no = false;
                        }, 2000);
                    }
                })
			},
            ccl() {
				this.delModel = false;
				this.clientClassifyModel = false;
				this.compileForm.name = '';
				this.compileForm.parentId = '';
				this.compileForm.code = '';
				this.compileForm.description = '';
			},
            isDel(item) {
                this.curModel = item;
				this.delModel = true;
			},
            toEdit(item) {
                this.addresschange(item);
            },
			addresschange(item) {
				this.clientClassifyModel = true;
				this.compileForm.changeoradd = 1;
				this.compileForm.corpId = item.corpId;
				this.compileForm.id = item.id;
				this.compileForm.name = item.name;
				this.compileForm.description = item.description;
				this.compileForm.provinceId = item.provinceId;
				this.compileForm.cityId = item.cityId;
				this.compileForm.countyId = item.countyId;
				this.compileForm.tel = item.tel;
				this.compileForm.defaultStatus = item.defaultStatus;
				this.compileForm.address = item.address;
			},
			searchaddress() {
				this.axios({
                    method: 'get',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: '/api/upms/corp/consignee/' + this.compileForm.corpId + '/queryListByCorpId.do',
                    data: api.convertParam({
                        corpId: this.compileForm.corpId
                    })
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        this.deliveryList = res.data.datas;
                    }
                })
			},
			show(index) {
				this.clientClassifyModel = true;
			},
			confirm(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.compileForm.changeoradd == 0) {
							this.axios({
                                method: 'post',
                                header: {"Content-Type": 'application/x-www-form-urlencoded'},
                                url: '/api/upms/corp/consignee/add.do',
                                data: api.convertParam(this.compileForm)
                            })
                            .then((res) => {
                                if(res.data.status == 1) {
                                    this.clientClassifyModel = false;
                                    this.compileForm.name = '';
                                    this.compileForm.description = '';
                                    this.compileForm.provinceId = '';
                                    this.compileForm.cityId = '';
                                    this.compileForm.countyId = '';
                                    this.compileForm.tel = '';
                                    this.compileForm.defaultStatus = 0;
                                    this.compileForm.address = '';
                                    this.searchaddress();

                                    this.do_yn = true;
                                    this.re_do = "添加成功";
                                    setTimeout(() => {
                                        this.do_yn = false;
                                    }, 2000);
                                }
                            })
						} else if(this.compileForm.changeoradd == 1) {
							this.axios({
                                method: 'post',
                                header: { "Content-Type": 'application/x-www-form-urlencoded'},
                                url: '/api/upms/corp/consignee/modify.do',
                                data: api.convertParam(this.compileForm)
                            })
                            .then((res) => {
                                if(res.data.status == 1) {
                                    this.clientClassifyModel = false;
                                    this.compileForm.name = '';
                                    this.compileForm.description = '';
                                    this.compileForm.provinceId = '';
                                    this.compileForm.cityId = '';
                                    this.compileForm.countyId = '';
                                    this.compileForm.tel = '';
                                    this.compileForm.defaultStatus = 0;
                                    this.compileForm.address = '';

                                    this.searchaddress();

                                    this.do_yn = true;
                                    this.re_do = "修改成功";
                                    setTimeout(() => {this.do_yn = false;}, 2000);
                                }
                            })
						}
					}
				})
			},
			addRoot() {
				this.compileForm.changeoradd = 0;
				this.compileForm.corpId = this.userInfo.corpId;
				this.clientClassifyModel = true;
			},
			cancel() {
				this.clientClassifyModel = false;
				this.compileForm.name = '';
                this.compileForm.description = '';
                this.compileForm.provinceId = '';
                this.compileForm.cityId = '';
                this.compileForm.countyId = '';
                this.compileForm.tel = '';
                this.compileForm.address = '';
			},
			registeredprovinceOK() {
				let va = this.compileForm.provinceId;
				this.axios({
                    method: 'get',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: '/api/base/address/' + va + '/queryCities.do'
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        this.cityList = res.data.datas;
                        setTimeout(() => {
                            if(!this.compileForm.cityId){
                                this.compileForm.countyId = '';
                                this.countyList = [];
                            }
                        },0);
                    } else {
                        this.do_no = true;
                        this.re_do = res.data.message;
                        setTimeout(() => {
                            this.do_no = false;
                        }, 2000);
                    }
                })
			},
			registeredcityOK() {
				let va = this.compileForm.cityId;
				this.axios({
                    method: 'get',
                    header: {"Content-Type": 'application/x-www-form-urlencoded'},
                    url: '/api/base/address/' + va + '/queryCounties.do'
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        this.countyList = res.data.datas;
                    } else {
                        this.do_no = true;
                        this.re_do = res.data.message;
                        setTimeout(() => {this.do_no = false;}, 2000);
                    }
                })
			},
		}
	}
</script>

<style scoped>
    .modelFooter {
		text-align: left;
	}
	
	.modelFooter button {
        width: 90px;
        background: #00cbea;
        color: #fff;
	}
</style>