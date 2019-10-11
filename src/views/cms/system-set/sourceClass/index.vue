<template>
  <div class="source-class">
    <!-- <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div> -->
    <div class="handel-title">
      <el-button type="primary" @click="handelSource('add')" size="mini">添加</el-button>
    </div>
    <div class="tree-column title-bottom">
      <div class="column-name pl-24">名称</div>
      <div class="column-type pl-43">类型</div>
      <div class="column-remark pl-24">备注 </div>
      <div class="column-seqNo pl-24">排序</div>
    </div>
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      :highlight-current="true"
      :check-on-click-node="true"
      :default-expanded-keys="expandedKeys"
      node-key="id"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div class="tree-column">
          <el-tooltip class="item" effect="dark" :content="node.label " placement="top-start" :disabled="lengthComputed(node.label) < 44">
            <div class="column-name">{{ node.label }}</div>
          </el-tooltip>
          <div class="column-type" :style="{ marginLeft: marginWidth(data.sourceMatrixLevel) + 'px'}">
            <span v-if="data.sourceMatrixType =='SP'">{{ '视频' }}</span>
            <span v-if="data.sourceMatrixType =='bm'">{{ '部门' }}</span>
            <span v-if="data.sourceMatrixType == 'jz'">{{ "矩阵" }}</span>
          </div>
          <div class="column-remark">{{ data.sourceMatrixRemark }} </div>
          <div class="column-seqNo">{{ data.seqNo }}</div>
          <div class="column-handel">
            <el-button type="text" size="small" @click.stop="handelSource('edit', data)">编辑</el-button>
            <el-button type="text" size="small" @click.stop="delSource(data)">删除</el-button>
            <el-button type="text" size="small" @click.stop="handelSource('add', data)">添加</el-button>
          </div>
        </div>
      </span>
    </el-tree>
    <!-- <v-page :visible.sync="showTemplate" >
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <column-template :column-row="columnRow"/>
      </template>
    </v-page>
    <v-page :visible.sync="showExtends">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <extends-word :column-row="columnRow"/>
      </template>
    </v-page>
    <v-page :visible.sync="showTag">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <tag-setting :column-row="columnRow"/>
      </template>
    </v-page>
    <v-page :visible.sync="showWater">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <water-setting :column-row="columnRow"/>
      </template>
    </v-page>
    <v-page :visible.sync="showHandel" @goBack="goBack">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <column-handel :column-row="columnRow" @closePage="closePage"/>
      </template>
    </v-page> -->
    <handel-dialog :dialog-visible.sync="dialogVisible" :handel-tpye="handelTpye" :source-list="sourceList" @handelSuccess = "getList"/>
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
// import { columnList, deleteColumn } from '@/api/cms/columnManage'
// import mixins from '@/components/cms/mixins'
import { fetchDictByDictName } from "@/api/cms/dict";
import { searchClass, deleteClass } from "@/api/cms/sourceClass";
// import store from 'store'
import { mapGetters } from 'vuex'
// import columnTemplate from './columnTemplate'
// import extendsWord from './extendsWord'
// import tagSetting from './tagSetting'
// import waterSetting from './waterSetting'
// import columnHandel from './columnHandel'
import handelDialog from './handelDialog'
export default {
  name: 'ColumnManage',
  components: {
    // columnTemplate,
    // extendsWord,
    // tagSetting,
    // waterSetting,
    // columnHandel
    handelDialog
  },
  // mixins: [mixins],
  data() {
    return {
      dialogVisible: false,
      sourceList: [],
      searchSettings: [{
        label: '栏目名称',
        name: 'channelId',
        placeholder: '请输入栏目名称',
        visible: true,
        options: [],
        type: 'cascader',
        changeOnSelect: true
      }, {
        label: '状态',
        name: 'hiddenFlag',
        placeholder: '请选择',
        visible: true,
        type: 'select',
        options: [
          {
            label: '显示',
            value: 0          
          },
          {
            label: '隐藏',
            value: 1          
          }
        ]
      }],
      searchData: {},
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      handelTpye: {
        type: 'add',
        row: {}
      },
      // 默认展开
      expandedKeys: []
    }
  },
  computed: {
    ...mapGetters(['columnAll']),
  },
  watch:{
  },
  mounted() {
    this.getSource()
    this.getList()
  },
  created() {
  },
  methods: {
    toTree(data) {
      // 删除 所有 children,以防止多次调用
      data.forEach(function(item) {
        delete item.children
      })
      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {}
      data.forEach(function(item) {
        map[item.sourceMatrixId] = item
      })
      var val = []
      data.forEach(function(item) {
        item.label = item.sourceMatrixName
        item.id = item.sourceMatrixId
        item.value = item.sourceMatrixId
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentSourceMatrixId]
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          // item.label = item[channelName]
          (parent.children || (parent.children = [])).push(item)
        } else {
          // item.label = item[channelName]
          val.push(item)
        }
      })
      return val
    },
    lengthComputed(str) {
      let len = str.length
      let res = 0
      for(let i=0; i<len; i++) {
        if((str.charCodeAt(i) & 0xff00) != 0) {
          res ++
        }
        res ++
      }
      return res
    },
    getList() {
      return new Promise((resolve, reject) => {
        searchClass(this.searchData, 1, 100)
          .then(response => {
            this.treeData = this.toTree(response.data.result.content)
            if(this.$refs.tree.getCurrentKey()) {
              this.expandedKeys = [this.$refs.tree.getCurrentKey()]
              this.$nextTick(() => {
                this.$refs.tree.setCurrentKey(this.$refs.tree.getCurrentKey())
              })
            }
            resolve();
          })
          .catch(error => {
            reject(error)
          });
      });
    },
    getSource() {
      return new Promise((resolve, reject) => {
        fetchDictByDictName('文稿来源')
          .then(response => {
            this.sourceList = response.data.result.details.map((ele) => {
                return {
                  label: ele.dictDetailName,
                  value: ele.dictDetailId
                }
              })
            resolve();
          })
          .catch(error => {
            reject(error)
          });
      });
    },
    // 节点操作
    handelSource(type, row) {
      this.dialogVisible = true
      this.handelTpye.type = type
      this.handelTpye.row = row
      if(row) {
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(row.sourceMatrixId)
        })
      }
    },
    marginWidth(level) {
      // :style="{ marginLeft: marginWidth(data.parentChannelIds) + 'px'}"
      if(level) {
        return  (level-1)* 18*(-1)
      } else {
        return 0
      }
    },
    delSource(row) {
      this.$nextTick(() => {
         this.$refs.tree.setCurrentKey(row.sourceMatrixId)
      })
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          deleteClass({sourceMatrixId: row.sourceMatrixId})
            .then(response => {
              this.$message.success('删除成功')
              this.getList()
              resolve();
            })
            .catch(error => {
              reject(error)
            });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    searchItem(searchData) {
      this.searchData = searchData
      this.getList()
    },
  }
}
</script>

<style lang='scss'>
.source-class {
  // margin:30px;
  .el-tree-node__content {
    height: 32px;
    border-bottom: 1px solid #ebeef5;
  }
  .tool-bar {
    // margin-top:22px;
    // margin-bottom:22px;
    // text-align: left;
    // padding-left:5px;
  }
  .pagination {
    margin-top:20px;
    margin-bottom:20px;
  }
  .el-table {
    // td, th{
    //   padding:0;
    // }
    .space-holder {
      width: 2px;
      height: 20px;
      background-color: #67C23A;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    .space-length{
      width: 10px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .tree-column{
    display: flex;
    align-items: center;
    font-size: 14px;
    .column-name {
      width:300px;
      overflow:hidden;
      word-break:keep-all;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    .column-type{
      min-width:70px;
      padding-left:20px;
    }
    .column-remark{
      width:200px;
      overflow:hidden;
      word-break:keep-all;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
    .column-seqNo{
      min-width: 100px;
    }
    .column-isRoot{
      min-width: 100px;
    }
    .column-set{
      min-width: 250px;
    }
    .column-handel{
      min-width: 120px;
    }
    .pl-24 {
      padding-left: 23px;
      color: #909399;
      font-weight: 700;
    }
    .pl-43{
      padding-left: 43px;
      color: #909399;
      font-weight: 700;
    }
    // .el-tree{
    //   .el-tree-node__content{
    //     height: 32px !important;
    //   }
    // }
  }
  .title-bottom{
    border-bottom: 1px solid #ebeef5;
    height: 32px;
  }
}
</style>
