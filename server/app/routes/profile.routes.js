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
  // Route for fetching user details
  app.get("/api/profile/fetch/:username", controller.fetchProfile);
  // Route for user profile update
  app.post("/api/profile/update", controller.updateProfile);
  // Route for delete profile
  app.post("/api/profile/delete", controller.deleteProfile);
  // Route for logout profile
  app.post("/api/profile/logout", controller.logout);
};
