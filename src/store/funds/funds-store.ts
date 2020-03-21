import { VuexModule, Module, Mutation } from "vuex-module-decorators";

@Module({
  namespaced: true
})
class Funds extends VuexModule {
  public text = "inside module store";

  @Mutation
  setText(newText: string) {
    this.text = newText;
  }

  get textUpper(): string {
    return this.text.toUpperCase();
  }
}

export default Foo;
