"use strict";
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { request } = require('http');
var cors = require('cors');

const baseDir = 'serverdata/public';
const host = 'http://localhost'
const port = 8000
 
let app = express();

app.use(express.static(path.join(__dirname, baseDir)));
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 app.use(cors());


 // Bouton "enregistrer"
app.post('*', function(req, res) {
    console.log("post reçu sur "+req.url)

    var route = req.url.split('/')
    var routeRoot = route[1]

    switch(routeRoot){
        case 'editContact':
            var contacts = JSON.parse(fs.readFileSync("server/serverdata/contacts.json", 'utf8'))
            var body = req.body
            var new_contact = {"id":null,
                               "name":body.name,
                               "address":body.address,
                               "email":body.email,
                               "phone":body.phone,
                               "infos":body.infos}
            if(body.id == "-1" || body.id == ''){
                new_contact.id=contacts.length
                contacts.push(new_contact)
                body.id = (contacts.length-1).toString()
            }else{
                new_contact.id = Number(body.id)
                contacts[body.id] = new_contact
            }
            fs.writeFileSync("server/serverdata/contacts.json", JSON.stringify(contacts), 'utf-8')
            
            res.send(body.id)
        break;

        case 'deleteContact':
            var idToDelete = Number(route[2]) // /deleteContact/2 -> ['','contact','2']
            var contacts = JSON.parse(fs.readFileSync("server/serverdata/contacts.json", 'utf8'))
            contacts.splice(idToDelete, 1)
            for(let i = idToDelete; i < contacts.length; i++){
                contacts[i].id = i
            }
            fs.writeFileSync("server/serverdata/contacts.json", JSON.stringify(contacts), 'utf-8')

            res.send()


        
        break;


    }

    
});



app.get('*', function(req, res){
    console.log("get reçu sur "+req.url)

    var route = req.url.split('/')
    var routeRoot = route[1]

    switch(routeRoot){

        case "contact":
            
            var requestedId = Number(route[2]) // /contact/2 -> ['','contact','2']
            var contacts = JSON.parse(fs.readFileSync("server/serverdata/contacts.json", 'utf8'))
            if(requestedId >= contacts.length) requestedId = contacts.length - 1

            var requestedContact = contacts[requestedId]
            requestedContact.id = requestedId.toString()
            res.send(requestedContact)
            break;

        case "contactsNames":
            var contacts = JSON.parse(fs.readFileSync("server/serverdata/contacts.json", 'utf8'))
            var contactsNames = []
            for(let contact of contacts) contactsNames.push(contact.name)
            res.send(contactsNames)
            break;

        case "manage":
            res.sendFile(path.join(__dirname, baseDir, 'index.html'));
            break;

        default:
            var contacts = JSON.parse(fs.readFileSync("server/serverdata/contacts.json", 'utf8'))
            res.send(contacts)
            break;
    }

})

app.listen(port, function() {
    console.log("listening at "+host+":"+port);
});