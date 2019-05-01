<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea"/>

    <!-- <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
    </div> -->
  </div>
</template>

<script>
import editorImage from './components/editorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import baseUrl from '@/config/base-url'
export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return (
          'vue-tinymce-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: 'en',
        zh: 'zh_CN'
      },
      upURL: baseUrl.UP_URL,
      downURL: baseUrl.DOWN_URL
    }
  },
  computed: {
    language() {
      return this.languageTypeList[this.$store.getters.language]
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || '')
        )
        console.log(this.value)
      }
    },
    language() {
      this.destroyTinymce()
      this.$nextTick(() => this.initTinymce())
    }
  },
  mounted() {
    this.initTinymce()
    this.parser = new window.tinymce.html.DomParser()
    this.parser.addNodeFilter('img', (nodes, name) => {
      console.log(nodes, name)
    })
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    console.log('destory')
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        // language: this.language,
        language: 'zh_CN',
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['a.weixin.hndt.com', 'wpimg.wallstcn.com'],
        // imagetools_proxy: "proxy.php",
        default_link_target: '_blank',
        link_title: false,
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', e => {
            _this.fullscreen = e.state
          })
        },
        // link_list: [
        //       { title: '预置链接1', value: 'http://www.tinymce.com' },
        //       { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
        //   ],
        //   image_list: [
        //       { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
        //       { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' }
        //   ],
        //   image_class_list: [
        //   { title: 'None', value: '' },
        //   { title: 'Some class', value: 'class-name' }
        //   ],
        // importcss_append: true,
        file_picker_types: 'file image media',
        // images_upload_handler: function (blobInfo, success, failure) {
        //     function uploadPic () {
        //       const xhr = new XMLHttpRequest()
        //       const formData = new FormData()
  
        //       xhr.withCredentials = false
        //       xhr.open('POST', 'http://fupload.test.dianzhenkeji.com:55030/basefile/upload?fileRefId=')
        //       xhr.onload = function () {
        //         var json
  
        //         if (xhr.status !== 200) {
        //           failure('上传失败: ' + xhr.status)
        //           return
        //         }
        //         json = JSON.parse(xhr.responseText)
        //         if (!json || json.status === 'error') {
        //           failure('上传失败: ' + xhr.responseText.msg)
        //           return
        //         }
        //         console.log(json, 'location')
        //         success(json.location)
        //       }
        //       formData.append('file', blobInfo.blob())
        //       console.log(formData, 'formData')
        //       xhr.send(formData)
        //     }
  
        //     if (blobInfo.blob().size > 1024 * 1024 * 5) {
        //       failure('文件体积过大, 请选择5MB以下图片文件')
        //     }
        //     if (blobInfo.blob().type === 'image/jpeg' || blobInfo.blob().type === 'image/png') {
        //       uploadPic()
        //     } else {
        //       failure('请选择jpeg或png格式图片')
        //     }
        //   },
        // file_picker_callback: function (callback, value, meta) {
        //     if (meta.filetype === 'file') {
        //       callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
        //     }
        //     if (meta.filetype === 'image') {
        //       callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
        //     }
        //     if (meta.filetype === 'media') {
        //       callback('http://cmsres.test.dianzhenkeji.com/anonymous/2019/4/30/1123120181959331840.mp4', { source2: 'alt.ogg', poster: 'https://www.baidu.com/img/bd_logo1.png' });
        //     }
        // },
        image_caption: true,
        // //上传文件
        file_picker_callback: function(callback, value, meta) {
          var input = document.createElement('input')
          input.setAttribute('type', 'file')
          // input.setAttribute('accept', 'image/*')
          input.onchange = function() {
            var file = this.files[0]
            let xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.open('POST', _this.upURL);
            xhr.withCredentials = false;
            xhr.upload.onprogress = function (e) {
              // 进度(e.loaded / e.total * 100)
            };
            xhr.onerror = function () {
              //根据自己的需要添加代码
              alert(xhr.status);
              return;
            }
            xhr.onload = function () {
              let json;
              if (xhr.status < 200 || xhr.status >= 300) {
                alert('HTTP 错误: ' + xhr.status);
                return;
              }
              json = JSON.parse(xhr.responseText);
              //假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
              if(json.code==0){
                //接口返回的文件保存地址
                let mediaLocation= _this.downURL + json.result.filePath;
                console.log(json, 'json')
                //cb()回调函数，将mediaLocation显示在弹框输入框中
                callback(mediaLocation, { title: file.name });
              }else{
                console.log(json.msg);
                return;
              }
            } 
            formData = new FormData();
            //假设接口接收参数为file,值为选中的文件
            formData.append('file', file)
            //正式使用将下面被注释的内容恢复
            xhr.send(formData)
          }
          input.click()
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token)
        //     .then(response => {
        //       const url = response.data.qiniu_url;
        //       const formData = new FormData();
        //       formData.append("token", response.data.qiniu_token);
        //       formData.append("key", response.data.qiniu_key);
        //       formData.append("file", blobInfo.blob(), url);
        //       upload(formData).then(() => {
        //         success(url);
        //         progress(100);
        //       });
        //     })
        //     .catch(err => {
        //       failure("出现未知问题，刷新页面，或者联系程序员");
        //       console.log(err);
        //     });
        // }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      console.log(arr, 'arr')
      // .insertContent(`<video class="" src="${v.url}" controls="controls"> </video>`)
      const _this = this
      arr.forEach(v => {
        if(v.type.split('/')[0] == 'video') {
          window.tinymce
          .get(_this.tinymceId)
          .insertContent(`<p>
               <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=${v.url} data-mce-html="%10">
                 <video src=${v.url} width="100%" height="200" controls="controls"></video>
               </span>
            </p>`)
        } else if(v.type.split('/')[0] == 'audio') {
          window.tinymce
          .get(_this.tinymceId)
          .insertContent(`<p>
               <span class="mce-preview-object"  data-mce-object="audio" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=${v.url} data-mce-html="%10">
                 <audio class="wscnph" src=${v.url} width="100%" height="200" controls="controls"></audio>
               </span>
            </p>`)
        } else if (v.type.split('/')[0] == 'image') {
          window.tinymce
          .get(_this.tinymceId)
          .insertContent(`<img class="wscnph" src="${v.url}" >`)
        }
      })
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
  padding-right: 5px;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
  margin-right: 10px;
}
</style>
