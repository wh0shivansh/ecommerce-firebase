import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBk87MboYs4nR3dNcxT22yS9pzyckFRWp4",
  authDomain: "ecommerce-3114c.firebaseapp.com",
  projectId: "ecommerce-3114c",
  storageBucket: "ecommerce-3114c.appspot.com",
  messagingSenderId: "24541177663",
  appId: "1:24541177663:web:42597de5b22121219f158a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);