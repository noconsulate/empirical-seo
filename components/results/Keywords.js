import { Typography, TextField, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme => ({
  root: {
    border: 'dashed',
    padding: theme.spacing(1),
  }
}))

export default function (props) {
  const classes = useStyles()
  const {rowsKeywords} = props

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        Keywords
       </Typography>
      {rowsKeywords()}
    </div>
  )
}