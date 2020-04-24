import { useState } from 'react'
import { Typography, TextField, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  description: {
    //  border: 'solid',
  },
  form: {
    //   border: 'solid',
  },
  TextField: {
    paddingBottom: theme.spacing(1)
  }
}))

export default function (props) {
  const classes = useStyles()

  const { handleSubmit, initialText } = props

  const [formText, setFormText] = useState(initialText)

  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleSubmitInternal = () => {
    handleSubmit(formText)
  }
  return (
    <>
      <Grid container>
        <Grid item className={classes.description}>
          <Typography variant='body1'>
            Please consider a scenario that describes the situation your user will be in when they do a Google search that will lead them to your website.
          </Typography>
        </Grid>
        <Grid item className={classes.form} xs={12}>
          <form autoComplete='off' onSubmit={handleSubmitInternal}>
            <Grid item xs={12} sm={6}>
              <TextField id='foo'
                label="scenario"
                multiline
                fullWidth
                rowsMax='2'
                value={formText}
                onChange={handleChange}
                className={classes.TextField}
              />
            </Grid>
            <Grid item>
              <Button type='submit' variant='contained'>
                Submit
            </Button>
            </Grid>


          </form>
        </Grid>
      </Grid>
    </>
  )
}