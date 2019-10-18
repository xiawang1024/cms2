<template>
  <div>
    <el-row class="topPlat">
      <el-col :span="13">
        <!-- 裁剪列表 -->
        <div class="leftPart">
          <table style="width:100%">
            <thead/>
            <tbody class="tablemain">
              <tr class="tableHead">
                <td>&#x3000;#</td>
                <td>开始</td>
                <td>结束</td>
                <td>时长</td>
                <td>字幕</td>
                <td>logo</td>
                <td>操作&#x3000;</td>
              </tr>
              <div class="scrollPart">
                <tr
                  v-for="(item,index) in tableValue"
                  :key="index"
                  :class="index==hanleRow?'active':''"
                >
                  <td>&#x3000;{{ index+1 }}</td>
                  <td>
                    <input :value="item.beginTime" :disabled="index!=hanleRow" >
                  </td>
                  <td>
                    <input :value="item.endTime" :disabled="index!=hanleRow" >
                  </td>
                  <td>
                    <input :value="item.duration" :disabled="index!=hanleRow" >
                  </td>
                  <td>
                    <input :value="item.subtitles" :disabled="index!=hanleRow" >
                  </td>
                  <td>
                    <input :value="item.logo" :disabled="index!=hanleRow" >
                  </td>
                  <td class="dealicon">
                    <i class="el-icon-edit" @click="handleEdite(index)"/>
                    <i class="el-icon-check" @click="handleSave(index)"/>
                    <i class="el-icon-delete" @click="handleDelete(index)"/>
                  </td>
                </tr>
              </div>
              
            </tbody>
          </table>
        </div>
        <span>{{ data }}</span>
      </el-col>
      <el-col :span="11" class="rightPart">

        <video :src="data.videoUrl" controls style="width:100%"/>
        <div class="controlboard">
          <div @click="handleAdd">
            <div class="controlcell">
              <i class="el-icon-document-add"/>
              添加字幕
            </div>
            <div class="controlcell">
              <i class="el-icon-minus"/>
              时间偏移 -100毫秒
            </div>
            <div class="controlcell">
              <i class="el-icon-plus"/>
              时间偏移 +100毫秒
            </div>
          </div>
          <div>
            <div class="controlcell">
              <i class="el-icon-document-add"/>
              删除全部
            </div>
            <div class="controlcell">
              <i class="el-icon-delete"/>
              删除空的
            </div>
          </div>
            

        </div>
      </el-col>
    </el-row>
    <el-row class="bottomPlat">
      <div/>
    </el-row>
  </div>
</template>   
<script>
export default {
  data() {
    return {
      hanleRow: -1, //全禁用状态
      data: "",
      tableValue: [
        {
          beginTime: "00:00:00",
          endTime: "01:00:00",
          duration: "562",
          subtitles: "此处是字幕",
          logo: "123"
        },
        {
          beginTime: "00:00:00",
          endTime: "01:00:00",
          duration: "562",
          subtitles: "此处是字幕",
          logo: "123"
        },
        {
          beginTime: "00:00:00",
          endTime: "01:00:00",
          duration: "562",
          subtitles: "此处是字幕",
          logo: "123"
        }
      ]
    };
  },
  created() {
    this.data = JSON.parse(this.$route.query.data);
  },
  mounted() {},
  methods: {
    handleEdite(index) {
      this.hanleRow = index;
    },
    handleSave(index) {
      this.hanleRow = -1;
    },
    handleAdd(){
        this.tableValue.push({
             beginTime: "00:00:00",
          endTime: "01:00:00",
          duration: "562",
          subtitles: "此处是字幕",
          logo: "123"
        })
    }
  }
};
</script> 
<style lang="scss" scoped>
$baseColor: #1c2022;
$heightColor: #2e363c;
$forColor: #cccccc;
.topPlat {
  background-color: $baseColor;
  border: 1px solid red;
  height: 600px;
  .scrollPart{
      overflow: auto;
      height: 560px;
      padding-bottom: 10px ;
  }
  .rightPart {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
    // height: 600px;
    // overflow: hidden;
    padding: 10px;
    video{
        margin-top: 40px;
    }
  }
  font-size: 14px;
}
.bottomPlat {
  background-color: $baseColor;
  border: 1px solid #00f;
  height: 150px;
  font-size: 14px;
}

// table
.tableHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $forColor;
  background-color: $heightColor;
  height: 40px !important;
  width: 100%;
  text-align: center;
  
}
.tablemain tr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $forColor;
  background-color: $heightColor;
  height: 60px;
  width: 100%;
  td input {
    width: 90px;
    background-color: transparent;
    border: none;
    height: 30px;
    outline: none;
    text-align: center;
    color: $forColor;
  }
}
.tablemain div tr:nth-child(2n ) {
  background-color: $heightColor;
}
.tablemain div tr:nth-child(2n+1) {
  background-color: $baseColor;
}
.tablemain tr i {
  cursor: pointer;
}
.dealicon {
  padding: 0 10px;
}
.tablemain .active {
  background-color: #2196f3 !important;

  td input {
    color: white;
    background-color: $baseColor;
  }
}

// 控制板
.controlboard{
    margin-top: 10px;
    color: $forColor;
    .controlcell{
        cursor: pointer;
        display: inline-block;
        margin: 5px;
        padding: 5px;
        background-color: $heightColor;;
        &:hover{
            background-color: #3a4147;
        }
    }
}
</style>