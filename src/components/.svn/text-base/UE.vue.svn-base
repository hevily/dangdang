<template>
    <div class="UE">
      <script id='editor' type="text/plain"></script>
    </div>

</template>

<script>
import '../assets/UE/ueditor.config.js'
import '../assets/UE/ueditor.all.min.js'
import '../assets/UE/lang/zh-cn/zh-cn.js'
import '../assets/UE/ueditor.parse.min.js'
export default {
  name: 'uEditor',
  prop : {
    msg : '',
  },
  watch : {
    msg : function(val) {
        if(val !== null) {
            this.editor.setContent(val);
        }
    }
  },
  mounted () {
      this.editor = UE.getEditor('editor',{ 
        
      });

      if(this.msg) {
        this.editor.setContent(msg);
      }

      this.editor.contentChange(function(val) {
        console.log(val);
      })
  },
  data () { 
    return {
      editor : null,
    }
  },
  destroyed () {
    this.editor.destory();
  },
  methods : {
    getUeditorContent : (key) => {
        console.log(this.editor.getContent());
    }
  }
}
</script>

<style scoped>

</style>
