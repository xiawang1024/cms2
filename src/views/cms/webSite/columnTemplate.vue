<template>
  <div class="column-template">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
        <div class="used-template">
          <div class="used-template-title">使用的模板</div>
          <el-table
            :data="tableData"
            :show-header="false"
            style="width: 100%">
            <el-table-column prop="address" label="地址"/>
            <el-table-column
              label="地址"
              width="50">
              <template slot-scope="scope">
                <i class="el-icon-error"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="16" :lg="16" :xl="16">
        <div class="useble-template">
          <div class="useble-template-title">可用模板</div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"/>
            <el-table-column prop="name" label="姓名" width="180"/>
            <el-table-column prop="address" label="地址"/>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'ColumnTemplate',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.column-template {
  margin: 30px;
  .used-template {
    .used-template-title {
      text-align: center;
    }
    .el-icon-error {
      cursor: pointer;
      color: #F56C6C;
    }
  }
}
</style>

