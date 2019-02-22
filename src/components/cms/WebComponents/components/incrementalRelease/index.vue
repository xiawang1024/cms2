<template>
  <div class="incrementalRelease-wrap">
    <div class="tool-bar">
      <el-button
        size="mini"
        type="primary"
        @click="handleRelease"
      >发布{{ chooseNum }}条文稿</el-button>
      <el-button
        size="mini"
        @click="handleBackAndClose"
      >返回关闭</el-button>
    </div>
    <el-row>
      <el-col
        :xs="12"
        :sm="12"
        :md="8"
        :lg="4"
        :xl="4"
      >
        <el-select
          v-model="hasChildren"
          size="mini"
          clearable
          placeholder="是否包含子栏目"
          @change="search"
        >
          <el-option
            label="包含子栏目"
            value="1"
          />
          <el-option
            label="不包含子栏目"
            value="0"
          />
        </el-select>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="8"
        :lg="4"
        :xl="4"
      >
        <el-select
          v-model="chooseType"
          size="mini"
          clearable
          placeholder="请选择文章类型"
          @change="search"
        >
          <el-option
            v-for="type in typeList"
            :key="type.id"
            :label="type.label"
            :value="type.id"
          />
        </el-select>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="8"
        :lg="4"
        :xl="4"
      >
        <el-select
          v-model="chooseStatus"
          size="mini"
          clearable
          placeholder="请选择文章状态"
          @change="search"
        >
          <el-option
            v-for="status in statusList"
            :key="status.id"
            :label="status.label"
            :value="status.id"
          />
        </el-select>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="8"
        :lg="4"
        :xl="4"
      >
        <el-input
          v-model="keyWords"
          size="mini"
          placeholder="标题/发稿人/关键词"
          prefix-icon="el-icon-search"
          clearable
          style="width:auto"
          @change="search"
        />
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="8"
      >
        <el-date-picker
          v-model="chooseTime"
          :picker-options="pickerOptions"
          size="mini"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        />
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      size="mini"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="title"
        label="标题"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="belongProgram"
        label="所属栏目"
      />
      <el-table-column
        prop="status"
        label="状态"
      />
      <el-table-column
        prop="sign"
        label="标记"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        prop="releaseTime"
        label="发布时间"
      />
      <el-table-column
        prop="author"
        label="发稿人"
      />
    </el-table>

    <el-pagination
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
import { TableData, TypeList, StatusList } from './mockData.js'
export default {
  name: 'IncrementalRelease',
  data() {
    return {
      // 日期时间选择器带快捷选项配置
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      tableData: TableData,
      typeList: TypeList,
      statusList: StatusList,
      hasChildren: '',
      chooseType: '',
      chooseStatus: '',
      chooseTime: '',
      chooseNum: 0,
      keyWords: '',
      pageNum: 1,
      pageSize: 10,
      totalCount: 0
    }
  },
  methods: {
    search() {
      console.log('搜索')
    },
    handleRelease() {
      console.log('发布文稿')
    },
    handleBackAndClose() {
      console.log('返回关闭')
    },
    // 表格分页处理
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getTableData()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
.incrementalRelease-wrap {
  margin: 0px 5px;
}
.tool-bar {
  text-align: right;
  margin-bottom: 20px;
}
</style>

