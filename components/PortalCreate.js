// component for login flow from creating scenario

import React, { useEffect, useState } from 'react'
import { List, ListItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { fbAuth, db, dbArrayUnion } from '../config/firebase'

import Layout from './Layout'

const domain = process.env.domain

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: 'yellow',
  },
}))
const PortalCreate = ({ scenarioId, urlId }) => {
  const classes = useStyles()


  return (
    <>
      
    </>
  )
}

export default PortalCreate

