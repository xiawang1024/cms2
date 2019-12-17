<template>
  <div>


    <el-table :data="tableData">
      <el-table-column prop="tagName" label="标签名" />
      <el-table-column prop="order" label="排序" />
      <el-table-column prop="url" label="图片">
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
              label: "url",
              limit:1,
               rule: [
                {
                  required: true,
                  trigger: "blur",
                  message:'请上传图片'
                }
              ]
            },{
              name:'order',
              type: 'number',
              label: "序号",
              limit:1,
               rule: [
                {
                  required: true,
                  trigger: "blur",
                   message: '请输入数字',
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
      this.formData = {
       url:[{uid:row.url,url:row.url}],
       order:row.order
      };
      this.dialogVisible = true;
      this.currentId = id;
    },
    submitSave(val) {
      this.isLoading = true;
      let url = val.url[0].url;
      let order=val.order;
      return new Promise((resolve,reject)=>{
        editTags(this.currentId, url,order)
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success(res.data.msg);
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