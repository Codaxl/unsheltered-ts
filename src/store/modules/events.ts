import firebase from "@/firebase";
import router from "@/router";

const state = {
  user: null,
  isAuthenticated: false,
  isLoading: false
};
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
  setIsLoading(state, payload) {
    state.isLoading = payload;
  }
};
const actions = {
  userLogins({ commit }, { email, password }) {
    commit("setIsLoading", true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        commit("setUser", user);
        commit("setIsAuthenticated", true);
        router.push("/Dashboard");
      })
      .catch(() => {
        commit("setUser", null);
        commit("setIsAuthenticated", false);
        router.push("/");
      });
  },
  userJoins({ commit }, { email, password }) {
    commit("setIsLoading", true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        commit("setUser", user);
        commit("setIsAuthenticated", true);
        router.push("/Dashboard");
      })
      .catch(() => {
        commit("setUser", null);
        commit("setIsAuthenticated", false);
        router.push("/");
      });
  },
  userSignOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
        commit("setIsAuthenticated", false);
        router.push("/");
      })
      .catch(() => {
        commit("setUser", null);
        commit("setIsAuthenticated", false);
        router.push("/");
      });
  },
  userOnAuthStateChanged({ commit }, user) {
    commit("setIsAuthenticated", user !== null);
    if (user) {
      commit("setUser", user);
    } else {
      commit("setUser", null);
    }
  }
};

const getters = {
  isAuthenticated(state) {
    return state.user !== null && state.user !== undefined;
  },
  isLoading(state) {
    return state.isLoading;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
