import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAE8tVEHjSeO6tTMeUQasUMUur5pG3toXw",
  authDomain: "pdfy-79f5d.firebaseapp.com",
  projectId: "pdfy-79f5d",
  storageBucket: "pdfy-79f5d.appspot.com",
  messagingSenderId: "877548835928",
  appId: "1:877548835928:web:f42f7e357ae476d22c662d",
  measurementId: "G-GYFBBDT016",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };