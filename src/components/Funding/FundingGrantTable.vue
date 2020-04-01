<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="grants"
      item-key="name"
      class="elevation-1"
      :items-per-page="5"
    >
      <template v-slot:item.amount="{ item }">
        <span>{{ item.amount | currency }}</span>
      </template>
    </v-data-table>
  </div>
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
        text: "Grantor",
        align: "start",
        sortable: false,
        value: "grantor"
      },
      { text: "Amount", value: "amount" }
    ]
  }),
  //https://stackoverflow.com/questions/40262445/merge-object-sum-a-single-property-javascript
  computed: {
    // a computed getter
    funds: function() {
      // `this` points to the vm instance
      return fundStoreState.data;
    },
    grants: function() {
      // `this` points to the vm instance
      return fundStoreState.grants;
    }
  }
});
</script>

<style></style>
