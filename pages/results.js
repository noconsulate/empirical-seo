import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem, List, ListItemText, Typography
} from '@material-ui/core'
import Link from '../src/Link'
import { db } from '../config/firebase'

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
}))

const Results = (props) => {
  const classes = useStyles()

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
        <Link href={{ pathname: '/survey', query: {urlid: props.urlId } }}>
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

  return (
    <Layout
      content={pageContent}
      title='Survey results - CONFIDENTIAL'
    />
  )
}

export default Results

Results.getInitialProps = async ({ query }) => {
  const urlId = query.urlid
  console.log(urlId)

  const scenariosRef = db.collection('scenarios')
  const scenarioQuery = scenariosRef.where('urlId', '==', urlId)
  let scenario
  try {
    scenario = await scenarioQuery.get()
  } catch (error) {
    console.log('private scenario', error)
  }

  let scenarioId
  scenario.forEach(doc => {
    scenarioId = doc.id
  })
  console.log(scenarioId)

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
      console.log(word)
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