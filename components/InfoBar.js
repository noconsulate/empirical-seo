import React, { useState, useEffect, useContext } from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../components/UserContext'

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
  const { userEmail, userUid, isUser, fbSignOut } = useContext(UserContext)

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
          <Grid container direction='column'>
            <Grid item s>
              <Typography variant='h6'>
                You are logged in as {userEmail}
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={handleLogout} color='primary1'>
                Logout!
              </Button>
            </Grid>
          </Grid>
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