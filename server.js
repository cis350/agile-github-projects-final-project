const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

// Setup CORS options properly
var corsOptions = {
  origin: "https://cisfinalproject-6odfvk3ki-pebble-inc.vercel.app", // Ensure no trailing slash
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware with the options
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./server/app/models");
const Role = db.role;

db.mongoose
  .connect("mongodb+srv://cis3500:1o3AL4hpU4F5GFNR@cluster0.ddazo1a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Define routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './client/.next/server/pages/index.html'));
});

require("./server/app/routes/auth.routes")(app);
require("./server/app/routes/user.routes")(app);
require("./server/app/routes/profile.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;