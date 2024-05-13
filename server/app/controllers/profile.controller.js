const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
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
    var userId;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization,
            decoded;
        try {
            decoded = jwt.verify(authorization, config.secret);
        } catch (e) {
            console.log(authorization);
            return res.status(401).send('unauthorized' + authorization);
        }
        userId = decoded.id;
    } else if (!req.headers.authorization) {
        return res.status(401).send("Invalid Access Token");
    } else {
        return res.status(500).send("Internal Server Error");
    }
    const filter = {id: userId};
    
    
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
    var userId;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization,
            decoded;
        try {
            decoded = jwt.verify(authorization, config.secret);
        } catch (e) {
            console.log(authorization);
            return res.status(401).send('unauthorized' + authorization);
        }
        userId = decoded.id;
    } else if (!req.headers.authorization) {
        return res.status(401).send("Invalid Access Token");
    } else {
        return res.status(500).send("Internal Server Error");
    }
    const filter = {id: userId};
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
    var userId;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization,
            decoded;
        try {
            decoded = jwt.verify(authorization, config.secret);
        } catch (e) {
            console.log(authorization);
            return res.status(401).send('unauthorized' + authorization);
        }
        userId = decoded.id;
    } else if (!req.headers.authorization) {
        return res.status(401).send("Invalid Access Token");
    } else {
        return res.status(500).send("Internal Server Error");
    }
    const filter = {id: userId};
    User.findOne(filter)
    .then(doc => {
        if (!doc || doc === null) {
            res.status(404).send({message: "User Not Found"});
        }
        doc.remove();
        res.status(204).send({message: "User Deleted Successfully"});
    });
};

