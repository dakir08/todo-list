import firebase from "firebase";
import "firebase/app";
import "firebase/auth";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDc18A4MSWeGDPr9F0qQeI4MoYWL53LWz0",
  authDomain: "to-do-list-a592d.firebaseapp.com",
  databaseURL: "https://to-do-list-a592d.firebaseio.com",
  projectId: "to-do-list-a592d",
  storageBucket: "to-do-list-a592d.appspot.com",
  messagingSenderId: "427078089459",
  appId: "1:427078089459:web:7fd8f43cee3ecb8f4ad586",
  measurementId: "G-LFJSVBZTJ6",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const databaseRef = firebase.database().ref();

export const todosRef = databaseRef.child("todos");

export const userRef = databaseRef.child("users");

export const auth = firebase.auth();
