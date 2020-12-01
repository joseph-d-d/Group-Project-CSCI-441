var express = require("express");
const passport = require("passport");
var router = express.Router();
var path = require("path");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const middleware = require("../middleware/middleware");

/**
 * @desc    Serves the index page
 * @route   GET /
 */
router.get([ "/", "/index", "/index.html" ], function(req, res){
    res.sendFile(
        path.join(
            __dirname,
            "../../../Group-Project-CSCI-441-Frontend/index.html",
        ),
    );
});

/**
 * @desc    Serves the login page
 * @route   GET /login
 */
router.get([ "/login", "/login.html" ], function(req, res){
    if (req.isAuthenticated()) {
        res.redirect("/dashboard");
    }
    res.sendFile(
        path.join(
            __dirname,
            "../../../Group-Project-CSCI-441-Frontend/login.html",
        ),
    );
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
 * @desc    Serves the forgot page
 * @route   GET /forgot
 */
router.get([ "/forgot", "/forgot.html" ], function(req, res){
    if (req.isAuthenticated()) {
        res.redirect("/dashboard");
    }
    res.sendFile(
        path.join(
            __dirname,
            "../../../Group-Project-CSCI-441-Frontend/forgot.html",
        ),
    );
});

/**
 * @desc    Generates a token for resetting user's password
 * @route   POST /forgot
 */
router.post(
    [ "/forgot", "/forgot.html" ],
    middleware.emailToLowerCase,
    async function(req, res){
        try {
            const foundUser = await req.app.locals.user.getUserByEmail(
                req.body.email,
            );

            if (foundUser) {
                res.status(200);

                /**
                 * Steps:
                 *        1. In .env file, have the following environment variables
                 *                        EMAILUSER=email
                 *                        EMAILPW=password
                 *        2. If using gmail, https://stackoverflow.com/a/44133190
                 */

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAILUSER, // generated ethereal user
                        pass: process.env.EMAILPW, // generated ethereal password
                    },
                });

                let token = await crypto.randomBytes(20);
                token = token.toString("hex");

                // Store the reset token and token expiration in database

                let emailBody = `You are receiving this because you (or someone else) have requested the reset of the password for your account.

                Please click on the following link, or paste this into your browser to complete the process:

                http://${req.headers.host}/reset/${token}

                If you did not request this, please ignore this email.`;

                emailBody = emailBody.replace(/[\n][ \t]+/g, "\n");

                // send mail with defined transport object
                await transporter.sendMail({
                    from: `"Park n\' Go" <${process.env.EMAILUSER}>`, // sender address
                    to: "tonybanhh@gmail.com", // list of receivers
                    subject: "Park n' Go Password Reset", // Subject line
                    text: emailBody, // plain text body
                });
            } else {
                res.status(404);
            }
            res.json(req.body.email);
        } catch (error) {
            console.log(error);
        }
    },
);

/**
 * @desc    TODO: Displays the reset page
 * @route   GET /reset/:token
 */
router.get("/reset/:token", function(req, res){
    // See if there's a user with specified token and token expiration
    // if not, send back error code and redirect to /forgot
    // If there is:
    // render reset form
    res.sendFile(
        path.join(
            __dirname,
            "../../../Group-Project-CSCI-441-Frontend/reset.html",
        ),
    );
});

// TODO: POST request for /reset/:token

/**
 * @desc    TODO: Resets the user's password in database
 * @route   POST /reset/:token
 */
router.post("/reset/:token", function(req, res){
    // Find user in database based on token
    // If token is invalid or expired, error back and jquery redirect
    // Otherwise,
    // - Update database for new password
    // - Unset token and token expiration from user in db
    // - Send confirmation email
    // - Send back success code, display success with jquery Ajax and redirect to login
});

/**
 * @desc    Serves the sign up page
 * @route   GET /signup
 */
// Sign Up Route
router.get([ "/signup", "/signup.html" ], function(req, res){
    if (req.isAuthenticated()) {
        res.redirect("/dashboard");
    }
    res.sendFile(
        path.join(
            __dirname,
            "../../../Group-Project-CSCI-441-Frontend/signup.html",
        ),
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
    res.sendFile(
        path.join(
            __dirname,
            "../../../Group-Project-CSCI-441-Frontend/dashboard.html",
        ),
    );
});

/**
 * @desc    Serves the administrative page if user is authenticated
 * @route   GET /admin
 */
router.get([ "/admin", "/admin.html" ], function(req, res){
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    }
    res.sendFile(
        path.join(
            __dirname,
            "../../../Group-Project-CSCI-441-Frontend/admin.html",
        ),
    );
});

/**
 * @desc    Serves the revenue report page if user is authenticated
 * @route   GET /revenue
 */
router.get([ "/revenue", "/rptRevenue.html" ], function(req, res){
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    }
    res.sendFile(
        path.join(
            __dirname,
            "../../../Group-Project-CSCI-441-Frontend/rptRevenue.html",
        ),
    );
});

/**
 * @desc    Serves the dashboard page if user is authenticated
 * @route   GET /dashboard
 */
router.get([ "/reservation", "/reservation.html" ], function(req, res){
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    }
    res.sendFile(
        path.join(
            __dirname,
            "../../../Group-Project-CSCI-441-Frontend/reservation.html",
        ),
    );
});

/**
 * @desc    Updates the user information in the database
 * @route   PUT /dashboard
 */
router.put(
    [ "/dashboard", "/dashboard.html" ],
    middleware.emailToLowerCase,
    middleware.userExists,
    async function(req, res){
        let updatedUser = await req.app.locals.user.updateUser(req.body);
        const { password, ...user } = updatedUser.value;
        res.json(user);
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
