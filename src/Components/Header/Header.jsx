import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/users'}>Users</NavLink>
            <NavLink to={'/SignUp'}>Sign Up</NavLink>
            <NavLink to={'/signIn'}>Sign In</NavLink>
        </div>
    );
};

export default Header;