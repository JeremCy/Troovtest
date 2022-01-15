const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/db.config.js');
const express = require('express');
const cors = require('cors');
const app = require('express')();
const db = require('./models');
const Role = db.role;
const port = 8000;
require('./routes/auth.routes')(app);
require('./routes/object.routes')(app);
require('./routes/user.routes')(app);

var corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(MONGO_URI)
    .then(() => { console.log('connected to mongodb') })
    .catch(err => console.log(err));

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count == 0) {
            new Role({
                name: 'user'
            }).save(err => {
                if (!err) {
                    console.log('added user role to db');
                }
            }
            );
            new Role({
                name: 'admin'
            }).save(err => {
                if (!err) {
                    console.log('added admin role to db');
                }
            }
            );
        }
    }
    );
}


app.listen(
    port,
    () => console.log(`Example app listening on http://localhost:${port}`)
)
