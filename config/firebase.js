import * as firebase from 'firebase/app'
import "firebase/firestore"
import 'firebase/auth'


var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
// Initialize Firebase
console.log('init firebase, env debug', process.env.API_KEY)
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
