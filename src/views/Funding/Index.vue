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
                :items="selectYear"
                menu-props="auto"
                label="Year"
                hide-details
                outlined
                @change="loadFunds"
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
                @change="loadFunds"
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
                @change="loadFunds"
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
                @change="loadFunds"
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
import { FundsDataServices } from "./FirestoreDataServices";

@Component({
  components: { FundingDashboardPie, FundingDashboardBar }
})
export default class FundingDashboard extends Vue {
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
  private orgCount = [];
  public isLoading = false;
  private e1 = 2019;
  private organizations: string[] = [
    "Path of Life Ministries",
    "Economic Development Agency",
    "Riverside University Health Systems - Behavioral Health",
    "United Way",
    "City of Riverside",
    "City of Moreno Valley",
    "Jewish Family Service",
    "Public Social Services",
    "Social Work Action Group",
    "Lighthouse Social Service Centers",
    "Housing Authority",
    "Operation SafeHouse"
  ];
  private e2 = "";
  private grants: string[] = ["CoC", "CDBG", "ESG", "HOME", "HOPWA"];
  private e3 = "";
  private sources: string[] = ["Federal", "State", "County", "City"];
  private e4 = "";

  private componentKey = 0;

  created() {
    this.loadFunds();
  }

  // TODO Move to VUEX

  private loadFunds() {
    this.isLoading = true;
    const fundsDataService = new FundsDataServices();
    fundStoreState.setYearFilter(this.e1);
    fundStoreState.setOrgFilter(this.e2);
    fundStoreState.setGrantFilter(this.e3);
    fundStoreState.setSourceFilter(this.e4);
    fundsDataService
      .GetAll(
        fundStoreState.yearFilter,
        fundStoreState.orgFilter,
        fundStoreState.grantFilter,
        fundStoreState.sourceFilter
      )
      .then((data: any) => {
        fundStoreState.setData(data);
        this.isLoading = false;
        this.componentKey += 1;
      });
  }

  get funds(): Array<object> {
    return fundStoreState.data;
  }

  get totalAmount(): number {
    return this.funds.reduce(
      (acc: number, item: any) => acc + parseFloat(item.amount),
      0
    );
  }
  //https://gist.github.com/quangnd/572c6d410cb6512b7f252af0f2eb7cae

  // Solution: https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/#Javascript_Unique_Array_Example
  get totalOrganizations(): number {
    const uniqueArr = [
      ...new Set(this.funds.map((data: any) => data.organization))
    ];
    return new Set(uniqueArr).size;
  }

  get totalGrants(): number {
    const uniqueArr = [...new Set(this.funds.map((data: any) => data.grant))];
    return new Set(uniqueArr).size;
  }

  //TODO Make this efficient
  // Federal const query indexOf(this.query) solution?

  get filteredFederal(): any {
    return this.funds.filter((c: any) => c.source.indexOf("Federal") !== -1);
  }

  get totalFederal(): number {
    const federalTotal = this.filteredFederal.reduce(
      (a: number, b: any) => a + parseFloat(b.amount),
      0
    );
    fundStoreState.setFederalTotal(federalTotal);
    return federalTotal;
  }
  // State

  get filteredState(): any {
    return this.funds.filter((c: any) => c.source.indexOf("State") !== -1);
  }

  get totalState(): number {
    const stateTotal = this.filteredState.reduce(
      (a: number, b: any) => a + parseFloat(b.amount),
      0
    );
    fundStoreState.setStateTotal(stateTotal);
    return stateTotal;
  }
  // County

  get filteredCounty(): any {
    return this.funds.filter((c: any) => c.source.indexOf("County") !== -1);
  }

  get totalCounty(): number {
    const countyTotal = this.filteredCounty.reduce(
      (a: number, b: any) => a + parseFloat(b.amount),
      0
    );
    fundStoreState.setCountyTotal(countyTotal);
    return countyTotal;
  }
  // City

  get filteredCity(): any {
    return this.funds.filter((c: any) => c.source.indexOf("City") !== -1);
  }

  get totalCity(): number {
    const cityTotal = this.filteredCity.reduce(
      (a: number, b: any) => a + parseFloat(b.amount),
      0
    );
    fundStoreState.setCityTotal(cityTotal);
    return cityTotal;
  }
  // TODO Set other computed like below.
  get selectYear(): object {
    const range = (a: number, b: number) =>
      Array.from(new Array(b > a ? b - a : a - b), (x, i) =>
        b > a ? i + a : a - i
      );
    const currentYear = new Date().getFullYear();
    return range(currentYear, currentYear - 5);
  }
}
</script>
<style></style>
