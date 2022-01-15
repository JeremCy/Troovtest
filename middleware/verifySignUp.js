const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }.exec((err, user) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (user) {
            return res.status(400).json({
                error: 'Username already exists'
            });
        }
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            if (user) {
                return res.status(400).json({
                    error: 'Email already exists'
                });
            }
            next();
        });
    }));
};
checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles)){
                res.status(400).json({
                error: 'Roles is not existed'
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;