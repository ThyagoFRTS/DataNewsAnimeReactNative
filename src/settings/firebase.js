import * as firebase from "firebase"
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtKWJe0K4u6SnJXA2rFtTIy8gEmZjPwFc",
  authDomain: "datanewsanime-cfeb9.firebaseapp.com",
  databaseURL: "https://datanewsanime-cfeb9-default-rtdb.firebaseio.com",
  projectId: "datanewsanime-cfeb9",
  storageBucket: "datanewsanime-cfeb9.appspot.com",
  messagingSenderId: "43643810660",
  appId: "1:43643810660:web:4f0411ecdae49a0ab18071",
  measurementId: "G-36K5YP3T7W"
};


  // Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

