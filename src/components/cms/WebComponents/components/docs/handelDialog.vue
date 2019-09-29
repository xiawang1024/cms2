<template>
  <div class="choose-handel-dialog">
    <el-dialog :visible.sync="dialogVisible" :title="title" width="50%" :before-close="colseMe">
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        :check-on-click-node="true"
        :check-strictly="true"
        @check="nodeCheck"
        :props="defaultProps"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="small">取消</el-button>
        <el-button type="primary" @click="handelConfirm" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { columnListLoading } from "@/api/cms/columnManage";
import mixins from "@/components/cms/mixins";
import { copyTo, moveToSingle, quoteTo } from "@/api/cms/article";
import { mapGetters } from "vuex";
export default {
  name: "DocFoot",
  mixins: [mixins],
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    title: {
      default: "",
      type: String
    },
    multipleList: {
      default: () => {
        [];
      },
      type: Array
    },
    documentIds: {
      default: () => {
        [];
      },
      type: Array
    }
  },
  data() {
    return {
      tableData: [],
      chooseIds: [],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      channelId: ""
    };
  },
  computed: {
    ...mapGetters(["treeTags"])
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.columnSearchList();
      }
    }
  },
  methods: {
    nodeCheck(value) {
      if (this.title == "移动到") {
        this.$refs.tree.setCheckedKeys([value.id]);
      }
      // this.$refs.tree.setCheckedKeys([]);
    },
    handelConfirm() {
      let choosedList = this.$refs.tree.getCheckedNodes();
      let choosedIds = [];
      if (choosedList.length) {
        choosedIds = choosedList.map(ele => {
          return ele.channelId;
        });
      }
      if (!this.documentIds.length) {
        return;
      }
      if (this.title == "复制到") {
        this.copyTo(this.documentIds.join(","), choosedIds.join(","));
      } else if (this.title == "引用到") {
        this.quoteTo(this.documentIds.join(","), choosedIds.join(","));
      } else if (this.title == "移动到") {
        this.moveToSingle(this.documentIds.join(","), choosedIds.join(","));
      }
    },
    // 引用到
    quoteTo(articleId, channelId) {
      return new Promise((resolve, reject) => {
        quoteTo(articleId, channelId)
          .then(response => {
            this.$emit("update:dialogVisible", false);
            this.$message.success("引用成功");
            this.$emit("handelSuccess");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //复制到
    copyTo(articleId, channelId) {
      return new Promise((resolve, reject) => {
        copyTo(articleId, channelId)
          .then(response => {
            this.$emit("update:dialogVisible", false);
            this.$message.success("复制成功");
            this.$emit("handelSuccess");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 移动到
    moveToSingle(articleId, channelId) {
      return new Promise((resolve, reject) => {
        moveToSingle(articleId, channelId)
          .then(response => {
            this.$emit("handelSuccess");
            this.$message.success("移动成功");
            this.$emit("update:dialogVisible", false);
            // this.$emit('handelSuccess')
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    columnSearchList() {
      return new Promise((resolve, reject) => {
        columnListLoading({}, 1, 1000)
          .then(response => {
            this.treeData = this.toTree(response.data.result.content);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    colseMe() {
      this.$emit("update:dialogVisible", false);
      if (this.tableData.length) {
        this.$emit("handelSuccess");
      }
    }
    // show() {
    //   this.dialogVisible = true
    // }
  }
};
</script>
<style lang="scss">
.choose-handel-dialog {
  .el-dialog {
    .el-dialog__header {
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>

