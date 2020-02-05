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
  const [id, setId] = React.useState('')
  const submitAuth = (type) => {
    console.log(id)
    
    db.collection('keywords').doc(id).set({
      auth: type
    }, { merge: true })
    .then(docRef => {
      console.log('auth updated')
    })
    .catch(error => {
      console.error('Error updating document: ', error)
    })
  }

  const handleAuth = () => {
    submitAuth('dummy')
  }

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
          setId(docRef.id)
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
          <TextField name='keywords' placeholder='keywords here' autoComplete='off'/>
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
    <div>
      <Typography variant='body1'>
        Please validate your submission by logging in with Google, Facebook, or email so you can entered into the contest. 
      </Typography>
      <Button
       onClick={handleAuth}
      >
        AUTHENTICATE!
      </Button>
      <img src='https://firebasestorage.googleapis.com/v0/b/empirical-seo.appspot.com/o/photo_2020-01-30_16-07-10.jpg?alt=media&token=25358198-3148-425c-b57e-0d49f0e544b7' /> 
    </div>
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