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
  // States
  // public bubbleSlider = .50;
  // Mutations
  @Mutation
  public setTimeline(data: Array<object>) {
    this.timeline = data;
  }
  // @Mutation
  // public setBubbleSlider(data: number) {
  //   this.bubbleSlider = data;
  // }
}
