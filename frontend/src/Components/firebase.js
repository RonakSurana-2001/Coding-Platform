import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import React from 'react'
import { useState } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyAA9NOuwTuYdLEb0uAlvOitdU6xNn30aZk",
  authDomain: "codingapp-cf09a.firebaseapp.com",
  projectId: "codingapp-cf09a",
  storageBucket: "codingapp-cf09a.appspot.com",
  messagingSenderId: "353503098517",
  appId: "1:353503098517:web:7fb68efa1341a8e14f4d9c",
  measurementId: "G-WFFB3SQ9PT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);

const provider=new GoogleAuthProvider(); 

export default function firebase() {
    const [useAuth,setuseAuth]=useState();
    signInWithGoogle();
  return (
    <div>firebase</div>
  )
}
