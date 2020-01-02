import React, { useState } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
      <form>
        <TextField
          hintText="Username"
          floatingLabelText="Username"
          onChange={(event, newValue) => setUsername(newValue)}
          onKeyUp={handleKey}
        />
        <br />
        <TextField
          type="password"
          hintText="Password"
          floatingLabelText="Password"
          onChange={(event, newValue) => setPassword(newValue)}
          onKeyUp={handleKey}
        />
        <br />
        <RaisedButton label="Login" primary style={style.button} onClick={performLogin} />
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
