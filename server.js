let express = require("express");
let path = require("path");
const session = require('express-session');
const passport = require('./config/passport');

// const dotenv = require("dotenv");
// dotenv.config();

// Set up Express app
let app = express();
let PORT = process.env.PORT || 8080;

// Requiring our models for syncing
let db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//load view engine -- pug
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'pug');

// We need to use sessions to keep track of our user's login status //! We'll need this for authentication
//!saveUninitialized I changed from true to false Dale
// Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new 
// but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, 
// or complying with laws that require permission before setting a cookie. Choosing false will also help with 
// race conditions where a client makes multiple parallel requests without a session. 
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: false, unset: 'destroy', }));


app.use(passport.initialize());
app.use(passport.session());

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/users-api-routes")(app);
require("./routes/bookmark-api-routes")(app)
require("./routes/html-routes")(app)
require("./routes/login-route")(app)
require("./routes/api-routes")(app)

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});
