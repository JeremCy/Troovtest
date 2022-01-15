const mongoose = require('mongoose');

const Objects = mongoose.model(
    'Object',
    new mongoose.Schema({
        title: String,
        description: String,
    })
);


module.exports = Objects;