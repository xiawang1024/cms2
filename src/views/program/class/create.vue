<template>
  <class-detail :is-edit="false"/>
</template>

<script>
import ClassDetail from './components/ClassDetail'

export default {
  name: 'CreateForm',
  components: { ClassDetail }
}
</script>

