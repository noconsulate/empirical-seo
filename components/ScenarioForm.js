import { useState } from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { db } from '../config/firebase'

const useStyles = makeStyles(theme => ({
  form: {
    width: 900,
    backgroundColor: 'yellow'
  },
  description: {
    backgroundColor: 'orange',
  },
}))

const Scenarioform = props => {
  const classes = useStyles()

  const [scenarioText, setScenarioText] = useState('')
  const [id, setId] = useState('')

  const handleChange = event => {
    setScenarioText(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    db.collection('scenarios').add({
      scenario: scenarioText,
    })
      .then(docRef => {
        console.log('scenario written to: ', docRef.id)
        setId(docRef.id)
      })
      .catch(error => {
        console.error('error adding document: ', error.message)
        
      })
  }
  return (
    <div>
      <div className={classes.description}>
        <Typography variant='body1'>
          Please consider a scenario that describes the situation your user will be in when they do a Google search that will lead them to your website.
        </Typography>
      </div>
      <form autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="scenario"
          multiline
          fullWidth
          rowsMax='2'
          value={scenarioText}
          onChange={handleChange}
        />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </div>

  )
}

export default Scenarioform