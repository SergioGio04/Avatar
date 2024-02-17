/*
import * as bigQ from "@google-cloud/bigquery";
const bigqueryClient = new bigQ.BigQuery();
*/


// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");




//import BigQuery
//import * as bigQ from "@google-cloud/bigquery";
//const bigqueryClient = new bigQ.BigQuery();

//IMPORT CALLABLE FUNCTIONS
//const functions = require('firebase-functions');
const {onCall, HttpsError} = require("firebase-functions/v2/https");

initializeApp();


//CREAZIONE DI UNA FUNZIONE CALLABLE
//export.nome= functions.https.onCall((request:any)=>{})
exports.callBigQuery= onCall((request:any) => {
  console.log(request);
  return "EI SONO IN callBigQuery"
}); 

exports.addmessage = onRequest( async (req:any, res:any) => {
    // Grab the text parameter.

    if(req.auth && req.auth.uid ){
      const original = req.query.text;
      console.log(original);
      // Push the new message into Firestore using the Firebase Admin SDK.
      const writeResult = await getFirestore()
          .collection("messages")
          .add({original: original});
      // Send back a message that we've successfully written the message
      res.json({result: `Message with ID: ${writeResult.id} added.`});
    }
    if (!req.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      res.json({result: req.auth});
      console.log(req.auth);
    }
});

// Listens for new messages added to 
exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event:any) => {
    
    // Grab the current value of what was written to Firestore.
    const original = event.data.data().original;
  
    // Access the parameter `{documentId}` with `event.params`
    logger.log("Uppercasing", event.params.documentId, original);
  
    const uppercase = original.toUpperCase();
  
    // You must return a Promise when performing
    // asynchronous tasks inside a function
    // such as writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return event.data.ref.set({uppercase}, {merge: true});
  });
  

