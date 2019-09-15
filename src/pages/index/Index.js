import React from "react";
import "./Index.css";
import mainlogo from "./fridge.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function signInAndRedirect() {
  window.location.pathname = "/content/";
}

function Index(props) {
  return (
    <div className="App">
      {/*<button id="button-logout">Logout</button>*/}
      <header className="App-header">
        <style>{"body { background-color: lightgrey; }"}</style>
        <h1 classname={"App-header"}>myFridge</h1>
        myFridge keeps track of your food so forgotten fridge items will never
        go to waste! All you need to do is enter the items you put in your
        fridge and their expiration dates. We will send you a text when
        something you bought is close to expiring, along with some helpful
        recipes you can use that food in!
      </header>
      <img src={mainlogo} className="App-logo" alt="fridge" flex="bottom" />
      <button className="loginButton" onClick={signInAndRedirect}>
        Log In
      </button>
    </div>
  );
}

export default Index;
