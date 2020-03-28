<template>
  <v-container style="max-width:1080px;">
    <v-row>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </v-row>

    <v-row align="center" class="mx-3">
      <v-overflow-btn
        v-model="e1"
        :items="selectYear"
        editable
        segmented
        item-value="string"
        style="max-width:125px;"
      ></v-overflow-btn>

      <h1 class="display-1 font-weight-light px-5">
        Continuum of Care (CoC) Program
      </h1>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div>
          <contacts />
        </div>
      </v-col>
    </v-row>

    <v-row class="mx-auto">
      <v-col cols="12" sm="4">
        <v-card style="min-height:125px"> </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card style="min-height:125px"> </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card style="min-height:125px"> </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div>
          <overview />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div>
          <v-container>
            <div>
              <v-card>
                <v-tabs fixed-tabs show-arrows>
                  <v-tab>
                    About
                  </v-tab>
                  <v-tab>
                    Eligible Applicants
                  </v-tab>
                  <v-tab>
                    Program Components
                  </v-tab>

                  <v-tab-item>
                    <v-card flat class="expansion-card">
                      <v-card-text>
                        <div class="body-1 mb-5">
                          <p>
                            The Continuum of Care (CoC) Program is designed to
                            promote communitywide commitment to the goal of
                            ending homelessness; provide funding for efforts by
                            nonprofit providers, and State and local governments
                            to quickly rehouse homeless individuals and families
                            while minimizing the trauma and dislocation caused
                            to homeless individuals, families, and communities
                            by homelessness; promote access to and effect
                            utilization of mainstream programs by homeless
                            individuals and families; and optimize
                            self-sufficiency among individuals and families
                            experiencing homelessness.
                          </p>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat class="expansion-card">
                      <v-card-text>
                        <div class="body-1 mb-5">
                          <p>
                            Under the CoC Program interim rule, eligible
                            applicants consist of nonprofit organizations, State
                            and local governments, instrumentalities of local
                            governments, and public housing agencies. An
                            eligible applicant must be designated by the
                            Continuum of Care to submit an application to HUD
                            for grant funds. The Continuum's designation must
                            state whether the Continuum is designating more than
                            one applicant to apply for funds, and if it is,
                            which applicant is being designated as the
                            Collaborative Applicant. A Continuum of Care that is
                            designating only one applicant for funds must
                            designate that applicant to be the Collaborative
                            Applicant. For-profit entities are not eligible to
                            apply for grants or to be subrecipients of grant
                            funds.
                          </p>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat class="expansion-card">
                      <v-card-text>
                        <div class="body-1 mb-5">
                          <p>
                            The CoC Program interim rule provides that Continuum
                            of Care Program funds may be used for projects under
                            five program components: permanent housing,
                            transitional housing, supportive services only,
                            HMIS, and, in some cases, homelessness prevention.
                            Administrative costs are eligible under all
                            components. Where possible, the components set forth
                            in the Continuum of Care Program are consistent with
                            the components allowable under the Emergency
                            Solutions Grants program. This eases the
                            administrative burden on recipients of both programs
                            and ensures that reporting requirements and data
                            quality benchmarks are consistently established and
                            applied to like projects. One significant
                            distinction between the Emergency Solutions Grants
                            Program and the CoC Program can be found in the
                            eligible activities and administration requirements
                            for assistance provided under the rapid re-housing
                            component in this interim rule.
                          </p>
                        </div>
                        <div class="body-1 mb-5">
                          <p>
                            The five program components that can be funded
                            through the CoC Program are listed below.
                          </p>
                          <div>
                            <v-row class="mx-auto">
                              <v-spacer></v-spacer>
                              <v-switch v-model="switch1"></v-switch>
                            </v-row>

                            <v-expansion-panels
                              v-model="panel"
                              multiple
                              flat
                              outlined
                              hover
                            >
                              <v-expansion-panel
                                v-for="(item, i) in programInfo"
                                :key="i"
                              >
                                <v-expansion-panel-header>{{
                                  item.name
                                }}</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  {{ item.desc }}
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </div>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

import Contacts from "@/components/Funding/Federal/Coc/Contacts.vue";
import Overview from "@/components/Funding/Federal/Coc/Overview.vue";

@Component({
  components: { Contacts, Overview }
})
export default class Coc extends Vue {
  private e1: number = new Date().getFullYear() - 1;
  private model = null;
  private panel: number[] = [];
  private switch1 = false;
  private programInfo: Array<object> = [
    {
      name: "Permanent Housing",
      desc:
        "Permanent housing (PH) is defined as community-based housing without a designated length of stay in which formerly homeless individuals and families live as independently as possible. Under PH, a program participant must be the tenant on a lease (or sublease) for an initial term of at least one year that is renewable and is terminable only for cause. Further, leases (or subleases) must be renewable for a minimum term of one month. The CoC Program funds two types of permanent housing: permanent supportive housing (PSH) for persons with disabilities and rapid re-housing. Permanent supportive housing is permanent housing with indefinite leasing or rental assistance paired with supportive services to assist homeless persons with a disability or families with an adult or child member with a disability achieve housing stability. Rapid re-housing (RRH) emphasizes housing search and relocation services and short- and medium-term rental assistance to move homeless persons and families (with or without a disability) as rapidly as possible into permanent housing."
    },
    {
      name: "Transitional Housing",
      desc:
        "Transitional housing (TH) is designed to provide homeless individuals and families with the interim stability and support to sucessfully move to and maintain permanent housing. Transitional housing may be used to cover the costs of up to 24 months of housing with accompanying supportive services. Program participants must have a lease (or sublease) or occupancy agreement in place when residing in transitional housing. The provisions of the CoC Program’s TH program component have not changed significantly from the TH provisions under SHP."
    },
    {
      name: "Supportive Services Only",
      desc:
        "The supportive services only (SSO) program component allows recipients and subrecipients to provide services to homeless individuals and families not residing in housing operated by the recipient. SSO recipients and subrecipients may use the funds to conduct outreach to sheltered and unsheltered homeless persons and families, link clients with housing or other necessary services, and provide ongoing support. SSO projects may be offered in a structure or structures at one central site, or in multiple buildings at scattered sites where services are delivered. Projects may be operated independent of a building (e.g., street outreach) and in a variety of community-based settings, including in homeless programs operated by other agencies."
    },
    {
      name: "Homeless Management Information System",
      desc:
        "Funds under this component may be used only by Homeless Management Information System (HMIS) leads for leasing a structure in which the HMIS operates, for operating the structure in which the HMIS is housed, and/or for covering other costs related to establishing, operating, and customizing a CoC’s HMIS. Other recipients and subrecipients may not apply for funds under the HMIS program component, but may include costs associated with contributing data to the CoC’s HMIS within their project under another program component (PH, TH, SSO, or HP)."
    },
    {
      name: "Homelessness Prevention",
      desc:
        "Recipients and subrecipients located in HUD-designated High Performing Communities (HPCs) may use CoC Program funds for homelessness prevention assistance for individuals and families at risk of homelessness. The services under this component may include housing relocation and stabilization services as well as short- and medium-term rental assistance to prevent an individual or family from becoming homeless. Through this component, recipients and subrecipients may help individuals and families at-risk of homelessness to maintain their existing housing or transition to new permanent housing. Homelessness prevention must be administered in accordance with 24 CFR part 576."
    }
  ];
  @Watch("switch1")
  private all() {
    if (this.switch1 === true) {
      this.panel = [...Array(this.programInfo.length)].map((k, i) => i);
    } else {
      this.panel = [];
    }
  }
  // Reset the panel
  private none() {
    this.panel = [];
  }
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
      text: "Federal",
      disabled: false,
      href: "/funding/federal"
    },
    {
      text: "CoC",
      disabled: true,
      href: "/funding/federal/coc"
    }
  ];
  get selectYear(): number[] {
    const range = (a: number, b: number) =>
      Array.from(new Array(b > a ? b - a : a - b), (x, i) =>
        b > a ? i + a : a - i
      );
    const currentYear = new Date().getFullYear();
    return range(currentYear, currentYear - 5);
  }
}
</script>
<style>
.expansion-card {
  min-height: 550px;
}

/* div {
  border: 1px solid red;
} */
</style>
