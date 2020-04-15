import React, { useState, useEffect, } from 'react'
import Link from '../src/Link'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography, Button, Grid, FormControl, TextField, Checkbox,
  FormGroup, FormControlLabel
} from '@material-ui/core'
import shortid from 'shortid'
import { db, fbAuth, dbArrayUnion } from '../config/firebase'

import Layout from '../components/Layout'
import Survey from '../components/Survey'

import ScenarioForm from '../components/create/ScenarioForm'
import Draft from '../components/create/Draft'
import LoginForm from '../components/create/LoginForm'

import Success from '../components/create/Succes'

const useStyles = makeStyles(theme => ({
  extra: {
    backgroundColor: 'red',
  },
  form: {
    backgroundColor: 'yellow',
  },
  description: {
    backgroundColor: 'orange',
    direction: 'comlumn'
  },
  draft: {
    border: 'solid'
  }
}))

const domain = process.env.DOMAIN

const Create = props => {
  const [urlId, setUrlId] = useState('')
  const [scenarioUid, setScenarioUid] = useState('')
  const [pageControl, setPageControl] = useState(0)
  const [formText, setFormText] = useState('')
  const [checked, setChecked] = useState(false)
  const [scenarioText, setScenarioText] = useState('')
  const { userEmail, userUid, isUser, fbSignOut } = props.user

  const classes = useStyles()

  const [_count, forceUpdate] = React.useReducer(x => x + 1, 0)

  useEffect(() => {
    console.log('use effect')
    // reset state for when user clicks on create button
    setPageControl(0)
    setFormText('')
    forceUpdate()
    console.log(process.env.ENV_TEST, process.env.API_KEY, process.env.DATABASE_URL)
  }, [])

  // firebase email authentication
  const handleSignIn = event => {
    event.preventDefault()
    console.log('opt in?', checked)

    const actionCodeSettings = {
      url: `${domain}/portal?portalMode=create&optin=${checked}&urlid=${urlId}&scenarioUid=${scenarioUid}`,
      handleCodeInApp: true,
    }

    fbAuth.sendSignInLinkToEmail(formText, actionCodeSettings)
      .then(() => {
        console.log('link sent')
        window.localStorage.setItem('emailForSignIn', formText)
        setPageControl(3)
      })
      .catch(error => {
        console.log(error)
      })
    // set scenario to private, this should be done after sign in is complete so that it doens't get lost
    db.collection('scenarios').doc(scenarioUid).update({
      private: true,
    })
  }

  const handleContinue = () => {
    db.collection('scenarios').doc(scenarioUid).update({
      private: true,
    })
      .catch(error => console.log(error))
    db.collection('users').doc(userUid).update({
      urlIds: dbArrayUnion(urlId)
    })
      .catch(error => console.log(error))
    setPageControl(4)
  }

  const handleSubmit = text => {
    event.preventDefault()
    setScenarioText(text)
    setPageControl(1)
  }

  const handlePublish = (text) => {
    event.preventDefault()
    const urlIdGen = shortid.generate()
    console.log(urlIdGen, text)

    db.collection('scenarios').add({
      scenario: text,
      urlId: urlIdGen,
      private: false,
      owner: userUid,
    })
      .then(docRef => {
        console.log('scenario written to: ', docRef.id, 'with url id:', urlIdGen)
        setScenarioUid(docRef.id)
        setUrlId(urlIdGen)
        setPageControl(2)
        setFormText('')
        setScenarioText(formText)
        setFormText('noconsulate@gmail.com')
      })
      .catch(error => {
        console.error('error adding document: ', error.message)
      })
  }

  const handlePublishIsUser = () => {
    event.preventDefault()
    const urlIdGen = shortid.generate()
    console.log('handlePublishIsUser')

    db.collection('scenarios').add({
      scenario: formText,
      urlId: urlIdGen,
      private: true,
      owner: userUid,
    })
      .then(docRef => {
        console.log('scenario written to: ', docRef.id, 'with url id:', urlIdGen)
        setScenarioUid(docRef.id)
        setUrlId(urlIdGen)
        setPageControl(4)
        setFormText('')
        setScenarioText(formText)
        setFormText('noconsulate@gmail.com')
      })
      .catch(error => {
        console.error('error adding document: ', error.message)
      })
      db.collection('users').doc(userUid).update({
        urlIds: dbArrayUnion(urlIdGen)
      })
        .catch(error => console.log(error))
      setPageControl(4)
  }

  const handleGoBack = event => {
    event.preventDefault()
    setPageControl(pageControl - 1)
    setFormText('')
  }

  const handleReset = event => {
    event.preventDefault()
    setPageControl(0)
    setFormText('')
  }

  // const ThankYou = () => {
  //   return (
  //     <>
  //       <div className={classes.description}>
  //         <Typography variant='h4'>
  //           Thank you!
  //       </Typography>
  //         <Typography varaint='body1'>
  //           Please follow the link we just emailed to you. Every survey you create that you choose to make private will be associated with your email address, which you can use anytime to see a list of your surveys and private results by clicking on the profile icon in the upper right.
  //       </Typography>
  //         <Typography variant='body1'>
  //           Here is a link to the survey you just created. Be sure to bookmark it for later!
  //       </Typography>
  //         <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
  //           {`${domain}/results?urlid=${urlId}`}
  //         </Link>
  //         <br />
  //         <Button onClick={handleReset}>
  //           Create a new scenario
  //         </Button>
  //       </div>
  //     </>
  //   )
  // }

  const viewControl = () => {
    switch (pageControl) {
      case 0:
        return <ScenarioForm 
          handleSubmit={handleSubmit} 
         
        />
      case 1:
        return <Draft
                handlePublish={handlePublish}
                handlePublishIsUser={handlePublishIsUser}
                handleGoBack={handleGoBack}
                scenarioText={scenarioText}
              />
      case 2:
        return <LoginForm handleSignIn={handleSignIn} urlId={urlId} />
      case 3:
        return <ThankYou handleReset={handleRest} urlId={urlId} />
      case 4:
        return <Success handleReset={handleReset} urlId={urlId} />
    }
  }

  const pageContent = (
    <>
      {
        viewControl()
      }
    </>
  )

  return (
    <>
      <Layout
        content={pageContent}
        title='Create a New Scenario'
      />
    </>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(Create)