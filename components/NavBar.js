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
      <Toolbar className={classes.navBar} disableGutters>
          <Link href='/survey' color='textPrimary' className={classes.navButton}>
            Survey
          </Link>
          <Link href='/results' color='textPrimary' className={classes.navButton}
          >
            Results
          </Link>
          <Link href='/about' color='textPrimary' className={classes.navButton}
          >
            About
          </Link>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar