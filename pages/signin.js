import React, { useState, useEffect } from 'react'
import {
  Typography, Button, TextField, FormGroup, FormControlLabel, Checkbox
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../src/Link'
import Router from 'next/router'

import { fbAuth } from '../config/firebase'

import Layout from '../components/Layout'
import { defaultHead } from 'next/head'

const prodUrl = process.env.prodUrl

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: 'brown',
  },
}))

const signin = props => {
  useEffect(() => {
    const user = fbAuth.currentUser
    if (user) {
      Router.push('/portal?portalMode=continue')
    }
  }, [])
  const classes = useStyles()
  // development defautl
  const [formText, setFormText] = useState('noconsulate@gmail.com')
  const [checked, setChecked] = useState(false)
  const [pageControl, setPageControl] = useState(0)

  const handleChange = event => {
    setFormText(event.target.value)
  }
  const handleSignIn = event => {
    event.preventDefault()
    console.log('opt in?', checked)

    const actionCodeSettings = {
      url: `${prodUrl}/portal?portalMode=signin&optin=${checked}`,
      handleCodeInApp: true,
    }

    fbAuth.sendSignInLinkToEmail(formText, actionCodeSettings)
      .then(() => {
        console.log('link sent')
        window.localStorage.setItem('emailForSignIn', formText)
        setPageControl(1)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleCheckbox = event => {
    setChecked(event.target.checked)
  }

  const SignInForm = (
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

  const LinkSent = (
    <>
      <div className={classes.main}>
        <Typography variant='h4'>
          Please check your email
        </Typography>
        <Typography variant='body1'>
          An email has been sent to {formText}. Please follow the link it contains to gain access to your private scenario results and more.
        </Typography>
      </div>
    </>
  )

  const viewControl = () => {
    switch (pageControl) {
      case 0:
        return SignInForm
      case 1:
        return LinkSent
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

