import { Typography, Button, Grid } from '@material-ui/core'
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
      <Grid container>
        <Grid item>
          <Typography variant='body1'>
            Thank you for your submission.
          </Typography>
        </Grid>
        <Grid item>
          {
            privateResults == false ?
              <div>
                <Typography variant='body1'>
                  You can see the results of the survey here:
            </Typography>
                <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
                  {`${domain}/results?urlid=${urlId}`}
                </Link>
              </div> :
              null
          }
        </Grid>
        <Grid item>
          <Button onClick={handleReset}>
            Return to survey
          </Button>
        </Grid>
      </Grid>
    </>
  )
}