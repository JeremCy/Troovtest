const mongoose = require('mongoose');

const Objects = mongoose.model(
    "Object",
    new mongoose.Schema({
        title: String,
        description: String,
        createdAt: { type: Date, default: Date.now },
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        lost: Boolean,
        type: String
    })
);


module.exports = Objects;