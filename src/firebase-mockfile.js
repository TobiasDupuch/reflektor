//MOCKFILE FOR SAFETY

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

//NOTE TO MYSELF IF I EVER LOSE EVERYTHING: RE-ADD CREDENTIALS TO FIREBASE CONFIG:

const firebaseConfig = {
  apiKey: "HERE",
  authDomain: "HERE",
  databaseURL: "HERE",
  projectId: "HERE",
  storageBucket: "",
  messagingSenderId: "HERE",
  appId: "HERE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
