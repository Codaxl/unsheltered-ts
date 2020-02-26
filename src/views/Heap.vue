<template>
  <div id="heap">
    <v-container style="max-width:1080px;">
      <div>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      </div>
      <div>
        <h1 class="font-weight-light mb-12">
          Homeless Emergency Aid Program (HEAP)
        </h1>
      </div>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">CoC Number</th>
              <th class="text-left">Jurisdiction</th>
              <th class="text-left">Total Homeless, 2017</th>
              <th class="text-left">Percent of Total State Homeless, 2017</th>
              <th class="text-left">
                Section 50213(a) Per Jurisdiction portion of $250M
              </th>
              <th class="text-left">
                Section 50213(b) $100M Distribution Based on Percent of Homeless
                Population
              </th>
              <th class="text-left">
                Total of CoC Distribution per 50213(a) and (b)
              </th>
              <th class="text-left">
                50214(c) 5% Minimum Youth Set-aside Per Continuum of Care total
                of 50213(a) and (b)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in heap" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div>
        <div class="caption">
          Source: https://www.bcsh.ca.gov/hcfc/documents/heap_overview.pdf
        </div>

        <div class="body-1">
          About the Homeless Emergency Aid Program The Homeless Emergency Aid
          Program was established by statute to provide localities with flexible
          block grant funds to address their immediate homelessness challenges.
          The Homeless Emergency Aid Block Grants will provide $500 million in
          one-time funding to enable local governments to respond to
          homelessness. Allocations are as follows: $250 million to Continuums
          of Care based on 2017 homeless point in time count; $150 million
          direct allocation to a city or city that is also a county with a
          population of 330,000 or more as of January 1, 2018; and $100 million
          to Continuums of Care based on their percentage of the statewide 2017
          homeless population. Requirements: City, county, or joint power must
          declared an emergency shelter crisis (waiver process for smaller
          cities and counties that do not declare a shelter emergency).
          Continuum of Care must demonstrate collaboration with other city,
          county, or nonprofit partners. Eligible Activities: Emergency housing
          vouchers Rapid rehousing Emergency shelter construction, and Use of
          armories to provide temporary shelters, among other activities For
          more information, contact: hcfc@bcsh.ca.gov.
          <div class="caption">
            Source: https://www.bcsh.ca.gov/hcfc/aid_program.html
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    model: null,
    breadcrumbs: [
      {
        text: "Home",
        disabled: false,
        href: "/"
      },
      {
        text: "About",
        disabled: true,
        href: "/"
      }
    ],
    heap: [
      {
        name: "Frozen Yogurt",
        calories: 159
      }
    ]
  })
});
</script>
