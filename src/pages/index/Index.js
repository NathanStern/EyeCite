import React from 'react';
import './Index.css';
import mainlogo from './fridge.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function signInAndRedirect() {
  window.location.pathname = "/content/"
}


function Index(props) {

  return (
    <div className="App">
      {/*<button id="button-logout">Logout</button>*/}
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

export default (Index);
