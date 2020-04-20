import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Typography, Button, TextField, FormGroup, FormControlLabel, Checkbox
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'

import { fbAuth } from '../config/firebase'

import Layout from '../components/layout/Layout'
//import ThankYou from '../components/ThankYou'

const domain = process.env.DOMAIN

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    border: 'dashed'
  },
}))

const signin = props => {
  const classes = useStyles()
  const { isUser, isAnon } = props.user
  const [formText, setFormText] = useState('noconsulate@gmail.com')
  const [checked, setChecked] = useState(false)
  const [pageControl, setPageControl] = useState(0)

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
        setPageControl(1)
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
      </>
    )
  }

  const ThankYou = props => {
    const classes = useStyles()
  
    return (
      <>
          <Typography variant='body1'>
            Thank you. Please follow the link in your email to continue.
          </Typography>
      </>
    )
  }

  const viewControl = () => {
    switch (pageControl) {
      case 0:
        return SignInForm()
      case 1:
        return <ThankYou />
    }
  }

  const pageContent = (
    <div className={classes.root}>
      {viewControl()}
    </div>
  )

  return (
    <Layout
      content={pageContent}
      title='Sign in to your page'
    />
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(signin)

