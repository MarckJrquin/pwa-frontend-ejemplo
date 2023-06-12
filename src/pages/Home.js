import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [name, setName] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/home')
    .then(res => {
      if(res.data.valid){
        setName(res.data.username);
      } else {
        navigate('/');
      }
    })
    .catch(err => console.log(err))
  });

  return (
    <div>
      <h1>Welcome {name}</h1>
    </div>
  );
}
  
export default Home;