import { createStore } from 'vuex';
import { rootdatabase } from '../main';

export default createStore({
  state() {
    return {
      users: {}
    }
  },
  getters: {
    getUserByID: (state) => (id) => {
      return state.users[id];
    }
  },
  actions: {
    fetchAllData({ commit }) {
      rootdatabase.ref('users').on('value', snapshot => {
        const users = snapshot.val();
        commit('SET_USERS', users);
      })
    }
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    }
  }
});
