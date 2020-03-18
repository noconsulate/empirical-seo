import React, { useState, useContext } from 'react'
import Link from '../src/Link'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, TextField, Grid, Button } from '@material-ui/core'
import UserContext from '../components/UserContext'

import { db, } from '../config/firebase'

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
  note: {
    backgroundColor: 'aqua'
  }
}))

const domain = process.env.domain

const Survey = props => {

  const [scenarioUid, setScenarioUid] = useState('')
  const [scenarioText, setScenarioText] = useState('')
  const [formText, setFormText] = useState('')
  const [pageControl, setPageControl] = useState(0)
  const [privateResults, setPrivateResults] = useState(false)
  const [owner, setOwner] = useState('')
  const [owned, setOwned] = useState(false)

  const { userUid } = useContext(UserContext)

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
              if (privateValue == false || ownerValue == userUid) {
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



  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const keywords = formText.split(' ').filter(item => item != '')
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
    return (
      <div className={classes.note}>
        <Typography variant='body1'>
          This survey belongs to you. You can see the results
              <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
            {' '} here.
              </Link>
          <br />
              ScenarioUid (for dev): {scenarioUid}
        </Typography>
      </div>
    )
  }
  const SurveyForm = () => {
    return (
      <>
        <Grid container direction='column'>
          {
            owned ?
              <Owned /> :
              null
          }
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
          privateResults == false || owned ?
            <div className={classes.thankYou}>
              <Typography variant='body1'>
                You can see the results of the survey here:
            </Typography>
              <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
                {`${domain}/results?urlid=${urlId}`}
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
