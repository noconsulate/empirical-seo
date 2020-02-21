import React, { useEffect, useState } from 'react'
import Link from '../src/Link'
import { List, ListItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { fbAuth, db, dbArrayUnion } from '../utl/firebase'

import Layout from '../components/Layout'

const PROD_URL = process.env.PROD_URL

const useStyles = makeStyles(theme => ({
  results: {
    backgroundColor: 'yellow',
  },
}))
const SignIn = props => {
  const classes = useStyles()
  console.log(props)
  const optIn = props.query.optin
  console.log(optIn)
  const scenarioId = props.query.scenarioid 
  console.log(scenarioId)
  const urlId = props.query.urlid
  console.log(urlId)

  const [scenarios, setScenarios] = useState([])

  useEffect(() => {
    // update 'users' collection in database, get data for render 
    const dbUpdate = () => {
      let docRef = db.collection('users').doc(uid)
      docRef.get().then(doc => {
        if (doc.exists) {
          console.log('user exists')
          docRef.set({
            optIn: optIn,
            urlIds: dbArrayUnion(urlId)
          }, {merge: true })
        } else {
          console.log('user dont exists')
          docRef.set({
            urlIds: [urlId],
            email: userEmail,
            optIn: props.query.optin
          })
        }
        // get urlids for render
        let urlsGet
        db.collection('users').doc(uid).get()
          .then(doc => {
            urlsGet = doc.data().urlIds
            console.log(urlsGet)
            setScenarios(urlsGet)
            console.log(scenarios)
          })
      })
      // add user id to scenario  
      db.collection('scenarios').doc(scenarioId).update({
        "owner": uid,
        "private": true,
      })
        .then(() => {
          console.log('scenario uptdated')
        })
        .catch(error => {
          console.log('error', error)
        }) 
    }
    // firebase authentication
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
        // if no user proceed with email link validation *
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
    }
    userProcess()
  }, [])

  const resultsRows = () => {
    console.log(scenarios)
    if (scenarios) {
      return (
        <>
          <Typography variant='body1'>
            The results to all of your scenarios:
          </Typography>
          <List>
            {scenarios.map(item => (
              <ListItem key={item}>
                <Link href={{ pathname: '/results', query: { urlid: item } }}>
                {`${PROD_URL}/results?urlid=${item}`}
                </Link>
              </ListItem>
            ))}
          </List>
        </>
      )
    } else {
      return <p>noscenarios</p>
    }
  }

  const pageContent = (
    <>
      <div className={classes.results}>
        {resultsRows()}
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