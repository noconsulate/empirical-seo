import { Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from '../../src/Link'

const useStyles = makeStyles(theme => ({
  root: {
    border: 'dashed',
    padding: theme.spacing(1)
  }
}))

export default function (props) {
  const classes = useStyles()
  const {urlId, scenarioText} = props

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        Results for
      </Typography>
      <Typography variant='h5'>
        <Link href={{ pathname: '/survey', query: { urlid: urlId } }}>
          {scenarioText}
        </Link>
      </Typography>
    </div>
  )
}