import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Fund } from "./funds-interface";
import { Selects } from "./selects-interface";

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
  public data = [{}];

  public yearFilter = new Date().getFullYear();
  public orgFilter = "";
  public grantFilter = "";
  public sourceFilter = "";

  public federalTotal = 0;
  public stateTotal = 0;
  public countyTotal = 0;
  public cityTotal = 0;

  public grantSelect = [];
  // states
  // private _select: Selects = Selects.makeEmptySelect();

  @Action
  public async getSelects() {
    return new Promise(function(resolve, reject) {
      const selectsRef = db.collection("selects").doc("items");
      const allSelects = selectsRef
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            const results: [] = doc.data().grants;
            console.log(doc.data());
          }
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    });
  }

  // Actions

  // Mutations
  @Mutation
  public setData(data: Array<object>) {
    this.data = data;
  }

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
