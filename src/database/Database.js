const { ObjectId } = require("mongodb");

var MongoClient = require("mongodb").MongoClient;
var MongoUri = require("../constants/Keys").MONGODB_URI;
const bcrypt = require("bcrypt");

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

    getUserByEmail = async (email) => {
        let result;
        let collection = this.db.collection("users");
        result = await collection.findOne({ email: email });
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

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);

        var collection = this.db.collection("users");
        collection.insertOne(user);
    };

    updateUser = async (user) => {
        const collection = this.db.collection("users");
        let updatedUser;

        // User includes an update to their password
        if (user.password && user.password !== "") {
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            // Update in mongo db
            updatedUser = await collection.findOneAndUpdate(
                { _id: ObjectId(user._id) },
                {
                    $set: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        email: user.email,
                        permissions: user.permissions,
                        modified_date: user.modified_date,
                        modified_by: user.modified_by,
                        paymentMethod: user.paymentMethod,
                        vehicles: user.vehicles,
                        password: user.password,
                    },
                },
                {
                    returnOriginal: false,
                },
            );
        } else {
            // If user did not update password, keep the old hashed pw and update mongo db for anything else
            updatedUser = await collection.findOneAndUpdate(
                { _id: ObjectId(user._id) },
                {
                    $set: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        email: user.email,
                        permissions: user.permissions,
                        modified_date: user.modified_date,
                        modified_by: user.modified_by,
                        paymentMethod: user.paymentMethod,
                        vehicles: user.vehicles,
                    },
                },
                {
                    returnOriginal: false,
                },
            );
        }

        return updatedUser;
    };

    authenticateUser = (email, password, done) => {
        let collection = this.db.collection("users");

        collection.findOne({ email: email }, function(err, user){
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect email." });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
        });
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
