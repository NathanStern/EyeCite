import React from 'react';
import './Index.css';
import mainlogo from './fridge.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider()
};

function homeRedirect() {
  window.location.pathname = "/"
}



function renderItems(props) {
  const user = props.user;
  let itemComponents = null;


}


function Index(props) {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props;
  return (
    <div className="App">
      <button id="button-logout">Logout</button>
      <header className="App-header">
      <style>{'body { background-color: lightgrey; }'}</style>
      <h1 classname = {"App-header"}>myFridge</h1>
      {
          user 
            ? <p>Hello, {user.displayName}</p>
            : <p>Please sign in.</p>
        }
        {
          user
            ? <button className="googleButton" onClick={signOut}>Sign out</button>
            : <button className="googleButton" onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </header>
      <img src={mainlogo} className="App-logo" alt="fridge" flex="bottom"/>
    </div>  
  );
}

export default  withFirebaseAuth({
  providers,
  firebaseAppAuth
}) (Index);
