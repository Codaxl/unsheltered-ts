<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="projectStartDate"
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
                            v-model="editedItem.name"
                            label="Dessert name"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="date"
                                label="Picker in menu"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                                outlined
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date"
                              no-title
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
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date2)"
                                >OK</v-btn
                              >
                            </v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" sm="6">
                          <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="date2"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="date2"
                                label="Picker in menu"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                                outlined
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date2"
                              no-title
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
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                                >OK</v-btn
                              >
                            </v-date-picker>
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

export default Vue.extend({
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Project Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Project Start Date", value: "projectStartDate" },
      { text: "Project End Date", value: "projectEndDate" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [{}],
    editedIndex: -1,
    editedItem: {
      name: "",
      projectStartDate: new Date().toISOString().substr(0, 10),
      projectEndDate: new Date().toISOString().substr(0, 10)
    },
    defaultItem: {
      name: "",
      projectStartDate: new Date().toISOString().substr(0, 10),
      projectEndDate: new Date().toISOString().substr(0, 10)
    },
    // Datepicker
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    date2: new Date().toISOString().substr(0, 10),
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
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          projectStartDate: new Date().toISOString().substr(0, 10),
          projectEndDate: new Date().toISOString().substr(0, 10)
        },
        {
          name: "Ice cream sandwich",
          projectStartDate: "2020-03-29",
          projectEndDate: new Date().toISOString().substr(0, 10)
        },
        {
          name: "Eclair",
          projectStartDate: "2020-03-28",
          projectEndDate: new Date().toISOString().substr(0, 10)
        },
        {
          name: "Cupcake",
          projectStartDate: "2020-03-27",
          projectEndDate: new Date().toISOString().substr(0, 10)
        },
        {
          name: "Gingerbread",
          projectStartDate: "2020-03-26",
          projectEndDate: new Date().toISOString().substr(0, 10)
        },
        {
          name: "Jelly bean",
          projectStartDate: "2020-03-25",
          projectEndDate: new Date().toISOString().substr(0, 10)
        },
        {
          name: "Lollipop",
          projectStartDate: "2020-03-24",
          projectEndDate: new Date().toISOString().substr(0, 10)
        },
        {
          name: "Honeycomb",
          projectStartDate: "2020-03-23",
          projectEndDate: new Date().toISOString().substr(0, 10)
        },
        {
          name: "Donut",
          projectStartDate: "2020-03-22",
          projectEndDate: new Date().toISOString().substr(0, 10)
        },
        {
          name: "KitKat",
          projectStartDate: "2020-03-21",
          projectEndDate: new Date().toISOString().substr(0, 10)
        }
      ];
    },

    editItem(item: any) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item: any) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
});
</script>
