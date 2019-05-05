<template>
  <div class="box">
    <el-row class="atLeft" style="minWidth:1100px" >
      <el-button v-for="x in 15" :key="x" class="btn" type="primary" icon="el-icon-circle-plus" @click="add(x-1)">{{ componentValue[x-1] }}</el-button>
      <el-table :data="componentsList" >  
        <el-table-column type="expand" >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图片信息" v-show="props.row.pictureList.length">
                <el-row v-for="(item,index) in props.row.pictureList" :key="index">
                  <el-row>
                    <span> 名字:{{ item.name }}</span>
                  </el-row>
                  <el-row>
                    <span v-show="props.row.type==0" > 跳转路径:{{ item.url }}</span>
                  </el-row>
                  <el-row>
                    <span> 图片资源地址:{{ item.path }}</span>
                  </el-row>
                  <el-row>
                    <span> 序号:{{ item.sort }}</span>&#x3000;&#x3000;
                    <span> 创建时间:{{ item.createTime |formate }}</span>
                  </el-row>
                  
                  
                </el-row>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="组件名字"/>
        <el-table-column prop="description" label="描述"/>
        <el-table-column prop="url" label="链接地址"/>
        <el-table-column prop="sort" label="排序"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdite(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleAdd(scope.$index,scope.row)" v-show="scope.row.type==0">添加图片</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    
        
       
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="130px" :btn-loading = "isLoading"/>
    </el-dialog>
  </div>
</template>
<script>
import {searchPageConfig,addPageConfig,deletePageConfig,editPageConfig,putPicture,searchPage,updatePicture} from '@/api/cms/appConfig.js'
export default {
    name:'AppPages',
    filters: {
        formate(value) {
          if (!value){
             return '暂无数据'
          }else{
            value = value.replace('T',' ')
           return value.replace('.000+0000','')
          }
        }
    },
    data(){
        return{
            dialogVisible:false,
            isLoading:false,
            dialogTitle:'',
            topTypeId:this.$route.query.pageId,
            handleType:'',
            formData:{},
            saveData:{},
            formSettings:[{
                items:[
                    {
                      label: '描述',
                      name: 'description',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入描述'
                    },
                    {
                      label: 'URL',
                      name: 'url',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入URL'
                    },
                    {
                      label: '排序',
                      name: 'sort',
                      type: 'number',
                      value:1,
                      valueType: 'number',
                      disabled: false,
                      required: true,
                      placeholder: '请输入序列号'
                    }
                ]
            }],
            currentType:'',
            componentValue:[
              '轮播图',
              '新闻列表(不可评论)',
              '新闻列表(可评论)',
              '广告位',
              '查询链接列表',
              '视频列表',
              '直播列表',
              '广播列表',
              '电视列表',
              '日历限行组件',
              '论坛',
              '高清图集',
              '商城',
              '爆料',
              '备用组件'
            ],
            //加载时获取的列表
            componentsList:[
                {
                    name:'轮播图',
                    url:'http:www.baidu.com'
                }
            ]
        }
    },
    created(){
        //发送请求数据
        this.getFullPageConfig();

    },
    methods:{
      
      
      //页面初始化请求
      getFullPageConfig(){
        var _this=this;
        return new Promise((resolve,reject)=>{
          searchPageConfig(this.topTypeId)
          .then((response)=>{
              if(response.data.code=='0'){
                _this.componentsList=response.data.result.content
                //获取页面图片配置详情
                 _this.componentsList.forEach((item,index)=>{
                      return new Promise((resolve,reject)=>{
                        searchPage(item.id)
                        .then((response)=>{
                          if(response.data.code=='0'){
                            item.pictureList=response.data.result.pictureList
                          }
                        })
                        .catch((reject)=>{

                        })
                      })
                 })
              }else{
                 this.$message({
                        type:'error',
                        message:response.data.msg
                    })
              }
            resolve();
          })
          .catch((reject)=>{
                    this.$message({
                        type:'error',
                        message:reject.error
                    })
          })
        })
      },
        add(type){
            this.handleType='add'
            this.currentType=type;
            this.dialogTitle=this.componentValue[type];
            this.formData={};
            if(type==0){
               this.formSettings=[
            {
              items:[
                    {
                      label: '描述',
                      name: 'description',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入描述'
                    },
                    {
                      label: 'URL',
                      name: 'url',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入URL'
                    },
                    {
                      label: '排序',
                      name: 'sort',
                      type: 'number',
                      valueType: 'number',
                      value:1,
                      disabled: false,
                      required: true,
                      placeholder: '请输入序列号'
                    },

                    {
                      label: '名字',
                      name: 'Pname',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入名字'
                    },
                    {
                      label: '描述',
                      name: 'Pdescription',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入描述'
                    },{
                      label: '跳转路径',
                      name: 'Purl',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入URL'
                    },
                    {
                      label: '排序',
                      name: 'Psort',
                      type: 'number',
                      valueType: 'number',
                      value:1,
                      disabled: false,
                      required: true,
                      placeholder: '请输入序列号'
                    },{
                      label: '上传图片',
                      name: 'Ppath',
                      type: 'img',                                          
                      disabled: false,
                      required: true,
                      placeholder: '请上传图片'
                    }
                ]
            }
          ];
            }else if(type==3){
                this.formSettings=[
            {
              items:[
                    {
                      label: '描述',
                      name: 'description',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入描述'
                    },
                    {
                      label: 'URL',
                      name: 'url',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入URL'
                    },
                    {
                      label: '排序',
                      name: 'sort',
                      type: 'number',
                      valueType: 'number',
                      value:1,
                      disabled: false,
                      required: true,
                      placeholder: '请输入序列号'
                    },

                    {
                      label: '名字',
                      name: 'Pname',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入名字'
                    },
                    {
                      label: '描述',
                      name: 'Pdescription',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入描述'
                    },
                    {
                      label: '排序',
                      name: 'Psort',
                      type: 'number',
                      valueType: 'number',
                      value:1,
                      disabled: false,
                      required: true,
                      placeholder: '请输入序列号'
                    },{
                      label: '上传图片',
                      name: 'Ppath',
                      type: 'img',                                          
                      disabled: false,
                      required: true,
                      placeholder: '请上传图片'
                    }
                ]
            }
          ];
            }else{
              this.formSettings=[{
                items:[
                    {
                      label: '描述',
                      name: 'description',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入描述'
                    },
                    {
                      label: 'URL',
                      name: 'url',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入URL'
                    },
                    {
                      label: '排序',
                      name: 'sort',
                      type: 'number',
                      value:1,
                      valueType: 'number',
                      disabled: false,
                      required: true,
                      placeholder: '请输入序列号'
                    }
                ]
            }]
            }
            this.dialogVisible=true
            
        },
        submitSave(res){

          if(this.handleType=='add'){
            let data={
                      type:this.currentType,
                      topTypeId:this.topTypeId,
                      name:this.componentValue[this.currentType],
                      ...res

                    }
                    
              if(data.type==0){
                      data.Ppath=res.Ppath[0].url;
                      this.addBanner(data);
                    }else if(data.type==3){
                      data.Ppath=res.Ppath[0].url;
                      this.addBanner(data);
                    }else{
                        this.addPageComponent(data)
                    }
                  
          }else if(this.handleType=='edit'){
           
            let data={
                      ...this.saveData,
                      ...res

                    }

              this.editPageComponent(data)
          }else if(this.handleType=='addpicture'){
             let data={
                ...this.saveData,
                ...res,
                      
             }
             data.Ppath=res.Ppath[0].url;
             this.addPicture(data)
          }
            
                  

           
            this.dialogVisible=false;
            
        },
        editPageComponent(data){
          var _this=this;
          return new Promise((resolve,reject)=>{
            editPageConfig(data)
            .then((response)=>{
               if(response.data.code=='0'){
                    this.$message({
                        type:'success',
                        message:'修改成功！'
                    })
                    _this.getFullPageConfig();
                }else{
                      this.$message({
                        type:'error',
                        message:response.data.msg
                    })
                }
                resolve();
            })
            .catch((reject)=>{
              console.log(reject)
            })
          })
        },
        addPageComponent(data){
          var _this=this;
          return new Promise((resolve,reject)=>{
            addPageConfig(data)
            .then((response)=>{
               if(response.data.code=='0'){
                    this.$message({
                        type:'success',
                        message:'添加成功！'
                    })
                    _this.getFullPageConfig();
                }else{
                      this.$message({
                        type:'error',
                        message:response.data.msg
                    })
                }
                resolve();
            })
            .catch((reject)=>{
              console.log(reject)
            })
          })
        },
        handleEdite(index,row){
          this.handleType='edit'
          this.formData=row
          this. formSettings=[{
                items:[
                    {
                      label: '描述',
                      name: 'description',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入描述'
                    },
                    {
                      label: 'URL',
                      name: 'url',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入URL'
                    },
                    {
                      label: '排序',
                      name: 'sort',
                      type: 'number',
                      valueType: 'number',
                      disabled: false,
                      required: true,
                      placeholder: '请输入序列号'
                    }
                ]
            }];
          this.currentType=row.type;
          this.saveData={
            id:row.id,
            type:row.type,
            topTypeId:row.topTypeId,
            name:row.name,
          }
            this.dialogTitle=this.componentValue[this.currentType];
          
            this.dialogVisible=true


        },
        handleDelete(index,row){
             var _this=this
                this.$confirm('此操作将永久删除该组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    new Promise((resolve,reject)=>{
                    deletePageConfig(row.id)
                    .then((response)=>{
                      if(response.data.code==0){
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                       });
                       _this.getFullPageConfig();
                      }else{
                        this.$message({
                        type: 'error',
                        message: '删除失败，请稍后再试!'
                       });
                      }
                      
                      resolve();
                    })
                    .catch((reject)=>{
                      console.log(reject)
                    })
                })  
                }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消删除'
                });          
                });
        
        },
        //轮播添加图片  

        handleAdd(index,row){
          this.handleType='addpicture';
          
          this.formSettings=[
            {
              items:[
                    {
                      label: '名字',
                      name: 'Pname',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入名字'
                    },
                    {
                      label: '描述',
                      name: 'Pdescription',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入描述'
                    },{
                      label: '跳转路径',
                      name: 'Purl',
                      type: 'text',
                      valueType: 'string',                                           
                      disabled: false,
                      required: true,
                      placeholder: '请输入URL'
                    },
                    {
                      label: '排序',
                      name: 'Psort',
                      type: 'number',
                      valueType: 'number',
                      disabled: false,
                      required: true,
                      placeholder: '请输入序列号'
                    },{
                      label: '上传图片',
                      name: 'Ppath',
                      type: 'img',                                          
                      disabled: false,
                      required: true,
                      limit:1,
                      placeholder: '请上传图片'
                    }
                ]
            }
          ];
          if(row.type==0){
            this.formSettings[0].items[2].hidden=false;
          }else{
            this.formSettings[0].items[2].hidden=true;
          }
           this.saveData={
             singPictureID:row.pictureList[0].pageConfigId,
             order:row.pictureList.length,
            id:row.id,
            type:row.type,
            topTypeId:row.topTypeId,
            name:row.name,
            description:row.description,
            sort:row.sort,
            url:row.url
          }
          this.dialogVisible=true;
        } ,
        addBanner(data){
          var _this=this;
          return new Promise((resolve,reject)=>{
            putPicture(data)
            .then((response)=>{
               if(response.data.code=='0'){
                    this.$message({
                        type:'success',
                        message:'添加成功！'
                    })
                    _this.getFullPageConfig();
                }else{
                      this.$message({
                        type:'error',
                        message:response.data.msg
                    })
                }
              resolve();
            })
            .catch((reject)=>{
              console.log(reject)
            })
          })
        },
        //添加图片
         addPicture(data){
          var _this=this;
          return new Promise((resolve,reject)=>{
            updatePicture(data)
            .then((response)=>{
               if(response.data.code=='0'){
                    this.$message({
                        type:'success',
                        message:'添加成功！'
                    })
                    _this.getFullPageConfig();
                }else{
                      this.$message({
                        type:'error',
                        message:response.data.msg
                    })
                }
              resolve();
            })
            .catch((reject)=>{
              console.log(reject)
            })
          })
        }
        
    }
}
</script>
<style scoped>
        .box{
            margin:30px;
            /* width:1500px; */
            min-width: 1200px;
            
        }
        .atLeft{
            float: left;
        }
        .atRight{
            float: right;
        }
        .btn{
            margin: 10px;
        }
</style>