<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Covid from "./Covid.vue";

import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// Merge
import Merge from "@/util/constants/admin/merge";
// Vuex
import { mapState } from "vuex";
import { getModule } from "vuex-module-decorators";
import FundStore from "@/store/funds/funds-store";
const fundStoreState = getModule(FundStore);
// DATA
import { DataServices } from "./DataServices";
@Component({
  name: "FundingDashboard",
  components: {
    Covid
  },
  computed: mapState("FundStore", [
    "federalTotal",
    "stateTotal",
    "countyTotal",
    "localTotal",
    "naTotal"
  ]),

  filters: {
    dateFilter: function(value: any) {
      return value ? format(value, "yyyy-MM-dd' at 'HH:mm:ss a") : "";
    },
    //https://stackoverflow.com/questions/42828664/access-vue-instance-data-inside-filter-method
    toText: function(item: number, variable: Array<any>) {
      const idArr = [item];

      const idValueMap: any = variable.reduce(
        (acc, { value, text }) => ({ ...acc, [value]: text }),
        {}
      );
      const output = idArr.map(value => idValueMap[value]);
      return output.toString();
    }
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
      this.setData();
      this.isLoading = false;
      console.log("3");
    });
  }
  private setData() {
    console.log("Data");
  }
}
</script>
<style scoped></style>
