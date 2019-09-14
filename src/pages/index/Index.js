import React from 'react';
import logo from './logo.svg';
import './Index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/home/">Home</Link>
      </header>
    </div>
  );
}

export default Index;
