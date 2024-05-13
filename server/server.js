const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();

const allowedOrigins = [
    "https://cisfinalproject-6odfvk3ki-pebble-inc.vercel.app",
    "http://localhost:3000"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200 // For legacy browser support (IE11, various SmartTVs)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import database configuration
require('./app/models/database');

// Define routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/.next/server/pages/index.html'));
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/booking.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;