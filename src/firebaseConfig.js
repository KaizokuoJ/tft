import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAxX6K6x2A0AOZPef9Ws05MHMI8tALNJWo",
    authDomain: "tft-cheatsheets.firebaseapp.com",
    databaseURL: "https://tft-cheatsheets.firebaseio.com",
    projectId: "tft-cheatsheets",
    storageBucket: "",
    messagingSenderId: "559741858535",
    appId: "1:559741858535:web:e86bfbd6f5349c52"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
