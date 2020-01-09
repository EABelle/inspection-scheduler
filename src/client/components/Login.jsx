import React, { useState } from 'react';
import {TextField, Button, makeStyles} from '@material-ui/core';
import sha256 from 'sha256';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { login } from '../api/login';
import Car from '../images/car.png';

const useStyles = makeStyles( theme => ({
  title: {
    color: theme.palette.text
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const cookies = new Cookies();

const Login = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(!!cookies.get('inspector_token'));

  const handleKey = async (event) => {
    if (event.key === 'Enter') {
      await performLogin();
    } else {
      if (error) {
        setError(false)
      }
    }
  };

  const performLogin = async () => {
    const payload = {
      username,
      password: sha256(password).toUpperCase(),
    };
    try {
      const response = await login(payload);
      if (response.status === 200) {
        cookies.set('inspector_token', response.data, { path: '/' });
        setRedirectToReferrer(true);
      } else {
        setError(true);
      }
    }
    catch(e) { setError(true) }
  };

  const { from } = props.location.state || { from: { pathname: '/inspections' } };
  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }

  return (
      <div className={classes.loginContainer}>
        <img src={Car} alt="CarLogo" width={150} height={150} />
        <h3 className={classes.title}>My Inspections</h3>
        <form noValidate autoComplete="off" className={classes.loginForm}>
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
      </div>
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

export default React.memo(Login);
