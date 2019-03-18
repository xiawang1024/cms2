<template>
  <column-detail :is-edit="false"/>
</template>

<script>
import ColumnDetail from './components/ColumnDetail'

export default {
  name: 'CreateForm',
  components: { ColumnDetail }
}
</script>

