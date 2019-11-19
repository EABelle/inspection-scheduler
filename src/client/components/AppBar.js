import React from 'react';
import MuiAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Cookies from 'universal-cookie';

const titles = {
    calendario: 'Calendario de inspectores',
    inspecciones: 'Listado de inspecciones',
    inspectores: 'Inspectores'
}

const AppBar = ({onOpenMenu, location, history}) => {
    const pathname = location.pathname.split('/')
        .find( path => (
            Object.keys(titles).find( titleKey => ( titleKey === path ) )
        ));
    
    const title = titles[pathname];

    const onLogout = () => {
        const cookies = new Cookies();
        cookies.remove('inspector_token');
        history.push('/');
    }

    const cookies = new Cookies();

    return (
        cookies.get('inspector_token')
        ? <MuiAppBar 
        title={title}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        iconElementRight = {<FlatButton label="Cerrar sesión" />}
        onLeftIconButtonClick={onOpenMenu}
        onRightIconButtonClick={onLogout}
        />
        : null
)}

export default AppBar;