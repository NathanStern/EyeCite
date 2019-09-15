import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./pages/index/Index";


function App() {
    return (
      <Router>
          <Route path="/" exact component={Index} />
      </Router>
    );
  }

  export default (App);