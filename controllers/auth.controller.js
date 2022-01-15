const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Roles = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)

    });

    user.save((err, user) => {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }

        if (req.body.role) {
            Roles.find(
                {
                    name: { $in: req.body.role }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).json({ message: err });
                        return;
                    }
                    
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).json({ message: err });
                            return;
                        }
                    res.json({message:"user registered successfully"});
                });
            });
        }
    });
};

exports.signin = (req, res) =>{
    User.findOne({
        username: req.body.username
    })
    .populate("roles","-__v")
    .exec((err, user) => {
        if(err){
            res.status(500).json({ message: err});
            return;
        }
        if(!user){
            res.status(404).json({ message:"User not found"});
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid){
            return res.status(401).json({
                accessToken: null,
                message: "Invalid password"
            });
        }
        var token = jwt.sign({id: user.id}, {secret: user.secret}, {expiresIn: 86400});
        var authorities = [];
        for(let i = 0; i < user.roles.length; i++){
            authorities.push("ROLE_"+user.roles[i].name.toUpperCase());
        }
        res.status(200).json({ 
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });

    });
};
