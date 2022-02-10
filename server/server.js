"use strict";
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const baseDir = 'serverdata/public';
 
let app = express();

app.use(express.static(path.join(__dirname, baseDir)));
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


 // Bouton "enregistrer"
app.post('/editContact', function(req, res) {
    console.log("post reçu sur "+req.url)
    let body = req.body
    var new_contact = {"name":body.name,
                       "address":body.address,
                       "email":body.email,
                       "phone":body.phone,
                       "infos":body.infos}
    var contacts = JSON.parse(fs.readFileSync("server/serverdata/contacts.json", 'utf8'))
    if(body.id == "-1"){
        contacts.push(new_contact)
    }else{
        contacts[body.id] = new_contact
    }
    fs.writeFileSync("server/serverdata/contacts.json", JSON.stringify(contacts), 'utf-8')
    
    res.send(body.id)
});

app.get('*', function(req, res){
    console.log("get reçu sur "+req.url)

    var route = req.url.split('/')
    var routeRoot = route[1]

    switch(routeRoot){

        case "contact":
            var requestedId = route[2] // /contact/2 -> ['','contact','2']
            var contacts = JSON.parse(fs.readFileSync("server/serverdata/contacts.json", 'utf8'))
            if(Number(requestedId) >= contacts.length) requestedId = contacts.length - 1

            var requestedContact = contacts[requestedId]
            requestedContact.id = requestedId
            res.send(requestedContact)
            break;

        case "contactsNames":
            var contacts = JSON.parse(fs.readFileSync("server/serverdata/contacts.json", 'utf8'))
            var contactsNames = []
            for(let contact of contacts) contactsNames.push(contact.name)
            res.send(contactsNames)
            break;

        default:
            res.sendFile(path.join(__dirname, baseDir, 'index.html'));
            break;
    }

})

app.listen(8000, function() {
    console.log("listening at http://localhost:8000");
});