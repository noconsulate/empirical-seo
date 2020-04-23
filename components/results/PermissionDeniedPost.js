import { Typography, TextField, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
 //   border: 'dashed',
    padding: theme.spacing(1),
  }
}))

export default function (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant='body1'>
        Thank you, please check your email for a link to coninue signing in.
      </Typography>
    </div>
  )
}