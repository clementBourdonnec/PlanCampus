"use strict";
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const baseDir = '/serverdata/public';
 
let app = express();

app.use(express.static(path.join(__dirname, baseDir)));

app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 app.use(bodyParser.json());


app.post('*', function(req, res) {
    console.log("post reçu sur "+req.url)
    let body = req.body
    var new_contact = {"name":body.name,
                       "address":body.address,
                       "email":body.email,
                       "phone":body.phone,
                       "infos":body.infos}

    var contacts = JSON.parse(fs.readFileSync("serverdata/contacts.json", 'utf8'))
    contacts.push(new_contact)
    fs.writeFileSync("serverdata/contacts.json", JSON.stringify(contacts), 'utf-8')
    
    res.sendFile(path.join(__dirname, baseDir, 'index.html'));
});

app.get('*', function(req, res){
    console.log("get reçu sur "+req.url)
    res.sendFile(path.join(__dirname, baseDir, 'index.html'));
})

app.listen(8000, function() {
    console.log("listening at http://localhost:8000");
});