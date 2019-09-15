import React from 'react';
import './Index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function signInAndRedirect() {
  window.location.pathname = "/content/"
}


function Index(props) {

  return (
    <div className="App">
      <h1  align="left">MyFridge</h1>
      <header className="App-header">
      
      </header>
    
    </div>
  );
}

export default (Index);
