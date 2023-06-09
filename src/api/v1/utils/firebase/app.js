// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
//const { getAnalytics } = require("firebase/analytics");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const storage = getStorage(app)

module.exports = {app, storage, ref, getDownloadURL}