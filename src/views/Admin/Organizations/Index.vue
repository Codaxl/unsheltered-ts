<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <v-data-table
          :loading="isLoading"
          :headers="headers"
          :items="data"
          :sort-by="['OrganizationName']"
          :sort-desc="[false]"
          :items-per-page="5"
          multi-sort
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="OrganizationID"
          show-expand
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Organizations</v-toolbar-title>
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
                            v-model="editedItem.OrganizationName"
                            label="Organization name"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.OrganizationCommonName"
                            label="Organization Common Name"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.VictimServicesProvider"
                            :items="noYes"
                            :value="noYes.value"
                            label="Victim Services Provider"
                            outlined
                          ></v-select>
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
          <template v-slot:item.VictimServicesProvider="{ item }">
            {{ item.VictimServicesProvider | toText(noYes) }}
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
                      <v-col cols="12"> </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row no-gutters>
                      <v-col cols="12"> </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <div>
                          <b>Organization ID:</b>
                          {{ item.OrganizationID }}
                        </div>
                        <div><b>User ID:</b> {{ item.UserID }}</div>
                        <div>
                          <b>Date Created:</b>
                          {{ item.DateCreated | dateFilter }}
                        </div>
                        <div>
                          <b>Date Updated:</b>
                          {{ item.DateUpdated | dateFilter }}
                        </div>
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
import { db, Timestamp } from "@/firebase";
import format from "date-fns/format";
// lists
import NoYes from "./no-yes";

export default Vue.extend({
  data: () => ({
    //// TODO:
    noYes: NoYes,
    // Firestore collection
    collection: db.collection("Organization"),
    // Data Table
    isLoading: false,
    dialog: false,
    expanded: [],
    singleExpand: true,
    headers: [
      {
        text: "Organization Name",
        align: "start",
        sortable: true,
        value: "OrganizationName"
      },
      {
        text: "Victim Services Provider",
        sortable: true,
        value: "VictimServicesProvider"
      },
      { text: "Actions", value: "actions", sortable: false }
    ],
    data: [{}],
    editedIndex: -1,
    editedItem: {
      // HMIS
      OrganizationID: "",
      OrganizationName: "",
      OrganizationCommonName: "",
      VictimServicesProvider: 0,
      DateCreated: new Date(),
      DateUpdated: new Date(),
      UserID: ""
      // Custom
    },
    defaultItem: {
      // HMIS
      OrganizationID: "",
      OrganizationName: "",
      OrganizationCommonName: "",
      VictimServicesProvider: 0,
      DateCreated: new Date(),
      DateUpdated: new Date(),
      UserID: ""
      // Custom
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Organization" : "Edit Organization";
    },
    userId(): string {
      return UserStore.user.id;
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
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.isLoading = true;
      this.collection.onSnapshot(querySnapshot => {
        this.data = [];
        querySnapshot.forEach(doc => {
          this.data.push({
            //
            OrganizationID: doc.id,
            OrganizationName: doc.data().OrganizationName,
            OrganizationCommonName: doc.data().OrganizationCommonName,
            VictimServicesProvider: doc.data().VictimServicesProvider,
            DateCreated: doc.data().DateCreated.toDate(),
            DateUpdated: doc.data().DateUpdated.toDate(),
            UserID: doc.data().UserID
            //
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
        this.collection.doc(item.OrganizationID).delete();
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
        OrganizationName: this.editedItem.OrganizationName,
        OrganizationCommonName: this.editedItem.OrganizationCommonName,
        VictimServicesProvider: this.editedItem.VictimServicesProvider,
        DateUpdated: timestamp,
        UserID: this.userId
        //
      };
      if (this.editedIndex > -1) {
        this.collection
          .doc(this.editedItem.OrganizationID)
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
            this.collection
              .doc(docRef.id)
              .update({ OrganizationID: docRef.id });
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
