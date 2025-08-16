'use client';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    projectId: "persona-portfolio-9ac2u",
    appId: "1:640725775356:web:0db7eec234ed679521f879",
    storageBucket: "persona-portfolio-9ac2u.appspot.com",
    apiKey: "AIzaSyDd7lfYmcv5jPE8RndgkXxnsAnuz02fju4",
    authDomain: "persona-portfolio-9ac2u.firebaseapp.com",
    messagingSenderId: "640725775356"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
