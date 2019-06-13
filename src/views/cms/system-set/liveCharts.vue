<template>
  <div>
    <h3>图表</h3>
    <sd :style="{width:500}"
        :id="mycharts1"
    />
  </div>
</template>
<script>
import sd  from '@/components/Charts/keyboard.vue'
export default {
    name:'LiveCharts',
    components:{sd},
    data(){
        return {

        }
    },
     



            
}

</script>
<style scoped>

</style>
