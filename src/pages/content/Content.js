import React from 'react';
import './Content.css';
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



function Index(props) {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props;

  return (
    <div className="App">
      <h1  align="left">MyFridge</h1>
      <header className="App-header">
        {
          user 
            ? <></>
            : <p>Please sign in.</p>
        }
        {
          user
            ? <></>
            : <button className="googleButton" onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </header>
    
      <div id= "table">
          <form method="post" action="myfridge.php">
              <table>
                  <tr>
                       <th>Food Item</th>
                       <th>Expiration Date</th>
                       <th>Action</th>
                  </tr>
                  <tr>
                      <td><input type="text" name="food"></input></td>
                      <td><input type="date" date="expirationDate"></input></td>
                      <td><input type="delete" name="Delete"></input></td>
                  </tr>
              </table>
          </form>
      </div>
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
}) (Index);