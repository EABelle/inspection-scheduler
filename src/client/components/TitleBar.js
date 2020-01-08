import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TitleBar = ({ title, history, onOpenMenu, menuIsOpen }) => {

  const onLogout = () => {
    const cookies = new Cookies();
    cookies.remove('inspector_token');
    history.push('/');
  };

  const classes = useStyles();

  return (
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            {
              menuIsOpen ? null : (
                  <IconButton onClick={onOpenMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
              )
            }
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
  );
};

export default TitleBar;
