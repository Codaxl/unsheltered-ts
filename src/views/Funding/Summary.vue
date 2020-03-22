<template>
  <div id="Events">
    <v-container style="max-width:1080px;">
      <div>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      </div>
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Funds</v-toolbar-title>

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
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Dessert name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.calories"
                          label="Calories"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fat"
                          label="Fat (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.carbs"
                          label="Carbs (g)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.protein"
                          label="Protein (g)"
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
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
// Vuex
import { getModule } from "vuex-module-decorators";
import FundStore from "@/store/funds/funds-store";
const fundStoreState = getModule(FundStore);
// DATA
import { StatsDataServices } from "./FirestoreDataServices";

@Component({})
export default class FundingSummary extends Vue {
  private dialog = false;
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
      href: "/funding/"
    },
    {
      text: "Funding",
      disabled: true,
      href: "/funding/"
    }
  ];

  private headers: Array<object> = [
    {
      text: "Dessert (100g serving)",
      align: "left",
      sortable: false,
      value: "name"
    },
    { text: "Calories", value: "calories" },
    { text: "Fat (g)", value: "fat" },
    { text: "Carbs (g)", value: "carbs" },
    { text: "Protein (g)", value: "protein" },
    { text: "Actions", value: "action", sortable: false }
  ];
  private desserts: Array<object> = [];
  private editedIndex = -1;
  private editedItem: Array<object> = [
    {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  ];
  private defaultItem: Array<object> = [
    {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  ];

  private orgCount = [];
  public isLoading = false;
  private years: string[] = ["2020", "2019", "2018"];
  private e1 = "2020";
  private organizations: string[] = [
    "Lighthouse Social Service Center",
    "Housing Authority",
    "Operation SafeHouse"
  ];
  private e2 = "";
  private grants: string[] = ["HUD:CoC", "HEAP"];
  private e3 = "";
  private sources: string[] = ["Federal", "State", "County", "City"];
  private e4 = "";

  private stats: any = [];
  private componentKey = 0;

  created() {
    this.loadStats();
  }
  private loadStats() {
    this.isLoading = true;
    const statsDataService = new StatsDataServices();
    fundStoreState.setYearFilter(this.e1);
    fundStoreState.setOrgFilter(this.e2);
    fundStoreState.setGrantFilter(this.e3);
    fundStoreState.setSourceFilter(this.e4);
    statsDataService
      .GetAll(
        fundStoreState.yearFilter,
        fundStoreState.orgFilter,
        fundStoreState.grantFilter,
        fundStoreState.sourceFilter
      )
      .then((data: any) => {
        this.stats = data;
        this.isLoading = false;
        this.componentKey += 1;
      });
  }
  get formTitle(): string {
    return this.editedIndex === -1 ? "New Item" : "Edit Item";
  }

  private editItem(item: any) {
    this.editedIndex = this.desserts.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }

  private deleteItem(item: any) {
    const index = this.desserts.indexOf(item);
    confirm("Are you sure you want to delete this item?") &&
      this.desserts.splice(index, 1);
  }

  private close() {
    this.dialog = false;
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    }, 300);
  }

  private save() {
    if (this.editedIndex > -1) {
      Object.assign(this.desserts[this.editedIndex], this.editedItem);
    } else {
      this.desserts.push(this.editedItem);
    }
    this.close();
  }
}
</script>
<style></style>
