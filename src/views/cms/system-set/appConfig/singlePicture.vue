<template>
  <div>
    <v-form
      ref="vform"
      :form-settings="formSettings"
      :form-data="formData"
      @save="submitSave"
      label-width="130px"
    />
  </div>
</template>
<script>
export default {
  data() {
      //开机启动图校验尺寸(大图)
      var startPictureBig=(rule, value, callback)=>{
          let pic=new Image();
          pic.src=value[0].url;
          // if(pic.width!=1242||pic.height!=2688){
          //     callback(new Error('请上传1242*2688像素的图片'))
          // }else{
              callback()
          // }
         

      };
     
    return {
        formData:{},
        formSettings: [
        {
          items: [
            {
              label: "图片",
              name: "themeImage",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, 
            {
              label: "版本",
              name: "version",
              type: "text",
              disabled: false,
              placeholder: "请输入版本号",
              required:true,
            },
           
          ]
        }
      ],
    };
  },
  created() {},
  methods: {
      submitSave(val){
          this.$emit('handleupload',val,'theme')
      },
      
  }
};
</script>
<style lang="scss" scoped>
</style>