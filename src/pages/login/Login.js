import React from 'react';
import './Login.css';
import logo from './logo.svg'

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

}

function Login(props) {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props;


function renderItems(props) {
  const user = props.user;
  let itemComponents = null;


}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          user 
            ? <p>Hello, {user.displayName}</p>
            : <p>Please sign in.</p>
        }
        {
          user
            ? <button onClick={signOut}>Sign out</button>
            : <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
        {renderItems}
      </header>
    </div>
  );
}

export default  withFirebaseAuth({
  providers,
  firebaseAppAuth
}) (Login);
