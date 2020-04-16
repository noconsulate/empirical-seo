import { Typography } from '@material-ui/core'

import Layout from '../components/layout/Layout'

const Help = () => {

  const pageContent = (
    <>
      <Typography variant='body1'>
        Click on your email address to see your results.
      </Typography>
    </>
  )

  return (
    <>
      <Layout
        content={pageContent}
        title={'Help Page'}
      />
    </>
  )
}

export default Help