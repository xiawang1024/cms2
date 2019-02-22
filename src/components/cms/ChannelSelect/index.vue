<template>
  <div>
    <el-cascader v-model="channelCascader" :options="channelOptions" :props="props" change-on-select filterable clearable @change="handleChannelChange"/>
  </div>
</template>

<script>
import { fetchChannelList } from '@/api/channel'
export default {
  name: 'ChannelSelect',
  props: {
    channelId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      channelCascader: [],
      channelOptions: [],
      props: {
        children: 'children',
        label: 'channelName',
        value: 'channelId'
      }
    }
  },
  watch: {
  },
  created: function() {
    this.initTopChannel()
  },
  methods: {
    initTopChannel() {
      var _this = this
      var topChannel = {
      }
      return new Promise((resolve, reject) => {
        fetchChannelList(topChannel, 1, 1000)
          .then((response) => {
            _this.refreshCascaderValue(response.data.result.content)
            _this.channelOptions = _this.toTree(response.data.result.content)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    refreshCascaderValue(channelList) {
      var _this = this
      channelList.forEach(function(item) {
        if (item.channelId === _this.channelId) {
          if (item.parentChannelIds !== null && item.parentChannelIds !== '') {
            var tempArray = item.parentChannelIds.split(',')
            tempArray.push(item.channelId)
            _this.channelCascader = tempArray
          }
        }
      })
    },
    toTree(data) {
      // 删除 所有 children,以防止多次调用
      data.forEach(function(item) {
        delete item.children
      })
      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {}
      data.forEach(function(item) {
        map[item.channelId] = item
      })
      var val = []
      data.forEach(function(item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentChannelId]
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          val.push(item)
        }
      })
      return val
    },
    handleChannelChange(val) {
      console.log(val[val.length - 1])
      this.$emit('channelCascaderChange', val[val.length - 1])
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

