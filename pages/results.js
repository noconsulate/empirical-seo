import Typography from '@material-ui/core/Typography'

import { db } from '../config/firebase'

import Layout from '../components/Layout'

const Results = (props) => {

  const rows = () => {
    return (
      <ul>
        {props.keywords.words.map(word => 
          <li key={word.keyword}>"{word.keyword}": {word.count}</li>
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
  keywordsObj.words.sort((a, b) => (a.count < b.count ? 1 : -1))
  console.log(keywordsObj)
  
  return { keywords: keywordsObj }
}

export default Results