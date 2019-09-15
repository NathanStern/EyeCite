import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./pages/index/Index";
import login from "./pages/Login/Login";


function App() {
    return (
      <Router>
          <Route path="/" exact component={Index} />
          <Route path="/login/" component={login}/>
      </Router>
    );
  }

  export default (App);