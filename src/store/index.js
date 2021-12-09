/* eslint-disable no-undef */
import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = () => ({
  auth: null,
  user: null
});

const getters = {
  userImage: (state, getters) => {
    return getters.isLoggedIn
      ? state.user.getBasicProfile().getImageUrl()
      : null;
  },
  userName: (state, getters) => {
    return getters.isLoggedIn
      ? state.user.getBasicProfile().getName()
      : null;
  },
  userEmail: (state, getters) => {
    return getters.isLoggedIn
      ? state.user.getBasicProfile().getEmail()
      : null;
  }
};

const actions = {
  signin() {
    return state.auth.signIn({ scope: 'profile email' })
      .then((user) => {
        commit('setUser', user);
      });
  },
  async initializeGAPI() {
    await new Promise(resolve => {
      gapi.load('auth2', () => {
        resolve();
      });
    });
    return gapi.auth2
      .init({
        client_id: process.env.VUE_APP_GAPI_CLIENTID
      })
      .then((auth) => {
        commit('setAuth', auth);
        commit('setUser', auth.currentUser);
      });
  }
};

const mutations = {
  setAuth(state, value) {
    state.auth = value;
  },
  setUser(state, value) {
    state.user = value;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()],
});