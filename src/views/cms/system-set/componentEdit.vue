<template>
  <div class="component-form-container">
    <el-form :model="componentForm">
      <el-form-item label="组件名称">
        <el-input v-model="componentForm.componentName"/>
      </el-form-item>
      <el-form-item label="所属栏目">
        <ChannelSelect :channel-id="componentForm.channelId" @channelCascaderChange="channelCascaderChange"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input :rows="2" v-model="componentForm.componentDescription" type="textarea"/>
      </el-form-item>

      <el-form-item label="变量列表">
        <el-card class="varible-card">
          <el-form-item
            v-for="(component, index) in componentForm.componentVariablesList"
            :label="'变量' + (index+1) "
            :key="component.key"
            :prop="'componentVariablesList.' + index + '.filedValue'"
            :rules="{
              required: true, message: '变量不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="component.filedName" placeholder="变量名称"/>
            <el-input v-model="component.filedValue" placeholder="变量值"/>是否必填：
            <el-switch v-model="component.filedRequired" active-color="#13ce66"/>
            <el-input v-model="component.filedExplain" placeholder="变量用途"/>
            <el-button @click.prevent="removeComponent(component)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addComponent">新增变量</el-button>
          </el-form-item>
        </el-card>
      </el-form-item>

      <el-form-item label="组件内容">
        <el-input :rows="15" v-model="componentForm.componentContent" type="textarea" class="content-textara"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="handleAdd()" size="mini">保 存</el-button>
    </div>
  </div>
</template>

<script>
import { fetchComponent, createComponent, updateComponent } from '@/api/cms/component'
import ChannelSelect from '@/components/cms/ChannelSelect'
export default {
  name: 'ConponentEdit',
  components: { ChannelSelect },
  data() {
    return {
      typeList: [
        {
          id: 'LIST',
          name: '列表组件'
        },
        {
          id: 'COMMON',
          name: '公共组件'
        },
        {
          id: 'CONTENT',
          name: '正文组件'
        }
      ],
      platList: [
        {
          id: 'PC',
          name: '电脑页面'
        },
        {
          id: 'JSON',
          name: 'JSON数据'
        },
        {
          id: 'XML',
          name: 'XML数据'
        }
      ],
      // 当前两个参数从请求参数中查询并且进行维护
      isAdd: true,
      chooseComponentId: '',
      componentForm: {
        componentId: '',
        componentName: '',
        channelId: '',
        componentVariables: '',
        componentVariablesList: [],
        componentContent: '',
        componentDescription: ''
      }
    }
  },
  mounted: function() {
    // 初始化 主键 赋值
    var isAddQuery = this.$route.query.isAdd
    var componentIdQuery = this.$route.query.componentId
    if (isAddQuery === false) {
      this.chooseComponentId = componentIdQuery
      this.componentForm.componentId = componentIdQuery
      this.getComponentInfo()
    }
  },
  methods: {
    channelCascaderChange(val) {
      this.componentForm.channelId = val
    },
    getComponentInfo() {
      var _this = this
      return new Promise((resolve, reject) => {
        fetchComponent(_this.chooseComponentId)
          .then((response) => {
            _this.componentForm = response.data.result
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    selectProgram() {
      console.log(this.componentForm.belongProgram)
    },
    search() {
      console.log('搜索' + this.selectWebSite + '---' + this.searchTem)
    },
    addComponent() {
      this.componentForm.componentVariablesList.push({
        filedName: '',
        filedValue: '',
        filedRequired: false,
        filedExplain: '',
        key: new Date().getTime()
      })
    },
    removeComponent(item) {
      var index = this.componentForm.componentVariablesList.indexOf(item)
      if (index !== -1) {
        this.componentForm.componentVariablesList.splice(index, 1)
      }
    },
    handleAdd() {
      console.log('添加')
      var _this = this
      if (_this.componentForm.componentId === undefined || _this.componentForm.componentId === '' || _this.componentForm.componentId === null) {
        // create
        return new Promise((resolve, reject) => {
          createComponent(_this.componentForm)
            .then((response) => {
              _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
              _this.gotoListPage(_this)
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      } else {
        // update
        return new Promise((resolve, reject) => {
          updateComponent(_this.componentForm)
            .then((response) => {
              _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
              _this.gotoListPage(_this)
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    gotoListPage(context) {
      context.$store.dispatch('delView', this.$route).then(({ visitedViews }) => {
        if (context.isActive(context.$route)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            context.$router.push(latestView)
          } else {
            context.$router.push('/')
          }
        }
      })
      context.$router.push({
        path: '/cms/systemSet/comComponent'
      })
    }
  }
}
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.component-form-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}

.tool-bar .el-col {
  margin-left: 10px;
  margin-bottom: 10px;
}

.varible-card {
  width: 100%;
  min-height: 100px;
  max-height: 300px;
  overflow-y: scroll;
}

.varible-card .el-input {
  width: auto;
}

.varible-card .el-form-item {
  margin-bottom: 20px;
}

.component-box {
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0 hsla(0, 0%, 0%, 0.2);
}

.component-lable {
  font-size: 110%;
  font-weight: 700;
}

.component-desc {
  color: hsl(0, 0%, 45%);
}
</style>
