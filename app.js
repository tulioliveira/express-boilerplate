var express               = require('express');
var bodyParser            = require('body-parser');
var expressSanitizer      = require('express-sanitizer');
var mongoose              = require('mongoose');
var methodOverride        = require('method-override');
var passport              = require('passport');
var LocalStrategy         = require('passport-local');
// var seedDB             = require("./seeds");
var app                   = express();

// Database Setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongo:27017/project_db_name", {
	keepAlive: true,
	reconnectTries: Number.MAX_VALUE,
	useMongoClient: true
});

// App Config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret: "Custom Secret Text for Your App",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Database Models
var User = require('./models/user');

// Passport Setup
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Database Seeding
// seedDB();

/**
 * Routes
 */
app.get('/', function (req, res) {
	res.render("index");
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}