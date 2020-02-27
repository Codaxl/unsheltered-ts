<template>
  <v-container style="max-width:1080px;">
    <section>
      <div>
        <v-breadcrumbs :budget="breadcrumbs" large></v-breadcrumbs>
      </div>
      <section>
        <div>
          <h1 class="display-1 font-weight-light mb-12">
            Homeless Emergency Aid Program (HEAP)
          </h1>
        </div>
      </section>
      <section>
        <div>
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
          <h2 class="font-weight-regular mb-5">
            About the Homeless Emergency Aid Program
          </h2>
          <div class="body-1 my-5">
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
              <code>Requirements:</code> City, county, or joint power must
              declared an emergency shelter crisis (waiver process for smaller
              cities and counties that do not declare a shelter emergency).
              Continuum of Care must demonstrate collaboration with other city,
              county, or nonprofit partners.
            </p>
            <p>
              <code>Eligible Activities:</code> Emergency housing vouchers Rapid
              rehousing Emergency shelter construction, and Use of armories to
              provide temporary shelters, among other activities.
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
                  <v-card style="height:525px;">
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
    </section>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import BudgetPie from "../components/BudgetPie.vue";

export default Vue.extend({
  components: {
    BudgetPie
  },
  data: () => ({
    model: null,
    breadcrumbs: [
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
    ],
    heap: [
      {
        amount: 9791805.06,
        contractNumber: "18-HEAP-00052",
        granteeName: "County of Riverside Dept of Public Social Services",
        address: "1111 Spruce Street",
        city: "Riverside",
        state: "CA",
        zipCode: "92507"
      }
    ],
    budgetPerPage: 1,
    budget: [
      {
        name: "BUDGET BREAKDOWN",
        budget1: 2841715.88,
        budget2: 1629988.57,
        budget3: 4340920.36,
        budget4: 489590.25,
        budget5: 489590.0,
        total: 9791805.06
      }
    ]
  })
});
</script>
