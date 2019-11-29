import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import classes from './Logo.css';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Your Burger"/>
    </div>
);

export default Logo;