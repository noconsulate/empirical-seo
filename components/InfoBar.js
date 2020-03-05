import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { fbAuth } from '../config/firebase'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'aqua'
  },
  user: {
    backgroundColor: 'pink',
  },
}))

const InfoBar = props => {
  const classes = useStyles()

  const [email, setEmail] = useState(null)
  let user

  useEffect(() => {
    user = fbAuth.currentUser
    if (user) {
      if (user.email) {
        setEmail(user.email)
      }
    }
  }, [])

  const handleLogout = event => {
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
    if (email == null) {
      return (
        <>
          <div className={classes.user}>
            <Typography variant='body1'>
              No User
            </Typography>
          </div>
        </>
      )
    }

    return (
      <>
        <div className={classes.user}>
          <Typography variant='body1'>
            {email}
          </Typography>
          <Button onClick={handleLogout}>
            Logout!
        </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div >
        {UserInfo()}
      </div>
    </>
  )
}

export default InfoBar