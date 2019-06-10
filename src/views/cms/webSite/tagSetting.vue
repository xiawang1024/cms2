<template>
  <div class="column-mange-tag">
    <div class="tag-setting">
      <el-form :model="tagRule" >
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="a">
              <el-input v-model="tagRule.a" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="b">
              <el-input v-model="tagRule.b" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="c">
              <el-input v-model="tagRule.c" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="d">
              <el-input v-model="tagRule.d" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="f">
              <el-input v-model="tagRule.e" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="e">
              <el-input v-model="tagRule.f" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="g">
              <el-input v-model="tagRule.g" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="h">
              <el-input v-model="tagRule.h" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="i">
              <el-input v-model="tagRule.i" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="j">
              <el-input v-model="tagRule.j" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="k">
              <el-input v-model="tagRule.k" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="l">
              <el-input v-model="tagRule.l" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="m">
              <el-input v-model="tagRule.m" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="n">
              <el-input v-model="tagRule.n" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="o">
              <el-input v-model="tagRule.o" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="p">
              <el-input v-model="tagRule.p" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="q">
              <el-input v-model="tagRule.q" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="r">
              <el-input v-model="tagRule.r" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="s">
              <el-input v-model="tagRule.s" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="t">
              <el-input v-model="tagRule.t" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="u">
              <el-input v-model="tagRule.u" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="v">
              <el-input v-model="tagRule.v" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="w">
              <el-input v-model="tagRule.w" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="x">
              <el-input v-model="tagRule.x" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="y">
              <el-input v-model="tagRule.y" style="width:auto"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <el-form-item label="z">
              <el-input v-model="tagRule.z" style="width:auto"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-button type="primary" size="mini" class="submit-btn" @click="submit" :loading="isLoading">保存</el-button>
    </div>
  </div>
</template>

<script>
import { columnInfor, editColumn } from '@/api/cms/columnManage'
export default {
  name: 'ColumnTemplet',
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    columnRow: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      tagRule: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        o: '',
        p: '',
        q: '',
        r: '',
        s: '',
        t: '',
        u: '',
        v: '',
        w: '',
        x: '',
        y: '',
        z: ''
      },
      columnData: {},
      isLoading: false
    }
  },
  mounted() {
    this.routeQuery = this.$route.query
    this.getColumnInfor()
  },
  methods: {
    getColumnInfor() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(this.columnRow.channelId)
          .then((response) => {
            _this.columnData = response.data.result
            _this.tagRule = response.data.result.tagRule ? response.data.result.tagRule :  _this.tagRule
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    submit() {
      this.isLoading = true
      var _this = this
      return new Promise((resolve, reject) => {
        _this.columnData.channelId = this.columnRow.channelId
        _this.columnData.tagRule = _this.tagRule
        editColumn(_this.columnData)
          .then((response) => {
            _this.$message({ showClose: true, message: '操作成功!', type: 'success' })
            // _this.gotoListPage(_this)
            _this.isLoading = false
            resolve()
          })
          .catch((error) => {
            _this.isLoading = false
            reject(error)
          })
      })
    },
    // gotoListPage(context) {
    //   context.$store.dispatch('delView', this.$route).then(({ visitedViews }) => {
    //     if (context.isActive(context.$route)) {
    //       const latestView = visitedViews.slice(-1)[0]
    //       if (latestView) {
    //         context.$router.push(latestView)
    //       } else {
    //         context.$router.push('/')
    //       }
    //     }
    //   })
    //   context.$router.push({
    //     path: '/cms/website/column'
    //   })
    // }
  }
}
</script>

<style lang="scss" >
.column-mange-tag{
  .tag-setting {
    border-bottom: 1px solid #e8e8e8;
    .el-form {
      .el-form-item {
        .el-form-item__label {
          width:20px;
        }
        .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }
  .submit-btn {
    margin-left: 20px;
    margin-top:30px;
  }
}
</style>
