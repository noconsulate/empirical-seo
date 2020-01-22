import { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Layout from '../components/Layout'

import { db } from '../config/firebase'


const pageContent = (
  <div>
    <Typography variant='body1'>
      this is a digital scavenger hunt. Top searchers you will be rewarded by being entered into the contest
      </Typography>
    <br />
    <Typography variant='h5'>
      Find the best place to party Las Vegas
      </Typography>
    <form noValidate autoComplete='off'>
      <TextField label='keywords' /> <br />
      <Button variant='contained'>submit</Button>
    </form>
  </div>
)

const Survey = props => {
  useEffect(() => {
    db.collection('users').add({
      first: 'ada',
      last: 'lovelace',
      born: 1815
    })
      .then(docRef => {
        console.log('document written with id: ', docRef.id)
      })
      .catch(error => {
        console.error('error: ', error)
      })
  }, [])
  return (
    <Layout
      content={pageContent}
      title='a Simple Survey'
    />

  )
}

export default Survey