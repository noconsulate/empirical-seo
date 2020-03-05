import { makeStyles } from '@material-ui/core/styles'

import { AppBar, Toolbar} from '@material-ui/core'
import Link from '../src/Link'

const useStyles = makeStyles({
  navButton: {
    marginRight: 15,
    backgroundColor: 'cyan',
  },
})

const Footer = props => {
  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link href='/about' className={classes.navButton}>
          about
        </Link>
        <Link href='privacy' className={classes.navButton}>
          privacy
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Footer