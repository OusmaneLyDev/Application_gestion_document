import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
// import documentModule from './useDocumentStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    document: documentModule,
  },
});

