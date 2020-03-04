import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Typography, Grid, TextField, Button } from '@material-ui/core'

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
  const classes = useStyles()

  const [text, setText] = useState('')

  const handleChange = event => {
    setText(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
  }

  return (
    <>
      <Grid container direction='column'>
        <div className={classes.content}>
          <Typography variant='body1'>
            {props.scenario}
          </Typography>
        </div>
        <form
          className={classes.form}
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <TextField
            value={text}
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

export default Survey