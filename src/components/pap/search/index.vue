<template>
  <div>
    <!-- 包含搜索框折叠面板，搜索框折叠面板优先隐藏，优化页面布局(搜索框很少使用)  -->
    <el-collapse v-model="searchcollapseActiveNames" v-if="searchCollapseShowFlag">
      <el-collapse-item title="" name="true">
        <template slot="title">
          {{breadcrumbs}}<p style="margin-right: 10px;"></p>
          <el-tooltip v-if="searchTooltipFlag" class="item" effect="dark" content="点击打开搜索功能" placement="top-end">
            <i class="header-icon el-icon-search"></i>
          </el-tooltip>
        </template>
        <el-form-renderer :inline="searchFormInlineFlag" :class="searchFormInlineFlag ? 'demo-form-inline' : '' " label-width="100px" :content="contentForm" ref="formRender">
          <slot></slot>
        </el-form-renderer>
      </el-collapse-item>
    </el-collapse>
    <!-- 不包含搜索框折叠面板，直接展示搜索框表单 -->
    <el-form-renderer v-if="!searchCollapseShowFlag" :inline="searchFormInlineFlag" :class="searchFormInlineFlag ? 'demo-form-inline' : '' " label-width="100px" :content="contentForm" ref="formRender">
      <slot></slot>
    </el-form-renderer>
  </div>
</template>

<script>
import ElFormRenderer from '@/components/el-form-renderer'
import { generateTitle } from '@/utils/i18n'
export default {
  name: 'PapSearch',
  props: {
    /**
     *  搜索框折叠面板是否存在，默认存在搜索框折叠面板
     *  便于页面展示重要数据，搜索框优先隐藏
     */
    searchCollapseShowFlag: {
      type: Boolean,
      default: true
    },
    /**
     *  搜索框折叠面板是否打开，默认关闭搜索框折叠面板
     */
    searchCollapseOpenFlag: {
      type: Boolean,
      default: false
    },
    /**
     *  Tooltip 文字提示是否展示
     */
    searchTooltipFlag: {
      type: Boolean,
      default: true
    },
    /**
     *  是否行内表单，在一行内放置表单
     */
    searchFormInlineFlag: {
      type: Boolean,
      default: true
    },
    /**
     * 表单元素属性：传递过来表单JSON数据，用来渲染页面
     */
    content: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    ElFormRenderer
  },
  created () {
    this.getBreadcrumb()
  },
  watch: {
    content: {
      immediate: true,
      handler: function () {
      // 初始化如果有值的话，则需要渲染子组件
        this.refreshChildValue()
      }
    },
    searchCollapseOpenFlag: {
      immediate: true,
      handler: function () {
        // 初始化如果有值的话，则需要渲染子组件
        this.refreshCollapseActive()
      }
    }
  },
  computed: {
    collapseActiveNames: function () {
      var _this = this
      if (this.searchCollapseOpenFlag === true) {
        _this.searchcollapseActiveNames = ['true']
      } else {
        _this.searchcollapseActiveNames = []
      }
      return _this.searchcollapseActiveNames
    }
  },
  data () {
    return {
      contentForm: [],
      breadcrumbs: '',
      levelList: [],
      searchcollapseActiveNames: []
    }
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    getBreadcrumb () {
      var _this = this
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
        matched = [{ path: '/index', name: '首页', meta: { title: '首页' } }].concat(matched)
      }
      this.levelList = matched
      for (let i = 0; i < matched.length; i++) {
        this.breadcrumbs = this.breadcrumbs + this.generateTitle(matched[i].meta.title) + '/'
      }
    },
    refreshCollapseActive () {
      if (this.searchCollapseOpenFlag === true) {
        this.searchcollapseActiveNames = ['true']
      } else {
        this.searchcollapseActiveNames = []
      }
    },
    refreshChildValue () {
      this.contentForm = this.content
    }
  }
}
</script>
