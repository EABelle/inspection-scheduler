import React from 'react';
import ReactDOM from 'react-dom';
import './client/index.css';
import App from './client/App';
import registerServiceWorker from './client/registerServiceWorker';
import Inspectors from './client/components/Inspectors'
import Calendar from './client/components/Calendar'
import Inspections from './client/components/Inspections'
import Login from './client/components/Login'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './client/services/authService'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
//        console.log(props.location)
        return (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
    )}} />
  )

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/inspectores" component={Inspectors} />
                <PrivateRoute path="/calendario" component={Calendar} />
                <PrivateRoute path="/inspecciones" component={Inspections} />
            </Switch>
        </App>
      </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
