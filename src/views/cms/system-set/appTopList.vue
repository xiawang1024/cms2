<template>
  <div class="box">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="addTopList">新增</el-button>
      <el-button size="mini" type="primary" @click="skipToPages" v-show="fullTopList[0]?false:true">配置页面</el-button>
    </div>
    <el-table :data="fullTopList" >  
      <el-table-column prop="name" label="顶部列表名字"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="url" label="链接地址"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="prime" @click="handleEdite(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="handleDetail(scope.$index,scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="130px" :btn-loading = "isLoading" />
    </el-dialog>
  </div>
</template>
<script>
import {topTableSwitch,addtopTable,deletetopTable,edittopTable} from '@/api/cms/appConfig.js'
export default {
    
    data(){
        return {
            navigationId:this.$route.query.navigationId,
            fullTopList:[],
            dialogVisible:false,
            dialogTitle:'添加',
            formData:{},
            formSettings:[{
                items: [
                    {
                      label: '顶部列表名字',
                      name: 'name',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      placeholder: '请输入顶部列表名字'
                    },
                    {
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
                      placeholder: '请输入URL'
                    },{
                      label: '排序',
                      name: 'sort',
                      type: 'text',
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
            this.getFullTobList();

    },
    methods:{
        getFullTobList(){
             var _this=this;
            return new Promise((resolve,reject)=>{
                topTableSwitch(_this.pageNo,_this.navigationId)
                .then((response)=>{
                    console.log(response)
                    if(response.data.code=='0'){
                         _this.fullTopList=response.data.result.content
                         console.log(_this.fullTabList,'fullapp')
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
        addTopList(){
            this.dialogVisible=true;
            this.handleType='add';
            this.dialogTitle='添加';
            this.formData={}
            
        },
        //有顶部列表的跳转
         handleDetail(index,row){
            this.$router.push({
                path:'appPages',
                query:{
                    navigationId:row.id
                }
            })
        },
        //没有顶部列表的跳转
        skipToPages(){
            this.$router.push({
                path:'appPages',
                query:{
                    // navigationId:row.id
                }
            })
        },
        handleDelete(index,row){
           console.log(row,'row')
             var _this=this
                this.$confirm('此操作将永久删除该组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    new Promise((resolve,reject)=>{
                    deletetopTable(row.id)
                    .then((response)=>{
                      console.log(response)
                      if(response.data.code==0){
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                       });
                       _this.getFullTobList();
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
        handleEdite(index,row){
            console.log(index,row,"row")
            
            this.handleType='edit';
            this.currentRow=row;
            this.dialogTitle='编辑';
            this.formData=row;
            this.currentIndex=index;
            this.dialogVisible=true;
        },
        addTopContent(data){
             var _this=this;
              
               return new Promise((resolve,reject)=>{
                   addtopTable(data)
                        .then((response)=>{
                            console.log(response)
                            if(response.data.code=='0'){
                                this.$message({
                                    type:'success',
                                    message:'添加成功！'
                                })
                                _this.getFullTobList();
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
         submitSave(res){
            console.log(res)
            if(this.handleType=='add'){
                let data={
                    ...res,
                    navigationId:this.navigationId
                }
             this.addTopContent(data)
            
            }else if(this.handleType=='edit'){

                let data={
                    ...res,
                    id:this.currentRow.id,
                     navigationId:this.navigationId

                }
                this.edittopContent(data)
            }
           
              this.dialogVisible=false;
        },
        edittopContent(data){
            var _this=this;
              
               return new Promise((resolve,reject)=>{
                   edittopTable(data)
                        .then((response)=>{
                            // console.log(response,'wenben cuowu ')
                            if(response.data.code=='0'){
                                this.$message({
                                    type:'success',
                                    message:'修改成功！'
                                })
                                  _this.getFullTobList();
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
</style>