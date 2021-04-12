import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Header.css';


const Header = () => {
    return (
        <div className="header">
            <nav className="container d-flex">
                <div className="logo">
                    <Link to="/home"><img src="https://i.ibb.co/R2XZF1h/dev-book-logo.png" alt=""/></Link> 
                </div>
                <div className="menu-container">
                    <Link to="/home">Home</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/admin">Admin</Link>
                    <Link to="/checkout"><ShoppingCartIcon></ShoppingCartIcon> Checkout</Link>
                    <Link to="/login"><button>Login</button></Link>
                </div>
                
                
            </nav>
        </div>
    );
};

export default Header;