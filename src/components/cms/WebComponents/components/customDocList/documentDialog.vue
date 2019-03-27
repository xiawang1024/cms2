<template>
  <div class="choose-handel-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      title="选择文章"
      width="60%"
      :before-close="colseMe"
      :append-to-body = "true"
    >
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="small">取消</el-button>
        <el-button type="primary" @click="$emit('update:dialogVisible', false)" size="small">确定</el-button>
      </span> -->
      <div>
        <split-pane
          :min-percent="10"
          :max-percent="30"
          :default-percent="12"
          class="pane-wrap"
          split="vertical"
        >
          <template slot="paneL">
            <div class="left-container">
              <el-scrollbar
                wrap-class="scrollbar-wrapper"
                style="height:100%;"
              > 
                <div>rkwrjjwer9rr</div>
                <!-- <tree :tree-data = "tableData"/> -->
              </el-scrollbar>
            </div>
          </template>
          <template slot="paneR">
            <div class="right-container">
              <el-scrollbar
                wrap-class="scrollbar-wrapper"
                style="height:100%;"
              > 
                <div>wjrjw9jtjttjetttj</div>
                <!-- <WebComponents :component-type="contextMenu.id" /> -->
              </el-scrollbar>
            </div>
          </template>
        </split-pane>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import splitPane from 'vue-splitpane'
export default {
  name: '',
  components: {
    splitPane
  },
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      tableData: [],
      chooseIds: []
    }
  },
  watch: {
    dialogVisible(val) {
      // if(val) {
      //   this.chooseIds = []
      //   this.tableData = this.multipleList
      //   this.tableData.forEach((ele) => {
      //     ele.sendTime = Date.now()
      //     ele.handelTime =  Date.now()
      //     ele.modifyTime =  ''
      //     this.chooseIds.push(ele.articleId)
      //   })
      // }
    }
  },
  methods: {
    colseMe() {
      console.log(111)
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang='scss' scoped>
.choose-handel-dialog {
  position: relative;
  height: calc(100vh - 124px);
  margin: 12px 10px;
}
.pane-wrap {
  margin-top: 12px;
}
.left-container {
  /* background-color: #f38181; */
  // height: 100%;
  /* overflow: hidden; */
}

.right-container {
  // background-color: #fce38a;
  // height: 100%;
}
</style>

