import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID: process.env.VUE_APP_USER_ID || null,
    sessionKey: process.env.VUE_APP_SESSION_ID || null,
    lat: process.env.VUE_APP_LAT || null,
    long: process.env.VUE_APP_LON || null,
  },
  mutations: {
    storeSessionKeyAndUserID(state, { userID, sessionKey }) {
      state.userID = userID;
      state.sessionKey = sessionKey;
    },
    storeLatAndLong(state, { lat, long }) {
      state.lat = lat;
      state.long = long;
    },
  },
  actions: {},
  modules: {},
});
