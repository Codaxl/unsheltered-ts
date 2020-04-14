<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <v-data-table
          :loading="isLoading"
          :headers="headers"
          :items="merge"
          :sort-by="['operatingStartDate']"
          :sort-desc="[true]"
          group-by="OrganizationID"
          :items-per-page="5"
          multi-sort
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="ProjectID"
          show-expand
          class="elevation-1"
          show-group-by
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Projects</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template
            v-slot:group.header="{ items, isOpen, toggle, remove, groupBy }"
          >
            <th :colspan="headers.length">
              <v-row align="center">
                <v-col>
                  <v-icon @click="toggle"
                    >{{ isOpen ? "mdi-minus" : "mdi-plus" }}
                  </v-icon>
                  <span v-if="groupBy == 'ProjectType'" class="px-1">
                    {{ items[0].ProjectType | toText(projectType) }}
                  </span>
                  <span v-if="groupBy == 'OrganizationID'" class="px-1">
                    {{ items[0].OrganizationID | toText(organizationSelect) }}
                  </span>
                  <span v-if="groupBy == 'OperatingStartDate'" class="px-1">
                    {{ items[0].OperatingStartDate }}
                  </span>
                  <span v-if="groupBy == 'OperatingEndDate'" class="px-1">
                    {{ items[0].OperatingEndDate }}
                  </span>
                  <span
                    v-if="groupBy == 'HMISParticipatingProject'"
                    class="px-1"
                  >
                    {{ items[0].HMISParticipatingProject | toText(noYes) }}
                  </span>
                  <span v-if="groupBy == 'ContinuumProject'" class="px-1">
                    {{ items[0].ContinuumProject | toText(noYes) }}
                  </span>
                  <v-icon @click="remove">{{ "mdi-close" }} </v-icon>
                </v-col>
              </v-row>
            </th>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
          <template v-slot:item.ProjectName="{ item }">
            {{ item.ProjectName }}
          </template>
          <template v-slot:item.ProjectType="{ item }">
            {{ item.ProjectType | toText(projectType) }}
          </template>
          <template v-slot:item.OrganizationID="{ item }">
            {{ item.OrganizationID | toText(organizationSelect) }}
          </template>
          <template v-slot:item.DateCreated="{ item }">
            {{ item.DateCreated | dateFilter }}
          </template>
          <template v-slot:item.DateUpdated="{ item }">
            {{ item.DateUpdated | dateFilter }}
          </template>
          <template v-slot:item.HMISParticipatingProject="{ item }">
            {{ item.HMISParticipatingProject | toText(noYes) }}
          </template>
          <template v-slot:item.ContinuumProject="{ item }">
            {{ item.ContinuumProject | toText(noYes) }}
          </template>
          <template v-slot:item.AmountTotal="{ item }">
            {{ item.AmountTotal | currency }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="ma-0 pa-2">
              <v-lazy
                :options="{
                  threshold: 0.5
                }"
                min-height="150"
                transition="fade-transition"
              >
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <div>
                        <b>Description:</b>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-data-table
                        :headers="subDataHeaders"
                        :items="item.subData"
                        item-key="FunderID"
                        :items-per-page="5"
                        hide-default-footer
                        class="test elevation-2"
                        dense
                      >
                        <template v-slot:item.Tooltip="{ item }">
                          <v-tooltip
                            top
                            v-if="
                              item.StartDate >
                                new Date().toISOString().substr(0, 10)
                            "
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn icon v-on="on">
                                <v-icon>mdi-alert-circle</v-icon>
                              </v-btn>
                            </template>
                            <span>Future Funder</span>
                          </v-tooltip>
                        </template>
                        <template v-slot:item.Funder="{ item }">
                          {{ item.Funder | toText(fundingSource) }}
                        </template>
                        <template v-slot:item.Amount="{ item }">
                          {{ item.Amount | currency }}
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                </v-container>
              </v-lazy>
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import UserStore from "@/store/user/user-store";
import { db } from "@/firebase";
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

export default Vue.extend({
  data: () => ({
    //// TODO:
    projectType: ProjectType,
    housingType: HousingType,
    targetPopulation: TargetPopulation,
    trackingMethod: TrackingMethod,
    fundingSource: FundingSource,
    noYes: NoYes,
    // Firestore collection
    collection: db.collection("Project"),
    organizationSelect: [{}],
    funder: [{}],
    result: [{}],
    // Data Table
    isLoading: false,
    dialog: false,
    expanded: [],
    singleExpand: true,
    headers: [
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
      }
    ],
    subDataHeaders: [
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
    ],
    data: [{}]
  }),
  computed: {
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
          this.isLoading = false;
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
