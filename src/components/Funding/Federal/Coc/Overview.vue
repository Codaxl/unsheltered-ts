<template>
  <v-container>
    <div>
      <div>
        <h2 class="headline">Overview</h2>
      </div>
      <v-data-table :headers="cocHeaders" :items="coc" hide-default-footer>
        <template v-slot:item.amount="{ item }">
          {{ item.amount | currency }}
        </template>
      </v-data-table>
      <div>
        <p>
          Roune 1 Standard Distribution of Funds Began Apr 2019. Round 2
          Standard Distribution of Funds Began July 2019. 100 percent of the
          funds must be expended by June 30, 2021.
        </p>

        <p class="caption">
          Source: https://www.bcsh.ca.gov/hcfc/documents/heap_overview.pdf
        </p>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
// Vuex

export default Vue.extend({
  data: () => ({
    expand: true,
    coc: [
      {
        amount: 9791805.06,
        contractNumber: "18-HEAP-00052",
        granteeName: "County of Riverside Dept of Public Social Services",
        address: "1111 Spruce Street",
        city: "Riverside",
        state: "CA",
        zipCode: "92507"
      }
    ],
    cocHeaders: [
      {
        text: "Contract Number",
        align: "start",
        sortable: false,
        value: "contractNumber"
      },
      { text: "Amount", sortable: false, value: "amount" },
      { text: "Grantee Name", sortable: false, value: "granteeName" },
      { text: "Address", sortable: false, value: "address" },
      { text: "City", sortable: false, value: "city" },
      { text: "State", sortable: false, value: "state" },
      { text: "Zipcode", sortable: false, value: "zipCode" }
    ]
  })
});
</script>

<style></style>
