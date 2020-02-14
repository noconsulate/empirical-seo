import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, TextField, Grid, Button } from '@material-ui/core'

import { db } from '../config/firebase'

import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  form: {
    backgroundColor: 'red',
    alignItems: 'center',
  },

  content: {
    backgroundColor: 'yellow',
  },
}))

const Survey = props => {
  const [urlId, setUrlId] = React.useState('')
  const [scenarioId, setScenarioId] = React.useState('')
  const [scenarioText, setScenarioText] = React.useState('')
  const [formText, setFormText] = React.useState('')

  const classes = useStyles()

  const router = useRouter()
  React.useEffect(() => {
    const value = router.query.urlid
    console.log(value)
    setUrlId(value)
    console.log(urlId)
    if (urlId) {
      const scenariosRef = db.collection('scenarios')
      const query = scenariosRef.where('urlId', '==', urlId)
      query.get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id, doc.data())
            const scenarioValue = doc.data().scenario
            setScenarioText(scenarioValue)
            setScenarioId(doc.id)
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
    console.log('submit', formText)

    // const keywords = formText.split(' ').filter(item => item != '')
    // console.log('keywords', keywords)
    // db.collection('keywords').add({
    //   words: keywords,
    //   scenario: scenarioId,
    // })
    //   .then(docRef => {
    //     console.log("Keywords written to: ", docRef.id)
    //   })
    //   .catch(error => {
    //     console.error("Error adding document: ", error.message);
    //   })
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

  const pageContent = (
    <>
      {SurveyForm()}
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

