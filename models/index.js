const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./User.model');
db.role = require('./Role.model');
db.object = require('./Object.model');

db.ROLES=["user", "admin"];

module.exports = db;