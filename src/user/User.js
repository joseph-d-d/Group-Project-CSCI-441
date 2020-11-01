class User {
    constructor(db) {
        this.db = db;
    }

    getUserById(id) {
        return this.db.getUserById(id);
    }

    getUserByEmail(email) {
        return this.db.getUserByEmail(email);
    }

    getUsers() {
        return this.db.getUsers();
    }

    addUser({
        firstName,
        lastName,
        phone,
        email,
        password,
        permissions,
        modified_date,
        modified_by,
        paymentMethod,
        vehicles,
    }) {
        this.db.addUser({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
            permissions: permissions,
            modified_date: modified_date,
            modified_by: modified_by,
            paymentMethod: paymentMethod,
            vehicles: vehicles,
        });
    }

    updateUser(user) {
        return this.db.updateUser(user);
    }

    authenticateUser() {
        return this.db.authenticateUser;
    }

    /**
     * Result is attached to the session as req.session.passport.user
     *
     * @returns {function} Callback function:
     *                          @param {string} id - _id stored in mongodb
     *                          @param {function} done - called internally by strategy implementation
     * @memberof User
     */
    serializeUser() {
        return function(user, done){
            done(null, user._id);
        };
    }

    /**
     * In ID is used to find the user, which is then restored in req.user
     *
     * @returns {function} Async callback function:
     *                          @param {string} id - Corresponds to _id in mongo database
     *                          @param {function} done - called internally by strategy implementation
     * @memberof User
     */
    deserializeUser() {
        return async function(id, done){
            const user = await this.getUserById(id);
            done(null, user);
        }.bind(this);
    }
}

module.exports = User;
