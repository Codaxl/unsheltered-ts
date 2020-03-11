<template>
  <v-container style="max-width:1080px;" fluid>
    <div>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </div>
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <v-card class="mx-auto">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Pinned</div>
              <v-list-item-title class="headline mb-1"
                >Welcome</v-list-item-title
              >
              <v-list-item-subtitle>by Joshua Coda</v-list-item-subtitle>
              <div class="text--primary my-4">
                The purpose of this website is to collect structural components
                of homeless funding and its allocation to programs. Information
                on who is receiving funding in Riverside County, where those
                Funds are distributed, and contact information is vital to
                efficient management, transparency and organizational purposes.
              </div>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4">
              Read
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="mx-auto">
          <v-subheader>CATEGORIES</v-subheader>
          <v-list shaped>
            <v-list-item-group v-model="model" multiple>
              <template v-for="(item, i) in items">
                <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

                <v-list-item
                  v-else
                  :key="`item-${i}`"
                  :value="item"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="item"
                        color="deep-purple accent-4"
                        @click="toggle"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import BudgetPie from "../components/Funding/State/Heap/BudgetPie.vue";

@Component({
  components: { BudgetPie }
})
export default class News extends Vue {
  private model: string[] = ["All"];
  private breadcrumbs: Array<object> = [
    {
      text: "Home",
      disabled: false,
      href: "/"
    },
    {
      text: "News",
      disabled: true,
      href: "/"
    }
  ];
  private items: string[] = ["All", "", "Federal", "State", "County", "Local"];
}
</script>
<style></style>
