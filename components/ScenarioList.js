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

const prodUrl = process.env.prodUrl

const SurveyList = (props) => {
  const classes = useStyles()
  const scenarios = props.scenarios
  const resultsRows = () => {
    console.log(scenarios)
    if (scenarios) {
      return (
        <div className={classes.main}>
          <Typography variant='body1'>
            The results to all of your scenarios:
          </Typography>
          <List>
            {scenarios.map(item => (
              <ListItem key={item}>
                <Link href={{ pathname: '/results', query: { urlid: item } }}>
                  {`${prodUrl}/results?urlid=${item}`}
                </Link>
              </ListItem>
            ))}
          </List>
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