<template>
  <v-container style="max-width:1080px;">
    <section>
      <div>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      </div>
      <section>
        <div>
          <h1 class="display-1 font-weight-light my-8">
            Homeless Emergency Aid Program (HEAP)
          </h1>
        </div>
      </section>
      <section>
        <div>
          <v-row>
            <v-col cols="12" sm="8">
              <section>
                <div>
                  <v-card>
                    <v-card-title>
                      <h2 class="headline">Overview</h2>
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table
                      :headers="heapHeaders"
                      :items="heap"
                      hide-default-footer
                    >
                      <template v-slot:item.amount="{ item }">
                        {{ item.amount | currency }}
                      </template>
                    </v-data-table>
                    <v-card-text class="body-1 my-5">
                      <p>
                        Roune 1 Standard Distribution of Funds Began Apr 2019.
                        Round 2 Standard Distribution of Funds Began July 2019.
                        100 percent of the funds must be expended by June 30,
                        2021.
                      </p>

                      <p class="caption">
                        Source:
                        https://www.bcsh.ca.gov/hcfc/documents/heap_overview.pdf
                      </p>
                    </v-card-text>
                  </v-card>
                </div>
              </section>
            </v-col>
            <v-col cols="12" sm="4">
              <div v-for="item in contact" :key="item.name">
                <v-card class="mx-auto">
                  <v-card-title>
                    <h2 class="headline">{{ item.name }}</h2>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        Name:
                      </v-col>
                      <v-col cols="6">
                        {{ item.firstName }} {{ item.lastName }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        Title:
                      </v-col>
                      <v-col cols="6">
                        {{ item.title }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        Organization:
                      </v-col>
                      <v-col cols="6">
                        {{ item.organization }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        Email:
                      </v-col>
                      <v-col cols="6">
                        {{ item.email }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        Phone:
                      </v-col>
                      <v-col cols="6">
                        {{ item.phone }}
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </div>
      </section>
      <section>
        <div>
          <h2 class="font-weight-regular mt-5">
            About
          </h2>
        </div>
        <div>
          <v-row>
            <v-col cols="12">
              <section>
                <div class="body-1 mb-5">
                  <p>
                    The Homeless Emergency Aid Program was established by
                    statute to provide localities with flexible block grant
                    funds to address their immediate homelessness challenges.
                    The Homeless Emergency Aid Block Grants will provide $500
                    million in one-time funding to enable local governments to
                    respond to homelessness. Allocations are as follows: $250
                    million to Continuums of Care based on 2017 homeless point
                    in time count; $150 million direct allocation to a city or
                    city that is also a county with a population of 330,000 or
                    more as of January 1, 2018; and $100 million to Continuums
                    of Care based on their percentage of the statewide 2017
                    homeless population.
                  </p>
                  <h3 class="font-weight-regular mt-5">Requirements</h3>
                  <p>
                    City, county, or joint power must declared an emergency
                    shelter crisis (waiver process for smaller cities and
                    counties that do not declare a shelter emergency). Continuum
                    of Care must demonstrate collaboration with other city,
                    county, or nonprofit partners.
                  </p>
                  <h3 class="font-weight-regular mt-5">Eligible Activities</h3>
                  <p>
                    Emergency housing vouchers Rapid rehousing Emergency shelter
                    construction, and Use of armories to provide temporary
                    shelters, among other activities.
                  </p>
                  <div class="caption my-5">
                    Source: https://www.bcsh.ca.gov/hcfc/aid_program.html
                  </div>
                </div>
              </section>
            </v-col>
          </v-row>
        </div>
      </section>
      <section>
        <div>
          <v-row>
            <v-col cols="12" sm="6">
              <div v-for="item in budget" :key="item.name">
                <v-card>
                  <v-card-title>
                    <h3 class="font-weight-regular">{{ item.name }}</h3>
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        Services:
                      </v-col>
                      <v-col cols="6">
                        {{ item.budget1 | currency }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        Rental Assistance or Subsidies:
                      </v-col>
                      <v-col cols="6">
                        {{ item.budget2 | currency }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        Capital Improvements:
                      </v-col>
                      <v-col cols="6">
                        {{ item.budget3 | currency }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        Homeless Youth Set-Aside:
                      </v-col>
                      <v-col cols="6">
                        {{ item.budget4 | currency }}
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        Administrative Costs:
                      </v-col>
                      <v-col cols="6">
                        {{ item.budget5 | currency }}
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text class="font-weight-medium">
                    <v-row>
                      <v-col cols="6">
                        Total:
                      </v-col>
                      <v-col cols="6">
                        {{ item.total | currency }}
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card>
                <budget-pie></budget-pie>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <section>
                <div>
                  <v-card>
                    <v-card-title>
                      <h3 class="font-weight-regular">Budget Details</h3>
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table
                      :headers="headers"
                      :items="desserts"
                      item-key="id"
                      group-by="category"
                      show-group-by
                    >
                      <template v-slot:item.amount="{ item }">
                        {{ item.amount | currency }}
                      </template>
                    </v-data-table>
                  </v-card>
                </div>
              </section>
            </v-col>
          </v-row>
        </div>
      </section>
      <section>
        <div>
          <h2 class="font-weight-regular mt-5">
            Homeless Management Information System (HMIS)
          </h2>
          <div class="body-1 mb-5">
            <p>
              HMIS participation is a statutory requirement for recipients and
              subrecipients of the the Homeless Emergency Aid Program.
            </p>
          </div>
        </div>
        <section>
          <div>
            <h3 class="font-weight-regular mt-5">
              Projects
            </h3>
            <div class="body-1 mb-5">
              <p>
                The County of Riverside Dept of Public Social Services
                administrates the Homeless Emergency Aid Program.
              </p>
            </div>
          </div>
        </section>
      </section>
    </section>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import BudgetPie from "../components/BudgetPie.vue";

@Component({
  components: { BudgetPie }
})
export default class Heap extends Vue {
  private model = null;
  private breadcrumbs: Array<object> = [
    {
      text: "Home",
      disabled: false,
      href: "/"
    },
    {
      text: "Funding",
      disabled: false,
      href: "/funding"
    },
    {
      text: "State",
      disabled: false,
      href: "/funding/state"
    },
    {
      text: "HEAP",
      disabled: true,
      href: "/funding/state/heap"
    }
  ];
  private heapHeaders: Array<object> = [
    {
      text: "Contract Number",
      align: "start",
      sortable: false,
      value: "contractNumber"
    },
    { text: "Amount", sortable: false, value: "amount" },
    { text: "Grantee Name", sortable: false, value: "granteeName" },
    { text: "Address", sortable: false, value: "address" },
    { text: "City", sortable: false, value: "city" },
    { text: "State", sortable: false, value: "state" },
    { text: "Zipcode", sortable: false, value: "zipCode" }
  ];
  private heap: Array<object> = [
    {
      amount: 9791805.06,
      contractNumber: "18-HEAP-00052",
      granteeName: "County of Riverside Dept of Public Social Services",
      address: "1111 Spruce Street",
      city: "Riverside",
      state: "CA",
      zipCode: "92507"
    }
  ];
  private budgetPerPage = 1;
  private budget: Array<object> = [
    {
      name: "Budget Summary",
      budget1: 2841715.88,
      budget2: 1629988.57,
      budget3: 4340920.36,
      budget4: 489590.25,
      budget5: 489590.0,
      total: 9791805.06
    }
  ];
  private headers: Array<object> = [
    {
      text: "Name",
      align: "start",
      value: "name"
    },
    { text: "Category", value: "category" },
    { text: "Amount", value: "amount" }
  ];
  private desserts: Array<object> = [
    {
      id: 1,
      name: "Cathedral City",
      category: "Capital Improvements",
      amount: 194138.92
    },
    {
      id: 2,
      name: "City of Hemet",
      category: "Capital Improvements",
      amount: 105006.24
    },
    {
      id: 3,
      name: "City of Riverside",
      category: "Capital Improvements",
      amount: 1500000.0
    },
    {
      id: 4,
      name: "County of Riverside",
      category: "Capital Improvements",
      amount: 298402.0
    },
    {
      id: 5,
      name: "City of Choachella",
      category: "Services",
      amount: 132128.99
    },
    {
      id: 6,
      name: "City of Desert Hot Springs",
      category: "Services",
      amount: 181005.6
    },
    {
      id: 7,
      name: "City of Hemet",
      category: "Services",
      amount: 105006.24
    },
    {
      id: 8,
      name: "City of Indian Wells",
      category: "Services",
      amount: 198193.48
    },
    {
      id: 9,
      name: "City of Jurupa Valley",
      category: "Services",
      amount: 110313.37
    },
    {
      id: 10,
      name: "City of Lake Elsinore",
      category: "Services",
      amount: 194347.11
    },
    {
      id: 11,
      name: "City of La Quinta",
      category: "Services",
      amount: 198193.48
    },
    {
      id: 12,
      name: "City of Palm Desert",
      category: "Services",
      amount: 198193.48
    },
    {
      id: 13,
      name: "City of Palm Springs",
      category: "Services",
      amount: 198193.48
    },
    {
      id: 14,
      name: "City of Perris",
      category: "Services",
      amount: 134751.92
    },
    {
      id: 15,
      name: "City of Rancho Mirage",
      category: "Services",
      amount: 198193.48
    },
    {
      id: 16,
      name: "City of Riverside",
      category: "Services",
      amount: 145177.5
    },
    {
      id: 17,
      name: "City of Wildomar",
      category: "Services",
      amount: 194347.11
    },
    {
      id: 18,
      name: "County of Riverside",
      category: "Services",
      amount: 298401.99
    },
    {
      id: 19,
      name: "City of Blythe",
      category: "Rental Assistance or Subsidies",
      amount: 362411.34
    },
    {
      id: 20,
      name: "Cathedral City",
      category: "Rental Assistance or Subsidies",
      amount: 388277.82
    },
    {
      id: 21,
      name: "City of Choachella",
      category: "Rental Assistance or Subsidies",
      amount: 132128.99
    },
    {
      id: 22,
      name: "City of Desert Hot Springs",
      category: "Rental Assistance or Subsidies",
      amount: 181005.6
    },
    {
      id: 23,
      name: "City of Hemet",
      category: "Rental Assistance or Subsidies",
      amount: 105006.24
    },
    {
      id: 24,
      name: "City of Indian Wells",
      category: "Rental Assistance or Subsidies",
      amount: 198193.48
    },
    {
      id: 25,
      name: "City of Indio",
      category: "Rental Assistance or Subsidies",
      amount: 336769.32
    },
    {
      id: 26,
      name: "City of Jurupa Valley",
      category: "Rental Assistance or Subsidies",
      amount: 110313.38
    },
    {
      id: 27,
      name: "City of Lake Elsinore",
      category: "Rental Assistance or Subsidies",
      amount: 194347.11
    },
    {
      id: 28,
      name: "City of La Quinta",
      category: "Rental Assistance or Subsidies",
      amount: 198193.48
    },
    {
      id: 29,
      name: "City of Palm Desert",
      category: "Rental Assistance or Subsidies",
      amount: 198193.48
    },
    {
      id: 30,
      name: "City of Palm Springs",
      category: "Rental Assistance or Subsidies",
      amount: 198193.48
    },
    {
      id: 31,
      name: "City of Rancho Mirage",
      category: "Rental Assistance or Subsidies",
      amount: 198193.48
    },
    {
      id: 32,
      name: "City of Riverside",
      category: "Rental Assistance or Subsidies",
      amount: 245177.96
    },
    {
      id: 33,
      name: "City of Wildomar",
      category: "Rental Assistance or Subsidies",
      amount: 194347.11
    },
    {
      id: 34,
      name: "County of Riverside",
      category: "Rental Assistance or Subsidies",
      amount: 298401.99
    },
    {
      id: 35,
      name: "Cathedral City",
      category: "Homeless Youth Set-Aside",
      amount: 194138.91
    },
    {
      id: 36,
      name: "City of Coachella",
      category: "Homeless Youth Set-Aside",
      amount: 132128.98
    },
    {
      id: 37,
      name: "City of Desert Hot Springs",
      category: "Homeless Youth Set-Aside",
      amount: 181005.59
    },
    {
      id: 38,
      name: "City of Hemet",
      category: "Homeless Youth Set-Aside",
      amount: 105006.23
    },
    {
      id: 39,
      name: "City of Riverside",
      category: "Homeless Youth Set-Aside",
      amount: 100000.0
    },
    {
      id: 40,
      name: "County of Riverside",
      category: "Homeless Youth Set-Aside",
      amount: 298401.99
    },
    {
      id: 42,
      name: "County of Riverside",
      category: "Administrative Costs",
      amount: 489590.06
    },
    {
      id: 43,
      name: "City of Indio",
      category: "Other (Short-term Housing Interventions)",
      amount: 168384.65
    }
  ];
  private contact: Array<object> = [
    {
      name: "Contact",
      firstName: "Elizabeth",
      lastName: "Hernandez",
      title: "Senior Program Specialist",
      organization: "Public Social Services",
      email: "ehernan@rivco.org",
      phone: "(951) 999-9999"
    }
  ];
}
</script>
<style></style>
