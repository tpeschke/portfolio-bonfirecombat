const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const massive = require('massive');

const sqlCtrl = require('./controller/sqlController')

const app = new express()
app.use(bodyParser.json())
app.use(cors())



app.get('/api/fighters', sqlCtrl.getAll);
app.post('/api/fighters', sqlCtrl.saveCombat);


const port = process.env.PORT

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
    // console.log(dbInstance)
    app.listen(port, _ => {
        console.log(`Autumn Ends: The Frogs Settle Down Into The Earth ${port}`);
    })
});