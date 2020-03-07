import React, { useEffect, useState, useContext } from 'react'
import {
  Typography, List, ListItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Link from '../src/Link'
import { fbAuth, db, dbArrayUnion, } from '../config/firebase'
import UserContext from '../components/UserContext'

import PortalCreate from '../components/PortalCreate'
import Layout from '../components/Layout'
import ScenarioList from '../components/ScenarioList'

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: 'red',
  },
}))

const prodUrl = process.env.prodUrl

const portal = props => {
  const classes = useStyles()
  const { userEmail, userUid, isUser, } = useContext(UserContext)
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
  let uid = userUid
  const [scenarios, setScenarios] = useState([])
  const [userError, setUserError] = useState(false)

  // for signin (from /profile)
  if (mode == 'sigin') {
    useEffect(() => {
      console.log('sigin in mode (from /profle)')
      const dbUpdate = () => {
        let docRef = db.collection('users').doc(uid)
        docRef.get()
          .then(doc => {
            if (doc.exists) {
              console.log('user exists in DB')
              docRef.set({
                optIn: optIn,
              }, { merge: true })
            } else {
              console.log('user does not exist in DB')
              docRef.set({
                email: userEmail,
                optIn: optIn
              })
            }
            let urlsGet
            db.collection('users').doc(uid).get()
              .then(doc => {
                urlsGet = doc.data().urlIds
                console.log(urlsGet)
              }).then(doc => {
                setScenarios(urlsGet)
                console.log(scenarios)
              })
          })
          .catch(error => { console.log(error) })
      }
      //sign in with firebase auth
      const userProcess = async () => {
        if (isUser) {
          console.log('user already signed in', userEmail)
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
                console.log('signed in', result)
                uid = result.user.uid
                dbUpdate()
              })
              .catch(error => {
                console.log('signin with email error', error)
                setUserError(true)
              })
          }
        }
      }
      userProcess()
    }, [isUser])
  }

  // from profile if user
  if (mode == 'continue') {
    useEffect(() => {
      console.log('continue mode')
      const dbUpdate = () => {
        let urlsGet
        let docRef = db.collection('users').doc(uid)
        docRef.get().then(doc => {
          console.log('user found')
          urlsGet = doc.data().urlIds
          setScenarios(urlsGet)
        })
          .catch(error => { console.log('users db error') })
      }
      // get user from fbAuth and db
      if (isUser) {
        console.log('user logged in', userEmail)
        dbUpdate()
      } else {
        console.log('problem with user context', isUser)
      }
      //   
    }, [isUser])
  }
  // from create
  if (mode == 'create') {
    useEffect(() => {
      console.log('create mode')
      // auth/db operations for create mode
      const dbUpdate = () => {
        let docRef = db.collection('users').doc(uid)
        docRef.get()
          .then(doc => {
            if (doc.exists) {
              console.log('user exists')
              docRef.set({
                optIn: optIn,
                urlIds: dbArrayUnion(urlId)
              }, { merge: true })
            } else {
              //user non in db
              console.log('user dont exists')
              docRef.set({
                urlIds: [urlId],
                email: userEmail,
                optIn: optIn
              })
            }
            let urlsGet
            db.collection('users').doc(uid).get()
              .then(doc => {
                urlsGet = doc.data().urlIds
                console.log(urlsGet)
                setScenarios(urlsGet)
              })
              .catch(error => {
                console.log('deep nested users db error', error)
              })
          })
          .catch(error => {
            console.log('users db error', error)
          })
      }
      // firebase authentication

      const userProcess = async () => {
        if (isUser) {
          console.log('user already signed in', userEmail)
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
    }, [])
  }
  const userErrorPane = () => {
    return (
      <div className={classes.main}>
        <Typography variant='h3'>
          Authentication error!
    </Typography>
        <Typography variant='body1'>
          Something went wrong with the authentication process. Please try again.
    </Typography>
      </div>
    )
  }

  const ViewControl = () => {
    switch (userError) {
      case true:
        return userErrorPane()
      case false:
        return <ScenarioList scenarios={scenarios} />
    }
  }

  const pageContent = (
    <>
      {ViewControl()}
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

// useEffect(() => {
  //   console.log(mode)
  //   if (mode == 'continue') {
  //     console.log('continue mode')
  //     const dbUpdate = () => {
  //       let urlsGet
  //       let docRef = db.collection('users').doc(uid)
  //       docRef.get().then(doc => {
  //         console.log('user found')
  //         urlsGet = doc.data().urlIds
  //         setScenarios(urlsGet)
  //       })
  //         .catch(error => { console.log('users db error') })
  //     }
  //     // get user from fbAuth and db
  //     user = fbAuth.currentUser
  //     if (userEmail != 'no user') {
  //       console.log('user logged in', userEmail)
  //       dbUpdate()
  //     }
  //   }
  //   // auth and db operation for signin mode
  //   if (mode == 'signin') {
  //     console.log('sign in mode')
  //     const dbUpdate = () => {
  //       let docRef = db.collection('users').doc(uid)
  //       docRef.get().then(doc => {
  //         if (doc.exists) {
  //           console.log('user exists')
  //           docRef.set({
  //             optIn: optIn,
  //           }, { merge: true })
  //         } else {
  //           console.log('user dont exists')
  //           docRef.set({
  //             email: userEmail,
  //             optIn: optIn
  //           })
  //         }
  //         // get urlids for render **not working for some reason. maybe refactor to async function?
  //         let urlsGet
  //         db.collection('users').doc(uid).get()
  //           .then(doc => {
  //             urlsGet = doc.data().urlIds
  //             console.log(urlsGet)
  //           })
  //           .then(doc => {
  //             setScenarios(urlsGet)
  //             console.log(scenarios)
  //           })
  //       })
  //     }
  //     // firebase authentication

  //     const userProcess = async () => {
  //       if (userEmail != 'no email' && userEmail != 'init userEmail') {
  //         console.log('user already signed in', userEmail)
  //         dbUpdate()
  //       } else {
  //         // if no user proceed with email link validation *
  //         console.log('no user')
  //         if (fbAuth.isSignInWithEmailLink(window.location.href)) {
  //           let email = window.localStorage.getItem('emailForSignIn')
  //           if (!email) {
  //             email = window.prompt('please provide email for account confirmation')
  //           }
  //           fbAuth.signInWithEmailLink(email, window.location.href)
  //             .then(result => {
  //               console.log('signed in', result)
  //               uid = result.user.uid
  //               dbUpdate()
  //             })
  //             .catch(error => {
  //               console.log('signin with email error', error)
  //             })
  //         }
  //       }
  //     }

  //     userProcess()
  //     console.log(scenarios)
  //   }
  //   if (mode == 'create') {
  //     console.log('create mode')
  //     // auth/db operations for create mode
  //     const dbUpdate = () => {
  //       let docRef = db.collection('users').doc(uid)
  //       docRef.get()
  //         .then(doc => {
  //           if (doc.exists) {
  //             console.log('user exists')
  //             docRef.set({
  //               optIn: optIn,
  //               urlIds: dbArrayUnion(urlId)
  //             }, { merge: true })
  //           } else {
  //             //user non in db
  //             console.log('user dont exists')
  //             docRef.set({
  //               urlIds: [urlId],
  //               email: userEmail,
  //               optIn: optIn
  //             })
  //           }
  //           let urlsGet
  //           db.collection('users').doc(uid).get()
  //             .then(doc => {
  //               urlsGet = doc.data().urlIds
  //               console.log(urlsGet)
  //               setScenarios(urlsGet)
  //             })
  //             .catch(error => {
  //               console.log('deep nested users db error', error)
  //             })
  //         })
  //         .catch(error => {
  //           console.log('users db error', error)
  //         })
  //     }
  //     // firebase authentication

  //     const userProcess = async () => {
  //       user = await fbAuth.currentUser
  //       if (user) {
  //         console.log('user already signed in', user)
  //         uid = user.uid
  //         userEmail = user.email
  //         console.log(userEmail)
  //         dbUpdate()
  //       } else {
  //         // if no user proceed with email link validation *
  //         console.log('no user')
  //         if (fbAuth.isSignInWithEmailLink(window.location.href)) {
  //           let email = window.localStorage.getItem('emailForSignIn')
  //           if (!email) {
  //             email = window.prompt('please provide email for account confirmation')
  //           }
  //           fbAuth.signInWithEmailLink(email, window.location.href)
  //             .then(result => {
  //               console.log('signed in', result.user)
  //               uid = result.user.uid
  //               userEmail = result.user.email
  //               console.log(uid, userEmail)
  //               dbUpdate()
  //             })
  //             .catch(error => {
  //               console.log('signin with email error', error)
  //             })
  //         }
  //       }
  //     }
  //     userProcess()
  //     console.log(scenarios)
  //   }

  // }, [])

