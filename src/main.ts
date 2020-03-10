import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// Directives
import "./directives/vue-the-mask";

import UserStore from "./store/user/user-store";

Vue.config.productionTip = false;

Vue.filter("currency", function(value: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

(async () => {
  await UserStore.init();
  console.log("Step 3");
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
})();
