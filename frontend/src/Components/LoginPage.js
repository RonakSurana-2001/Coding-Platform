import React from 'react';
import '../Styles/LoginButtonStyle.css';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
// import { signInWithGoogle } from './firebase';
export default function LoginButton(props) {
    const firebaseConfig = {
        apiKey: "AIzaSyAA9NOuwTuYdLEb0uAlvOitdU6xNn30aZk",
        authDomain: "codingapp-cf09a.firebaseapp.com",
        projectId: "codingapp-cf09a",
        storageBucket: "codingapp-cf09a.appspot.com",
        messagingSenderId: "353503098517",
        appId: "1:353503098517:web:7fb68efa1341a8e14f4d9c",
        measurementId: "G-WFFB3SQ9PT"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();
    const navigate=useNavigate();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            navigate("/homePage");
            localStorage.setItem("isLogin","true");
            localStorage.setItem("userId",result.user.uid);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="wecodeLoginPage">
            <div className="wecodeLoginPageHeader">
                <p>WeCode</p>
            </div>
            <div className="wecodeLoginPageButton">
                <button onClick={signInWithGoogle}>
                    Sign In
                </button>
            </div>
        </div>
    );
}