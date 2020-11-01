var express = require("express");
const passport = require("passport");
var router = express.Router();
var path = require("path");
var User = require("../user/User");
const middleware = require("../middleware/middleware");

/** 
 * @desc    Serves the index page
 * @route   GET /
*/
router.get([ "/", "/index", "/index.html" ], function(req, res){
    res.sendFile(path.join(__dirname, "../../../public/index.html"));
});

/** 
 * @desc    Serves the login page
 * @route   GET /login
*/
router.get([ "/login", "/login.html" ], function(req, res){
    if (req.isAuthenticated()) {
        res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../../../public/login.html"));
});

/**
 * @desc    Authenticates the user for login page
 * @route   POST /login
 */
router.post(
    [ "/login", "/login.html" ],
    middleware.emailToLowerCase,
    passport.authenticate("local"),
    function(req, res){
        // if authentication was successful, let ajax call handle the redirect
        res.send({ redirect: "/dashboard" });
    },
);

/**
 * @desc    Serves the sign up page
 * @route   GET /signup
*/
// Sign Up Route
router.get([ "/signup", "/signup.html" ], function(req, res){
    if (req.isAuthenticated()) {
        res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../../../public/signup.html"));
});

/**
 * @desc    Create new user and handle sign up logic
 * @route   POST /signup
*/
router.post(
    "/signup",
    middleware.emailToLowerCase,
    middleware.userExists,
    function(req, res){
        // If the email is not in db, add the user and send back 201 status code + email
        req.app.locals.user.addUser(req.body);
        res.status(201);
        res.json(req.body.email);
    },
);

/**
 * @desc    Serves the dashboard page if user is authenticated
 * @route   GET /dashboard
 */
router.get([ "/dashboard", "/dashboard.html" ], function(req, res){
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../../../public/dashboard.html"));
});

/**
 * @desc    Updates the user information in the database
 * @route   PUT /dashboard
 */
router.put(
    [ "/dashboard", "/dashboard.html" ],
    middleware.emailToLowerCase,
    middleware.userExists,
    function(req, res){
        const updatedUser = req.app.locals.user.updateUser(req.body);
        res.send(updatedUser);
    },
);

/**
 * @desc    Logs the user out of the session
 * @route   GET /logout
 */
router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/");
});

module.exports = router;
