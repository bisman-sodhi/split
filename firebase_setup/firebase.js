// Import the functions you need from the SDKs you need
//import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId
// };
const firebaseConfig = {
  apiKey: "AIzaSyBOD8WSo6S5lHmTs30XV8Yd9_Yfkm3Nz-8",
  authDomain: "split-80c4b.firebaseapp.com",
  projectId: "split-80c4b",
  storageBucket: "split-80c4b.appspot.com",
  messagingSenderId: "489689441670",
  appId: "1:489689441670:web:18253526e21e3cdeaef807"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);