import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="header">
            {/* <img src={logo} alt=""/> */}
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/admin">Admin</Link>
                <button>Login</button>
            </nav>
        </div>
    );
};

export default Header;