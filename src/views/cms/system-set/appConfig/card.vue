<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '10px' }">
          <img style="padding: 14px 0;" :src="imgurl" class="image" >
          <div >
            <span>{{ description }}</span>
          </div>
          <img style="padding: 14px 0;" :src="imgurl2" class="image" v-if="imgurl2" >
          <div >
            <span>{{ description2 }}</span>
            <div class="bottom clearfix">
              <time class="time">版本{{ version }}</time>
              <el-button type="text" class="button" @click="$emit('handleEdite',picType)">编辑</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    imgurl: {
      type: String,
      default: ""
    },
     imgurl2: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
     description2: {
      type: String,
      default: ""
    },
    picType: {
      type: Number,
      default: ""
    },
    version:{
        type:String,
        default:''
    }
  },
  data() {
    return {};
  },
  methods: {
    handleEdite() {}
  }
};
</script>
<style lang="scss" scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>