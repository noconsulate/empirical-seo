import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { AppBar, Toolbar } from '@material-ui/core'
import Link from '../src/Link'

import UserContext from './UserContext'

const useStyles = makeStyles({
  navButton: {
    marginRight: 15,
    backgroundColor: 'cyan',
  },
})

const Footer = props => {
  const classes = useStyles()

  const { fbSignOut, isUser } = useContext(UserContext)

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

export default Footer