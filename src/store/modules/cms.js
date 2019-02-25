const webSite = {
  state: {
    viewType: '0',
    viewTypeShow: false,
    tags: [],
    contextMenu: {
      id: '0'
    }
  },
  mutations: {
    SET_VIEW_TYPE: (state, type) => {
      state.viewType = type
    },
    SET_VIEW_TYPE_SHOW: (state, type) => {
      state.viewTypeShow = type
    },
    SET_TREE_TAGS: (state, tags) => {
      state.tags = tags
    },
    SET_CONTEXT_MENU: (state, menu) => {
      state.contextMenu = menu
    }
  },
  actions: {
    setViewType({ commit }, type) {
      commit('SET_VIEW_TYPE', type)
    },
    setViewTypeShow({ commit }, type) {
      commit('SET_VIEW_TYPE_SHOW', type)
    },
    setTreeTags({ commit }, tags) {
      commit('SET_TREE_TAGS', tags)
    },
    setContextMenu: ({ commit }, menu) => {
      commit('SET_CONTEXT_MENU', menu)
    }
  }
}

export default webSite
