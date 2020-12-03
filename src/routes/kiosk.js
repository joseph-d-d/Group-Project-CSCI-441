/** Express router providing kiosk related routes
 * @module routes/kiosks
 * @requires express
 */

var express = require("express");
/**
 * Express router to mount kiosk related functions on.
 * @type {object}
 * @const
 * @namespace kioskRouter
 */
var router = express.Router();

/**
 * Route to post kiosks.
 * @name post/kiosks
 * @function
 * @memberof module:routes/kiosk~kioskRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/", function (req, res) {
  let requestBody = req.body;
  console.log(requestBody.pin);
  req.app.locals.reservation
    .getReservationByPin(requestBody.pin)
    .then((reservation) => res.json(reservation));
});

module.exports = router;
