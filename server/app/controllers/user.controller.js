/**
 * Sends public content to the client.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.allAccess = (req, res) => {
  // Send public content with 201 status
  res.status(201).send("Public Content.");
};

/**
 * Sends user-specific content to the client.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.userBoard = (req, res) => {
  // Send user-specific content with 201 status
  res.status(201).send("User Content.");
};

/**
 * Sends admin-specific content to the client.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.adminBoard = (req, res) => {
  // Send admin-specific content with 201 status
  res.status(201).send("Admin Content.");
};

/**
 * Sends moderator-specific content to the client.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.moderatorBoard = (req, res) => {
  // Send moderator-specific content with 201 status
  res.status(201).send("Moderator Content.");
};
