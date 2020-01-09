import React from 'react';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TitleBar from './components/TitleBar';
import Menu from "./components/Menu";
import store from './store';
import Cookies from 'universal-cookie';
import { makeStyles } from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appContent: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

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
                    <TitleBar menuIsOpen={open} history={history} title={title} onOpenMenu={onOpenMenu}/>
                    <Menu isOpen={open} handleClose={onCloseMenu}/>
                    <main className={classes.appContent}>
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </div>
            ) : children
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
      <RoutedComponents>
        {props.children}
      </RoutedComponents>
    </Provider>
  );
};

export default App;
