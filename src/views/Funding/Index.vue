<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <v-row>
          <v-col>
            <h1 class="display-1 font-weight-light my-2">
              Funding
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="3" md="6" sm="6">
            <v-card
              dark
              class="mx-auto"
              style="min-height:100px;"
              color="deep-purple lighten-1"
            >
              <v-card-title class="justify-center">
                <h2 class="headline">Total</h2>
              </v-card-title>
              <v-card-text class="text-center">
                <span class="display-1 font-weight-light">{{
                  amountTotal | currency
                }}</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="3" md="6" sm="6">
            <v-card
              dark
              class="mx-auto"
              style="min-height:50px;"
              color="teal lighten-1"
            >
              <v-card-title class="justify-center">
                <h2 class="headline">Organizations</h2>
              </v-card-title>
              <v-card-text class="text-center">
                <span class="display-1 font-weight-light ">{{
                  organizationTotal
                }}</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="3" md="6" sm="6">
            <v-card
              dark
              class="mx-auto"
              style="min-height:100px;"
              color="orange lighten-1"
            >
              <v-card-title class="justify-center">
                <h2 class="headline">Projects</h2>
              </v-card-title>
              <v-card-text class="text-center">
                <span class="display-1 font-weight-light">{{
                  projectTotal
                }}</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" lg="3" md="6" sm="6">
            <v-card
              dark
              class="mx-auto"
              style="min-height:100px;"
              color="yellow darken-1"
            >
              <v-card-title class="justify-center">
                <h2 class="headline">Funding Sources</h2>
              </v-card-title>
              <v-card-text class="text-center">
                <span class="display-1 font-weight-light">{{
                  funderTotal
                }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="3" md="6">
            <div>
              <v-card class="mb-4" style="min-height:100px;">
                <v-card-title>
                  <h2 class="headline">Federal</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Go to Federal Funding</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light">{{
                    federalTotal | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
            <div>
              <v-card class="mb-4" style="min-height:100px;">
                <v-card-title>
                  <h2 class="headline">State</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Go to State Funding</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light">{{
                    stateTotal | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
            <div>
              <v-card class="mb-4" style="min-height:100px;">
                <v-card-title>
                  <h2 class="headline">County</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Go to County Funding</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light">{{
                    countyTotal | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
            <div>
              <v-card class="mb-4" style="min-height:100px;">
                <v-card-title>
                  <h2 class="headline">Local</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Go to Local Funding</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light">{{
                    localTotal | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
            <div>
              <v-card class="mb-4" style="min-height:100px;">
                <v-card-title>
                  <h2 class="headline">NA: Not applicable</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Not Applicable</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light">{{
                    naTotal | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" lg="9" md="6">
            <div>
              <v-lazy
                :options="{
                  threshold: 0.5
                }"
                min-height="500"
                transition="fade-transition"
              >
                <funding-dashboard-pie
                  :key="componentKey"
                ></funding-dashboard-pie>
              </v-lazy>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-lazy
              :options="{
                threshold: 0.5
              }"
              min-height="500"
              transition="fade-transition"
            >
              <project :key="componentKey"></project>
            </v-lazy>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FundingDashboardPie from "@/components/Funding/FundingDashboardPie.vue";
import Project from "./Project.vue";
import UserStore from "@/store/user/user-store";
import { mapState } from "vuex";
import { db, Timestamp } from "@/firebase";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// Merge
import Merge from "@/util/constants/admin/merge";
// Vuex
import { getModule } from "vuex-module-decorators";
import FundStore from "@/store/funds/funds-store";
const fundStoreState = getModule(FundStore);
// DATA
import { DataServices } from "./FirestoreDataServices";
@Component({
  name: "FundingDashboard",
  components: {
    FundingDashboardPie,
    Project
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
export default class FundingDashboard extends Vue {
  //// TODO:
  public federalTotal!: number;
  private componentKey = 0;
  // Data Table
  private isLoading = false;

  get selectYear(): number[] {
    const range = (a: number, b: number) =>
      Array.from(new Array(b > a ? b - a : a - b), (x, i) =>
        b > a ? i + a : a - i
      );
    const currentYear = new Date().getFullYear();
    return range(currentYear, currentYear - 5);
  }
  get userId(): string {
    return UserStore.user.id;
  }
  get amountTotal(): number {
    return fundStoreState.data.reduce(
      (acc: number, item: any) => acc + item.AmountTotal,
      0
    );
  }
  get organizationTotal(): number {
    const uniqueArr = [
      ...new Set(fundStoreState.data.map((data: any) => data.OrganizationID))
    ];
    return new Set(uniqueArr).size;
  }
  get projectTotal(): number {
    const uniqueArr = [
      ...new Set(fundStoreState.data.map((data: any) => data.ProjectID))
    ];
    return new Set(uniqueArr).size;
  }
  get funderTotal(): number {
    return new Set(fundStoreState.subData).size;
  }
  created() {
    this.initialize();
  }

  //TODO: Move to initialize
  // private fetchOrganization() {
  //   db.collection("Organization")
  //     .get()
  //     .then(snapshot => {
  //       this.organizationSelect = [];
  //       snapshot.forEach(doc => {
  //         this.organizationSelect.push({
  //           value: doc.data().OrganizationID,
  //           text: doc.data().OrganizationName
  //         });
  //       });
  //     })
  //     .catch(err => {
  //       console.log("Error getting documents", err);
  //     });
  // }
  private initialize() {
    const dataService = new DataServices();
    dataService.GetAll().then((data: any) => {
      this.setData();
      this.componentKey += 1;
    });
  }
  private setData() {
    const filteredFederal = fundStoreState.subData.filter(
      (c: any) => c.FunderCategory.indexOf("Federal") !== -1
    );
    const federalTotal = filteredFederal.reduce(
      (a: number, b: any) => a + b.Amount,
      0
    );
    fundStoreState.setFederalTotal(federalTotal);

    const filteredState = fundStoreState.subData.filter(
      (c: any) => c.FunderCategory.indexOf("State") !== -1
    );
    const stateTotal = filteredState.reduce(
      (a: number, b: any) => a + b.Amount,
      0
    );
    fundStoreState.setStateTotal(stateTotal);

    const filteredCounty = fundStoreState.subData.filter(
      (c: any) => c.FunderCategory.indexOf("County") !== -1
    );
    const countyTotal = filteredCounty.reduce(
      (a: number, b: any) => a + b.Amount,
      0
    );
    fundStoreState.setCountyTotal(countyTotal);

    const filteredLocal = fundStoreState.subData.filter(
      (c: any) => c.FunderCategory.indexOf("Local") !== -1
    );
    const localTotal = filteredLocal.reduce(
      (a: number, b: any) => a + b.Amount,
      0
    );
    fundStoreState.setLocalTotal(localTotal);
    const filteredNa = fundStoreState.subData.filter(
      (c: any) => c.FunderCategory.indexOf("NA: Not applicable") !== -1
    );
    const naTotal = filteredNa.reduce((a: number, b: any) => a + b.Amount, 0);
    fundStoreState.setNaTotal(naTotal);
  }
}
</script>
<style scoped>
.test .theme--light.v-table {
  background-color: #00f;
}
</style>
