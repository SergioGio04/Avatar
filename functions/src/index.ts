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
import * as bigQ from "@google-cloud/bigquery";
const bigqueryClient = new bigQ.BigQuery();

//IMPORT CALLABLE FUNCTIONS
//const functions = require('firebase-functions');
const {onCall} = require("firebase-functions/v2/https");

initializeApp();


//CREAZIONE DI UNA FUNZIONE CALLABLE
//export.nome= functions.https.onCall((request:any)=>{})
exports.callbigquery2= onCall(async (request:any) => {
  /*
  let q='WITH CTE AS(\
    SELECT \
    JSON_EXTRACT(data, "$.id") AS id,\
    JSON_EXTRACT(data, "$.brand") AS brand,\
    JSON_EXTRACT(data, "$.categoryId") AS categoryId,\
    JSON_EXTRACT(data, "$.description") AS description,\
    JSON_EXTRACT_STRING_ARRAY(data, "$.lowercaseSearch") as lowercaseSearch,\
    DATA AS data\
    FROM `avatar-sergio.firestore_export.products_raw_latest`\
  )\
  SELECT * FROM CTE\
  LIMIT 5';
  return {
    stringFunctions: q,
    stringService: request.data 
  };
  */
  
  console.log('CIAOOOOOOOOO');   
  console.log('HEYYYYYY');
  console.log( request);
  //CALL BIG QUERY
  debugger;
  //return "CIAOß"

  /*
  let q='WITH CTE AS(\
    SELECT \
    JSON_EXTRACT(data, "$.id") AS id,\
    JSON_EXTRACT(data, "$.brand") AS brand,\
    JSON_EXTRACT(data, "$.categoryId") AS categoryId,\
    JSON_EXTRACT(data, "$.description") AS description,\
    JSON_EXTRACT_STRING_ARRAY(data, "$.lowercaseSearch") as lowercaseSearch,\
    DATA AS data\
    FROM `avatar-sergio.firestore_export.products_raw_latest`\
  )\
  SELECT * FROM CTE\
  LIMIT 5';
  */
  let q= request.data;
  
  let dataFromBigQuery= await bigqueryClient.query(
    //{query: request.data}
    {query: q}
  ).then(function(res){
    let rows= res[0];
    for(let row of rows){
      row.data= JSON.parse(row.data);
    }
    return rows;
  });
  console.log(dataFromBigQuery);
  return dataFromBigQuery;
  

  //return "CIAO";
  
  ////
  //

}); 

exports.addmessage = onRequest( async (req:any, res:any) => {
    // Grab the text parameter.
    
    
    //http://localhost:5001/avatar-sergio/us-central1/addmessage?text=CIAONE
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
  

