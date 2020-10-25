const { ObjectId } = require("mongodb");

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

  getUserById = (id) => {
    let result;
    let collection = this.db.collection("users");
    result = collection.findOne({_id: id}, function(err, val) {
      if ( err ) return null;
      else return val;
    });

    return result;
  }
  
  getUsers = async () => {
    var collection = this.db.collection("users");
    var cursor = collection.find();
    var users = [];
    while (await cursor.hasNext()) {
      users.push(await cursor.next());
    }
    return users;
  }

  addUser = (user) => {
    this.db.createCollection(
      "user",
      { strict: true },
      (err, collection) => {}
    );
    var collection = this.db.collection("user");
    collection.insertOne(user);
  }
}

module.exports = Database;
