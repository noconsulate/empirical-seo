import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from "@material-ui/core/Button";

const MyForm = () => (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        // Your client-side validation logic
      }}
      onSubmit={(values, { setSubmitting }) => {
        // Call your API
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextField type="email" name="email"  />
          <TextField type="password" name="password" />
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

export default MyForm