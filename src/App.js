import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./pages/index/Index";
import Content from "./pages/content/Content";


function App() {
    return (
      <Router>
          <Route path="/" exact component={Index} />
          <Route path="/content/" component={Content} />
      </Router>
    );
  }

  export default (App);