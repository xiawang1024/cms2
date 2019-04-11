<template>
  <div class="helpdoc-container">
    <div class="tool-bar">
      <el-input
        size="mini"
        v-model="searchAttributeById"
        class="search-input"
        placeholder="id查询"
        prefix-icon="el-icon-search"
        clearable
        @keyup.enter.native="search"
        @change="search"
      />
      <el-button size="mini" type="primary" v-show="backButtonVisible" @click="backDetail">返回</el-button>
      <el-button size="mini" type="primary" @click="handleSearch">检索</el-button>
      <el-button size="mini" type="primary" @click="handleAdd">添加</el-button>
    </div>
    <el-table :data="appDetail" >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="文档内容">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="groupId" label="groupId"/>
      <el-table-column prop="description" label="description"/>
      <el-table-column prop="name" label="name"/>
      <el-table-column prop="valueType" label="valueType"/>
      <el-table-column prop="value" label="value"/>
      <el-table-column prop="createTime" label="createTime" :formatter="formatDate" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="prime" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="80px" :btn-loading = "isLoading" @selectChange="selectChange"/>
    </el-dialog>
    <el-dialog :visible.sync="searchGroupAttributeVisible" title="条件检索">
      <el-form :model="searchGroupAttribute">
           
        <el-form-item label="id">
          <el-input v-model="searchGroupAttribute.groupId"/>
        </el-form-item>
        <el-form-item label="租户">
          <el-input v-model="searchGroupAttribute.description"/>
        </el-form-item>        
        <el-form-item label="name">
          <el-input v-model="searchGroupAttribute.name"/>
        </el-form-item>
        <el-form-item label="valueType">
          <el-input v-model="searchGroupAttribute.valueType"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="searchGroupAttributeVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="SearchAttribute">确 定</el-button>
      </div>
    </el-dialog> 
    <el-dialog :visible.sync="editGroupAttributeVisible" title="编辑">
      <el-form :model="editGroupAttribute">
        <el-form-item label="租户">
          <el-input v-model="editGroupAttribute.description"/>
        </el-form-item>        
        <el-form-item label="name">
          <el-input v-model="editGroupAttribute.name"/>
        </el-form-item>
        <el-form-item label="valueType">
          <el-input v-model="editGroupAttribute.valueType"/>
        </el-form-item>
        <el-form-item label="value">
          <el-input v-model="editGroupAttribute.value "/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editGroupAttributeVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="editAttribute">确 定</el-button>
      </div>
    </el-dialog>



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
  </div>
</template>
<script>
import {
        addGroupAttribute,
        deleteGroupAttribute,
        getGroupAttributeBykvFieldId,
        getAllField,
        updateFieldAttribute
      } from "@/api/cms/KvGroup.js"

export default {
    name:'Kvdetail',
    data(){
        return{
            pageNum: 1, // 分页当前页
            pageSize: 10,
            totalCount: 0,
            searchAttributeById:'',
            description:'',
            appDetail:[],
            addGroupAttribute:{
              groupId:'',
              description:'',
              name:'',
              valueType:'',
              value:''
            }  ,
             editGroupAttribute:{
              id:'',
              description:'',
              name:'',
              valueType:'',
              value:''
            } ,
            dialogVisible:false,
            dialogTitle:'添加配置组',
            // addGroupAttributeVisible:false,
            searchGroupAttributeVisible:false,
            // editGroupAttributeVisible:false,
            searchGroupAttribute:{
              groupId:'',
              description:'',
              name:'',
              valueType:''
            },
            pageFlag:true,
            
            

            formData: {},
            formSettings: [
              {
                // label:'添加配置组属性',
                items: [
                  {
                    label: '租户描述',
                    name: 'description',
                    type: 'text',
                    valueType: 'string',
                    disabled: false,
                    required: true,
                    placeholder: '请输入来源名称'
                  },
                  {
                    label: 'name',
                    name: 'name',
                    type: 'text',
                    required: true,
                    placeholder: '请输入name'
                  },{
                    label: '选择类型',
                    name: 'valueType',
                    type: 'select',
                    required: true,
                    placeholder: '请选择类型',
                    options:[{ 
                              label: '文本',
                              value: '0'
                              },{
                              label: '数字',
                              value: '1'
                              },{
                              label: '日期',
                              value: '2'
                              },{
                              label: '上传文件',
                              value: '3'
                              },{
                              label: 'JSON代码',
                              value: '4'
                              }
                    ],
                    events: {
                      change: 'selectChange'
                    }
                    
                  },{
                    label: '文本',
                    name: 'valuetext',
                    type: 'text',
                    placeholder: '请输入内容',
                    hidden:true
                    },
                    {
                    label: '数字',
                    name: 'valuenumber',
                    type: 'number',
                    placeholder: '请输入数字',
                    hidden: true
                    },
                    {
                    label: '日期',
                    name: 'valuedate',
                    type: 'date',
                    placeholder: '请选择日期',
                    hidden: true
                    },
                    {
                    label: '上传文件',
                    name: 'valuearr',
                    type: 'file',
                    placeholder: '请选择文件',
                    limit:1,
                    hidden: true
                  },
                  {
                   label: 'JSON代码',
                    name: 'valuetext',
                    type: 'text',
                    placeholder: '请输入代码',
                    hidden: true
                  }
                ]
                
              }
            ],
            isLoading: false,
            selectRow:'',
            requestType:'add',
            backButtonVisible:false



          


        }
    },
    created() {
            // this.description=this.$route.query.des
            this.getList()
           
    },
    methods: {
      formatDate(row){
          let date=row.createTime.replace('T'," ")
          date=date.replace('.000+0000','')
          return date
      },
      selectChange(val) {
        var _this=this
        console.log(val, 'val')
        for(let i=3;i<8;i++){
          _this.formSettings[0].items[i].hidden=true;
         
        }
        if(val==0){
          _this.formSettings[0].items[3].hidden=false;
           _this.selectRow=3
        }
        if(val==1){
          _this.formSettings[0].items[4].hidden=false;
           _this.selectRow=4
        }
        if(val==2){
         _this.formSettings[0].items[5].hidden=false;
          _this.selectRow=5
        }
        if(val==3){
           _this.formSettings[0].items[6].hidden=false;
            _this.selectRow=6
        }
        if(val==4){
          _this.formSettings[0].items[7].hidden=false;
           _this.selectRow=7
        }
      },
      submitSave(row){
         //获取表单数据
         console.log(row, 'row')
        
        if(this.requestType=='add'){
          this.addGroupAttribute.description=row.description;
         this.addGroupAttribute.name=row.name;
         this.addGroupAttribute.valueType=row.valueType;
         if(this.selectRow==3){
           this.addGroupAttribute.value=row.valuetext
         }
         if(this.selectRow==4){
           this.addGroupAttribute.value=row.valuenumber
         }
         if(this.selectRow==5){
           this.addGroupAttribute.value=row.valuedate
         }
         if(this.selectRow==6){
           this.addGroupAttribute.value=row.valuearr[0].url
         }
         if(this.selectRow==7){
           this.addGroupAttribute.value=row.valuetext
         }

          this.addAttribute();
        }else if(this.requestType=='edit'){
             this.editGroupAttribute.description=row.description;
            this.editGroupAttribute.name=row.name;
            this.editGroupAttribute.valueType=row.valueType;
         if(this.selectRow==3){
           this.editGroupAttribute.value=row.valuetext
         }
         if(this.selectRow==4){
           this.editGroupAttribute.value=row.valuenumber
         }
         if(this.selectRow==5){
           this.editGroupAttribute.value=row.valuedate
         }
         if(this.selectRow==6){
           this.editGroupAttribute.value=row.valuearr[0].url
         }
         if(this.selectRow==7){
           this.editGroupAttribute.value=row.valuetext
         }


          this.editAttribute();


        }
        



      },
       getList(){
        var _this=this
            let data={
              groupId:_this.$route.query.userid,
              description:'',
              name:'',
              valueType:''
              
            }
            return new Promise((resolve,reject)=>{
              //调用根据id请求接口
                getAllField(_this.pageNum,_this.pageSize,data)
                .then((response)=>{
                    console.log(response)
                    _this.appDetail=response.data.result.content
                    _this.totalCount=response.data.result.totalElements
                })
                .catch((reject)=>{
                    console.log(reject)
                })
            })
        },
        search(){
          var patt=/\d{19}/;
          var _this=this

          if(patt.test(this.searchAttributeById)){
            this.totalCount=0
            return new Promise((resolve,reject)=>{
              getGroupAttributeBykvFieldId(_this.searchAttributeById)
              .then((response)=>{
                console.log(response)
                _this.appDetail=[response.data.result]
                _this.totalCount=1;
                _this.backButtonVisible=true;
              })
              .catch((reject)=>{
                console.log(reject)
              })
            })
          }else if(_this.searchAttributeById==''||_this.searchAttributeById==null){
            return null
          }else{
            _this.$message({
              type: 'error',
              message: '请输入19位数字id!'
            }
             
            )
          }
           
        },
        backDetail(){
          this.getList()
          this.backButtonVisible=false;
        },
          // 新增
        handleAdd(){
          this.dialogVisible=true;
          this.addGroupAttribute.groupId=this.$route.query.userid;
           this.requestType='add';
           this.dialogTitle='添加配置组'
        },
        addAttribute(){
           console.log(this.addGroupAttribute)
          //---------------------
          //发送保存请求
          var _this=this
          return new Promise((resolve,reject)=>{
            addGroupAttribute(_this.addGroupAttribute)
            .then((response)=>{
               console.log(response)
              if(response.data.code==0){
                  this.dialogVisible=false;
                        this.$message({
                        type: 'success',
                        message: '添加成功!'
                       });
                       _this.getList()
              }else{
                this.$message({
                        type: 'error',
                        message: '添加失败，请稍后再试!'
                       });
              }
            })
            .catch((reject)=>{
              console.log(reject)
              this.$message({
                        type: 'error',
                        message: '服务器无响应，请稍后再试!'
                       });
            })
          })
        },
        handleSearch(){
           this.searchGroupAttributeVisible=true;
        },
        SearchAttribute(){
          //发送分页请求数据
          var _this=this
          return new Promise((resolve,reject)=>{
            getAllField(_this.pageNum,_this.pageSize,_this.searchGroupAttribute)
            .then((response)=>{
              console.log(response)
              _this.pageFlag=false;
              _this.appDetail=response.data.result.content
              _this.totalCount=response.data.result.totalElements
              
               this.searchGroupAttributeVisible=false;
            })
            .catch((reject)=>{
              console.log(reject)
               this.searchGroupAttributeVisible=false;
            })
          })

        },
        handleEdit(a,b){
          console.log(b)
           this.dialogVisible=true;
           this.requestType='edit';
           this.dialogTitle='编辑配置组'
           this.editGroupAttribute=b
        },
        editAttribute(){
          //更新属性组修改
        var _this=this
          return new Promise((resolve,reject)=>{
            updateFieldAttribute(_this.editGroupAttribute)
            .then((response)=>{
              console.log(response)
              if(response.data.result.success){
                this.$message({                       
                        type: 'success',
                        message: '更新成功!'
                       });
              }
               this.dialogVisible=false;
            })
            .catch((reject)=>{
              console.log(reject)
               this.dialogVisible=false;
            })
          })

        },
        handleDelete(a,b){
                var _this=this
                // console.log(b)
                this.$confirm('此操作将永久删除该组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                     console.log(b.id)
                    new Promise((resolve,reject)=>{
                    deleteGroupAttribute(b.id)
                    .then((response)=>{
                      console.log(response)
                      if(response.data.result=="删除成功"){
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                         
                       });
                       _this.getList()
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
        if(this.pageFlag){
          this.getList();
        }else{
          this.SearchAttribute();
        }
        
        },
        handleCurrentChange(val) {
        this.pageNum = val;
        if(this.pageFlag){
          this.getList();
        }else{
           this.SearchAttribute();
        }
        }
        

        
    }
}
</script>
<style scoped>
.helpdoc-container {
  margin: 30px;
}
.tool-bar {
  text-align: right;
}
.search-input {
  width: auto;
}
    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
