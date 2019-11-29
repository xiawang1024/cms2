<template>
  <div>
    <div ref="qrcode"/> <!-- 创建一个div，并设置id为qrcode -->
  </div>
</template>
   
<script>
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
    props:{
        showQRcode:{
            type:String,
            default:''
        }
    },
  mounted () {
   this.makeqrcode();
  },
  methods: {
    makeqrcode() {
        let node=this.$refs.qrcode
     let qrcode = new QRCode(node, {
        width: 174,  
        height: 174,
        text: this.showQRcode, // 二维码地址
        colorDark : "#000",
        colorLight : "#fff",
      })
    }
    

  }
}
</script>