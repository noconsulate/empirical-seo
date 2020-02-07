import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Grid, 
  Container, 
  CssBaseline, 
} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../src/theme'

import NavBar from './NavBar'
import Header from './Header'

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  slab: {
    border: 'dashed',
  }
}))

const Layout = props => {
  const classes = useStyles()

  return (
   <ThemeProvider theme={theme}>
     <Head>
       <title>{props.title}</title>
     </Head>
     <div>
      <CssBaseline />
    <Container maxWidth="lg" className={classes.slab}>
      <NavBar />
      <Header />
      <main>
        {props.content}
      </main>
    </Container>
   </div>
   </ThemeProvider>
  )
}

export default Layout