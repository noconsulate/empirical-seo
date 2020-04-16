import { Typography, TextField, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { fbAuth } from '../../config/firebase'
import { removeUser } from '../../reducers/userSlice'

import SurveyForm from '../survey/SurveyForm'

const useStyles = makeStyles(theme => ({
  description: {
    border: 'solid'
  },
  survey: {
    border: 'dashed',
    margin: theme.spacing(1),
  },
}))

const handleSubmit = (event, text) => {
  event.preventDefault()
  console.log('click!', text)
}

const Draft = props => {
  const classes = useStyles()
  const { isUser, userEmail } = props.user
  const { handlePublish, handlePublishIsUser, handleGoBack, scenarioText } = props

  if (scenarioText === null) {
    return null
  }

  if (isUser === true) {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item className={classes.description} xs={12}>
            <Typography varaint='body1'>
              Here is what your survey will look like.
          </Typography>
          </Grid>
          <Grid item className={classes.draft}>
            <SurveyForm scenario={scenarioText} />
          </Grid>
          <Grid item className={classes.description}>
            <Typography variant='body1'>
              You are logged in as {userEmail}. Your new scenario will automatically be set to private and saved to this email, unless you logout.
          </Typography>
            <Grid container>
              <Button onClick={handlePublishIsUser}>
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
        </Grid>
      </div>
    )
  }

  return (
    <>
      <Grid container>
        <Grid item className={classes.description} xs={12}>
          <Typography variant='body1'>
            Here is what your survey will look like.
          </Typography>
        </Grid>
        <Grid item className={classes.survey} xs={12}>
          <SurveyForm scenario={scenarioText} handleSubmit={handleSubmit} />
        </Grid>
        <Grid item className={classes.description}>
          <Typography variant='body1'>
            After you click publish you'll get a link to the scenario for you to share and a link to special page where you can see all of the results. You'll also have the opportunity to make your results private.
          </Typography>
          <Grid container>
           <Button onClick={handlePublish}>
              Continue
            </Button>
            <Button onClick={handleGoBack}>
              Edit              
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
const mapState = state => ({
  user: state.user
})

const mapDispatch = { removeUser }

export default connect(mapState, mapDispatch)(Draft)