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
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on"
                    >New Item</v-btn
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
                              :max="
                                new Date(
                                  new Date().setFullYear(
                                    new Date().getFullYear() + 1
                                  )
                                ).toISOString()
                              "
                              :min="
                                new Date(
                                  new Date().setFullYear(
                                    new Date().getFullYear() - 4
                                  )
                                ).toISOString()
                              "
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
                                v-model="editedItem.operatingEndDate"
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
                              :max="
                                new Date(
                                  new Date().setFullYear(
                                    new Date().getFullYear() + 1
                                  )
                                ).toISOString()
                              "
                              :min="
                                new Date(
                                  new Date().setFullYear(
                                    new Date().getFullYear() - 4
                                  )
                                ).toISOString()
                              "
                            ></v-date-picker>
                          </v-menu>
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

interface Project {
  id: string;
  projectName: string;
  operatingStartDate: Date;
  operatingEndDate: Date;
}

export default Vue.extend({
  data: () => ({
    isLoading: false,
    dialog: false,
    headers: [
      {
        text: "Project Name",
        align: "start",
        sortable: true,
        value: "projectName"
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
      projectName: "",
      operatingStartDate: new Date().toISOString().substr(0, 10),
      operatingEndDate: new Date().toISOString().substr(0, 10)
    },
    defaultItem: {
      id: "",
      projectName: "",
      operatingStartDate: new Date().toISOString().substr(0, 10),
      operatingEndDate: new Date().toISOString().substr(0, 10)
    },
    // Datepicker
    menu: false,
    menu2: false
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Project" : "Edit Project";
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
    async initialize() {
      const ref = db.collection("cities");
      ref
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.data.push({
              id: doc.id,
              projectName: doc.data().projectName,
              operatingStartDate: doc.data().operatingStartDate,
              operatingEndDate: doc.data().operatingEndDate
            });
          });
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
      const index: number = this.data.indexOf(item);
      console.log(this.data.indexOf(item));
      confirm("Are you sure you want to delete this item?") &&
        db
          .collection("projects")
          .doc("test")
          .delete();
      //
      console.log(this.data[index]);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
        console.log(this.editedItem);
      }
      this.close();
    }
  }
});
</script>
