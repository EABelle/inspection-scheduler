import React from 'react';
import { Drawer, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/PermContactCalendar';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    menuContainer: {
        display: 'flex'
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
}));

const Menu = ({isOpen, handleClose}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
      <div className={classes.menuContainer}>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={isOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <Link to="/inspectors">
                <ListItem button key="Inspectors">
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Inspectors"/>
                </ListItem>
            </Link>
            <Link to="/calendar">
                <ListItem button key="Calendar">
                    <ListItemIcon><ScheduleIcon /></ListItemIcon>
                    <ListItemText primary="Calendar"/>
                </ListItem>
            </Link>
            <Link to="/inspections">
                <ListItem button key="Inspections">
                    <ListItemIcon><ListIcon /></ListItemIcon>
                    <ListItemText primary="Inspections"/>
                </ListItem>
            </Link>
        </Drawer>
      </div>
    );
};

export default Menu;
