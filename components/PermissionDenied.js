import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  main: {
 //   backgroundColor: 'yellow'
  },
}))

const PermissionDenied = props => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.main}>
      <Typography variant='body1'>
        Sorry, you don't have the correct permission
      </Typography>
      </div>
    </>
  )
}

export default PermissionDenied