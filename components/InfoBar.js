import React, { useState, useEffect, useContext } from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../components/UserContext'

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
  const { userEmail, userUid, fbSignOut } = useContext(UserContext)
  console.log(userEmail)

  const handleLogout = event => {
    event.preventDefault()
    fbSignOut()
  }

  const UserInfo = () => {
    if (userEmail == null) {
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
            {userEmail} 
            <br />
            {userUid}
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