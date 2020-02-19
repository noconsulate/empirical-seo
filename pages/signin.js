import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { fbAuth, db } from '../config/firebase'

import Layout from '../components/Layout'



const useStyles = makeStyles(theme => ({
  signup: {
    backgroundColor: 'yellow',
  },
}))
const SignIn = props => {
  const classes = useStyles()
  console.log(props)
  const optIn = props.query.optin
  console.log(optIn)

  useEffect(() => {
    const dbUpdate = () => {
      const docRef = db.collection('users').doc(uid)
      docRef.get().then(doc => {
        if (doc.exists) {
          console.log('user exists')
        } else {
          console.log('user dont exists')
          db.collection('users').doc(uid).set({
            scenarios: 'scenario uid goes here',
            email: userEmail,
            optIn: props.query.optin
          })
        }
      })
    }

    let user, uid, userEmail
    const userProcess = async () => {
      user = await fbAuth.currentUser
      if (user) {
        console.log('hooray', user)
        uid = user.uid
        userEmail = user.email
        console.log(userEmail)
        dbUpdate()
      } else {
        // if no user proceed with email link validation lala
        console.log('no user')
        if (fbAuth.isSignInWithEmailLink(window.location.href)) {
          console.log('if')
          let email = window.localStorage.getItem('emailForSignIn')
          if (!email) {
            email = window.prompt('please provide email for account confirmation')
          }
          fbAuth.signInWithEmailLink(email, window.location.href)
            .then(result => {
              console.log('signed in', result.user)
              uid = result.user.uid
              userEmail = result.user.email
              console.log(uid, userEmail)
              dbUpdate()
            })
            .catch(error => {
              console.log('signin with email error', error)
            })
        }

      }
      console.log(uid)
      // check if user exists in db

    }

    userProcess()



    // check if user is in db, if so add new scenario to doc lal

  }, [])

  const pageContent = (
    <>
      <div className={classes.signup}>
        hello please continue signing up
      </div>
    </>
  )

  return (
    <>
      <Layout
        content={pageContent}
        title='Finish signup'
      />
    </>
  )
}

export default SignIn

SignIn.getInitialProps = ({ query }) => {
  return ({ query })
}