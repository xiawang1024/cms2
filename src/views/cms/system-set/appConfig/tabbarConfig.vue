<template>
  <div>
    <v-form
      ref="vform"
      :form-settings="formSettings"
      :form-data="formData"
      @save="submitSave"
      label-width="150px"
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
              label: "我的主题图",
              name: "myImageUrl",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, {
              label: "导航图",
              name: "themeImageUrl",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, 
            {
              label: "底部图标1（选中）",
              name: "icon00",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, 
            {
              label: "底部图标1（未选中）",
              name: "icon10",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, 
            {
              label: "名字",
              name: "name0",
              type: "text",
              disabled: false,
              placeholder: "请输入导航名",
              required:true,
            },
            {
              label: "底部图标2（选中）",
              name: "icon01",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, 
            {
              label: "底部图标2（未选中）",
              name: "icon11",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, 
            {
              label: "名字",
              name: "name1",
              type: "text",
              disabled: false,
              placeholder: "请输入导航名",
              required:true,
            },{
              label: "底部图标3（选中）",
              name: "icon02",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, {
              label: "底部图标3（未选中）",
              name: "icon12",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, 
            {
              label: "名字",
              name: "name2",
              type: "text",
              disabled: false,
              placeholder: "请输入导航名",
              required:true,
            },{
              label: "底部图标4（选中）",
              name: "icon03",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, {
              label: "底部图标4（未选中）",
              name: "icon13",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, 
            {
              label: "名字",
              name: "name3",
              type: "text",
              disabled: false,
              placeholder: "请输入导航名",
              required:true,
            },{
              label: "底部图标5（选中）",
              name: "icon04",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, {
              label: "底部图标5（未选中）",
              name: "icon14",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
            }, 
            {
              label: "名字",
              name: "name4",
              type: "text",
              disabled: false,
              placeholder: "请输入导航名",
              required:true,
            },
            {
              label: "版本",
              name: "version",
              type: "text",
              disabled: false,
              placeholder: "请输入版本号",
              required:true,
            },{
              label: "启用主题",
              name: "status1",
              disabled: false,
              type:"checkbox",
              value:false,
              options: [{ // select、radio、checkbox等的选择内容
                    label: '启用',
                    value: true
                }]
            },{
              label: "主题色(#ffffff)",
              name: "color",
              type: "text",
              disabled: false,
              placeholder: "请输入主题色",
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
          this.$emit('iconUpload',val)
      },
      
  }
};
</script>
<style lang="scss" scoped>
</style>