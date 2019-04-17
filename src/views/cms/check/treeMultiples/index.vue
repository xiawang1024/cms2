<template>
  <div class="tree-multiple">
    <div class="choosed-list">
      <div class="el-cascalder-define-choose" @click.stop="toggleMenu" v-clickoutside="hide">
        <div class="tag-container" ref="tags">
          <el-tag class="tag-list" size="small" closable v-for="(ele, index) in tagList" :key="index" @close="closeTag(index, ele)">{{ ele.channelName }}</el-tag>
        </div>
        <div class="input-define">
          <input class="input-define-inner" type="text" ref="reference" readonly="readonly" autocomplete="off" :class="{ 'is-focus': visible}">
          <span class="right-suffix" @click.stop="toggleMenu">
            <span class="right-suffix-inner">
              <i class="el-icon-arrow-down" :class="{ 'el-up': visible}"/>
            </span>
          </span>
        </div>
        <transition name="el-zoom-in-top">
          <div class="tree-data" v-show="visible">
            <column-tree ref="columnTree" :tree-data="treeData" @getChoosed="getChoosed" :tag-list="tagList"/>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import columnTree from './columnTree'
export default {
  name: 'TreeMultiple',
  components: {
    columnTree
  },
  // 自定义指令： 点击div外触发
  directives: { Clickoutside },
  props: {
    treeData: {
      default: ()=> {
        return []
      },
      type: Array
    },
    propTags: {
      default: ()=> {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
      visible: false,
      tagList: []
    }
  },
  watch: {
    tagList(val) {
      this.resetInputHeight()
    },
    propTags(val) {
      this.tagList = val.map((ele) => {
        return ele
      })
    }
  },
  methods: {
    closeTag(index, ele) {
      this.tagList.splice(index, 1)
      this.$refs.columnTree.$refs.tree.setCheckedNodes(this.tagList)
    },
    hide() {
      this.visible = false
    },
    toggleMenu() {
      this.visible = !this.visible
      if(this.visible) {
        (this.$refs.input || this.$refs.reference).focus();
      }
    },
    getChoosed(val) {
      this.tagList = val
    },
    resetInputHeight() {
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference
        let input = inputChildNodes
        const tags = this.$refs.tags;
        const sizeInMap = 32;
        input.style.height = this.tagList.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px';
      });
    },
  }
}
</script>
<style lang="scss">
  .tree-multiple{
    .el-cascalder-define-choose{
      .tree-data{
        width:100%;
        position: absolute;
        top:100%;
        left:0;
        border: 1px solid #dcdfe6;
        width:100%;
        z-index: 100;
        height: 300px;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        background-color: #fff;
        -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 5px 0;
        transition: transform .3s,-webkit-transform .3s;
      }
      width:100%;
      display: inline-block;
      position: relative;
      .tag-container{
        width:100%;
        position: absolute;
        line-height: normal;
        white-space: normal;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .tag-list{
          margin-left: 3px;
          margin-right: 3px;
        }
      }
      .input-define{
        position: relative;
        font-size: 14px;
        display: block;
        width: 100%;
        .input-define-inner{
          // height: 40px;
          padding-right: 30px;
          -webkit-appearance: none;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          line-height: 32px;
          outline: none;
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          width: 100%;
          // border-color: #409eff;
          cursor: pointer;
          &:focus{
            border-color: #409eff;
          }
        }
        .is-focus {
          border-color: #409eff;
        }
        .right-suffix{
          position: absolute;
          height: 100%;
          right: 5px;
          top: 0;
          text-align: center;
          color: #c0c4cc;
          transition: all .3s;
          pointer-events: none;
          z-index: 99;
          .right-suffix-inner{
            pointer-events: all;
            i {
              width: 25px;
              line-height: 32px;
              cursor: pointer;
              transform: rotateZ(0);
              transition: transform .3s,-webkit-transform .3s;
            }
            .el-up {
              font-size: 14px;
              transform: rotateZ(180deg);
              transition: transform .3s,-webkit-transform .3s;
            }
          }
        }
      }
    }
  }
</style>