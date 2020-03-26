<template>
  <v-data-table
    :headers="headers"
    :items="funds"
    item-key="name"
    class="elevation-1"
  ></v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
// Vuex
import { getModule } from "vuex-module-decorators";
import FundStore from "@/store/funds/funds-store";
const fundStoreState = getModule(FundStore);

export default Vue.extend({
  data: () => ({
    headers: [
      {
        text: "Grant",
        align: "start",
        sortable: false,
        value: "grant"
      },
      { text: "Funding Source", value: "fundingSource" },
      { text: "Amount", value: "amount" }
    ]
  }),
  computed: {
    // a computed getter
    funds: function() {
      // `this` points to the vm instance
      return fundStoreState.data;
    }
  }
});
</script>

<style></style>
