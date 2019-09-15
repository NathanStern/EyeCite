import React from 'react';
import './Index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/login/">Login</Link>
      </header>
    </div>
  );
}

export default Index;
