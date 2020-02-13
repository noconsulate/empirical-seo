import { useState } from 'react'
import {
  TextField,
} from '@material-ui/core'

import Layout from '../components/Layout'

const Create = props => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }
  const pageContent = (
    <>
      <TextField
        value={value}
        onChange={handleChange}
      />
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