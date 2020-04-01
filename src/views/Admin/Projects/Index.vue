<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <v-data-table
          :loading="isLoading"
          :headers="headers"
          :items="data"
          :sort-by="['operatingStartDate']"
          :sort-desc="[true]"
          :items-per-page="5"
          multi-sort
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Projects</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" outlined class="mb-2" v-on="on"
                    >New Project</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.ProjectName"
                            label="Project name"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.OperatingStartDate"
                                label="Project Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                                outlined
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.OperatingStartDate"
                              @input="menu = false"
                              scrollable
                              :max="maxValue"
                              :min="minValue"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" sm="6">
                          <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                :value="editedItem.OperatingEndDate"
                                label="Project End Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                                outlined
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.OperatingEndDate"
                              @input="menu2 = false"
                              scrollable
                              :max="maxValue"
                              :min="minValue"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <!-- <v-col cols="12">
                          <v-select
                            v-model="editedItem.year"
                            :items="selectYear"
                            label="Fiscal year"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.amount"
                            label="Amount"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="editedItem.grantor"
                            :items="organizationSelect"
                            label="Grantor"
                            outlined
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="editedItem.grantee"
                            :items="organizationSelect"
                            label="Grantee"
                            outlined
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="editedItem.recipient"
                            :items="organizationSelect"
                            label="Recipient"
                            outlined
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.sourceType"
                            :items="fundingSource"
                            chips
                            label="Source Type"
                            multiple
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.category"
                            label="Category"
                            outlined
                          ></v-text-field>
                        </v-col> -->
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
          <template v-slot:item.DateCreated="{ item }">
            {{ item.DateCreated | dateFilter }}
          </template>
          <template v-slot:item.DateUpdated="{ item }">
            {{ item.DateUpdated | dateFilter }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { db, Timestamp } from "@/firebase";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// list
import fundingSource from "./funding-source.json";
export default Vue.extend({
  data: () => ({
    //// TODO:
    sourceTypeSelect: ["Federal", "State", "County", "City"],
    // Firestore collection
    collection: db.collection("Project"),
    organizationSelect: [{}],
    // Datepicker
    minValue: new Date(
      new Date().setFullYear(new Date().getFullYear() - 4)
    ).toISOString(),
    maxValue: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    menu: false,
    menu2: false,
    // Data Table
    isLoading: false,
    dialog: false,
    headers: [
      {
        text: "Project ID",
        align: "start",
        sortable: false,
        value: "ProjectID"
      },
      {
        text: "Project Name",
        sortable: true,
        value: "ProjectName"
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
        text: "Date Created",
        sortable: true,
        value: "DateCreated"
      },
      {
        text: "Date Updated",
        sortable: true,
        value: "DateUpdated"
      },

      { text: "Actions", value: "actions", sortable: false }
    ],
    data: [{}],
    editedIndex: -1,
    editedItem: {
      // HMIS
      ProjectID: "",
      OrganizationID: "",
      ProjectName: "",
      ProjectCommonName: null,
      OperatingStartDate: new Date().toISOString().substr(0, 10),
      OperatingEndDate: new Date().toISOString().substr(0, 10),
      ContinuumProject: 0,
      ProjectType: null,
      ResidentialAffiliation: null,
      TrackingMethod: null,
      HMISParticipatingProject: 0,
      PITCount: null,
      DateCreated: new Date(),
      DateUpdated: new Date(),
      UserID: "",
      DateDeleted: null,
      ExportID: ""
      // Custom
    },
    defaultItem: {
      // HMIS
      ProjectID: "",
      OrganizationID: "",
      ProjectName: "",
      ProjectCommonName: null,
      OperatingStartDate: new Date().toISOString().substr(0, 10),
      OperatingEndDate: new Date().toISOString().substr(0, 10),
      ContinuumProject: 0,
      ProjectType: null,
      ResidentialAffiliation: null,
      TrackingMethod: null,
      HMISParticipatingProject: 0,
      PITCount: null,
      DateCreated: new Date(),
      DateUpdated: new Date(),
      UserID: "",
      DateDeleted: null,
      ExportID: ""
      // Custom
    }
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
    fundingSource() {
      return fundingSource.select.map(item => {
        return item.text;
      });
    }
  },
  filters: {
    dateFilter: function(value: any) {
      return value ? format(value, "dd-MM-yyyy' at 'HH:mm:ss a") : "";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.isLoading = true;
    this.initialize();
    this.fetchOrganizations();
  },

  methods: {
    fetchOrganizations() {
      db.collection("organizations")
        .get()
        .then(snapshot => {
          this.organizationSelect = [];
          snapshot.forEach(doc => {
            this.organizationSelect.push(doc.data().organizationName);
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    },
    initialize() {
      this.collection
        .get()
        .then(snapshot => {
          this.data = [];
          snapshot.forEach(doc => {
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
              ResidentialAffiliation: doc.data().ResidentialAffiliation,
              TrackingMethod: doc.data().TrackingMethod,
              HMISParticipatingProject: doc.data().HMISParticipatingProject,
              PITCount: doc.data().PITCount,
              DateCreated: doc.data().DateCreated.toDate(),
              DateUpdated: doc.data().DateUpdated.toDate(),
              UserID: doc.data().UserID,
              DateDeleted: doc.data().DateDeleted,
              ExportID: doc.data().ExportID
              //
            });
          });
          this.isLoading = false;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    },

    editItem(item: any) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item: any) {
      const index: any = this.data.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.data.splice(index, 1) &&
        this.collection.doc(item.ProjectID).delete();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      const timestamp = Timestamp.fromDate(new Date());
      const firestoreData = {
        //
        OrganizationID: this.editedItem.OrganizationID,
        ProjectName: this.editedItem.ProjectName,
        ProjectCommonName: this.editedItem.ProjectCommonName,
        OperatingStartDate: parseISO(this.editedItem.OperatingStartDate),
        OperatingEndDate: parseISO(this.editedItem.OperatingEndDate),
        ContinuumProject: this.editedItem.ContinuumProject,
        ProjectType: this.editedItem.ProjectType,
        ResidentialAffiliation: this.editedItem.ResidentialAffiliation,
        TrackingMethod: this.editedItem.TrackingMethod,
        HMISParticipatingProject: this.editedItem.HMISParticipatingProject,
        PITCount: this.editedItem.PITCount,
        UserID: this.editedItem.UserID,
        DateDeleted: this.editedItem.DateDeleted,
        ExportID: this.editedItem.ExportID
        //
      };
      if (this.editedIndex > -1) {
        this.collection
          .doc(this.editedItem.ProjectID)
          .update({
            ...firestoreData,
            DateUpdated: timestamp
          })
          .then(() => {
            Object.assign(this.data[this.editedIndex], this.editedItem);
          });
      } else {
        this.collection
          .add({
            ...firestoreData,
            DateUpdated: timestamp,
            DateCreated: timestamp
          })
          .then(docRef => {
            this.collection.doc(docRef.id).update({ ProjectID: docRef.id });

            this.data.push({
              ...firestoreData,
              ProjectID: docRef.id,
              OperatingStartDate: new Date(this.editedItem.OperatingStartDate)
                .toISOString()
                .substr(0, 10),
              OperatingEndDate: new Date(this.editedItem.OperatingEndDate)
                .toISOString()
                .substr(0, 10),
              DateUpdated: timestamp.toDate(),
              DateCreated: timestamp.toDate()
            });
          });
      }
      this.close();
    }
  }
});
</script>
