import { useState } from 'react'
import { Typography, TextField, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  description: {
    backgroundColor: 'orange',
  },
  form: {
    backgroundColor: 'red',
  }
}))

export default function (props) {
  const classes = useStyles()

  const { handleSubmit } = props

  const [formText, setFormText] = useState('')

  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleSubmitInternal = () => {
    handleSubmit(formText)
  }
  return (
    <>
    <div className={classes.root}>
      <Grid container>
        <Grid item className={classes.description}>
        <Typography variant='body1'>
            Please consider a scenario that describes the situation your user will be in when they do a Google search that will lead them to your website.
          </Typography>
        </Grid>
        <Grid item className={classes.form}>
        <form autoComplete='off'  onSubmit={handleSubmitInternal}>
          <TextField id='foo'
            label="scenario"
            multiline
            fullWidth
            rowsMax='2'
            value={formText}
            onChange={handleChange}
          />
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </form>
        </Grid>
      </Grid>
    </div>
    </>
  )
}