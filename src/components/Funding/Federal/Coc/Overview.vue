<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h2 class="headline">Overview</h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="funds"
        :loading="loading"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:item.amount="{ item }">
          {{ item.amount | currency }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
// Vuex
import { db } from "@/firebase";
export default Vue.extend({
  data: () => ({
    expand: true,
    funds: [{}],
    loading: true,
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
    headers: [
      {
        text: "Year",
        align: "start",
        sortable: false,
        value: "year"
      },
      { text: "Amount", value: "amount" },
      { text: "Organization", value: "organization" },
      { text: "Project Name", value: "projectName" },
      { text: "Grant", value: "grant" },
      { text: "Source", value: "source" }
    ]
  }),
  mounted() {
    this.fetchFunds();
  },
  methods: {
    async fetchFunds() {
      this.loading = true;
      const query = db.collection("funds").where("grant", "==", "CoC");
      try {
        const { docs } = await query.get();

        this.funds = docs.map(doc => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });
        this.loading = false;
      } catch (error) {
        throw new Error("Something gone wrong!");
      }
    }
  }
});
</script>

<style></style>
