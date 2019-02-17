<template>
    <div class="add_news">
        <Breadcrumb>
			<Breadcrumb-item>
				<router-link to='/main'>
					<span class="link_span">首页</span>
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>公告</Breadcrumb-item>
			<Breadcrumb-item>
				<router-link to='/base/news/main'>
					公告列表
				</router-link>
			</Breadcrumb-item>
			<Breadcrumb-item>
				<span class="link_span ok_link" v-if="isModify">修改公告信息</span><span class="link_span ok_link" v-else>新增公告信息</span>
			</Breadcrumb-item>
		</Breadcrumb>
        <div class="right_home_warp">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="标题" prop="title">
                            <Input v-model="formValidate.title" placeholder="最多输入50个字符"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="发布者" prop="author">
                            <Input v-model="formValidate.author" placeholder="最多输入10个字符"></Input>
                        </FormItem>
                    </Col>
                     <Col span="6">
                        <FormItem label="发布日期" prop="publishTime">
                            <DatePicker type="date" placeholder="请选择日期" v-model="formValidate.publishTime"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="" style="margin-bottom: 8px !important;">
                    <RadioGroup v-model="formValidate.linkOrContent" class="url-info-box" >
                        <Row>
                            <Col span="1">
                                <Radio label="2">地址信息</Radio>
                            </Col>
                            <Col span="1" offset = "5" class="normal-info">
                                <Radio label="1">普通信息</Radio>
                            </Col>
                        </Row>
                    </RadioGroup>
                </FormItem>
                <Row>
                    <Col span="11">
                        <FormItem v-if="formValidate.linkOrContent == '2'" label="URL地址" prop="linkUrl">
                            <Input v-model="formValidate.linkUrl" placeholder="最多输入500个字符"></Input>
                        </FormItem>
                        <FormItem v-else label="发布内容">
                            <editor id="editor_id" height="500px" width="100%" :content="formValidate.mainBody" pluginsPath="/static/kindeditor/plugins/" :loadStyleMode="false" @on-content-change="onContentChange"></editor>

                            <!--:options="editorOption"-->
                            <quill-editor v-model="formValidate.mainBody" ref="myQuillEditor">
                                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"
                            </quill-editor>
                            <script id='editor' type="text/plain"></script>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="btn-bot">
            <button class="btn-save" @click="publish_new('formValidate')">发布</button>
            <button class="btn-return" @click="backNewsList">返回</button>
		</div>
    </div>
</template>

<script>
import api from '@/api/api'
import '../../../assets/UE/ueditor.config.js'
import '../../../assets/UE/ueditor.all.min.js'
import '../../../assets/UE/lang/zh-cn/zh-cn.js'
import '../../../assets/UE/ueditor.parse.js'
import ue from '@/components/UE'
export default {
    data(){
        return{
            
            isModify: false,
            formValidate: {
                code: '123',  //编码
                type: 'news',  //news、rules由请求地址提供
                title: '',  //标题
                author: '', //发布者
                publishTime: '',  //发布时间
                linkOrContent: '1',
                linkUrl: '',  //链接地址
                //mainBody: '', //文件内容
                summary: ''
            },
            ruleValidate: {
                title:[
                    { type: 'string', max: 50, message: '标题长度不超过50个字符', trigger: 'blur' }
                ],
                author:[
                    { type: 'string', max: 10, message: '发布者长度不超过10个字符', trigger: 'blur' }
                ],
                publishTime:[
                    {  type: 'date', message: '请选择日期', trigger: 'change' }
                ],
                linkOrContent:[
                    { message: '请选择信息类型', trigger: 'change' }
                ],
                linkUrl:[
                    { type: 'string', max: 10, message: 'url长度不超过500个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // save (name) {
        //     this.$refs[name].validate((valid) => {
        //         if (valid) {
        //             this.$Message.success('Success!');
        //         } else {
        //             this.$Message.error('Fail!');
        //         }
        //     })
        // },
        backNewsList () {
            this.$router.push('/base/news/main');
        },
        publish_new(name){
            var _this = this;
            _this.$refs[name].validate((valid) => {
                if(valid){
                    _this.axios({
                        method: 'post',
                        header: {
                            "Content-Type": 'application/x-www-form-urlencoded'
                        },
                        url: api.addNew,
                        data: api.convertParam(_this.formValidate)
                    })
                    .then(function(res){
                        const data = res.data;
                        if(data.status == 1){
                            _this.$router.push('/base/news/main');
                            //console.log("res",data);
                        }else{
                            console.log("error1");
                            _this.do_no = true;
                            _this.re_do = res.data.message;
                            setTimeout(() => {
                                _this.do_no = false;

                            }, 2000);
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                }
            })
        },
        // 富文本
        onContentChange(val) {
            this.formValidate.mainBody = val;

        },

    }
}
</script>

<style scoped>
    .url-info-box{
        width: 100%;
    }
    .normal-info{
        padding-left: 20px;
    }
</style>


