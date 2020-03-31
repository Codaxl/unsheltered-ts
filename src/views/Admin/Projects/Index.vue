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
                            v-model="editedItem.projectName"
                            label="Project name"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="editedItem.organizationName"
                            :items="organizationSelect"
                            label="Organization Name"
                            outlined
                          ></v-autocomplete>
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
                                v-model="editedItem.operatingStartDate"
                                label="Project Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                                outlined
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.operatingStartDate"
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
                                :value="editedItem.operatingEndDate"
                                label="Project End Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                                outlined
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.operatingEndDate"
                              @input="menu2 = false"
                              scrollable
                              :max="maxValue"
                              :min="minValue"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12">
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
                          <v-text-field
                            v-model="editedItem.grantee"
                            label="Grantee"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.recipient"
                            label="Recipient"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.subrecipient"
                            label="Subrecipient"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.sourceType"
                            :items="sourceTypeSelect"
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
import { db } from "@/firebase";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default Vue.extend({
  data: () => ({
    //// TODO:
    sourceTypeSelect: ["Federal", "State", "County", "City"],
    // Firestore collection
    collection: db.collection("projects"),
    organizationSelect: [{}],
    // Date filter
    pattern: "yyyy-MM-dd",
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
        text: "ID",
        align: "start",
        sortable: true,
        value: "id"
      },
      {
        text: "Amount",
        sortable: true,
        value: "amount"
      },
      {
        text: "Project Name",
        sortable: true,
        value: "projectName"
      },
      {
        text: "Organization Name",
        sortable: true,
        value: "organizationName"
      },
      {
        text: "Project Start Date",
        value: "operatingStartDate",
        sortable: true
      },
      { text: "Project End Date", value: "operatingEndDate", sortable: true },
      { text: "Actions", value: "actions", sortable: false }
    ],
    data: [{}],
    editedIndex: -1,
    editedItem: {
      id: "",
      amount: "",
      grantee: "",
      recipient: "",
      subrecipient: "",
      sourceType: [],
      year: 2020,
      category: "",
      projectName: "",
      organizationName: "",
      operatingStartDate: new Date().toISOString().substr(0, 10),
      operatingEndDate: new Date().toISOString().substr(0, 10)
    },
    defaultItem: {
      id: "",
      amount: "",
      grantee: "",
      recipient: "",
      subrecipient: "",
      sourceType: [{}],
      year: 2020,
      category: "",
      projectName: "",
      organizationName: "",
      operatingStartDate: new Date().toISOString().substr(0, 10),
      operatingEndDate: new Date().toISOString().substr(0, 10)
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
              id: doc.id,
              amount: doc.data().amount,
              grantee: doc.data().grantee,
              recipient: doc.data().recipient,
              subrecipient: doc.data().subrecipient,
              sourceType: doc.data().sourceType,
              year: doc.data().year,
              category: doc.data().category,
              projectName: doc.data().projectName,
              organizationName: doc.data().projectName,
              operatingStartDate: format(
                doc.data().operatingStartDate.toDate(),
                this.pattern
              ),
              operatingEndDate: format(
                doc.data().operatingEndDate.toDate(),
                this.pattern
              )
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
        this.collection.doc(item.id).delete();
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      const firestoreData = {
        amount: this.editedItem.amount,
        grantee: this.editedItem.grantee,
        recipient: this.editedItem.recipient,
        subrecipient: this.editedItem.subrecipient,
        sourceType: this.editedItem.sourceType,
        year: this.editedItem.year,
        category: this.editedItem.category,
        projectName: this.editedItem.projectName,
        organizationName: this.editedItem.organizationName,
        operatingStartDate: parseISO(this.editedItem.operatingStartDate),
        operatingEndDate: parseISO(this.editedItem.operatingEndDate)
      };
      if (this.editedIndex > -1) {
        this.collection
          .doc(this.editedItem.id)
          .update(firestoreData)
          .then(() => {
            Object.assign(this.data[this.editedIndex], this.editedItem);
          });
      } else {
        this.collection.add(firestoreData).then(docRef => {
          this.data.push({
            id: docRef.id,
            amount: this.editedItem.amount,
            grantee: this.editedItem.grantee,
            recipient: this.editedItem.recipient,
            subrecipient: this.editedItem.subrecipient,
            sourceType: this.editedItem.sourceType,
            year: this.editedItem.year,
            category: this.editedItem.category,
            projectName: this.editedItem.projectName,
            organizationName: this.editedItem.organizationName,
            operatingStartDate: new Date(this.editedItem.operatingStartDate)
              .toISOString()
              .substr(0, 10),
            operatingEndDate: new Date(this.editedItem.operatingEndDate)
              .toISOString()
              .substr(0, 10)
          });
        });
      }
      this.close();
    }
  }
});
</script>
