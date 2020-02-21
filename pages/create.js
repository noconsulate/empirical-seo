import React, { useState } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography, Button, Grid, FormControl, TextField, Checkbox,
  FormGroup, FormControlLabel
} from '@material-ui/core'
import shortid from 'shortid'
import { db, fbAuth } from '../config/firebase'

import Layout from '../components/Layout'

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
}))

const PROD_URL = process.env.PROD_URL
console.log(PROD_URL)

const Create = props => {
  const [urlId, setUrlId] = useState('')
  const [scenarioUid, setScenarioUid] = useState('')
  const [pageControl, setPageControl] = useState(0)
  const [formText, setFormText] = useState('')
  const [checked, setChecked] = useState(false)

  const classes = useStyles()

  const handleCheckbox = event => {
    setChecked(event.target.checked)
  }
  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleSubmitScenario = event => {
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
        setPageControl(1)
        setFormText('')
      })
      .catch(error => {
        console.error('error adding document: ', error.message)
      })
  }

  const handleSignIn = event => {
    event.preventDefault()
    console.log('opt in?', checked)

    const actionCodeSettings = {
      url: `http://localhost:3000/signin?optin=${checked}&urlid=${urlId}&scenarioid=${scenarioUid}`,
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
  }

  const ScenarioForm = () => {
    return (
      <>
        <div className={classes.description}>
          <Typography variant='body1'>
            Please consider a scenario that describes the situation your user will be in when they do a Google search that will lead them to your website.
          </Typography>
        </div>
        <form autoComplete='off' className={classes.form} onSubmit={handleSubmitScenario}>
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
          Here's the link to your survey.
        </Typography>
        <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
          <a>{`${PROD_URL}/survey?urlid=${urlId}`}</a>
        </Link>
        <Typography variant='body1'>
          Here's the results page. Please note anyone with this link can see your results, unless you create an account.
        </Typography>
        <Link href={{ pathname: '/results', query: {urlid: urlId } }}>
          <a>{`${PROD_URL}/results?urlid=${urlId}`}</a>
        </Link>
        <Typography variant='body1'>
          In order for us to secure your results so that only you can see them, you need to make an account with us. Don't worry, we won't ever email you unless you opt in and we won't share your information with anyone!
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
              label='Opt in?'
            />
          </FormGroup>
          <Button type='submit'>
            Sign in!
          </Button>
        </form>
      </div>
    )
  }

  const viewControl = () => {
    switch (pageControl) {
      case 0:
        return ScenarioForm()
      case 1:
        return LoginForm()
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