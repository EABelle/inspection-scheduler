import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ open, onToggle }) => (
  <Drawer open={open} onRequestChange={onToggle} docked={false}>
    <div className="drawer-title"> </div>
    <Link to="/inspectores">
      <MenuItem onClick={onToggle} style={{ textAlign: 'left' }}>Inspectores</MenuItem>
    </Link>
    <Link to="/calendario">
      <MenuItem onClick={onToggle} style={{ textAlign: 'left' }}>Calendario</MenuItem>
    </Link>
    <Link to="/inspecciones">
      <MenuItem onClick={onToggle} style={{ textAlign: 'left' }}>Inspecciones</MenuItem>
    </Link>
  </Drawer>
);

export default Menu;
