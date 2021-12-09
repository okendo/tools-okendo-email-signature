import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null,
    user: null
  },
  getters: {
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
  },
  actions: {
    signin({ commit, state }) {
      return state.auth.signIn({ scope: 'profile email' })
        .then((user) => {
          commit('setUser', user);
        });
    },
    async initializeGAPI({ commit }) {
      await new Promise(resolve => {
        // eslint-disable-next-line no-undef
        gapi.load('auth2', () => {
          resolve();
        });
      });
      // eslint-disable-next-line no-undef
      return gapi.auth2
        .init({
          client_id: process.env.VUE_APP_GAPI_CLIENTID
        })
        .then((auth) => {
          commit('setAuth', auth);
          commit('setUser', auth.currentUser);
        });
    }
  },
  mutations: {
    setAuth(state, value) {
      state.auth = value;
    },
    setUser(state, value) {
      state.user = value;
    }
  },
  plugins: [createPersistedState()],
});