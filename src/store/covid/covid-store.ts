import { Module, VuexModule, Mutation } from "vuex-module-decorators";

import store from "@/store";

@Module({
  name: "CovidStore",
  dynamic: true,
  store: store,
  namespaced: true
})
export default class CovidStore extends VuexModule {
  // States
  public timeline = [{}];
  public totalTimeline = [{}];

  // Mutations
  @Mutation
  public setTimeline(data: Array<object>) {
    this.timeline = data;
  }
  @Mutation
  public setTotalTimeline(data: Array<object>) {
    this.totalTimeline = data;
  }
}
