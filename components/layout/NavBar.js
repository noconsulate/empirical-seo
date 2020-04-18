import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Grid, AppBar, Toolbar, Button } from '@material-ui/core'
import Link from '../../src/Link'

const useStyles = makeStyles(theme => ({
  navButton: {
    marginRight: 15,
    border: 'dashed',
    borderColor: 'blue',
  },
  navBar: {
    padding: theme.spacing(1),
   // backgroundColor: 'white',
    border: 'dashed',
    borderColor: 'green',
  },
  email: {

  },
}))

const NavBar = props => {
  console.log(props.user)
  const { userEmail, isUser } = props.user
  const classes = useStyles()

  const LoginUi = () => {
    if (isUser) {
      return (
        <>
            <Link href='/profile' color='textPrimary' className={classes.navButton}>
              {userEmail}
            </Link>
        </>
      )
    } else {
      return (
        <>
            <Link href='/profile' color='textPrimary' className={classes.navButton}>
              profile
            </Link>
        </>
      )
    }
  }
  return (

    <AppBar position='static'>
      <Toolbar className={classes.navBar} disableGutters >
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