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
router.get(["/", "/index", "/index.html"], function (req, res) {
  res.sendFile(
    path.join(__dirname, "../../../Group-Project-CSCI-441-Frontend/index.html")
  );
});

/**
 * @desc    Serves the login page
 * @route   GET /login
 */
router.get(["/login", "/login.html"], function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  }
  res.sendFile(
    path.join(__dirname, "../../../Group-Project-CSCI-441-Frontend/login.html")
  );
});

/**
 * @desc    Authenticates the user for login page
 * @route   POST /login
 */
router.post(
  ["/login", "/login.html"],
  middleware.emailToLowerCase,
  passport.authenticate("local"),
  function (req, res) {
    // if authentication was successful, let ajax call handle the redirect
    res.send({ redirect: "/dashboard" });
  }
);

/**
 * @desc    Serves the sign up page
 * @route   GET /signup
 */
// Sign Up Route
router.get(["/signup", "/signup.html"], function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  }
  res.sendFile(
    path.join(__dirname, "../../../Group-Project-CSCI-441-Frontend/signup.html")
  );
});

/**
 * @desc    Serves the kiosk page
 * @route   GET /signup
 */
// Sign Up Route
router.get(["/kiosk", "/kiosk.html"], function (req, res) {
  res.sendFile(
    path.join(__dirname, "../../../Group-Project-CSCI-441-Frontend/kiosk.html")
  );
});

/**
 * @desc    Create new user and handle sign up logic
 * @route   POST /signup
 */
router.post(
  "/signup",
  middleware.emailToLowerCase,
  middleware.userExists,
  function (req, res) {
    // If the email is not in db, add the user and send back 201 status code + email
    req.app.locals.user.addUser(req.body);
    res.status(201);
    res.json(req.body.email);
  }
);

/**
 * @desc    Serves the dashboard page if user is authenticated
 * @route   GET /dashboard
 */
router.get(["/dashboard", "/dashboard.html"], function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  res.sendFile(
    path.join(
      __dirname,
      "../../../Group-Project-CSCI-441-Frontend/dashboard.html"
    )
  );
});

/**
 * @desc    Serves the administrative page if user is authenticated
 * @route   GET /admin
 */
router.get(["/admin", "/admin.html"], function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  res.sendFile(
    path.join(__dirname, "../../../Group-Project-CSCI-441-Frontend/admin.html")
  );
});

/**
 * @desc    Serves the revenue report page if user is authenticated
 * @route   GET /revenue
 */
router.get(["/revenue", "/rptRevenue.html"], function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  res.sendFile(
    path.join(
      __dirname,
      "../../../Group-Project-CSCI-441-Frontend/rptRevenue.html"
    )
  );
});

/**
 * @desc    Serves the dashboard page if user is authenticated
 * @route   GET /dashboard
 */
router.get(["/reservation", "/reservation.html"], function (req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  res.sendFile(
    path.join(
      __dirname,
      "../../../Group-Project-CSCI-441-Frontend/reservation.html"
    )
  );
});

/**
 * @desc    Updates the user information in the database
 * @route   PUT /dashboard
 */
router.put(
  ["/dashboard", "/dashboard.html"],
  middleware.emailToLowerCase,
  middleware.userExists,
  async function (req, res) {
    let updatedUser = await req.app.locals.user.updateUser(req.body);
    const { password, ...user } = updatedUser.value;
    res.json(user);
  }
);

/**
 * @desc    Logs the user out of the session
 * @route   GET /logout
 */
router.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
