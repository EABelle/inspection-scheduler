import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import sha256 from 'sha256';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import { login } from '../api/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      error: false,
    };
    this.login = this.login.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  handleKey(event) {
    if (event.key === 'Enter') {
      this.login()
    } else {
      if (this.state.error) {
        this.setState({error: false})
      }
    }
  }

  login() {
    const payload = {
      username: this.state.username,
      password: sha256(this.state.password).toUpperCase(),
    };
    login(payload)
      .then((response) => {
        if (response.status === 200) {
          const cookies = new Cookies();
          cookies.set('inspector_token', response.data, { path: '/' });
          this.setState(() => ({
            redirectToReferrer: true,
          }));
        } else {
          this.setState({
            error: true,
          });
        }
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/inspections' } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <form>
        <TextField
          hintText="Username"
          floatingLabelText="Username"
          onChange={(event, newValue) => this.setState({ username: newValue })}
          onKeyUp={this.handleKey}
        />
        <br />
        <TextField
          type="password"
          hintText="Password"
          floatingLabelText="Password"
          onChange={(event, newValue) => this.setState({ password: newValue })}
          onKeyUp={this.handleKey}
        />
        <br />
        <RaisedButton label="Login" primary style={style.button} onClick={this.login} />
        { this.state.error ? <p style={style.error}>Invalid username or password</p> : null }
      </form>
    );
  }
}

const style = {
  button: {
    margin: 15
  },
  error: {
    color: 'red'
  }
};

export default Login;
