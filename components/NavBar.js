import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '../src/Link'

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
            create
          </Link>
          <Link href='/profile' color='textPrimary' className={classes.navButton}
          >
            profile
          </Link>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar