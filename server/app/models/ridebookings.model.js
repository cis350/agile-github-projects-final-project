const mongoose = require("mongoose");

const RideBooking = mongoose.model(
  "RideBooking",
  new mongoose.Schema({
    username: String,
    pickup_location: String,
    dropoff_location: String,
    pickup_window: String,
    number_passengers: String,
    number_suitcases: String
    
  })
);

module.exports = RideBooking;
