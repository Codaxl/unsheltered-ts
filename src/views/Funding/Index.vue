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
          <v-col cols="12" sm="4">
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
          <v-col cols="12" sm="4">
            <v-row align="center" class="ma-auto">
              <v-select
                v-model="e2"
                :items="organizations"
                menu-props="auto"
                label="Organization"
                hide-details
                outlined
                @change="loadStats"
              ></v-select>
            </v-row>
          </v-col>
          <v-col cols="12" sm="4">
            <v-row align="center" class="ma-auto">
              <v-select
                v-model="e3"
                :items="grants"
                menu-props="auto"
                label="Grant"
                hide-details
                outlined
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
                <v-card-title>
                  <h2 class="headline">Total</h2>
                </v-card-title>
                <v-card-text v-if="!isLoading">
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
                <v-card-title>
                  <h2 class="headline">Organizations</h2>
                </v-card-title>
                <v-card-text v-if="!isLoading">
                  <span class="display-1 font-weight-light">{{
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
                <v-card-title>
                  <h2 class="headline">Grants</h2>
                </v-card-title>
                <v-card-text v-if="!isLoading">
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
                    this.stats.federalTotal | currency
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
                    this.stats.stateTotal | currency
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
                    this.stats.countyTotal | currency
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
                    this.stats.cityTotal | currency
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
                <funding-dashboard-pie></funding-dashboard-pie>
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
import FundingDashboardPie from "../../components/Funding/FundingDashboardPie.vue";
import FundingDashboardMap from "../../components/Funding/FundingDashboardMap.vue";
import { StatsDataServices } from "./FirestoreDataServices";
import FundsStore from "@/store/funds/funds-store";

@Component({
  components: { FundingDashboardPie, FundingDashboardMap }
})
export default class FundingDashboard extends Vue {
  get setYear(): string {
    return FundsStore.year;
  }
  private orgCount = [];
  private isLoading = false;
  private years: string[] = ["2019", "2018"];
  private e1 = "2019";
  private organizations: any = [
    "Lighthouse Social Service Center",
    "Housing Authority"
  ];
  private selectedOrgs = [];
  private e2 = "";
  private grants: string[] = ["HUD:CoC"];
  private e3 = "";
  private stats: any = [];
  created() {
    this.loadStats();
  }
  private loadStats() {
    this.isLoading = true;
    const statsDataService = new StatsDataServices();
    const yearFilter = this.e1;
    const orgFilter = this.e2;
    statsDataService.GetAll(yearFilter, orgFilter).then(data => {
      this.stats = data;
      this.isLoading = false;
    });
  }
  private toggle() {
    this.$nextTick(() => {
      if (this.likesAllFruit) {
        this.selectedOrgs = [];
      } else {
        this.selectedOrgs = this.organizations.slice();
      }
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

  get likesAllFruit(): boolean {
    return this.selectedOrgs.length === this.organizations.length;
  }
  get likesSomeFruit(): boolean {
    return this.selectedOrgs.length > 0 && !this.likesAllFruit;
  }
  get icon(): string {
    if (this.likesAllFruit) return "mdi-close-box";
    if (this.likesSomeFruit) return "mdi-minus-box";
    return "mdi-checkbox-blank-outline";
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
