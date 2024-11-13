import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <NavLink className="logo" exact to="/">
          LOSTnFOUND
        </NavLink>
      </div>
      <div className="navbar__right">
        <NavLink exact activeClassName="is-active" to="/home">
          Home
        </NavLink>
        <NavLink activeClassName="is-active" to="/about">
          About
        </NavLink>
        <NavLink activeClassName="is-active" to="/found">
          Report Found Item
        </NavLink>
        <NavLink activeClassName="is-active" to="/lost">
          Report Lost Item
        </NavLink>
        <NavLink activeClassName="is-active" to="/helpusfind">
          Help Us Find
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
