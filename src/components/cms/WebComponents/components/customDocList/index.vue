<template>
  <div class="customDocList-wrap">
    <div class="tool-bar">
      <el-button
        type="primary"
        @click="handleAddCustomDocList"
      >新增</el-button>
    </div>
    <el-table
      :data="customDocList"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="desc"
        label="描述"
      />
      <el-table-column
        prop="docNum"
        label="文档数量"
      />
      <el-table-column
        prop="author"
        label="创建人"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="addCustomDocListVisible"
      :before-close="handleClean"
      top="8vh"
      width="70%"
      title="文档列表详情"
    >
      <el-form
        ref="customDocListForm"
        :model="customDocListForm"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="名称">
          <el-input
            v-model="customDocListForm.name"
            style="max-width:300px"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="customDocListForm.desc"
            style="max-width:300px"
          />
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-switch
            v-model="customDocListForm.disable"
            active-color="#13ce66"
          />
        </el-form-item>
        <el-form-item label="标签" />
        <el-form-item label="列表">
          <el-table
            :data="customDocListForm.imageList"
            style="width: 100%"
          >
            <el-table-column
              prop="title"
              label="标题"
            />
            <el-table-column
              prop="type"
              label="类型"
            />
            <el-table-column
              prop="belongColumn"
              label="所属栏目"
            />
            <el-table-column
              prop="sign"
              label="标记"
            />
            <el-table-column
              prop="author"
              label="发稿人"
            />
            <el-table-column
              prop="createTime"
              label="发布时间"
            />
            <el-table-column
              prop="clickNum"
              label="点击"
            />
            <el-table-column>
              <template
                slot="header"
                slot-scope="scope"
              >
                <el-button
                  type="text"
                  @click="handleAddDoc(scope.row)"
                >添加</el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  type="text"
                  style="color:#f56c6c"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
                <el-button
                  icon="el-icon-arrow-up"
                  circle
                />
                <el-button
                  icon="el-icon-arrow-down"
                  circle
                />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <el-dialog
        :visible.sync="addCustomDocVisible"
        title="选择文章"
        append-to-body
      >
        <el-row :gutter="10">
          <el-col
            :xs="24"
            :sm="24"
            :md="8"
            :lg="8"
            :xl="8"
          >
            <el-tree
              ref="websitTree"
              :data="treeData"
              :highlight-current="true"
              :check-on-click-node="true"
              @node-click="handleNodeClick"
            />
          </el-col>
          <el-col
            :xs="24"
            :sm="24"
            :md="16"
            :lg="16"
            :xl="16"
          >
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column
                prop="title"
                label="标题"
              />
              <el-table-column
                prop="belongColumn"
                label="所属栏目"
              />
              <el-table-column
                prop="releaseTime"
                label="发布时间"
              />
              <el-table-column
                prop="author"
                label="发布时间"
              />
            </el-table>
          </el-col>
        </el-row>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="addCustomDocVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addCustomDocVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addCustomDocListVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCustomDocListVisible = false"
        >保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { CustomDocList, TreeData } from './mockData.js'
export default {
  name: 'CustomDocList',
  data() {
    return {
      addCustomDocListVisible: false,
      addCustomDocVisible: false,
      customDocList: CustomDocList,
      TreeData: TreeData,
      customDocListForm: {
        id: '',
        name: '',
        desc: '',
        disable: '',
        tag: '',
        imageList: []
      }
    }
  },
  methods: {
    handleAddCustomDocList() {
      this.customDocListForm = {
        id: '',
        name: '',
        desc: '',
        disable: '',
        tag: '',
        imageList: []
      }
      this.addCustomDocListVisible = true
    },
    handleAddDoc() {
      this.addCustomDocVisible = true
    },
    handleEdit(row) {
      this.customDocListForm.imageList = row.imageList
      this.addCustomDocListVisible = true
    },
    handleClean() {
      this.addCustomDocListVisible = false
    },
    handleSave() {},
    handleDelete() {}
  }
}
</script>
<style lang="scss" scoped>
.el-button + .el-button {
  margin: 5px 0px;
}
.customDocList-wrap {
  margin: 0 5px;
}
.tool-bar {
  text-align: right;
}
.title {
  color: #454545;
  padding: 10px 0;
  font-weight: 700;
  border-bottom: 1px solid #444;
  margin-bottom: 20px;
}
.location-box {
  width: 300px;
}
.location-btn {
  width: 30%;
  padding: 20px;
}
</style>

