<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="organizations"
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
        text: "Organization",
        align: "start",
        sortable: false,
        value: "organization"
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

    organizations: function() {
      // `this` points to the vm instance
      return fundStoreState.organizations;
    }
  }
});
</script>

<style></style>
