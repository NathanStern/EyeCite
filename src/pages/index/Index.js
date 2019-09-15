import React from 'react';
import './Index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return (
    <div className="App">
      <h1  align="left">MyFridge</h1>
      <header className="App-header">
        <Link to="/login/"><h3 align="left">Login</h3></Link>
      </header>
    
    </div>
  );
}

export default Index;
