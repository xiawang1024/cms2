<template>
  <div class="navbar">

    <div class="logo-wrap">
      <!-- <img
        src="http://hndt.com/oa/imgs/logo.png"
        alt=""
        class="logo"
      > -->
      {{ siteName }}
    </div>
    <div class="sysType-wrap">
      <sys-type />
    </div>
    <div class="right-menu">

      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item" />

        <el-tooltip
          :content="$t('navbar.screenfull')"
          effect="dark"
          placement="bottom"
        >
          <screenfull class="screenfull right-menu-item" />
        </el-tooltip>

        <!-- <el-tooltip
          :content="$t('navbar.size')"
          effect="dark"
          placement="bottom"
        >
          <size-select class="international right-menu-item" />
        </el-tooltip>

        <lang-select class="international right-menu-item" />

        <el-tooltip
          :content="$t('navbar.theme')"
          effect="dark"
          placement="bottom"
        >
          <theme-picker class="theme-switch right-menu-item" />
        </el-tooltip> -->
      </template>

      <el-dropdown
        class="avatar-container right-menu-item"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            :src="avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">

          <!-- <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.center') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.operateRecord') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.myOrder') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.help') }}
            </el-dropdown-item>
          </router-link> -->
          <el-dropdown-item divided>
            <span
              style="display:block;"
              @click="logout"
            >{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ErrorLog from '@/components/public/ErrorLog'
import Screenfull from '@/components/public/Screenfull'
import SizeSelect from '@/components/public/SizeSelect'
import LangSelect from '@/components/public/LangSelect'
import ThemePicker from '@/components/public/ThemePicker'
import SysType from './sysType.vue'
import { fetchDictByDictName} from "@/api/cms/dict"

export default {
  components: {
    SysType,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'device', 'siteName'])
  },
  mounted() {
    console.log('login')
    this.fetchDict()
  },
  methods: {
    // 查询站点名称
    fetchDict() {
      return new Promise((resolve, reject) => {
        fetchDictByDictName('站点设置')
          .then(response => {
            let siteName = response.data.result ? response.data.result.details[0].dictDetailValue + '内容发布子系统' : '内容发布子系统'
            this.$store.dispatch('SetSiteName', siteName)
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  border-radius: 0px !important;
  background: #0081dc;
  box-sizing: border-box;
  .logo-wrap {
    flex: 0 0 200px;
    width: 200px;
    padding-left: 10px;
    color: #fff;
    font-size: 15px;
    .logo {
      vertical-align: middle;
    }
  }
  .sysType-wrap {
    flex: 1;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .viewtype {
      margin-right: 40px;
      display: inline-block;
      vertical-align: top;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
