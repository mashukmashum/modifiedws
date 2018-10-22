'use strict';
const MongoClient = require('mongodb').MongoClient;
const urldb=process.env.URLDB;
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
   var objm = mess;
    var obj=JSON.parse(objm);
    var mtype= obj.type;
   
    
    if(mtype=="am"){
 wss.broadcast(mess, ws);
    }
    
    if(mtype=="ca"){
        var qn= obj.qn;
    var qres= obj.qres;
        db.collection('users').updateMany({}, {$addToSet : {"score":0}});
   db.collection('users').updateMany({[qn]:qres}, {$inc : {"score":1}});
    }

if(mtype=="ur"){
   var uname= obj.uname;
    var qn= obj.qn;
    var qres= obj.qres;
  MongoClient.connect(urldb, (err, client) => {
  // Client returned
  var db = client.db('wsapp');
    
    db.collection('users').updateOne({"user":uname}, {$set : {[qn]:qres}}, {upsert:true, multi:true});
       
        

    }); }
    });
 
 
});
