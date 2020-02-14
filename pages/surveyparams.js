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
  const [scenarioText, setScenarioText] = React.useState('')
  const [formText, setFormText] = React.useState('')

  const classes = useStyles()
  
  const router = useRouter()
  React.useEffect(() => {
    const value = router.query.urlid
    setUrlId(value)
    console.log(urlId)
    
  })

  if (urlId !== '') {
    const scenariosRef = db.collection('scenarios')
    const query = scenariosRef.where('urlId', '==', urlId)
    query.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, doc.data())
          const value = doc.data().scenario
          setScenarioText(value)
        })
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleChange = event => {
    event.preventDefault()
    setFormText(event.target.value)
  }

  const handleSubmit = event => {
    console.log(formText)
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

