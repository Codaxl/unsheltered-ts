import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { Funds } from "./funds-interface";
@Module({
  name: "FundsStore",
  dynamic: true,
  store: store,
  namespaced: true
})
class FundsStore extends VuexModule {
  public yearFilter = "2019";
  public orgFilter = "";
  public grantFilter = "";
  public sourceFilter = "";

  get setYear(): string {
    return this.yearFilter;
  }
}
export default getModule(FundsStore);
