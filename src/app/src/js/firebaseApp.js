import { FacebookAuthProvider, getAuth, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"

var serviceAccount = require("../serviceAccountAppKey.json");

export const app = initializeApp(serviceAccount);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
export const fbProvider = new FacebookAuthProvider()
export const twitterProvider = new TwitterAuthProvider()
