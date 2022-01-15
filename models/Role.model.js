const mongoose = require('mongoose');

const Roles = mongoose.model(
    'Role',
    new mongoose.Schema({
        name: String,
    })
);

module.exports = Roles;
