import { makeStyles } from '@material-ui/core/styles'
import { 
  Grid, 
  Container, 
  CssBaseline, 
} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../src/theme'

import NavBar from '../components/NavBar'
import Header from '../components/Header'

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  slab: {
    border: 'dashed',
  }
}))

const Grids = () => {
  const classes = useStyles()

  return (
   <ThemeProvider theme={theme}>
     <div>
      <CssBaseline />
    <Container maxWidth="lg" className={classes.slab} disableGutters>
      <NavBar />
      <Header />
    </Container>
   </div>
   </ThemeProvider>
  )
}

export default Grids