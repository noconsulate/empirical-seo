import React, { useState } from 'react'
import { connect } from 'react-redux'
import Link from '../src/Link'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, TextField, Grid, Button } from '@material-ui/core'

import { db } from '../config/firebase'

import Layout from '../components/layout/Layout'
import SurveyForm from '../components/survey/SurveyForm'
import ThankYou from '../components/survey/ThankYou'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    border: 'dashed',
  },
  form: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'yellow',
  },
  thankYou: {
    backgroundColor: 'orange',
  },
  owned: {
    backgroundColor: 'aqua'
  }
}))

const domain = process.env.DOMAIN

const survey = props => {

  const [scenarioUid, setScenarioUid] = useState('')
  const [scenarioText, setScenarioText] = useState('')
  const [formText, setFormText] = useState('')
  const [pageControl, setPageControl] = useState(0)
  const [privateResults, setPrivateResults] = useState(false)
  const [owned, setOwned] = useState(false)

  const { userUid } = props.user

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
              const ownerValue = doc.data().owner
              console.log(ownerValue)
              console.log(userUid)
              console.log(privateValue)
              setScenarioText(scenarioValue)
              setScenarioUid(doc.id)
              if (privateValue == true && ownerValue == userUid) {
                console.log('Owned!')
                setOwned(true)
              }
            })
          } else {
            // invalid urlId, set error view
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

  const handleReset = event => {
    setFormText('')
    setPageControl(0)
  }

  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleSubmit = (event, text) => {
    event.preventDefault()
    console.log(text)
    const keywords = text.split(' ').filter(item => item != '')
    db.collection('scenarios').doc(scenarioUid).collection('keywords').add({
      keywords
    })
      .then(docRef => {
        setPageControl(1)
      })
      .catch(error => {
      })
   }

  const Owned = () => {
    console.log('Owned Render')
    if (owned) {
      return (
        <div className={classes.owned}>
          <Typography variant='body1'>
            This survey belongs to you. You can see the results
                <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
              {' '} here.
                </Link>
          </Typography>
        </div>
      ) 
    }
    return null
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
        return <SurveyForm 
                scenario={scenarioText}
                handleSubmit={handleSubmit}
              />
      case 1:
        return <ThankYou
                urlId={urlId}
                handleReset={handleReset}
                privateResults={privateResults}
                owned={owned}
              />
    }
  }

  const pageContent = (
    <div className={classes.root}>
      {Owned()}
      {ViewControl()}
    </div>
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

survey.getInitialProps = ({ query }) => {
  return { query }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(survey)

