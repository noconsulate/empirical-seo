import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../../src/Link'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    border: 'solid'
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
      <Typography varaint='body1'>
        Please follow the link we just emailed to you. Every survey you create that you choose to make private will be associated with your email address, which you can use anytime to see a list of your surveys and private results by clicking on the profile icon in the upper right.
        </Typography>
      <Typography variant='body1'>
        Here is a link to the survey you just created. Be sure to bookmark it for later!
        </Typography>
      <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
        {`${domain}/results?urlid=${urlId}`}
      </Link>
      <br />
      <Button onClick={handleReset}>
        Create a new scenario
      </Button>
    </div>
  )
}