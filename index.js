const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/db.config.js');
const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./models");
const Role = db.role;
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT ||8000;
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/auth.routes')(app);
require('./routes/object.routes')(app);
require('./routes/user.routes')(app);

var corsOptions = {
    origin: 'http://localhost:3000',
};




db.mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
        initial();
    })
    .catch(err => {
        console.log('Error connecting to MongoDB: ' + err);
        process.exit() ;
    });

    function initial() {
        Role.estimatedDocumentCount((err, count) => {
          if (!err && count === 0) {
            new Role({
              name: "user"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("added 'user' to roles collection");
            });
      
            new Role({
              name: "admin"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
      
              console.log("added 'admin' to roles collection");
            });
          }
        });
    }
app.listen(
    port,
    () => console.log(`Example app listening on http://localhost:${port}`)
)
