
<script>
export default {
  data() {
    return{}
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
        map[item.channelId] = item
      })
      var val = []
      data.forEach(function(item) {
        item.label = item.channelName
        item.id = item.channelId
        item.value = item.channelName
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentChannelId]
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
    }
  }
}
</script>