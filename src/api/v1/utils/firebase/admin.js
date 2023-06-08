var admin = require("firebase-admin");

var serviceAccount = require("../../../../../afh-kredit-firebase-adminsdk-5xcx9-d1b3921982.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://afh-kredit-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore()

module.exports = {admin, db}
