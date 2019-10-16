import React from 'react';
import { Formik, Form, Field } from 'formik';

export default function Login(props) {
  const onLogin = ({ username, password }) => {
    return props.onLogin({ username, password });
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onLogin}
      render={() => (
        <Form className='login'>
          <Field name='username' type="text" placeholder='username' />
          <Field name='password' type="text" placeholder='password' />
          <input type='submit' />
        </Form>
      )}
    />
  );
}
