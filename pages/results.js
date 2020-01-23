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
  </div>
  
  return (
    <Layout 
      content={pageContent}
      title='Survey results - CONFIDENTIAL'
    />
  )
}

Results.getInitialProps = async () => {
  const keywords = await db.collection('keywords').get()
  let keywordsObj = []
  
  keywords.forEach(doc => {
    doc.data().words.forEach(word => {
      keywordsObj.push(word)
    })
  })
  console.log(keywordsObj)
  
  return { keywords: keywordsObj }
}

export default Results