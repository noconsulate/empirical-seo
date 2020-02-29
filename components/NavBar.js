import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Link from '../src/Link'
//import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles({
  navButton: {
    marginRight: 15,
    backgroundColor: 'pink',
  },
  navBar: {
  }
})

const NavBar = props => {
  const classes = useStyles()
  return (
    <AppBar position='static'>
      <Toolbar className={classes.navBar} >
          <Link href='/create' color='textPrimary' className={classes.navButton}>
            Create
          </Link>
          <Link href='/survey' color='textPrimary' className={classes.navButton}>
            Survey
          </Link>
          <Link href='/signin' color='textPrimary' className={classes.navButton}
          >
            sign in
          </Link>
          <Link href='/about' color='textPrimary' className={classes.navButton}
          >
            About
          </Link>
          <Link href='/privacy' color='textPrimary' className={classes.navButton}
          >
            Privacy
          </Link>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar