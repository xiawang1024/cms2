<template>
  <div>
    <v-form
      ref="vform"
      :form-settings="formSettings"
      :form-data="formData"
      @save="submitSave"
      label-width="130px"
      :btn-loading="isLoading"
    />
  </div>
</template>
<script>
export default {
  name: "UploadApp",
  data() {
      //开机启动图校验尺寸
      var startPicture=(rule, value, callback)=>{
          let pic=new Image();
          pic.src=value[0].url;
          if(pic.width!=120||pic.height!=70){
              callback(new Error('请上传120*70像素的图片'))
          }else{
              callback()
          }
         

      };
      //icon 图标尺寸校验
      var iconPicture=(rule, value, callback)=>{
          let pic=new Image();
          pic.src=value[0].url;
          if(pic.width!=120||pic.height!=70){
              callback(new Error('请上传120*70像素的图片'))
          }else{
              callback()
          }
         

      };
    return {
        formData:{},
        formSettings: [
        {
          items: [
            {
              label: "app名字",
              name: "appName",
              type: "text",
              valueType: "string",
              disabled: false,
              required: true,
              placeholder: "请输入app名字",
            
            },
            {
              label: "启动页图片",
              name: "startingImage",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请输入启动页图片URL",
              rule:[
              {
              required: true,
                 validator: startPicture,
                  trigger: "blur"
              }

              ]
            },
           
          ]
        }
      ],
    };
  },
  created() {},
  methods: {
      submitSave(val){
          console.log(val,'va')
      },
      
  }
};
</script>
<style lang="scss" scoped>
</style>