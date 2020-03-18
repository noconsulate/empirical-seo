import React, { useState, useEffect, useContext } from 'react'
import Link from '../src/Link'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography, Button, Grid, FormControl, TextField, Checkbox,
  FormGroup, FormControlLabel
} from '@material-ui/core'
import shortid from 'shortid'
import { db, fbAuth, dbArrayUnion } from '../config/firebase'
import UserContext from '../components/UserContext'
import ScenarioContext from '../components/ScenarioContext'

import Layout from '../components/Layout'
import Survey from '../components/Survey'

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

const domain = process.env.domain

const Create = props => {
  const [urlId, setUrlId] = useState('')
  const [scenarioUid, setScenarioUid] = useState('')
  const [pageControl, setPageControl] = useState(0)
  const [formText, setFormText] = useState('')
  const [checked, setChecked] = useState(false)
  const [scenarioText, setScenarioText] = useState('')
  const { userEmail, userUid, isUser, fbSignOut } = useContext(UserContext)
  const { scenarioTextUpdate } = useContext(ScenarioContext)

  const classes = useStyles()

  const [_count, forceUpdate] = React.useReducer(x => x + 1, 0)

  useEffect(() => {
    console.log('use effect')
    // reset state for when user clicks on create button
    setPageControl(0)
    setFormText('')
    forceUpdate()
    
  }, [])

  const handleCheckbox = event => {
    setChecked(event.target.checked)
  }
  const handleChange = event => {
    setFormText(event.target.value)
  }

  // put this in UserContext.js
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

  const handleSubmit = event => {
    event.preventDefault()
    setScenarioText(formText)
    setPageControl(1)
    
  }

  const handlePublish = () => {
    event.preventDefault()
    const urlIdGen = shortid.generate()
    console.log(urlId)

    db.collection('scenarios').add({
      scenario: formText,
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
  const ScenarioForm = () => {
    return (
      <>
        <div className={classes.description}>
          <Typography variant='body1'>
            Please consider a scenario that describes the situation your user will be in when they do a Google search that will lead them to your website.
          </Typography>
        </div>
        <form autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
          <TextField id='foo'
            label="scenario"
            multiline
            fullWidth
            rowsMax='2'
            value={formText}
            onChange={handleChange}
          />
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </form>
      </>
    )
  }
  const LoginForm = () => {
    if (isUser) {
      return (
        <>
          <div className={classes.extra}>
            <Typography variant='body1'>
              You are logged in as {userEmail}. Your new scenario will automatically be set to private and saved to this email, unless you logout.
            </Typography>
            <Button onClick={handleContinue}>
              Continue
            </Button>
            <Button onClick={fbSignOut}>
              Logout
            </Button>
          </div>
        </>
      )
    }
    return (
      <div className={classes.extra}>
        <Typography variant='body1'>
          Here's the link to your survey, make sure to save it somewhere! Anybody who has this link can participate.
        </Typography>
        <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
          {`${domain}/survey?urlid=${urlId}`}
        </Link>
        <Typography variant='body1'>
          Here's the results page. Please note anyone with this link can see your results, unless you provide your email address below.
        </Typography>
        <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
          {`${domain}/results?urlid=${urlId}`}
        </Link>
        <Typography variant='body1'>
          In order for us to secure your results so that only you can see them, all we need is your email address.
        </Typography>
        <form onSubmit={handleSignIn}>
          <TextField
            label='email'
            value={formText}
            onChange={handleChange}
            type='email'
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckbox}
                  valiue='primary'
                />
              }
              label='AUSTIN COME UP WITH SOMETHING HERE for OPT IN language'
            />
          </FormGroup>
          <Button type='submit'>
            Sign in!
          </Button>
        </form>
        <Button onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    )
  }

  const Draft = () => {
    console.log('surveypane')
    return (
      <>
        <div className={classes.description}>
          <Typography varaint='body1'>
            Here is what your survey will look like.
        </Typography>
          <div className={classes.draft}>
            <Survey scenario={scenarioText} />
          </div>
          <Typography variant='body1'>
            After you click publish you'll get a link to the scenario for you to share and a link to special page where you can see all of the results. You'll also have the opportunity to make your results private.
        </Typography>
          <Button onClick={handlePublish}>publish!</Button>
          <Button onClick={handleGoBack}>
            Edit
          </Button>
        </div>
      </>
    )
  }

  const ThankYou = () => {
    return (
      <>
        <div className={classes.description}>
          <Typography variant='h4'>
            Thank you!
        </Typography>
          <Typography varaint='body1'>
            Please follow the link we just emailed to you. Every survey you create that you choose to make private will be associated with your email address, which you can use anytime to see a list of your surveys and private results by clicking on the profile icon in the upper right.
        </Typography>
          <Typography variant='body1'>
            Here is a link to the survey you just created. Be sure to bookmark it for later!
        </Typography>
          <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
            {`${domain}/results?urlid=${urlId}`}
          </Link>
          <br />
          <Button onClick={handleReset}>
            Create a new scenario
          </Button>
        </div>
      </>
    )
  }

  const Success = () => {
    return (
      <>
      <div className={classes.description}>
        <Typography variant='h4'>
          Thank you!
      </Typography>
        <Typography variant='body1'>
          Here is a link to the survey you just created. Be sure to bookmark it for later! You can see all of your surveys and their results anytime by going to www.domain.com/profile or click the profile link above. Anytime you visit one of your surveys when you're logged in you'll see a link to the results for that survey.
      </Typography>
        <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
          {`${domain}/results?urlid=${urlId}`}
        </Link>
        <br />
        <Button onClick={handleReset}>
          Create a new scenario
        </Button>
      </div>
    </>
    )
  }

  const viewControl = () => {
    switch (pageControl) {
      case 0:
        return ScenarioForm()
      case 1:
        return Draft()
      case 2:
        return LoginForm()
      case 3:
        return ThankYou()
      case 4: 
        return Success()
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

export default Create