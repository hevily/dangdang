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
                <span class="link_span">字幕看板详情</span>
            </Breadcrumb-item>
        </Breadcrumb>
        <div class="right_home_warp test-1">
            <ul class="zg-info">
                <li>
                    <span>字幕：</span><div>{{kanbanInfo.mainBody}}</div>
                </li>
                <li>
                    <span>字体颜色：</span><div :style="'width: 60px;background: ' + kanbanInfo.fontColor"></div>
                </li>
                <li>
                    <span>字体大小：</span><div>{{kanbanInfo.fontSize}}</div>
                </li>
                <li>
                    <span>背景颜色：</span><div :style="'width: 60px;background: ' + kanbanInfo.bgColor"></div>
                </li>
                <li>
                    <span>背景图片：</span><div><img :src="kanbanInfo.bgUrl"></div>
                </li>
                <li>
                    <span>语音合成：</span><div>无</div>
                </li>
                <li>
                    <span>音量：</span><div>{{kanbanInfo.vol}}</div>
                </li>
                <li>
                    <span>字幕速度：</span><div>{{kanbanInfo.spd}}</div>
                </li>
            </ul>
        </div>
        <div class="btn-bot">
            <button class="btn-return" @click="$router.push('/kanban/main/')">返回</button>
        </div>
    </div>
</template>

<script>
    import api from "@/api/api";
    export default {
        data() {
            return {
                kanbanInfo: {}
            }
        },
        created() {
            this.axios({
                url:"/api/kanban/welcome/queryByKanBanId.do?kanBanId=" + this.$route.params.id,
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
    }
</script>

<style scoped>
.zg-info {
    width: 800px;
    margin: 0 auto;
    font-size: 14px;
}
.zg-info li {
    display: flex;
    margin-bottom: 35px;
}
.zg-info span {
    width: 100px;
    text-align: right;
    padding-right: 10px;
}
.zg-info div {
    width: 450px;
    color: #000;
}

</style>