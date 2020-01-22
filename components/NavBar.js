import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
//import MenuIcon from '@material-ui/icons/Menu'

const NavBar = props => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge="start">
          exit
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar