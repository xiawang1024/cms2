<template>
  <div class="doc-head">
    <div class="left">
      <!-- {{ treeTags }} -->
      <el-dropdown v-if="checkAuth('cms:article:delete')" size="mini" @command="handleCommand" placement="bottom-start">
        <el-button
          type="success"
          size="mini"
        >
          选中的文档<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item of currentDoc"
            :key="item.id"
            :command="item.id"
            :divided="true"
          >{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown size="mini" v-if="checkAuth('cms:article:channel')" @command="handleColumn" placement="bottom-start">
        <el-button type="primary" size="mini" >
          当前栏目<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item of currentColumn"
            :key="item.id"
            :command="item.id"
            :divided="true"
          >{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-if="checkAuth('cms:article:add')" type="primary" size="mini" icon="el-icon-plus" @click="createDocument"
      >新建文档</el-button>
    </div>
    <div class="right">
      <span class="name">筛选：</span>
      <el-select
        v-model="searchData.articleOrigin"
        filterable
        clearable
        placeholder="来源"
        size="mini"
      >
        <el-option
          v-for="item in sourceList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="searchData.articleType"
        class="select"
        filterable
        clearable
        placeholder="类型"
        size="mini"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="searchData.articleStatus"
        class="select"
        filterable
        clearable
        placeholder="状态"
        size="mini"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
      <el-input
        v-model="searchData.articleTitle"
        class="input-text"
        placeholder="请输入内容"
        size="mini"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchList"
        />
      </el-input>
      <!-- <el-button type="primary" size="small"  @click="searchData">搜索</el-button> -->
    </div>
    <handel-dialog :dialog-visible.sync="dialogVisible" :title="title" :multiple-list = "multipleList" :document-ids ="documentIds" @handelSuccess = "handelSuccess"/>
  </div>
</template>
<script>
import {
  currentDoc,
  currentColumn,
  fromOptions,
  typeOptions,
  statusOptions
} from './mockData.js'
import handelDialog from './handelDialog'
import { deleteDocumentMore, cancelDocumentMore, publishDocumentMore } from '@/api/cms/article'
import { mapGetters } from 'vuex'
export default {
  name: 'DocHead',
  components: {
    handelDialog
  },
  props: {
    multipleList: {
      default: ()=> {
        []
      },
      type: Array
    },
    sourceList: {
      default: ()=> {
        []
      },
      type: Array
    }
  },
  data() {
    return {
      currentDoc,
      currentColumn,
      fromOptions,
      typeOptions,
      statusOptions,
      searchData: {
        articleOrigin: '',
        articleType: '',
        articleStatus: '',
        articleTitle: '',
      },
      centerDialogVisible: false,
      dialogVisible: false,
      title: '',
      documentIds: []
    }
  },
  computed: {
    ...mapGetters(['treeTags'])
  },
  watch: {
    sourceList(val) {
    }
  },
  methods: {
    checkAuth (authKey) {
      // console.log(this.$store.getters.authorities, '111111111')
      // console.log（）
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false
      } else {
        return true
      }
    },
    handelSuccess() {
      this.$emit('handelSuccess')
    },
    chooseHandel(item) {
      console.log(item)
    },
    // 文章搜索
    searchList() {
      this.$emit('searchList', this.searchData)
    },
    handleColumn(command) {
      // if(command == 3) {
      //   const select = { id: '4', label: '修改栏目' }
      //   this.$store.dispatch('setContextMenu', select)
      // }
      switch(command) {
        case '2':
          this.$store.dispatch('setContextMenu', {id: '4', label: '建立子栏目'})
          break;
        case '3':
          this.$store.dispatch('setContextMenu', {id: '4', label: '修改栏目'})
          break;
        case '4':
          this.$store.dispatch('setContextMenu', {id: '11', label: '栏目图片'})
          break
        case '5':
          this.$store.dispatch('setContextMenu', {id: '12', label: '文档列表'})
          break
        case '6':
          this.$store.dispatch('setContextMenu', {id: '10', label: '栏目水印'})
          break
        case '7':
          this.$store.dispatch('setContextMenu', {id: '15', label: '模板'})
          break
        case '8':
          this.$store.dispatch('setContextMenu', {id: '16', label: '评论管理'})
          break
        case '9':
          this.$store.dispatch('setContextMenu', {id: '14', label: '废件箱'})
          break
        case '10':
          this.$store.dispatch('setContextMenu', {id: '17', label: '发稿和浏览统计'})
          break 
        default: 
          break
      }
    },
    handleCommand(command) {
      this.documentIds = []
      if(!this.multipleList.length) {
        this.$message.warning('请选择文章')
       return
      }
      this.multipleList.forEach((ele) => {
        this.documentIds.push(ele.articleId)
      })
      switch(command) {
        case '1':
          this.title = '发布'
          this.publishDocumentMore(this.documentIds.join(','))
          break
        case '2':
          this.$store.dispatch('setContextMenu', { id: '1', label: '新建文档' })
          break 
        case '3':
          this.title = '撤销发布'
          this.cancelDocumentMore(this.documentIds.join(','))
          break
        case '4':
          this.title = '删除'
          // this.dialogVisible = true
          this.deleteMore(this.documentIds.join(','))
          break
        case '5':
          this.title = '复制到'
          this.dialogVisible = true
          break
        case '6':
          this.title = '移动到'
          this.dialogVisible = true
          break
         case '7':
          this.title = '引用到'
          this.dialogVisible = true
          break 
        default: 
          break
      }
    },
    // 批量发布
    publishDocumentMore(id) {
      return new Promise((resolve, reject) => {
        publishDocumentMore({articleIds: id})
          .then((response) => {
            // this.$emit('handelSuccess')
            this.$message.success('发布成功')
            this.$emit('handelSuccess')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 批量撤销
    cancelDocumentMore(id) {
      return new Promise((resolve, reject) => {
        cancelDocumentMore({articleIds: id})
          .then((response) => {
            // this.$emit('handelSuccess')
            this.$message.success('撤销成功')
            this.$emit('handelSuccess')
            // this.tableData.forEach((ele) => {
            //   ele.modifyTime = response.data.result.modifyTime
            // })
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 删除多个
    deleteMore(id) {
      return new Promise((resolve, reject) => {
        deleteDocumentMore({articleIds: id})
          .then((response) => {
            this.$message.success('删除成功')
            this.$emit('handelSuccess')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    createDocument() {
      const select = { id: '1', label: '新建文档' }
      this.$store.dispatch('setContextMenu', select)
    }
  }
}
</script>
<style lang="scss" scoped>
#dropdown-menu-695{
  width: 108px;
}
.doc-head {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  // padding: 0 30px;
  justify-content: space-between;
  box-sizing: border-box;
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 14px;
    }
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
</style>

