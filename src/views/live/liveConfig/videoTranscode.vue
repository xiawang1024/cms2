<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button size="mini" type="primary" @click="handleUpload">上传</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableValue" row-key="id">
      <el-table-column type="index" width="50" />
      <el-table-column prop="fileType" width="80" label="文件类型" :formatter="typeFormate" />
      <el-table-column prop="clientLicenseId" width="100" label="所属站点" />
      <el-table-column prop="videoBitRate" width="80" label="视频码率" />
      <el-table-column prop="audioBitRate" width="80" label="音频码率" />
      <el-table-column prop="resolution" width="80" label="分辨率" />
      <el-table-column prop="videoCode" width="80" label="视频编码" />
      <el-table-column prop="audioCode" width="80" label="音频编码" />
      <el-table-column prop="createUser" width="100" label="创建人" />
      <el-table-column prop="createTime" width="180" label="创建时间" />
      <el-table-column prop="updateTime" width="180" label="更新时间" />
      <el-table-column prop="state" width="120" label="转码状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state==3" class="colorSuccess">成功</span>
          <span v-if="scope.row.state==2" class="colorDanger">失败</span>
          <span v-if="scope.row.state==1" class="colorWarning">转码中...</span>
          <span v-if="scope.row.state==0" class="colorInfo">未转码</span>
        </template>
      </el-table-column>
      <el-table-column prop="inputFilePath" label="输入地址" show-overflow-tooltip />
      <el-table-column prop="outputFilePath" label="输出地址" show-overflow-tooltip >
        <template slot-scope="scope">
          <span v-if="scope.row.state==3">{{ scope.row.outputFilePath }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.state==2"
            size="mini"
            type="warning"
            @click="handleRecover(scope.$index, scope.row)"
          >重试</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagenation"
      :current-page="pageNo"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog :visible.sync="dialogVisible" title="添加操作记录">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="formData"
        @save="submitSave"
        label-width="80px"
        @selectChange="typeChange"
        @selectChanges="selectChanges"
      />
    </el-dialog>
  </div>
</template>
<script>
import { streamfile, addTranscode,deleteTranscode,retranscode } from "@/api/live/videoTranscode.js";
export default {
  name: "VideoTranscode",
  data() {
    return {
      tableValue: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      dialogVisible: false,
      formSettings: [
        {
          // audioCode: "string",
          // fileType: 0,
          // clientLicenseId: "string",
          // createTime: "string",
          // createUser: "string",
          // id: "string",
          // inputFilePath: "string",
          // outputFilePath: "string",
          // resolution: "string",
          // state: 0,
          // videoCode: "string",
          items: [
            {
              label: "文件类型",
              name: "fileType",
              type: "radio",
              required: true,
              value: 0,
              options: [
                {
                  label: "视频",
                  value: 0
                },
                {
                  label: "音频",
                  value: 1
                }
              ],
              events: {
                change: "selectChange"
              }
            },
            {
              label: "音频编码",
              name: "audioCode",
              type: "radio",
              required: true,
              value: "Acc",
              options: [
                {
                  label: "Acc",
                  value: "Acc"
                },
                {
                  label: "mp3",
                  value: "mp3"
                },

                {
                  label: "静音",
                  value: "静音"
                }
              ],
              hidden: true
            },
            {
              label: "码率",
              name: "audioBitRate",
              type: "radio",
              required: true,
              value: 128,
              options: [
                {
                  label: "128Kbps",
                  value: 128
                },
                {
                  label: "64Kbps",
                  value: 64
                }
              ],
              hidden: true
            },
            //video 配置
            {
              label: "配置",
              name: "config",
              type: "radio",
              required: true,
              value: 0,
              options: [
                {
                  label: "模板配置",
                  value: 0
                },
                {
                  label: "自定义",
                  value: 1
                }
              ],
              hidden: false,
              events: {
                change: "selectChanges"
              }
            },
            {
              label: "模板",
              name: "template",
              type: "checkbox",
              required: true,
              value: ["720P", 1800, "H264", "ACC"],
              options: [
                {
                  label: "分辨率 720P",
                  value: "720P",
                  disabled: true
                },
                {
                  label: "码率 128Kbps",
                  value: 1800,
                  disabled: true
                },
                {
                  label: "编码 H264",
                  value: "H264",
                  disabled: true
                },
                {
                  label: "音频编码 ACC",
                  value: "ACC",
                  disabled: true
                }
              ],
              hidden: false
            },
            {
              label: "分辨率",
              name: "resolution",
              type: "radio",
              required: true,
              options: [
                {
                  label: "原视频",
                  value: "原视频"
                },
                {
                  label: "720P",
                  value: "720P"
                },
                {
                  label: "480P",
                  value: "480P"
                }
              ],
              hidden: true
            },
            {
              label: "码率",
              name: "videoBitRate",
              type: "radio",
              required: true,
              options: [
                {
                  label: "2400Kbps",
                  value: 2400
                },
                {
                  label: "1800Kbps",
                  value: 1800
                },
                {
                  label: "800Kbps",
                  value: 800
                }
              ],
              hidden: true
            },
            {
              label: "编码",
              name: "videoCode",
              type: "radio",
              required: true,
              options: [
                {
                  label: "H264",
                  value: "H264"
                },
                {
                  label: "mpeg-4",
                  value: "mpeg-4"
                }
              ],
              hidden: true
            },
            {
              label: "音频编码",
              name: "VaudioCode",
              type: "radio",
              required: true,
              options: [
                {
                  label: "mp3",
                  value: "mp3"
                },
                {
                  label: "Acc",
                  value: "Acc"
                },
                {
                  label: "静音",
                  value: "静音"
                }
              ],
              hidden: true
            },
            {
              label: "上传资源",
              name: "inputFilePath",
              type: "simpleVideo",
              required: true,
              limit: 1,
              hidden: false,
              acceptFile: { accept: [".mp4", ".rmvb", ".mkv", ".wmv", ".flv"] }
            },
            {
              label: "上传资源",
              name: "inputFilePath",
              type: "simpleVideo",
              required: true,
              limit: 1,
              hidden: true,
              acceptFile: {
                accept: ['.mp3','.wmv','.acc' ]
              }
            }
          ]
        }
      ],
      formData: {}
    };
  },
  created() {
    this.initTable();
  },
  methods: {
    initTable() {
      return new Promise((resolve, reject) => {
        streamfile({ pageNo: this.pageNo, pageSize: this.pageSize })
          .then(res => {
            console.log(res, "res");
            if (res.data.code == 0) {
              this.tableValue = res.data.result.content;
              this.totalCount = res.data.result.total;
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    typeFormate(val) {
      let data = "";
      if (val.fileType == 0) {
        data = "视频";
      } else if (val.fileType == 1) {
        data = "音频";
      }
      return data;
    },
    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.initTable();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.initTable();
    },
    handleUpload() {
      this.dialogVisible = true;
    },
    submitSave(val) {
      var _this = this;
      let data = {};
      if (val.fileType == 0) {
        if (val.config == 0) {
          data.resolution = val.template[0];
          data.videoBitRate = val.template[1];
          data.videoCode = val.template[2];
          data.audioCode = val.template[3];
        } else if (val.config == 1) {
          data.resolution = val.resolution;
          data.videoBitRate = val.videoBitRate;
          data.videoCode = val.videoCode;
          data.audioCode = val.VaudioCode;
        }
      } else if (val.fileType == 1) {
        data.audioCode = val.audioCode;
        data.audioBitRate = val.audioBitRate;
      }
      (data.clientLicenseId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId),
        (data.createUser = JSON.parse(
          localStorage.getItem("BaseInfor")
        ).userName);
      data.fileType = val.fileType;

      //未获得文件地址拦截操作
      if (val.inputFilePath[0].url) {
        data.inputFilePath = val.inputFilePath[0].url;
      } else {
        this.$message({
          type: "error",
          message: "请在文件上传结束后进行操作"
        });
        return false;
      }

      return new Promise((resolve, reject) => {
        addTranscode(data)
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              _this.initTable();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
            _this.dialogVisible = false;
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //切换类型
    typeChange(val) {
      if (val == "1") {
        //音频
        this.formSettings[0].items[0].value = 1;
        this.formSettings[0].items[1].hidden = false;
        this.formSettings[0].items[2].hidden = false;
        this.formSettings[0].items[3].hidden = true;
        this.formSettings[0].items[4].hidden = true;
        this.formSettings[0].items[5].hidden = true;
        this.formSettings[0].items[6].hidden = true;
        this.formSettings[0].items[7].hidden = true;
        this.formSettings[0].items[8].hidden = true;
        this.formSettings[0].items[9].hidden = true;
        this.formSettings[0].items[10].hidden = false;

        console.log(this.formSettings, "form");

        this.$refs.vform.updateForm();
      } else if (val == "0") {
        //视频
        this.formSettings[0].items[3].value = 0;
        this.formSettings[0].items[0].value = 0;
        this.formSettings[0].items[1].hidden = true;
        this.formSettings[0].items[2].hidden = true;
        this.formSettings[0].items[3].hidden = false;
        this.formSettings[0].items[4].hidden = false;
        this.formSettings[0].items[5].hidden = true;
        this.formSettings[0].items[6].hidden = true;
        this.formSettings[0].items[7].hidden = true;
        this.formSettings[0].items[8].hidden = true;
        this.formSettings[0].items[9].hidden = false;
        this.formSettings[0].items[10].hidden = true;

        this.$refs.vform.updateForm();
      }
    },
    selectChanges(val) {
      if (val == "1") {
        //自定义
        this.formSettings[0].items[3].value = 1;
        this.formSettings[0].items[0].value = 0;
        this.formSettings[0].items[4].disabled = true;
        this.formSettings[0].items[1].hidden = true;
        this.formSettings[0].items[2].hidden = true;
        this.formSettings[0].items[3].hidden = false;
        this.formSettings[0].items[4].hidden = true;
        this.formSettings[0].items[5].hidden = false;
        this.formSettings[0].items[6].hidden = false;
        this.formSettings[0].items[7].hidden = false;
        this.formSettings[0].items[8].hidden = false;
        this.$refs.vform.updateForm();
      } else if (val == "0") {
        //模板
        this.formSettings[0].items[3].value = 0;
        this.formSettings[0].items[0].value = 0;
        this.formSettings[0].items[4].disabled = true;
        this.formSettings[0].items[1].hidden = true;
        this.formSettings[0].items[2].hidden = true;
        this.formSettings[0].items[3].hidden = false;
        this.formSettings[0].items[4].hidden = false;
        this.formSettings[0].items[5].hidden = true;
        this.formSettings[0].items[6].hidden = true;
        this.formSettings[0].items[7].hidden = true;
        this.formSettings[0].items[8].hidden = true;
        this.$refs.vform.updateForm();
      }
    },
    handleDelete(index,row){
      var _this=this;
       this.$confirm("此操作将永久删除该资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
       new Promise((resolve,reject)=>{
        deleteTranscode(row.id)
        .then(res=>{
          if(res.data.code==0){
            this.$message({
              type:'success',
              message:res.data.msg
            })
            _this.initTable();
          }else{
               this.$message({
              type:'error',
              message:res.data.msg
            })
            }
        })
        .catch(err=>{
          reject(err)
        })
      })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      
    },
    handleRecover(index,row){
      var _this=this;
      return new Promise((resolve,reject)=>{
        retranscode(row.id)
        .then(res=>{
          if(res.data.code==0){
            this.$message({
            type:'success',
            message:res.data.msg
          })
          _this.initTable();
          }else{
            this.$message({
            type:'erorr',
            message:res.data.msg
          })
          }
          
        })
        .catch(err=>{
          reject(err)
        })

      })
    }
  }
};
</script>
<style lang="scss" scoped>
.pagenation {
  margin: 30px 0;
}
.colorSuccess {
  color: #67c23a;
}
.colorDanger {
  color: #f56c6c;
}
.colorWarning {
  color: #e6a23c;
}
.colorInfo {
  color: #409eff;
}
</style>