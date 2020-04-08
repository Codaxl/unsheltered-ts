<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
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
                    @change="merge"
                  ></v-select>
                </v-row>
              </v-col>
              <v-col cols="12" sm="3">
                <v-row align="center" class="ma-auto">
                  <v-select
                    v-model="e2"
                    :items="organizationSelect"
                    menu-props="auto"
                    label="Organization"
                    hide-details
                    outlined
                    clearable
                    @change="merge"
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
                    @change="merge"
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
                    @change="merge"
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
                      <span class="display-1 font-weight-light"></span>
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
                      <span class="display-1 font-weight-light "></span>
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
                      <span class="display-1 font-weight-light"></span>
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
                          <v-icon class="mx-1" v-on="on"
                            >mdi-help-circle</v-icon
                          >
                        </template>
                        <span>Go to Federal Funding</span>
                      </v-tooltip>
                    </v-card-title>
                    <v-card-text v-if="!isLoading">
                      <span class="display-1 font-weight-light"></span>
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
                          <v-icon class="mx-1" v-on="on"
                            >mdi-help-circle</v-icon
                          >
                        </template>
                        <span>Go to State Funding</span>
                      </v-tooltip>
                    </v-card-title>
                    <v-card-text v-if="!isLoading">
                      <span class="display-1 font-weight-light"></span>
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
                          <v-icon class="mx-1" v-on="on"
                            >mdi-help-circle</v-icon
                          >
                        </template>
                        <span>Go to County Funding</span>
                      </v-tooltip>
                    </v-card-title>
                    <v-card-text v-if="!isLoading">
                      <span class="display-1 font-weight-light"></span>
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
                          <v-icon class="mx-1" v-on="on"
                            >mdi-help-circle</v-icon
                          >
                        </template>
                        <span>Go to City Funding</span>
                      </v-tooltip>
                    </v-card-title>
                    <v-card-text v-if="!isLoading">
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
          </div>
          <div>
            <v-row>
              <v-col cols="12">
                <div>
                  <v-lazy
                    :options="{
                      threshold: 0.5
                    }"
                    min-height="150"
                    transition="fade-transition"
                  >
                    <funding-grant-table
                      :key="componentKey"
                    ></funding-grant-table>
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
          <div>
            <v-row>
              <v-col cols="12">
                <div>
                  <v-lazy
                    :options="{
                      threshold: 0.5
                    }"
                    min-height="150"
                    transition="fade-transition"
                  >
                    <funding-organization-table
                      :key="componentKey"
                    ></funding-organization-table>
                  </v-lazy>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UserStore from "@/store/user/user-store";
import { db, Timestamp } from "@/firebase";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// Component
import FundingDashboardPie from "@/components/Funding/FundingDashboardPie.vue";
import FundingDashboardBar from "@/components/Funding/FundingDashboardBar.vue";
import FundingGrantTable from "@/components/Funding/FundingGrantTable.vue";
import FundingOrganizationTable from "@/components/Funding/FundingOrganizationTable.vue";
// Merge
import Merge from "./merge";
// Vuex
import { getModule } from "vuex-module-decorators";
import FundStore from "@/store/funds/funds-store";
const fundStoreState = getModule(FundStore);

export default Vue.extend({
  components: {
    FundingDashboardPie,
    FundingDashboardBar,
    FundingGrantTable,
    FundingOrganizationTable
  },
  data: () => ({
    //// TODO:
    breadcrumbs: [
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
    ],
    e1: 2019,
    componentKey: 0,
    e2: "",
    grants: ["CoC", "CDBG", "ESG", "HOME", "HOPWA"],
    e3: "",
    sources: ["Federal", "State", "County", "City"],
    e4: "",
    // Firestore collection
    collection: db.collection("Project"),
    organizationSelect: [{}],
    funder: [{}],
    result: [{}],
    // Datepicker
    menu: false,
    menu2: false,
    // Data Table
    isLoading: false,
    dialog: false,
    expanded: [],
    singleExpand: true,
    data: [{}],
    editedIndex: -1
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Project" : "Edit Project";
    },
    selectYear(): number[] {
      const range = (a: number, b: number) =>
        Array.from(new Array(b > a ? b - a : a - b), (x, i) =>
          b > a ? i + a : a - i
        );
      const currentYear = new Date().getFullYear();
      return range(currentYear, currentYear - 5);
    },
    userId(): string {
      return UserStore.user.id;
    },
    merge() {
      return Merge.byKey(this.data, this.funder, "ProjectID");
    }
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
  },
  created() {
    this.initialize();
    this.fetchOrganization();
  },
  methods: {
    fetchOrganization() {
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
    },
    initialize() {
      this.isLoading = true;
      this.collection.onSnapshot(querySnapshot => {
        this.data = [];
        querySnapshot.forEach(doc => {
          this.data.push({
            //
            ProjectID: doc.id,
            OrganizationID: doc.data().OrganizationID,
            ProjectName: doc.data().ProjectName,
            ProjectCommonName: doc.data().ProjectCommonName,
            OperatingStartDate: format(
              doc.data().OperatingStartDate.toDate(),
              "yyyy-MM-dd"
            ),
            OperatingEndDate: format(
              doc.data().OperatingEndDate.toDate(),
              "yyyy-MM-dd"
            ),
            ContinuumProject: doc.data().ContinuumProject,
            ProjectType: doc.data().ProjectType,
            HousingType: doc.data().HousingType,
            ResidentialAffiliation: doc.data().ResidentialAffiliation,
            TrackingMethod: doc.data().TrackingMethod,
            HMISParticipatingProject: doc.data().HMISParticipatingProject,
            TargetPopulation: doc.data().TargetPopulation,
            PITCount: doc.data().PITCount,
            DateCreated: doc.data().DateCreated.toDate(),
            DateUpdated: doc.data().DateUpdated.toDate(),
            UserID: doc.data().UserID
            // Custom
          });
        });
      });
      db.collection("Funder")
        .where("EndDate", ">=", new Date())
        .get()
        .then(snapshot => {
          this.funder = [];
          snapshot.forEach(doc => {
            this.funder.push({
              //
              FunderID: doc.id,
              Funder: doc.data().Funder,
              ProjectID: doc.data().ProjectID,
              GrantID: doc.data().GrantID,
              Amount: doc.data().Amount,
              StartDate: format(doc.data().StartDate.toDate(), "yyyy-MM-dd"),
              EndDate: format(doc.data().EndDate.toDate(), "yyyy-MM-dd")
            });
          });
          this.componentKey += 1;
          this.isLoading = false;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  }
});
</script>
<style scoped>
.test .theme--light.v-table {
  background-color: #00f;
}
</style>
