<template>
  <div>
    <el-row>
      <el-col class="dealTitle">
        <el-button type="primary" size="mini" @click="handlAdd">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData">
            
        <el-table-column prop="description" label="描述"/>
        <el-table-column prop="code" label="编码"/>
        <el-table-column label="预览">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="" style="width:100px;cursor:pointer" @click="handlePreview(scope.$index, scope.row)" >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdite(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
   
    
    <el-dialog :visible.sync="dialogVisible" :title="handleType">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="formData"
        @save="submitSave"
        label-width="160px"
      />
    </el-dialog>
    <el-dialog :visible.sync="pictureVisible" width="0" custom-class="visibleStyle" :modal="true" :show-close="false">
      <el-row >
        <el-col :span="24" >
          <img :src="viewPic" alt="" >
        </el-col>
      </el-row>
    </el-dialog>
       
  </div>
</template>

<script>
import {
  addAppModule,
  selectAppModule,
  updateAppModule
} from "@/api/cms/appConfig.js";
export default {
     
  data() {
      var validator = (rule, value, callback) => {
      let pic = new Image();
      if (value[0]) {
        pic.src = value[0].url;
        let imgType = value[0].url
          .split(".")
          .reverse()[0]
          .toLowerCase();
        if (imgType == "png") {
        //   if (pic.width != 1242 || pic.height != 2688) {
        //     callback(new Error("请上传1242*2688像素的图片"));
        //   } else {
            callback();
        //   }
        } else {
          callback(new Error("请上传PNG格式图片"));
        }
      } else {
        callback(new Error("请上传1242*2688像素的PNG格式图片"));
      }
    };
    return {
      handleType: "添加",
      dialogVisible: false,
      pictureVisible:false,
      tableData:[],
      formData: {},
      formSettings: [
        {
          items: [
            {
              label: "导航图",
              name: "url",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
              maxSize: 1024,
              rule: [
                {
                  required: true,
                  validator: validator,
                  trigger: "blur"
                }
              ]
            },
            {
              label: "编码",
              name: "code",
              type: "text",
              disabled: false,
              placeholder: "请输入编码",
              required: true
            },
            {
               label: "描述",
              name: "description",
              type: "text",
              disabled: false,
              placeholder: "请输入描述"
            }
          ]
        }
      ],
      tenantId:'',
      appId:'',
      viewPic:'',
      tableData:[],
      currentId:'',


    };
  },
  created(){
      this.init();
  },
  methods: {
    init() {
        this.tenantId=JSON.parse(localStorage.getItem("BaseInfor")).clientLicenseId;
        this.appId=this.$route.query.appId;
       this.getTableData();
    },
    getTableData(){
         let data={
            tenantId:this.tenantId,
            appId:this.appId
        }
        return new Promise((resolve,reject)=>{
            selectAppModule(data)
            .then(res=>{
                if(res.data.code==0){
                    this.tableData=res.data.result;

                }else{
                    this.$message.error(res.data.msg)
                }
            })
        })

    },
    handleEdite(index,row) {
        this.handleType='编辑';
        this.dialogVisible=true;
        this.currentId=row.id;
        this.formData={
            url:[{url:row.url,uid:row.id}],
            description:row.description,
            code:row.code,

        }
    },
    handlAdd(){
        this.formData={};
        this.handleType='添加';
        this.dialogVisible=true;
    },
    submitSave(val) {
        var _this=this;
        let data={
            ...val,

            appId:this.appId,
            tenantId:this.tenantId,

        };
        data.url=data.url[0].url;   
        if(this.handleType=='添加'){
            return new Promise((resolve,reject)=>{
                    addAppModule(data)
                    .then(res=>{
                        if(res.data.code==0){
                            this.$message.success(res.data.msg);
                            _this.dialogVisible=false;
                            _this.getTableData();
                        }else{
                            this.$message.error(res.data.error)
                        }

                        resolve();
                    })
                    .catch(err=>{
                        reject(err)
                    })
            })
        }
        if(this.handleType=='编辑'){
            data.id=this.currentId;
            this.$confirm('将会替换APP中使用的图片，是否继续操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve,reject)=>{
                    updateAppModule(data)
                    .then(res=>{
                        if(res.data.code==0){
                            this.$message.success(res.data.msg)
                             _this.dialogVisible=false;
                            _this.getTableData();

                        }else{
                            this.$message.error(res.data.msg)
                        }
                        resolve();
                    })
                    .catch(err=>{
                        reject(err)
                    })
            })
      }).catch(() => {
      })
           
        }
    },
    handlePreview(index,row){
        this.pictureVisible=true;
        this.viewPic=row.url;

    }

  }
};
</script>

<style lang='scss' scoped>
/deep/ .visibleStyle{
  display: flex;
    justify-content: center;
    align-items: center;
}
</style>