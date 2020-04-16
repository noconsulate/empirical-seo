import React, { useEffect, useState, } from 'react'
import { connect } from 'react-redux'
import {
  Typography, List, ListItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'

import { fbAuth, db, dbArrayUnion, } from '../config/firebase'
import { setCreate } from '../reducers/flagsSlice'

import Layout from '../components/layout/Layout'
import ScenarioList from '../components/ScenarioList'

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: 'red',
  },
}))

const portal = props => {
  const classes = useStyles()
  const { userEmail, userUid, isUser, } = props.user
  const { loggedInViaCreate } = props.flags
  //url querys
  const optIn = props.query.optin
  const urlId = props.query.urlid
  //portal mode for signin flow
  const mode = props.query.portalMode
  console.log(mode)
  const scenarioUid = props.query.scenarioUid
  let uid = userUid
  let userResult
  const [scenarios, setScenarios] = useState([])
  const [userError, setUserError] = useState(false)

  const processScenarios = async urls => {
    console.log('processUrls', urls)
    await urls.forEach(item => {
      console.log(item)
      const query = db.collection('scenarios').where('urlId', '==', item)
      query.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const scenario = doc.data().scenario
            console.log(scenario)
            setScenarios(prevArray => [
              ...prevArray,
              {
                urlId: item,
                scenario: scenario
              }
            ])
          })
        })
        .catch(error => console.log(error))
    })
  }

  // for signin (from /profile)
  if (mode == 'signin') {
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
                optIn: optIn,
                urlIds: []
              })
            }
            let urlsGet
            db.collection('users').doc(uid).get()
              .then(doc => {
                urlsGet = doc.data().urlIds
                console.log(urlsGet)
              }).then(doc => {
                processScenarios(urlsGet)
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
    }, [])
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
          processScenarios(urlsGet)
          //  setScenarios(urlsGet)
        })
          .catch(error => { console.log('users db error') })
      }
      // get user from fbAuth and db
      if (isUser) {
        console.log('user logged in', userEmail)
        dbUpdate()
      } else {
        console.log('problem with user state', isUser)
      }
      //   
    }, props.user)
  }
  // from create
  if (mode == 'create') {
    useEffect(() => {
      console.log('create mode')
      if (loggedInViaCreate === true) {
        Router.push('/portal?portalMode=continue')
      }
      // auth/db operations for create mode
      const dbUpdate = () => {
        if (loggedInViaCreate === true) {

        }
        console.log('userUid, userEmail in dbUpdate()', userUid, userEmail)
        let docRef = db.collection('users').doc(userResult.uid)
        docRef.get()
          .then(doc => {
            if (doc.exists) {
              console.log('user exists')
              docRef.set({
                optIn: optIn,
                urlIds: dbArrayUnion(urlId)
              }, { merge: true })
                .catch(error => console.log(error))
            } else {
              //user non in db
              console.log('user dont exists')
              docRef.set({
                urlIds: [urlId],
                email: userResult.email,
                optIn: optIn
              })
                .catch(error => console.log(error))
            }
            let urlsGet
            db.collection('users').doc(userResult.uid).get()
              .then(doc => {
                urlsGet = doc.data().urlIds
                console.log(urlsGet)
                processScenarios(urlsGet)
              })
              .catch(error => {
                console.log('deep nested users db error', error)
              })
          })
          .catch(error => {
            console.log('users db error', error)
          })
        db.collection('scenarios').doc(scenarioUid).set({
          owner: userUid,
        }, { merge: true })
        setCreate()
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
                console.log('signed in', result.user.email, result.user.uid)
                // in case of redux not working right
                userResult = result.user
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
          Something went wrong with the authentication process. Please try again. Please make sure you're logging in with the link we most recently sent you. 
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
      <div className={classes.main}>
        {ViewControl()}

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

portal.getInitialProps = ({ query }) => {
  return ({ query })
}

const mapState = state => ({
  user: state.user,
  flags: state.flags
})

const mapDispatch = { setCreate }

export default connect(mapState, mapDispatch)(portal)

