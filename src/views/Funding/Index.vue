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
                    <span>Tooltip</span>
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
                    <span>Tooltip</span>
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
                    <span>Tooltip</span>
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
                    <span>Tooltip</span>
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
      <v-row>
        <v-col cols="12">
          <div ref="#sources">
            <h2 class="font-weight-regular mt-5">
              Sources
            </h2>
          </div>
          <div class="body-1 mb-5">
            <p>
              Lets break it down. Funding sources have been broken down into
              four categories: Federal, State, County, and City. How much does
              Riverside County spend on homeless programs? Who receives the
              funding? Where are those funding allocations by organizations
              located in Riverside County?
            </p>
            <h3 class="font-weight-regular mt-5">Federal</h3>
            <p>
              City, county, or joint power must declared an emergency shelter
              crisis (waiver process for smaller cities and counties that do not
              declare a shelter emergency). Continuum of Care must demonstrate
              collaboration with other city, county, or nonprofit partners.
            </p>
            <h3 class="font-weight-regular mt-5">State</h3>
            <p>
              City, county, or joint power must declared an emergency shelter
              crisis (waiver process for smaller cities and counties that do not
              declare a shelter emergency). Continuum of Care must demonstrate
              collaboration with other city, county, or nonprofit partners.
            </p>
            <h3 class="font-weight-regular mt-5">County</h3>
            <p>
              City, county, or joint power must declared an emergency shelter
              crisis (waiver process for smaller cities and counties that do not
              declare a shelter emergency). Continuum of Care must demonstrate
              collaboration with other city, county, or nonprofit partners.
            </p>
            <h3 class="font-weight-regular mt-5">City</h3>
            <p>
              City, county, or joint power must declared an emergency shelter
              crisis (waiver process for smaller cities and counties that do not
              declare a shelter emergency). Continuum of Care must demonstrate
              collaboration with other city, county, or nonprofit partners.
            </p>
          </div>
        </v-col>
      </v-row>
      <div>
        <v-row>
          <v-col cols="12">
            <v-lazy
              :options="{
                threshold: 0.5
              }"
              min-height="500"
              transition="fade-transition"
            >
              <funding-dashboard-map></funding-dashboard-map>
            </v-lazy>
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

  private isLoading = false;
  private years: string[] = ["2019", "2018"];
  private e1 = "2019";
  private organizations: string[] = [
    "",
    "Public Social Services",
    "Housing Authority"
  ];
  private e2 = "";
  private grants: string[] = ["", "HUD:CoC"];
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
    statsDataService.GetStats(yearFilter, orgFilter).then(data => {
      this.stats = data;
      this.isLoading = false;
      console.log(this.stats);
    });
  }

  get totalAmount(): string {
    return this.stats.reduce((acc: any, item: any) => acc + +item.amount, 0);
  }
  get totalOrganizations(): string {
    return this.stats.reduce(
      (acc: any, item: any) => acc + +item.organization,
      0
    );
  }
  get totalGrants(): string {
    return this.stats.reduce((acc: any, item: any) => acc + +item.amount, 0);
  }

  get countOrganizations() {
    const newObj: any = {}; //created new empty object to hold integer values.

    for (let i = 0; i < this.stats.organization.length; i++) {
      //iterate over the array

      const char = this.stats.organization[i];

      if (newObj[char] > 0) {
        //if the item is already in newObj
        newObj[char]++; //increment its value by 1
      } else {
        newObj[char] = 1; //if the integer is not already in newObj put it there with a value of 1
      }
    }
    return Object.keys(newObj).length; //return length of array returned by Object.keys(newObj)
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
