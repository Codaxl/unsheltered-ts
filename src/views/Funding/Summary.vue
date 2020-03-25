<template>
  <div id="Events">
    <v-container style="max-width:1080px;">
      <div>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      </div>
      <div>
        <v-data-table
          :headers="headers"
          :items="funds"
          :options.sync="options"
          :loading="loading"
          class="elevation-1"
        ></v-data-table>
      </div>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { db } from "@/firebase";

export default Vue.extend({
  data() {
    return {
      funds: [{}],
      totalFunds: 0,
      desserts: [],
      loading: true,
      options: {},
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
      ],
      breadcrumbs: [
        {
          text: "Home",
          disabled: false,
          href: "/"
        },
        {
          text: "Funding",
          disabled: true,
          href: "/funding/"
        },
        {
          text: "Summary",
          disabled: true,
          href: "/funding/"
        }
      ]
    };
  },
  mounted() {
    this.fetchFunds();
  },
  methods: {
    async fetchFunds() {
      this.loading = true;
      const query = db.collection("funds");
      try {
        const { docs } = await query.get();

        this.funds = docs.map(doc => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });
        this.totalFunds = this.funds.length;
        this.loading = false;
      } catch (error) {
        throw new Error("Something gone wrong!");
      }
    }
  }
});
</script>
<style></style>
