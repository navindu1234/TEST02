import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  limit, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy5al_iyNpmiYz6GH_73SFEC699_EwcUk",
  authDomain: "test-61860.firebaseapp.com",
  projectId: "test-61860",
  storageBucket: "test-61860.appspot.com",
  messagingSenderId: "986305268803",
  appId: "1:986305268803:web:b0664f80d4fe27e8d858f6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { 
  db, 
  collection, 
  addDoc, 
  query, 
  limit, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc 
};