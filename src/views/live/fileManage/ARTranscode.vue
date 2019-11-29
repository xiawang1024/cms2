<template>
  <div>
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem" />
    </div>
    <el-row>
      <el-col :span="2">
        <el-button size="mini" type="primary" @click="handleUpload">上传</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableValue" row-key="id">
      <el-table-column type="index" width="50" />
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="视频码率：">
              <span>{{ props.row.videoBitRate }}</span>
            </el-form-item>
            <el-form-item label="音频码率：">
              <span>{{ props.row.audioBitRate }}</span>
            </el-form-item>
            <el-form-item label="分辨率：">
              <span>{{ props.row.resolution }}</span>
            </el-form-item>
            <el-form-item label="视频编码：">
              <span>{{ props.row.videoCode }}</span>
            </el-form-item>
            <el-form-item label="音频编码：">
              <span>{{ props.row.audioCode }}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="更新时间：">
              <span>{{ props.row.updateTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="title" width="250" label="标题" show-overflow-tooltip>
        <template slot-scope="scope">
          <i v-if="scope.row.fileType==0" class="el-icon-video-camera colorInfo"/>
          <i v-if="scope.row.fileType==1" class="el-icon-headset colorInfo"/>
          <i v-if="scope.row.fileType==2" class="el-icon-picture-outline colorInfo"/>
          <span >{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createUser" width="100" label="创建人" />
      <el-table-column prop="state" width="120" label="转码状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state==3" class="colorSuccess">成功</span>
          <span v-if="scope.row.state==2" class="colorDanger">失败</span>
          <span v-if="scope.row.state==1" class="colorWarning">转码中...</span>
          <span v-if="scope.row.state==0" class="colorInfo">待转码</span>
          <span v-if="scope.row.state==-1" class="colorInfo">源文件不存在</span>
        </template>
      </el-table-column>
      <el-table-column prop="vodStream" label="流地址" show-overflow-tooltip min-width="650">
        <template slot-scope="scope">
          <span v-if="scope.row.state==3">{{ scope.row.vodStream|createUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fileLength" width="150" label="时长" :formatter="timeFormate" />
      <el-table-column label="操作" width="230" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.state==2"
            size="mini"
            type="primary"
            @click="handleRecover(scope.$index, scope.row)"
          >重新转码</el-button>
          <el-button
            v-show="scope.row.state==3"
            size="mini"
            type="primary"
            @click="handleReview(scope.$index, scope.row)"
          >播放</el-button>
          <el-button
            v-show="scope.row.state==3"
            size="mini"
            type="primary"
            @click="handleDownload(scope.$index, scope.row)"
          >下载</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

    <el-dialog :visible.sync="dialogVisible" title="添加">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="formData"
        @save="submitSave"
        label-width="80px"
        @selectChange="typeChange"
        @selectChanges="selectChanges"
        :btn-loading="isUploading"
      />
    </el-dialog>
    <el-dialog :visible.sync="dialogVideo" title="预览" :before-close="handleShutdown">
      <el-row>
        <el-col :span="24">
          <video ref="viewVideo" v-if="viewtype==0" style="width:100%" :src="videoSource" controls />
          <audio ref="viewAudio" v-if="viewtype==1" style="width:100%" :src="videoSource" controls />
          <!-- <audio  src="https://np01-sycdn.kuwo.cn/3591a98480253ad009e6dd93b18d8097/5d8c9807/resource/n2/88/97/2816282324.mp3" controls></audio> -->
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  streamfile,
  addTranscode,
  deleteTranscode,
  retranscode
} from "@/api/live/videoTranscode.js";
import baseUrl from "@/config/base-url";
export default {
  // name: "VideoTranscode",
  filters: {
    createUrl(val) {
      let data = "无";
      if (val != null) {
        data = baseUrl.STREAM_URL + val;
      }
      return data;
    }
  },
  data() {
    return {
      searchSettings: [
        {
          label: "转码状态",
          name: "state",
          visible: true,
          type: "select",
          options: [
            {
              label: "成功",
              value: 3
            },
            {
              label: "失败",
              value: 2
            },
            {
              label: "转码中",
              value: 1
            },
            {
              label: "未转码",
              value: 0
            }
          ]
        },
        {
          label: "标题",
          name: "title",
          visible: true,
          type: "text"
        },
        {
          label: "创建者",
          name: "createUser",
          visible: true,
          type: "text"
        },
        {
          label: "文件类型",
          name: "fileType",
          visible: true,
          type: "select",
          options: [
            {
              label: "视频",
              value: 0
            },
            {
              label: "音频",
              value: 1
            }
          ]
        }
      ],
      tableValue: [],
      videoSource: "",
      dialogVideo: false,
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
              value: "mp3",
              options: [
                {
                  label: "mp3",
                  value: "mp3"
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
              value: ["hd720", 1800, "h264", "aac"],
              options: [
                {
                  label: "分辨率 hd720",
                  value: "hd720",
                  disabled: true
                },
                {
                  label: "码率 1800Kbps",
                  value: 1800,
                  disabled: true
                },
                {
                  label: "编码 h264",
                  value: "h264",
                  disabled: true
                },
                {
                  label: "音频编码 aac",
                  value: "aac",
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
                  label: "hd720",
                  value: "hd720"
                },
                {
                  label: "hd480",
                  value: "hd480"
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
                  label: "h264",
                  value: "h264"
                },
                {
                  label: "mpeg-4",
                  value: "mpeg4"
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
                  label: "aac",
                  value: "aac"
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
              acceptFile: {
                accept: [
                  ".mp4",
                  ".rmvb",
                  ".mkv",
                  ".wmv",
                  ".flv",
                  ".mov",
                  ".avi",
                  ".swf",
                  ".mod"
                ]
              }
            },
            {
              label: "上传资源",
              name: "auidoFilePath",
              type: "simpleVideo",
              required: true,
              limit: 1,
              hidden: true,
              acceptFile: {
                accept: [".cda", ".wav", ".aac", ".mp3"]
              }
            },
            {
              label: "标题",
              name: "resourceTitle",
              type: "text",
              required: true
            }
          ]
        }
      ],
      formData: {},
      clientLicenseId: "",
      viewtype: "",
      fileType: "",
      createUser: "",
      title: "",
      state: "",
      isUploading: false
    };
  },
  created() {
    this.clientLicenseId = JSON.parse(
      localStorage.getItem("BaseInfor")
    ).clientLicenseId;
    this.initTable();
  },
  methods: {
    initTable() {
      return new Promise((resolve, reject) => {
        streamfile({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          tanentId: this.clientLicenseId,
          fileType: this.fileType,
          createUser: this.createUser,
          title: this.title,
          state: this.state
        })
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
    timeFormate(param) {
      let data = "";
      let val = param.fileLength;
      if (val) {
        let min = Math.floor(val % 3600);
        let s = (val % 60).toFixed(0);
        s = s < 10 ? "0" + s : s;
        let time =
          (Math.floor(val / 3600) < 10
            ? "0" + Math.floor(val / 3600)
            : Math.floor(val / 3600)) +
          ":" +
          (Math.floor(min / 60) < 10
            ? "0" + Math.floor(min / 60)
            : Math.floor(min / 60)) +
          ":" +
          s;

        data = time;
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
      this.isUploading = true;
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
        if (val.inputFilePath[0].url) {
          //截掉url域名
          let url = val.inputFilePath[0].url;
          data.inputFilePath = url.split(baseUrl.DOWN_URL)[1];
        } else {
          this.$message({
            type: "error",
            message: "请在文件上传结束后进行操作"
          });
          return false;
        }
      } else if (val.fileType == 1) {
        data.audioCode = val.audioCode;
        data.audioBitRate = val.audioBitRate;
        if (val.auidoFilePath[0].url) {
          //截掉url域名
          let url = val.auidoFilePath[0].url;
          data.inputFilePath = url.split(baseUrl.DOWN_URL)[1];
        } else {
          this.$message({
            type: "error",
            message: "请在文件上传结束后进行操作"
          });
          return false;
        }
      }
      (data.clientLicenseId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId),
        (data.createUser = JSON.parse(
          localStorage.getItem("BaseInfor")
        ).userName);
      data.title = val.resourceTitle;
      data.fileType = val.fileType;

      //未获得文件地址拦截操作

      if (data.audioCode == "静音") {
        data.audioCode = "";
      }
      if (data.resolution == "原视频") {
        data.resolution = "";
      }
      return new Promise((resolve, reject) => {
        addTranscode(data)
          .then(res => {
            _this.isUploading = false;
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              _this.$refs.vform.updateForm();

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
    handleDelete(index, row) {
      var _this = this;
      this.$confirm("此操作将永久删除该资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          new Promise((resolve, reject) => {
            deleteTranscode(row.id)
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
              })
              .catch(err => {
                reject(err);
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleRecover(index, row) {
      var _this = this;
      return new Promise((resolve, reject) => {
        retranscode(row.id)
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              _this.initTable();
            } else {
              this.$message({
                type: "erorr",
                message: res.data.msg
              });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //预览
    handleReview(index, row) {
      this.dialogVideo = true;
      this.viewtype = row.fileType;
      this.videoSource =
        baseUrl.STREAM_URL + "/transdownload" + row.outputFilePath;
    },
    handleCopy(index, row) {},
    handleDownload(index, row) {
      let downUrl = (
        baseUrl.STREAM_URL +
        "/transdownload" +
        row.outputFilePath
      ).toString();
      let saveTitle = row.title || new Date().getTime();
      let FileSaver = require("file-saver");
      if (row.fileType == 0) {
        FileSaver.saveAs(downUrl, saveTitle + ".mp4");
      }
      if (row.fileType == 1) {
        FileSaver.saveAs(downUrl, saveTitle + ".mp3");
      }
    },
    searchItem(val) {
      this.username = val.username;
      (this.pageNo = 1),
        (this.pageSize = 10),
        (this.totalCount = 0),
        (this.fileType = val.fileType == undefined ? "" : val.fileType),
        (this.createUser = val.createUser || ""),
        (this.title = val.title || ""),
        (this.state = val.state == undefined ? "" : val.state);
      this.initTable();
    },
    handleShutdown(done) {
      if (this.viewtype == 0) {
        this.$refs.viewVideo.pause();
      }
      if (this.viewtype == 1) {
        this.$refs.viewAudio.pause();
      }
      done();
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>