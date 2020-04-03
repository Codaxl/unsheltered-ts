// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore"; // FIRESTORE DATABASE
import "firebase/database"; // REALTIME DATABASE
import "firebase/functions"; // FIREBASE FUNCTIONS
import "firebase/storage"; // FIREBASE STORAGE
// PUT YOUR OWN FIREBASE CONFIGURATION HERE

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

const Timestamp = firebase.firestore.Timestamp;
const FieldValue = firebase.firestore.FieldValue;
// firebase collections

export { db, auth, currentUser, Timestamp, FieldValue };
