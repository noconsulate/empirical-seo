import React, { useEffect, useState } from 'react'
import {
  Typography, List, ListItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Link from '../src/Link'
import { fbAuth, db, dbArrayUnion,} from '../config/firebase'

import PortalCreate from '../components/PortalCreate'
import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: 'red',
  },
}))

const prodUrl = process.env.prodUrl

const portal = props => {
  const classes = useStyles()

  //url querys
  console.log(props.query)
  const optIn = props.query.optin
  const scenarioId = props.query.scenarioid
  console.log(scenarioId)
  const urlId = props.query.urlid
  console.log(urlId)
  //portal mode for signin flow
  const mode = props.query.portalMode
  console.log(mode)
  let user, uid, userEmail
  const [scenarios, setScenarios] = useState([])

  useEffect(() => {
    console.log(mode)
    if (mode == 'signin') {
      const dbUpdate = () => {
        let docRef = db.collection('users').doc(uid)
        docRef.get().then(doc => {
          if (doc.exists) {
            console.log('user exists')
            docRef.set({
              optIn: optIn,
            }, {merge: true })
          } else {
            console.log('user dont exists')
            docRef.set({
              email: userEmail,
              optIn: optin
            })
          }
          // get urlids for render **not working for some reason. maybe refactor to async function?
          let urlsGet
          db.collection('users').doc(uid).get()
            .then(doc => {
              urlsGet = doc.data().urlIds
              console.log(urlsGet)
            })
            .then(doc => {
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
      
      const userProcess = async () => {
        user = await fbAuth.currentUser
        if (user) {
          console.log('user already signed in', user)
          uid = user.uid
          userEmail = user.email
          console.log(userEmail)
          dbUpdate()
        } else {
          // if no user proceed with email link validation *
          console.log('no user')
          if (fbAuth.isSignInWithEmailLink(window.location.href)) {
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
      console.log(scenarios)
    } else {
       // update 'users' collection in database, get data for render d
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
            optIn: optin
          })
        }
        // get urlids for render **not working for some reason. maybe refactor to async function?
        let urlsGet
        db.collection('users').doc(uid).get()
          .then(doc => {
            urlsGet = doc.data().urlIds
            console.log(urlsGet)
          })
          .then(doc => {
            setScenarios(urlsGet)
            console.log(scenarios)
          })
      })
      // add user id to scenario  
    //   db.collection('scenarios').doc(scenarioId).update({
    //     "owner": uid,
    //     "private": true,
    //   })
    //     .then(() => {
    //       console.log('scenario uptdated')
    //     })
    //     .catch(error => {
    //       console.log('error', error)
    //     }) 
     }
    // firebase authentication
    
    const userProcess = async () => {
      user = await fbAuth.currentUser
      if (user) {
        console.log('user already signed in', user)
        uid = user.uid
        userEmail = user.email
        console.log(userEmail)
        dbUpdate()
      } else {
        // if no user proceed with email link validation *
        console.log('no user')
        if (fbAuth.isSignInWithEmailLink(window.location.href)) {
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
    console.log(scenarios)
    }
   
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
                {`${prodUrl}/results?urlid=${item}`}
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
      <div className={classes.main}>
        {resultsRows()}
      </div>
    </>
  )

  return (
    <Layout
      content={pageContent}
      title='sigin portal'
    />
  )
}

export default portal

portal.getInitialProps = ({ query }) => {
  return ({ query })
}