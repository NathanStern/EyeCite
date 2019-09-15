const functions = require('firebase-functions');
const firebase = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

firebase.initializeApp();

exports.setupDatabase = functions.auth.user().onCreate((user) => {

    return firebase.firestore().collection('users').doc(user.uid).collection('items').doc('initialDoc').set({
        Name: "Test",
        ExpDate: "2001-10-29"
    });
  });