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
  const [uid, setUid] = useState('')

  const classes = useStyles()

  useEffect(() => {
    var user = fbAuth.currentUser
    if (user) {
      console.log(user.uid)
    }

    // if no user proceed with email link validation
    if (!user) {
      if (fbAuth.isSignInWithEmailLink(window.location.href)) {
        console.log('if')
        let email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
          email = window.prompt('please provide email for account confirmation')
        }
      
        console.log('window location', window.location.href)
        fbAuth.signInWithEmailLink(email, window.location.href)
          .then(result => {
            console.log('signed in', result.user, result.user.linkAndRetrieveDataWithCredential)
            const foo = result.user.uid
            console.log(foo, foo.uid)
            setUid(result.user.uid)
            console.log(uid)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }

    // check if user is in db, if so add new scenario to doc
    
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