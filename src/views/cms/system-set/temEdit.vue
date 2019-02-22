<template>
  <div class="tem-manager-container">
    <el-form :model="templateForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="所属栏目">
            <ChannelSelect :channel-id="templateForm.channelId" @channelCascaderChange="channelCascaderChange"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="模板类别">
            <el-select v-model="templateForm.templateType" placeholder="请选择栏目类别">
              <el-option
                v-for="type in typeList"
                :key="type.id"
                :label="type.name"
                :value="type.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="适用平台">
            <el-select v-model="templateForm.templateFormat" placeholder="请选择适用平台">
              <el-option
                v-for="plat in platList"
                :key="plat.id"
                :label="plat.name"
                :value="plat.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="是否有效">
            <el-switch v-model="templateForm.enableFlag" active-color="#13ce66"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="模板名称">
            <el-input v-model="templateForm.templateName"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="文件名">
            <el-input v-model="templateForm.templateFilename"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="描述">
        <el-input :rows="2" v-model="templateForm.templateDescription" type="textarea"/>
      </el-form-item>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16">
          <el-form-item label="模板内容">
            <el-input id="templateContentRef" ref="templateContentRef" :rows="15" v-model="templateForm.templateContent" type="textarea" class="content-textara"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="组件列表">
            <el-card class="template-card">
              <div v-for="component in componentList" :key="component.componentId" class="template-box">
                <span class="template-lable">{{ component.componentName }}</span>
                <el-button type="text" style="float:right" @click="componentClick(component)">使用</el-button>
                <div class="template-desc">{{ component.componentDescription }}</div>
              </div>
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit()">保 存</el-button>
    </div>
  </div>
</template>

<script>
import { fetchComponentList } from '@/api/component'
import { fetchTemplate, createTemplate, updateTemplate } from '@/api/template'
import ChannelSelect from '@/components/cms/ChannelSelect'
export default {
  name: 'TemEdit',
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
      chooseTemplate: '',
      componentList: [
      ],
      templateForm: {
        templateId: '',
        templateName: '',
        templateType: '',
        channelId: '',
        templateFormat: '',
        enableFlag: true,
        templateDescription: '',
        templateFilename: '',
        templateContent: ''
      }
    }
  },
  mounted: function() {
    // 初始化 主键 赋值
    var isAddQuery = this.$route.query.isAdd
    var templateIdQuery = this.$route.query.templateId
    if (isAddQuery === false) {
      this.chooseTemplateId = templateIdQuery
      this.templateForm.templateId = templateIdQuery
    }
    this.getTemplateInfo()
    this.fetchComponentList()
  },
  methods: {
    channelCascaderChange(val) {
      this.componentForm.channelId = val
    },
    fetchComponentList() {
      var _this = this
      var componentObjTmp = {
      }
      return new Promise((resolve, reject) => {
        fetchComponentList(componentObjTmp, 1, 100)
          .then((response) => {
            _this.componentList = response.data.result.content
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getTemplateInfo() {
      var _this = this
      return new Promise((resolve, reject) => {
        fetchTemplate(_this.chooseTemplateId)
          .then((response) => {
            _this.templateForm = response.data.result
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 组件使用按钮的焦点事件
    componentClick(componentObj) {
      var _this = this
      _this.$refs.templateContentRef.focus()
      _this.insertAtCursorForTemplateContentRef('<@' + componentObj.componentName + '/>')
    },
    async insertAtCursorForTemplateContentRef(myValue) {
      const myField = document.querySelector('#templateContentRef')
      if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myField.selectionStart
        var endPos = myField.selectionEnd
        this.templateForm.templateContent = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)
        await this.$nextTick() // 这句是重点, 圈起来
        myField.focus()
        myField.setSelectionRange(endPos + myValue.length, endPos + myValue.length)
      } else {
        this.templateForm.templateContent += myValue
      }
    },
    selectProgram() {
      console.log(this.templateForm.belongProgram)
    },
    search() {
      console.log('搜索' + this.selectWebSite + '---' + this.searchTem)
    },
    handleSubmit() {
      console.log('添加')
      var _this = this
      if (_this.templateForm.templateId === undefined || _this.templateForm.templateId === '' || _this.templateForm.templateId === null) {
        // create
        return new Promise((resolve, reject) => {
          createTemplate(_this.templateForm)
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
          updateTemplate(_this.templateForm)
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
        path: '/cms/systemSet/temManager'
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

.tem-manager-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}

.tool-bar .el-col {
  margin-left: 10px;
  margin-bottom: 10px;
}

.template-card {
  width: 100%;
  height: 320px;
  overflow-y: scroll;
}

.template-box {
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0 hsla(0, 0%, 0%, 0.2);

}

.template-lable {
  font-size: 110%;
  font-weight: 700;
}

.template-desc {
  color: hsl(0, 0%, 45%)
}
</style>
