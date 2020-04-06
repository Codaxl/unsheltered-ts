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
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="FunderID"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Funders</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn dark small color="pink" fab v-on="on">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="save">Save</v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-card-text>
                    <v-container style="max-width:1080px;">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.GrantID"
                            label="Grant ID"
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-autocomplete
                            v-model="editedItem.Funder"
                            :items="fundingSource"
                            :value="fundingSource.value"
                            label="Funder"
                            outlined
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.FunderOther"
                            label="Other"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.Amount"
                            label="Amount"
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
                                v-model="editedItem.StartDate"
                                label="Funder Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                                outlined
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.StartDate"
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
                                :value="editedItem.EndDate"
                                label="Funder End Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                                outlined
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.EndDate"
                              @input="menu2 = false"
                              scrollable
                              :max="maxValue"
                              :min="minValue"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="editedItem.ProjectID"
                            :items="projectSelect"
                            :value="projectSelect.ProjectID"
                            label="Add Project"
                            outlined
                          ></v-autocomplete>
                        </v-col>
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
          <template v-slot:item.Funder="{ item }">
            {{ item.Funder | toTextFunder }}
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
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-container>
                <v-row no-gutters>
                  <v-col cols="12" md="4">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <div>
                          <b>Funder ID:</b>
                          {{ item.FunderID }}
                        </div>
                        <div>
                          <b>Project Name:</b>
                          {{ item.ProjectID | toTextProjectID(projectSelect) }}
                        </div>
                        <div>
                          <b>Project ID:</b>
                          {{ item.ProjectID }}
                        </div>
                        <div>
                          <b>Funder Other:</b>
                          {{ item.FunderOther }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <div>
                          <b>Amount:</b>
                          {{ item.Amount | currency }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <div>
                          <b>Date Created:</b>
                          {{ item.DateCreated | dateFilter }}
                        </div>

                        <div>
                          <b>Date Updated:</b>
                          {{ item.DateUpdated | dateFilter }}
                        </div>

                        <div><b>User ID:</b> {{ item.UserID }}</div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
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
import { db, Timestamp, FieldValue } from "@/firebase";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
// lists
import FundingSource from "./funding-source";

export default Vue.extend({
  data: () => ({
    //// TODO:
    fundingSource: FundingSource,
    // Firestore collection
    collection: db.collection("Funder"),
    projectSelect: [{}],
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
    expanded: [],
    singleExpand: true,
    headers: [
      {
        text: "Funder",
        align: "start",
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

      { text: "Actions", value: "actions", sortable: false }
    ],
    data: [{}],
    editedIndex: -1,
    editedItem: {
      // HMIS
      FunderID: "",
      ProjectID: "",
      Funder: 0,
      FunderOther: "",
      GrantID: "",
      StartDate: new Date().toISOString().substr(0, 10),
      EndDate: new Date().toISOString().substr(0, 10),
      DateCreated: new Date(),
      DateUpdated: new Date(),
      UserID: "",
      // Custom
      Amount: ""
    },
    defaultItem: {
      // HMIS
      FunderID: "",
      ProjectID: "",
      Funder: 0,
      FunderOther: "",
      GrantID: "",
      StartDate: new Date().toISOString().substr(0, 10),
      EndDate: new Date().toISOString().substr(0, 10),
      DateCreated: new Date(),
      DateUpdated: new Date(),
      UserID: "",
      // Custom
      Amount: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Funder" : "Edit Funder";
    },
    userId(): string {
      return UserStore.user.id;
    }
  },
  filters: {
    dateFilter: function(value: any) {
      return value ? format(value, "yyyy-MM-dd' at 'HH:mm:ss a") : "";
    },
    toTextFunder: function(item: number) {
      const idArr = [item];
      const objArr = FundingSource;
      const idValueMap: any = objArr.reduce(
        (acc, { value, text }) => ({ ...acc, [value]: text }),
        {}
      );
      const output = idArr.map(value => idValueMap[value]);
      return output.toString();
    },
    //https://stackoverflow.com/questions/42828664/access-vue-instance-data-inside-filter-method
    toTextProjectID: function(item: number, projectSelect: Array<any>) {
      const idArr = [item];
      const objArr = projectSelect;
      const idValueMap: any = objArr.reduce(
        (acc, { value, text }) => ({ ...acc, [value]: text }),
        {}
      );
      const output = idArr.map(value => idValueMap[value]);
      return output.toString();
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
    this.fetchOrganization();
  },
  methods: {
    fetchOrganization() {
      db.collection("Project")
        .get()
        .then(snapshot => {
          this.projectSelect = [];
          snapshot.forEach(doc => {
            this.projectSelect.push({
              value: doc.data().ProjectID,
              text: doc.data().ProjectName
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
            FunderID: doc.id,
            ProjectID: doc.data().ProjectID,
            Funder: doc.data().Funder,
            FunderOther: doc.data().FunderOther,
            GrantID: doc.data().GrantID,
            StartDate: format(doc.data().StartDate.toDate(), "yyyy-MM-dd"),
            EndDate: format(doc.data().EndDate.toDate(), "yyyy-MM-dd"),
            DateCreated: doc.data().DateCreated.toDate(),
            DateUpdated: doc.data().DateUpdated.toDate(),
            UserID: doc.data().UserID,
            //
            Amount: doc.data().Amount
          });
        });
        this.isLoading = false;
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
        this.collection.doc(item.FunderID).delete();
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
        ProjectID: this.editedItem.ProjectID,
        Funder: this.editedItem.Funder,
        FunderOther: this.editedItem.FunderOther,
        GrantID: this.editedItem.GrantID,
        StartDate: parseISO(this.editedItem.StartDate),
        EndDate: parseISO(this.editedItem.EndDate),
        DateUpdated: timestamp,
        UserID: this.userId,
        //
        Amount: this.editedItem.Amount
      };
      if (this.editedIndex > -1) {
        this.collection
          .doc(this.editedItem.FunderID)
          .update({
            ...firestoreData
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.collection
          .add({
            ...firestoreData,
            DateCreated: timestamp
          })
          .then(docRef => {
            this.collection.doc(docRef.id).update({ FunderID: docRef.id });
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.close();
    }
  }
});
</script>
