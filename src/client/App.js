import React from 'react';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TitleBar from './components/TitleBar';
import Menu from "./components/Menu";
import store from './store';
import Cookies from 'universal-cookie';
import { makeStyles } from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";

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
        <div>
          <RoutedComponents>
            {props.children}
          </RoutedComponents>
        </div>
    </Provider>
  );
};

export default App;
