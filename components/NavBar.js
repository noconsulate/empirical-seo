import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Grid, AppBar, Toolbar, Button } from '@material-ui/core'
import Link from '../src/Link'

import UserContext from './UserContext'

const useStyles = makeStyles({
  navButton: {
    marginRight: 15,
    backgroundColor: 'pink',
  },
  navBar: {
  },
  email: {

  },
})

const NavBar = props => {
  const { userEmail, fbSignOut, isUser } = useContext(UserContext)
  console.log(userEmail)
  const classes = useStyles()

  const LoginUi = () => {
    if (isUser) {
      return (
        <>
          <Grid item>
            <Link href='/profile' color='textPrimary'>
              {userEmail}
            </Link>
          </Grid>
          <Grid item>
            <Button onClick={fbSignOut}>
              Logout
            </Button>
          </Grid>
        </>
      )
    } else {
      return (
        <>
          <Grid item>
            <Link href='/profile' color='textPrimary'>
              Profile
            </Link>
          </Grid>
        </>
      )
    }
  }
  return (

    <AppBar position='static'>
      <Grid container spacing={0}>
        <Toolbar className={classes.navBar} >
          <Grid item>
            <Link href='/create' color='textPrimary' className={classes.navButton}>
              create
          </Link>
          </Grid>
          <LoginUi />
        </Toolbar>

      </Grid>
    </AppBar>

  )
}

export default NavBar