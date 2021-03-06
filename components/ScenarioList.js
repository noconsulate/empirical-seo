import React from 'react'
import {
  Typography, List, ListItem, ListItemText, Divider, Grid,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
   // border: 'dashed',
    borderColor: 'grey',
    padding: theme.spacing(1)
  },
  item: {
  //  border: 'dashed',
    bordercolor: 'orange',
  },
  listItem: {
    padding: 0,
    marginLeft: theme.spacing(1)
  }
}))



const SurveyList = (props) => {
  const classes = useStyles()
  const {scenarios, animationHeight} = props
  console.log(scenarios)
  console.log(props)

  const ScenarioSlab = () => {
    if (scenarios.length === 0) {
      return (
        <Skeleton variant='rect' animation='wave' height={animationHeight} />
      )
    }
  
    return (
      <List>
        {scenarios.map(item => (
          <Link href={{ pathname: '/survey', query: { urlid: item.urlId } }} key={item.urlId} >
            <ListItem button className={classes.listItem}>
              <ListItemText primary={item.scenario} component='a' />
            </ListItem>
          </Link>
        ))}
      </List>
    )
  }

  const resultsRows = () => {
    if (scenarios) {
      return (
        <div className={classes.root}>
          <Grid container direction='column'>
            <Grid item className={classes.item}>
              <Typography variant='h5'>
                Your scenarios
              </Typography>
              <Divider />
            </Grid>
            <Grid item className={classes.item}>
              {ScenarioSlab()}
            </Grid>
          </Grid>



        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <Typography variant='body1'>
            It looks like you don't have any scenarios here!
          </Typography>
        </div>
      )
    }
  }
  return (
    <>
      {resultsRows()}
    </>
  )
}

export default SurveyList