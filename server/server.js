const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const massive = require('massive');
const session = require('express-session')

const sqlCtrl = require('./controller/sqlController')

const app = new express()
app.use(bodyParser.json())
app.use(cors())
app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
}))

///////////////////////////////////
////TESTING TOPLEVEL MIDDLEWARE////
///COMMENET OUT WHEN AUTH0 READY///
///////////////////////////////////
app.use((req, res, next) =>{
    if(!req.session.user){
        req.session.user = {
            user_id: 1,
            user_name: "harrison ford", 
            email: "adventureBuilder2049@gmail.com", 
            name: "adventure", 
            profile_picture : "http://www.placekitten.com/200/250",
            auth_id: "adsgfhaoibjmoi5wrhgiuaosfngiuasdhg;ioarhdgv;ou"
        }
    }
    next();
})


app.get('/api/fighters', sqlCtrl.getAllCombats);
// app.post('/api/fighter', sqlCtrl.addNewFighter);
app.get('/api/combat/:id', sqlCtrl.loadCombatants);
app.get('/api/status/:id', sqlCtrl.getAllStatuses)

app.get('/api/battle', sqlCtrl.newField);
app.delete('/api/battle/:id', sqlCtrl.deleteField);
app.patch('/api/battle', sqlCtrl.saveField)


const port = process.env.PORT

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    app.listen(port, _ => {
        console.log(`Autumn Ends: The Frogs Settle Down Into The Earth ${port}`);
    })
});