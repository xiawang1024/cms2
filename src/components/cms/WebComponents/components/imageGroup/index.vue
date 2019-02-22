<template>
  <div class="imageGroup-wrap">
    <div class="tool-bar">
      <el-button
        size="small"
        type="primary"
        @click="handleAdd"
      >新增</el-button>
    </div>
    <el-table
      :data="imageGroupList"
      size="mini"
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
        prop="imageNum"
        label="图片数量"
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
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="addImageGroupVisible"
      :before-close="handleClean"
      top="8vh"
      width="70%"
      title="收货地址"
    >
      <el-form
        ref="imageGroupForm"
        :model="imageGroupForm"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="名称">
          <el-input
            v-model="imageGroupForm.name"
            style="max-width:300px"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="imageGroupForm.desc"
            style="max-width:300px"
          />
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-switch
            v-model="imageGroupForm.disable"
            active-color="#13ce66"
          />
        </el-form-item>
        <el-form-item label="标签" />
        <el-form-item label="图集">
          <el-table
            :data="imageGroupForm.imageList"
            style="width: 100%"
          >
            <el-table-column
              prop="title"
              label="文件"
            >
              <template slot-scope="scope">
                <img
                  :src="scope.row.imageUrl"
                  style="width:100%"
                >
                <span class="fileName">{{ scope.row.fileName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="belongColumn"
              label="信息"
            >
              <template slot-scope="scope">
                <div>
                  <i class="el-icon-document" />
                  {{ scope.row.size }}
                </div>
                <div>
                  <i class="el-icon-info" />
                  {{ scope.row.width }}*{{ scope.row.height }}
                </div>
                <div>
                  <i class="el-icon-date" />
                  {{ scope.row.uploadTime }}
                </div>
                <el-input v-model="scope.row.location" />
              </template>
            </el-table-column>
            <el-table-column
              prop="releaseTime"
              label="自定义数据"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.f1">
                  <template slot="prepend">F1=</template>
                </el-input>
                <el-input v-model="scope.row.f2">
                  <template slot="prepend">F2=</template>
                </el-input>
                <el-input v-model="scope.row.f3">
                  <template slot="prepend">F3=</template>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="author"
              label="标题与描述"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.title"
                  placeholder="标题"
                />
                <el-input
                  v-model="scope.row.desc"
                  type="textarea"
                  placeholder="描述..."
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="redirectLocation"
              label="跳转地址"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.redirectLocation"
                  type="textarea"
                  placeholder="跳转地址"
                />
              </template>
            </el-table-column>
            <el-table-column>
              <template
                slot="header"
                slot-scope="scope"
              >
                <Upload />
              </template>
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  style="display:block"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
                <el-button
                  type="success"
                  style="display:block"
                  @click="handleSetCover(scope.row)"
                >设为封面</el-button>
                <el-button
                  type="primary"
                  style="display:block"
                  @click="handleSetCover(scope.row)"
                >重新上传</el-button>
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
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addImageGroupVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addImageGroupVisible = false"
        >保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Upload from '@/components/cms/Upload/uploadBtn'
import { imageGroupList } from './mockData.js'
export default {
  name: 'ImageGroup',
  components: { Upload },
  data() {
    return {
      addImageGroupVisible: false,
      imageGroupList: imageGroupList,
      imageGroupForm: {
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
    handleAdd() {
      this.imageGroupForm = {
        id: '',
        name: '',
        desc: '',
        disable: '',
        tag: '',
        imageList: []
      }
      this.addImageGroupVisible = true
    },
    handleEdit(row) {
      this.imageGroupForm.imageList = row.imageList
      this.addImageGroupVisible = true
    },
    handleClean() {
      this.addImageGroupVisible = false
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
.imageGroup-wrap {
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

