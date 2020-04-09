<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <v-row>
          <h1 class="display-1 font-weight-light my-8">
            Funding
          </h1>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-card
              dark
              class="mx-auto"
              style="min-height:125px;"
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
          <v-col cols="12" md="3">
            <v-card
              dark
              class="mx-auto"
              style="min-height:125px;"
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
          <v-col cols="12" md="3">
            <v-card
              dark
              class="mx-auto"
              style="min-height:125px;"
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
          <v-col cols="12" md="3">
            <v-card
              dark
              class="mx-auto"
              style="min-height:125px;"
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
          <v-col cols="12" sm="4">
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
                  <span class="display-1 font-weight-light"></span>
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
                  <span class="display-1 font-weight-light"></span>
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
                  <span class="display-1 font-weight-light"></span>
                </v-card-text>
              </v-card>
            </div>
            <div>
              <v-card class="mb-4" style="min-height:100px;">
                <v-card-title>
                  <h2 class="headline">City</h2>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon class="mx-1" v-on="on">mdi-help-circle</v-icon>
                    </template>
                    <span>Go to City Funding</span>
                  </v-tooltip>
                </v-card-title>
                <v-card-text>
                  <span class="display-1 font-weight-light"></span>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FundingDashboardPie from "@/components/Funding/FundingDashboardPie.vue";
import UserStore from "@/store/user/user-store";
import { db, Timestamp } from "@/firebase";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// lists
import ProjectType from "@/util/constants/admin/projects/project-type";
import HousingType from "@/util/constants/admin/projects/housing-type";
import NoYes from "@/util/constants/admin/no-yes";
import TargetPopulation from "@/util/constants/admin/projects/target-population";
import TrackingMethod from "@/util/constants/admin/projects/tracking-method";
import FundingSource from "@/util/constants/admin/funding/funding-source";
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
    FundingDashboardPie
  },

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
  private componentKey = 0;
  private projectType = ProjectType;
  private housingType = HousingType;
  private targetPopulation = TargetPopulation;
  private trackingMethod = TrackingMethod;
  private fundingSource = FundingSource;
  private noYes = NoYes;
  // Firestore collection
  private organizationSelect = [{}];
  private funder = [{}];
  private result = [{}];
  // Datepicker
  private menu = false;
  private menu2 = false;
  // Data Table
  private isLoading = false;
  private dialog = false;
  private expanded = [];
  private singleExpand = true;
  private headers = [
    {
      text: "Project Name",
      align: "start",
      sortable: true,
      value: "ProjectName"
    },
    {
      text: "Project Type",
      sortable: true,
      value: "ProjectType"
    },
    {
      text: "Organization Name",
      sortable: true,
      value: "OrganizationID"
    },
    {
      text: "Operating Start Date",
      sortable: true,
      value: "OperatingStartDate"
    },
    {
      text: "Operating End Date",
      sortable: true,
      value: "OperatingEndDate"
    },
    {
      text: "Continuum Project",
      align: "center",
      sortable: true,
      value: "ContinuumProject"
    },
    {
      text: "HMIS Participating Project",
      align: "center",
      sortable: true,
      value: "HMISParticipatingProject"
    },
    {
      text: "Amount Total",
      sortable: true,
      value: "AmountTotal"
    },

    { text: "Actions", value: "actions", align: "center", sortable: false }
  ];
  private subDataHeaders = [
    {
      text: "Notice",
      align: "start",
      sortable: false,
      value: "Tooltip"
    },
    {
      text: "Funder",
      sortable: true,
      value: "Funder"
    },
    {
      text: "Grant ID",
      sortable: true,
      value: "GrantID"
    },
    {
      text: "Start Date",
      sortable: true,
      value: "StartDate"
    },
    {
      text: "End Date",
      sortable: true,
      value: "EndDate"
    },
    {
      text: "Amount",
      sortable: true,
      value: "Amount"
    }
  ];
  private editedIndex = -1;

  get formTitle() {
    return this.editedIndex === -1 ? "New Project" : "Edit Project";
  }
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
    this.fetchOrganization();
  }

  private fetchOrganization() {
    db.collection("Organization")
      .get()
      .then(snapshot => {
        this.organizationSelect = [];
        snapshot.forEach(doc => {
          this.organizationSelect.push({
            value: doc.data().OrganizationID,
            text: doc.data().OrganizationName
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
  private initialize() {
    const dataService = new DataServices();
    dataService.GetAll();
  }
}
</script>
<style scoped>
.test .theme--light.v-table {
  background-color: #00f;
}
</style>
