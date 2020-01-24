import Typography from '@material-ui/core/Typography'

import { db } from '../config/firebase'

import Layout from '../components/Layout'

const Results = (props) => {

  const rows = () => {
    return (
      <ul>
        {props.keywords.map(word => 
          <li key={word}>{word}</li>
        )}
      </ul>
    )
  }

const pageContent = (
  <div>
    <Typography variant='h4'>
      Results
    </Typography>
    {rows()}
    <Typography variant='h4'>
      number of words: {props.keywords.length}
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

  const parseWords = (word) => {
    console.log('parswords', word)
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
    doc.data().words.forEach(word => {
      parseWords(word)
    })
  })
  
  console.log(keywordsObj)
  
  const dummyWords = ['dog', 'cat', 'skunk']
  return { keywords: dummyWords }
}

export default Results