import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Fund } from "./funds-interface";
import { Selects, Organizations, Grants } from "./selects-interface";

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
  public organizations = [{}];
  public grants = [{}];
  public yearFilter = new Date().getFullYear();
  public orgFilter = "";
  public grantFilter = "";
  public sourceFilter = "";

  public federalTotal = 0;
  public stateTotal = 0;
  public countyTotal = 0;
  public cityTotal = 0;

  public grantSelect = [{}];
  public tableGrant = [{}];
  // states
  // private _select: Selects = Selects.makeEmptySelect();

  @Action
  public async getSelects() {
    return new Promise(function(resolve, reject) {
      const selectsRef = db.collection("selects").doc("items");
      const allSelects = selectsRef
        .get()
        .then((doc: any) => {
          if (!doc.exists) {
            return;
          } else {
            const results = doc.data();

            resolve();
          }
        })
        .catch(() => {
          return;
        });
    });
  }

  // TODO
  @Mutation
  private setGrantSelect(data: Array<object>) {
    this.grantSelect = data;
  }

  @Mutation
  public setGrant(data: Array<object>) {
    return (this.grants = data.reduce(
      (map => (r: any, a: any) => {
        map.set(
          a.grant,
          map.get(a.grant) || r[r.push({ grant: a.grant, amount: 0 }) - 1]
        );
        map.get(a.grant).amount += parseFloat(a.amount);
        return r;
      })(new Map()),
      []
    ));
  }

  @Mutation
  public setOrganizations(data: Array<object>) {
    return (this.organizations = data.reduce(
      (map => (r: any, a: any) => {
        map.set(
          a.organization,
          map.get(a.organization) ||
            r[r.push({ organization: a.organization, amount: 0 }) - 1]
        );
        map.get(a.organization).amount += parseFloat(a.amount);
        return r;
      })(new Map()),
      []
    ));
  }
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
