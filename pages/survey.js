import React from 'react'
import * as Yup from 'yup'
import Typography from '@material-ui/core/Typography'
import { Formik, Form, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button'

import { db } from '../config/firebase'

import Layout from '../components/Layout'

const FormSchema = Yup.object().shape({
  keywords: Yup.string()
    .required('The search field is empty!')
})

const Survey = props => {
  const [hasSubmitted, setHasSubmitted] = React.useState(false)


  const MyForm = () => (
    <Formik
      initialValues={{ keywords: '' }}
      validationSchema={FormSchema}
      onSubmit={(values, { setSubmitting }) => {
        const keywords = values.keywords.split(' ').filter(item => item != '')
        console.log('keywords', keywords)
        db.collection('keywords').add({
          words: keywords
        })
        .then(docRef => {
          console.log("Keywords written to: ", docRef.id)
        })
        .catch(error => {
          console.error("Error adding document: ", docRef.id);
        })
        setSubmitting(false)
        setHasSubmitted(true)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextField name='keywords' placeholder='keywords here' />
          <ErrorMessage name='keywords' />
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

  const beforeSubmit = () => (
    
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
  const afterSubmit = () => (
    <img src='https://firebasestorage.googleapis.com/v0/b/empirical-seo.appspot.com/o/beachclam.jpg?alt=media&token=5005560c-fa6d-4c08-ac5e-b70e52d9c042' /> 
  )
  
  const pageContent = (
    <div>
      {
        hasSubmitted ? 
        afterSubmit() :
        beforeSubmit()
      }
    </div>
  )

  return (
    <Layout
      content={pageContent}
      title='a Simple Survey'
    />

  )
}

export default Survey