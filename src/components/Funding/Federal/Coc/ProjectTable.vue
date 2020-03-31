<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h2 class="headline">Projects</h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="data"
        :loading="loading"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:item.amount="{ item }">
          {{ item.operatingStartDate }}
        </template>
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
import format from "date-fns/format";
export default Vue.extend({
  data: () => ({
    // Firestore collection
    collection: db.collection("projects"),
    data: [{}],
    // Date filter
    pattern: "yyyy",
    // Datepicker
    expand: true,
    loading: false,
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
        value: "operatingStartDate"
      },
      { text: "Amount", value: "amount" },
      { text: "Organization", value: "organizationName" },
      { text: "Project Name", value: "projectName" }
    ]
  }),
  mounted() {
    this.loading = true;
    this.initialize();
  },
  methods: {
    initialize() {
      this.collection
        .where("grants", "array-contains", "Continuum of Care (CoC) Program")
        .get()
        .then(snapshot => {
          this.data = [];
          snapshot.forEach(doc => {
            this.data.push({
              operatingStartDate: format(
                doc.data().operatingStartDate.toDate(),
                this.pattern
              ),
              amount: doc.data().amount,
              organizationName: doc.data().organizationName,
              projectName: doc.data().projectName
            });
          });
          this.loading = false;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  }
});
</script>

<style></style>
