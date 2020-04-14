import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Grid, AppBar, Toolbar, Button } from '@material-ui/core'
import Link from '../src/Link'

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
  console.log(props.user)
  const { userEmail, isUser } = props.user
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
      <Toolbar className={classes.navBar} >
        <Link href='/create' color='textPrimary' className={classes.navButton}>
          create
          </Link>
        <LoginUi />
      </Toolbar>
    </AppBar>

  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(NavBar)