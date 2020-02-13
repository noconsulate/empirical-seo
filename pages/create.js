import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography, Button, Grid, FormControl, TextField
} from '@material-ui/core'
import { Formik, Form, ErrorMessage } from 'formik';

import { db } from '../config/firebase'

import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  extra: {
    backgroundColor: 'red',
  },
  form: {
    backgroundColor: 'yellow',
  },
  description: {
    backgroundColor: 'orange',
  },
}))

const Create = props => {
  const [id, setId] = React.useState('')
  const [pageControl, setPageControl] = React.useState(0)
  const [scenarioText, setScenarioText] = React.useState('ar')
  const [test, setTest] = React.useState('')


  
  const classes = useStyles()

  const handleChangeScenario = event => {
    console.log('keypress')
    
    setScenarioText(event.target.value)
    const { target } = event;
    setTimeout(() => {
      target.focus();
    }, 10);

  }

  const handleSubmitScenario = event => {
    event.preventDefault()
    db.collection('scenarios').add({
      scenario: scenarioText,
    })
      .then(docRef => {
        console.log('scenario written to: ', docRef.id)
        setId(docRef.id)
        setPageControl(1)
      })
      .catch(error => {
        console.error('error adding document: ', error.message)

      })
  }

  const handleTest = event => {
    setTest(event.target.value)
  }

  const Scenarioform = () => {
    return (
      <>
        <div className={classes.description}>
          <Typography variant='body1'>
            Please consider a scenario that describes the situation your user will be in when they do a Google search that will lead them to your website.
          </Typography>
        </div>
        <form autoComplete='off' className={classes.form} onSubmit={handleSubmitScenario}>
          <TextField id='foo'
            label="scenario"
            multiline
            fullWidth
            rowsMax='2'
            value={scenarioText}
            onChange={handleChangeScenario}
          />
          <TextField value={test} onChange={handleTest} />
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </form>
      </>
    )
  }
  const LoginForm = () => {
    return (
      <div className={classes.extra}>
        <Typography variant='body1'>
          In order for us to secure your results so that only you can see them, you need to make an account with us. Don't worry, we won't ever email you unless you opt in and we won't share your information with anyone!
        </Typography>
      </div>
    )
  }

  const pageContent = (
    <>
      {
        {
          0: <Scenarioform />,
          1: <LoginForm />
        }[pageControl]
      }
    </>
  )

  return (
    <>
      <Layout
        content={pageContent}
        title='Create a New Scenario'
      />
    </>
  )
}

export default Create