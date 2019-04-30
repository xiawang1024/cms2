<template>
  <div class="box">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="addAppConfig">新增</el-button>
    </div>
    <el-table :data="fullTabList" >  
      <el-table-column prop="name" label="列表名字"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="icon" >
        </template>
      </el-table-column>
      <el-table-column prop="url" label="链接地址"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdite(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDetail(scope.$index,scope.row)">详情</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="130px" :btn-loading = "isLoading" />
    </el-dialog>
  </div>
</template>
<script>
import {initNavigation,addNavigation,deleteNavigation,editNavigation} from '@/api/cms/appConfig.js'
export default {
    name:'AppTabList',
    data(){
        return{
            fullTabList:[],
            dialogVisible:false,
            dialogTitle:'添加',
            formData:{},
            formSettings:[{
                items: [
                    {
                      label: '列表名字',
                      name: 'name',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入列表名字'
                    },{
                      label: '描述',
                      name: 'description',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      placeholder: '请输入描述'
                    },{
                      label: 'URL',
                      name: 'url',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入URL'
                    },
                    {
                      label: '图标',
                      name: 'icon',
                      type: 'img',
                      disabled: false,
                      limit:1,
                      required: true,
                      placeholder: '请上传图标'
                    },{
                      label: '排序',
                      name: 'sort',
                      type: 'number',
                      value:1,
                      valueType: 'number',
                      disabled: false,
                      placeholder: '请输入序列号'
                    }
                 ]
             
             }],
             handleType:'',
             currentRow:'',
             currentIndex:'',
             isLoading:false,
             pageNo:1,
             pageSize:10



        }
    },
    created(){
        //发送请求数据
        this.getFullTab();

    },
    methods:{
        addAppConfig(){
            this.dialogVisible=true;
            this.handleType='add';
            this.dialogTitle='添加';
            this.formData={}
            
        },
        handleDetail(index,row){
            this.$router.push({
                path:'appTopList',
                query:{
                    navigationId:row.id
                }
            })
        },
        handleDelete(index,row){
             var _this=this
                this.$confirm('此操作将永久删除该组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    new Promise((resolve,reject)=>{
                    deleteNavigation(row.id)
                    .then((response)=>{
                      if(response.data.code==0){
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                       });
                       _this.getFullTab();
                      }else{
                        this.$message({
                        type: 'error',
                        message: response.data.msg
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
        handleEdite(index,row){
            
            this.handleType='edit';
            this.currentRow=row;
            this.dialogTitle='编辑';
            // this.formData=row;
            this.formData={
              name:row.name,
              description:row.description,
              url:row.url,
              icon:[{url:row.icon}],
              sort:row.sort

            }
            this.currentIndex=index;
            this.dialogVisible=true;
        },
        submitSave(res){
            if(this.handleType=='add'){
                let data={
                    ...res,
                    appInfoId:this.$route.query.appId
                }
                data.icon=res.icon[0].url
             this.addTabContent(data)
            
            }else if(this.handleType=='edit'){

                let data={
                    ...res,
                    id:this.currentRow.id
                }
                data.icon=res.icon[0].url
                this.editTabContent(data)
            }
           
              this.dialogVisible=false;
        },
        getFullTab(){
             var _this=this;
            return new Promise((resolve,reject)=>{
                initNavigation(_this.pageNo,_this.pageSize,_this.$route.query.appId)
                .then((response)=>{
                    if(response.data.code=='0'){
                         _this.fullTabList=response.data.result.content
                    }
                   
                    resolve();
                
                })
                .catch((reject)=>{
                    console.log(reject,'reject')
                    this.$message({
                        type:'error',
                        message:reject.error
                    })
                })
            })
        },
        addTabContent(data){
             var _this=this;
              
               return new Promise((resolve,reject)=>{
                   addNavigation(data)
                        .then((response)=>{
                            if(response.data.code=='0'){
                                this.$message({
                                    type:'success',
                                    message:'添加成功！'
                                })
                                _this.getFullTab()
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
        editTabContent(data){
             var _this=this;
              
               return new Promise((resolve,reject)=>{
                   editNavigation(data)
                        .then((response)=>{
                            if(response.data.code=='0'){
                                this.$message({
                                    type:'success',
                                    message:'修改成功！'
                                })
                                _this.getFullTab()
                            }else{
                                 this.$message({
                                    type:'error',
                                    message:response.data.msg
                                })
                            }
                            resolve()
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
        margin: 30px;
    }
    .tool-bar {
         text-align: right;
    }
    .icon{
      width: 60px;
    }
</style>