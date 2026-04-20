import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZf4TYDlqH_sBW60JsFeMjtSO_z6KraPw",
  authDomain: "foodshare-b7853.firebaseapp.com",
  projectId: "foodshare-b7853",
  storageBucket: "foodshare-b7853.firebasestorage.app",
  messagingSenderId: "941354486624",
  appId: "1:941354486624:web:6142cfef05a39162c0ac05",
  measurementId: "G-GM2MC2TDR9"
};

const app = initializeApp(firebaseConfig);

// 👇 ADD THESE AT THE END (after initializeApp)
export const auth = getAuth(app);
export const db = getFirestore(app);