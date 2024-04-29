const mongoose = require('mongoose');
const dbConfig = {
  url: "mongodb+srv://cis3500:1o3AL4hpU4F5GFNR@cluster0.ddazo1a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
};

const Role = require('../models/role.model'); // Adjust path as necessary

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      // Initialize default roles
      ['user', 'moderator', 'admin'].forEach(role => {
        new Role({ name: role }).save(error => {
          if (error) {
            console.log(`error adding ${role} to roles collection`, error);
          } else {
            console.log(`added '${role}' to roles collection`);
          }
        });
      });
    }
  });
}

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to MongoDB.");
  initial(); // Initialize roles after connection
}).catch(err => {
  console.error("Connection error", err);
  process.exit();
});

module.exports = mongoose;

