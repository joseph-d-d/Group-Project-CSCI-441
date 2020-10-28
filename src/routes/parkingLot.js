var express = require("express");
const app = require("../app");
var router = express.Router();

router.get("/", function (req, res) {});

router.post("/", function (req, res) {
  req.app.locals.parkingLot.addParkingLot();
  res.status(201);
  res.send("Success");
});

module.exports = router;
