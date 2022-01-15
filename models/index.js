const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./User.model')(mongoose);
db.role = require('./Role.model')(mongoose);
db.object = require('./Object.model')(mongoose);

db.ROLES=["user", "admin"];

module.exports = db;