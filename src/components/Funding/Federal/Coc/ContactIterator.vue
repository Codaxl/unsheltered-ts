<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h2 class="headline">Contacts</h2>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-iterator
        :items="items"
        item-key="name"
        :items-per-page="4"
        hide-default-footer
      >
        <template v-slot:default="{ items }">
          <v-row class="mx-auto">
            <v-col
              v-for="item in items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card flat outlined>
                <v-card-title>
                  {{ item.name }}
                </v-card-title>

                <v-card-subtitle>
                  {{ item.jobTitle }}
                </v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>{{ item.organization }}</div>

                  <div>{{ item.phone }}</div>
                  <div>{{ item.email }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
// Vuex

export default Vue.extend({
  data: () => ({
    expand: true,
    items: [
      {
        name: "Jane Doe",
        jobTitle: "Director",
        organization: "Riverside County",
        phone: "(955) 555-5555",
        email: "f.lastname@gmail.com"
      },
      {
        name: "Jeff Low",
        jobTitle: "Program Specialist",
        organization: "Riverside County",
        phone: "(955) 555-5555",
        email: "f.lastname@gmail.com"
      },
      {
        name: "Dane Doodle",
        jobTitle: "Analyst",
        organization: "Riverside County",
        phone: "(955) 555-5555",
        email: "f.lastname@gmail.com"
      },
      {
        name: "Sarah McBride",
        jobTitle: "Research Specialist",
        organization: "Riverside County",
        phone: "(955) 555-5555",
        email: "f.lastname@gmail.com"
      }
    ]
  })
});
</script>

<style></style>
