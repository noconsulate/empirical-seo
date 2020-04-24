import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
 //   border: 'dashed',
    backgroundColor: 'orange',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(.5)
  },
  logo: {
  //  border: 'solid',
  }
}))
const Header = () => {
  const classes = useStyles()


  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item className={classes.logo}>
          <Typography variant='h4'>
            Empirical Keywords
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header