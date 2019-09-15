import React, {useState, useEffect} from 'react';
import './Content.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import displayData from './displayData';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';

const accountSid = 'ACc0c0172d004290d08ab7c4b70a2d4cc7';
const authToken = '5bb268a38f5fd6b48c0a1506df3a1921';

const apiKey = 'SK6d6d6be0598b649444d61c6109a9856f';
const authSecret = 'OAeWvft5PrttoWxsKni964hYHuR75Nte';


const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider()
};

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

  const [rows, setRows] = useState();

  async function signIn() {
    await signInWithGoogle();
    getItems();
  }

  function getItems() {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('items').get({source: 'default'}).then(function(documentSnapshot) {
      documentSnapshot.forEach((doc) => {
        console.log(doc['id'])
        if (doc['id'] !== 'initialDoc') {
          firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('items').doc(doc['id']).get().then(function(doc) {
            addRow(doc.data().Name, doc.data().ExpDate);
          });
        }
       
      });
    }); 
  }

  function addRow(itemName, itemDate) {
    let newRow = (<tr>
        <td>{itemName}</td>
        <td>{itemDate}</td>
        <td><button type="button" onClick={() => {}}>Remove</button></td>
    </tr>);

    let newRows;
    if (rows) {
        setRows([...rows, newRow]);
    } else {
        setRows([newRow]);
    }
    newRows.push(newRow); 

    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('items').doc(itemName+"_"+itemDate).set({
      Name: itemName,
      ExpDate: itemDate
    });

    setRows(newRows);
    console.log(itemName);
    console.log(itemDate);
  }

  console.log(rows);

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
                    <tbody>
                        <tr>
                            <th>Food Item</th>
                            <th>Expiration Date</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="food" id="food"></input></td>
                            <td><input type="date" date="expirationDate" id="date"></input></td>
                            <td><button type="button" onClick={() => addRow(document.getElementById('food').value, document.getElementById('date').value)}>Add</button></td>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </form>
            </div>
            : <button className="googleButton" onClick={signIn}>Sign in with Google</button>
        }
      </header>
    
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
}) (Index);