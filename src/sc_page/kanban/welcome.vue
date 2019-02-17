<template>
    <div>
        <Breadcrumb>
            <Breadcrumb-item>
                <router-link to='/main'>
                    <span class="link_span">首页</span>
                </router-link>
            </Breadcrumb-item>
            <Breadcrumb-item>
                <router-link to='../main'>
                    <span class="link_span">看板</span>
                </router-link>
            </Breadcrumb-item>
            <Breadcrumb-item>
                <span class="link_span">字幕看板</span>
            </Breadcrumb-item>
        </Breadcrumb>
        <div class="right_home_warp-nobot test-1">

            <Form :model="formItem" :label-width="100" class="zg-form" :rules="ruleValidate">
                <FormItem label="字幕:" prop="subtitle">
                    <Input v-model="kanbanInfo.mainBody" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入不超过255个汉字的字幕"></Input>
                </FormItem>
                <FormItem label="字体颜色：">
                    <input type="color" class="color-block" v-model="kanbanInfo.fontColor">
                </FormItem>
                <FormItem label="字体大小：">
                    <Select v-model="kanbanInfo.fontSize">
                        <Option v-for="item in numList" :value="item" :key="item">{{item}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="背景颜色：">
                    <input class="color-block" type="color" v-model="kanbanInfo.bgColor" placeholder="输入数值型数据，2位">
                </FormItem>
                <FormItem label="背景图片：">
                    <div class="zg-upload-img" v-if="uploadFile.filePath">
                        <img :src="uploadFile.filePath">
                        <div class="zg-upload-oper">
                            <Icon size="24" color='white' type="eye" @click.native="imgShow" />
                            <Icon size="24" color='white' type="plus" @click.native="imgAdd" />
                        </div>
                    </div>
                    <Upload 
                        :action="uploadUrl"
                        class="zg-upload-only"
                        :on-success="attachmentsSuccess"
                        :headers='uploadHeader'
                        :data='uploadData'
                        :default-file-list="defaultList"
                        :on-remove='handleRemoveUpload'
                        ref="upload"
                    >
                        <div class="zg-upload-icon">
                            <Icon type="plus" size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="语音播报：">
                    <RadioGroup v-model="formItem.radio">
                        <Radio label="无">无</Radio>
                        <Radio label="女音">女音</Radio>
                        <Radio label="男音">男音</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="音量：">
                    
                    <Slider v-model="vol" :min="0" :max="15"></Slider>
                    <span style="float:left;margin-top:-10px">0</span><span style="float:right;margin-top:-10px">15</span>
                </FormItem>
                <FormItem label="字幕速度：">
                    <Slider v-model="speed" :min="0" :max="10"></Slider>
                    <span style="float:left;margin-top:-10px">0</span><span style="float:right;margin-top:-10px">10</span>
                </FormItem>
                <FormItem>
                    <button class="btn-save" @click="save">保存</button>
                    <button class="btn-cancel" @click="$router.push('/kanban/main/')">取消</button>
                </FormItem>
            </Form>
            <div class="preview" :style="{'background-img':kanbanInfo.bgUrl,}">
                <marquee class="srcoll" scrollamount="20" onfinish="replay();" :style="{'background':kanbanInfo.bgColor, 'background-img':kanbanInfo.bgUrl,}">
                    <p id="welcome_body" :style="{'color':kanbanInfo.fontColor,'font-size':kanbanInfo.fontSize+'px'}">{{kanbanInfo.mainBody}}</p>
                </marquee>
            </div>
        </div>
        <tis :re_do="re_do" :do_yn="do_yn" :do_no="do_no"></tis>
    </div>
</template>
<script>
import tis from "@/page/set/tishisub.vue";
import api from "@/api/api";
export default {
    components: {
        tis: tis
    },
    data() {
        return {
            kanbanInfo: {},
            re_do: "",
            do_yn: false,
            do_no: false,

            defaultList: [],
            uploadList: [],
            uploadData: {
                path: "product"
            },
            uploadFile: {
                filePath: ""
            },
            uploadUrl: api.uploadFileUrl,
            vol: 5,
            speed: 5,
            formItem: {
                input: "",
                select: "",
                radio: "male",
                checkbox: [],
                switch: true,
                date: "",
                time: "",
                slider: [],
                textarea: ""
            },
            numList:[5,8,9,10,11,12,14,16,18,20,22,24,26,28,36,48,72],
            ruleValidate: {
                subtitle: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    { type: 'string', max: 255, message: '不能超过255个汉字', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        imgAdd(){
            console.log(this.$refs.upload);
            this.$refs.upload.handleClick();
        },
        save() {
            console.log("kanban", this.kanbanInfo);
            this.kanbanInfo.vol = this.vol;
            this.kanbanInfo.spd = this.spd;
            this.axios({
                url: "/api/kanban/welcome/modify.do",
                method: "post",
                data: this.kanbanInfo
            }).then(res => {
                if (res.data.status == 1) {
                    this.queryKanBan = res.data.datas;
                    this.re_do = "保存成功";
                    this.do_yn = true;
                    setTimeout(() => {
                        this.do_yn = false;
                    }, 2000);
                } else {
                    this.re_do = res.data.message;
                    this.do_no = true;
                    setTimeout(() => {
                        this.do_no = false;
                    }, 2000);
                }
            });
        },
        handleRemoveUpload(file, fileList) {
            this.uploadList = fileList;
        },
        attachmentsSuccess(res, file, fileList) {
            console.log("filelist", fileList);
            if (fileList.length > 1) {
                fileList.splice(0, 1);
            }
            if (file.response.status == 0) {
                this.re_do = file.response.message;
                this.do_no = true;
                setTimeout(() => {
                    this.do_no = false;
                }, 2000);
                return;
            }
            this.uploadFile = file.response;
            this.kanbanInfo.bgUrl = res.url;
            this.uploadList = fileList;
            this.re_do = "附件提交成功";
            this.do_yn = true;
            setTimeout(() => {
                this.do_yn = false;
            }, 2000);
        }
    },
    computed: {
        uploadHeader() {
            const tokenId = this.$store.state.token;
            return {
                token_id: tokenId
            };
        }
    },
    created() {
        this.axios({
            url:
                "/api/kanban/welcome/queryByKanBanId.do?kanBanId=" +
                this.$route.params.id,
            method: "get"
        }).then(res => {
            console.log("url", res);
            if (res.data.status == 1) {
                this.kanbanInfo = res.data.datas;
                this.vol = parseInt(this.kanbanInfo.vol);
                this.spd = parseInt(this.kanbanInfo.spd);
                this.uploadFile.filePath = this.kanbanInfo.bgUrl;
            }
        });
    }
};
</script>

<style scoped>

.color-block {
    width: 60px;
    border: none;
    outline: none;
    vertical-align: middle;
}

::-webkit-color-swatch-wrapper {
    background-color: #ffffff;
}
::-webkit-color-swatch {
    position: relative;
    border: none;
}
</style>
