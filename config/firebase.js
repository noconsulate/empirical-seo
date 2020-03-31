import * as firebase from 'firebase/app'
import "firebase/firestore"
import 'firebase/auth'


var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "empirical-seo.firebaseapp.com",
  databaseURL: "https://empirical-seo.firebaseio.com",
  projectId: "empirical-seo",
  storageBucket: "empirical-seo.appspot.com",
  messagingSenderId: "505200545458",
  appId: "1:505200545458:web:19c8fe9fde480b5bc483ab"
};
// Initialize Firebase
if (!firebase.apps.length) {
  try {
      firebase.initializeApp(firebaseConfig)
  } catch (err) {
      console.error('Firebase initialization error raised', err.stack)
  }
}

export const db = firebase.firestore()

export const dbArrayUnion = firebase.firestore.FieldValue.arrayUnion

export const fbAuth = firebase.auth()
