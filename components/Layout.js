import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Container,
} from '@material-ui/core'

import NavBar from './NavBar'
import Header from './Header'
import Footer from './Footer'

const useStyles = makeStyles(theme => ({
  slab: {
    border: 'dashed',
  },
  pageContent: {
    padding: 0,
  }
}))

const Layout = props => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div>
        <Container maxWidth="md" className={classes.slab}>
          <Header />
          <NavBar />
          <main>
            <Grid container className={classes.pageContent}>
              <Grid item>
                {props.content}
              </Grid>
            </Grid>
          </main>
          <Footer />
        </Container>
      </div>
    </>
  )
}

export default Layout