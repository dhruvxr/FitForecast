// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Use environment variables for config values.
const firebaseConfig = {
    apiKey: "AIzaSyCSpXyf8nkHPo44vBlLi4smGWZXFuX5WMk",
    authDomain: "fitforecast-85c09.firebaseapp.com",
    projectId: "fitforecast-85c09",
    storageBucket: "fitforecast-85c09.firebasestorage.app",
    messagingSenderId: "1017963130635",
    appId: "1:1017963130635:web:91c7053849723cc0b5fc0e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
