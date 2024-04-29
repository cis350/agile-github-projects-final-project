const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");


/**
 * Configures routes related to authentication.
 * @param {object} app - Express application object.
 */
module.exports = function(app) {
  app.use(function(req, res, next) {
    // Middleware to handle CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    next();
  });

  // Route for user signup
  app.post(
    "/api/auth/signup",
    // [
    //   verifySignUp.checkDuplicateUsernameOrEmail,
    //   verifySignUp.checkRolesExisted
    // ],
    controller.signup
  );
  // Route for user signin
  app.post("/api/auth/signin", controller.signin);
  // Route for fetching user details
  app.post("/api/auth/user", controller.user);
};
