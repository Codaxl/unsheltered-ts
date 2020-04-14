import Vue from "vue";
import Vuetify from "vuetify/lib";

import SmithIcon from "@/icons/SmithIcon.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      smith: {
        // name of our custom icon
        component: SmithIcon // our custom component
      }
    }
  }
});
