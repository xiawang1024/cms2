<template>
  <div :class="{ fullscreen: fullscreen }" class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea" />
  </div>
</template>

<script>
// import editorImage from "./components/editorImage";
import plugins from "./plugins";
import toolbar from "./toolbar";
import baseUrl from "@/config/base-url";
// import 'tinymce-imageupload'
import "@/common/editor-upload";
export default {
  name: "Tinymce",
  // components: { editorImage },
  props: {
    id: {
      type: String,
      default: function () {
        return (
          "vue-tinymce-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      }
    },
    value: {
      type: String,
      default: ""
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    menubar: {
      type: String,
      default: "file edit insert view format table"
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    isRetain: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: "en",
        zh: "zh_CN"
      },
      upURL: baseUrl.UP_URL,
      downURL: baseUrl.DOWN_URL
    };
  },
  computed: {
    language() {
      return this.languageTypeList[this.$store.getters.language];
    }
  },

  // 第一次不触发
  watch: {
    value(val) {
      // alert('watch')

      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || "")
        );
      }
    },
    language() {
      this.destroyTinymce();
      this.$nextTick(() => this.initTinymce());
    },


  },
  mounted() {
    this.destroyTinymce();
    this.initTinymce();
    this.parser = new window.tinymce.html.DomParser();
    this.parser.addNodeFilter("img", (nodes, name) => {
    });
  },
  activated() {
    this.destroyTinymce();
    this.initTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  },

  destroyed() {
    if (this.isRetain) {
      // alert('请确保已经保存编辑器文档内容')
    }
    this.destroyTinymce();
  },
  methods: {
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        media_dimensions: false,//显示隐藏宽高尺寸输入框
        media_alt_source: false,//显示隐藏资源备用地址输入框
        language: "zh_CN",
        // inline: true,

        branding: false, //隐藏右下角技术支持

        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: "panel-body ",
        // 是否可以缩放图片
        // object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        draggable_modal: true,
        menubar: false,
        plugins: plugins,
        autosave_interval: '20s',
        autosave_prefix: 'tinymce-autosave',
        templates: [
          { title: '时政新闻模板', description: '时政新闻模板--编辑可直接用此类模板插入到编辑器,只需修改关键的标题/图片等 无需再重新排版,', content: '<p><audio src=\"http://cmsres.dianzhenkeji.com/anonymous/2019/11/4/1191261613651529728.mp3\" controls=\"controls\"></audio></p>\n<p><img title=\"9m7CNhq1.gif\" src=\"http://www.hndt.com/original/201911/04/2419613/res/9m7CNhq1.gif?1572853732681\" alt=\"GvvcY7Va..gif.gif\" data-bd-imgshare-binded=\"1\" /></p>\n<p>七十年风云际会，中国从一个积贫积弱的国家，一跃成为当今世界第二大经济体，综合国力的历史性跨越令世人瞩目。1949年中国人民解放军海军部队和军司令部相继成立。历经70年锤炼，中国海军、空军正以更强大的实力守卫着祖国的碧海蓝天。</p>\n<p><img title=\"ODzfAPot.jpg\" src=\"http://www.hndt.com/original/201911/04/2419613/res/ODzfAPot.jpg?1572853743438\" alt=\"SuYO3Wyc..jpg.jpg\" data-bd-imgshare-binded=\"1\" />当七子之歌再度回响耳畔之时，澳门回归祖国已经20周年。20年来，澳门已经成为中国和国际社会交流的重要窗口&hellip;&hellip;随着去年港珠澳大桥的建成通车，澳门以及整个珠三角也将迎来全新的发展机遇。</p>\n<p><img title=\"2jIOlprV.jpg\" src=\"http://www.hndt.com/original/201911/04/2419613/res/2jIOlprV.jpg?1572853770172\" alt=\"fZzzIx7G..jpg.jpg\" data-bd-imgshare-binded=\"1\" />今年是中美建交40年，历经风雨坎坷，教训和启示一路相随。如今，步入&ldquo;不惑之年&rdquo;的中美关系，能否穿透迷雾，向着合作共赢迈进，不仅事关两国人民利益，也将对国际社会产生深远影响。</p>\n<p>2019是全面建成小康社会关键之年，新个税实施，进一步提速降费，一系列惠民新政陆续出台，老百姓受益良多，人民群众的获得感、幸福感越来越强&hellip;&hellip;就像歌词中写的那句&ldquo;家是最小国 国是千万家 有了强的国 才有富的家&rdquo;</p>\n<p>强大祖国，未来可期。</p> ' },
          { title: '闲谈类模板', description: '编辑可直接用此类模板插入到编辑器,只需修改关键的标题/图片等 无需再重新排版,', content: '<p class=\"ql-align-center\">对不少人来说，终其一生，</p>\n<p class=\"ql-align-center\">可能都没乘坐过救护车，陌生而神秘！</p>\n<div class=\"pgc-img\"><img src=\"http://p1.pstatp.com/large/pgc-image/5fc52de1979a47398af59765b5f0d708\" data-image_ids=\"[]\" />\n<p class=\"pgc-img-caption\">但你知道吗？</p>\n</div>\n<p class=\"ql-align-center\">在中原这片土地上，</p>\n<p class=\"ql-align-center\">每天，</p>\n<p class=\"ql-align-center\">平均有<strong>3000辆救护车</strong>奔走在接诊的路上，</p>\n<p class=\"ql-align-center\">为至少<strong>30000人</strong>带来生命的希望！</p>\n<div class=\"pgc-img\"><img src=\"http://p9.pstatp.com/large/pgc-image/3c1c5e6a592143448ef64cdbd7584f40\" data-image_ids=\"[]\" />\n<p class=\"pgc-img-caption\">&nbsp;</p>\n</div>\n<p class=\"ql-align-center\">对不少人来说，</p>\n<p class=\"ql-align-center\">医生是一群高冷到看穿生死的人类，</p>\n<p class=\"ql-align-center\">惊心动魄、刀光剑影、鲜血淋漓&hellip;&hellip;</p>\n<p class=\"ql-align-center\">与温情绝缘！</p>\n<p class=\"ql-align-justify\">&nbsp;</p>\n<p class=\"ql-align-center\">&nbsp;</p>\n<div class=\"pgc-img\"><img src=\"http://p3.pstatp.com/large/pgc-image/e091acbf87e944058ec960c1112ca614\" data-image_ids=\"[]\" />\n<p class=\"pgc-img-caption\">&nbsp;</p>\n</div>\n<p class=\"ql-align-center\">但你知道吗？</p>\n<p class=\"ql-align-center\">在中原这片土地上，</p>\n<p class=\"ql-align-center\">每天，有<strong>7000位医生</strong>忙碌在手术台旁，</p>\n<p class=\"ql-align-center\">让至少<strong>15000人</strong>重新获得健康！</p>\n<div class=\"pgc-img\"><img src=\"http://p1.pstatp.com/large/pgc-image/9817060ca058461fbe9a905e505a5c87\" data-image_ids=\"[]\" />\n<p class=\"pgc-img-caption\">&nbsp;</p>\n</div>\n<p class=\"ql-align-center\">对不少人来说，</p>\n<p class=\"ql-align-center\">茫茫人海，</p>\n<p class=\"ql-align-center\">若能偶遇一个和自己同年同月同日出生的人，</p>\n<p class=\"ql-align-center\">总会感叹缘分奇妙，好惊喜！</p>\n<div class=\"pgc-img\"><img src=\"http://p1.pstatp.com/large/pgc-image/ebfcb58a416d4260aee40e7e9251e33d\" data-image_ids=\"[]\" />\n<p class=\"pgc-img-caption\">&nbsp;</p>\n</div>\n<p class=\"ql-align-center\">但你知道吗？</p>\n<p class=\"ql-align-center\">仅在中原这片土地上，</p>\n<p class=\"ql-align-center\">每天，平均就有<strong>3400名婴儿</strong>出生，</p>\n<p class=\"ql-align-center\">大家都是有缘人！</p>\n<div class=\"pgc-img\"><img src=\"http://p3.pstatp.com/large/pgc-image/1e259baf087b47c6ae258cb11f07b01e\" data-image_ids=\"[]\" />\n<p class=\"pgc-img-caption\">&nbsp;</p>\n</div>\n<p class=\"ql-align-center\">对不少人来说，</p>\n<p class=\"ql-align-center\">熟知的医院只有那么几家，</p>\n<p class=\"ql-align-center\">接触过的大夫也就那么多&hellip;&hellip;</p>\n<p class=\"ql-align-center\">但你知道吗？</p>\n<p class=\"ql-align-center\">在中原这片土地上，</p>\n<p class=\"ql-align-center\">每天，</p>\n<p class=\"ql-align-center\">平均有<strong>150万人</strong>走进<strong>7万所医疗卫生机构</strong>，</p>\n<p class=\"ql-align-center\">他们身后，</p>\n<p class=\"ql-align-center\">有中原<strong>50万白衣天使</strong>在保驾护航。</p>\n<div class=\"pgc-img\"><img src=\"http://p3.pstatp.com/large/pgc-image/7f1aed1a20cf40e4a7f8e514fbee5560\" data-image_ids=\"[]\" />\n<p class=\"pgc-img-caption\">&nbsp;</p>\n</div>\n<p class=\"ql-align-center\"><strong>医生究竟是一个什么样的群体？</strong></p>\n<p class=\"ql-align-center\"><strong>医生每天都是怎么工作的？</strong></p>\n<p class=\"ql-align-center\"><strong>医生为什么会让人觉得高冷？</strong></p>\n<p class=\"ql-align-center\"><strong>他们温情的一面是什么样？</strong></p>\n<p class=\"ql-align-center\"><strong>&hellip;&hellip;&hellip;&hellip;</strong></p>\n<p class=\"ql-align-justify\">&nbsp;</p>\n<p class=\"ql-align-justify\">带着对&ldquo;医生&rdquo;、对&ldquo;急救&rdquo;的好奇，也为了让更多人更全面的认识医生，走进医生真实的日常，<strong>河南卫视携手河南省卫生健康委员会，会同省内多家知名医院，策划出了大型医疗急救纪实专题《生命进行时》。</strong></p>\n<p class=\"ql-align-justify\"><strong><video controls=\"controls\" width=\"300\" height=\"150\">\n<source src=\"http://cmsres.dianzhenkeji.com/anonymous/2019/7/16/1151070906328682496.mp4\" type=\"video/mp4\" /></video></strong></p>\n<p class=\"ql-align-justify\"><strong>《生命进行时》本季预计共推出13集，每集50分钟。&nbsp;</strong>打造《生命进行时》，节目组将镜头聚焦于河南省13家知名医院，全程跟拍医疗急救全过程，记录发生在急救车、急诊室和抢救室中生与死的故事；同时，节目团队也将深度关注医护人员面临&ldquo;急难险重&rdquo;患者时，争分夺秒抢救生命的全过程，以完全纪实的手法，讲述在生命遭遇危难的时刻，急救小组克服如何重重险阻，给弱者以抚慰，给生命以关怀，给病患以温暖的动人故事，力争为观众呈现真实、立体、温暖、生动、美丽的&ldquo;生命进行时&rdquo;。</p>\n<p class=\"ql-align-center\">&nbsp;</p>\n<div class=\"pgc-img\"><img src=\"http://p1.pstatp.com/large/pgc-image/cd30c6cff8ba4323aec401bb55fb5b6e\" data-image_ids=\"[]\" />\n<p class=\"pgc-img-caption\">&nbsp;</p>\n</div>\n<p>《生命进行时》预计在2019年第四季度，登陆河南卫视晚间黄金档，大家一起拭目以待吧！更多有关《生命进行时》的信息，也请大家关注我们的官方微信平台，我们将第一时间与大家分享拍摄故事、制作进程。</p>' },
          { title: '更多模板', description: '更多模板敬请期待', content: '' }
        ],

        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,

        advlist_bullet_styles: 'circle,disc,square',
        advlist_number_styles: 'lower-alpha,lower-roman,upper-alpha,upper-roman',
        imagetools_cors_hosts: ["a.weixin.hndt.com", "wpimg.wallstcn.com"],

        default_link_target: "_blank",
        link_title: false,
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        imagetools_toolbar:
          "rotateleft rotateright | flipv fliph | editimage imageoptions",
        // 新加
        imageupload_url: this.upURL,

        // 新的多图上传插件
        images_upload_handler: function (blobInfo, succFun, failFun) {
          var xhr, formData;

          var file = blobInfo.blob();//转化为易于理解的file对象
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', _this.upURL);
          xhr.onload = function () {
            var json;
            if (xhr.status != 200) {
              failFun('HTTP Error: ' + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);
            var imgurl = `${_this.downURL}${json.result.filePath}`
            if (!json || typeof imgurl != 'string') {
              failFun('Invalid JSON: ' + xhr.responseText);
              return;
            }
            succFun(`${_this.downURL}${json.result.filePath}`);
          };
          formData = new FormData();
          formData.append('file', file, file.name);

          xhr.send(formData);
        },
        // setup: function (editor) {

        // },
        // 每次初始化的时候都会执行 editor就是实例
        init_instance_callback: editor => {
          // 确定是值没有传过来

          if (_this.value) {

            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          // 绑定事件  编辑器内有变化时候 触发
          editor.on("NodeChange Change KeyUp SetContent", () => {
            // 特别注意 版本升级到5 绑定时候会默认执行里面内容 导致watch第一次检测回显时候不执行
            setTimeout(() => {
              this.hasChange = true;
            }, 300);
            this.$emit("input", editor.getContent());
            // console.log(editor.getContent());

          });
          editor.addShortcut("ctrl+s", "Custom Ctrl+S", "custom_ctrl_s");
          editor.addCommand("custom_ctrl_s", function () {
            return;
            /*
            your custom codes
            */
          });

        },
        setup(editor) {
          editor.on("FullscreenStateChanged", e => {
            _this.fullscreen = e.state;
          });
        },
        file_picker_types: "file image media",

        image_caption: true,
        // //上传文件
        file_picker_callback: function (callback, value, meta) {

          var input = document.createElement("input");
          input.setAttribute("type", "file");
          // input.setAttribute('multiple', 'multiple')
          // input.setAttribute('accept', 'image/*')
          input.onchange = function () {
            var file = this.files[0];
            let xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.open("POST", _this.upURL);
            const loading = _this.$loading({
              lock: true,
              text: '视频上传中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            xhr.withCredentials = false;
            xhr.upload.onprogress = function (e) {
              // 进度(e.loaded / e.total * 100)
            };
            xhr.onerror = function () {
              //根据自己的需要添加代码
              alert(xhr.status);
              loading.close()
              return;
            };
            xhr.onload = function () {
              let json;
              if (xhr.status < 200 || xhr.status >= 300) {
                alert("HTTP 错误: " + xhr.status);
                loading.close()
                return;
              }
              json = JSON.parse(xhr.responseText);
              //假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
              if (json.code == 0) {
                loading.close()
                // alert("接口返回的文件保存地址")
                //接口返回的文件保存地址
                let mediaLocation = _this.downURL + json.result.filePath;
                //cb()回调函数，将mediaLocation显示在弹框输入框中
                callback(mediaLocation, { title: file.name });
              } else {
                return;
              }
            };
            formData = new FormData();
            //假设接口接收参数为file,值为选中的文件
            formData.append("file", file);
            //正式使用将下面被注释的内容恢复
            xhr.send(formData);
          };
          input.click();
        }
      });
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand("mceFullScreen");
      }
      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {

      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    }
  }
};
</script>
<style lang="scss">
.tox .tox-dialog__body-nav-item:nth-of-type(2) {
  display: none !important;
}
.tinymce-container {
  .mce-fullscreen {
    z-index: 1001;
  }
}
</style>
