// import something here
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyDqLTLbv5t1-lUfwYHOYhAhOH4ReqHvTzc",
  authDomain: "arubah-70bee.firebaseapp.com",
  databaseURL: "https://arubah-70bee.firebaseio.com",
  projectId: "arubah-70bee",
  storageBucket: "arubah-70bee.appspot.com",
  messagingSenderId: "615972041330",
  appId: "1:615972041330:web:daaffd7c75719ba738c8eb"
};
// Initialize Firebase
let firebase_app = firebase.initializeApp(firebaseConfig);
let firebase_auth = firebase_app.auth();
let firebase_db = firebase_app.database();

export {
  firebase_auth, firebase_db
}
