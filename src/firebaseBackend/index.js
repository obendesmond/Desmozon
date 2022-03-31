import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const serviceAccount = require("../../permissions.json");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH8Yt2W8c_vkpA6Z9LY-_-EY9MCgS0fcw",
  authDomain: "desmozon-com.firebaseapp.com",
  projectId: "desmozon-com",
  storageBucket: "desmozon-com.appspot.com",
  messagingSenderId: "493475841093",
  appId: "1:493475841093:web:e2721bb10bd0c359ae0f2c",
};

// secure a connection to firebase admin
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
