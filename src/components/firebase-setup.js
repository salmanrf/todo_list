// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEzqOml9t9DxEhlB2NHF7hL0LwmoJ9evc",
    authDomain: "todo-list-f7dfa.firebaseapp.com",
    databaseURL: "https://todo-list-f7dfa.firebaseio.com",
    projectId: "todo-list-f7dfa",
    storageBucket: "todo-list-f7dfa.appspot.com",
    messagingSenderId: "166376877325",
    appId: "1:166376877325:web:43532f382ce6a2db3c1444",
    measurementId: "G-Z7FCXRQPB3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();


