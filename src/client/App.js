import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from './components/AppBar';
import Menu from './components/Menu'
import store from './store';
import {withRouter} from 'react-router-dom';
import './App.css';
import { cyan800 } from 'material-ui/styles/colors';
const theme = getMuiTheme({palette: {
  primary1Color: cyan800,
  primary2Color: cyan800,
}})

class App extends React.Component {

  state = {
    menuIsOpen: false
  }

  onToggleMenu = () => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    })
  }

  render() {
    const RouterAppBar = withRouter(props => <AppBar {...props}/>)

    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <RouterAppBar onOpenMenu={this.onToggleMenu} />
            <Menu open={this.state.menuIsOpen} onToggle={this.onToggleMenu} />
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App;
