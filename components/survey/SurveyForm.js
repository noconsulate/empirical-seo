import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, TextField, Button } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme => ({
  form: {
    border: 'solid',
  },
  content: {
    border: 'solid',
  },
}))

const Survey = props => {
  const classes = useStyles()

  const { scenario, handleSubmit } = props

  const [formText, setFormText] = useState('')

  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleSubmitInternal = event => {
    console.log('hello')
    handleSubmit(event, formText)
  }

  return (
    <>
      <div className={classes.content}>
        {
          scenario ? (
            <Typography variant='body1'>
              {scenario}
            </Typography>
          ) : (
            <Skeleton variant='rect' />
          )
        }
      </div>
      <div className={classes.form}>
        <form
          autoComplete='off'
          onSubmit={handleSubmitInternal}
        >
          <TextField
            value={formText}
            onChange={handleChange}
          />
          <Button type='submit'>
            SUBMIT
        </Button>
        </form>
      </div>
    </>
  )
}

export default Survey