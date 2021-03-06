const webSite = {
  state: {
    viewType: '0',
    viewTypeShow: false,
    tags: [],
    imageUid: '',
    contextMenu: {
      id: '0'
    },
    docInformation: {
      baseInfor: '',
      attachmentsList: [],
      relationList: '',
      coverImagesList: []
    },
    recycleChannelId: ''
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
    SET_IMAGE_UID: (state, uid) => {
      state.imageUid = uid
    },
    SET_CONTEXT_MENU: (state, menu) => {
      state.contextMenu = menu
    },
    SET_BASE_INFOR: (state, baseInfor) => {
      state.docInformation.baseInfor = baseInfor
    },
    SET_ATTACHMENTS_LIST: (state, attachmentsList) => {
      state.docInformation.attachmentsList = attachmentsList
    },
    SET_COVER_LIST: (state, coverImagesList) => {
      state.docInformation.coverImagesList = coverImagesList
    },
    SET_RELATION_LIST: (state, relationList) => {
      state.docInformation.relationList = relationList
    },
    SET_RECYCLE_CHANNELID: (state, recyleChannelId) => {
      state.recycleChannelId = recyleChannelId
    },
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
      console.log('setContet')
      commit('SET_CONTEXT_MENU', menu)
    },
    setBaseInfor: ({ commit }, baseInfor) => {
      commit('SET_BASE_INFOR', baseInfor)
    },
    setAttachmentsList: ({ commit }, attachmentsList) => {
      commit('SET_ATTACHMENTS_LIST', attachmentsList)
    },
    setCoverList: ({ commit }, coverImagesList) => {
      commit('SET_COVER_LIST', coverImagesList)
    },
    setRelationList: ({ commit }, relationList) => {
      commit('SET_RELATION_LIST', relationList)
    },
    setImageUid({ commit }, uid) {
      commit('SET_IMAGE_UID', uid)
    },
    setRecycleChannelId: ({ commit }, recycleChannelId) => {
      commit('SET_RECYCLE_CHANNELID', recycleChannelId)
    }
  }
}

export default webSite
