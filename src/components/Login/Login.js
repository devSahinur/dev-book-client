import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


//this part firebase initializeApp
if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

// this part State and storageData
const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: ''
      });

      const [loggedInUser, setLoggedInUser] =useContext(UserContext);
      const history = useHistory();
      const location = useLocation();
      let { from } = location.state || { from: { pathname: "/" } };

      console.log(user);

      var provider = new firebase.auth.GoogleAuthProvider();

      const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
      .then((res) => {
        const {displayName, email, photoURL} = res.user;
        const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message)
      });
    }
    // this part from development
    const handleBlur = (e) => {
      let isFieldValid = true;
      if(e.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name === 'name'){
        const isNameValid = e.target.value.length > 3;
        isFieldValid = isNameValid
      }
      if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordNumber = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && passwordNumber
      }
      if(e.target.name === 'confirm_password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordNumber = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && passwordNumber
      }
      if(e.target['password'] !== undefined && e.target['confirm_password'] !== undefined){
          if(e.target['password'] != e.target['confirm_password']){
            isFieldValid = false;
          }
      }
      if(isFieldValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] =e.target.value;
        setUser(newUserInfo);
      }
    };

    const handleSubmit = (e) => {
      // console.log(user.email, user.password);
      if(newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            // Signed in 
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            newUserInfo.isSignedIn = true;
            setUser(newUserInfo);
            updateUserName(user.name);

          })
          .catch((error) => {
            // data send state
            const newUserInfo = {...user}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
      }

      if (!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            newUserInfo.isSignedIn = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
            console.log('sign in user info');
        })
        .catch((error) => {
          const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
        });
      }
      e.preventDefault();
    }
    // from development end

    const updateUserName = name => {
      var user = firebase.auth().currentUser;
      console.log(name);
        user.updateProfile({
          displayName: name
        })
        .then(function() {
          console.log("User name Update successful");
          // Update successful.
        })
        .catch(function(error) {
          console.log(error);
          // An error happened.
        });
    }

    return (
        <div className='login'>
            <form className="login-form" onSubmit={handleSubmit}>
            {newUser ? <h1>Create an account</h1> : <h1>Login</h1>}
            {newUser && <input name="name" type="text" onBlur={handleBlur} required placeholder="Name"/>}
            <br/>
            <br/>
            {newUser ? <input type="email" name="email" onBlur={handleBlur} required placeholder="Username or Email"/> : <input type="email" name="email" onBlur={handleBlur} required placeholder="Email"/>}
            <br/>
            <br/>
            <input type="password" name="password" onBlur={handleBlur} required placeholder="Password"/>
            <br/>
            <br/>
            {newUser && <input type="password" name="confirm_password" onBlur={handleBlur} required placeholder="Confirm Password"/>}
            <br/>
            <br/>
            <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
            </form>

            {newUser ? <p>Already have an account? <button className="from-create-btn" onClick={() => setNewUser(!newUser)}>Login</button></p> : <p>Don't have an account? <button className="from-create-btn" onClick={() => setNewUser(!newUser)}>Create an account</button></p>}
            <br/>
            {user.success && <p style={{color: 'green'}}>{user.error}User { newUser ? 'created' : 'Logged In'} successfully</p>}
            <p style={{color: 'red'}}>{user.error}</p>
            <button className="google-login-btn" onClick={handleGoogleSignIn}>Continue with Google</button>
            <br/>
        </div>
    );
};

export default Login;