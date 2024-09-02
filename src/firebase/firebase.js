// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQhntJ-SEDeEN2irdKPp9NMY7yqxgav1E",
  authDomain: "minimarket-52da1.firebaseapp.com",
  projectId: "minimarket-52da1",
  storageBucket: "minimarket-52da1.appspot.com",
  messagingSenderId: "1008751421210",
  appId: "1:1008751421210:web:4c4ee69dc1b1baa2c86ea3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {db,app, auth};