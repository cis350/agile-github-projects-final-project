const db = require("../models");
const User = db.user;

exports.fetchProfile = (req, res) => {
    User.findOne({
        username: req.params.profile
      })
    .exec((err, user) => {
        if (err) {
        res.status(400).send({ message: err });
        return;
        }
        
        res.status(201).send({
        phone: user.phone,
        dropoffLocation: user.dropoffLocation,
        stars: user.stars,
        paymentMethod: user.paymentMethod,
        maxRiders: user.maxRiders
        });
    });
};

exports.updateProfile = (req, res) => {
    const filter = {username: req.body.username};
    const update = {
        phone: req.body.phone, 
        dropoffLocation: req.body.dropoffLocation, 
        paymentMethod: req.body.paymentMethod
    };
    User.findOneAndUpdate(filter, update)
    .exec((err, user) => {
        if (err) {
            res.status(400).send({ message: err });
            return;
        }
        console.log("im am here");
        res.status(201).send({
            phone: user.phone,
            dropoffLocation: user.dropoffLocation,
            stars: user.stars,
            paymentMethod: user.paymentMethod,
            maxRiders: user.maxRiders
        });
    });
};