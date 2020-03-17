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
          <v-col cols="12" sm="4"> </v-col> <v-col cols="12" sm="4"> </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="e1"
              :items="years"
              menu-props="auto"
              label="Select"
              hide-details
              solo
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col cols="12" sm="6">
            <div>
              <v-card class="mx-auto" style="min-height:125px;">
                <v-card-title>
                  <h2 class="headline">Federal</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Tooltip</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light">{{
                    this.stats.federalTotal | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>
              <v-card class="mx-auto" style="min-height:125px;">
                <v-card-title>
                  <h2 class="headline">State</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Tooltip</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light">{{
                    this.stats.stateTotal | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div>
              <v-card class="mx-auto" style="min-height:125px;">
                <v-card-title>
                  <h2 class="headline">County</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Tooltip</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light">{{
                    this.stats.countyTotal | currency
                  }}</span>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div>
              <v-card class="mx-auto" style="min-height:125px;">
                <v-card-title>
                  <h2 class="headline">Local</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Tooltip</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light">{{
                    this.stats.localTotal | currency
                  }}</span>
                </v-card-text>
              </v-card>
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
              <v-card>
                <funding-dashboard-pie></funding-dashboard-pie>
              </v-card>
            </v-lazy>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="12">
          <div ref="#about">
            <h2 class="font-weight-regular mt-5">
              About
            </h2>
          </div>
          <div class="body-1 mb-5">
            <p>
              The Homeless Emergency Aid Program was established by statute to
              provide localities with flexible block grant funds to address
              their immediate homelessness challenges. The Homeless Emergency
              Aid Block Grants will provide $500 million in one-time funding to
              enable local governments to respond to homelessness. Allocations
              are as follows: $250 million to Continuums of Care based on 2017
              homeless point in time count; $150 million direct allocation to a
              city or city that is also a county with a population of 330,000 or
              more as of January 1, 2018; and $100 million to Continuums of Care
              based on their percentage of the statewide 2017 homeless
              population.
            </p>
            <h3 class="font-weight-regular mt-5">Requirements</h3>
            <p>
              City, county, or joint power must declared an emergency shelter
              crisis (waiver process for smaller cities and counties that do not
              declare a shelter emergency). Continuum of Care must demonstrate
              collaboration with other city, county, or nonprofit partners.
            </p>
            <h3 class="font-weight-regular mt-5">Eligible Activities</h3>
            <p>
              Emergency housing vouchers Rapid rehousing Emergency shelter
              construction, and Use of armories to provide temporary shelters,
              among other activities.
            </p>
            <div class="caption my-5">
              Source: https://www.bcsh.ca.gov/hcfc/aid_program.html
            </div>
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
              <v-card>
                <funding-dashboard-map></funding-dashboard-map>
              </v-card>
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

@Component({
  components: { FundingDashboardPie, FundingDashboardMap }
})
export default class FundingDashboard extends Vue {
  private years: string[] = ["2019", "2018"];
  private e1 = "2019";
  private stats: any = [];
  created() {
    this.loadStats();
  }
  private loadStats() {
    const statsDataService = new StatsDataServices();
    const year = this.e1;
    statsDataService.GetAll(year).then(data => {
      this.stats = data;
    });
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
