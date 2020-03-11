import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store";
import firebase from "@/firebase";
import { User } from "./user-store-entities";
import { SignInParam } from "./user-store-params";
import { ActionResult } from "./action-result";

@Module({
  name: "UserStore",
  dynamic: true,
  store: store,
  namespaced: true
})
class UserStore extends VuexModule {
  // states
  private _user: User = UserStore.makeEmptyUser();

  // getters
  get isSignedIn() {
    for (let i = 0; i < this._user.providers.length; i++) {
      const provider = this._user.providers[i];

      if (!provider) continue;

      if (provider == "password" && !this._user.emailVerified) continue;

      return true;
    }

    return false;
  }

  get user(): User {
    return JSON.parse(JSON.stringify(this._user));
  }

  // KEEP
  @Mutation
  private setUser(user: User) {
    this._user = user;
  }

  @Action
  public async init() {
    // firebaseの初期化を待つ
    const handleAuthStateChanged = new Promise<void>(resolve => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // Login retention settings
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          firebase.auth().useDeviceLanguage();
          const firebaseUser = firebase.auth().currentUser;
          this.setUser(UserStore.makeUserByFirebaseUser(firebaseUser));
          resolve();
        } else {
          unsubscribe();
          resolve();
        }
      });
    });

    return Promise.resolve(handleAuthStateChanged);
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

  @Action
  public signOut() {
    return new Promise<ActionResult>(resolve => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setUser(UserStore.makeEmptyUser());
          resolve(UserStore.makeSuccessResult());
        })
        .catch(error => {
          resolve(UserStore.makeFailedResultByFirebaseError(error));
        });
    });
  }
  // ---- Helper methods ------------------
  private static makeEmptyUser(): User {
    return {
      id: "",
      name: "",
      email: "",
      providers: [],
      emailVerified: false
    };
  }
  // KEEP
  private static makeUserByFirebaseUser(
    firebaseUser: firebase.User | null
  ): User {
    if (firebaseUser) {
      return {
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || "",
        photoURL: firebaseUser.photoURL || "",
        providers: firebaseUser.providerData.map(v => (v ? v.providerId : "")),
        emailVerified: firebaseUser.emailVerified
      };
    } else {
      return UserStore.makeEmptyUser();
    }
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

    return UserStore.makeFailedResult({
      code: errorCode,
      message: errorMessages[errorCode]
    });
  }

  private static makeFailedResultByFirebaseError(
    firebaseError: firebase.FirebaseError
  ): ActionResult {
    return UserStore.makeFailedResult({
      code: firebaseError.code,
      message: firebaseError.message
    });
  }
}

export default getModule(UserStore);
