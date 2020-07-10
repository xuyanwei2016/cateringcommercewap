import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import router from '../router';
import {getListAPI} from '@/api/list';

Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    token: Cookies.get('Y-Token')&&Cookies.get('Y-Token')!='null' ? Cookies.get('Y-Token') : '',
    userId: Cookies.get('userId')&&Cookies.get('userId')!='null' ? Cookies.get('userId') : '',
    list: [],
    total: 0,
    curLoading:0,
    studioData:''
  },
  getters: {},
  mutations: {
    getRouter() {
      console.log('store获取路由', router.app._route)
    },
    setToken(state, data) {
      state.token = data.token;
      state.userId = data.id;
      Cookies.set('Y-Token', data.token);
      Cookies.set('userId', data.id);
      router.push('/');
    },
    signOUT(state) {
      state.token = null;
      state.userId = null;
      Cookies.set('Y-Token', null);
      Cookies.set('userId', null);
      Cookies.set('phone', '');
      /*router.push('/');*/
    },
    getList(state, data) {
      if (!data.resList||data.resList.length == 0) {
        state.list = [];
      }
      let ary = data.resList ? data.resList : [];
      state.list = [...state.list, ...ary];
      state.total = data.totalCount;
      state.curLoading=data.curLoading;
    },

    /* 设置工作室数据 */
    setStudio(state,data){
      state.studioData = data
    }

  },
  actions: {
    getList({state, commit}, val) {
      if (val.pageNum == 1) {
        let data = {resList: [], totalCount: 0,curLoading:0};
        commit('getList', data);
      }
      getListAPI(val).then(res => {
        if (res.data.status) {
          if(res.data.data){
            res.data.data.pageNum = val.pageNum;
            res.data.data.curLoading = 2;
            commit('getList', res.data.data);
          }else{
            let data = res.data.data||{}
            data.pageNum = val.pageNum;
            data.curLoading = 2;
            commit('getList', data);
          }
          
        }

      })

    },

  },
});

export default store;
