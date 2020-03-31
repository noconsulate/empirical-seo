import React, { useState, useEffect, useContext } from 'react'
import {
  Typography, Button, TextField, FormGroup, FormControlLabel, Checkbox
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../src/Link'
import Router from 'next/router'

import UserContext from '../components/UserContext'
import { fbAuth } from '../config/firebase'

import Layout from '../components/Layout'

const domain = process.env.DOMAIN

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: 'brown',
  },
}))

const signin = props => {
  const classes = useStyles()
  const { isUser } = useContext(UserContext)
  const [formText, setFormText] = useState('noconsulate@gmail.com')
  const [checked, setChecked] = useState(false)
  const [pageControl, setPageControl] = useState(0)

//  ** trying to push to actual profile if user is signed in

  useEffect(() => {
    if (isUser) {
      Router.push('/portal?portalMode=continue')
    }
  }, [isUser])

  const handleChange = event => {
    setFormText(event.target.value)
  }
  const handleSignIn = event => {
    event.preventDefault()
    console.log('opt in?', checked)

    const actionCodeSettings = {
      url: `${domain}/portal?portalMode=signin&optin=${checked}`,
      handleCodeInApp: true,
    }

    fbAuth.sendSignInLinkToEmail(formText, actionCodeSettings)
      .then(() => {
        console.log('link sent')
        window.localStorage.setItem('emailForSignIn', formText)
        Router.push('/thankyou')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleCheckbox = event => {
    setChecked(event.target.checked)
  }

  const SignInForm = () => {

    return (
      <>
        <div className={classes.main}>
          <Typography variant='body1'>
            Enter your email address below and you'll be sent a link to your page.
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
      </>
    )
  }

  const viewControl = () => {
    switch (pageControl) {
      case 0:
        return SignInForm()
    }
  }

  const pageContent = (
    <>
      {viewControl()}
    </>
  )

  return (
    <Layout
      content={pageContent}
      title='Sign in to your page'
    />
  )
}

export default signin

