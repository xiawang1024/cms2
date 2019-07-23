<template>
  <div class="viewBox">
    <el-popover placement="right-end" title="标题" trigger="manual" v-model="showTips">
      <div class="abilityBox">
        <li @click="$emit('mycopy')">复制</li>
        <li @click="$emit('mypaste')">粘贴</li>
        <li @click="$emit('mycute')">剪切</li>
        <li @click="$emit('mydelete')">删除</li>
        <li @click="$emit('myatribute')">属性</li>
      </div>
      <el-button
        type="text"
        :icon="icon"
        size="mini "
        class="folderSize"
        @click.left="$emit('handleLeft')"
        @dblclick.native="$emit('handleDouble')"
        @click.right.native="$emit('handleRight')"
        v-aleretAbility
        slot="reference"
      >
        <el-tooltip class="item" effect="dark" :content="fileName" placement="bottom-end">
          <p class="folderName">{{ fileName }}</p>
        </el-tooltip>
       

      </el-button>
    </el-popover>
  </div>
</template> 
<script>
export default {
  directives: {
    aleretAbility: {
      inserted(el) {
        //阻止右键点击默认事件
        window.oncontextmenu = function() {
          return false;
        };
      }
    }
  },
  props: {
    fileName: {
      type: String,
      default: "我的文件"
    },
    showTips: {
      type:Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "el-icon-folder"
    }
  },
  data() {
    return {};
  },
  watch: {
    showTips(oldValue, newValue) {}
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
$width:100px;
.viewBox{
  width:$width;
  
}

.folderSize {
  /deep/i {
    font-size: 35px;
  }

  .folderName {
    width: $width;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.abilityBox {
  text-align: center;
  list-style: none;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  li {
    cursor: pointer;
    width: 150px;
    line-height: 25px;
    letter-spacing: 5px;
    list-style: none;
  }
  li:hover {
    background-color: #eee;
    color: #409eff;
  }
}

</style>
