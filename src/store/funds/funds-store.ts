import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { Fund } from "./funds-interface";
import store from "@/store";

import { db } from "@/firebase";
//https://github.com/michaelprosario/fireTodo/tree/master/src/views
import { Query } from "@firebase/firestore-types";

@Module({
  name: "FundStore",
  dynamic: true,
  store: store,
  namespaced: true
})
export default class FundStore extends VuexModule {
  // States
  public yearFilter = new Date().getFullYear();
  public orgFilter = "";
  public grantFilter = "";
  public sourceFilter = "";

  public federalTotal = 0;
  public stateTotal = 0;
  public countyTotal = 0;
  public cityTotal = 0;

  // Getters

  // Mutations
  @Mutation
  public setFederalTotal(newTotal: number) {
    this.federalTotal = newTotal;
  }
  @Mutation
  public setStateTotal(newTotal: number) {
    this.stateTotal = newTotal;
  }
  @Mutation
  public setCountyTotal(newTotal: number) {
    this.countyTotal = newTotal;
  }
  @Mutation
  public setCityTotal(newTotal: number) {
    this.cityTotal = newTotal;
  }

  @Mutation
  public setYearFilter(year: number) {
    this.yearFilter = year;
  }
  @Mutation
  public setOrgFilter(org: string) {
    this.orgFilter = org;
  }
  @Mutation
  public setGrantFilter(grant: string) {
    this.grantFilter = grant;
  }
  @Mutation
  public setSourceFilter(source: string) {
    this.sourceFilter = source;
  }
}
