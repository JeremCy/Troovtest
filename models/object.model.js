const mongoose = require('mongoose');

const Objects = mongoose.model(
    "Object",
    new mongoose.Schema({
        title: String,
        description: String,
        createdAt: {type: Date, default:Date.now},
    })
);


module.exports = Objects;