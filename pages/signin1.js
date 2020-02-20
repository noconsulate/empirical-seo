import React, { useEffect, useState } from 'react'
import Link from '../src/Link'
import { List, ListItemText, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { fbAuth, db, dbArrayUnion } from '../config/firebase'

import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  signup: {
    backgroundColor: 'yellow',
  },
}))
const SignIn = props => {
  const [scenarios, setScenarios] = []

  const classes = useStyles()
  
  // const scenarioUid = props.query.scenario 
  // console.log(scenarioUid)
  const urlId = '6qWopKlL'
  const uid = 'L11shD0uDuZWKb1UZkvskEabQCo2'
  console.log(urlId)

  useEffect(() => {
    const dbQuery = async () => {
      const scenarioDoc = await db.collection('users').doc(uid).get()
      const urlIds = scenarioDoc.data().urlIds
      console.log(urlIds)

    }

    dbQuery()
  }, [])

  const ListItemLink = props => {
    return (
      <ListItem button component='Link' {...props} />
    )
  }

  const resultsRows = () => {
    return (
      <>
        what
        <Link href={{ pathname: '/create' }}>
          <a>hi</a>
        </Link>
        <List>
          <ListItem>
            <Link href='/create'>hi</Link>
          </ListItem>
        </List>
      </>
    )
  }

  const pageContent = (
    <>
      <div className={classes.signup}>
        {resultsRows()}
      </div>
    </>
  )

  return (
    <>
      <Layout
        content={pageContent}
        title='Finish signup'
      />
    </>
  )
}

export default SignIn

