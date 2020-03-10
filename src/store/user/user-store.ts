import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store";
import firebase from "firebase";
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
    return new Promise<void>((resolve, reject) => {
      firebase.initializeApp({
        apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
        authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
        databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
        projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
        storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
        messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
        appId: process.env.VUE_APP_FIREBASE_APPID,
        measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID
      });
      console.log("Step 1");
      // firebase wait for initialization

      // Login retention settings
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      firebase.auth().useDeviceLanguage();

      // Automatic login
      const firebaseUser = firebase.auth().currentUser;
      firebase.auth().onAuthStateChanged(_ => {
        this.setUser(UserStore.makeUserByFirebaseUser(firebaseUser));
      });
      resolve();
    });
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
        .then(_ => {
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
      console.log("Step 2b");
      return {
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || "",
        photoURL: firebaseUser.photoURL || "",
        providers: firebaseUser.providerData.map(v => (v ? v.providerId : "")),
        emailVerified: firebaseUser.emailVerified
      };
    } else {
      console.log("Step 2c");
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
