<template>
  <div>
    <el-row>
      <el-button type="text" @click="handleBack" icon="el-icon-arrow-left">返回</el-button>
    </el-row>
    <el-row>
      <el-col>
        <el-button @click="handleAdd" icon="el-icon-plus" size="small">{{ keyword }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="selectLibraryArticleList.content" row-key="id">
        <el-table-column type="index" width="50" />
        <el-table-column prop="platform" width="180" label="平台" />
        <el-table-column prop="type" width="180" label="类型" />
        <el-table-column prop="title" label="标题" show-overflow-tooltip />
        <el-table-column label="操作" width="230">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleReview(scope.$index, scope.row)">预览</el-button>
            <el-button size="mini" type="primary" @click="handleSave(scope.$index, scope.row)">复制</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagenation"
        :current-page="pageNo"
        :page-sizes="[10,30,60,100]"
        :page-size="pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        style="float: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
    <el-dialog :visible.sync="sourceVisible" title="选择栏目">
      <v-form
        ref="articleform"
        :form-settings="formSettings"
        :form-data="formData"
        :btn-loading="isUploading"
        @save="submitSave"
        label-width="80px"
      />
    </el-dialog>
    <review-dialog :dialog-visible.sync="dialogVisible" :document-infor="articlePreview" />
  </div>
</template>

<script>
import { createDocument } from "@/api/cms/article";
import {
  searchList,
  addKeyWord,
  selectArticleById
} from "@/api/library/spider";
import reviewDialog from "./viewComponent.vue";
import dayjs from "dayjs";
import store from "store";
import { mapGetters } from "vuex";
export default {
  components: { reviewDialog },
  data() {
    return {
      tableValue: [{ title: "今日头条" }],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      sourceVisible: false,
      documentInfor: {},
      baseInfo: "",
      keyword: "",
      platform: "",
      articleDetail: {},
      articlePreview: {},
      formData: {},
      isUploading: false,
      formSettings: [
        {
          label: "",
          items: [
            {
              label: "栏目名称",
              name: "columnId",
              type: "cascader",
              visible: "true",
              value: [],
              changeOnSelect: true,
              options: [],
              required: true
            }
          ]
        }
      ]
    };
  },

  computed: {
    ...mapGetters(["selectLibraryArticleList", "columnAll"])
  },
  watch: {
    selectLibraryArticleList() {
      this.total = this.selectLibraryArticleList.total;
    },
    columnAll(val) {
      this.formSettings[0].items[0].options = val;
    }
  },
  created() {
    this.baseInfo = JSON.parse(localStorage.getItem("BaseInfor"));
    this.keyword = this.$route.query.keyWord;
    this.platform = this.$route.query.platform;
  },
  mounted() {
    this.formSettings[0].items[0].options = this.columnAll.length
      ? this.columnAll
      : store.get("columnsAll");
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    initTable() {
      //vuex 读取数据；
      let data = {
        keyword: this.keyword,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        platform: this.platform
      };
      this.$store.dispatch("libraryArticle", data);
    },
    handleAdd() {
      if (this.keyword) {
        return new Promise((resolve, reject) => {
          addKeyWord(this.baseInfo.userId, this.baseInfo.userName, this.keyword)
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        });
      } else {
        this.$message.error("不能为空");
      }
    },
    ArticleDetail(view, type) {
      return new Promise((resolve, reject) => {
        selectArticleById(view)
          .then(res => {
            if (res.data.code == 0) {
              this.articleDetail = res.data.result;
              if (res.data.result) {
                this.articlePreview = this.dataformate(res.data.result);
                if (type) {
                  this.dialogVisible = true;
                }
              } else {
                this.articlePreview = {};
              }
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
    handleReview(index, row) {
      this.ArticleDetail(row.id, 1);
    },
    // 数据格式化
    dataformate(val) {
      let data = {
        articleAttachmentsList: [],
        articleAuthor: "",
        articleOrigin: val.platform,
        articleShowStyle: "",
        articleStatus: "0",
        articleTitle: val.title,
        articleType: 0,
        channelId: "",
        clickNum: 0,
        contentBody: val.content,
        contentTitle: "123",
        coverImagesList: [],
        extFieldsList: [{ label: "1", fieldValue: "" }],
        hiddenFlag: "0",
        publishTime: val.publishTime, //暂定原稿发版时间
        seoDescription: "",
        seoKeywords: "",
        seqNo: 0,
        tagIdsList: [],
        topFlag: "0"
      };
      return data;
    },
    handleSave(index, row) {
      this.ArticleDetail(row.id);
      this.sourceVisible = true;

      /*
        **  
            articleAttachmentsList: [] 文档附件
            articleAuthor: "" 文档作者
            articleOrigin: "河南人民广播网" 文档来源  默认大象新闻
            articleShowStyle: "" 文章展示类型(左图/右图)
            articleStatus: "0" 新稿，11已发布 文档状态
            articleTitle: "" 文章标题
            articleType: 0 文档类型
            channelId: "1199523171632549888"  栏目编号
            clickNum: 0 点击次数
            contentBody: "<p>123</p>" 内容
            contentTitle: "123" 正文标题
            coverImagesList: []  封面图片
            extFieldsList: [{label: "1", fieldValue: ""}] 其他属性扩展字段
            hiddenFlag: "0" 0普通, 1忽略发布
            publishTime: "2019-12-04 15:31:30" 发布日期
            seoDescription: "" seo描述
            seoKeywords: "" seo关键字
            seqNo: 0 排序序号
            tagIdsList: [] 标签集合
            topFlag: "0" 0普通, 1置顶
        **
        */
      //保存文章接口
      // let data={
      //   author: null,
      //   cmsArticleId: null,
      //   commentCount: null,
      //   content: "  　　位于江西省泰和县水槎乡浪川村的泰和浪川风电场项目首台风机基座近日正在进行浇筑施工，标志着这一项目主体工程正式开工。泰和浪川风电场项目总装机容量为140兆瓦，其中一期装机容量为80兆瓦，将于2020年建成投产。项目投入运营后，对改善当地的生态环境质量、助力经济社会高质量发展具有重大意义。 人民图片网供图  ",
      //   createTime: "2019-12-09T08:41:01.977+0000",
      //   id: "1203957713369825280",
      //   keyword: null,
      //   platform: "中工网",
      //   publishTime: "2019-11-11 10:08:27",
      //   retweetedTimes: null,
      //   separateTitle: "图片新闻,图片,新闻",
      //   title: "图片新闻",
      //   type: "科技能源",
      //   url: null,
      //   zanTimes: null
      // }
    },
    submitSave(val) {
      let arr=val.columnId.slice();
      let id=arr.reverse()[0];
      this.isUploading = true;
      this.saveRequest(id);
    },
    saveRequest(channelId) {
     
      let data = {
        articleAttachmentsList: [],
        articleAuthor: "",
        articleOrigin: '大象新闻', //默认大象新闻
        articleShowStyle: "",
        articleStatus: "0",
        articleTitle: this.articleDetail.title,
        articleType: 0,
        channelId,
        clickNum: 0,
        contentBody: this.articleDetail.content,
        contentTitle:this.articleDetail.title,
        coverImagesList: [],
        extFieldsList: [{ label: "1", fieldValue: "" }],
        hiddenFlag: "0",
        publishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'), //暂定原稿发版时间
        seoDescription: "",
        seoKeywords: "",
        seqNo: 0,
        tagIdsList: [],
        topFlag: "0"
      };
      return new Promise((resolve, reject) => {
        createDocument(data)
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success('保存成功');
            }
            this.isUploading = false;
            this.sourceVisible=false;
          })
          .catch(err => {
            this.$message.error(res.data.msg);
          });
      });
    },
    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.initTable();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.initTable();
    }
  }
};
</script>

<style lang='scss' scoped>
.pagenation {
  margin: 30px 0;
}
</style>