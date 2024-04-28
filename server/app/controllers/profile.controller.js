const db = require("../models");
const User = db.user;

exports.fetchProfile = (req, res) => {
    if (req.params.username === "" || req.params.username === undefined || req.params.username === null) {
        res.status(400).send({message: "Missing username"});
        return;
    }
    User.findOne({
        username: req.params.username
      })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        console.log(req.params.username);
        if (!user) {
            res.status(404).send({message: "User Not Found"});
        } else {
            res.status(200).send({
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
    if (req.body.username === "" || req.body.username === undefined || req.body.username === null) {
        res.status(400).send({message: "Missing username"});
        return;
    }
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
        if (!user) {
            res.status(404).send({message: "User Not Found"});
        }
        res.status(200).send({
            phone: user.phone ?? "",
            dropoffLocation: user.dropoffLocation ?? "",
            stars: user.stars ?? "",
            paymentMethod: user.paymentMethod ?? "",
            maxRiders: user.maxRiders ?? ""
        });
    });
};

exports.logout = (req, res) => {
    if (req.body.username === "" || req.body.username === undefined || req.body.username === null) {
        res.status(400).send({message: "Missing username"});
        return;
    }
    const filter = {username: req.body.username};
    const update = {
        accessToken: undefined
    };
    User.findOneAndUpdate(filter, update)
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            res.status(404).send({message: "User Not Found"});
            return;
        }
        console.log("logout");
        res.status(201).send({message: "User Logged Out Successfully"});
    });
};

exports.deleteProfile = (req, res) => {
    
    const filter = {username: req.body.username};
    if (req.body.username === "" || req.body.username === undefined || req.body.username === null) {
        res.status(400).send({message: "Missing username"});
        return;
    }
    console.log(filter);
    User.findOne(filter)
    .then(doc => {
        if (!doc) {
            res.status(404).send({message: "User Not Found"});
        }
        doc.remove();
        res.status(204).send({message: "User Deleted Successfully"});
    });
};

