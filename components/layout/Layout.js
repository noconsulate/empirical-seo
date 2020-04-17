import React from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Container,
} from '@material-ui/core'
import { connect } from 'react-redux'

import { fbAuth } from '../../config/firebase'
import { changeUser } from '../../reducers/userSlice'

import NavBar from './NavBar'
import Header from './Header'
import Footer from './Footer'

const useStyles = makeStyles(theme => ({
  root: {
  },
  item: {
    padding: theme.spacing(1),
    borderColor: 'red',
    border: 'dashed'
  }
}))

const Layout = props => {
  const classes = useStyles()

  //firebase auth listener
  React.useEffect(() => {
    const unsubscribe = fbAuth.onAuthStateChanged(user => {
      if (user && !user.isAnonymous) {
        console.log('user found in Layout')
        props.changeUser({
          userUid: user.uid,
          userEmail: user.email,
          isUser: true,
          isAnon: false,
        })
        if (user.isAnonymous) {
          console.log('anon user dispatch')
          props.changeUser({
            userUid: user.uid,
            userEmail: 'init userEmail',
            isUser: false,
            isAnon: true,
          })
        }
      } else {
        console.log('no user in Layout')
        fbAuth.signInAnonymously()
          .then(res => {
            console.log('anon user signin', res)
            props.changeUser({
              userUid: user.uid,
              userEmail: 'init userEmail',
              isUser: false,
              isAnon: true,
            })
          })
          .catch(err => { console.log('anon signin error', err) })
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
        <Container maxWidth="md">
          <Grid container
            spacing={2}
            direction='column'
          >
            <Grid item className={classes.item}>
              <Header />
            </Grid>
            <Grid item className={classes.item}>
              <NavBar />
            </Grid>
            <Grid item className={classes.item}>
              <main>
                {props.content}
              </main>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}

const mapDispatch = { changeUser }

export default connect(null, mapDispatch)(Layout)