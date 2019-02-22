<template>
  <div class="picturesAndAccessories-wrap">
    <p class="title">附件</p>
    <el-table
      :data="accessoryData"
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
      <el-table-column>
        <template
          slot="header"
          slot-scope="scope"
        >
          <UploadBtn />
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
    <p class="title">正文图片</p>
    <el-table
      :data="bodyImagesData"
      style="width: 100%"
    >
      <el-table-column
        prop="title"
        label="文件"
      />
      <el-table-column
        prop="belongColumn"
        label="信息"
      />
      <el-table-column
        prop="releaseTime"
        label="自定义数据"
      />
      <el-table-column
        prop="author"
        label="标题与描述"
      />
      <el-table-column>
        <template
          slot="header"
          slot-scope="scope"
        >
          <UploadBtn />
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleClick(scope.row)"
          >查看</el-button>
          <el-button type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p class="title">视频</p>
    <el-table
      :data="moviesData"
      style="width: 100%"
    >
      <el-table-column
        prop="title"
        label="文件"
      />
      <el-table-column
        prop="belongColumn"
        label="信息"
      />
      <el-table-column
        prop="releaseTime"
        label="自定义数据"
      />
      <el-table-column
        prop="author"
        label="标题与描述"
      />
      <el-table-column>
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleClick(scope.row)"
          >查看</el-button>
          <el-button type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import UploadBtn from '@/components/cms/Upload/uploadBtn'
import { AccessoryData } from './mockData.js'
export default {
  name: 'PicturesAndAccessories',
  components: { UploadBtn },
  data() {
    return {
      accessoryData: AccessoryData,
      bodyImagesData: [],
      moviesData: []
    }
  },
  mounted() {
    console.log(this.accessoryData)
  }
}
</script>
<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0px;
  margin-right: 5px;
  margin-top: 5px;
}

.picturesAndAccessories-wrap {
}
.title {
  font-size: 130%;
  padding: 10px 0;
  font-weight: 700;
  margin-bottom: 20px;
}
</style>

