<template>
  <div class="label-setting-container">
    <el-form :model="labelForm" >
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="a">
            <el-input v-model="labelForm.a" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="b">
            <el-input v-model="labelForm.b" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="c">
            <el-input v-model="labelForm.c" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="d">
            <el-input v-model="labelForm.d" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="e">
            <el-input v-model="labelForm.e" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="f">
            <el-input v-model="labelForm.f" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="g">
            <el-input v-model="labelForm.g" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="h">
            <el-input v-model="labelForm.h" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="i">
            <el-input v-model="labelForm.i" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="j">
            <el-input v-model="labelForm.j" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="k">
            <el-input v-model="labelForm.k" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="l">
            <el-input v-model="labelForm.l" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="m">
            <el-input v-model="labelForm.m" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="n">
            <el-input v-model="labelForm.n" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="o">
            <el-input v-model="labelForm.o" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="p">
            <el-input v-model="labelForm.p" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="q">
            <el-input v-model="labelForm.q" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="r">
            <el-input v-model="labelForm.r" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="s">
            <el-input v-model="labelForm.s" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="t">
            <el-input v-model="labelForm.t" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="u">
            <el-input v-model="labelForm.u" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="v">
            <el-input v-model="labelForm.v" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="w">
            <el-input v-model="labelForm.w" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="x">
            <el-input v-model="labelForm.x" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="y">
            <el-input v-model="labelForm.y" style="width:auto"/>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="z">
            <el-input v-model="labelForm.z" style="width:auto"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="warning">保存</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ColumnTemplet',
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      labelForm: {
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
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.label-setting-container {
  margin: 10px;
}
</style>
