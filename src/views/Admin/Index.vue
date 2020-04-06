<template>
  <div>
    <v-tabs v-model="tabs" fixed-tabs show-arrows>
      <v-tab href="#one">Projects</v-tab>
      <v-tab href="#two">Organizations</v-tab>
      <v-tab href="#three">Funders</v-tab>
      <v-tabs-slider color="pink"></v-tabs-slider>
    </v-tabs>

    <v-tabs-items v-model="tabs">
      <v-tab-item v-for="content in ['one']" :key="content" :value="content">
        <projects></projects>
      </v-tab-item>
      <v-tab-item v-for="content in ['two']" :key="content" :value="content">
        <organizations></organizations>
      </v-tab-item>
      <v-tab-item v-for="content in ['three']" :key="content" :value="content">
        <funders></funders>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Projects from "./Projects/Index.vue";
import Organizations from "./Organizations/Index.vue";
import Funders from "./Funders/Index.vue";

export default Vue.extend({
  components: {
    Projects,
    Organizations,
    Funders
  },
  data() {
    return {
      fab: false,
      hidden: false,
      tabs: ""
    };
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "success", icon: "mdi-plus" };
        case "two":
          return { color: "red", icon: "mdi-plus" };
        case "three":
          return { color: "green", icon: "mdi-plus" };
        default:
          return {};
      }
    }
  }
});
</script>
<style></style>
