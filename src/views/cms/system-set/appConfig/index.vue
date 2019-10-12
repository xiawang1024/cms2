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
  name: "UploadApp",
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
      //开机启动图校验尺寸(小图)
      var startPictureSmall=(rule, value, callback)=>{
          let pic=new Image();
          pic.src=value[0].url;
          // if(pic.width!=1242||pic.height!=2208 ){
          //     callback(new Error('请上传1242*2208像素的图片'))
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
              label: "启动页图片（大）",
              name: "startPictureBig",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传启动页图片",
              rule:[
              {
              required: true,
                 validator: startPictureBig,
                  trigger: "blur"
              }

              ]
            }, {
              label: "启动页图片（小）",
              name: "startPictureSmall",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传启动页图片",
              rule:[
              {
                  required: true,
                 validator: startPictureSmall,
                  trigger: "blur"
              }

              ]
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
          this.$emit('handleupload',val,'start')
      },
      
  }
};
</script>
<style lang="scss" scoped>
</style>