import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText';
import { db } from '../config/firebase'

import Layout from '../components/Layout'

const Results = (props) => {
console.log(props.phrases)
props.phrases.map(phrase => console.log(phrase))

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

const pageContent = (
  <div>
    <Typography variant='h4'>
      Keywords
    </Typography>
    {rowsKeywords()}
    <Typography variant='h4'>
      Phrases
    </Typography>
    {rowsPhrases()}
    <Typography variant='h4'>
      number of words: {props.keywords.total}
    </Typography>
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