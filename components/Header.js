import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'orange'
  }
}))
const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant='h3'>
        Empirical SEO
      </Typography>
    </div>
  )
}

export default Header