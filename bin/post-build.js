#! /usr/bin/env node

var fs = require('fs')
var theFile = 'public/dist/style.css';
fs.readFile(theFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/\/images\//g, '../images/');

  fs.writeFile(theFile, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
