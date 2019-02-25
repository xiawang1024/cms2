<!-- 建议所有的列表文件引入当前组件，并且使用 mixins 属性，避免页面失控 -->
<!-- 基类的vue部分，从当前url中获取到？后面的参数并且转换为 listQuery对象，用来防止详情页到列表页时候的页面失控 -->
<!-- 业务vue组件import当前文件，并且增加 mixins 部分即可增强当前业务属性 https://cn.vuejs.org/v2/guide/mixins.html -->
<!-- 混合 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。 -->
<!-- 通过该选项 doNotInitListQuery 来判断是否需要在组件创建完毕之后就初始化listQuery, 在调用该 mixins 的组件中 添加这么一个选项 就可以让组件不执行初始化方法 -->
<!-- 在调用当前组件的业务组件中，增加 export default{ doNotInitListQuery: true }  这一部分，即可控制当前方法的执行与否-->
<!-- 注意在使用此方法的过程中，需要重写 getList() 方法，并且增加 listQuery 属性，里面有 page rows 两个属性，用来判断分页相关逻辑 -->
<script>
  export default {
    created () {
      let option = this.$options.doNotInitListQuery
      if (!option) {
        this._baseVueInitListQuery()
      }
    },
    methods: {
      _baseVueInitListQuery () {
        // 增加传递参数处理，传递当前的listQuery对象，保证页面返回的时候，还携带原始数据
        if (this.$route.query !== undefined && this.$route.query !== '' && !this.isEmptyObject(this.$route.query)) {
          var queryObj = this.$route.query
          Object.keys(queryObj).forEach(function (v, i) {
            if (v === 'page' || v === 'rows') {
              queryObj[v] = Number(queryObj[v])
            }
          })
          this.listQuery = queryObj
        }
      },
      // 分页页面处理更改
      handleSizeChange (val) {
        this.listQuery.rows = val
        this.listQuery.page = 1
        this.getList()
      },
      // 分页页面处理更改
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.getList()
      },
      // 顶部的统一搜索处理
      handleFilter () {
        this.getList()
      },
      // 表格的复选框处理
      handleRowHandle (row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      handleSelectionChange (val) {
        console.log(val)
        this.multipleSelection = val
      },
      isEmptyObject (obj) {
        var name
        for (name in obj) {
          return false
        }
        return true
      },
      formatDate (strTime) {
        var date = new Date(strTime)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      }
    }
  }
</script>
