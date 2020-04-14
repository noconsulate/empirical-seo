import { Typography, TextField, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { fbAuth } from '../../config/firebase'

import Survey from '../Survey'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  description: {
    backgroundColor: 'orange',
  },
  draft: {
    border: 'solid',
  },
}))

const Draft = props => {
  const classes = useStyles()
  const { isUser, userEmail } = props.user
  const { handlePublish, handlePublishIsUser, handleGoBack, scenarioText } = props

  console.log(scenarioText)

  if (scenarioText === null) {
    return null
  }

  //needs work probably
  const fbSignOut = () => {
    fbAuth.signOut()
      .then(res => {
        console.log('signed out')
      })
  }

  if (isUser) {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item className={classes.description} xs={12}>
            <Typography varaint='body1'>
              Here is what your survey will look like.
          </Typography>
          </Grid>
          <Grid item className={classes.draft}>
            <Survey scenario={scenarioText} />
          </Grid>
          <Grid item className={classes.description}>
            <Typography variant='body1'>
              You are logged in as {userEmail}. Your new scenario will automatically be set to private and saved to this email, unless you logout.
          </Typography>
            <Grid container>
              <Button onClick={handlePublishIsUser}>
                Continue
              </Button>
              <Button onClick={fbSignOut}>
                Logout
              </Button>
              <Button onClick={handleGoBack}>
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container>
          <Grid item className={classes.description} xs={12}>
            <Typography variant='body1'>
              Here is what your survey will look like.
          </Typography>
          </Grid>
          <Grid item className={classes.draft} xs={12}>
            <Survey scenario={scenarioText} />
          </Grid>
          <Grid item className={classes.description}>
            <Typography variant='body1'>
              You are logged in as {userEmail}. Your new scenario will automatically be set to private and saved to this email, unless you logout.
          </Typography>
            <Grid container>
              <Button onClick={handlePublishIsUser}>
                Continue
              </Button>
              <Button onClick={fbSignOut}>
                Logout
              </Button>
              <Button onClick={handleGoBack}>
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
    </div>
  )
}
const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(Draft)