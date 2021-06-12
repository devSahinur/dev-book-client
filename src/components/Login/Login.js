import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import rocket from '../../image/rocket.svg'
import desk from '../../image/desk.svg'
import { createUserWithEmailAndPassword, handleFbSignIn, handleGhSignIn, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';
import { UserContext } from '../../App';
import './Login.css'






const Login = () => {
    const { setLoggedInUser } = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const [mode, setMode] = useState('');

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const { register, handleSubmit } = useForm();

    const [user, setUser] = useState({
        isSignedIn: false,
        userName: '',
        email: '',
        userPhoto: ''
    });
    setLoggedInUser(user);

    initializeLoginFramework();

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                history.replace(from);
            });
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                setUser(res);
                history.replace(from);
            });
    }

    const GhSignIn = () => {
        handleGhSignIn()
            .then(res => {
                setUser(res);
                history.replace(from);
            });
    }

    const onSubmit = data => {
        const { name, email, password } = data;

        if (newUser && name && email && password) {
            createUserWithEmailAndPassword(name, email, password)
                .then(res => {
                    res.userName = name;
                    setUser(res);
                    history.replace(from);
                })
        }

        if (!newUser && email && password) {
            signInWithEmailAndPassword(email, password)
                .then(res => {
                    setUser(res);
                    history.replace(from);
                })
        }
    }
    const signUpBtnHandle = () => {
        setNewUser(true)
        setMode('sign-up-mode')
        document.title = "Sign Up ";
    }
    
    const signINBtnHandle = () =>{
        setNewUser(false)
        setMode('')
        document.title = "Login";
    }

    return (
        <div className={`containerr ${mode}`}>
            <div className="forms-container">
                <div className="signin-signup">
                <form  action="" onSubmit={handleSubmit(onSubmit)}  className=" login-form sign-in-form">
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input
                            name="email"
                            type="email"
                            ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                            placeholder="Email"
                            required />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input
                            name="password"
                            type="password"
                            ref={register({ required: true })}
                            placeholder="Password"
                            required />
                    </div>
                    <button type="submit" className="btnn solid" >Login</button>
                    <p className="social-text">Or Sign in with social platforms</p>
                    <div className="social-media">
                    <a onClick={googleSignIn} href="#" className="social-icon">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a onClick={fbSignIn} href="#" className="social-icon">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a onClick={GhSignIn} href="#" className="social-icon">
                        <FontAwesomeIcon icon={faGithub} /> 
                    </a>
                    </div>
                </form>
                <form   className="login-form sign-up-form">
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                    <i className="fas fa-user"></i>
                    <input
                                name="name"
                                type="text"
                                ref={register({ required: true })}
                                placeholder="Name"
                                required />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-envelope"></i>
                    <input
                            name="email"
                            type="email"
                            ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                            placeholder="Email"
                            required />
                    </div>
                    <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <input
                            name="password"
                            type="password"
                            ref={register({ required: true })}
                            placeholder="Password"
                            required />
                    </div>
                    <button type="submit" className="btnn">Sign up</button>
                    <p className="social-text">Or Sign up with social platforms</p>
                    <div className="social-media">
                    <a onClick={googleSignIn} href="#" className="social-icon">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a onClick={fbSignIn} href="#" className="social-icon">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a onClick={GhSignIn} href="#" className="social-icon">
                        <FontAwesomeIcon icon={faGithub} /> 
                    </a>
                    </div>
                </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                <div className="content">
                    <h3>New here ?</h3>
                    <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                    ex ratione. Aliquid!
                    </p>
                    <button onClick={signUpBtnHandle} className="btnn transparent" id="sign-up-btn">
                    Sign up
                    </button>
                </div>
                <img src={rocket} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                <div className="content">
                    <h3>One of us ?</h3>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                    laboriosam ad deleniti.
                    </p>
                    <button onClick={signINBtnHandle}  className="btnn transparent" id="sign-in-btn">
                    Sign in
                    </button>
                </div>
                <img src={desk} className="image" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;