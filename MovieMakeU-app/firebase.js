// firebase 내용

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDljLuGD6TUhnkgezYrFtGeta4p9VwP1eQ",
  authDomain: "moviemakeu.firebaseapp.com",
  databaseURL: "https://moviemakeu-default-rtdb.firebaseio.com",
  projectId: "moviemakeu",
  storageBucket: "moviemakeu.appspot.com",
  messagingSenderId: "308608060636",
  appId: "1:308608060636:web:a7d7dac61ce6872fa1f819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;