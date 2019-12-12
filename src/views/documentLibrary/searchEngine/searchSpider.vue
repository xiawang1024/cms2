<template>
  <div class="spiderPlat" >
    <el-row type="flex" justify="center">
      <el-col :span="14">
        <el-row type="flex" justify="center">
          <el-button-group>
            <template v-for="item in topSourceList">
              <el-button
                :type="item.source==platform?'primary':''"
                @click.stop="handleadd(item,1)"
                :key="item.id"
                size="small"
                class="btngroup"
              >{{ item.source }}</el-button>
            </template>
          </el-button-group>
        </el-row>
        <el-row v-if="sourceList.length>0">
          <el-menu>
            <el-submenu index="1" class="spider-hiden-bar">
              <template slot="title">
                <div class="moretext">更多</div>
              </template>
              <el-row>
                <el-button-group>
                  <template v-for="item in sourceList">
                    <el-button
                      :type="item.source==platform?'primary':''"
                      @click="handleadd(item,1)"
                      :key="item.id"
                      size="small"
                      class="btngroup"
                    >{{ item.source }}</el-button>
                  </template>
                </el-button-group>
              </el-row>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="inputSearch" type="flex" justify="center" @keyup.enter.native="handleSearch">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="keyword" size="small" ref="keyinput" >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"
            size="small"
            class="searchColor"
          >搜索</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" >
      <el-col :span="14">
        <el-row type="flex" >
          <template v-for="(item,index) in keywordsList">
            <el-tag
              size="samll"
              closable
              @click="handleadd(item,2)"
              @close="handleClose(item,index)"
              class="tagplat"
              :type="item.keyWord==keyword?'':'info'"
              :key="item.id"
            >{{ item.keyWord }}</el-tag>
          </template>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  topSourceList,
  searchList,
  sourceList,
  searchKeyWord,
  deleteKeyWord
} from "@/api/library/spider";

export default {
  data() {
    return {
      keyword: "",
      platform: "",
      sourceList: [],
      keywordsList: [],
      baseInfo: "",
      topSourceList: ""
    };
  },
  created() {
    this.baseInfo = JSON.parse(localStorage.getItem("BaseInfor"));
    this.getTopSourceList();
    this.getSourceList();
    this.getKeywords();
  },
  methods: {
    getTopSourceList() {
      return new Promise((resolve, reject) => {
        topSourceList()
          .then(res => {
            if (res.data.code == 0) {
              this.topSourceList = res.data.result;
            } else {
              this.$message.error(res.data.msg);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getSourceList() {
      return new Promise((resolve, reject) => {
        sourceList()
          .then(res => {
            if (res.data.code == 0) {
              this.sourceList = res.data.result;
            } else {
              this.$message.error(res.data.msg);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getKeywords() {
      return new Promise((resolve, reject) => {
        searchKeyWord(this.baseInfo.userId)
          .then(res => {
            if (res.data.code == 0) {
              this.keywordsList = res.data.result;
            } else {
              this.$message.error(res.data.msg);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    handleSearch() {
      if (this.keyword) {
        let data = {
          keyword: this.keyword,
          pageNo: 1,
          pageSize: 10,
          platform: this.platform
        };
        this.$store.dispatch("libraryArticle", data);
        this.$router.push({
          path: "searchList",
          query: {
            keyWord: this.keyword,
            platform: this.platform
          }
        });
      } else {
        this.$message.error("请输入搜索内容");
      }
    },
    handleadd(val, type) {
      if (type == 1) {
        if (this.platform == val.source) {
          this.platform = "";
        } else {
          this.platform = val.source;
        }
      }
      if (type == 2) {
        //关键词
        this.keyword = val.keyWord;
        this.$refs.keyinput.focus();
      }
    },
    handleClose(val, index) {
      return new Promise((resolve, reject) => {
        deleteKeyWord(val.id)
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.keywordsList.splice(index, 1);
            } else {
              this.$message.error(res.data.msg);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.moretext {
  text-align: right;
  margin-right: 15px;
}
.qweqwer {
  color: red;
}
.inputSearch {
  margin: 30px 0;
}
.tagplat {
  margin: 10px 0 0 10px;
  cursor: pointer;
}
.btngroup {
  margin-top: 10px;
}
.searchColor {
}
</style>