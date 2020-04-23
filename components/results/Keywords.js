import { Typography, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme => ({
  root: {
  //  border: 'dashed',
    padding: theme.spacing(1),
  }
}))

export default function (props) {
  const classes = useStyles()
  const {keywords} = props

  const rowsKeywords = () => {
    let listKey = 0
    return (
      <List dense={true}>
        {keywords.map(word =>
          <ListItem key={listKey++}>
            <ListItemText primary={`"${word.keyword}": ${word.count} times`} />
          </ListItem>
        )}
      </List>
    )
  }

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        Keywords
       </Typography>
       {
         keywords.length === 0 ?
         (
           <Skeleton variant='rect' animation='wave' height={500} />
         ) : 
         (
          rowsKeywords()
         )
       }
  
    </div>
  )
}