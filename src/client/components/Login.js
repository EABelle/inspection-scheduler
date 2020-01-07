import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import sha256 from 'sha256';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { login } from '../api/login';

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      performLogin()
    } else {
      if (error) {
        setError(false)
      }
    }
  };

  const performLogin = () => {
    const payload = {
      username,
      password: sha256(password).toUpperCase(),
    };
    login(payload)
      .then((response) => {
        if (response.status === 200) {
          const cookies = new Cookies();
          cookies.set('inspector_token', response.data, { path: '/' });
          setRedirectToReferrer(true);
        } else {
          setError(true);
        }
      })
      .catch(setError(true));
    };

    const { from } = props.location.state || { from: { pathname: '/inspections' } };
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <form noValidate autoComplete="off">
        <TextField
          label="username"
          onChange={event => setUsername(event.target.value)}
          onKeyUp={handleKey}
        />
        <br />
        <TextField
          label="password"
          onChange={event => setPassword(event.target.value)}
          onKeyUp={handleKey}
        />
        <br />
          <Button color="primary" style={style.button} onClick={performLogin}>Login</Button>
        { error ? <p style={style.error}>Invalid username or password</p> : null }
      </form>
    );
};

const style = {
  button: {
    margin: 15
  },
  error: {
    color: 'red'
  }
};

export default Login;
