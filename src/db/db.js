import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4vSsZuu0Dv2TFq1YggsnCVHG-GhhOM74",
  authDomain: "ecommerce-melere.firebaseapp.com",
  projectId: "ecommerce-melere",
  storageBucket: "ecommerce-melere.firebasestorage.app",
  messagingSenderId: "298848861832",
  appId: "1:298848861832:web:8e43348df43ab8295f293d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
