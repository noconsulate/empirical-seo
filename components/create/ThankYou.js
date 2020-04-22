import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../../src/Link'

const useStyles = makeStyles(theme => ({
  root: {
    border: 'solid'
  }
}))

const domain = process.env.DOMAIN

export default function (props) {
  const classes = useStyles()

  const { handleReset, urlId } = props

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant='h4'>
            Thank you!
      </Typography>
        </Grid>
        <Grid item>
          <Typography varaint='body1'>
            Please follow the link we just emailed to you. Every survey you create that you choose to make private will be associated with your email address, which you can use anytime to see a list of your surveys and private results by clicking on the profile icon in the upper right.
        </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1'>
            Here is a link to the survey you just created. Be sure to bookmark it for later!
        </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
              {`${domain}/results?urlid=${urlId}`}
            </Link>
          </Typography>
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