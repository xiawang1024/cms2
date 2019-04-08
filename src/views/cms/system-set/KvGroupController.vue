<template>
  <div>
    <h3>配置组管理</h3>
    <div class="tool-bar">
      <el-input
        size="mini"
        v-model="searchKv"
        class="search-input"
        placeholder="请输入标签/标题/内容"
        prefix-icon="el-icon-search"
        clearable
        @change="search"
      />
      <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="allGroup" >            
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="tenantId" label="tenantId"/>
      <el-table-column prop="description" label="description"/>
      <el-table-column prop="url" label="url"/>           
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
    <el-dialog :visible.sync="Visible" title="修改配置组">
      <el-form :model="tenant">
        <el-form-item label="租户">
          <el-input v-model="tenant.description"/>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="tenant.url"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="Visible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleEdite()">确 定</el-button>
      </div>
    </el-dialog>
        
  </div>
</template>

<script>
import {getAllGroup,groupSave} from "@/api/cms/KvGroup.js"
// import Tinymce from "@/components/Tinymce";
export default {
    // components: { Tinymce },
    data(){
        return {
            searchKv:'开封电视台',
            tenant:{
                // "id": 1112657532821835776,
                // "tenantId": "56",
                // "description": "开封电视台",
                // "url": "www.baidu.com",
                // "createTime": "2019-04-01T10:06:43.000+0000"
            },
            Visible: false,
            allGroup:[],
            pageNum: 1, // 分页当前页
            pageSize: 10,
            totalCount: 0,

        }
    },
    created(){
        var _this=this
        return new Promise((resolve,reject)=>{
           
            getAllGroup(1,10,{
                'description': "",
                'tenantId': "",
                 'url': ""
                 })
            .then((response)=>{
            console.log(response.data.result.content)
            _this.allGroup=response.data.result.content
             resolve()
            })
            .catch((reject)=>{
                console.log(reject)
            })
           
        })
        
    },
    methods:{
        search(){},
        handleAdd(){

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
            //发送保存请求
            var _this=this
            return new Promise((resolve,reject)=>{
                groupSave(_this.tenant)
                .then((response)=>{
                    console.log(response)
                    resolve();
                })
                .catch((reject)=>{
                    console.log(reject)
                })
            })
          
            
        },
        //删除组
        handleDelete(a,b){
                // var _this=this;
                // console.log(b)
                this.$confirm('此操作将永久删除该组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    
                     console.log("111")
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
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