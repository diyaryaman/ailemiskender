// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4_AFNjGMfBg85bwxMjWWZU6_N4OnA1hU",
  authDomain: "ailemiskender-599e1.firebaseapp.com",
  databaseURL: "https://ailemiskender-599e1-default-rtdb.firebaseio.com",
  projectId: "ailemiskender-599e1",
  storageBucket: "ailemiskender-599e1.firebasestorage.app",
  messagingSenderId: "7845160664",
  appId: "1:7845160664:web:97e25fec701e13f204d9ad",
  measurementId: "G-ZDDQZHXT0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Anonim giriş yap
signInAnonymously(auth)
  .then(() => {
    console.log("Anonim giriş başarılı");
  })
  .catch((error) => {
    console.error("Anonim giriş hatası:", error);
  });

export { db, auth }; 