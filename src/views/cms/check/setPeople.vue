<template>
  <div class="check-choose-people">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose">
      <el-select v-model="choosedPeople" multiple filterable placeholder="请选择">
        <el-option
          v-for="item in peopleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    peopleOptions: {
      default: ()=> {
        return []
      },
      type: Array
    },
    propChecked: {
      default: ()=> {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
      title: '审核人员',
      choosedPeople: []
    }
  },
  watch: {
    dialogVisible(val) {
    },
    propChecked(val) {
      this.choosedPeople = []
      if(val && val.length) {
        let result = []
        val.forEach((choose) => {
          result.push(this.peopleOptions.find((ele)=> {
            return ele.value == choose
          }))
        })
        this.choosedPeople = result.map((ele) => {
          return ele.value
        })
      }
    }
  },
  methods: {
    confirm() {
      this.$emit('update:dialogVisible', false)
      this.$emit('peopleList', this.choosedPeople)
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
<style lang="scss">
  .check-choose-people{
    .el-dialog__body{
      .el-select{
        width:100%;
        .el-input__inner{
          height:32px;
          line-height: 32px;
        }
      }
    }
  }
</style>