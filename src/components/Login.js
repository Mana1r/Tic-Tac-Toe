import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

function Login({ setIsAuth }) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const cookies = new Cookies();

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      userName,
      password,
    }).then((res) => {
      const { firstName, lastName, userName, token, userId } = res.data;
      cookies.set('token', token);
      cookies.set('userId', userId);
      cookies.set('userName', userName);
      cookies.set('firstName', firstName);
      cookies.set('lastName', lastName);
      setIsAuth(true);
    });
  };
  return (
    <div className="login">
      <label> Login</label>

      <input
        placeholder="User Name"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}> Login</button>
    </div>
  );
}

export default Login;
