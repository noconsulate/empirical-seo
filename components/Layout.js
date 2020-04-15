import React from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Container,
} from '@material-ui/core'
import { connect } from 'react-redux'

import { fbAuth } from '../config/firebase'
import { changeUser } from '../reducers/userSlice'

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

  //firebase auth listener
  React.useEffect(() => {
    const unsubscribe = fbAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('user found in Layout')
        props.changeUser({
          userUid: user.uid,
          userEmail: user.email,
          isUser: true,
        })
      } else {
        console.log('no user in Layout')
      }
    }) 
    return () => unsubscribe()
  }, [])

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

const mapDispatch = { changeUser }

export default connect(null, mapDispatch)(Layout)