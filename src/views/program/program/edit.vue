<template>
  <program-detail :is-edit="true"/>
</template>

<script>
import ProgramDetail from './components/ProgramDetail'

export default {
  name: 'EditForm',
  components: { ProgramDetail }
}
</script>

