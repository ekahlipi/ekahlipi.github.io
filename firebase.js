// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfINAqiqKQAFqh6k-rvPsF0qF7kQQuIU4",
  authDomain: "ekahlipi.firebaseapp.com",
  databaseURL: "https://ekahlipi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ekahlipi",
  storageBucket: "ekahlipi.firebasestorage.app",
  messagingSenderId: "946654489257",
  appId: "1:946654489257:web:91596b62aecf1a0a5317b8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
