// FLAGGED FOR REMOVAL

import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'

import { fbAuth } from '../config/firebase'

import Layout from '../components/layout/Layout'



const Accounts = props => {
  const [formText, setFormText] = useState('')
  const [optIn, setOptIn] = useState('false')

  const handleChange = event => {
    setFormText(event.target.value)
  }

  const actionCodeSettings = {
    url: `http://localhost:3000/signin?optin=${optIn}&scenario=morefakestrings123`,
    handleCodeInApp: true,
  }
  
  const handleSubmit = () => {
    event.preventDefault()
    console.log('submit', formText)
    console.log(optIn)

    fbAuth.sendSignInLinkToEmail(formText, actionCodeSettings)
      .then(() => {
        console.log('link sent?')
        window.localStorage.setItem('emailForSignIn', formText)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const pageContent = (
    <>
      <form onSubmit = {handleSubmit}>
        <TextField 
          label='email'
          value={formText}
          onChange={handleChange}
        />
        <Button type='submit'>
          Submit
        </Button>
      </form>
    </>
  )
  return (
    <>
      <Layout 
        content={pageContent}
        title='Accounts'
      />
    </>
  )
}

export default Accounts