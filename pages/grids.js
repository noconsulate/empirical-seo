import { makeStyles } from '@material-ui/core/styles'
import { 
  Grid, 
  Container, 
  CssBaseline, 
} from '@material-ui/core'

import NavBar from '../components/NavBar'
import Header from '../components/Header'

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  slab: {
    backgroundColor: 'green',
  }
}))

const Grids = () => {
  const classes = useStyles()

  return (
   <div>
      <CssBaseline />
    <Container maxWidth="lg" className={classes.slab}>
      <NavBar />
      <Header />
    </Container>
   </div>
  )
}

export default Grids