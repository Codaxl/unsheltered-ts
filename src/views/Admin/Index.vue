<template>
  <div>
    <v-tabs v-model="tab" fixed-tabs>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Projects
      </v-tab>

      <v-tab href="#tab-2">
        Organizations
      </v-tab>

      <v-tab href="#tab-3">
        Grants
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="'tab-1'">
        <v-card flat>
          <projects></projects>
        </v-card>
      </v-tab-item>
      <v-tab-item :value="'tab-2'">
        <v-card flat>
          <organizations></organizations>
        </v-card>
      </v-tab-item>
      <v-tab-item :value="'tab-3'">
        <v-card flat> </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Projects from "./Projects/Index.vue";
import Organizations from "./Organizations/Index.vue";
export default Vue.extend({
  components: {
    Projects,
    Organizations
  },
  data() {
    return {
      tab: null
    };
  }
});
</script>
<style></style>
