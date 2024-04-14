const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * Handles user signup.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.signup = (req, res) => {
  if (!req.body.password || !req.body.username || req.body.password == '' || req.body.username == '') {
    res.status(401).send({message: "Missing Fields"});
    return;
  }
  User.findOne({
    username: req.body.username
  })
  .populate("roles", "-__v")
    .exec((err, username) => {
      if (err) {
        res.status(400).send({ message: err });
        return;
      }

      if (username) {
        res.status(400).send({ message: "Duplicate User."});
        return;
      }
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });
      user.save((err, user) => {
        if (err) {
          res.status(400).send({ message: err });
          return;
        }
        
        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles }
            },
            (err, roles) => {
              if (err) {
                res.status(400).send({ message: err });
                return;
              }
              
              user.roles = roles.map(role => role._id);
              user.save(err => {
                if (err) {
                  res.status(400).send({ message: err });
                  return;
                }
                
                res.send({ message: "User was registered successfully!" });
              });
            }
          );
        } else {
          Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            if (!user.password || !user.username || !req.body.password || !req.body.username) {
              res.status(401).send({message: "Missing Fields"});
              return;
            }
            user.roles = [role._id];
            user.save(err => {
              if (err) {
                res.status(400).send({ message: err });
                return;
              }
    
              res.send({ message: "User was registered successfully!" });
            });
          });
        }
      });
    });
  
};
/**
 * Handles user signin.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(400).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(400).send({ message: "User Not found." });
      }
      if (!user.password || !user.username || !req.body.password || !req.body.username) {
        res.status(401).send({message: "Missing Fields"});
        return;
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(201).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};
/**
 * Fetches user details.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.user = (req, res) => {
  User.find({
    id: req.body.id
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(400).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(400).send({ message: "User Not found." });
      }

      res.status(201).send({
        id: user._id,
        username: user.username,
      });
    });
};