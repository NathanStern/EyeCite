import React from 'react';
import './Content.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return (
    <div className="App">
      <h1  align="left">MyFridge</h1>
      <div id= "table">
          <form method="post" action="myfridge.php">
              <table>
                  <tr>
                       <th>Food Item</th>
                       <th>Expiration Date</th>
                       <th>Action</th>
                  </tr>
                  <tr>
                      <td><input type="text" name="food" id="food"></input></td>
                      <td><input type="date" date="expirationDate"></input></td>
                      <td><button type="button" onClick="document.getElementById(demo)">Add</button></td>
                  </tr>
              </table>
          </form>
      </div>
    </div>
  );
}

export default Index;