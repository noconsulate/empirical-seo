import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Container,
  Typography
} from '@material-ui/core'

import Header from '../components/Header'
import Footer from '../components/Footer'

const useStyles = makeStyles(theme => ({
  slab: {
    border: 'dashed',
  },
  pageContent: {
    padding: 0,
  }
}))

const Thankyou = props => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Thank You</title>
      </Head>
      <div>
        <Container maxWidth="md" className={classes.slab}>
          <Header />
          <main>
            <Grid container className={classes.pageContent}>
              <Grid item>
                <Typography variant='h4'>
                  Thank you. Please follow the link in your email to continue.
                </Typography>
              </Grid>
            </Grid>
          </main>
          <Footer />
        </Container>
      </div>
    </>
  )
}

export default Thankyou