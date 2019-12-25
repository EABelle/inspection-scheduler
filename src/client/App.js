import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan800 } from 'material-ui/styles/colors';
import { withRouter } from 'react-router-dom';
import AppBar from './components/AppBar';
import Menu from './components/Menu';
import store from './store';
import './App.css';

const theme = getMuiTheme({
  palette: {
    primary1Color: cyan800,
    primary2Color: cyan800,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
    this.onToggleMenu = this.onToggleMenu.bind(this);
  }

  onToggleMenu() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    });
  }

  render() {
    const RouterAppBar = withRouter((props) => <AppBar {...props} />);

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
    );
  }
}

export default App;
