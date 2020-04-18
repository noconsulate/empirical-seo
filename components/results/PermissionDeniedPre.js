import React, {useState} from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    border: 'dashed',
    padding: theme.spacing(1),
  }
}))

export default function (props) {
  const classes = useStyles()

  const [formText, setFormText] = useState('')
  const handleChange = event => {
    setFormText(event.target.value)
  }

  const {handleSignIn} = props

  const handleSignInInternal = event => {
    event.preventDefault()
    handleSignIn(formText)
  }

  return (
    <div className={classes.root}>
      <Typography variant='body1'>
        Sorry, you don't have permission to view this page. If you own this survey please login and view the results from your profile page. 
      </Typography>
    </div>
  )

  // Return to this later, for expanded functionality

  // return (
  //   <div className={classes.root}>
  //     <Typography variant='body1'>
  //       Sorry, you don't have the correct permission. If this is your scenario, you can login below with your email address.
  //     </Typography>
  //     <form onSubmit={handleSignInInternal}>
  //       <TextField
  //         label='email'
  //         value={formText}
  //         onChange={handleChange}
  //         type='email'
  //       />
  //       <Button type='submit'>
  //         Sign in!
  //       </Button>
  //     </form>
  //   </div>
  // )
}