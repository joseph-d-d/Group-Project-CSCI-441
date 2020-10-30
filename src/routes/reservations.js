var express = require("express");
var router = express.Router();
var Reservation = require("../reservation/Reservation");

router.get("/", function (req, res) {
  if (req.query.email) {
    req.app.locals.reservation
      .getReservation(req.query.email)
      .then((reservation) => res.json(reservation));
  } else {
    req.app.locals.reservation
      .getReservations()
      .then((reservations) => res.json(reservations));
  }
});

router.post("/", function (req, res) {
  let requestBody = req.body;
  let reservation = req.app.locals.reservation;
  reservation.makeReservation(
    requestBody.email,
    requestBody.storeID,
    requestBody.dateTimey
  );
  res.status(201);
  res.send("Success");
});

router.delete("/:id", function (req, res) {
  req.app.locals.reservation.cencelReservation(req.params.id);
  res.status(202);
  res.send("Success");
});

module.exports = router;
