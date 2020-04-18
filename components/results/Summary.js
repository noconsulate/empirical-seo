import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    border: 'dashed',
    padding: theme.spacing(1),
  }
}))

export default function (props) {
  const classes = useStyles()

  const {wordCount, handleDeleteClick} = props

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        number of words: {wordCount}
      </Typography>
      <Button onClick={handleDeleteClick}>
        Delete
      </Button>
    </div>
  )
}