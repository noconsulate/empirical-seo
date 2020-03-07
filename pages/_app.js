import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import UserContext from '../components/UserContext'
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router'
import theme from '../src/theme';

import { fBauth, fbAuth } from '../config/firebase'

export default class MyApp extends App {
  state = {
    userUid: 'init Uid',
    userEmail: 'init userEmail',
    isUser: false
  }
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    fbAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          userEmail: user.email,
          userUid: user.uid,
          
        })
        if (user.email) {
          this.setState({
            isUser: true
          })
        }
      } else {
        this.setState({
          userEmail: 'no email',
          userUid: 'no uid',
          isUser: false,
        })
        fbAuth.signInAnonymously()
      }
    })
  }

  fbSignOut = () => {
    fbAuth.signOut()
      .then(res => {
        console.log('signed out')
        Router.push('/create')
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <UserContext.Provider value={{
            userEmail: this.state.userEmail,
            userUid: this.state.userUid,
            isUser: this.state.isUser,
            fbSignOut: this.fbSignOut,
          }}>
            <Component {...pageProps} />
          </UserContext.Provider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
