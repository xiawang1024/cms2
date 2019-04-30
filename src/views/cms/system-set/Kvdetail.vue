<template>
  <div class="helpdoc-container">
    <div class="tool-bar">
      <el-input
        size="mini"
        v-model="searchAttributeById"
        class="search-input"
        placeholder="请输入查询id"
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
              <span>{{ props.row.value }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="name" label="名字"/>
      <el-table-column prop="valueType" label="字段类型" :formatter="formatValueType" />
      <el-table-column prop="value" label="值"/>
      <el-table-column prop="createTime" label="创建时间" :formatter="formatDate" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="prime" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="130px" :btn-loading = "isLoading" @selectChange="selectChange" @selectChangeS="selectChangeS"/>
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
                      label: '配置组属性描述',
                      name: 'description',
                      type: 'text',
                      valueType: 'string',
                      disabled: false,
                      required: true,
                      placeholder: '请输入配置组属性描述'
                    },
                    {
                      label: '名字',
                      name: 'name',
                      type: 'text',
                      required: true,
                      placeholder: '请输入字母或者数字'
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
                      type: 'datetime',
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
                      name: 'valueJson',
                      type: 'textarea',
                      placeholder: '请输入代码',
                      hidden: true
                    },
                     {
                    label: '租户ID',
                    name: 'groupIdS',
                    type: 'text',
                    valueType: 'string',
                    disabled: false,
                    placeholder: '请输入租户ID',
                     hidden: true
                  }, {
                    label: '租户描述',
                    name: 'descriptionS',
                    type: 'text',
                    valueType: 'string',
                    disabled: false,
                    placeholder: '请输入租户描述',
                     hidden: true
                  }, {
                    label: '名字',
                    name: 'nameS',
                    type: 'text',
                    valueType: 'string',
                    disabled: false,
                    placeholder: '请输入字母或者数字',
                     hidden: true
                  }, {
                      label: '选择类型',
                      name: 'valueTypeS',
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
                        change: 'selectChangeS'
                      }
                      
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
        formatValueType(row){
                let date='';
                if(row.valueType==0){
                  date="文本"
                    }
                if(row.valueType==1){
                  date="数值"
                }
                if(row.valueType==2){
                  date="日期"
                }
                if(row.valueType==3){
                  date="文件"
                }
                if(row.valueType==4){
                  date="JSON字段"
                }
          return date
         },
        selectChange(val) {
          var _this=this
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
            _this.formSettings[0].items[7].required=true;
             _this.selectRow=7
          }
        },
        selectChangeS(row){
             this.searchGroupAttribute.valueType=row.valueTypeS
        },
        
        submitSave(row){
           //获取表单数据
          if(this.requestType=='add'){
            this.addGroupAttribute.description=row.description;
           this.addGroupAttribute.name=row.name;
           this.addGroupAttribute.valueType=row.valueType;
           if(this.selectRow==3){
             this.addGroupAttribute.value=row.valuetext
             if(this.addGroupAttribute.value==''||this.addGroupAttribute.value==null){
               return this.$message({
                 type: 'error',
                  message: '文本不能为空！'
               })
             }
           }
           if(this.selectRow==4){
             this.addGroupAttribute.value=row.valuenumber;
              if(this.addGroupAttribute.value==''||this.addGroupAttribute.value==null){
               return this.$message({
                 type: 'error',
                  message: '数字不能为空！'
               })
             }
           }
           if(this.selectRow==5){

              this.addGroupAttribute.value=this.moment(row.valuedate).format('YYYY-MM-DD HH:mm:ss')
              if(this.addGroupAttribute.value==''||this.addGroupAttribute.value==null){
               return this.$message({
                 type: 'error',
                  message: '日期不能为空！'
               })
             }
           }
           if(this.selectRow==6){
             this.addGroupAttribute.value=row.valuearr[0].url
           }
           if(this.selectRow==7){
  
             this.addGroupAttribute.value=encodeURI(row.valueJson)
             if(this.addGroupAttribute.value==''||this.addGroupAttribute.value==null){
               return this.$message({
                 type: 'error',
                message: '请输入JSON字段'
               })
             }
           }
  
            this.addAttribute();
          }else if(this.requestType=='edit'){
                      this.editGroupAttribute.description=row.description;
                      this.editGroupAttribute.name=row.name;
                      this.editGroupAttribute.valueType=row.valueType;
                      

           if(this.selectRow==3){
             this.editGroupAttribute.value=row.valuetext;
             if(this.editGroupAttribute.value==''||this.editGroupAttribute.value==null){
               return this.$message({
                 type: 'error',
                  message: '文本不能为空！'
               })
             }
           }
           if(this.selectRow==4){
             this.editGroupAttribute.value=row.valuenumber;
             if(this.editGroupAttribute.value==''||this.editGroupAttribute.value==null){
               return this.$message({
                 type: 'error',
                  message: '数字不能为空！'
               })
             }
           }
           if(this.selectRow==5){

             this.editGroupAttribute.value=this.moment(row.valuedate).format('YYYY-MM-DD HH:mm:ss');
             if(this.editGroupAttribute.value==	'Invalid date'||this.editGroupAttribute.value==null){
               return this.$message({
                 type: 'error',
                  message: '日期不能为空！'
               })
             }
          }
           if(this.selectRow==6){
             this.editGroupAttribute.value=row.valuearr[0].url
           }
           if(this.selectRow==7){
             this.editGroupAttribute.value=row.valueJson;
              if(this.editGroupAttribute.value==''||this.editGroupAttribute.value==null){
               return this.$message({
                 type: 'error',
                message: '请输入JSON字段'
               })
             }
           }
  
  
            this.editAttribute();
  
  
          }else if(this.requestType=='search'){
            //检索接口
             this.searchGroupAttribute={
                groupId:row.groupIdS,
                description:row.descriptionS,
                name:row.nameS,
                valueType:row.valueTypeS
              }
              this.SearchAttribute()
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
            var _this=this
             for(let i=0;i<3;i++){
            _this.formSettings[0].items[i].hidden=false;
            }
            for(let i=3;i<12;i++){
            _this.formSettings[0].items[i].hidden=true;
            }
            this.formData={}
            this.dialogVisible=true;
            this.addGroupAttribute.groupId=this.$route.query.userid;
             this.requestType='add';
             this.dialogTitle='添加配置组属性'
            
          },
          addAttribute(){
            //发送保存请求
            var _this=this
            return new Promise((resolve,reject)=>{
              addGroupAttribute(_this.addGroupAttribute)
              .then((response)=>{
                if(response.data.result.success){
                    this.dialogVisible=false;
                          this.$message({
                          type: 'success',
                          message: '添加成功!'
                         });
                         _this.getList()
                }else{

                  if(response.data.result.message=="该数据不符合json格式"){
                    this.$message({
                          type: 'error',
                          message: '该数据不符合json格式!'
                         });
                  }else{
                    this.$message({
                          type: 'error',
                          message: response.data.result.message
                         });
                  }
  
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
           
            var _this=this
            this.requestType="search"
            this.dialogTitle='检索'
            for(let i=0;i<8;i++){
            _this.formSettings[0].items[i].hidden=true;
            }
            for(let i=8;i<12;i++){
            _this.formSettings[0].items[i].hidden=false;
            _this.formSettings[0].items[i].required=false;
            }
             
             this.dialogVisible=true;
          },
          SearchAttribute(){
            //发送分页请求数据
            var _this=this
            return new Promise((resolve,reject)=>{
              getAllField(_this.pageNum,_this.pageSize,_this.searchGroupAttribute)
              .then((response)=>{
                _this.pageFlag=false;
                _this.appDetail=response.data.result.content
                _this.totalCount=response.data.result.totalElements
                 this.dialogVisible=false;
              })
              .catch((reject)=>{
                console.log(reject)
                 this.dialogVisible=false;
              })
            })
  
          },
          handleEdit(a,b){
            var _this=this
             for(let i=0;i<3;i++){
            _this.formSettings[0].items[i].hidden=false;
            }
            for(let i=3;i<12;i++){
            _this.formSettings[0].items[i].hidden=true;
            }
            this.formData={}
             this.formData={
                        description:b.description,
                        name:b.name,
                        valueType:b.valueType,
                      }
             this.selectChange(b.valueType)
              if(b.valueType=='0'){
                this.formData.valuetext=b.value
              }
              if(b.valueType=='1'){
                this.formData.valuenumber=b.value
              }
              if(b.valueType=='2'){
                this.formData.valuedate=b.value
              }
              if(b.valueType=='3'){
                // this.formData.valuearr=b.value
              }
              if(b.valueType=='4'){
                this.formData.valueJson=b.value
              }


             this.requestType='edit';
             this.dialogTitle='编辑配置组属性'
             this.editGroupAttribute.id=b.id
            this.dialogVisible=true;
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
                         _this.getList()
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
                  this.$confirm('此操作将永久删除该组, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                  }).then(() => {
                      new Promise((resolve,reject)=>{
                      deleteGroupAttribute(b.id)
                      .then((response)=>{
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
    /* width: auto; */
    width:200px;
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
  