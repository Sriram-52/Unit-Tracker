// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy_cEcI9xLNKi2LWTOoA9gfBFO_UZnSD4",
  authDomain: "unit-tracker-def47.firebaseapp.com",
  projectId: "unit-tracker-def47",
  storageBucket: "unit-tracker-def47.appspot.com",
  messagingSenderId: "1003481685727",
  appId: "1:1003481685727:web:5e49f0ff29291f883dd36a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase as default };
