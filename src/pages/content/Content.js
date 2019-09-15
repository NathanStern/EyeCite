import React, { useState, useEffect } from "react";
import "./Content.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import displayData from "./displayData";
import mainlogo from "./fridge.png";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";
import Row from "./Row";

const accountSid = "ACc0c0172d004290d08ab7c4b70a2d4cc7";
const authToken = "5bb268a38f5fd6b48c0a1506df3a1921";

const apiKey = "SK6d6d6be0598b649444d61c6109a9856f";
const authSecret = "OAeWvft5PrttoWxsKni964hYHuR75Nte";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

// const client = require("twilio")(accountSid, authToken);
// function call() {
//   client.messages
//     .create({ body: "Hi there!", from: "+13173427204", to: "+17654071277" })
//     .then(message => console.log(message.sid));
// }

function createItem(props, itemName, itemDate) {
  console.log(itemName);
  console.log(itemDate);

  return firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("items")
    .doc(itemName + "_" + itemDate)
    .set({
      Name: itemName,
      ExpDate: itemDate
    });
}

function Index(props) {
  const { user, signOut, signInWithGoogle } = props;

  const [rows, setRows] = useState([]);

  async function signIn() {
    await signInWithGoogle();
    await getItems();
  }

  async function getItems() {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("items")
      .get({ source: "default" })
      .then(function(documentSnapshot) {
        documentSnapshot.forEach(doc => {
          console.log(doc["id"]);
          var myDocRef = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("items")
            .doc(doc["id"]);

          myDocRef
            .get()
            .then(function(doc) {
              // console.log(doc.data().Name);
              // console.log(doc.data().ExpDate);

              var itemName = doc.data().Name;
              var itemDate = doc.data().ExpDate;

              let newRow = { itemName, itemDate };
              rows.push(newRow);
              setRows([...rows]);

              firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('items').doc(itemName+"_"+itemDate).set({
                Name: itemName,
                ExpDate: itemDate
              });

              var today = new Date();
              var dd = String(today.getDate()).padStart(2, "0");
              var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
              var yyyy = today.getFullYear();

              today = yyyy + "-" + mm + "-" + dd;
              if (today === itemDate) {
                window.alert(
                  itemName +
                    " is expiring today! You should use it now. Here are some recipes that may help! https://www.allrecipes.com/search/results/?wt=" +
                    itemName +
                    "&sort=re"
                );
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      });
  }
  
  function deleteItem() {
  }

  async function addRow(itemName, itemDate) {
    let newRow = { itemName, itemDate };

    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("items")
      .doc(itemName + "_" + itemDate)
      .set({
        Name: itemName,
        ExpDate: itemDate
      });

    setRows([...rows, newRow]);
  }

  console.log(rows);
  return (
    <div className="App">
      <header className="App-header">
        <h1 classname={"App-header"}>myFridge</h1>
        <style>{"body { background-color: lightgrey; }"}</style>
        {user ? <button onClick={signOut}>Sign Out</button> : <></>}
        {user ? (
          <div className="table">
            <form method="post" action="myfridge.php">
              <table>
                <tbody>
                  <tr>
                    <th>Food Item</th>
                    <th>Expiration Date</th>
                    <th>Action</th>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" name="food" id="food"></input>
                    </td>
                    <td>
                      <input
                        type="date"
                        date="expirationDate"
                        id="date"
                      ></input>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          addRow(
                            document.getElementById("food").value,
                            document.getElementById("date").value
                          )
                        }
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                  {rows &&
                    rows.map((row, i) => <Row key={`row${i}`} row={row} />)}
                </tbody>
              </table>
            </form>
          </div>
        ) : (
          <button className="googleButton" onClick={signIn}>
            Sign in with Google
          </button>
        )}
      </header>
      <img src={mainlogo} className="App-logo" alt="fridge" flex="bottom" />
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Index);
