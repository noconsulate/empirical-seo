import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography, Button, Grid, FormControl, TextField, Checkbox,
  FormGroup, FormControlLabel
} from '@material-ui/core'
import shortid from 'shortid'
import { db, fbAuth } from '../config/firebase'

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
  },
  draft: {
    border: 'solid'
  }
}))

const prodUrl = process.env.prodUrl
console.log('url ENV variable', prodUrl)

// check for user, otherwise sign in anon

// fbAuth.signInAnonymously().catch(error => {
//   console.log(error)
// })
const Create = props => {
  const [urlId, setUrlId] = useState('')
  const [scenarioUid, setScenarioUid] = useState('')
  const [pageControl, setPageControl] = useState(0)
  const [formText, setFormText] = useState('')
  const [checked, setChecked] = useState(false)
  const [scenarioText, setScenarioText] = useState('')

  const classes = useStyles()

  // check user
  useEffect(() => {
    // reset state (i think this was to deal with back click or refresh?)
    //  setPageControl(0)
    const userProcess = async () => {
      const user = fbAuth.currentUser
      if (!user) {
        fbAuth.signInAnonymously().catch(error => {
          console.log('anon signin error', error)
        })
      }
    }
    userProcess()
  }, [])

  const handleCheckbox = event => {
    setChecked(event.target.checked)
  }
  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleSignIn = event => {
    event.preventDefault()
    console.log('opt in?', checked)

    const actionCodeSettings = {
      url: `${prodUrl}/portal?mode='create'&optin=${checked}&urlid=${urlId}&scenarioid=${scenarioUid}`,
      handleCodeInApp: true,
    }

    fbAuth.sendSignInLinkToEmail(formText, actionCodeSettings)
      .then(() => {
        console.log('link sent')
        window.localStorage.setItem('emailForSignIn', formText)
      })
      .catch(error => {
        console.log(error)
      })
    // set scenario to private
    db.collection('scenarios').doc(scenarioUid).update({
      private: true,
    })
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
    })
      .then(docRef => {
        console.log('scenario written to: ', docRef.id, 'with url id:', urlIdGen)
        setScenarioUid(docRef.id)
        setUrlId(urlIdGen)
        setPageControl(2)
        setFormText('')
        setScenarioText(formText)
      })
      .catch(error => {
        console.error('error adding document: ', error.message)
      })
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
    return (
      <div className={classes.extra}>
        <Typography variant='body1'>
          Here's the link to your survey, make sure to save it somewhere! Anybody who has this link can participate. 
        </Typography>
        <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
          <a>{`${prodUrl}/survey?urlid=${urlId}`}</a>
        </Link>
        <Typography variant='body1'>
          Here's the results page. Please note anyone with this link can see your results, unless you create an account.
        </Typography>
        <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
          <a>{`${prodUrl}/results?urlid=${urlId}`}</a>
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
              label='AUSTIN COME UP WITH SOMETHING HERE'
            />
          </FormGroup>
          <Button type='submit'>
            Sign in!
          </Button>
        </form>
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
        </div>
      </>
    )
  }

  const viewControl = () => {
    switch (pageControl) {
      case 0:
        return ScenarioForm()
      case 2:
        return LoginForm()
      case 1:
        return Draft()
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