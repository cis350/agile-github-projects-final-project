const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    dropoffLocation: String,
    paymentMethod: String,
    stars: String,
    preferred_rideshare_app: [
      {type: String}
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    accessToken: String
  })
);

module.exports = User;
