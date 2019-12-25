import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ open, onToggle }) => (
  <Drawer open={open} onRequestChange={onToggle} docked={false}>
    <div className="drawer-title"> </div>
    <Link to="/inspectors">
      <MenuItem onClick={onToggle} style={{ textAlign: 'left' }}>Inspectors</MenuItem>
    </Link>
    <Link to="/calendar">
      <MenuItem onClick={onToggle} style={{ textAlign: 'left' }}>Calendar</MenuItem>
    </Link>
    <Link to="/inspections">
      <MenuItem onClick={onToggle} style={{ textAlign: 'left' }}>Inspections</MenuItem>
    </Link>
  </Drawer>
);

export default Menu;
