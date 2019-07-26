<template>
  <div class="helpdoc-container">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="handleAddDialog()">添加</el-button>
    </div>
    <template>
      <el-table
        ref="distrbutetable"
        :data="tableValue"
        :load="load"
        row-key="id"
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
     
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="distributeTitle" width="200" label="标题" />
        <el-table-column prop="distributeDetails" label="详情" />
        <el-table-column prop="distributeTime" width="150" label="创建时间" />
        <el-table-column prop="distributeNumber" width="90" label="转发路数" align="center" />
        <el-table-column prop="distributeStream" label="流地址" />
        <el-table-column prop="distributeType" width="90" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.distributeType==0" class="colorDanger">结束</span>
            <span v-if="scope.row.distributeType==1" class="colorSuccess">转播中</span>
          </template>
        </el-table-column>
        <el-table-column width="90" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              :disabled="scope.row.distributeType==1"
              @click.stop="handleRecover(scope.index,scope.row)"
            >恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog :visible.sync="vfromDialog" title="添加">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="distributeTitle"
          label="分发流标题"
          :rules="[
            { required: true, message: '请输入分发流标题', trigger: 'blur' },
          ]"
        >
          <el-row>
            <el-col :span="19">
              <el-input v-model="dynamicValidateForm.distributeTitle " size="mini" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          prop="distributeDetails"
          label="分发流详情"
          :rules="[
            { required: true, message: '请输入分发流详情', trigger: 'blur' }
          ]"
        >
          <el-row>
            <el-col :span="19">
              <el-input
                type="textarea"
                v-model="dynamicValidateForm.distributeDetails "
                size="mini"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          prop="inStream"
          label="输入流地址"
          :rules="[
            { required: true, message: '请输入流地址', trigger: 'blur' }
          ]"
        >
          <el-row>
            <el-col :span="19">
              <el-input v-model="dynamicValidateForm.inStream" size="mini" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.distributes"
          :label="'分发流地址' + (index+1)"
          :key="domain.key"
          :prop="'distributes.' + index + '.value'"
          :rules="{
            required: true, message: '转发不能为空', trigger: 'blur'
          }"
        >
          <el-row>
            <el-col :span="19">
              <el-input v-model="domain.value" size="mini" />
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button size="mini" @click.prevent="removeDomain(domain)">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button size="mini" @click="addDomain">新增分发流地址</el-button>
          <el-button size="mini" @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
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
  </div>
</template>
<script>
import {
  addDistribute,
  distributeList,
  distributeChildrenList,
  distributeRecover
} from "@/api/live/steamAdressManage.js";
export default {
  data() {
    return {
      tableValue: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      dynamicValidateForm: {
        distributeTitle: "",
        distributeDetails: "",
        inStream: "",
        distributes: [
          {
            value: ""
          }
        ]
      },
      vfromDialog: false,
      maps: new Map(),
      pmaps:new Map(),
    };
  },
  created() {
    this.updatePage();

  },
  methods: {
    //初始化表单数据
    updatePage() {
      var _this = this;
      return new Promise((resolve, reject) => {
        distributeList({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          sortBy: "",
          order: ""
        })
          .then(response => {
            if (response.data.code == 0) {
              _this.tableValue = response.data.result.content;
              _this.totalCount = response.data.result.total;
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    load(tree, treeNode, resolve) {
      //传入当前节点id,查询子节点列表
      //发送请求，将请求结果resolve出去，
      var _resolve = resolve;
      var _this = this;
      const pid = tree.id;
      this.maps.set(pid, { tree, treeNode, resolve });
      return new Promise((resolve, reject) => {
        distributeChildrenList(tree.id)
          .then(response => {
            console.log(response);
            if (response.data.code == 0) {
              _this.childrenNode = response.data.result;
               _this.childrenNode.forEach(item=>{
                 let cid=item.id;
              _this.pmaps.set(cid,pid)

               })
              _resolve(_this.childrenNode);
            } else {
              //没有子节点返回空值
              _resolve([]);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    handleAddDialog() {
      //添加对话框
      this.vfromDialog = true;
    },
    //处理上传数据为后台请求格式
    formateData() {
      let data = JSON.parse(JSON.stringify(this.dynamicValidateForm));
      let distributes = [];
      data.distributes.forEach(item => {
        distributes.push(item.value);
      });
      data.distributes = distributes;
      return data;
    },
    submitForm(formName) {
      var _this = this;
      let data = this.formateData();
      this.$refs[formName].validate(valid => {
        if (valid) {
          return new Promise((resolve, reject) => {
            addDistribute(data)
              .then(response => {
                if (response.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: response.data.msg
                  });
                  _this.updatePage();
                } else {
                  this.$message({
                    type: "error",
                    message: response.data.msg
                  });
                }
                _this.vfromDialog = false;
                _this.$refs[formName].resetFields();

                resolve();
              })
              .catch(error => {
                reject(error);
              });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.distributes.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.distributes.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.distributes.push({
        value: "",
        key: Date.now()
      });
    },
    //恢复转发流
    handleRecover(index, row) {
      var _this = this;
      return new Promise((resolve, reject) => {
        distributeRecover(row.id).then(response => {
          if (response.data.code == 0) {
            this.$message({
              type: "success",
              message: response.data.msg
            });
            const pid =_this.pmaps.get(row.id)||row.id;
              const { tree, treeNode, resolve } = _this.maps.get(pid);
            _this.$set(_this.$refs.distrbutetable.store.states.lazyTreeNodeMap, pid, []);
            _this.load(tree, treeNode, resolve);
            
            
          } else {
            this.$message({
              type: "error",
              message: response.data.msg
            });
          }
        });
      });
    },
   
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.updatePage();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.updatePage();
    }
  }
};
</script>
<style lang="scss" scoped>
.helpdoc-container {
  margin: 30px;
 
  .pagenation {
    margin: 30px 0;
  }
  .colorSuccess {
    color: #67c23a;
  }
  .colorDanger {
    color: #f56c6c;
  }
}
</style>
