import { Typography, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme => ({
  root: {
  //  border: 'dashed',
    padding: theme.spacing(1)
  }
}))

export default function (props) {
  const classes = useStyles()
  
  const {phrases} = props

  const rowsPhrases = () => {
    let listKey = 0
    return (

      <div>
        <List dense={true}>
          {phrases.map(phrase =>
            <ListItem key={listKey++}>
              <ListItemText primary={phrase} />
            </ListItem>
          )}
        </List>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        Phrases
      </Typography>
      {
        phrases.length === 0 ?
        (
          <Skeleton variant='rect' animation='wave' height={500} />
        ) :
        (
          rowsPhrases()
        )
      }
    </div>
  )
}