var express = require("express");
var router = express.Router();
var path = require("path");
var User = require("../user/User");

/** 
 * @desc    Serves the index page
 * @route   GET /
*/
router.get([ '/' , "/index", "/index.html"], function(req, res) {
    res.sendFile(path.join(__dirname, "../../../public/index.html"));
})

/** 
 * @desc    Serves the login page
 * @route   GET /login
*/
router.get(["/login", "/login.html"], function(req, res) {
    res.sendFile(path.join(__dirname, "../../../public/login.html"))
})

// TODO: Need to use middleware to hash and authenticate user, and redirect to dashboard with user data

/** 
 * @desc    Serves the sign up page
 * @route   GET /signup
*/
// Sign Up Route
router.get([ "/signup", "/signup.html"], function(req, res) {
    res.sendFile(path.join(__dirname, "../../../public/signup.html"))
})

/** 
 * @desc    Create new user and handle sign up logic
 * @route   POST /signup
*/
router.post("/signup", function(req, res) {
    req.app.locals.user.addUser(req.body);
    
    // TODO: Need to use middleware to make sure no duplicate user is created, hash password, and save to db

    res.status(201)
    res.json(req.body.email);
})

/**
 * @desc    Serves the dashboard page if user is authenticated
 * @route   GET /dashboard
 */
router.get([ "/dashboard", "/dashboard.html" ], function(req, res) {
    res.send("Working on it!");
})

module.exports = router;