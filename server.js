'use strict';
const MongoClient = require('mongodb').MongoClient;
const urldb="mongodb://mashum:mashuk123@ds127293.mlab.com:27293/wsapp";
// Connect to the db


const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
wss.broadcast = function(data, sender) {
  wss.clients.forEach(function(client) {
    if (client !== sender) {
      client.send(data)
    }
  })
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  
  ws.on('message', (mess) => {
   
    
 wss.broadcast(mess, ws);


  MongoClient.connect(urldb, (err, client) => {
  // Client returned
  var db = client.db('wsapp');
    

        db.collection('users').updateOne({"user":"VVV"}, {$set : {"QN":1}}, {upsert:true, multi:true});
       
        

    });
    });
 
});

});
