import {enableClassifyList} from '@/api/newsCommand/classifyManage'
const newCommand = {
  state: {
    // discloseClassifys: [],
    clssifyList:[],
  },
  mutations: {
    // GET_DISCLOSE_CLASSIFY: (state, discloseClassifys) => {
		// 	state.discloseClassifys = discloseClassifys
    // },
    GET_CLASSIFY_LIST: (state, clssifyList) => {
      state.clssifyList = clssifyList
      console.log(state.clssifyList,'store')
		}
  },
  actions: {
    // discloseClassifys({ commit }, discloseClassifys) {
    //   commit('GET_DISCLOSE_CLASSIFY', discloseClassifys)
    // },
    getClassifyList({ commit }) {
      return new Promise((resolve,reject)=>{
        enableClassifyList()
        .then(res=>{
          if(res.data.code==0){
        commit('GET_CLASSIFY_LIST', res.data.result)
          }
          resolve();
        })
        .catch(err=>{
          reject(err)
        })
      })
    }
  }
}

export default newCommand
