
const live = {
    state: {
      dislive: []
    },
    mutations: {
      GET_DIS_LIVE: (state, dislive) => {
              state.discloseClassifys = dislive
          }
    },
    actions: {
      discloseClassifys({ commit }, dislive) {
        commit('GET_DIS_LIVE', dislive)
      }
    }
  }
  
  export default live