<template>
  <div>


    <el-table :data="tableData">
      <el-table-column prop="tagName" label="标签名" />
      <el-table-column prop="sqNo" label="标签排序号" />
      <el-table-column prop="url" label="标签图">
        <template slot-scope="scope">
          <img :src="scope.row.url" class="icon" >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row.id,scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="formData"
        @save="submitSave"
        label-width="130px"
        :btn-loading="isLoading"
      />
    </el-dialog>
  </div>
</template>

<script>
import { tagsList, editTags } from "@/api/cms/podcast.js";
export default {
  data() {
    var podcastPicture = (rule, value, callback) => {
      let pic = new Image();
      if (value[0]) {
        pic.src = value[0].url;
        let imgType = value[0].url
          .split(".")
          .reverse()[0]
          .toLowerCase();
          console.log(imgType,'imgType')
        if (imgType === "png"||imgType === "jpg"||imgType === "gif"||imgType === "jpeg") {
          if (value[0].size>1*1024*1024) {
            callback(new Error("请上传一张1M以内的jpg或png格式图片"));
          } else {
            callback();
          }
        } else {
          callback(new Error("请上传一张1M以内的jpg或png格式图片"));
        }
      } else {
        callback(new Error("请上传一张1M以内的jpg或png格式图片"));
      }
    };
    var sortNumber = (rule, value, callback) => {
      let num=value;
      if (num) {
        if(num.toString().indexOf('.')>-1){
          callback(new Error('请输入整数'));
        }else{
          callback();
        }
      } else {
        if(num===0){
          callback();
        }
        callback(new Error("请输入整数"));
      }
    };

    return {
      tableData: [],
      currentId: "",
      dialogVisible: false,
      dialogTitle: "编辑",
      isLoading: false,
      formData: {},
      tenantId:'',
      formSettings: [
        {
          items: [
            {
              name:'url',
              type: 'img',
              label: "标签图",
              limit:1,
              tip:'请上传一张1M以内的jpg或png格式图片',
               rule: [
                {
                  required: true,
                  trigger: "blur",
                  validator:podcastPicture
                }
              ]
            },{
              name:'sqNo',
              type: 'number',
              label: "标签排序号",
              limit:1,
              describe:'(标签排序号越大排序越靠前)',
               rule: [
                {
                  required: true,
                  trigger: "blur",
                    validator:sortNumber
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {
    this.tenantId=JSON.parse(localStorage.getItem("BaseInfor")).clientLicenseId
    this.init();
  },
  methods: {

    init() {
      return new Promise((resolve, reject) => {
        tagsList(this.tenantId)
          .then(res => {
            if (res.data.code == 0) {
              this.tableData = res.data.result;
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    handleEdit(id,row) {
       if(row.url){
           this.formData = {
          url:[{uid:row.id,url:row.url}],
          sqNo:row.sqNo
          };
      }else{
        this.formData = {
       sqNo:row.sqNo
      };
      }
      this.dialogVisible = true;
      this.currentId = id;
    },
    submitSave(val) {
      this.isLoading = true;
      let url = val.url[0].url;
      let sqNo=val.sqNo;
      return new Promise((resolve,reject)=>{
        editTags(this.currentId, url,sqNo)
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success('修改成功');
          } else {
            this.$message.error(res.data.msg);
          }
          this.isLoading = false;
          this.dialogVisible=false;
          this.init();
          resolve();
        })
        .catch(err => {
          reject(err);
        });
      })
      
    }
  }
};
</script>

<style>
  .icon{
    margin-top:5px;
    width:100px;
    /* cursor:pointer; */
  }
</style>