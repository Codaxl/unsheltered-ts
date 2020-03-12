<template>
  <v-container style="max-width:1080px;">
    <div>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </div>
    <div>
      <div>
        <h1 class="display-1 font-weight-light my-8">
          Continuum of Care (CoC) Program
        </h1>
      </div>
      <div>
        <v-row>
          <v-col cols="12" sm="8">
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
                    Roune 1 Standard Distribution of Funds Began Apr 2019. Round
                    2 Standard Distribution of Funds Began July 2019. 100
                    percent of the funds must be expended by June 30, 2021.
                  </p>

                  <p class="caption">
                    Source:
                    https://www.bcsh.ca.gov/hcfc/documents/heap_overview.pdf
                  </p>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <div v-for="item in contact" :key="item.name">
              <v-card
                class="mx-auto"
                style="min-height:350px;"
                v-for="item in contact"
                :key="item.name"
              >
                <v-card-title>
                  <h2 class="headline">{{ item.name }}</h2>
                </v-card-title>
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
      <v-row>
        <v-col cols="12">
          <div>
            <h2 class="font-weight-regular mt-5">
              About
            </h2>
          </div>
          <div class="body-1 mb-5">
            <p>
              The Continuum of Care (CoC) Program is designed to promote
              communitywide commitment to the goal of ending homelessness;
              provide funding for efforts by nonprofit providers, and State and
              local governments to quickly rehouse homeless individuals and
              families while minimizing the trauma and dislocation caused to
              homeless individuals, families, and communities by homelessness;
              promote access to and effect utilization of mainstream programs by
              homeless individuals and families; and optimize self-sufficiency
              among individuals and families experiencing homelessness.
            </p>
            <h3 class="font-weight-regular mt-5">Eligible Applicants</h3>
            <p>
              Under the CoC Program interim rule, eligible applicants consist of
              nonprofit organizations, State and local governments,
              instrumentalities of local governments, and public housing
              agencies. An eligible applicant must be designated by the
              Continuum of Care to submit an application to HUD for grant funds.
              The Continuum's designation must state whether the Continuum is
              designating more than one applicant to apply for funds, and if it
              is, which applicant is being designated as the Collaborative
              Applicant. A Continuum of Care that is designating only one
              applicant for funds must designate that applicant to be the
              Collaborative Applicant. For-profit entities are not eligible to
              apply for grants or to be subrecipients of grant funds.
            </p>
            <h3 class="font-weight-regular mt-5">Program Components</h3>
            <p>
              The CoC Program interim rule provides that Continuum of Care
              Program funds may be used for projects under five program
              components: permanent housing, transitional housing, supportive
              services only, HMIS, and, in some cases, homelessness prevention.
              Administrative costs are eligible under all components. Where
              possible, the components set forth in the Continuum of Care
              Program are consistent with the components allowable under the
              Emergency Solutions Grants program. This eases the administrative
              burden on recipients of both programs and ensures that reporting
              requirements and data quality benchmarks are consistently
              established and applied to like projects. One significant
              distinction between the Emergency Solutions Grants Program and the
              CoC Program can be found in the eligible activities and
              administration requirements for assistance provided under the
              rapid re-housing component in this interim rule.
            </p>
            <p>
              The five program components that can be funded through the CoC
              Program are listed below.
            </p>
            <p><b>Permanent Housing</b></p>
            <p>
              Permanent housing (PH) is defined as community-based housing
              without a designated length of stay in which formerly homeless
              individuals and families live as independently as possible. Under
              PH, a program participant must be the tenant on a lease (or
              sublease) for an initial term of at least one year that is
              renewable and is terminable only for cause. Further, leases (or
              subleases) must be renewable for a minimum term of one month. The
              CoC Program funds two types of permanent housing: permanent
              supportive housing (PSH) for persons with disabilities and rapid
              re-housing. Permanent supportive housing is permanent housing with
              indefinite leasing or rental assistance paired with supportive
              services to assist homeless persons with a disability or families
              with an adult or child member with a disability achieve housing
              stability. Rapid re-housing (RRH) emphasizes housing search and
              relocation services and short- and medium-term rental assistance
              to move homeless persons and families (with or without a
              disability) as rapidly as possible into permanent housing.
            </p>
            <p><b>Transitional Housing</b></p>
            <p>
              Transitional housing (TH) is designed to provide homeless
              individuals and families with the interim stability and support to
              sucessfully move to and maintain permanent housing. Transitional
              housing may be used to cover the costs of up to 24 months of
              housing with accompanying supportive services. Program
              participants must have a lease (or sublease) or occupancy
              agreement in place when residing in transitional housing. The
              provisions of the CoC Program’s TH program component have not
              changed significantly from the TH provisions under SHP.
            </p>
            <p><b>Supportive Services Only</b></p>
            <p>
              The supportive services only (SSO) program component allows
              recipients and subrecipients to provide services to homeless
              individuals and families not residing in housing operated by the
              recipient. SSO recipients and subrecipients may use the funds to
              conduct outreach to sheltered and unsheltered homeless persons and
              families, link clients with housing or other necessary services,
              and provide ongoing support. SSO projects may be offered in a
              structure or structures at one central site, or in multiple
              buildings at scattered sites where services are delivered.
              Projects may be operated independent of a building (e.g., street
              outreach) and in a variety of community-based settings, including
              in homeless programs operated by other agencies.
            </p>
            <p><b>Homeless Management Information System</b></p>
            <p>
              Funds under this component may be used only by Homeless Management
              Information System (HMIS) leads for leasing a structure in which
              the HMIS operates, for operating the structure in which the HMIS
              is housed, and/or for covering other costs related to
              establishing, operating, and customizing a CoC’s HMIS. Other
              recipients and subrecipients may not apply for funds under the
              HMIS program component, but may include costs associated with
              contributing data to the CoC’s HMIS within their project under
              another program component (PH, TH, SSO, or HP).
            </p>
            <p><b>Homelessness Prevention</b></p>
            <p>
              Recipients and subrecipients located in HUD-designated High
              Performing Communities (HPCs) may use CoC Program funds for
              homelessness prevention assistance for individuals and families at
              risk of homelessness. The services under this component may
              include housing relocation and stabilization services as well as
              short- and medium-term rental assistance to prevent an individual
              or family from becoming homeless. Through this component,
              recipients and subrecipients may help individuals and families
              at-risk of homelessness to maintain their existing housing or
              transition to new permanent housing. Homelessness prevention must
              be administered in accordance with 24 CFR part 576.
            </p>
            <div class="caption my-5">
              Source: https://www.bcsh.ca.gov/hcfc/aid_program.html
            </div>
          </div>
        </v-col>
      </v-row>

      <div>
        <v-row>
          <v-col cols="12" sm="4">
            <v-lazy
              :options="{
                threshold: 0.5
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card v-for="item in budget" :key="item.name">
                <v-card-title>
                  <h3 class="font-weight-regular">{{ item.name }}</h3>
                  <v-spacer></v-spacer>
                </v-card-title>

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
            </v-lazy>
          </v-col>
          <v-col cols="12" sm="8">
            <v-lazy
              :options="{
                threshold: 0.5
              }"
              min-height="200"
              transition="fade-transition"
            >
              <v-card>
                <budget-pie></budget-pie>
              </v-card>
            </v-lazy>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-lazy
              :options="{
                threshold: 0.5
              }"
              min-height="500"
              transition="fade-transition"
            >
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
            </v-lazy>
          </v-col>
        </v-row>
      </div>
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

      <div>
        <h3 class="font-weight-regular mt-5">
          Projects
        </h3>
        <div class="body-1 mb-5">
          <p>
            The County of Riverside Department of Public Social Services
            administrates the Homeless Emergency Aid Program. Riverside County's
            fiscal breakdown in Homeless Emergency Aid Program is categorized
            into Capital Improvements and Administrative Costs total
            <b>$4,830,510.36</b> (49.3%), and <b>$4,961,294.70</b> (50.7%) for
            direct services (Rental Assistance or Subsidies, Services, and
            Homeless Youth Set-Aside).
          </p>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import BudgetPie from "@/components/Funding/State/Heap/BudgetPie.vue";

@Component({
  components: { BudgetPie }
})
export default class Coc extends Vue {
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
