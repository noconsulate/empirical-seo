import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem, List, ListItemText, Typography, TextField, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core'
import Link from '../src/Link'
import Router from 'next/router'
import { db, fbAuth } from '../config/firebase'
import UserContext from '../components/UserContext'

import Layout from '../components/Layout'

const domain = process.env.domain

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
  const classes = useStyles()

  const urlId = props.query.urlid
  const { userUid } = useContext(UserContext)
  // ugly hack because UserContext is unreliable
  let userVar
  fbAuth.onAuthStateChanged(user => {
    if (user) {
      console.log('in auth listenr', user.uid)
      userVar = user.uid
    }
  })

  const [scenarioUid, setScenarioUid] = useState('')
  const [scenarioText, setScenarioText] = useState('')
  const [badUrl, setBadUrl] = useState(false)
  const [badPermission, setBadPermission] = useState(false)
  const [badPermissionControl, setBadPermissionControl] = useState(0)
  const [keywords, setKeywords] = useState([])
  const [wordCount, setWordCount] = useState()
  const [phrases, setPhrases] = useState([])
  const [email, setEmail] = useState('')

  const [open, setOpen] = useState(false)

  useEffect(() => {
    let scenarioUidVar, scenarioVar
    const fetchScenario = async () => {
      try {
        const scenarioQuery = db.collection('scenarios').where('urlId', '==', urlId)
        scenarioVar = await scenarioQuery.get()
        console.log('scenario uid', scenarioVar)
      } catch (error) {
        console.log('scenario query error', error)
      }

      scenarioVar.forEach(doc => {
        scenarioUidVar = doc.id
        console.log('scenario uid', scenarioUidVar)
        const textVar = doc.data().scenario
        console.log(textVar)
        setScenarioText(textVar)
        setScenarioUid(scenarioUidVar)
      })

      // incorrect urlId
      if (!scenarioUidVar) {
        setBadUrl(true)
        console.log('bad url')
      }

      // check permission
      const scenDoc = await db.collection('scenarios').doc(scenarioUidVar).get()
      console.log('scenario owner', scenDoc.data().owner)
      console.log('userId', userUid)
      if (scenDoc.data().private == true &&
        (scenDoc.data().owner != userUid || scenDoc.data().owner != userVar)
      ) {
        console.log('bad permission')
        setBadPermission(true)
      }

      // fetch and parse keywords
      const keywords = await db.collection('scenarios').doc(scenarioUidVar).collection('keywords').get()

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
      console.log(keywordsObj.words)
      setKeywords(keywordsObj.words)
      setWordCount(keywordsObj.total)
      console.log(phrases)
      setPhrases(phrases)
    }

    fetchScenario()
  }, [])

  const handleDeleteClick = event => {
    event.preventDefault()
    setOpen(true)
  }

  const handleClose = event => {
    setOpen(false)
    console.log(event)
  }

  const handleDelete = () => {
    db.collection('scenarios').doc(scenarioUid).update({
      owner: 'deleted'
    })
    let urlIds, newUrlIds
    db.collection('users').doc(userUid).get()
      .then(doc => {
        urlIds = doc.data().urlIds
        console.log(urlIds)
        newUrlIds = urlIds.filter(item => item != urlId)
        console.log(newUrlIds)
        db.collection('users').doc(userUid).set({
          urlIds: newUrlIds,
          test: 'okay boomer'
        }, { merge: true })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
      Router.push('/')
  }


  const DeleteDialog = () => {
    return (
      <Dialog open={open} onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this scenario? It cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color='primary'>
            Delete
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const rowsKeywords = () => {
    let listKey = 0
    return (
      <List dense={true}>
        {keywords.map(word =>
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
          {phrases.map(phrase =>
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
        <Typography variant='h5'>
          <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
            {scenarioText}
          </Link>
        </Typography>
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
          number of words: {wordCount}
        </Typography>
      </div>
    )
  }

  const DeleteButton = () => {
    return (
      <Button onClick={handleDeleteClick}>
        Delete
      </Button>
    )
  }

  const pageContent = (
    <div>
      <SubHeaderPane />
      <KeywordsPane />
      <PhrasesPane />
      <ExtraPane />
      <DeleteButton />
      <DeleteDialog />
    </div>
  )
  const handleChange = event => {
    setEmail(event.target.value)
  }

  const handleSignIn = event => {
    event.preventDefault()
    console.log(email)

    const actionCodeSettings = {
      url: `${domain}/results?urlid=${props.urlId}`,
      handleCodeInApp: true,
    }

    fbAuth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        console.log('link sent')
        window.localStorage.setItem('emailForSignIn', email)
        setBadPermissionControl(1)
      })
      .catch(error => {
        console.log(error)
      })
  }

  //need to add flow for sign in 

  const PermissionDeniedPre = () => {
    return (
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
  }

  const PermissionDeniedPost = () => {
    return (
      <>
        <div className={classes.extra}>
          <Typography variant='body1'>
            Thank you, please check your email for a link to coninue signing in.
          </Typography>
        </div>
      </>
    )
  }

  const permissionViewControl = () => {
    switch (badPermissionControl) {
      case 0:
        return PermissionDeniedPre()
      case 1:
        return PermissionDeniedPost()
    }
  }

  const permissionDenied = () => {
    return (
      <>
        {permissionViewControl()}
      </>
    )
  }

  const badUrlRender = (
    <div className={classes.extra}>
      <Typography variant='body1'>
        Sorry, there's something wrong with your url. If you typed in manually, please check it again, especially the part after the "?" mark!
      </Typography>
    </div>
  )

  if (badUrl) {
    return (
      <Layout
        content={badUrlRender}
        title='Bad URl :('
      />
    )
  }

  if (badPermission) {
    return (
      <Layout
        content={permissionDenied()}
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

Results.getInitialProps = ({ query }) => {
  return ({ query })
}