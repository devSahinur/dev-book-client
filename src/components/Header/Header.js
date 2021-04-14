import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';




const Header = () => {
    const [loggedInUser] =useContext(UserContext);
    console.log(loggedInUser)
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
                    {
                        loggedInUser.isSignedIn ? <a href=""><button>Log Out</button></a> : <Link to="/login"><button>Login</button></Link>
                    }
                    <img className='profile-avator' src={loggedInUser.photo} alt=""/>
                </div>
                
                
            </nav>
        </div>
    );
};

export default Header;