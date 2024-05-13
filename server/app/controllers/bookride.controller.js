const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");

exports.bookRide = (req, res) => {
    if (!req.body.pickup_location || 
        !req.body.dropoff_location || 
        !req.body.pickup_window || 
        !req.body.number_passengers ||
        !req.body.number_suitcases ||
        req.body.pickup_location === "" || 
        req.body.dropoff_location === "" || 
        req.body.pickup_window === "" || 
        req.body.number_passengers === "" ||
        req.body.number_suitcases === "") {
        res.status(400).send({message: "Missing Fields"});
        return;
    }
    var userId;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization,
            decoded;
        try {
            decoded = jwt.verify(authorization, secret.secretToken);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        userId = decoded.id;
    } else {
        return;
    }
    
    User.findOne({
        id: userId
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
            res.status(200).send({ message: "Ride Requested Successfully" });
            return;
        }
    });
};

