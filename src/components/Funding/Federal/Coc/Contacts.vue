<template>
  <div>
    <div>
      <h2 class="headline">Contact information</h2>
    </div>
    <v-data-iterator
      :items="items"
      item-key="name"
      :items-per-page="4"
      :single-expand="expand"
      hide-default-footer
    >
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>
                {{ item.name }}
              </v-card-title>

              <v-card-subtitle>
                {{ item.calories }}
              </v-card-subtitle>
              <v-switch
                :input-value="isExpanded(item)"
                :label="isExpanded(item) ? 'Hide' : 'Show Info'"
                class="pl-4 mt-0"
                @change="v => expand(item, v)"
              ></v-switch>
              <v-divider></v-divider>
              <v-list v-if="isExpanded(item)" dense>
                <v-list-item>
                  <v-list-item-content>Calories:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.calories
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Fat:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.fat
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Carbs:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.carbs
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Protein:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.protein
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Sodium:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.sodium
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Calcium:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.calcium
                  }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Iron:</v-list-item-content>
                  <v-list-item-content class="align-end">{{
                    item.iron
                  }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
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
        calories: "Director",
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%"
      },
      {
        name: "Jeff Low",
        calories: "Program Specialist",
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: "8%",
        iron: "1%"
      },
      {
        name: "Dane Doodle",
        calories: "Analyst",
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: "6%",
        iron: "7%"
      },
      {
        name: "Sarah McBride",
        calories: "Research Specialist",
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%"
      }
    ]
  })
});
</script>

<style></style>
