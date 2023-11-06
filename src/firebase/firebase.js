import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARfundmbUnE0pMD1w8i9nhII_zKx1H9HI",
  authDomain: "project-piq.firebaseapp.com",
  projectId: "project-piq",
  storageBucket: "project-piq.appspot.com",
  messagingSenderId: "192603333654",
  appId: "1:192603333654:web:b1cb9d3c1e7cc069060137",
  measurementId: "G-XN5CJZ930W",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
