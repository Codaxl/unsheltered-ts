import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { db } from "@/firebase";
import { Funds } from "./funds-interface";
@Module({
  name: "FundsStore",
  dynamic: true,
  store: store,
  namespaced: true
})
class FundsStore extends VuexModule {
  public year = "2019";

  @Mutation
  changeYear(newYear: string) {
    this.year = newYear;
  }
  // getters
  get setYear(): string {
    return this.year;
  }
}
export default getModule(FundsStore);
