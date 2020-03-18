import {
  Mutation,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store";
import { db } from "@/firebase";

@Module({
  name: "FundsStore",
  dynamic: true,
  store: store,
  namespaced: true
})
class FundsStore extends VuexModule {
  year = "2019";

  @Mutation
  changeYear(year: string) {
    this.year = year;
  }

  @Action
  async fetchYear(yearStore: string) {
    const year = await get(yearStore);
    this.context.commit("changeYear", year);
  }
}
export default getModule(FundsStore);
