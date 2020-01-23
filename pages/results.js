import Typography from '@material-ui/core/Typography'

import { db } from '../config/firebase'

import Layout from '../components/Layout'



const Results = (props) => {
  console.log(props.keywords.length)
  props.keywords.forEach(word => console.log(word)
  )

  const rows = () => {
    return (
      <ul>
        {props.keywords.forEach(word => 
          <li>{word}</li>
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
    <ul>
        {props.keywords.forEach(word => 
          <li>{word}</li>
        )}
      </ul>
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