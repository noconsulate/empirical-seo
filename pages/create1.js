import { useState } from 'react'
import {
  TextField, Typography
} from '@material-ui/core'

import Layout from '../components/Layout'

const Create = props => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const ScenarioView = () => {
    return (
      <>
        <Typography variant='body1'>
          Scenario:
        </Typography>
        <form>
          <TextField  
            value={value}
            onChange={handleChange}
          />
        </form>
      </>
    )
  }

  const pageContent = (
    <>
      {ScenarioView()}
    </>
  )
  return (
    <>
      <Layout
        content={pageContent}
        title='Create a New Scenario'
      />
    </>
  )
}

export default Create