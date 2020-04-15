<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-lazy
          :options="{
            threshold: 0.5
          }"
          min-height="500"
          transition="fade-transition"
        >
          <covid v-if="!isLoading" :key="componentKey"></covid>
        </v-lazy>
      </v-col>

      <v-col cols="12">
        <v-lazy
          :options="{
            threshold: 0.5
          }"
          min-height="500"
          transition="fade-transition"
        >
          <covid-line-graph
            v-if="!isLoading"
            :key="componentKey"
          ></covid-line-graph>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Covid from "./Covid.vue";
import CovidLineGraph from "./CovidLineGraph.vue";
// Vuex
import { getModule } from "vuex-module-decorators";
import CovidStore from "@/store/covid/covid-store";
const covidStoreState = getModule(CovidStore);
// DATA
import { DataServices } from "./DataServices";
@Component({
  name: "CovidDashboard",
  components: {
    Covid,
    CovidLineGraph
  }
})
export default class CovidDashboard extends Vue {
  //// TODO:
  private componentKey = 0;
  // Data Table
  private isLoading = false;
  created() {
    this.isLoading = true;
    this.initialize();
  }
  private initialize() {
    const dataService = new DataServices();
    dataService.GetAll().then((data: any) => {
      this.isLoading = false;
    });
  }
}
</script>
<style scoped></style>
