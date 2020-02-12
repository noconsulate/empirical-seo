import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography, Button, Grid, FormControl
} from '@material-ui/core'
import { Formik, Form, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';

import { db } from '../config/firebase'

import Layout from '../components/Layout'

const useStyles = makeStyles(theme => ({
  extra: {
    backgroundColor: 'red',
  },
  form: {
    backgroundColor: 'purple',
  },
}))

const Create = props => {
  const [id, setId] = React.useState('')
  const [pageControl, setPageControl] = React.useState(0)

  const classes = useStyles()

  const MyScenarioForm = () => (
    <Formik
      initialValues={{ scenario: '' }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)

        db.collection('scenarios').add({
          scenario: values.scenario,
        })
          .then(docRef => {
            console.log('scenario written to: ', docRef.id)
            setId(docRef.id)
          })
          .catch(error => {
            console.error('error adding document: ', error.message)
            
          })

        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Grid container direction='column' className={classes.form}>
          <Form>
            <Grid item>
              <TextField 
                name='scenario' 
                placeholder='scenario here' 
                autoComplete='off' 
                fullWidth
              />

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

  const ScenarioForm = () => {
    return (
      <div className={classes.extra}>
        <Typography variant='body1'>
          Please consider a scenario that describes the situation your user will be in when they do a Google search that will lead them to your website.
      </Typography>
      {MyScenarioForm()}
      </div>
    )
  }

  const LoginForm = () => {
    return (
      <div className={classes.extra}>
        <Typography variant='body1'>
          In order for us to secure your results so that only you can see them, you need to make an account with us. Don't worry, we won't ever email you unless you opt in and we won't share your information with anyone!
        </Typography>
        {MyLoginForm}
      </div>
    )
  }

  const pageContent = (
    <>
      {
        {
          0: <ScenarioForm />,
        }[pageControl]
      }
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