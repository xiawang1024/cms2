import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import newCommand from './modules/newCommand'
import live from './modules/live'
import cms from './modules/cms'
import library from './modules/library'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    cms,
    newCommand,
    live,
    library

  },
  getters
})

export default store
