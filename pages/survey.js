import React from 'react'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core/'
import { Formik, Form, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button'

import { db } from '../config/firebase'

import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  form: {
    backgroundColor: 'red',
    alignItems: 'center',
  },

  content: {
    backgroundColor: 'green',
  },
}))

const FormSchema = Yup.object().shape({
  keywords: Yup.string()
    .required('The search field is empty!')
})

const Survey = props => {
  const classes = useStyles()

  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const [hasAuthenticated, setHasAuthenticated] = React.useState(false)
  const [id, setId] = React.useState('')
  const submitAuth = (type) => {
    console.log(id)

    db.collection('keywords').doc(id).set({
      auth: type
    }, { merge: true })
      .then(docRef => {
        console.log('auth updated')
        setHasAuthenticated(true)
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
        <Grid container direction='column' className={classes.form}>
          <Form>
            <Grid item>
              <TextField name='keywords' placeholder='keywords here' autoComplete='off' />
            
            </Grid>
            <Grid item>
              <ErrorMessage name='keywords' />
            </Grid>
            <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Submit
         </Button>
            </Grid>
            
          </Form>
        </Grid>
      )}
    </Formik>
  );

  const beforeSubmit = () => (
    <div className={classes.content}>
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

  const beforeAuth = () => (
    <>
      <Typography variant='body1'>
        Please validate your submission by logging in with Google, Facebook, or email so you can entered into the contest.
      </Typography>
      <Button
        onClick={handleAuth}
      >
        AUTHENTICATE!
      </Button>

    </>
  )

  const afterAuth = () => (
    <>
      <Typography variant='body1'>
        Thank you for your participation. Hopefully it will be YOU on this beach with the lovely clam!
      </Typography>

    </>
  )
  const afterSubmit = () => (
    <div>
      {
        hasAuthenticated ?
          afterAuth() :
          beforeAuth()
      }
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