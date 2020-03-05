import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { fbAuth } from '../config/firebase'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'orange'
  },
  user: {
    backgroundColor: 'pink',
  },
}))
const Header = () => {
  const [email, setEmail] = useState('')
  let user

  useEffect(() => {
    user = fbAuth.currentUser
    console.log(user)
    if (user)
      setEmail(user.email)
  }, [])
  const classes = useStyles()

  const handleClick = event => {
    event.preventDefault()
    console.log('logout')
    fbAuth.signOut()
      .then(res => {
        console.log('signed out')
      })
      .catch(error => {
        console.log(error)
      })
  }
  const UserInfo = () => {
    if (email == '') {
      return null
    }
    
    return (
      <>
        <div className={classes.user}>
        <Typography variant='body1'>
          {email}
        </Typography>
        <Button onClick={handleClick}>
          Logout!
        </Button>
        </div>
      </>
    )
  }
  return (
    <div className={classes.root}>
      <Typography variant='h3'>
        Empirical SEO
      </Typography>
      <UserInfo />
    </div>
  )
}

export default Header