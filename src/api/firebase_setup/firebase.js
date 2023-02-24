import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAiJPg-wxiLgFEDH4ooM-Z08q1gYn5nyfg",

  authDomain: "music-library-79f1f.firebaseapp.com",

  databaseURL:
    "https://music-library-79f1f-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "music-library-79f1f",

  storageBucket: "music-library-79f1f.appspot.com",

  messagingSenderId: "294653463457",

  appId: "1:294653463457:web:7acf317a82db8a5ee399e0",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
