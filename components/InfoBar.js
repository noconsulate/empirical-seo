import React from 'react'
import { connect } from 'react-redux'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


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
  const { userEmail, userUid, isUser, fbSignOut } = props.user

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

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(InfoBar)