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
          <h2 class="font-weight-regular mt-5">
            Overview
          </h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Contract Number</th>
                  <th class="text-left">Amount</th>
                  <th class="text-left">Grantee Name</th>
                  <th class="text-left">Address</th>
                  <th class="text-left">
                    City
                  </th>
                  <th class="text-left">
                    State
                  </th>
                  <th class="text-left">
                    ZIP Code
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in heap" :key="item.name">
                  <td>{{ item.contractNumber }}</td>
                  <td>{{ item.amount | currency }}</td>
                  <td>{{ item.granteeName }}</td>
                  <td>{{ item.address }}</td>
                  <td>{{ item.city }}</td>
                  <td>{{ item.state }}</td>
                  <td>{{ item.zipCode }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <div class="caption my-5">
            Source: https://www.bcsh.ca.gov/hcfc/documents/heap_overview.pdf
          </div>
          <p>
            Roune 1 Standard Distribution of Funds Began Apr 2019. Round 2
            Standard Distribution of Funds Began July 2019. 100 percent of the
            funds must be expended by June 30, 2021.
          </p>
        </div>
      </section>
      <section>
        <div>
          <h2 class="font-weight-regular mt-5">
            About
          </h2>
          <div class="body-1 mb-5">
            <p>
              The Homeless Emergency Aid Program was established by statute to
              provide localities with flexible block grant funds to address
              their immediate homelessness challenges. The Homeless Emergency
              Aid Block Grants will provide $500 million in one-time funding to
              enable local governments to respond to homelessness. Allocations
              are as follows: $250 million to Continuums of Care based on 2017
              homeless point in time count; $150 million direct allocation to a
              city or city that is also a county with a population of 330,000 or
              more as of January 1, 2018; and $100 million to Continuums of Care
              based on their percentage of the statewide 2017 homeless
              population.
            </p>
            <p>
              <b>Requirements:</b> City, county, or joint power must declared an
              emergency shelter crisis (waiver process for smaller cities and
              counties that do not declare a shelter emergency). Continuum of
              Care must demonstrate collaboration with other city, county, or
              nonprofit partners.
            </p>
            <p>
              <b>Eligible Activities:</b> Emergency housing vouchers Rapid
              rehousing Emergency shelter construction, and Use of armories to
              provide temporary shelters, among other activities.
            </p>
            <p>
              <b>Contractor:</b> The County of Riverside Dept of Public Social
              Services administrates the Homeless Emergency Aid Program.
            </p>
            <div class="caption my-5">
              Source: https://www.bcsh.ca.gov/hcfc/aid_program.html
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <v-data-iterator
            :items="budget"
            :items-per-page.sync="budgetPerPage"
            hide-default-footer
          >
            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.name"
                  cols="12"
                  sm="6"
                >
                  <v-card>
                    <v-card-title class="subheading font-weight-bold">{{
                      item.name
                    }}</v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>Services:</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          item.budget1 | currency
                        }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content
                          >Rental Assistance or Subsidies:</v-list-item-content
                        >
                        <v-list-item-content class="align-end">{{
                          item.budget2 | currency
                        }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content
                          >Capital Improvements:</v-list-item-content
                        >
                        <v-list-item-content class="align-end">{{
                          item.budget3 | currency
                        }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content
                          >Homeless Youth Set-Aside:</v-list-item-content
                        >
                        <v-list-item-content class="align-end">{{
                          item.budget4 | currency
                        }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content
                          >Administrative Costs:</v-list-item-content
                        >
                        <v-list-item-content class="align-end">{{
                          item.budget5 | currency
                        }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>Total:</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          item.total | currency
                        }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card>
                    <budget-pie></budget-pie>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </div>
      </section>
      <section>
        <div>
          <h2 class="font-weight-regular mt-5">
            Budget Details
          </h2>
          <div class="body-1 mb-5">
            <p>
              The County of Riverside Dept of Public Social Services
              administrates the Homeless Emergency Aid Program.
            </p>
          </div>
          <div class="my-5">
            <v-data-table
              :headers="headers"
              :items="desserts"
              item-key="id"
              group-by="category"
              class="elevation-1"
              show-group-by
            >
              <template v-slot:item.amount="{ item }">
                {{ item.amount | currency }}
              </template>
            </v-data-table>
          </div>
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
      <section>
        <div>
          <v-data-iterator
            :items="contact"
            items-per-page.sync="1"
            hide-default-footer
          >
            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.email"
                  cols="12"
                  sm="6"
                >
                  <v-card>
                    <v-card-title class="subheading font-weight-bold">{{
                      item.name
                    }}</v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>Name:</v-list-item-content>
                        <v-list-item-content class="align-end"
                          >{{ item.firstName }}
                          {{ item.lastName }}</v-list-item-content
                        >
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>Title:</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          item.title
                        }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>Organization:</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          item.organization
                        }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>Email:</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          item.email
                        }}</v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>Phone:</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          item.phone
                        }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </div>
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
      href: "/"
    },
    {
      text: "State",
      disabled: false,
      href: "/"
    },
    {
      text: "HEAP",
      disabled: true,
      href: "/"
    }
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
      name: "BUDGET BREAKDOWN",
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
      name: "CONTACT INFORMATION",
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
