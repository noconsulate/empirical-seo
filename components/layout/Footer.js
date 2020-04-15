import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fbAuth } from '../../config/firebase'

import { removeUser } from '../../reducers/userSlice'

import { Toolbar } from '@material-ui/core'
import Link from '../../src/Link'


const useStyles = makeStyles({
  navButton: {
    marginRight: 15,
    backgroundColor: 'cyan',
  },
  toolbar: {
    backgroundColor: 'green'
  }
})

const Footer = props => {
  const classes = useStyles()

  const { isUser } = props.user

  const fbSignOut = () => {
    props.removeUser()
    Router.push('/create')
  }

  return (
    <Toolbar className={classes.toolbar}>
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
  )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = { removeUser }
export default connect(mapState, mapDispatch)(Footer)