/*
import * as bigQ from "@google-cloud/bigquery";
const bigqueryClient = new bigQ.BigQuery();
*/

import * as bigQ from "@google-cloud/bigquery";
const bigqueryClient = new bigQ.BigQuery();

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();
//const token= "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkODA2ZjE4NDJiNTg4MDU0YjE4YjY2OWRkMWEwOWE0ZjM2N2FmYzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0NDg0NTE4NDYwMTA1NzEwMDQxIiwiZW1haWwiOiJwb3dlcmFwcGl0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiaW96NEV6S3ctb25GVkNVOXhneUpOQSIsIm5iZiI6MTcwNzkwODYzNywiaWF0IjoxNzA3OTA4OTM3LCJleHAiOjE3MDc5MTI1MzcsImp0aSI6IjdkYWI4NGEzZTJhNjU5MGVlNzBlNmM3NDE1YzcwZjk4ODllOTkzNzUifQ.jk9EQoq1f1Webx6H59BW4ns_R5l_MH4YBHOksUb49AlcnFOGtawdmgt26Q3oCVFVk3p5IZa8tbU8e_TsRYS2JDuhph75LC_CusGHnvWhn4QEplgz2RYN1-JFXISwAKBjjci5zDlYAPd0feDFcNoBR3XsmBrG49vkphXD5VOaMsAP0kX_CUlcs5bm1Vk99xypOCTa7gERUYejvEAB1-geVx8XOopM6yD9kDY6gFB1PxzRxjigS67qLTxgdTxFKuFu_OeRFWkd5qTihuHlcg9viAvKQKRT6tLzOw401WvPVuVxoEoXr9OZcn-1eppD9uJCuKVSnxF-F_0xTED3s7f6bg";

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
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


  // Listens for new messages added to /messages/:documentId/original
// and saves an uppercased version of the message
// to /messages/:documentId/uppercase
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
  