<template>
  <v-container style="max-width:1080px;" fluid>
    <div>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </div>
    <v-row>
      <v-col cols="12">
        <v-layout justify-center>
          <div style="max-width:600px;">
            <v-text-field
              label="Search..."
              solo
              rounded
              clearable
            ></v-text-field>
          </div>
        </v-layout>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div>
          <v-lazy
            :options="{
              threshold: 0.5
            }"
            min-height="600"
            transition="fade-transition"
          >
            <div>
              <v-card
                hover
                class="mx-auto"
                v-for="item in results"
                :key="item.guid"
                max-width="600"
                :href="item.link"
              >
                <v-img
                  :aspect-ratio="16 / 9"
                  :src="item.thumbnail"
                  :lazy-src="item.thumbnail"
                >
                </v-img>
                <v-card-text class="pt-6" style="position: relative;">
                  <h3 class="font-weight-bold title mb-3">
                    {{ item.title }}
                  </h3>
                  <v-row class="mx-auto">
                    <p>By {{ item.author }} on {{ item.pubDate | fullDate }}</p>
                  </v-row>
                  <div>
                    {{ item.description | strip }}
                  </div>
                  <span
                    class="font-weight-regular pe-2"
                    v-for="category in item.categories"
                    :key="category.id"
                  >
                    <v-chip class="my-2">
                      {{ category | capitalize }}
                    </v-chip>
                  </span>
                </v-card-text>
              </v-card>
            </div>
          </v-lazy>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import BudgetPie from "../components/Funding/State/Heap/BudgetPie.vue";

@Component({
  components: { BudgetPie },
  filters: {
    capitalize: function(value: any) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
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
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
