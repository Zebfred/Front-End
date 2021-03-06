import React from 'react';
import { withFormik, Form, Field } from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup'

import {login} from '../actions/login'

function LoginForm(props){   
   
    const { values,
            touched,
            errors,
          } = props;
    return (
       
            <div className="login">
                <Form className='login-form'>
                <div>
                <label htmlFor='username'>Username</label>
                <Field
                    name='username' 
                    id='username' 
                    value={values.username}
                />
                {touched.username && errors.username && (
                    <p className="errors"> {errors.username}</p>
                )}
                </div>
                <div>
                <label htmlFor='password'>Password</label>
                <Field 
                    type='password' 
                    name='password' 
                    id='password'
                    value = {values.password}
                />
                {touched.password && errors.password && (
                    <p className='errors'> {errors.password}</p>
                )}
                </div>
                <button type="submit" className='login-button'>Login</button>

            </Form>
            </div>
       
            
       

    )
}

const Login = withFormik({
    mapPropsToValues({ username, password, email }) {
        return {
          username: username || "",
          password: password || ""
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username required'),
        password:Yup.string().min(3, "3 or more characters").matches('^(?=.*[0-9]$)(?=.*[a-zA-Z])', "Password must contain atleast 1 letter and 1 number").required("PassRequired")
    }),
    handleSubmit(values, {props, resetForm}) {
        props.login(values);
        resetForm();
        
      }

})(LoginForm);

export default connect(null, {login})(Login);
