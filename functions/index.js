const functions = require('firebase-functions');
const firebase = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

firebase.initializeApp();

exports.setupDatabase = functions.auth.user().onCreate(async(user) => {
    var firebaseVar = await firebase.firestore().collection('items').add({
        Name: "test",
        UID: user.uid
    });
    console.log(firebaseVar);
    return firebase.firestore().collection('users').doc(user.uid).set({
        Items: [firebaseVar.path],
    }).catch((error) => {
        console.log(error);
    
    });


  });