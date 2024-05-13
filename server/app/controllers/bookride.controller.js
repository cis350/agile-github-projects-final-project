const db = require("../models");
const User = db.user;
const Booking = db.booking;
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

/**
 * Book a ride by validating request data and user authorization.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
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
    /**
     * Find a user by their ID and execute the callback.
     * @param {object} err - The error object.
     * @param {object} user - The user object.
     * @returns {void}
     */
    User.findOne({
        id: userId
      })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            res.status(404).send({message: "User Not Found"});
        } else {
            Booking.insertMany({
                username: user.username,
                pickup_location: req.body.pickup_location,
                dropoff_location: req.body.dropoff_location,
                pickup_window: req.body.pickup_window,
                number_passengers: req.body.number_passengers,
                number_suitcases: req.body.number_suitcases
            })
            res.status(200).send({ message: "Ride Requested Successfully" });
            return;
        }
    });
};