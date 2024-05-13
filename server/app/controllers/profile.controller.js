const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");

/**
 * Fetches the profile of a user based on the provided username.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
exports.fetchProfile = (req, res) => {
    var userId;
    if (req.params.username) {
        var authorization = req.params.username,
            decoded;
        try {
            decoded = jwt.verify(authorization, config.secret);
        } catch (e) {
            console.log(authorization);
            return res.status(401).send('unauthorized' + authorization);
        }
        userId = decoded.id;
    } else if (!req.params.username) {
        return res.status(401).send("Invalid Access Token");
    } else {
        return res.status(500).send("Internal Server Error");
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
            res.status(200).send({
                email: user.phone ?? "",
                rideshareApp: user.preferred_rideshare_app ?? [],
                stars: user.stars ?? 5,
                paymentMethod: user.paymentMethod ?? "",
            });
        }
    });
};

/**
 * Updates the profile information of the authenticated user.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
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

/**
 * Updates the profile information of the authenticated user.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
exports.editProfile = (req, res) => {
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
    let update;
    if (!req.body.password || req.body.password === "") {
        update = {
            username: req.body.email ?? "", 
            preferred_rideshare_app: req.body.preferred_rideshare_app ? req.body.preferred_rideshare_app.split(';') : [],
            paymentMethod: req.body.paymentMethod ?? ""
        };
    } else {
        update = {
            username: req.body.email ?? "", 
            password: bcrypt.hashSync(req.body.password, 8), 
            preferred_rideshare_app: req.body.preferred_rideshare_app ? req.body.preferred_rideshare_app.split(';') : [],
            paymentMethod: req.body.paymentMethod ?? ""
        };
    }
    
    
    
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
            message: "Update success"
        });
    });
};


/**
 * Logs out the authenticated user by invalidating the access token.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
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

/**
 * Deletes the profile of the authenticated user.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void}
 */
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

