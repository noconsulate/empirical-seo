import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, TextField, Grid, Button } from '@material-ui/core'

import { db, fbAuth } from '../config/firebase'

import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  form: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'yellow',
  },
  thankYou: {
    backgroundColor: 'green',
  },
}))

const prodUrl = process.env.prodUrl

const Survey = props => {

  const [scenarioId, setScenarioId] = React.useState('')
  const [scenarioText, setScenarioText] = React.useState('')
  const [formText, setFormText] = React.useState('')
  const [pageControl, setPageControl] = React.useState(0)
  const [privateResults, setPrivateResults] = React.useState(false)

  const urlId = props.query.urlid

  const classes = useStyles()

  React.useEffect(() => {
    if (urlId) {
      const scenariosRef = db.collection('scenarios')
      const query = scenariosRef.where('urlId', '==', urlId)
      query.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id, doc.data())
            const scenarioValue = doc.data().scenario
            const privateValue = doc.data().private
            console.log(privateValue)
            setScenarioText(scenarioValue)
            setScenarioId(doc.id)
            setPrivateResults(privateValue)
          })
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }, [])



  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    fbAuth.signInAnonymously().catch(error => {
      console.log(error)
    })
    
    const keywords = formText.split(' ').filter(item => item != '')
    console.log('keywords', keywords)
    db.collection('scenarios').doc(scenarioId).collection('keywords').add({
      keywords
    })
      .then(docRef => {
        console.log("Keywords written to: ", docRef.id)
        setPageControl(1)
      })
      .catch(error => {
        console.error("Error adding document: ", error.message);
      })
  }

  const SurveyForm = () => {

    return (
      <>
        <Grid container direction='column'>
          <div className={classes.content}>
            <Typography variant='body1'>
              {scenarioText}
            </Typography>
          </div>
          <form
            className={classes.form}
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <TextField
              value={formText}
              onChange={handleChange}
            />
            <Button type='submit'>
              google!
            </Button>
          </form>
        </Grid>
      </>
    )
  }

  const ThankYou = () => {
    return (
      <>
        <div className={classes.thankYou}>
          <Typography variant='body1'>
            Thank you for your submission.
          </Typography>
        </div>
        {
          privateResults == false ? 
          <div className={classes.thankYou}>
            <Typography variant='body1'>
              You can see the results of the survey here:
            </Typography>
            <Link href={{ pathname: '/results', query: { urlid: urlId }}}>
                <a>{`${prodUrl}/results?urlid=${urlId}`}</a>
              </Link>
          </div> :
          null
        }
      </>
    )
  }

  const ViewControl = () => {
    switch (pageControl) {
      case 0: 
        return SurveyForm()
      case 1: 
        return ThankYou()
    }
  }

  const pageContent = (
    <>
      {ViewControl()}
    </>
  )

  return (
    <>
      <Layout
        content={pageContent}
        title={'SURVEY NEEDS TITLE YA KNOW'}
      />
    </>
  )
}

export default Survey

Survey.getInitialProps = ({query}) => {
  return {query}
}