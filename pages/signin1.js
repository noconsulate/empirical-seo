// prototype for signin.js without validation

import React, { useEffect, useState } from 'react'
import Link from '../src/Link'
import { List, ListItem, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { fbAuth, db, dbArrayUnion } from '../config/firebase'

import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  signup: {
    backgroundColor: 'yellow',
  },
}))

const prodUrl = process.env.prodUrl

const SignIn = props => {
  const [scenarios, setScenarios] = useState([])

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
      setScenarios(urlIds)
    }

    dbQuery()
  }, [])

  const resultsRows = () => {
    console.log(scenarios)
    if (scenarios) {
      return (
        <>
          <Typography variant='body1'>
            The results to all of your scenarios:
          </Typography>
          <List>
            {scenarios.map(item => (
              <ListItem key={item}>
                <Link href={{ pathname: '/results', query: { urlid: urlId } }}>
                {`${prodUrl}/results?urlid=${item}`}
                </Link>
              </ListItem>
            ))}
          </List>
        </>
      )
    } else {
      return <p>noscenarios</p>
    }
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

