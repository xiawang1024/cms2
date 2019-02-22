<template>
  <div class="component-form-container">
    <el-form :model="componentForm">
      <el-form-item label="组件名称">
        <el-input v-model="componentForm.name"/>
      </el-form-item>
      <el-form-item label="所属栏目">
        <el-cascader
          :options="options"
          v-model="componentForm.belongProgram"
          change-on-select
          placeholder="请选择所属栏目"
          @change="selectProgram"
        />
      </el-form-item>
      <el-form-item label="描述">
        <el-input :rows="2" v-model="componentForm.desc" type="textarea"/>
      </el-form-item>

      <el-form-item label="变量列表">
        <el-card class="varible-card">
          <el-form-item
            v-for="(component, index) in componentForm.components"
            :label="'变量' + (index+1) "
            :key="component.key"
            :prop="'components.' + index + '.value'"
            :rules="{
              required: true, message: '变量不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="component.name" placeholder="变量名称"/>
            <el-input v-model="component.value" placeholder="变量值"/>是否必填：
            <el-switch v-model="component.required" active-color="#13ce66"/>
            <el-input v-model="component.application" placeholder="变量用途"/>
            <el-button @click.prevent="removeComponent(component)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addComponent">新增变量</el-button>
          </el-form-item>
        </el-card>
      </el-form-item>

      <el-form-item label="组件内容">
        <el-input :rows="15" v-model="componentForm.desc" type="textarea" class="content-textara"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd()">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConponentEdit',
  data() {
    return {
      options: [],
      typeList: [
        {
          id: 1,
          name: '列表组件'
        },
        {
          id: 2,
          name: '公共组件'
        },
        {
          id: 3,
          name: '正文组件'
        }
      ],
      platList: [
        {
          id: 1,
          name: '电脑页面'
        },
        {
          id: 2,
          name: 'JSON数据'
        },
        {
          id: 3,
          name: 'XML数据'
        }
      ],
      chooseComponent: '',
      componentList: [
        {
          id: 1,
          lable: '加载更多',
          desc: '加载更多',
          value: ''
        },
        {
          id: 2,
          lable: '改版正文页顶部导航2',
          desc: '改版正文页顶部导航2',
          value: ''
        },
        {
          id: 3,
          lable: '加载更多',
          desc: '加载更多',
          value: ''
        },
        {
          id: 4,
          lable: '改版正文页顶部导航2',
          desc: '改版正文页顶部导航2',
          value: ''
        },
        {
          id: 5,
          lable: '加载更多',
          desc: '加载更多',
          value: ''
        },
        {
          id: 6,
          lable: '改版正文页顶部导航2',
          desc: '改版正文页顶部导航2',
          value: ''
        },
        {
          id: 7,
          lable: '加载更多',
          desc: '加载更多',
          value: ''
        },
        {
          id: 8,
          lable: '改版正文页顶部导航2',
          desc: '改版正文页顶部导航2',
          value: ''
        },
        {
          id: 9,
          lable: '加载更多',
          desc: '加载更多',
          value: ''
        },
        {
          id: 10,
          lable: '改版正文页顶部导航2',
          desc: '改版正文页顶部导航2',
          value: ''
        }
      ],
      componentForm: {
        id: '',
        name: '',
        belongProgram: [],
        desc: '',
        components: [],
        content: ''
      }
    }
  },
  methods: {
    selectProgram() {
      console.log(this.componentForm.belongProgram)
    },
    search() {
      console.log('搜索' + this.selectWebSite + '---' + this.searchTem)
    },
    addComponent() {
      this.componentForm.components.push({
        name: '',
        value: '',
        required: false,
        application: '',
        key: Date.now()
      })
    },
    removeComponent(item) {
      var index = this.componentForm.components.indexOf(item)
      if (index !== -1) {
        this.componentForm.components.splice(index, 1)
      }
    },
    beforeAdd() {
      this.dialogTitle = '添加组件'
      this.dialogVisible = true
    },
    handleAdd() {
      console.log('添加')
    },
    beforeAlter(index, row) {
      this.componentForm.id = row.id
      this.componentForm.name = row.name
      this.componentForm.type = row.type
      this.componentForm.belongProgram = row.belongProgram
      this.componentForm.fitPlat = row.fitPlat
      this.componentForm.desc = row.desc
      this.componentForm.createTime = row.createTime
      this.dialogTitle = '修改组件'
      this.dialogVisible = true
    },
    handleAlter() {
      console.log('修改')
    },
    handleDelete(index, row) {
      console.log('删除' + row.plat)
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
