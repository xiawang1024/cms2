<template>
  <div class="tem-manager-container">
    <el-form :model="temForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="所属栏目">
            <el-cascader
              :options="options"
              v-model="temForm.belongProgram"
              change-on-select
              placeholder="请选择所属栏目"
              @change="selectProgram"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="模板类别">
            <el-select v-model="temForm.type" placeholder="请选择栏目类别">
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
            <el-select v-model="temForm.fitPlat" placeholder="请选择适用平台">
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
            <el-switch v-model="temForm.isEffective" active-color="#13ce66"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="模板名称">
            <el-input v-model="temForm.name"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="文件名">
            <el-input v-model="temForm.fileName"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="描述">
        <el-input :rows="2" v-model="temForm.desc" type="textarea"/>
      </el-form-item>

      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="16" :lg="16" :xl="16">
          <el-form-item label="模板内容">
            <el-input :rows="15" v-model="temForm.desc" type="textarea" class="content-textara"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="组件列表">
            <el-card class="component-card">
              <div v-for="component in componentList" :key="component.id" class="component-box">
                <span class="component-lable">{{ component.lable }}</span>
                <el-button type="text" style="float:right">使用</el-button>
                <div class="component-desc">{{ component.desc }}</div>
              </div>
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd()">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemEdit',
  data() {
    return {
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框',
                  children: [
                    {
                      value: 'radio',
                      label: 'Radio 单选框'
                    },
                    {
                      value: 'checkbox',
                      label: 'Checkbox 多选框'
                    }
                  ]
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      typeList: [
        {
          id: 1,
          name: '列表模板'
        },
        {
          id: 2,
          name: '公共模板'
        },
        {
          id: 3,
          name: '正文模板'
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
      temForm: {
        id: '',
        name: '',
        type: '',
        belongProgram: [],
        fitPlat: '',
        isEffective: true,
        desc: '',
        fileName: '',
        temContent: ''
      }
    }
  },
  methods: {
    selectProgram() {
      console.log(this.temForm.belongProgram)
    },
    search() {
      console.log('搜索' + this.selectWebSite + '---' + this.searchTem)
    },
    beforeAdd() {
      this.dialogTitle = '添加模板'
      this.dialogVisible = true
    },
    handleAdd() {
      console.log('添加')
    },
    beforeAlter(index, row) {
      this.temForm.id = row.id
      this.temForm.name = row.name
      this.temForm.type = row.type
      this.temForm.belongProgram = row.belongProgram
      this.temForm.fitPlat = row.fitPlat
      this.temForm.desc = row.desc
      this.temForm.createTime = row.createTime
      this.dialogTitle = '修改模板'
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

.component-card {
  width: 100%;
  height: 320px;
  overflow-y: scroll;
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
  color: hsl(0, 0%, 45%)
}
</style>
