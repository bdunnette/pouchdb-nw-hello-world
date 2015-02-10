(function () {
  'use strict';
  
  var idb = document.getElementById('idb');
  var websql = document.getElementById('websql');
  var leveldb = document.getElementById('leveldb');
  
  new PouchDB('using-idb').info().then(function () {
    idb.innerHTML = '&#10003';
  }).catch(function (err) {
    idb.innerHTML = "Nope, got an error: " + err;
  });
  
  new PouchDB('using-websql', {adapter: 'websql'}).info().then(function () {
    websql.innerHTML = '&#10003';
  }).catch(function (err) {
    websql.innerHTML = "Nope, got an error: " + err;
  });
 
  var LevelPouchDB = require('pouchdb');
  var lpdb = new LevelPouchDB('using-leveldb');

  console.log(lpdb);

  lpdb.info().then(function () {
    leveldb.innerHTML = '&#10003';
  }).catch(function (err) {
    leveldb.innerHTML = "Nope, got an error: " + err;
  });

  var sync = LevelPouchDB.sync('using-leveldb', 'http://localhost:5984/diener', {live: true})
  .on('change', function (info) {
    // handle change
    console.log(info);
  }).on('complete', function (info) {
    // handle complete
    console.log(info);
  }).on('error', function (err) {
    // handle error
    console.log(info);
  });

  lpdb.allDocs({include_docs: true, attachments: true}, function(err, response) { 
    console.log(err);
    console.log(response);
  });
})();
