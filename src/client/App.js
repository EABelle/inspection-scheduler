import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan800 } from 'material-ui/styles/colors';
import { withRouter } from 'react-router-dom';
import TitleBar from './components/TitleBar';
import Menu from "./components/Menu";
import store from './store';
import Cookies from 'universal-cookie';
import { makeStyles } from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";


const theme = getMuiTheme({
  palette: {
    primary1Color: cyan800,
    primary2Color: cyan800,
  },
});

const useStyles = makeStyles({
    root: {
        display: 'flex'
    },
    appContent: {
        width: '100%'
    }
});

const RoutedComponents = withRouter(({ location, history, children, ...props }) => {
    const classes = useStyles(props);

    const pathname = location.pathname.split('/')
      .find((path) => (
          Object.keys(titles).find((titleKey) => (titleKey === path))
      ));

  const title = titles[pathname];
  const cookies = new Cookies();

  const [open, setOpen] = React.useState(true);
  const onOpenMenu = () => { if (!open) setOpen(true); };
  const onCloseMenu = () => { if (open) setOpen(false); };

  return (
        cookies.get('inspector_token')
            ? (
                <div className={classes.root}>
                    <CssBaseline />
                    <Menu isOpen={open} handleClose={onCloseMenu}/>
                    <div className={classes.appContent}>
                        <TitleBar menuIsOpen={open} history={history} title={title} onOpenMenu={onOpenMenu}/>
                        {children}
                    </div>
                </div>
            ) : <div>{children}</div>
  )
});

const titles = {
  calendar: 'Calendar',
  inspections: 'Inspections',
  inspectors: 'Inspectors',
};

const App = (props) => {

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <div>
          <RoutedComponents>
            {props.children}
          </RoutedComponents>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
