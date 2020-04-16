import { useState } from 'react'
<<<<<<< HEAD
import { Typography, TextField, Grid, FormGroup, FormControlLabel, Checkbox, } from '@material-ui/core'
=======
import { Typography, TextField, Grid, FormGroup, FormControlLabel, Checkbox, Button} from '@material-ui/core'
>>>>>>> layout
import { makeStyles } from '@material-ui/core/styles'
import Link from '../../src/Link'

const useStyles = makeStyles(theme => ({
<<<<<<< HEAD
  root: {
    padding: theme.spacing(2),
    backgroundColor: 'pink',
  }
=======
  
>>>>>>> layout
}))

export default function (props) {
  const classes = useStyles()

  const domain = process.env.DOMAIN

  const { handleSignIn, urlId } = props

<<<<<<< HEAD
  const [formText, setFormText] = useState('')
  const handleChange = event => {
    setFormText(event.target.value)
  }
  
=======
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

>>>>>>> layout
  const handleGoBack = () => {
    console.log('time for some more redux action!')
  }

  return (
<<<<<<< HEAD
    <div className={classes.root}>
=======
    <>
>>>>>>> layout
      <Grid container>
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
        <Grid item>
          <Typography variant='body1'>
            In order for us to secure your results so that only you can see them, all we need is your email address.
          </Typography>
        </Grid>
        <Grid item>
<<<<<<< HEAD
          <form onSubmit={handleSignIn}>
=======
          <form onSubmit={handleSignInInternal}>
>>>>>>> layout
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
                label='AUSTIN COME UP WITH SOMETHING HERE for OPT IN language'
              />
            </FormGroup>
            <Button type='submit'>
              Sign in!
            </Button>
          </form>
        </Grid>
        <Grid item>
        <Button onClick={handleGoBack}>
          Go Back
        </Button>
        </Grid>
      </Grid>
<<<<<<< HEAD
    </div>
=======
    </>
>>>>>>> layout
  )
}
