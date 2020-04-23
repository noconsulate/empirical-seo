import { Typography, Button, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Link from '../../src/Link'

const useStyles = makeStyles(theme => ({
  
}))

export default function (props) {
  const classes = useStyles()

  const domain = process.env.DOMAIN

  const { urlId, handleReset, privateResults, owned } = props
  console.log(privateResults)
  return (
    <>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='body1' gutterBottom>
            Thank you for your submission.
          </Typography>
          <Divider />
        </Grid>
        {
          privateResults === false ? (
            <Grid item>
              <Typography variant='body1'>
                You can see the results of the survey here:
                <br />
                <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
                {`${domain}/results?urlid=${urlId}`}
              </Link>
              </Typography>
              
              <Divider />
            </Grid>
          ) : (
            null
          )
        }
        <Grid item>
          <Button onClick={handleReset}>
            Return to survey
          </Button>
        </Grid>
      </Grid>
    </>
  )
}