var admin = require("firebase-admin");

var serviceAccount = require("../../../../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://afh-kredit-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "afh-kredit.appspot.com"
});

const db = admin.firestore()
const auth = admin.auth()
const storage = admin.storage().bucket()

module.exports = {admin, db, auth, storage}
