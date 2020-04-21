import React, { useState, useEffect } from 'react'
import { connect } from  'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem, List, ListItemText, Typography, TextField, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid
} from '@material-ui/core'
import Router from 'next/router'
import { db, fbAuth } from '../config/firebase'

import Layout from '../components/layout/Layout'
import SubHeader from '../components/results/SubHeader'
import Keywords from '../components/results/Keywords'
import Phrases from '../components/results/Phrases'
import Summary from '../components/results/Summary'
import PermissionDeniedPre from '../components/results/PermissionDeniedPre'
import PermissionDeniedPost from '../components/results/PermissionDeniedPost'

const domain = process.env.DOMAIN

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
}))

const Results = (props) => {
  const classes = useStyles()
  console.log(props)
  const urlId = props.query.urlid
  const { userUid } = props.user

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
        scenarioVar.forEach(doc => {
          scenarioUidVar = doc.id
          console.log('scenario uid', scenarioUidVar)
          const textVar = doc.data().scenario
          console.log(textVar)
          setScenarioText(textVar)
          setScenarioUid(scenarioUidVar)
        })
      } catch (error) {
        console.log('scenario query error', error)
      }

     

      // incorrect urlId
      if (!scenarioUidVar) {
        setBadUrl(true)
        console.log('bad url')
        return
      }

      // check permission
      const scenDoc = await db.collection('scenarios').doc(scenarioUidVar).get()
      console.log('scenario owner', scenDoc.data().owner)
      console.log('userId', userUid, 'userUid directly from state', props.userUid)

      try {
        const scenDoc = await db.collection('scenarios').doc(scenarioUidVar).get()
      } catch (err) {
        console.log('scenario fetch error', err.message)
      }
      
      //if auth listener hasn't finished
      if (userUid === 'init Uid') return null


      if (scenDoc.data().private == true &&
        (scenDoc.data().owner != userUid)
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
  }, [props.user])

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
      //    test: 'okay boomer'
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

  const pageContent = (
    <div className={classes.root}>
      <Grid container 
        className={classes.container} 
        direction='column'
        spacing={1}
      >
        <Grid item>
         <SubHeader urlId={urlId} scenarioText={scenarioText} />
        </Grid>
        <Grid item>
         <Keywords rowsKeywords={rowsKeywords} />
        </Grid>
        <Grid item>
          <Phrases rowsPhrases={rowsPhrases} />
        </Grid>
        <Grid item>
          <Summary wordCount={wordCount} handleDeleteClick={handleDeleteClick} />
        </Grid>
        <Grid item>
        <DeleteDialog />
        </Grid>
      </Grid>
    </div>
  )

  const handleSignIn = text => {
    console.log(text)

    const actionCodeSettings = {
      url: `${domain}/results?urlid=${props.urlId}`,
      handleCodeInApp: true,
    }

    fbAuth.sendSignInLinkToEmail(text, actionCodeSettings)
      .then(() => {
        console.log('link sent')
        window.localStorage.setItem('emailForSignIn', text)
        setBadPermissionControl(1)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const permissionViewControl = () => {
    switch (badPermissionControl) {
      case 0:
        return <PermissionDeniedPre handleSignIn={handleSignIn} />
      case 1:
        return <PermissionDeniedPost />
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
    <div className={classes.root}>
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

Results.getInitialProps = ({ query }) => {
  return ({ query })
}

const mapState = state => ({
  user: state.user,
})


export default connect(mapState, null)(Results)

