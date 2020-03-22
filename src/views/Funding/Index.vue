<template>
  <v-container style="max-width:1080px;">
    <div>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </div>
    <div>
      <div>
        <h1 class="display-1 font-weight-light my-8">
          Funding
        </h1>
      </div>
      <div>
        <v-row>
          <v-col cols="12" sm="3">
            <v-row align="center" class="ma-auto">
              <v-select
                v-model="e1"
                :items="years"
                menu-props="auto"
                label="Year"
                hide-details
                outlined
                @change="loadStats"
              ></v-select>
            </v-row>
          </v-col>
          <v-col cols="12" sm="3">
            <v-row align="center" class="ma-auto">
              <v-select
                v-model="e2"
                :items="organizations"
                menu-props="auto"
                label="Organization"
                hide-details
                outlined
                clearable
                @change="loadStats"
              ></v-select>
            </v-row>
          </v-col>
          <v-col cols="12" sm="3">
            <v-row align="center" class="ma-auto">
              <v-select
                v-model="e3"
                :items="grants"
                menu-props="auto"
                label="Grant"
                hide-details
                outlined
                clearable
                @change="loadStats"
              ></v-select>
            </v-row>
          </v-col>
          <v-col cols="12" sm="3">
            <v-row align="center" class="ma-auto">
              <v-select
                v-model="e4"
                :items="sources"
                menu-props="auto"
                label="Source"
                hide-details
                outlined
                clearable
                @change="loadStats"
              ></v-select>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col cols="12" sm="4">
            <div>
              <v-card
                dark
                class="mx-auto"
                style="min-height:125px;"
                color="deep-purple lighten-1"
                :loading="isLoading"
              >
                <v-card-title class="justify-center">
                  <h2 class="headline">Total</h2>
                </v-card-title>
                <v-card-text class="text-center" v-if="!isLoading">
                  <span class="display-1 font-weight-light">{{
                    totalAmount | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div>
              <v-card
                dark
                class="mx-auto"
                style="min-height:125px;"
                color="teal lighten-1"
                :loading="isLoading"
              >
                <v-card-title class="justify-center">
                  <h2 class="headline">Organizations</h2>
                </v-card-title>
                <v-card-text class="text-center" v-if="!isLoading">
                  <span class="display-1 font-weight-light ">{{
                    totalOrganizations
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div>
              <v-card
                dark
                class="mx-auto"
                style="min-height:125px;"
                color="orange lighten-1"
                :loading="isLoading"
              >
                <v-card-title class="justify-center">
                  <h2 class="headline">Grants</h2>
                </v-card-title>
                <v-card-text class="text-center" v-if="!isLoading">
                  <span class="display-1 font-weight-light">{{
                    totalGrants
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <div>
              <v-card
                class="mb-4"
                style="min-height:100px;"
                :loading="isLoading"
              >
                <v-card-title>
                  <h2 class="headline">Federal</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Go to Federal Funding</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text v-if="!isLoading">
                  <span class="display-1 font-weight-light">{{
                    totalFederal | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
            <div>
              <v-card
                class="mb-4"
                style="min-height:100px;"
                :loading="isLoading"
              >
                <v-card-title>
                  <h2 class="headline">State</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Go to State Funding</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text v-if="!isLoading">
                  <span class="display-1 font-weight-light">{{
                    totalState | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
            <div>
              <v-card
                class="mb-4"
                style="min-height:100px;"
                :loading="isLoading"
              >
                <v-card-title>
                  <h2 class="headline">County</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Go to County Funding</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text v-if="!isLoading">
                  <span class="display-1 font-weight-light">{{
                    totalCounty | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
            <div>
              <v-card
                class="mb-4"
                style="min-height:100px;"
                :loading="isLoading"
              >
                <v-card-title>
                  <h2 class="headline">City</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Go to City Funding</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text v-if="!isLoading">
                  <span class="display-1 font-weight-light">{{
                    totalCity | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" sm="8">
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
      </div>
      <div>
        <v-row>
          <v-col cols="12">
            <div>
              <v-lazy
                :options="{
                  threshold: 0.5
                }"
                min-height="650"
                transition="fade-transition"
              >
                <funding-dashboard-bar
                  :key="componentKey"
                ></funding-dashboard-bar>
              </v-lazy>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FundingDashboardPie from "@/components/Funding/FundingDashboardPie.vue";
import FundingDashboardBar from "@/components/Funding/FundingDashboardBar.vue";

// Vuex
import { getModule } from "vuex-module-decorators";
import FundStore from "@/store/funds/funds-store";
const fundStoreState = getModule(FundStore);

// DATA
import { StatsDataServices } from "./FirestoreDataServices";

@Component({
  components: { FundingDashboardPie, FundingDashboardBar }
})
export default class FundingDashboard extends Vue {
  private orgCount = [];
  public isLoading = false;
  private years: string[] = ["2020", "2019", "2018"];
  private e1 = "2020";
  private organizations: string[] = [
    "Lighthouse Social Service Center",
    "Housing Authority",
    "Operation SafeHouse"
  ];
  private e2 = "";
  private grants: string[] = ["HUD:CoC", "HEAP"];
  private e3 = "";
  private sources: string[] = ["Federal", "State", "County", "City"];
  private e4 = "";

  private stats: any = [];
  private componentKey = 0;

  created() {
    this.loadStats();
  }
  private loadStats() {
    this.isLoading = true;
    const statsDataService = new StatsDataServices();
    fundStoreState.setYearFilter(this.e1);
    fundStoreState.setOrgFilter(this.e2);
    fundStoreState.setGrantFilter(this.e3);
    fundStoreState.setSourceFilter(this.e4);
    statsDataService
      .GetAll(
        fundStoreState.yearFilter,
        fundStoreState.orgFilter,
        fundStoreState.grantFilter,
        fundStoreState.sourceFilter
      )
      .then((data: any) => {
        this.stats = data;
        this.isLoading = false;
        this.componentKey += 1;
      });
  }

  get totalAmount(): string {
    return this.stats.reduce((acc: any, item: any) => acc + +item.amount, 0);
  }
  //https://gist.github.com/quangnd/572c6d410cb6512b7f252af0f2eb7cae

  // Solution: https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/#Javascript_Unique_Array_Example
  get totalOrganizations(): number {
    const uniqueArr = [
      ...new Set(this.stats.map((data: any) => data.organization))
    ];
    return new Set(uniqueArr).size;
  }

  get totalGrants(): number {
    const uniqueArr = [...new Set(this.stats.map((data: any) => data.grant))];
    return new Set(uniqueArr).size;
  }

  //TODO Make this efficient
  // Federal const query indexOf(this.query) solution?

  get filteredFederal(): any {
    return this.stats.filter((c: any) => c.source.indexOf("Federal") !== -1);
  }

  get totalFederal(): string {
    const federalTotal = this.filteredFederal.reduce(
      (a: any, b: any) => a + +b.amount,
      0
    );
    fundStoreState.setFederalTotal(federalTotal);
    return federalTotal;
  }
  // State

  get filteredState(): any {
    return this.stats.filter((c: any) => c.source.indexOf("State") !== -1);
  }

  get totalState(): string {
    const stateTotal = this.filteredState.reduce(
      (a: any, b: any) => a + +b.amount,
      0
    );
    fundStoreState.setStateTotal(stateTotal);
    return stateTotal;
  }
  // County

  get filteredCounty(): any {
    return this.stats.filter((c: any) => c.source.indexOf("County") !== -1);
  }

  get totalCounty(): string {
    const countyTotal = this.filteredCounty.reduce(
      (a: any, b: any) => a + +b.amount,
      0
    );
    fundStoreState.setCountyTotal(countyTotal);
    return countyTotal;
  }
  // City

  get filteredCity(): any {
    return this.stats.filter((c: any) => c.source.indexOf("City") !== -1);
  }

  get totalCity(): string {
    const cityTotal = this.filteredCity.reduce(
      (a: any, b: any) => a + +b.amount,
      0
    );
    fundStoreState.setCityTotal(cityTotal);
    return cityTotal;
  }

  private model = null;
  private breadcrumbs: Array<object> = [
    {
      text: "Home",
      disabled: false,
      href: "/"
    },
    {
      text: "Funding",
      disabled: true,
      href: "/funding"
    }
  ];
}
</script>
<style></style>
