import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../../src/Link'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
 //   border: 'solid'
  },
  button: {
    marginTop: theme.spacing(1)
  }
}))

const domain = process.env.DOMAIN

export default function (props) {
  const classes = useStyles()

  const { handleReset, urlId } = props

  return (
    <>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='h4'>
            Thank you!
          </Typography>
        </Grid>
        <Grid item>
         <Typography variant='body1' className={classes.item}>
           Here is a link to the survey you just created. Be sure to bookmark it for later! You can see all of your surveys and their results anytime by clicking on your email address in the nav bar or logging in. Anytime you visit one of your surveys when you're logged in you'll see a link to the results for that survey.
         </Typography>
        </Grid>
        <Grid item>
          <Link
            href={{ pathname: '/survey', query: { urlid: urlId } }}
          >
            {`${domain}/results?urlid=${urlId}`}
          </Link>
        </Grid>
        <Grid item>
          <Button onClick={handleReset}>
            Create a new scenario
          </Button>
        </Grid>
      </Grid>
    </>
  )
}