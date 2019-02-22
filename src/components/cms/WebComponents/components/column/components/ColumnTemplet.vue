<template>
  <div class="column-templet-container">
    <el-form
      :model="columnTempletForm"
      label-position="top"
    >
      <el-row :gutter="30">
        <el-col
          :xs="24"
          :sm="10"
          :md="10"
          :lg="10"
          :xl="10"
        >
          <el-form-item label="选择的模板列表">
            <el-card class="templet-card">
              <div
                v-for="templet in columnTempletForm.chosenTempletList"
                :key="templet.id"
                class="templet-box"
              >
                <span class="templet-lable">{{ templet.lable }}</span>
                <el-button
                  size="small"
                  type="danger"
                  style="float:right"
                  icon="el-icon-delete"
                  circle
                />
                <div class="templet-desc">{{ templet.desc }}</div>
              </div>
            </el-card>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="14"
          :md="14"
          :lg="14"
          :xl="14"
        >
          <el-form-item label="可用模板列表">
            <div style="text-align:center">
              <el-radio-group
                v-model="leval"
                size="small"
              >
                <el-radio-button label="1">此栏目</el-radio-button>
                <el-radio-button label="2">父栏目</el-radio-button>
                <el-radio-button label="3">全局</el-radio-button>
              </el-radio-group>
            </div>
            <el-table
              :data="templetList"
              size="mini"
              style="width: 100%"
            >
              <el-table-column
                prop="lable"
                label="标题"
              />
              <el-table-column
                prop="type"
                label="提交人"
              />
              <el-table-column
                prop="belongColumn"
                label="规划时间"
              />
              <el-table-column
                prop="createTime"
                label="开始执行时间"
              />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="handleAdd(scope.$index, scope.row)"
                  >添加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        size="small"
        type="warning"
      >保存</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ColumnTemplet',
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      templetList: [
        {
          id: 1,
          lable: '加载更多',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        },
        {
          id: 2,
          lable: '改版正文页顶部导航2',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        },
        {
          id: 3,
          lable: '加载更多',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        },
        {
          id: 4,
          lable: '改版正文页顶部导航2',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        },
        {
          id: 5,
          lable: '加载更多',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        },
        {
          id: 6,
          lable: '改版正文页顶部导航2',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        },
        {
          id: 7,
          lable: '加载更多',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        },
        {
          id: 8,
          lable: '改版正文页顶部导航2',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        },
        {
          id: 9,
          lable: '加载更多',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        },
        {
          id: 10,
          lable: '改版正文页顶部导航2',
          type: '电脑页面/列表模板',
          belongColumn: '河南广播网',
          createTime: '2018-01-03'
        }
      ],
      leval: 1,
      columnTempletForm: {
        chosenTempletList: [
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
          }
        ]
      }
    }
  },
  methods: {
    handleAdd(index, row) {}
  }
}
</script>

<style scoped>
.column-templet-container {
  margin: 10px;
}

.templet-card {
  width: 100%;
  height: 500px;
  overflow-y: scroll;
}

.templet-box {
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0 hsla(0, 0%, 0%, 0.2);
}

.templet-lable {
  font-size: 110%;
  font-weight: 700;
}

.templet-desc {
  color: hsl(0, 0%, 45%);
}
</style>
