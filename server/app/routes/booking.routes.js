const controller = require("../controllers/bookride.controller");

/**
 * Configures routes related to authentication.
 * @param {object} app - Express application object.
 */
module.exports = function(app) {
  app.use(function(req, res, next) {
    // Middleware to handle CORS headers
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Route for fetching user details
  app.post("/api/bookride", controller.bookRide);

};
