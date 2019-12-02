<template>
  <div>
    <div ref="qrcode" />
    <!-- 创建一个div，并设置id为qrcode -->
  </div>
</template>
   
<script>
import QRCode from "qrcodejs2"; // 引入qrcode
export default {
  props: {
    showQrcode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      qrcode: null,
      node:null,
    };
  },
  watch: {
    showQrcode(val) {
      //容器格式化
      let childs =  this.$refs.qrcode.childNodes;
      for (var i = childs.length - 1; i >= 0; i--) {
        this.node.removeChild(childs[i]);
      }
      this.makeqrcode();
    },
    
  },  
  mounted(){
      this.makeqrcode();
  },
  mounted() {
    this.node = this.$refs.qrcode;
  },
  methods: {
    makeqrcode() {
      this.qrcode = new QRCode(this.node, {
        width: 124,
        height: 124,
        text: this.showQrcode, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
    }
  }
};
</script>