import { useState } from 'react'
import { Typography, TextField, Grid, FormGroup, FormControlLabel, Checkbox, Button, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Link from '../../src/Link'

import { setPageControl } from '../../reducers/flagsSlice'

const useStyles = makeStyles(theme => ({

}))

const mapDispatch = { setPageControl }

export default connect(null, mapDispatch)(function (props) {
  const classes = useStyles()

  const domain = process.env.DOMAIN

  const { handleSignIn, urlId } = props

  const [formText, setFormText] = useState('noconsulate@gmail.com')
  const [checked, setChecked] = useState(false)

  const handleSignInInternal = event => {
    console.log(formText)
    handleSignIn(event, formText, checked)
  }

  const handleChange = event => {
    setFormText(event.target.value)
  }

  const handleCheckbox = () => {
    setChecked(!checked)
  }

  const handleGoBack = () => {
    props.setPageControl(0)
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Typography variant='body1'>
            Here's the link to your survey, make sure to save it somewhere! Anybody who has this link can participate.
        </Typography>
        </Grid>
        <Grid item>
          <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
            {`${domain}/survey?urlid=${urlId}`}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item>
          <Typography variant='body1'>
            Here's the results page. Please note anyone with this link can see your results, unless you provide your email address below.
         </Typography>
        </Grid>
        <Grid item>
          <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
            {`${domain}/results?urlid=${urlId}`}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item>
          <Typography variant='body1'>
            In order for us to secure your results so that only you can see them, all we need is your email address.
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSignInInternal}>
            <TextField
              label='email'
              value={formText}
              onChange={handleChange}
              type='email'
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleCheckbox}
                    valiue='primary'
                  />
                }
                label='Opt in!'
              />
            </FormGroup>
            <Grid container>
              <Grid item>
                <Button type='submit'>
                  Sign in!
                </Button>
              </Grid>
              <Grid item>
              <Button onClick={handleGoBack}>
                Go Back
              </Button>
              </Grid>
            </Grid>

          </form>
        </Grid>
       
      </Grid>
    </>
  )
})
