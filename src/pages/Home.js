import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  
  useEffect(() => {
    axios.get('http://localhost:8081/home')
      .then(response => 
        {
          if(response.data.Status === 'success'){
            setAuth(true);
            setName(response.data.name);
            console.log(response);
          } else {
            setAuth(false);
            setMessage(response.data.Error);
          }
        })
      .catch(error => console.log(error))
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
    .then(res => {
      localStorage.reload();
    })
    .catch(error => console.log(error))
  }

  return (
    <div className='container mt-4'>
      {
        auth ?
        <div>
          <h3>You are Authorized {name}</h3>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
        :
        <div>
          <h3>{message}</h3>
          <h3>Login now</h3>
          <Link to="/" className="btn btn-primary">Login</Link>
        </div>
      }
    </div>
  );
}
  
export default Home;