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
            (err, collection) => {},
        );
        var collection = this.db.collection("reservations");
        collection.insertOne(reservation);
    };

    getReservation = async (userEmail) => {
        var collection = this.db.collection("reservations");
        var reservation = await collection.findOne({ email: userEmail });
        console.log(reservation);
        return reservation;
    };

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

    getUserById = async (id) => {
        let result;
        let collection = this.db.collection("users");
        result = await collection.findOne({ _id: ObjectId(id) });
        return result;
    };

    getUsers = async () => {
        var collection = this.db.collection("users");
        var cursor = collection.find();
        var users = [];
        while (await cursor.hasNext()) {
            users.push(await cursor.next());
        }
        return users;
    };

    addUser = (user) => {
        this.db.createCollection(
            "users",
            { strict: true },
            (err, collection) => {},
        );
        var collection = this.db.collection("users");
        collection.insertOne(user);
    };

    addParkingLot = async (parkingLot) => {
        this.db.createCollection(
            "parkingLot",
            { strict: true },
            (err, collection) => {},
        );
        var collection = this.db.collection("parkingLot");
        collection.insertOne(parkingLot);
    };
}

module.exports = Database;
