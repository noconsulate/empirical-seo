import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Head from 'next/head'

import Layout from '../components/Layout'

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

  return (
    <Layout
      content={pageContent}
      title='a Simple Survey'
    />
    
  )
}

export default Survey