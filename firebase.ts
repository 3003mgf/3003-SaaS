import {  getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAX0OokeSPk33qaxsT6chHVqzyIOj8kz1k",
  authDomain: "saas-b2723.firebaseapp.com",
  projectId: "saas-b2723",
  storageBucket: "saas-b2723.appspot.com",
  messagingSenderId: "278935576167",
  appId: "1:278935576167:web:92869144dd29e59618bec2"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);
const functions = getFunctions(app);


export { db, auth, functions };