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


 // Quand l'utilisateur enregistre un nouveau contact
app.post('/contact', function(req, res) {
    console.log("post reçu sur "+req.url)
    let body = req.body
    var new_contact = {"name":body.name,
                       "address":body.address,
                       "email":body.email,
                       "phone":body.phone,
                       "infos":body.infos}
    console.log(new_contact)
    var contacts = JSON.parse(fs.readFileSync("serverdata/contacts.json", 'utf8'))
    contacts.push(new_contact)
    fs.writeFileSync("serverdata/contacts.json", JSON.stringify(contacts), 'utf-8')
    
    res.sendFile(path.join(__dirname, baseDir, 'index.html'));
});

app.get('*', function(req, res){
    console.log("get reçu sur "+req.url)

    var route = req.url.split('/')
    var routeRoot = route[1]

    switch(routeRoot){

        case "contact":
            var requestedId = route[2] // /contact/2 -> ['','contact','2']
            var contacts = JSON.parse(fs.readFileSync("serverdata/contacts.json", 'utf8'))
            if(Number(requestedId) >= contacts.length) requestedId = contacts.length - 1

            var requestedContact = contacts[requestedId]
            console.log(requestedContact)
            var htmlFile = fs.readFileSync(path.join(__dirname, baseDir, 'index.html'), 'utf-8')
            htmlFile.replace(`id="name"`,`id="name" value="`+requestedContact.name+`"`)
            htmlFile.replace(`id="address"`,`id="address" value="`+requestedContact.address+`"`)
            htmlFile.replace(`id="email"`,`id="email" value="`+requestedContact.email+`"`)
            htmlFile.replace(`id="phone"`,`id="phone" value="`+requestedContact.phone+`"`)
            htmlFile.replace(`id="infos"`,`id="infos" value="`+requestedContact.infos+`"`)
            // TODO : trouver un outil de templating qui permette d'envoyer la page modifiée
            res.send("ici la reponse")
            break;

        default:
            res.sendFile(path.join(__dirname, baseDir, 'index.html'));
            break;
    }

})

app.listen(8000, function() {
    console.log("listening at http://localhost:8000");
});