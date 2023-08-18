// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
//const { getAnalytics } = require("firebase/analytics");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const { getAuth, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } = require("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var serviceAccount = require("../../../../app/src/serviceAccountAppKey.json");

const firebaseConfig = {
  apiKey: "AIzaSyD_swTmWmGas3kdpWeULPQ3zqvyCgmFSAI",
  authDomain: "afh-kredit.firebaseapp.com",
  projectId: "afh-kredit",
  storageBucket: "afh-kredit.appspot.com",
  messagingSenderId: "238376421823",
  appId: "1:238376421823:web:fc24925366df58275e790a",
  measurementId: "G-DNVBPBMCET"
};
// Initialize Firebase
const app = initializeApp(serviceAccount);
//const analytics = getAnalytics(app);
const storage = getStorage(app)
const authClient = getAuth(app)

module.exports = {app, storage, authClient, signInWithEmailAndPassword, ref, getDownloadURL}