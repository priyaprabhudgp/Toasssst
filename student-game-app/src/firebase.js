import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEK9o6z_Dy4d3GuBbJpHotej6-qMuFozA",
  authDomain: "toasssst-f3340.firebaseapp.com",
  projectId: "toasssst-f3340",
  storageBucket: "toasssst-f3340.firebasestorage.app",
  messagingSenderId: "90528830481",
  appId: "1:90528830481:web:28190bd608574f846f4db0",
  measurementId: "G-G8VB1ZEH1H"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);



export const db = getFirestore(app);
export const auth = getAuth(app); 

console.log("Auth object:", auth);