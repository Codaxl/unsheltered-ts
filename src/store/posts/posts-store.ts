import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store";
import { db } from "@/firebase";
import { Post } from "./post-interface";

@Module({
  name: "PostStore",
  dynamic: true,
  store: store,
  namespaced: true
})
class PostStore extends VuexModule {
  // states
  private _post: Post = PostStore.makeEmptyPost();

  // getters

  // KEEP
  @Mutation
  private setPost(post: Post) {
    this._post = post;
  }

  @Action
  public signIn(param: SignInParam) {
    return new Promise<ActionResult>(resolve => {
      firebase
        .auth()
        .signInWithEmailAndPassword(param.email, param.password)
        .then(value => {
          if (!value.user) {
            resolve(UserStore.makeFailedResultByCode("999")); // ありえないはず
            return;
          }

          if (!value.user.emailVerified) {
            resolve(UserStore.makeFailedResultByCode("001"));
            return;
          }

          this.setUser(UserStore.makeUserByFirebaseUser(value.user));
          resolve(UserStore.makeSuccessResult());
        })
        .catch(error => {
          resolve(UserStore.makeFailedResultByFirebaseError(error));
        });
    });
  }

  // ---- Helper methods ------------------
  private static makeEmptyPost(): Post {
    return {
      id: "",
      title: "",
      content: "",
      date: null,
      author: "",
      imgUrl: ""
    };
  }

  private static makeSuccessResult(): ActionResult {
    return {
      isError: false,
      errorCode: "",
      errorMessage: ""
    };
  }

  private static makeFailedResult(error: {
    code: string;
    message: string;
  }): ActionResult {
    return {
      isError: true,
      errorCode: error.code,
      errorMessage: error.message
    };
  }

  private static makeFailedResultByCode(errorCode: string): ActionResult {
    const errorMessages: { [code: string]: string } = {
      "001": "Please click the URL to verify your email address",
      "002": "Please sign in",
      "999": "Unexpected error occurred"
    };

    return PostStore.makeFailedResult({
      code: errorCode,
      message: errorMessages[errorCode]
    });
  }
}

export default getModule(PostStore);
