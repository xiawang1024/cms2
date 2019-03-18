<template>
  <program-detail :is-edit="false"/>
</template>

<script>
import ProgramDetail from './components/ProgramDetail'

export default {
  name: 'CreateForm',
  components: { ProgramDetail }
}
</script>

