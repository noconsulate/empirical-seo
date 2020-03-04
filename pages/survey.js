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
          if (snapshot.size > 0) {
            snapshot.forEach(doc => {
              const scenarioValue = doc.data().scenario
              const privateValue = doc.data().private
              setScenarioText(scenarioValue)
              setScenarioId(doc.id)
              setPrivateResults(privateValue)
            })
          } else {
            setPageControl(-1)
          }
          
        })
        .catch(error => {
          console.log('error', error)
        })
    } else {
      setPageControl(-1)
    }
  }, [])



  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    fbAuth.signInAnonymously().catch(error => {
    })

    const keywords = formText.split(' ').filter(item => item != '')
    db.collection('scenarios').doc(scenarioId).collection('keywords').add({
      keywords
    })
      .then(docRef => {
        setPageControl(1)
      })
      .catch(error => {
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
              <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
                <a>{`${prodUrl}/results?urlid=${urlId}`}</a>
              </Link>
            </div> :
            null
        }
      </>
    )
  }

  const NoSurvey = () => {
    return (
      <>
        <div className={classes.content}>
          <Typography variant='h5'>
            There is nothing here! :(
          </Typography>
          <Typography variant='body1'>
            Please make sure the url is correct.
          </Typography>
        </div>
      </>

    )
  }

  const ViewControl = () => {
    switch (pageControl) {
      case -1:
        return NoSurvey()
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

Survey.getInitialProps = ({ query }) => {
  return { query }
}
