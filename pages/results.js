import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem, List, ListItemText, Typography, TextField, Button,
} from '@material-ui/core'
import Link from '../src/Link'
import { db, fbAuth } from '../config/firebase'

import Layout from '../components/Layout'

const prodUrl = process.env.prodUrl

const useStyles = makeStyles(theme => ({
  keywords: {
    backgroundColor: 'green',
  },
  phrases: {
    backgroundColor: 'red',
  },
  extra: {
    backgroundColor: 'yellow',
  },
  subHeader: {
    backgroundColor: 'grey'
  },
  emailForm: {
    backgroundColor: 'green',
  },
}))

const Results = (props) => {
  const [email, setEmail] = useState('')

  const classes = useStyles()

  React.useEffect(() => {
      // initialize fbAuth?
  fbAuth.onAuthStateChanged(user => {
    if (user) {
      console.log(user)
    } else {
      console.log('no user')
    }
  })
  }, [])

  const rowsKeywords = () => {
    let listKey = 0
    return (
      <List dense={true}>
        {props.keywords.words.map(word =>
          <ListItem key={listKey++}>
            <ListItemText primary={`"${word.keyword}": ${word.count} times`} />
          </ListItem>
        )}
      </List>
    )
  }

  const rowsPhrases = () => {
    let listKey = 0
    return (

      <div>
        <List dense={true}>
          {props.phrases.map(phrase =>
            <ListItem key={listKey++}>
              <ListItemText primary={phrase} />
            </ListItem>
          )}
        </List>
      </div>
    )
  }

  const SubHeaderPane = () => {
    return (
      <div className={classes.subHeader}>
        <Typography variant='h4'>
          Results for:
        </Typography>
        <Link href={{ pathname: '/survey', query: { urlid: props.urlId } }}>
          `${prodUrl}/survey?urlid=${props.urlId}`
        </Link>
      </div>
    )
  }

  const KeywordsPane = () => {
    return (
      <div className={classes.keywords}>
        <Typography variant='h4'>
          Keywords
       </Typography>
        {rowsKeywords()}
      </div>
    )
  }

  const PhrasesPane = () => {
    return (
      <div className={classes.phrases}>
        <Typography variant='h4'>
          Phrases
      </Typography>
        {rowsPhrases()}
      </div>
    )
  }

  const ExtraPane = () => {
    return (
      <div className={classes.extra}>
        <Typography variant='h4'>
          number of words: {props.keywords.total}
        </Typography>
      </div>
    )
  }

  const pageContent = (
    <div>
      <SubHeaderPane />
      <KeywordsPane />
      <PhrasesPane />
      <ExtraPane />
    </div>
  )
  const handleChange = event => {
    setEmail(event.target.value)
  }

  const handleSignIn = event => {
    event.preventDefault()
    console.log(email)

    const actionCodeSettings = {
      url: `${prodUrl}/results?urlid=${props.urlId}`,
      handleCodeInApp: true,
    }

    fbAuth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        console.log('link sent')
        window.localStorage.setItem('emailForSignIn', email)
      })
      .catch(error => {
        console.log(error)
      })
  }

  //need to add flow for sign in 
  const permissionDenied =
    (
      <>
        <div className={classes.extra}>
          <Typography variant='body1'>
            Sorry, you don't have the correct permission. If this is your scenario, you can login below with your email address.
        </Typography>
        </div>
        <div className={classes.emailForm}>
          <form onSubmit={handleSignIn}>
            <TextField
              label='email'
              value={email}
              onChange={handleChange}
              type='email'
            />
            <Button type='submit'>
              Sign in!
          </Button>
          </form>
        </div>
      </>
    )

  const badUrl = (
    <div className={classes.extra}>
      <Typography variant='body1'>
        Sorry, there's something wrong with your url. If you typed in manually, please check it again, especially the part after the "?" mark!
      </Typography>
    </div>
  )

  if (props.badUrl) {
    return (
      <Layout
        content={badUrl}
        title='Bad URl :('
      />
    )
  }

  if (props.permissionDenied) {
    return (
      <Layout
        content={permissionDenied}
        title='Survey results - permission denied!'
      />
    )
  }

  return (
    <Layout
      content={pageContent}
      title='Survey results - CONFIDENTIAL'
    />
  )
}

export default Results


Results.getInitialProps = async ({ query }) => {

  // get user
  let user, userId
  const getUser = async () => {
    const response = fbAuth.currentUser
    user = response
    userId = user.uid
  }
  getUser()
  console.log(user, userId)

  const urlId = query.urlid

  const scenariosRef = db.collection('scenarios')
  const scenarioQuery = scenariosRef.where('urlId', '==', urlId)
  const scenario = await scenarioQuery.get()

  let scenarioId
  scenario.forEach(doc => {
    scenarioId = doc.id
  })
  if (!scenarioId) {
    return {
      //change to different error eg 'misformed url'
      badUrl: true,
    }
  }

  const scenDoc = await db.collection('scenarios').doc(scenarioId).get()
  if (scenDoc.data().private == true && scenDoc.data().owner != userId) {
    return {
      permissionDenied: true,

    }
  }

  const keywords = await db.collection('scenarios').doc(scenarioId).collection('keywords').get()

  let keywordsObj = {
    total: 0,
    words: []
  }
  let phrase = ' '
  const phrases = []

  const parseWords = (word) => {
    let index = keywordsObj.words.findIndex(item => item.keyword === word)
    if (index === -1) {
      keywordsObj.words.push({
        keyword: word,
        count: 1
      })
      keywordsObj.total += 1
    } else {
      keywordsObj.words[index].count += 1
      keywordsObj.total += 1
    }
  }

  keywords.forEach(doc => {
    phrase = ''
    doc.data().keywords.forEach(word => {
      parseWords(word)
      phrase += ' ' + word
    })

    phrases.push(phrase)
  })
  return {
    keywords: keywordsObj,
    phrases: phrases,
    urlId
  }
}