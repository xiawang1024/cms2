<template>
  <div class="createPost-container">
    <el-form v-loading="loading" :rules="rules" ref="postForm" :model="postForm" class="form-container">

      <div class="createPost-main-container">
          <p class="warn-content">
            创建/编辑类目信息
            <small>
              <span style="color: #F56C6C">标题红色字体为必填项</span>
            </small>
          </p>

          <el-form-item style="margin-bottom: 40px;" prop="classname">
            <MDinput v-model="postForm.classname" :maxlength="100" name="name" required>
              <span style="color: #F56C6C">类目名称</span>
            </MDinput>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" prop="parentName">
            <MDinput v-model="postForm.parentName" disabled="disabled" :maxlength="100" name="name" required>
              <span style="color: #F56C6C">上级类目</span>
            </MDinput>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label="选择类目">
            <el-tree style="margin-top: 50px;"
              :data="treeList"
              :props="defaultProps"
              default-expand-all
              @node-click="handleNodeClick">
            </el-tree>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;">
            <el-button type="primary" @click="submitData()">提交</el-button>
            <el-button @click="back()">返回</el-button>
          </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import { fetchClass, createClass, fetchClassAll } from '@/api/program/class'
import MDinput from '@/components/MDinput'

const defaultForm = {
  classid: '',        // 类目id
  classname: '',      // 类目名称
  parentid: '',       // 父节点id
  parentName: ''      // 父节点Name
}

export default {
  name: 'ClassDetail',
  components: { MDinput },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      treeList: [],
      defaultProps: {
        id: 'classid',
        label: 'classname',
        children: 'childList',
      },
      rules: {
        classname: [{ required: true, message: '类名为必填项', trigger: 'blur' }],
        parentName: [{ required: true, message: '请选择上级类目', trigger: 'blur' }]
      },
    }
  },
  created() {
    //初始化类目
    this.getTreeList()
    //回显数据
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    getTreeList() {
      fetchClassAll().then(response => {
        this.treeList = response.data.result;
      })
    },
    fetchData(id) {
      this.loading = true
      fetchClass(id).then(response => {
        this.postForm = response.data.result
        this.loading = false

      }).catch(err => {
        console.log(err)
      })
    },
    handleNodeClick(data) {
      this.postForm.parentName = data.classname
      this.postForm.parentid = data.classid
    },
    submitData() {
      this.$refs['postForm'].validate(valid => {
        if(valid) {
          this.loading = true
            createClass(this.postForm).then(() => {
              this.loading = false
              this.$notify({
                title: '成功',
                message: '提交成功',
                type: 'success',
                duration: 2000
              })
              //清空表单值
              // this.postForm = {brand_right:0}
              this.back();
          })
        }
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
