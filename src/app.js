const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const database = require("./database/Database");

const usersRouter = require("./routes/users");
const reservationsRouter = require("./routes/reservations");
const parkingLotRouter = require("./routes/parkingLot");
const ParkingLot = require("./parkingLot/ParkingLot");
const Registration = require("./registration/Registration");
const Reservation = require("./reservation/Reservation");
const User = require("./user/User");

const app = express();
//declared in the app.js which is basicly treated as main
//assigning them to app.local makes it so they can be accessed in the routes
app.locals.db = new database();
app.locals.parkingLot = new ParkingLot(app.locals.db);
app.locals.registration = new Registration(app.locals.db);
app.locals.reservation = new Reservation(app.locals.db, app.locals.parkingLot);
app.locals.user = new User(app.locals.db);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/reservations", reservationsRouter);
app.use("/parkingLot", parkingLotRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.error(err.stack);
  res.json({ error: err });
  res.status(err.status || 500);
});

module.exports = app;
