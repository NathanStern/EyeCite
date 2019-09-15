import React from 'react';
import './Content.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import displayData from './displayData';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider()
};
 

function getItems(props) {
  var documentData;
  firebaseApp.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(async function(doc) {
    documentData = await doc.data().items;
  });
  
  documentData.forEach(item => {
    var documentID = item.substring(5);
    var itemName;
    var itemDate;
    var itemData = [];
    firebase.firestore().collection('items').doc(documentID).get().then(async function(doc) {
      itemName = await doc.data().Name;
      itemDate = await doc.data().ExpDate;
      console.log(itemName);
      console.log(itemDate);
      itemData.push(<li><displayData itemName={itemName} itemDate={itemDate}/></li>);
    });
    return (
    <ul id="userData">
      {itemData}
    </ul>);
  });
  
}

function createItem(props) {
  var itemName = document.getElementById('food').value;
  var itemDate = document.getElementById('date').value;
  console.log(itemName);
  console.log(itemDate);

  document.getElementById('food').value = "";
  document.getElementById('date').value = "";


  return firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('items').doc(itemName+"_"+itemDate).set({
    Name: itemName,
    ExpDate: itemDate
});
}

function Index(props) {

  const {
    user,
    signOut,
    signInWithGoogle,
  } = props;

  return (
    <div className="App">
      <h1  align="left">MyFridge</h1>
      <header className="App-header">
        {
          user
            ? <button onClick={signOut}>Sign Out</button>
            : <></>
        }
        {
          user 
            ? <></>
            : <p>Please sign in.</p>
        }
        {
          user
            ?
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
                        <td><input type="date" date="expirationDate" id="date"></input></td>
                        <td><button type="button" onClick={createItem}>Add</button></td>
                    </tr>
                </table>
            </form>
            {getItems}
            </div>
            : <button className="googleButton" onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </header>
    
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
}) (Index);