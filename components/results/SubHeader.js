import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import Link from '../../src/Link'

const useStyles = makeStyles(theme => ({
  root: {
    border: 'dashed',
    padding: theme.spacing(1)
  }
}))

export default function (props) {
  const classes = useStyles()
  const { urlId, scenarioText } = props

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        Results for
      </Typography>
      {
        scenarioText === null ?
          (
            <Skeleton variant='text' animation='wave' height={50}/>
          ) :
          (
            <Typography variant='h5'>
              <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
                {scenarioText}
              </Link>
            </Typography>
          )
      }

    </div>
  )
}