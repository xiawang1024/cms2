<template>
  <class-detail :is-edit="true"/>
</template>

<script>
import ClassDetail from './components/ClassDetail'

export default {
  name: 'EditForm',
  components: { ClassDetail }
}
</script>

