
const newCommand = {
  state: {
    discloseClassifys: []
  },
  mutations: {
    GET_DISCLOSE_CLASSIFY: (state, discloseClassifys) => {
			state.discloseClassifys = discloseClassifys
		}
  },
  actions: {
    discloseClassifys({ commit }, discloseClassifys) {
      commit('GET_DISCLOSE_CLASSIFY', discloseClassifys)
    }
  }
}

export default newCommand
