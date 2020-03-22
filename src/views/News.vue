<template>
  <v-container style="max-width:1080px;" fluid>
    <div>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </div>
    <v-row>
      <v-col cols="12">
        <v-card
          class="mx-auto"
          max-width="600"
          v-for="item in results"
          :key="item.guid"
        >
          <v-img
            :src="item.thumbnail"
            :lazy-src="item.thumbnail"
            height="320px"
          ></v-img>

          <v-card-title>
            {{ item.title }}
          </v-card-title>

          <v-card-subtitle>
            by {{ item.author }} at {{ item.pubDate }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn text>Share</v-btn>

            <v-btn color="purple" text :href="item.link">
              Read
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                {{ item.description }}
              </v-card-text>
            </div>
          </v-expand-transition>
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
  private show = false;

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
  private results: Array<object> = [];
  // TODO https://stackoverflow.com/questions/11784703/remove-html-from-a-string-in-json-response
  // Source: https://medium.com/@KonradDaWo/how-to-display-medium-posts-on-a-website-with-plain-vanilla-js-basic-api-usage-example-865507848c2
  mounted() {
    Vue.axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@joshua.coda"
      )
      .then(response => {
        this.results = response.data.items;
      });
  }
}
</script>
<style></style>
