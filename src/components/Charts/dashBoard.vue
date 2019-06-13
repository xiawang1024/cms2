<template>
  <div class="table-list">
    <div class="overview-card-title-container">
      <label class="overview-card-title">今日流量</label>
    </div>
    <table class="list">
      <tbody class="rightLine" >
        <tr class="title">
          <th/>
          <th>浏览量(PV)</th>
          <th>访客数(UV)</th>
          <th>IP数</th>
          <th>跳出率</th>
          <th>平均访问时长</th>
          <th>转化次数</th>
          <th class="empty-tr0"/>
        </tr>
        <tr class="highlight ">
          <td class="normal ">今日</td>
          <td class="rightLine" >39</td>
          <td class="rightLine" >24</td>
          <td class="rightLine" >22</td>
          <td class="rightLine" >81.82%</td>
          <td class="rightLine" >00:02:37</td>
          <td class="rightLine" >--</td>
          <td class="empty-tr0"/>
        </tr>
        <tr>
          <td class="normal">昨日</td>
          <td class="rightLine" >101</td>
          <td class="rightLine" >55</td>
          <td class="rightLine" >54</td>
          <td class="rightLine" >81.67%</td>
          <td class="rightLine" >00:02:45</td>
          <td class="rightLine" >--</td>
          <td class="empty-tr0"/>
        </tr>
        <tr>
          <td class="normal">预计今日</td>
          <td class="rightLine arrow-down">47</td>
          <td class="rightLine arrow-down">32</td>
          <td class="rightLine arrow-down">30</td>
          <td class="rightLine" >--</td>
          <td class="rightLine" >--</td>
          <td class="rightLine" >--</td>
          <td class="empty-tr0"/>
        </tr>
        <tr class="empty-tr1"/>
        <tr class="fade empty-tr2">
          <td colspan="9"/>
        </tr>
        <tr class="fade">
          <td class="normal ">昨日此时</td>
          <td class="rightLine" >83</td>
          <td class="rightLine" >41</td>
          <td class="rightLine" >39</td>
          <td class="rightLine" >80%</td>
          <td class="rightLine" >00:03:01</td>
          <td class="rightLine" >--</td>
          <td class="empty-tr0"/>
        </tr>
        <tr class="fade">
          <td class="normal">每日平均</td>
          <td class="rightLine" >58</td>
          <td class="rightLine" >37</td>
          <td class="rightLine" >35</td>
          <td class="rightLine" >82.83%</td>
          <td class="rightLine" >00:03:18</td>
          <td class="rightLine" >--</td>
          <td class="empty-tr0"/>
        </tr>
        <tr class="fade">
          <td class="normal">历史峰值</td>
          <td d="2019年06月07日" title="峰值日：2019/06/07" class="highlight-tip rightLine">418</td>
          <td d="2019年06月07日" title="峰值日：2019/06/07" class="highlight-tip rightLine">320</td>
          <td d="2019年06月07日" title="峰值日：2019/06/07" class="highlight-tip rightLine">311</td>
          <td d="2019年06月07日" title="峰值日：2019/06/07" class="highlight-tip rightLine">88.34%</td>
          <td d="2019年06月05日" title="峰值日：2019/06/05" class="highlight-tip rightLine">00:04:19</td>
          <td class>--</td>
          <td class="empty-tr0"/>
        </tr>
        <tr class="fade empty-tr3"><td colspan="9"/></tr>
      </tbody>
    </table>
    <div class="fold">
      <a href="javascript:void(0)" id="TogglePreviewTableBtn" targets=".fade" class="toggleable recordable trackable open"/>
    </div>
  </div>
</template>

<script>
  export default{
    // props:{ 
    //   data:data
    // },
    data(){
      return {
      
      }
    
    }
  }

</script>
<style scoped>
div.table-list {
  width:calc(100vw - 100px);
  margin: 0  auto;
  padding-top: 6px;
  padding-right: 1px;
  border: 1px solid #dedede;
  border-bottom: 0;
}
.overview-card-title-container {
  padding: 14px 15px 0;
}
.overview-card-title {
  font-size: 14px;
  color: #323437;
  font-weight: 700;
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
.empty-tr0 {
  width: 1px;
  padding: 6px 19px 6px 0;
  border-left: 0;
}
td.normal {
  
  font-size: 12px;
  font-weight: 400;
  text-align: left;
}
.arrow-down {
  background-repeat: no-repeat;
  background-position: 97% 17px;
  background-image: url(../../assets/png/arrow-up.png);
}
.empty-tr1 {
  height: 20px;
  border-bottom: 1px solid #f0f0f0;
}
.fade {
  height: 18px;
  line-height: 18px;
  background-color: #f9f9f9;
}
.empty-tr3  {
    padding-top: 1px;
    padding-bottom: 2px;
}
.fold .toggleable {
    width: 50px;
    height: 26px;
    margin-top: -1px;
}
.btw, div.fold {
    height: 30px;
    border-left: 1px solid #dedede;
    border-right: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    display: flex;
    align-items: center;
    justify-content: center;

}
.fold .open, .fold .toggleable {
    background-position: left -725px;
    background-image: url(../../assets/png/common-pic.png);
    /* background-image: url(decorator/common-4c8f732…-ie6.png); */
    background-repeat: no-repeat;
}
.fold a {
    display: inline-block;
    /* width: 72px; */
    /* height: 10px; */
}
.rightLine {
  border-right: 1px solid #dedede;
  text-align: right;
  padding: 18px;
}
.highlight .rightLine{
  color: #111314;
    font-size: 16px;
    font-weight: bolder;
}
</style>
