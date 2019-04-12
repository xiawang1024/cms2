<template>
  <div class="check-setting">
    审核管理
  </div>
</template>
<script>
import qs from 'qs' // 序列化表单数据
export default {
  name: 'CheckSetting',
  data() {
    return {}
  },
  mounted() {
    let data = {
      a: 1,
      b: 2
    }
    console.log(1222)
    console.log(qs.stringify(data), 'formdata')
  }
}
</script>
