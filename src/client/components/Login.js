import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import sha256 from 'sha256';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { login } from '../api/login';
import { isAuthenticated } from '../services/authService';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      error: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const payload = {
      username: this.state.username,
      password: sha256(this.state.password).toUpperCase(),
    };
    login(payload)
      .then((response) => {
        if (response.status === 200) {
          const cookies = new Cookies();
          cookies.set('inspector_token', response.data, { path: '/' });
          console.log('Login successfull');
          this.setState(() => ({
            redirectToReferrer: true,
          }));
        } else {
          console.log('Wrong username or password');
          this.setState(() => ({
            error: true,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/inspections' } };
    const { redirectToReferrer } = this.state;
    console.log(this.state)
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <form>
        <TextField
          hintText="Ingrese su usuario"
          floatingLabelText="Usuario"
          onChange={(event, newValue) => this.setState({ username: newValue })}
          errorText={this.state.error ? 'Usuario o contraseña incorrectos' : ''}
        />
        <br />
        <TextField
          type="password"
          hintText="Ingrese su contraseña"
          floatingLabelText="Contraseña"
          onChange={(event, newValue) => this.setState({ password: newValue })}
          errorText={this.state.error ? 'Usuario o contraseña incorrectos' : ''}
        />
        <br />
        <RaisedButton label="Entrar" primary style={style} onClick={(event) => this.handleClick(event)} />
      </form>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
