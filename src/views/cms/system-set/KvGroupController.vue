<template>
  <div>
    <h3>配置组管理</h3>
    <div class="tool-bar">
      <el-input
        size="mini"
        v-model="searchKv"
        class="search-input"
        placeholder="请输入id"
        prefix-icon="el-icon-search"
        clearable
        @keyup.enter.native="search(searchKv)"
      />
      <el-button size="mini" type="primary" v-show="backButtonVisible" @click="backDetail">返回</el-button>
      <el-button size="mini" type="primary" @click="handleSearch">检索</el-button>
      <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="allGroup" >            
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="tenantId" label="tenantId"/>
      <el-table-column prop="description" label="description"/>
      <el-table-column prop="tag" label="tag"/>           
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="prime" @click="handleEdite(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="warning" @click="handleSerch(scope.row.id,scope.row.description)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fenyeDiv"
      :current-page="pageNum"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    
    <el-dialog :visible.sync="dialogVisible" title="dialogTitle">
      <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="80px" :btn-loading = "isLoading" @selectChange="selectChange"/>
    </el-dialog>


    <el-dialog :visible.sync="Visible" title="修改配置组">
      <el-form :model="tenant">
        <el-form-item label="租户">
          <el-input v-model="tenant.description"/>
        </el-form-item>
        <el-form-item label="sort">
          <el-input v-model="tenant.sort"/>
        </el-form-item>
        <el-form-item label="tag">
          <el-input v-model="tenant.tag"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="Visible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleEditeSave()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addGroupVisible" title="添加配置组">
      <el-form :model="addGroup">
        <el-form-item label="teantId">
          <el-input v-model="addGroup.tenantId"/>
        </el-form-item>
        <el-form-item label="租户">
          <el-input v-model="addGroup.description"/>
        </el-form-item>        
        <el-form-item label="sort">
          <el-input v-model="addGroup.sort"/>
        </el-form-item>
        <el-form-item label="tag">
          <el-input v-model="addGroup.tag"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="Visible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="termSearchDialogVisible" title="条件检索">
      <el-form :model="searchData">
        <el-form-item label="租户id">
          <el-input v-model="searchData.id"/>
        </el-form-item>
        <el-form-item label="tenantId">
          <el-input v-model="searchData.tenantId"/>
        </el-form-item>
        <el-form-item label="租户描述">
          <el-input v-model="searchData.description"/>
        </el-form-item>        
        <el-form-item label="sort">
          <el-input v-model="searchData.sort"/>
        </el-form-item>
        <el-form-item label="tag">
          <el-input v-model="searchData.tag"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="termSearchDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="termSearch">确 定</el-button>
      </div>
    </el-dialog>
        
  </div>
</template>

<script>
import {getAllGroup,groupSave,deleteGroup,addGroupRequest,getAppDetail} from "@/api/cms/KvGroup.js"
// import { resolve } from 'q';
// import { resolve } from 'q';
// import Tinymce from "@/components/Tinymce";
export default {
    // components: { Tinymce },
    data(){
        return {
            searchKv:"",
            tenant:{
              kvGroupId:'',
              description:'',
              sort:'',
              tag:''
                // "id": 1112657532821835776,
                // "tenantId": "56",
                // "description": "开封电视台",
                // "url": "www.baidu.com",
                // "createTime": "2019-04-01T10:06:43.000+0000"
            },
            addGroup:{
              tenantId:'',
              description:'',
              sort:'',
              tag:''


            },
            Visible: false,
            addGroupVisible:false,
            allGroup:[],
            pageNum: 1, // 分页当前页
            pageSize: 100,
            totalCount: 0,
            backButtonVisible:false,
            defaultData:{
                "description": "",
                "id": "",
                "sort": "",
                "tag": "",
                "tenantId": ""
            },
            searchData:{
                "description": "",
                "id": "",
                "sort": "",
                "tag": "",
                "tenantId": ""
            },
            termSearchDialogVisible:false,
            dialogTitle:'检索',
            dialogVisible:false,


        }
    },
    created(){
        this.getTableData(this.defaultData) 
    },
    methods:{
      //获取所有列表
      getTableData(obj){
        var _this=this
        return new Promise((resolve,reject)=>{
           
            getAllGroup(_this.pageNum,_this.pageSize,obj)
            .then((response)=>{
            console.log(response.data.result)
            _this.totalCount=response.data.result.totalElements
            _this.allGroup=response.data.result.content
            _this.termSearchDialogVisible=false
            _this.backButtonVisible=false;
             resolve()
            })
            .catch((reject)=>{
                console.log(reject)
            })
           
        })
      },
      

      //根据配置组id检索
        search(id){
          var _this=this
          return new Promise((resolve,reject)=>{
            getAppDetail(id)
            .then((response)=>{
              console.log(response.data.result)
              if(response.data.code==0){
                 _this.allGroup=[response.data.result]
                 _this.backButtonVisible=true;
              }else{
                alert("搜索失败")
              }
              
              resolve()
            })
            .catch((reject)=>{
              console.log(reject)
            })
          })
        },
        backDetail(){
          this.getTableData(this.defaultData)
          
          this.searchKv=''
        },
        handleSearch(){
          this.termSearchDialogVisible=true;

          
        },
        termSearch(){
          this.getTableData(this.searchData) 
        },

        handleAdd(){
          this.addGroupVisible=true
          if(this.addGroup.tenantId==""||this.addGroup.tenantId==null){
            return false
          }
           if(this.addGroup.description==""||this.addGroup.description==null){
            return false
          }
          var _this=this
          return new Promise((resolve,reject)=>{
            addGroupRequest(_this.addGroup)
            .then((response)=>{
              console.log(response)
              _this.addGroupVisible=false
              _this.$message({                       
                        type: 'success',
                        message: '修改成功!'
                       });
              _this.getTableData() 
              resolve()
            })
            .catch((reject)=>{
              console.log(reject)
              alert("请稍后再试！")
            })
          })
        },
        //查看详情
        handleSerch(id,des){
             this.$router.push({
                path: "Kvdetail",
                query:{
                    userid:id,
                    des
                }
               
                
            });
        },
        //修改
        handleEdite(a,b){
            //调用模态框
            this.Visible=true;
            this.tenant=b;
            console.log(b)
            
        },
        //修改保存、发送保存请求
        handleEditeSave(){
            var _this=this
            console.log(_this.tenant.id)
            
            return new Promise((resolve,reject)=>{
                groupSave(_this.tenant)
                .then((response)=>{
                    console.log(response)
                    if(response.data.code==0){
                       _this.Visible=false;
                      this.$message({                       
                        type: 'success',
                        message: '修改成功!'
                       });
                    }else{
                      this.$message({
                        type: 'error',
                        message: '修改失败，请稍后再试!'
                       });
                    }
                    resolve();
                   
                })
                .catch((reject)=>{
                    console.log(reject)                   
                     this.$message({
                        type: 'error',
                        message: '修改失败，请稍后再试!'
                       });
                })
                 })
        },
        //删除组
        handleDelete(a,b){
          var _this=this
                // console.log(b)
                this.$confirm('此操作将永久删除该组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    
                     console.log("111")
                     console.log(b.id)
                    new Promise((resolve,reject)=>{
                    deleteGroup(b.id)
                    .then((response)=>{
                      console.log(response)
                      if(response.data.code==0){
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                       });
                        _this.getTableData() 
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


        //分页处理
        handleSizeChange(val) {
        this.pageSize = val;
        this.getTableData();
        },
        handleCurrentChange(val) {
        this.pageNum = val;
        this.getTableData();
        }
    }
}
</script>
<style scoped>
    .el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.helpdoc-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}

.search-input {
  width: auto;
}
.fenyeDiv {
  margin-top: 30px;
}
</style>