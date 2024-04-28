const db = require("../models");
const User = db.user;

exports.fetchProfile = (req, res) => {
    User.findOne({
        username: req.params.username
      })
    .exec((err, user) => {
        if (err) {
            res.status(400).send({ message: err });
            return;
        }
        console.log(req.params.username);
        if (!user) {
            res.status(400).send({message: "User Not Found"});
        } else {
            res.status(201).send({
                phone: user.phone ?? "",
                dropoffLocation: user.dropoffLocation ?? "",
                stars: user.stars ?? "",
                paymentMethod: user.paymentMethod ?? "",
                maxRiders: user.maxRiders ?? ""
            });
        }
        
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
            phone: user.phone ?? "",
            dropoffLocation: user.dropoffLocation ?? "",
            stars: user.stars ?? "",
            paymentMethod: user.paymentMethod ?? "",
            maxRiders: user.maxRiders ?? ""
        });
    });
};

exports.logout = (req, res) => {
    const filter = {username: req.body.username};
    const update = {
        accessToken: undefined
    };
    User.findOneAndUpdate(filter, update)
    .exec((err, user) => {
        if (err) {
            res.status(400).send({ message: err });
            return;
        }
        console.log("logout");
        res.status(201).send({message: "User Logged Out Successfully"});
    });
};

exports.deleteProfile = (req, res) => {
    
    const filter = {username: req.body.username};
    console.log(filter);
    User.findOne(filter)
    .then(doc => {
        doc.remove();
        res.status(201).send({message: "User Deleted Successfully"});
    });
};