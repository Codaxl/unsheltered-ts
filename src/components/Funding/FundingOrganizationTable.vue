<template>
  <v-data-table
    :headers="headers"
    :items="plus"
    item-key="name"
    class="elevation-1"
    :items-per-page="5"
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
        text: "Organization",
        align: "start",
        sortable: false,
        value: "organization"
      },
      { text: "Amount", value: "amount" },
      { text: "Percentage", value: "amount" }
    ]
  }),
  created: function() {
    const organizations = this.getUniqueListBy(
      fundStoreState.data,
      "organization"
    ); // => 'foo'
  },
  computed: {
    // a computed getter
    funds: function() {
      // `this` points to the vm instance
      return fundStoreState.data;
    }
  },
  methods: {
    getUniqueListBy: function getUniqueListBy(arr: any, key: any) {
      return [...new Map(arr.map((item: any) => [item[key], item])).values()];
    }
  }
});
</script>

<style></style>
