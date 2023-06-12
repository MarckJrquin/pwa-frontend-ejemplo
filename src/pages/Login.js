import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../utils/LoginValidation';

function Login() {

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
  }

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/home')
    .then(res => {
      if(res.data.valid){
        navigate('/home');
      } else {
        navigate('/');
      }
    })
    .catch(err => console.log(err))
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // setErrors(Validation(values));
    
    axios.post('http://localhost:8081/login', values)
    .then(res => {
        if(res.data.Login){
          navigate('/home');
        } else {
          alert("No record existed")
        }
        console.log(res);
    })
    .catch(error => console.log(error))  
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign in</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Email</strong></label>
            <input type='email' placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0'/>
            {/* {errors.email && <span className='text-danger'>{errors.email}</span>} */}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type='password' placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0'/>
            {/* {errors.password && <span className='text-danger'>{errors.password}</span>} */}
          </div>
          <button type='submit' className='btn btn-success w-100'><strong>Log in</strong></button>
          <p>You are agree to our terms and policies</p>
          <Link to='/signup' className='btn btn-default border w-100 bg-light text-decoration-none'>Create Account</Link>
        </form>
      </div>
    </div>
  );
}
  
export default Login;