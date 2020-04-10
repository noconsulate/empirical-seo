import React, { useContext } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fbAuth } from '../config/firebase'

import { AppBar, Toolbar } from '@material-ui/core'
import Link from '../src/Link'


const useStyles = makeStyles({
  navButton: {
    marginRight: 15,
    backgroundColor: 'cyan',
  },
})

const fbSignOut = () => {
  fbAuth.signOut()
    .then(res => {
      console.log('signed out')
      Router.push('/create')
    })
    .catch(error => {
      console.log(error)
    })
}

const Footer = props => {
  const classes = useStyles()

  const {  isUser } = props.user

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link href='/help' className={classes.navButton}>
          help
        </Link>
        <Link href='/about' className={classes.navButton}>
          about
        </Link>
        <Link href='privacy' className={classes.navButton}>
          privacy
        </Link>
        {
          isUser ?
          <Button onClick={fbSignOut}>
          Logout
        </Button> :
        null
        }
      </Toolbar>
    </AppBar>
  )
}

const mapState = state => ({
  user: state.user
})
export default connect(mapState, null)(Footer)