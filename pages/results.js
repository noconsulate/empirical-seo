import Typography from '@material-ui/core/Typography'

import { db } from '../config/firebase'

import Layout from '../components/Layout'

const pageContent = (
  <div>
    <Typography variant='h4'>
      Results
    </Typography>
  </div>
)

const Results = (props) => {
  console.log(props.keywords)
  
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
    console.log(doc.data())
    keywordsObj.push(doc.data())
  })
  console.log(keywordsObj)
  
  return { keywords: keywordsObj }
}

export default Results