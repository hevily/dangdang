<template>
	<div>
		<div class="stepHead">
			<h3>欢迎注册智谷科技企业云平台</h3>
		</div>
		<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="formBox">
			<FormItem label="会员名" prop="user">
            	<Input v-model="formValidate.user" placeholder="请设置会员名"></Input>
        	</FormItem>
        	<FormItem label="登录密码" prop="password">
            	<Input type="password" v-model="formValidate.password" placeholder="请设置6位以上密码"></Input>
        	</FormItem>
        	<FormItem label="确认密码" prop="passwdCheck">
	            <Input type="password" v-model="formValidate.passwdCheck" placeholder="请再次输入设置的密码"></Input>
	        </FormItem>
            <FormItem label="企业全称" prop="corp">
                <Input v-model="formValidate.corp" placeholder="请输入营业执照上的企业名称"></Input>
            </FormItem>
	        <FormItem label="联系人姓名" prop="contact" class="contactBox">
            	<Input v-model="formValidate.contact" placeholder="请输入真实姓名" class="realName"></Input>
            	<RadioGroup v-model="gender">
			        <Radio label="先生"></Radio>
        			<Radio label="女士"></Radio>
			    </RadioGroup>
        	</FormItem>
        	<FormItem label="手机号码" prop="mobile">
            	<span>+86</span>
                <Input v-model="formValidate.mobile" placeholder="请输入手机号码" class="telNum"></Input>
        	</FormItem>
	        <FormItem label="邮箱" prop="email">
            	<Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
        	</FormItem>
        	
	        <FormItem label="验证码" prop="verifyCode">
	        	<Input type="text" placeholder="请输入验证码" v-model="formValidate.verifyCode"></Input>
	        	<div class="verificationBox">
		        	<input type="button" id="code"  class="verification1" v-model="checkCode" />
		        	<a @click.prevent = "createCode">换一张</a>
	        	</div>
	        </FormItem>
	        <FormItem>
	        	<Checkbox v-model="single">我同意并遵守上述的《智谷网络科技有限公司服务协议》</Checkbox>
	        </FormItem>
			<form-item>
	            <i-button type="primary" @click="handleSubmit('formValidate')" :disabled="disabled">注册</i-button>
	            <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
	        </form-item>
		</Form>
	</div>
</template>

<script>
	import api from '@/api/api'
	export default{
		data () {

			//密码验证
			const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入6位以上密码'));
                } else {
                    if (this.formValidate.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formValidate.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            //失焦验证图和密码
            const checkLpicma = (rule, value, callback) => {   
				let upVerCode = value.toUpperCase();//取得输入的验证码并转化为大写   
				if(upVerCode == '') {
					callback(new Error("请输入验证码"));
				}else if(upVerCode != this.checkCode ) { 
					//若输入的验证码与产生的验证码不一致时 
					this.createCode();//刷新验证码 
					this.formValidate.verifyCode = '';
					callback(new Error("验证码不正确"));
				}else {
					//输入正确时  
					callback();
				} 
			};

			//手机号码验证
			const telVer = (rule, value, callback) => {
				if(!(/^1[34578]\d{9}$/.test(value))){
					//若输入错误的手机号码，提示错误信息
					callback(new Error("请输入正确的手机号码"));
				}else{

					callback();
				}
			};

            return {
            	single: false,
            	checkCode:'',
            	disabled:true,
            	gender: '先生',
            	sex:1,
                formValidate: {
                	corp:'',
                	user:'',
                	mobile:'',
                	password:'',
                	passwdCheck: '',
                    email: '',
                    contact:'',
                    verifyCode:''
                },
                ruleValidate: {
                	corp:[
                    	{ required: true, message: '请输入企业全称', trigger: 'blur'}
                    ],
                	user:[
                		{ required: true, message: '用户名不能为空', trigger: 'blur' }
                	],
                	mobile:[
                    	{ required: true, message: '请输入手机号码', trigger: 'blur'},
                    	{ validator: telVer, trigger: 'blur'}
                    ],
                    password: [
                    	{ required: true, message: '请填写密码', trigger: 'blur' },
                    	{ validator: validatePass, trigger: 'blur' }, 
                        { type:'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ],
                    passwdCheck: [
                    	{ required: true,message:'请填写确认密码', trigger: 'blur' },
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    contact:[
                    	{ required: true,message:'请填写联系人', trigger: 'blur' }
                    ],
                    verifyCode:[
                    	{ required: true, message: '请填写验证码', trigger: 'blur' },
                    	{ validator: checkLpicma, trigger: 'blur' }
                    ]
                    
                    
                }
            }
        },
		methods:{
			
			handleSubmit (name) {   //注册
				const _this = this;
                _this.$refs[name].validate((valid) => {
                	
                    if (valid) {
                    	var newUser={};  //创建对象用于存储页面中的信息
                    	newUser.corp = _this.formValidate.corp;
                    	newUser.user = _this.formValidate.user;
                    	newUser.mobile = _this.formValidate.mobile;
                    	newUser.password = _this.formValidate.password;
                    	newUser.email = _this.formValidate.email;
                    	newUser.verifyCode = _this.formValidate.verifyCode;
                    	//console.log(newUser);
                    	_this.axios({  //发送请求
                    		method: 'post',
                    		header: {
	    		                "Content-Type" : 'application/x-www-form-urlencoded'
	    		            },
	    		            url:api.register,
	    		            data:api.jsonData(newUser),
                    	})
                    	.then(function(res){
                    		
                    		if(res.data.status == 1) {
	    		                _this.instance("success",res.data.message);
	    		            }
	    		            else{
	    		            	_this.instance("error",res.data.message);
	    		            }
                    	})
                    	.catch(function(error){  //抓捕错误信息
                    		console.log(error);
                    	});
                        
                    } else {
                        _this.$Message.error('表单验证失败!');
                    }
                })
            },
            instance (type,message) {
                const title = 'Title';
                const content = '<p>'+ message +'</p>';
                switch (type) {
                    case 'success':
                        this.$Modal.success({
                            content: "您已注册成功，请登录系统并及时进行资质认证，提交认证后，我客服人员将会和您联系！",
                            onOk: ()=>{
                            	this.$router.push("/");
                            }
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            content: content
                        });
                        break;
                }
            },
            handleReset (name) {  //重置
                this.$refs[name].resetFields();
            },

            // 图片验证码
			createCode(){
				//console.log("aaa");
			  var code = ""; 
			  var codeLength = 4;//验证码的长度 
			  var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 
			     'S','T','U','V','W','X','Y','Z');//随机数 
			  for(var i = 0; i < codeLength; i++) {
			   //循环操作 
			   var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35） 
			   code += random[index];//根据索引取得随机数加到code上 
			  } 
			  //console.log(code);
			  this.checkCode = code;//把code值赋给验证码 
			}
			/*,
			checkChange(){
				console.log('aaaa');
			}*/
		},
		mounted(){
			this.createCode();
		},
		
		watch:{   //监听副选框是否选中
			single(newVal){
				//console.log(newVal);
				this.disabled = !newVal;
			},
			gender(newVal){
				if(newVal == '女士'){
					this.sex = 0;
				}else{
					this.sex = 1;
				}
			}
		}
	}
</script>

<style scoped>
	
	
	.formBox{
		padding-left:6%;
		width:50%;
		margin-top:20px;
	}
	.verification1{
	    vertical-align: middle;
	    transform: translate(-15px,0);
	    width: 102px;
	    
		border:1px solid #dddee1;
		border-radius:5px;
		background-color:#f9f9f9;
		font-size:15px;
	}
	.verificationBox{
		position: absolute;
		top:0px;
		right:-170px;
	}
	.verificationBox a{
		color:blue;
		margin-left:-15px;
	}
	.contactBox{
		margin-bottom:22px !important;
	}
    .contactBox .realName{
        width: 50%;
        margin-right: 5px;
    }
    .telNum{
        width: 90%;
    }
</style>