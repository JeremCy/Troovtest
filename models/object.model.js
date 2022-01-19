const mongoose = require('mongoose');

const Objects = mongoose.model(
    "Object",
    new mongoose.Schema({
        title: String,
        description: String,
        createdAt: { type: Date, default: Date.now },
        lost: Boolean,
        type: String
    })
);


module.exports = Objects;