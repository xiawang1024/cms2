
const newCommand = {
  state: {
    discloseClassify: []
  },
  mutations: {
    GET_DISCLOSE_CLASSIFY: (state, discloseClassify) => {
			state.discloseClassify = discloseClassify
		}
  },
  actions: {
    discloseClassify({ commit }, log) {
      commit('GET_DISCLOSE_CLASSIFY', log)
    }
  }
}

export default newCommand
