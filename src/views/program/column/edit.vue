<template>
  <column-detail :is-edit="true"/>
</template>

<script>
import ColumnDetail from './components/ColumnDetail'

export default {
  name: 'EditForm',
  components: { ColumnDetail }
}
</script>

