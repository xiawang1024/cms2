<template>
  <div class="docs-wrap">
    <div class="doc-head">
      <div class="left">
        <el-button type="success" icon="el-icon-check" size="mini">开启评论</el-button>
      </div>
      <div class="right">
        <el-input v-model="inputSelected" class="input-text" placeholder="请输入内容" size="mini">
          <el-button slot="append" icon="el-icon-search"/>
        </el-input>
      </div>
    </div>
    <!-- list -->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column label="栏目" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="用户" width="120"/>
        <el-table-column prop="name" label="文章" width="120"/>
        <el-table-column prop="name" label="标记" width="120"/>
        <el-table-column prop="name" label="评论内容" width="120"/>
        <el-table-column prop="address" label="时间" show-overflow-tooltip/>
      </el-table>
      <div style="margin-top: 20px">
        <el-button
          type="danger"
          @click="toggleSelection([tableData3[1], tableData3[2]])"
        >切换第二、第三行的选中状态</el-button>
        <el-button type="danger" @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
    <!-- 按钮 -->
    <!-- 底部分页 -->
    <div class="doc-foot">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total="400"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!--  -->
  </div>
</template>
<script>
export default {
  name: "DocsWrap",
  data() {
    return {
      //  tableData: DocList,
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      currentPage: 1,
      inputSelected: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 多选钩子
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 获取多选的id列表
     */
    getMultipleSelectionId() {
      const multipleSelection = this.multipleSelection;
      const len = multipleSelection.length;
      let multipleId = [];
      if (len) {
        multipleId = multipleSelection.map(item => item.id);
      }
      return multipleId;
    }
  }
};
</script>
<style lang="scss" scoped>
.docs-wrap {
  min-width: 1020px;
}
.doc-head {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 30px;
  justify-content: space-between;
  box-sizing: border-box;
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .select {
      width: 100px;
      margin-left: 10px;
    }
    .input-text {
      width: 180px;
      margin-left: 10px;
    }
  }
}
.doc-list {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.doc-foot {
  width: 100%;
  margin-top: 30px;
  padding: 0 30px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
}
</style>

