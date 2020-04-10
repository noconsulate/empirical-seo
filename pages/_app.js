import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import UserContext from '../components/UserContext'
import ScenarioContext from '../components/ScenarioContext'
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router'
import theme from '../src/theme';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import rootRecucer from '../reducers'
import { fbAuth } from '../config/firebase'

const store = configureStore({
  reducer: rootRecucer
})

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
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
              <Provider store={store}>
                <Component {...pageProps} />
              </Provider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
