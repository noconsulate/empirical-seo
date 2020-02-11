import { makeStyles } from '@material-ui/core/styles'
import {
  Typography, Button, Grid
} from '@material-ui/core'
import { Formik, Form, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';

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
  const classes = useStyles()

  const MyForm = () => {
    <Formik
      initialValues={{ scenario: ''}}
      onSubmit={(values, { setSubmitting }) => {
        alert('submitting' + values.scenario)
        setSubmitting(false)
      }}
      >
      {({ isSubmitting }) => (
        <Grid container className={classes.form}>
          <Form>
            <Grid item>
              <TextField
                name='scenario'
                placeholder='scenario here'
                autoComplete='off'
              />
            </Grid>
            <Grid item>
              <Button 
                type='submit'
                variant='contained'
                color='primary'
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Grid>
          </Form>
        </Grid>
      )}
      </Formik>
  }

  const MyForm1 = () => {
    return(
      <div>
        can u poo
      </div>
    )
  }

  const ScenarioForm = () => {
    return (
      <div className={classes.extra}>
        <Typography variant='body1'>
          Please consider a scenario that describes the situation your user will be in when they do a Google search that will lead them to your website.
      </Typography>
      {MyForm()}
      {MyForm1()}
      </div>
    )
  }

  const pageContent = (
    <>
      <ScenarioForm />
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