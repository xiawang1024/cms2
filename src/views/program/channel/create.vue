<template>
  <channel-detail :is-edit="false"/>
</template>

<script>
import ChannelDetail from './components/ChannelDetail'

export default {
  name: 'CreateForm',
  components: { ChannelDetail }
}
</script>

