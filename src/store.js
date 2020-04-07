import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID:'',
    password:'',
  },
  //取数据
  getters:{
    getTodo (state) {
      return state.userID;
    }
  },
  //同步操作数据
  mutations: {

  },
  //异步操作数据
  actions: {

  }
})
