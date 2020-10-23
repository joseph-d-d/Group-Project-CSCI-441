var MongoClient = require("mongodb").MongoClient;
var MongoUri = require("../constants/Keys").MONGODB_URI;

class Database {
  constructor() {
    MongoClient.connect(MongoUri, (err, db) => {
      if (!err) {
        this.db = db.db("test");
        console.log("We are connected");
      }
    });
  }

  addReservation = (reservation) => {
    this.db.createCollection(
      "reservations",
      { strict: true },
      (err, collection) => {}
    );
    var collection = this.db.collection("reservations");
    collection.insertOne(reservation);
  };

  getReservation = () => {};

  getReservations = async () => {
    var collection = this.db.collection("reservations");
    var cursor = collection.find();
    var reservations = [];
    while (await cursor.hasNext()) {
      reservations.push(await cursor.next());
    }
    return reservations;
  };

  deleteReservation = () => {};
}

module.exports = Database;
