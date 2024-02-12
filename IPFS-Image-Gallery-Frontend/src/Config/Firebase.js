// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcY3V8clCetOggZqYQVyhpKni283hX6Wk",
  authDomain: "ipfs-image-gallery.firebaseapp.com",
  projectId: "ipfs-image-gallery",
  storageBucket: "ipfs-image-gallery.appspot.com",
  messagingSenderId: "899623649332",
  appId: "1:899623649332:web:93e0994acdda47c3a7ca61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
