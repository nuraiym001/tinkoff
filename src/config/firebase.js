import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5lAoliBK5RRAsQlTM9zXL10ZI2_LF06Y",
  authDomain: "imovie-67ce9.firebaseapp.com",
  projectId: "imovie-67ce9",
  storageBucket: "imovie-67ce9.appspot.com",
  messagingSenderId: "37756349792",
  appId: "1:37756349792:web:45654f6bae866680fdc205",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
