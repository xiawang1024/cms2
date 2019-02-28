<template>
  <div class="colunm-add-edit">
    <el-form :model="basicInformation">
      <el-row :gutter="30" >
        <el-col
          v-if="!routeQuery.isFather"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="父级栏目:">
            <el-input
              v-model="basicInformation.parentColumn"
              style="width:auto"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="前一栏目:">
            <el-select
              v-model="basicInformation.preColumn"
              placeholder="请选择前一栏目"
            >
              <el-option
                v-for="preColumn in preColumnList"
                :key="preColumn.id"
                :label="preColumn.name"
                :value="preColumn.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="访问域名:">
            <el-input
              v-model="basicInformation.domain"
              style="width:auto"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="存放位置:">
            <el-input
              v-model="basicInformation.location"
              class="location"
              style="width:auto"
            >
              <span
                slot="prefix"
                style="font-size:10px;user-select:none"
              >目录:</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="创建人员:">
            <el-input
              v-model="basicInformation.creator"
              style="width:auto"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="正常显示:">
            <el-switch
              v-model="basicInformation.display"
              active-color="#13ce66"
              active-text="正常"
              inactive-text="隐藏"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="其他数据:">
            <el-input
              :rows="3"
              v-model="basicInformation.otherData"
              style="max-width:400px;"
              type="textarea"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="管理人员:">
            <el-input
              v-model="basicInformation.manager"
              style="width:auto"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="栏目名称:">
            <el-input
              v-model="basicInformation.name"
              style="width:auto"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="栏目类型:">
            <el-select
              v-model="basicInformation.type"
              placeholder="请选择栏目类型"
            >
              <el-option
                v-for="type in typeList"
                :key="type.id"
                :label="type.name"
                :value="type.id"
              />
            </el-select>
            <el-input
              v-model="basicInformation.type"
              style="width:auto"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="栏目图标:">
            <upload />
            <el-checkbox v-model="basicInformation.icon.isScale">是否缩放</el-checkbox>
            <el-input
              v-if="basicInformation.icon.isScale"
              v-model="basicInformation.icon.scaleWidth"
              style="width:auto"
              placeholder="宽"
            />
            <el-input
              v-if="basicInformation.icon.isScale"
              v-model="basicInformation.icon.scaleHeight"
              style="width:auto"
              placeholder="高"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="关键字:">
            <el-input
              :rows="3"
              v-model="basicInformation.keyWords"
              style="max-width:400px;"
              type="textarea"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="栏目描述:">
            <el-input
              :rows="3"
              v-model="basicInformation.desc"
              style="max-width:400px;"
              type="textarea"
            />
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
const Upload = _ => import('@/components/cms/Upload/upload')
export default {
  name: 'ColumnHandel',
  components: { Upload },
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
      basicInformation: {
        parentColumn: '河南广播网',
        preColumn: '',
        domain: '',
        location: '',
        creator: '',
        display: '',
        otherData: '',
        manager: '',
        name: '',
        type: '',
        icon: {
          url: '',
          isScale: false,
          scaleWidth: '',
          scaleHeight: ''
        },
        keyWords: '',
        desc: '',
        modules: ''
      },
      preColumnList: [
        {
          id: 1,
          name: '最前面'
        },
        {
          id: 2,
          name: '焦点图'
        },
        {
          id: 3,
          name: '电台动态'
        },
        {
          id: 4,
          name: '新闻资讯'
        }
      ],
      typeList: [
        {
          id: 1,
          name: '新闻'
        },
        {
          id: 2,
          name: '音乐'
        },
        {
          id: 3,
          name: '文学'
        },
        {
          id: 4,
          name: '综艺'
        }
      ],
      routeQuery: {}
    }
  },
  mounted() {
    this.routeQuery = this.$route.query
  },
  methods: {}
}
</script>

<style scoped>
.colunm-add-edit {
  margin: 30px;
}
</style>
