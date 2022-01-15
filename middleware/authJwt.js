const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const Role = db.role;
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'Access token required' })
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                }
                for (let i = 0; i < role.roles.length; i++) {
                    if (role[i]==="admin") {
                        next();
                        return;
                    }
                }
            }
        )
    })
};

const authJwt ={
    verifyToken,
    isAdmin,
};

module.exports = authJwt;