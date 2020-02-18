import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem, List, ListItemText, Typography
} from '@material-ui/core'
import { db } from '../config/firebase'

import Layout from '../components/Layout'

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

Results.getInitialProps = async () => {
  const keywords = await db.collection('keywords').get()
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
    phrase = ' '
    doc.data().words.forEach(word => {
      parseWords(word)
      phrase += ' ' + word
    })

    phrases.push(phrase)
  })

  keywordsObj.words.sort((a, b) => (a.count < b.count ? 1 : -1))

  return {
    keywords: keywordsObj,
    phrases: phrases
  }
}

export default Results