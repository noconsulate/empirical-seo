import { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button'

import Layout from '../components/Layout'

import { db } from '../config/firebase'

const MyForm = () => (
  <Formik
    initialValues={{ keywords: 'keywordz' }}
    validate={values => {
      // Your client-side validation logic
    }}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values.keywords)
      alert(values.keywords)
      setSubmitting(false)
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <TextField name='keywords' />
        <Button
         type="submit"
         fullWidth
         variant="contained"
         color="primary"
         disabled={isSubmitting}
       >
         Submit
       </Button>
      </Form>
    )}
  </Formik>
);

const pageContent = (
  <div>
    <Typography variant='body1'>
      this is a digital scavenger hunt. Top searchers you will be rewarded by being entered into the contest
      </Typography>
    <br />
    <Typography variant='h5'>
      Find the best place to party Las Vegas
      </Typography>
    {MyForm()}
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