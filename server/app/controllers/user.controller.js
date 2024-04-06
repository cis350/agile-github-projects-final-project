exports.allAccess = (req, res) => {
  res.status(201).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(201).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(201).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(201).send("Moderator Content.");
};
