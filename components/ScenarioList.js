import React, { useEffect, useState, useContext } from 'react'
import {
  Typography, List, ListItem
} from '@material-ui/core'
import Link from '../src/Link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: 'red',
  },
}))

const domain = process.env.domain

const SurveyList = (props) => {
  const classes = useStyles()
  const scenarios = props.scenarios
  console.log(scenarios)

  const fakeScenarios = [
    {
      urlId: 'xxxx',
      scenario: 'fake scenario'
    },
    {
      urlId: 'yyy',
      scenario: 'fake scenario 2'
    }
  ]

  const resultsRows = () => {
    if (scenarios) {
      return (
        <div className={classes.main}>
          <Typography variant='body1'>
            Here's a list to all of your scenarios:
            <List>
            {scenarios.map(item => (
              <ListItem key={item.urlId}>
                <Link href={{ pathname: '/survey', query: { urlid: item.urlId } }}>
                  {item.scenario}
                </Link>
              </ListItem>
            ))}
          </List>
          </Typography>
        </div>
      )
    } else {
      return <p>noscenarios</p>
    }
  }
  return (
    <>
      {resultsRows()}
    </>
  )
}

export default SurveyList