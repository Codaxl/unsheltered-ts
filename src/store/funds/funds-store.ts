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
  public yearFilter = new Date().getFullYear().toString();
  public orgFilter = "";
  public grantFilter = "";
  public sourceFilter = "";

  // Getters

  get isYearFilter(): string {
    return this.yearFilter;
  }
  get isOrgFilter(): string {
    return this.orgFilter;
  }
  get isGrantFilterr(): string {
    return this.grantFilter;
  }
  get isSourceFilter(): string {
    return this.sourceFilter;
  }
  // Mutations
  @Mutation
  public setYearFilter(year: string) {
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
