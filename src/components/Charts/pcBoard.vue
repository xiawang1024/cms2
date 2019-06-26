<template>
  <div class="table-list">
    <div class="overview-card-title-container">
      <label class="overview-card-title">今日流量</label>
    </div>
    <table class="list">
      <tbody class="rightLine nonerightline" >
        <tr class="title">
          <th/>
          <th>浏览量(PV)</th>
          <th>访客数(UV)</th>
          <th>IP数</th>
          <th>跳出率</th>
        </tr>
        <tr class="highlight ">
          <td class="normal ">今日</td>
          <td class="rightLine">{{ dashdate.length==0?'--':dashdate[7][0] }}</td>
          <td class="rightLine">{{ dashdate.length==0?'--':dashdate[7][1] }}</td>
          <td class="rightLine">{{ dashdate.length==0?'--':dashdate[7][2] }}</td>
          <td class="nonerightline">{{ dashdate.length==0?'--':((dashdate[7][3])*100 ).toFixed(2) }}%</td>
        </tr>
        <tr>
          <td class="normal">昨日</td>
          <td class="rightLine">{{ dashdate.length==0?'--':dashdate[6][0] }}</td>
          <td class="rightLine">{{ dashdate.length==0?'--':dashdate[6][1] }}</td>
          <td class="rightLine">{{ dashdate.length==0?'--':dashdate[6][2] }}</td>
          <td class="nonerightline">{{ dashdate.length==0?'--':((dashdate[6][3])*100).toFixed(2) }}%</td>
        </tr>
        <tr>
          <td class="normal">近七日</td>
          <td class="rightLine">{{ sevendata==null?'--':sevendata[0] }}</td>
          <td class="rightLine">{{ sevendata==null?'--':sevendata[1] }}</td>
          <td class="rightLine">{{ sevendata==null?'--':sevendata[2] }}</td>
          <td class="nonerightline">{{ sevendata==null?'--':((sevendata[3])*100).toFixed(2) }}%</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
  export default{

    
    props:{ 
      dashdate: {
      type: Array,
      default: () => {
        null;
      }
      }
    },
    data(){
      return{
      }
    },
    computed:{
      //七天数据计算
      sevendata:function(){
        let total=[];
        let reactValue=null;
        if( this.dashdate.length>0){
          reactValue=[];
           this.dashdate.forEach((item,index) => {
         item.forEach((value,order)=>{
           if(total[order]){
             total[order]=total[order]+value
           }else{
              total.push(value)
           }
              
            })
           
        });
         total.forEach((item)=>{
              reactValue.push(parseInt(item/8))
            })
            console.log(total,'total')
        }
       
        return reactValue
      }
    },
    
    created(){

    },
    mounted(){
    },
    methods:{
      
    
    },
    
  }

</script>
<style scoped>
.overview-card-title-container{
  margin-top: 5px;
}
div.table-list {
  width:100%;
  height: 353px;
  margin: 0  auto;
  padding-top: 6px;
  padding-right: 1px;
  box-shadow: 1px 5px 5px #dedede;
  padding: 10px 20px;
   
}
.list{
  margin-top: 55px;
}
div.table-list table.list {
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
}
.title {
  border-bottom: none;
  height: 50px;
  line-height: 50px;
}
td.normal {
  
  font-size: 14px;
  font-weight: 400;
  text-align: left;
}
.rightLine {
  border-right: 1px solid #dedede;
  text-align: right;
  padding: 18px;
}
.nonerightline{
  border:none !important;
}
.highlight .rightLine{
  color: #111314;
    font-size: 16px;
    font-weight: bolder;
}
</style>
