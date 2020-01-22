const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

import { Formik } from 'formik'

import {useEffect} from 'react'


const Fbtest = props => {
  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyDbC1jdZ8p9m6Wtx10vJh6rUAqRDQTbT3I",
      authDomain: "empirical-seo.firebaseapp.com",
      projectId: "empirical-seo",
    };
    firebase.initializeApp(firebaseConfig)
    var db = firebase.firestore()
    
    db.collection('users').add({
      first: 'ada',
      last: 'lovelace',
      born: 1815
    })
    .then(docRef => {
      console.log('document written with id: ', docRef.id)
    })
    .catch(error => {
      console.error('error: ', error)
    })
    
    // Add a second document with a generated ID.
    db.collection("users").add({
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    
  }, [])


  return (
    <p>firebase is cool</p>
  )
}

export default Fbtest