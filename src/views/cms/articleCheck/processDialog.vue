<template>
  <el-dialog
    title="审核详情"
    :visible.sync="dialogVisible"
    width="450px"
    class="show-process"
    :before-close="handleClose">
    <el-steps direction="vertical" :active="processData.length" class="steps">
      <el-step icon="el-icon-success" v-for="(ele, index) in processData" :key="index">
        <template slot="title">
          <div v-if="index === 0">
            <div class="titles fz">
              提交审核
            </div>
          </div>
          <div v-else>
            {{ ele.auditLevel + 1 }}级审核
          </div>
        </template>
        <template slot="description">
          <div class="desc">
            <span v-if="index === 0">{{ ele.applyUser }}</span>
            <span v-else>{{ ele.auditUser }}</span>
            <span>{{ ele.applyTime }}</span>
          </div>
          <div v-if="index !== 0" class="desc">
            <span>{{ articleStatusChange(ele.state) }}</span>
            <span v-if="ele.auditOpinion">({{ ele.auditOpinion }})</span>
          </div>
        </template>
      </el-step>
    </el-steps>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    processData: {
      default: ()=> {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    articleStatusChange(val) {
      switch(val) {
        case 0:
          return '待审核'
        case 1:
          return '审核通过'
        case 2:
          return '审核拒绝'
        case 3:
          return '返回上一级 '
        case 4:
          return '审核中'
      }
    },
  }
}
</script>
<style lang="scss">
  .show-process {
    .steps{
     .el-step{
        min-height: 80px;
        .titles{
          font-size: 15px;
        }
        .desc{
          color: #606266;
        }
      }
    }
  }
</style>