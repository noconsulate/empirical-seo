import { Typography, Grid, Button, Divider, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { removeUser } from '../../reducers/userSlice'

import SurveyForm from '../survey/SurveyForm'

const useStyles = makeStyles(theme => ({
  root: {
  //  paddingTop: theme.spacing(1),
  },
  description: {
    //   border: 'solid'
  },
  survey: {
    //   border: 'dashed',
    //    margin: theme.spacing(1),
  },
  draft: {
    // border: 'solid',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(.5)
  },
  paper: {
    padding: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(.8),
  },
  buttons: {
    //  paddingTop: theme.spacing(1)
  }
}))

const handleSubmit = (event, text) => {
  event.preventDefault()

}

const Draft = props => {
  const classes = useStyles()
  const { isUser, userEmail } = props.user
  const { handlePublish, handlePublishIsUser, handleGoBack, scenarioText, removeUser } = props

  if (scenarioText === null) {
    return null
  }

  if (isUser === true) {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item className={classes.description} xs={12}>
            <Typography variant='h6'>
              Here is what your survey will look like.
          </Typography>
          </Grid>
          <Grid item className={classes.draft} sm={8} xs={12}>
            <Paper className={classes.paper}>
              <SurveyForm scenario={scenarioText} />
            </Paper>
          </Grid>
          <Grid item className={classes.description}>
            <Typography variant='body1'>
              You are logged in as {userEmail}. Your new scenario will automatically be set to private and saved to this email, unless you logout.
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid container className={classes.buttons}>
            <Button
              onClick={handlePublishIsUser}
              color='primary'
            >
              Continue
              </Button>
            <Button onClick={() => removeUser()}>
              Logout
              </Button>
            <Button onClick={handleGoBack}>
              Edit
              </Button>
          </Grid>

        </Grid>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item className={classes.description} xs={12}>
          <Typography variant='h6'>
            Here is what your survey will look like.
          </Typography>
        </Grid>
        <Grid item className={classes.draft} sm={8} xs={12}>
          <Paper className={classes.paper}>
            <SurveyForm scenario={scenarioText} />
          </Paper>
        </Grid>
        <Grid item className={classes.description}>
          <Typography variant='body1'>
            After you click publish you'll get a link to the scenario for you to share and a link to special page where you can see all of the results. You'll also have the opportunity to make your results private.
          </Typography>
          <Divider className={classes.divider} />
        </Grid>
        <Grid container className={classes.buttons}>
          <Button
            onClick={handlePublish}
            variant='contained'
            color='primary'
          >
            Continue
            </Button>
          <Button onClick={handleGoBack}>
            Edit
            </Button>
        </Grid>

      </Grid>
    </div>
  )
}
const mapState = state => ({
  user: state.user
})

const mapDispatch = { removeUser }

export default connect(mapState, mapDispatch)(Draft)