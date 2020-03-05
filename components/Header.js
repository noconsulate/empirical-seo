import React, { useState, useEffect } from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { fbAuth } from '../config/firebase'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'orange'
  },
  user: {
    backgroundColor: 'pink',
  },
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