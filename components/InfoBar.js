import React, { useState, useEffect, useContext } from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../components/UserContext'
import ScenarioContext from '../components/ScenarioContext'

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
  const { scenarioTextContext } = useContext(ScenarioContext)

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
          <Typography variant='h4'>
            You are logged in as {userEmail}
          </Typography>
          <Typography variant='body1'>
            {userEmail} 
            <br />
            uid: {userUid}
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