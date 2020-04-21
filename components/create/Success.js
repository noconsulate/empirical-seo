import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../../src/Link'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    border: 'solid'
  },
  item: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
    <div className={classes.root}>
      <Typography variant='h4'>
        Thank you!
      </Typography>
      <Typography variant='body1' className={classes.item}>
        Here is a link to the survey you just created. Be sure to bookmark it for later! You can see all of your surveys and their results anytime by clicking on your email address in the nav bar or logging in. Anytime you visit one of your surveys when you're logged in you'll see a link to the results for that survey.
      </Typography>
      <div>
        <Link
          href={{ pathname: '/survey', query: { urlid: urlId } }}
        >
          {`${domain}/results?urlid=${urlId}`}
        </Link>
      </div>
      <Button onClick={handleReset} className={classes.button}>
        Create a new scenario
      </Button>
    </div>
  )
}