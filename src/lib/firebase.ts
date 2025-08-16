'use client';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
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

// Enable offline persistence
try {
    enableIndexedDbPersistence(db);
} catch (err: any) {
    if (err.code === 'failed-precondition') {
        console.warn('Firebase persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
        console.warn('Firebase persistence failed: Browser does not support it.');
    }
}


export { app, db, storage };
