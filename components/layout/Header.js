import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
    border: 'dashed',
    paddingLeft: theme.spacing(2),
  },
}))
const Header = () => {
  const classes = useStyles()


  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item>
          <Typography variant='h4'>
            Empirical SEO
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header