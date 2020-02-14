import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography, Button, Grid, FormControl, TextField
} from '@material-ui/core'
import shortid from 'shortid'
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
  const [scenarioText, setScenarioText] = React.useState('')
  const [formText, setFormText] = React.useState('')

  
  const classes = useStyles()

  const handleChangeScenario = event => {
    setFormText(event.target.value)
  }

  const handleSubmitScenario = event => {
    event.preventDefault()
    const urlId = shortid.generate()
    console.log(urlId)
    
    db.collection('scenarios').add({
      scenario: formText,
      urlId,
    })
      .then(docRef => {
        console.log('scenario written to: ', docRef.id)
        setId(docRef.id)
        setPageControl(1)
        setFormText('')
      })
      .catch(error => {
        console.error('error adding document: ', error.message)
      })
  }

  const ScenarioForm = () => {
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
            value={formText}
            onChange={handleChangeScenario}
          />
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

  const viewControl = () => {
    switch (pageControl) {
      case 0:
        return ScenarioForm()
      case 1:
        return LoginForm()
    } 
  }

  const pageContent = (
    <>
      {
        viewControl()
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