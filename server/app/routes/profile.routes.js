const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/profile.controller");

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

  app.get("/api/profile/fetch", controller.fetchProfile);
  // Route for user profile update
  app.post("/api/profile/update", controller.updateProfile);
  // Route for fetching user details
};
