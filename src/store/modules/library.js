import {selectArticleByPage }from '@/api/library/spider';

const library = {
    state: {
      selectLibraryArticleList:[],

    },
    mutations: {
      LIBRARY_ARTICLE(state,view){
        state.selectLibraryArticleList=view;
      },
     
    },
    actions: {
      libraryArticle({ commit }, view) {
        return new Promise((resolve,reject)=>{
          selectArticleByPage(view)
          .then(res=>{
            if(res.data.code==0){
              commit('LIBRARY_ARTICLE', res.data.result)
            }else{
              this.$message.error(res.data.msg)
            }
            resolve();
          })
          .catch(err=>{
            reject(err)
          })
        })
      },
     
     

    }
  }
  
  export default library