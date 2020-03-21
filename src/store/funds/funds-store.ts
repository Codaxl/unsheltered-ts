import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import Fund from "./funds-interface";
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
  private yearFilter = new Date().getFullYear();
  private orgFilter = false;
  private grantFilter = false;
  private sourceFilter = false;
  private _fund: Fund = FundStore.makeEmptyFund();

  // Getters

  get year(): string {
    return this.yearFilter;
  }

  // Mutations
  @Mutation
  private setYear(year: string) {
    this.yearFilter = year;
  }

  // Actions
  @Action
  public async getAll() {
    const records: Array<object> = [];
    let query: Query = db
      .collection("funds")
      .where("year", "==", this.yearFilter);

    if (!(!orgFilter || orgFilter.trim().length === 0)) {
      query = query.where("organization", "==", this.orgFilter);
    }

    if (!(!grantFilter || grantFilter.trim().length === 0)) {
      query = query.where("grant", "==", this.grantFilter);
    }

    if (!(!sourceFilter || sourceFilter.trim().length === 0)) {
      query = query.where("source", "==", this.sourceFilter);
    }

    const result = new Promise(function(resolve, reject) {
      query.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          records.push(FundStore.docToFundRecordMap(doc));
        });
        resolve(records);
      });
    });
    return result;
  }

  // ---- Helper methods ------------------
  private static makeEmptyFund(): Fund {
    return {
      id: "",
      amount: "",
      category: "",
      organization: "",
      projectName: "",
      source: "",
      year: "",
      grant: ""
    };
  }

  private static docToFundRecordMap(doc: any): Fund {
    const rowData = doc.data();
    const record = {
      id: doc.id,
      amount: rowData.amount,
      category: rowData.category,
      organization: rowData.organization,
      projectName: rowData.projectName,
      source: rowData.source,
      year: rowData.year,
      grant: rowData.grant
    };
    return record;
  }
}
